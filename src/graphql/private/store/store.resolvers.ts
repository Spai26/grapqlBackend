import { generateDocImage } from '@helpers/querys/Image.query';
import { createNewDocument } from '@helpers/querys/generalConsult';
import { StoreModel } from '@models/nosql/store.models';

export const StorePublicResolvers = {
  Query: {
    getAllStore: async () => {
      return StoreModel.find({})
        .populate('logo')
        .populate('onwer')
        .populate('tags')
        .populate('categories')
        .populate('main_image');
    },
    getDetailStore: async () => {
      return 'hello';
    },
    getOnwerAllStore: async () => {
      return 'hello';
    }
  },
  Mutation: {
    attachNewStore: async (_, { input }, { user }) => {
      console.log({ input });
      let result;
      const newstore = await createNewDocument(input, 'store');
      const frontPageImage = await generateDocImage(input);

      newstore.onwer = user.id;
      newstore.main_image = frontPageImage._id;

      frontPageImage.model_id = newstore._id;
      await frontPageImage.save();
      result = await newstore.save();
      console.log(result);

      return 'hello';
    },
    updateMyStore: async () => {
      return 'hello';
    },
    deleteMyStore: async () => {
      return 'hello';
    }
  }
};
