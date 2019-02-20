import monk from 'monk';
import db from '../../../db';
import validate from '../../../utils/validate';
import { userAndEntity } from '../schema';

export default async (req, res) => {
  let params;

  try {
    params = await validate(
      {
        id: req.params.id,
        user: req.user._id
      },
      userAndEntity
    );
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const data = await db
    .get('services')
    .findOne({ _id: monk.id(params.id), owner: monk.id(params.user) });

  if (!data) {
    return res.status(404).json({ message: 'Serwis z podanym id nie istnieje' });
  }

  await db.get('services').remove({ _id: monk.id(params.id) });

  return res.json({ message: 'Serwis został usunięty' });
};
