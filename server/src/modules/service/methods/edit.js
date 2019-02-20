import monk from 'monk';
import db from '../../../db';
import validate from '../../../utils/validate';
import { edit } from '../schema';

export default async (req, res) => {
  let params;

  try {
    params = await validate({ ...req.body, id: req.params.id, user: req.user._id }, edit);
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const data = await db
    .get('services')
    .findOne({ _id: monk.id(params.id), owner: monk.id(params.user) });

  if (!data) {
    return res.status(404).json({ message: 'Serwis z podanym id nie istnieje.' });
  }

  await db.get('services').update(
    { _id: monk.id(params.id) },
    {
      $set: {
        ...params,
        updatedAt: new Date()
      }
    }
  );

  return res.json({
    message: 'Serwis został zaktualizowany'
  });
};
