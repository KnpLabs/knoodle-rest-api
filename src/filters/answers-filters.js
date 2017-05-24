module.exports = function createFilters(queries) {
    let filters = {};

    filters.limit = parseInt(queries.limit) || 25;
    filters.skip = (parseInt(queries.page) - 1) * filters.limit;

    if (queries.user) {
        filters['$or'] = [
            {email: new RegExp(queries.user)},
            {name: new RegExp(queries.user)}
        ];
    }

    return filters;
};
