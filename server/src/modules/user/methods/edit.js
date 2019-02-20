import monk from 'monk';
import bcrypt from 'bcrypt';
import db from '../../../db';
import validate from '../../../utils/validate';
import { edit } from '../schema';

export default async (req, res) => {
  let params;

  try {
    params = await validate({ ...req.body, id: req.user._id }, edit);
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const data = await db.get('users').findOne({ _id: monk.id(params.id) });

  if (!data) {
    return res.status(404).json({ message: 'Użytkownik z podanym id nie istnieje' });
  }

  const result = await bcrypt.compare(params.oldPassword, data.password);

  if (!result) {
    return res.status(400).json({ message: 'Stare hasło jest niepoprawne, spróbuj ponownie' });
  }

  delete params.oldPassword;
  delete params.repassword;

  const password = await bcrypt.hash(params.password, 10);

  await db.get('users').update(
    { _id: monk.id(params.id) },
    {
      $set: {
        ...params,
        password,
        updatedAt: new Date()
      }
    }
  );

  return res.json({
    message: 'Konto zostało zostało zaktualizowane'
  });
};
