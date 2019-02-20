import monk from 'monk';
import db from '../../../db';
import validate from '../../../utils/validate';
import { id } from '../schema';

export default async (req, res) => {
  let user;

  try {
    user = await validate(req.user._id, id);
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const services = await db.get('services').find({ owner: monk.id(user) });

  const ids = services.map(item => item._id);

  const count = await db.get('track').count({ sid: { $in: ids } });

  return res.json({ count });
};
