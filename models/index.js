// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')

// Connect to MongoDB using MONGO_URL env variable
mongoose
  .connect(process.env.MONGO_URL || 'mongodb://localhost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'diabetes-at-home',
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err, '\nFailed to connect to MongoDB...'))

// Exit on error
const db = mongoose.connection.on('error', (err) => {
  console.error(err)
  process.exit(1)
})

// Log to console once the database is open
db.once('open', async () => {
  console.log(`MongoDB connection started on ${db.host}:${db.port}!`)
})

require('./patients')
require('./clinicians')
require('./user')
