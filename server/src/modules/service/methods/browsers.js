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

  const service = await db
    .get('services')
    .findOne({ _id: monk.id(params.id), owner: monk.id(params.user) });

  if (!service) {
    return res.send(404).json({ message: 'Serwis z podanym id nie istnieje' });
  }

  const data = await db.get('track').aggregate([
    {
      $match: {
        sid: monk.id(params.id)
      }
    },
    {
      $group: {
        _id: '$user.browser',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        browser: { $ifNull: ['$_id', 'Nie rozpoznano'] },
        count: 1
      }
    },
    {
      $sort: {
        count: -1
      }
    }
  ]);

  return res.json({ data });
};
