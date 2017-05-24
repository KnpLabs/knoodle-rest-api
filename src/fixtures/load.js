const getSurveys = require('./surveys');
const Survey = require('./../models/survey');
const Answer = require('./../models/answer');

module.exports = function cleanAndLoadFixtures() {
    return Survey
        .remove({})
        .then(d => {
            return Answer.remove({});
        })
        .then(d => {
            let promises = [];

            for (let survey of getSurveys()) {
                promises.push(survey.save());
            }

            return Promise.all(promises);
        })
        .catch(e => console.error(e))
    ;
};
