const loadFixtures = require('./../src/fixtures/load');
const api = require('./helpers/api');

describe('Surveys', () => {
    beforeEach((next) => {
        loadFixtures().then(next).catch(e => next(e));
    });

    it('GET /surveys', (next) => {
        api
            .get('/surveys')
            .then(surveys => {
                expect(surveys.length).toBe(25);

                next();
            })
            .catch(e => console.error(e) || expect(e).not.toBeDefined() || next(e))
        ;
    });

    it('GET /surveys/:id', (next) => {
        api
            .get('/surveys')
            .then(surveys => {
                return api.get(`/surveys/${surveys[0]._id}`);
            })
            .then(s => {
                expect(s).toBeDefined();
                expect(s.name).toBeDefined();

                next();
            })
            .catch(e => console.error(e) || expect(e).not.toBeDefined() || next(e))
        ;
    });

    it('POST /surveys', (next) => {
        api
            .post('/surveys', {
                name: 'Some testing survey',
                author: {
                    name: 'Michel',
                    email: 'michel@random.com',
                },
                questions: [{
                    title: 'Test 1 ?',
                    answers: ['yes', 'no', 'maybe'],
                }, {
                    title: 'Test 2 ?',
                    answers: ['yes', 'no'],
                }],
            })
            .then(s => {
                expect(s.name).toBe('Some testing survey');
                expect(s.author.name).toBe('Michel');
                expect(s.author.email).toBe('michel@random.com');
                expect(s.questions.length).toBe(2);

                next();
            })
            .catch(e => console.error(e) || expect(e).not.toBeDefined() || next(e))
        ;
    });

    it('PATCH /surveys/:id', (next) => {
        api
            .get('/surveys')
            .then(surveys => api.get(`/surveys/${surveys[0]._id}`))
            .then(survey => {
                name = survey.name;

                return api.patch(`/surveys/${survey._id}`, {
                    name: 'Saperlipopette',
                });
            })
            .then(survey => {
                expect(survey.name).toBe('Saperlipopette');

                return api.get('/surveys', {name: 'Saperlipopette'});
            })
            .then(surveys => {
                expect(surveys.length).toBe(1);
                expect(surveys[0].name).toBe('Saperlipopette');

                next();
            })
            .catch(e => console.error(e) || expect(e).not.toBeDefined() || next(e))
        ;
    });
});
