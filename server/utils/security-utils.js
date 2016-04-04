function checkPermissions(request, response, next) {
    if (request.isAuthenticated()) {
        next();
    } else {
        response.status(403);
        response.send({error: 'Access denied'})
    }
}

module.exports = {
    checkPermissions
};