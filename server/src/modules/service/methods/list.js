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

  const data = await db.get('services').find({ owner: monk.id(user) });

  return res.json({ data });
};
