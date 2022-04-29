module.exports = {
  format_date: function (date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yy = date.getFullYear()
    return dd + '/' + mm + '/' + yy
  },
}
