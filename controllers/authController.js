const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  return next()
}

const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  // if already authorized go to dashboard
  return res.redirect('/home')
}

const isPatient = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user && req.user.role === 'patient') {
      return next()
    }
  }
  // If user is not authenticated via passport, redirect to login page
  // replace with error webpage?
  return res.redirect('/login')
}

const isClinician = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user && req.user.role === 'clinician') {
      return next()
    }
  }
  // If user is not authenticated via passport, redirect to login page
  // replace with error webpage?
  return res.redirect('/login')
}

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
  isPatient,
  isClinician,
}
