import bcrypt from 'bcrypt';
import db from '../../../db';
import validate from '../../../utils/validate';
import { register } from '../schema';

export default async (req, res) => {
  let params;

  try {
    params = await validate(req.body, register);
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  delete params.repassword;

  const isUniq = await db
    .get('users')
    .findOne({ $or: [{ username: params.username }, { email: params.email }] });

  if (isUniq) {
    return res
      .status(409)
      .json({ message: 'Podana nazwa użytkownika lub adres email jest zajęty' });
  }

  const password = await bcrypt.hash(params.password, 10);

  await db.get('users').insert({ ...params, password, createdAt: new Date() });

  return res.json({ message: 'Rejestracja przebiegła pomyślnie' });
};
