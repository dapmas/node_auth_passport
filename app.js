const express = require('express');
const Logger = require('./lib/Logger');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const logger = new Logger('main');

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port:${PORT}`);
});
