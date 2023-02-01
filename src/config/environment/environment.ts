require('dotenv').config();

module.exports = {
  // Server IP
  ip: process.env.REPORTING_IP || '0.0.0.0',

  // Server port
  port: process.env.REPORTING_PORT || 9000,
};
