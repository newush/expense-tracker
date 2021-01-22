module.exports = {
  ifeq: function (a, b, options) {
    if (String(a) === String(b)) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  formatDate: function (datetime) {
    return datetime.toLocaleDateString('en-US')
  },
  convertDate: function (date) {
    return date.toISOString().split('T')[0];
  }
}
