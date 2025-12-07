const yaml = require('js-yaml');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Fichero de configuración por defecto
let configFile = 'src/configuration/config.prod.yaml';

// Permite cambiar el fichero con: node app.js --config src/configuration/config.local.yaml
const argv = yargs(hideBin(process.argv)).argv;
if (argv.config !== undefined) {
  configFile = argv.config;
}

// Lee y parsea YAML
const config = yaml.load(fs.readFileSync(configFile, 'utf-8'));

module.exports = {
  config
};
