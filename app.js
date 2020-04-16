const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const Logger = require('./lib/Logger');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const logger = new Logger('main');

const app = express();
const PORT = process.env.PORT;

// EjS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  logger.info(`Server running on port:${PORT}`);
});
