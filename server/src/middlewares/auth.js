import jwt from 'jsonwebtoken';
import { JWT_SIGN } from '../config';

export default async (req, res, next) => {
  const { token } = req.headers;

  try {
    const user = await jwt.verify(token, JWT_SIGN);

    req.user = user;
    await next();
  } catch (e) {
    res.status(400).json({ message: 'Token jest wymagany' });
  }
};
