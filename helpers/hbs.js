module.exports = {
  ifeq: function (a, b, options) {
    console.log(a, b, String(a) == String(b))

    if (String(a) === String(b)) {
      return options.fn(this)
    }
    return options.inverse(this)
  }
}