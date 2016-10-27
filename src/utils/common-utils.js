
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

function isAuthorOf(user, post) {
    return (isEditor(user) || post.type === 'suggest') && user._id === (post.author && post.author._id);
}

module.exports = {
    hasRoles,
    isAdmin,
    isEditor,
    isAuthorOf,
};
