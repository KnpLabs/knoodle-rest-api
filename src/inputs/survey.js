module.exports = function createSurveyInput(request) {
    let input = {errors: [], data: {}};

    if (!request.body) {
        input.errors.push('No body has been provided');

        return input;
    }

    if (!request.body.name) {
        input.errors.push('You must provide a survey name');

        return input;
    }

    input.data.name = request.body.name.trim().charAt(0).toUpperCase() + request.body.name.trim().toLowerCase().slice(1);

    if (!request.body.author) {
        request.body.author = {
            email: 'hello@knplabs.com',
            name: 'KNP Labs',
        };
    }

    if (!request.body.author.email) {
        input.errors.push('You must specified an author email');

        return input;
    }

    if (!request.body.author.name) {
        input.errors.push('You must specified an author name');

        return input;
    }

    if (!request.body.author.email.trim().match(/^([^@ ]+)@([^ ]*)(\.)([a-zA-Z]{1,3})$/)) {
        input.errors.push(`Invalid email format`);

        return input;
    }

    input.data.author = {
        name: request.body.author.name.trim(),
        email: request.body.author.email.trim(),
    };

    if (!request.body.questions || !request.body.questions.length) {
        input.errors.push('You must specified questions');

        return input;
    }

    input.data.questions = [];

    for (let index in request.body.questions) {
        let question = request.body.questions[index];

        if (!question.title) {
            input.errors.push(`The question at index ${index} must have a title`);

            continue;
        }

        if (!question.answers || !question.answers.length) {
            input.errors.push(`The questions at index ${index} must have answers`);

            continue;
        }

        input.data.questions.push(question);
    }

    return input;
};
