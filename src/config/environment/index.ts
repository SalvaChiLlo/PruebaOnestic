require('dotenv').config();

const envFile = require('./environment');

const extraConfig = {

};

export default Object.assign(extraConfig, envFile || {});
