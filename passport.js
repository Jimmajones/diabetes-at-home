const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Patient = require('./models/patients')
const Clinician = require('./models/clinicians')

// Serialize information to be stored in session/cookie
passport.serializeUser((user, done) => {
  done(undefined, { id: user._id, role: user.role })
})

// When a request comes in, deserialize/expand the serialized information
// back to what it was (expand from id to full user)
passport.deserializeUser((obj, done) => {

  // find user based on their roles
  switch (obj.role) {
    case 'patient':
      Patient.findById(obj.id, { password: 0 }, (err, user) => {
        if (err) {
          return done(err, undefined)
        }
        return done(undefined, user)
      })
      break;
    
    case 'clinician':
      Clinician.findById(obj.id, { password: 0 }, (err, user) => {
        if (err) {
          return done(err, undefined)
        }
        return done(undefined, user)
      })
      break;

    default: 
      break;
  }

})

// local strategy for patient role
passport.use('patient', new LocalStrategy({
    usernameField: 'email', // we wanna use email as the username
    // passwordField: 'password',
  },

  (username, password, done) => {
    Patient.findOne({ email: username }, {}, {}, (err, user) => {
      if (err) {
        return done(undefined, false, {
          message: 'Unknown error has occurred',
        })
      }
      if (!user) {
        return done(undefined, false, {
          message: 'Incorrect username or password',
        })
      }

      // Check password
      user.verifyPassword(password, (err, valid) => {
        if (err) {
          return done(undefined, false, {
            message: 'Unknown error has occurred',
          })
        }
        if (!valid) {
          return done(undefined, false, {
            message: 'Incorrect username or password',
          })
        }

        // If user exists and password matches the hash in the database
        return done(undefined, user)
      })
    })
  })
)

// local strategy for clinician role
passport.use('clinician', new LocalStrategy({
    usernameField: 'email',  // we wanna use email as a username
    // passwordField: 'password',
  },

  (username, password, done) => {
    Clinician.findOne({ email: username }, {}, {}, (err, user) => {
      if (err) {
        return done(undefined, false, {
          message: 'Unknown error has occurred',
        })
      }
      if (!user) {
        return done(undefined, false, {
          message: 'Incorrect username or password',
        })
      }

      // Check password
      user.verifyPassword(password, (err, valid) => {
        if (err) {
          return done(undefined, false, {
            message: 'Unknown error has occurred',
          })
        }
        if (!valid) {
          return done(undefined, false, {
            message: 'Incorrect username or password',
          })
        }

        // If user exists and password matches the hash in the database
        return done(undefined, user)
      })
    })
  })
)

module.exports = passport
