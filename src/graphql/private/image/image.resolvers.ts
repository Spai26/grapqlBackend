export const ImageResolvers = {
  Query: {
    show: async () => {
      return 'here'; /*  await showlist('image'); */
    }
  },
  Mutation: {
    updateImage: async (_, __) => {
      return {
        success: true,
        message: 'here'
      };
    }
  }
};
