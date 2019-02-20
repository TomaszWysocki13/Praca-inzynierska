import express from 'express';
import bodyParser from 'body-parser';
import i18n from 'i18n';

// routes
import user from './modules/user';
import track from './modules/track';
import service from './modules/service';

// init express
const app = express();

// trust proxy
app.set('trust proxy', true);

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// locales
i18n.configure({
  locales: ['pl'],
  defaultLocale: 'pl',
  directory: `${__dirname}/locales`
});
app.use(i18n.init);

// routes
app.use('/user', user);
app.use('/track', track);
app.use('/service', service);

app.listen(3010, () => console.log('App listen on port 3010'));
