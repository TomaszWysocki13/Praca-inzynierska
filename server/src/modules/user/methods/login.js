import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SIGN } from '../../../config';
import db from '../../../db';
import validate from '../../../utils/validate';
import { login } from '../schema';

export default async (req, res) => {
  let params;

  try {
    params = await validate(req.body, login);
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const { username, password } = params;

  const user = await db.get('users').findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'Login lub hasło niepoprawne' });
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.status(400).json({ message: 'Login lub hasło niepoprawne' });
  }

  const token = jwt.sign({ ...user, password: undefined }, JWT_SIGN);

  return res.json({ message: 'Logowanie przebiegło pomyślnie!', token });
};
