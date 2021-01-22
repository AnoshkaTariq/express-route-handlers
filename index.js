const config = require('config');

const express = require('express');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');
// const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');

const courses = require('./routes/courses');


const app = express();

// app.use() is used to call middleware functions in sequence
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(authenticate);
// app.use(helmet());
// app.use(morgan('tiny'));
debug(app.get('env'));
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}


app.use('/api/courses', courses);
app.set('view engine', 'pug');
// app.set('views', './views');


app.get('/', (req, res) => {
    res.render('index', { title: 'My express app', message: 'Hello' });
});





// get route 
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});


// setting the environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}`));
debug(`NODE_ENV: ${process.env.NODE_ENV}`);


debug(`Application Name: ${config.get('name')},  Mail-server:  ${config.get('mail.host')}`);

debug(`Mail Password:  ${config.get('mail.password')}`);