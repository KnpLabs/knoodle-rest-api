const faker = require('faker');
const Survey = require('./../models/survey');

module.exports = function generateFixtures() {
    let surveys = [new Survey({
        name: 'Javascript is amazing, isn\'yt it ?',
        description: 'Tell us what you think about javascript !',
        questions: [
            {
                title: 'Do you like ECMA6 ?',
                answers: ['yes', 'no, it sucks', 'ECMA6 ? What is that ?'],
            },
            {
                title: 'ReactJS rocks ?',
                answers: ['Not sure yet', 'no', 'yes!'],
            },
            {
                title: 'Do you heard about javascript Symbol ?',
                answers: ['Symbol ? No, never', 'Of course, i used them a lot', 'Not sure of me, i would say maybe ?'],
            }
        ],
    })];

    for (let i = 0; i < 100; i++) {
        surveys.push(new Survey({
            name: `${faker.lorem.sentence()} ?`,
            description: `${faker.lorem.sentences()}`,
            questions: Array.prototype.map.call([1, 2, 3], e => {
                return {
                    title: `${faker.lorem.sentence()} ?`,
                    answers: [
                        'Yes',
                        'No',
                        'Maybe'
                    ]
                }
            })
        }));
    }

    return surveys;
}
