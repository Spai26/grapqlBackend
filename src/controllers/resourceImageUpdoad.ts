export const uploadsImage = async (req, res, next) => {
  console.log(req.file);
  res.send('jere');
};

export const getImages = async (req, res, next) => {
  return 'here';
};
