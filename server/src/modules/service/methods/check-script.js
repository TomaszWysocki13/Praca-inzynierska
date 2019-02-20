import monk from 'monk';
import db from '../../../db';
import validate from '../../../utils/validate';
import crawlScript from '../../../utils/crawl-script';
import { id } from '../schema';

export default async (req, res) => {
  let sid;

  try {
    sid = await validate(req.params.id, id);
  } catch ({ errors }) {
    return res.status(400).json({ errors });
  }

  const data = await db.get('services').find({ _id: monk.id(sid) });

  if (!data) {
    return res
      .status(404)
      .json({ message: 'Serwis z wybranym identyfikatorem nie został znaleziony' });
  }

  const { exists } = await crawlScript({ sid: data._id, uri: data.uri });

  if (!exists) {
    return res.status(404).json({ message: 'Kod śledzący nie został znaleziony' });
  }

  return res.status(200).json({ message: 'Kod śledzący został znaleziony' });
};
