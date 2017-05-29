module.exports = function createSurveyFilters(request) {
    let filters = {};

    if (request.query.name) {
        filters.name = new RegExp(`${request.query.name}`, 'gi');
    }

    if (request.query.author) {
        let q = new RegExp(request.query.author, 'gi');

        filters['$or'] = [
            {'author.email': q},
            {'author.name': q},
        ];
    }

    if (request.query.question) {
        let q = new RegExp(request.query.question, 'gi');

        filters.questions = {
            '$elemMatch': {
                title: q
            }
        }
    }

    return filters;
};
