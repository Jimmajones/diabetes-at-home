function is_today(date) {
  today = new Date()
  if (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  ) {
    return true
  }
  return false
}

function finished_decimal(patient) {
  let numOverall = patient.thresholds.length
  let numDone = patient.thresholds.length
  let latest_record = patient.daily_data[patient.daily_data.length - 1]
  if (!latest_record) {
    // This patient has no daily data at all.
    numDone = 0
  } else if (is_today(latest_record.when)) {
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

  return numDone / numOverall
}

module.exports = {
  format_date: function (date) {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yy = date.getFullYear()
    return dd + '/' + mm + '/' + yy
  },

  strEqual: function (string1, string2) {
    return string1 == string2
  },

  // Find out whether patient needs to fill in specific value.
  needs_to_be_done: function (patient, value_type) {
    let isNecessary = 0
    let latest_record = patient.daily_data[patient.daily_data.length - 1]
    for (let i = 0; i < patient.thresholds.length; i++) {
      if (patient.thresholds[i].type == value_type) {
        isNecessary = 1
      }
    }

    if (!latest_record || !is_today(latest_record.when)) {
      // No record and part, check patient threshold.
      if (isNecessary) {
        return true
      } else {
        return false
      }
    } else {
      // There's a record for today, check if it's been filled in.
      for (let i = 0; i < latest_record.values.length; i++) {
        if (
          latest_record.values[i].type == value_type &&
          latest_record.values[i].status == 'incomplete'
        ) {
          return true
        }
      }
      return false
    }
  },

  is_today: function (date) {
    return is_today(date)
  },
  // Find out whether patient has filled in all necessary data.
  is_done: function (patient) {
    return finished_decimal(patient) >= 1
  },

  // Get the percent of data values filled in for this patient.
  completionRate: function (patient) {
    return Math.ceil(finished_decimal(patient) * 100)
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
    latest_record = daily_data[daily_data.length - 1]
    if (!latest_record) {
      return '-'
    } else if (!is_today(latest_record.when)) {
      return '-'
    } else if (latest_record.values[index].value != null) {
      return latest_record.values[index].value
    } else {
      return '-'
    }
  },

  isRequiredData: function (thresholds, type) {
    if (thresholds.find((threshold) => threshold.type == type)) {
      return 'checked'
    }
  },

  showThreshold: function (thresholds, type, bound) {
    // for (let i = 0; i < thresholds.length; i++) {
    //   if (thresholds[i].type == type) {
    //     return i
    //   }
    // })
    for (let threshold of thresholds) {
      if (threshold.type == type) {
        if (bound == 'lower') {
          return threshold.lower
        } else {
          return threshold.upper
        }
      }
    }
    return null
  },

  // isDataRequired: function (threshold, typeData, isRequired) {
  //   for (let i = 0; i < threshold.length; i++) {
  //     if (threshold[i].type.localeCompare(typeData) == 0) {
  //       if (isRequired) {
  //         return 'checked'
  //       } else {
  //         return ''
  //       }
  //     }
  //   }
  //   if (isRequired) {
  //     return ''
  //   }
  //   return 'checked'
  // },
}
