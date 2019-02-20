import monk from 'monk';
import db from '../../../db';
import validate from '../../../utils/validate';
import { account } from '../schema';

export default async (req, res) => {
  let params;

  try {
    params = await validate(
      {
        id: req.user._id || req.params.id
      },
      account
    );
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const data = await db.get('users').findOne({ _id: monk.id(params.id) }, { password: 0 });

  return res.json({ data });
};
