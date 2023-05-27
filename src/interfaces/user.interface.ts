export default interface IUser extends Document {
  name: String;
  username: String;
  email: String;
  phone: String;
  website?: String;
  password: String;
}
