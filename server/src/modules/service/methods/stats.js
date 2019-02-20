import monk from 'monk';
import moment from 'moment';
import db from '../../../db';
import timeRange from '../../../utils/timeRange';
import validate from '../../../utils/validate';
import { stats } from '../schema';

export default async (req, res) => {
  let params;

  const {
    type, unit, from, to
  } = req.query;

  try {
    params = await validate(
      {
        id: req.params.id,
        user: req.user._id,
        from: moment(from, 'YYYYMMDD').toDate(),
        to: moment(to, 'YYYYMMDD').toDate(),
        type,
        unit
      },
      stats
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

  let groupedBy = null;
  let project = {};
  let dateFormat = '';

  switch (params.unit) {
    case 'year':
      groupedBy = {
        year: '$date.year'
      };

      project = {
        date: {
          $dateFromParts: {
            year: '$_id.year'
          }
        }
      };

      dateFormat = 'YYYY';

      break;

    case 'month':
      groupedBy = {
        year: '$date.year',
        month: '$date.month'
      };

      project = {
        date: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month'
          }
        }
      };

      dateFormat = 'YYYY-MM';

      break;

    case 'day':
      groupedBy = {
        year: '$date.year',
        month: '$date.month',
        day: '$date.day'
      };

      project = {
        date: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day'
          }
        }
      };

      dateFormat = 'YYYY-MM-DD';

      break;

    default:
      groupedBy = {
        year: '$date.year',
        month: '$date.month',
        day: '$date.day',
        hour: '$date.hour'
      };

      project = {
        date: {
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day',
            hour: '$_id.hour'
          }
        }
      };

      dateFormat = 'YYYY-MM-DD HH';

      break;
  }

  const data = await db
    .get('track')
    .aggregate([
      {
        $match: {
          createdAt: {
            $gte: params.from,
            $lte: params.to
          },
          sid: monk.id(params.id),
          type: params.type
        }
      },
      {
        $project: {
          sid: 1,
          type: 1,
          uri: 1,
          createdAt: 1,
          date: { $dateToParts: { date: '$createdAt' } }
        }
      },
      {
        $group: {
          _id: groupedBy,
          count: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          _id: 0,
          count: 1,
          ...project
        }
      },
      {
        $sort: {
          date: 1
        }
      }
    ])
    .then((result) => {
      const prepared = result.map(item => ({
        ...item,
        date: undefined,
        name: moment(item.date).format(dateFormat)
      }));

      return timeRange(params.from, params.to, params.unit, dateFormat).map((item) => {
        const opts = prepared.find(({ name }) => name === item.name);

        return { ...item, ...opts };
      });
    });

  return res.json({ data });
};
