/**
 * Returnes function which responds with 403
 * if at least one of passed predicates returnes false
 * (if request isAuthenticated is checked by default)
 * and calls "next" otherwise
 */
function checkPermissions(...predicates) {
    predicates.unshift(isAuthenticated);
    return (request, response, next) => {
        if (predicates.every(predicate => predicate(request.user, request))) {
            next();
        } else {
            response.status(403);
            response.send({ error: 'Access denied' });
        }
    };
}

function isAuthenticated(user, request) {
    return request.isAuthenticated();
}

module.exports = {
    checkPermissions,
};
