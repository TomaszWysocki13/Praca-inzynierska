import monk from 'monk';
import db from '../../../db';
import validate from '../../../utils/validate';
import { add } from '../schema';

export default async (req, res) => {
  let params;

  try {
    params = await validate({ ...req.body, user: req.user._id }, add);
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const isUniq = await db.get('services').findOne({ name: params.name });

  if (isUniq) {
    return res.status(409).json({ message: 'Ta serwis jest już zajęty' });
  }

  await db.get('services').insert({
    ...params,
    owner: monk.id(params.user),
    createdAt: new Date()
  });

  return res.json({ message: 'Serwis został poprawnie dodany' });
};
