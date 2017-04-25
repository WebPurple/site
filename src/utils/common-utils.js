function isString(str) {
    return typeof str === 'string';
}

function isFunction(func) {
    return Object.prototype.toString.call(func) == '[object Function]'; // eslint-disable-line eqeqeq
}

function hasRoles(user, ...roles) {
    const userRoles = user.roles;
    return roles.every(role => userRoles && userRoles.indexOf(role) !== -1);
}

function isAdmin(user) {
    return hasRoles(user, 'admin');
}

function isEditor(user) {
    return hasRoles(user, 'editor');
}

function isAuthorOf(user, { type, author }) {
    const authorId = (author && author._id) || author;
    return (isEditor(user) || type === 'suggest') && (isFunction(authorId.equals) ? authorId.equals(user._id) : user._id === authorId);
}

module.exports = {
    isString,
    isFunction,
    hasRoles,
    isAdmin,
    isEditor,
    isAuthorOf,
};
