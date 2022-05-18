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

  // Get the percent of data values filled in for this patient.
  completionRate: function (patient) {
    let numOverall = patient.thresholds.length
    let numDone = patient.thresholds.length
    let latest_record = patient.daily_data[patient.daily_data.length - 1]
    let today = new Date()
    if (!latest_record) {
      // This patient has no daily data at all.
      numDone = 0
    } else if (
      latest_record.when.getDate() == today.getDate() &&
      latest_record.when.getMonth() == today.getMonth() &&
      latest_record.when.getFullYear() == today.getFullYear()
    ) {
      // This patient has submitted some data for today.
      // Check each value for its status.
      for (let data of latest_record.values) {
        if (data.status == 'incomplete') {
          numDone = numDone - 1
        }
      }
    } else {
      // This patient hasn't entered any data for today.
      numDone = 0
    }

    return (numDone / numOverall) * 100
  },

  showStatus: function (daily_data) {
    let isComplete = true
    let isWithinThreshold = true
    const record = daily_data[daily_data.length - 1]

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

  needWarning: function (status) {
    return status == 'incomplete' || status == 'outside-threshold'
  },

  showTypeName: function (type) {
    if (type == 'blood_glucose') {
      return 'Blood glucose level'
    } else if (type == 'weight') {
      return 'Weight'
    } else if (type == 'insulin') {
      return 'Insulin doses'
    } else {
      return 'Exercise steps'
    }
  },

  showWarningText: function (status) {
    let text = 'The patient '
    if (status == 'good') {
      text += 'has filled in this data for today.'
    } else if (status == 'incomplete') {
      text += 'has not filled in this data for today.'
    } else if (status == 'outside-threshold') {
      text +=
        'has either exceeded or not met the safety threshold for this data, please advise.'
    }
    return text
  },

  getCurrentData: function (daily_data, index) {
    return daily_data[daily_data.length - 1].values[index].value
  },

  isDataRequired: function (threshold, typeData, isRequired) {
    for (let i = 0; i < threshold.length; i++) {
      if (threshold[i].type.localeCompare(typeData) == 0) {
        if (isRequired) {
          return 'checked'
        } else {
          return ''
        }
      }
    }
    if (isRequired) {
      return ''
    }
    return 'checked'
  },
}
