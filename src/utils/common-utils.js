
function hasRoles(user, ...roles) {
    const userRoles = user.roles;
    return roles.every(role => userRoles && ~userRoles.indexOf(role));
}

function isAdmin(user) {
    return hasRoles(user, 'admin');
}

function isEditor(user) {
    return hasRoles(user, 'editor');
}

module.exports = {
    hasRoles,
    isAdmin,
    isEditor,
};
