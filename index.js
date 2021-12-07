const express = require('express')
const app = express()
const membersAPI = require('./routes/api/members')

// // Body parser middleware
// parses request body content as json for backend handling
app.use(express.json())
// // Custom memberlist CRUD middleware
// performs typical CRUD operations
app.use('/api/members', membersAPI)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}...`)
})