export const validExtensionImage = (imageurl) => {
  const validExtension = ['jpg', 'png', 'gif', 'jpeg'];
  const extension = imageurl.split('.').pop().toLowerCase();

  return validExtension.includes(extension);
};

const validExtensionFile = (file) => {
  const extension = file.split('.').pop().toLowerCase();
  return extension === 'pdf' ? true : false;
};

export const validResources = (url: string, origin: string) => {
  const validExtimg = ['jpg', 'png', 'gif'];

  const formOrigin = {
    images: (url) => {
      const extract = url.split('.').pop().toLowerCase();
      return validExtimg.includes(extract);
    }
  };
  return formOrigin[origin](url);
};
