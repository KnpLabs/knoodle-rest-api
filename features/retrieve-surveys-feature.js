const loadFixtures = require('./../src/fixtures/load');
const api = require('./helpers/api');

describe('The api surveys', () => {
    beforeEach((next) => {
        loadFixtures().then(next).catch(e => next(e));
    });

    it('can be retrieve and limited to 25 results by default', (next) => {
        api
            .get('/surveys')
            .then(surveys => {
                expect(surveys.length).toBe(25);

                next();
            })
            .catch(next)
        ;
    });
});
