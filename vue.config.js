const spaConfig = require("./vue.config.spa.js");
const libConfig = require("./vue.config.lib.js");

const config = process.env.NODE_ENV_TYPE === "lib" ? libConfig : spaConfig
module.exports = config