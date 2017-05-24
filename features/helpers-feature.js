const Survey = require('./../src/models/survey');
const loadFixtures = require('./../src/fixtures/load');
const api = require('./helpers/api');

describe('The helpers of knoodle test suit', () => {
    it('can load database fixtures', (next) => {
        loadFixtures().then(() => {
            return Survey
                .find({name: /Javascript is amazing/})
                .exec()
            ;
        }).then(surveys => {
            expect(surveys).toBeDefined();
            expect(surveys[0]).toBeDefined();

            next();
        }).catch(e => console.error(e) || expect(e).not.toBeDefined() || next(e));
    });

    it('can use the api', (next) => {
        loadFixtures().then(() => {
            return api.get('/surveys', {name: 'Javascript'});
        }).then(surveys => {
            expect(surveys.length).toBe(1);
            expect(surveys[0].name).toContain('Javascript');

            next();
        }).catch(e => console.error(e) || expect(e).not.toBeDefined() || next(e));
    });
});
