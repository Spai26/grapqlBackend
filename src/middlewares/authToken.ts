import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
const generateToken = (user): String => {
  const token = jwt.sign({ id: user.id }, SECRET_KEY, {
    expiresIn: '1d'
  });

  return token;
};

const verifiToken = (tokenAsign: string) => {
  try {
    return jwt.verify(tokenAsign, SECRET_KEY);
  } catch (error) {
    return false;
  }
};

export default {
  generateToken,
  verifiToken
};
