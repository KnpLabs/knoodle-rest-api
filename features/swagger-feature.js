const api = require('./helpers/api');

describe('Swagger', () => {
    it('GET /swagger', (next) => {
        api
            .get('swagger.json')
            .then(d => {
                // TODO Ensure the swagger file integrity ?
                expect(d).toBeDefined();

                next();
            })
            .catch(e => console.error(e) || expect(e).not.toBeDefined() || next(e))
        ;
    });
});
