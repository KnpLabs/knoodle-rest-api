module.exports = function createFilters(queries) {
    let filters = {};

    if (queries.user) {
        filters['$or'] = [
            {email: new RegExp(queries.user)},
            {name: new RegExp(queries.user)}
        ];
    }

    return filters;
};
