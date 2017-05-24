const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

module.exports = function swagger(request, response) {
    try {
        response.json(yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', '..', 'swagger.yml'))));
    } catch (error) {
        response.status(500).json(error);
    }
};
