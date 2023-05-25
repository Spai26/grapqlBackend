import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import moment from "moment/moment.js";
import { User, Blog } from "../../database/models/index.js";

//client type
const userType = new GraphQLObjectType({
  name: "userType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },

    blogs: {
      type: new GraphQLList(blogType),
      async resolve(parent, args) {
        console.log(parent.id);
        const user = await User.findById(parent.id).populate("blogs", "id");
        console.log(user);
        return user.blogs;
      },
    },
  }),
});

//blog type
const blogType = new GraphQLObjectType({
  name: "blogType",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body_content: { type: GraphQLString },
    front_image: { type: GraphQLString },
    slug_title: { type: GraphQLString },
    count_view: { type: GraphQLInt },
    createdAt: {
      type: GraphQLString,
      resolve(parent, args) {
        return moment(parent.createdAt).locale("es").format("LLLL");
      },
    },
    onwer: {
      type: userType,
      resolve(parent, args) {
        return User.findById(parent.onwer);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    user: {
      type: userType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        const user = User.find((user) => user.id === args.id);
        return user;
      },
    },
    //function login user
    loginUser: {
      type: userType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const userFound = await User.findOne({ email: args.email });

        if (!userFound) {
          throw new Error("usuario no valido");
        }

        const isMatch = await User.comparePassword(
          args.password,
          userFound.password
        );

        if (!isMatch) {
          throw new Error("Contraseña incorrecta");
        }

        return userFound;
      },
    },
    blogs: {
      type: new GraphQLList(blogType),
      resolve(parent, args) {
        return Blog.find({});
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newBlog: {
      type: blogType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        body_content: { type: GraphQLNonNull(GraphQLString) },
        front_image: { type: GraphQLNonNull(GraphQLString) },
        onwer: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const newBlog = new Blog({
          title: args.title,
          body_content: args.body_content,
          front_image: args.front_image,
          onwer: args.onwer,
        });

        return newBlog.save();
      },
    },
    // function name  action add user
    newUser: {
      type: userType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const hashPassword = await User.encryptPassword(args.password);
        const newuser = new User({
          name: args.name,
          email: args.email,
          phone: args.phone,
          website: args.website,
          password: hashPassword,
        });

        return newuser.save();
      },
    },
    // function name  action delete user
    deleteUser: {
      type: userType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
      },
    },
  },
});

export default new GraphQLSchema({
  query: rootQuery,
  mutation,
});
