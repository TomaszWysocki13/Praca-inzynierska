import moment from 'moment';

export default (from, to, unit, dateFormat) => {
  const data = [];

  let start = moment(from).subtract(1, unit);
  const end = moment(to).add(1, unit);

  while (moment(start).isBefore(end)) {
    data.push({
      name: moment(start).format(dateFormat),
      count: 0
    });

    start = moment(start).add(1, unit);
  }

  return data;
};
