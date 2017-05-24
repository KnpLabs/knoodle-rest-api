module.exports = function createSurveyFilters(request) {
    let filters = {};

    if (request.query.name) {
        filters.name = new RegExp(`${request.query.name}`, 'g');
    }

    if (request.query.author) {
        let q = new RegExp(request.query.author, 'g');

        filters['$or'] = [
            {'author.email': q},
            {'author.name': q},
        ];
    }

    if (request.query.question) {
        let q = new RegExp(request.query.question, 'g');

        filters.questions = {
            '$elemMatch': {
                title: q
            }
        }
    }

    return filters;
};
