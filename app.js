const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const config = require('./config/config');
const Logger = require('./lib/Logger');

const logger = new Logger('main');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

const dbOptions = config.dbOptions;

// DB config
const mongoURI = dbOptions.MongoURI;

// Connect to Mongo Atlas
mongoose
  .connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Mongo DB connected...'))
  .catch((error) => console.log(error));

// EjS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  logger.info(`Server running on port:${PORT}`);
});
