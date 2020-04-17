const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/config');
const Logger = require('./lib/Logger');

const logger = new Logger('main');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

// Setup passport config
require('./lib/passport')(passport);

const dbOptions = config.dbOptions;

// DB config
const mongoURI = dbOptions.MongoURI;

// Connect to Mongo Atlas
mongoose
  .connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Mongo DB connected...'))
  .catch((error) => console.log(error));

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session Middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// passport Middleware initialize => to be put right after express session
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global flash vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  logger.info(`Server running on port:${PORT}`);
});
