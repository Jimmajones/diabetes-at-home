module.exports = {
  format_date: function (date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yy = date.getFullYear()
    return dd + '/' + mm + '/' + yy
  },

  today_data: function (daily_data) {
    /*
    let record = daily_data[daily_data.length - 1]
    if (!record) {
      return true
    }
    let record_date = record.when
    let today = new Date()
    if (
      record_date.getDate() == today.getDate() &&
      record_date.getMonth() == today.getMonth() &&
      record_date.getFullYear() == today.getFullYear()
    ) {
      return false
    } else {
      return true
    }
    */
    return true
  },

  strEqual: function (string1, string2) {
    return string1 == string2
  },

  // to-do
  completionRate: function (daily_data) {
    let record = daily_data[daily_data.length - 1]
  },

  showStatus: function (daily_data) {
    let isComplete = true
    let isWithinThreshold = true
    let record = daily_data[daily_data.length - 1]

    for (let data of record.values) {
      if (data.status == 'incomplete') {
        isComplete = false
      } else if (data.status == 'outside-threshold') {
        isWithinThreshold = false
      }
    }

    if (isComplete && isWithinThreshold) {
      return 'good'
    } else if (!isComplete && isWithinThreshold) {
      return 'incomplete'
    } else if (isComplete && !isWithinThreshold) {
      return 'outside-threshold'
    } else {
      return 'both'
    }
  },
}
