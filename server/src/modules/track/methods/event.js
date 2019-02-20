import monk from 'monk';
import geoip from 'geoip-lite';
import db from '../../../db';
import validate from '../../../utils/validate';
import { event } from '../schema';

export default async (req, res) => {
  const { sid } = req.params;
  const { type, uri } = req.query;
  const geo = geoip.lookup(req.ip);

  let params;

  try {
    params = await validate(
      {
        sid,
        type,
        uri,
        user: {
          ip: req.ip,
          browser: req.headers['user-agent'],
          language: req.headers['accept-language'],
          country: geo ? geo.country : 'Unknown',
          region: geo ? geo.region : 'Unknown',
          city: geo ? geo.city : 'Unknown'
        }
      },
      event
    );
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const check = await db.get('services').findOne({ _id: monk.id(sid), status: true });

  if (!check) {
    return res.status(404).json({ message: 'Serwis nie istnieje lub jest wyłączony' });
  }

  await db.get('track').insert({
    ...params,
    sid: monk.id(params.sid),
    createdAt: new Date()
  });

  return res.sendStatus(200);
};
