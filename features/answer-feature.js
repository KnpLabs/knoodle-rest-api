const loadFixtures = require('./../src/fixtures/load');
const Answer = require('./../src/models/answer');
const api = require('./helpers/api');

describe('Answers', () => {
    beforeEach((next) => {
        loadFixtures().then(next).catch(next);
    });

    it('POST|GET /surveys/:id/answers', (next) => {
        api
            .get('/surveys')
            .then(s => {
                return api.post(`/surveys/${s[0]._id}/answers`, {
                    user: {
                        email: 'test@test.com',
                        name: 'test',
                    },
                    answers: [
                        {question: 0, choice: 0},
                        {question: 1, choice: 2},
                        {question: 2, choice: 0}
                    ]
                });
            })
            .then(d => {
                expect(d.user.name).toBe('test');

                return api.get(`/surveys/${d.survey}/answers`);
            })
            .then(d => {
                expect(d.length).toBe(1);

                next();
            })
            .catch(e => console.error(e) || expect(e).not.toBeDefined() || next(e))
        ;
    });
});
