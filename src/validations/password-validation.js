const regexp = /^\w\S*$/i;

module.exports = password => regexp.test(password);
