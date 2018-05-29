const hapi = require('hapi')
const mongoose = require('mongoose')
const Painting = require('./models/Painting')

mongoose.connect('mongodb://mlarson:wisconsin3@ds237770.mlab.com:37770/hapi-api')

mongoose.connection.once('open', () => {
  console.log('connected to db!')
})

const server = hapi.server({
  port: 4000,
  host: 'localhost'
})

const init = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: function (req, res) {
        return `<h1>Hapi api</h1>`
      }
    },
    {
      method: 'GET',
      path: '/api/v1/paintings',
      handler: (req, res) => {
        return Painting.find()
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      handler: (req, res) => {
        const { name, url, techniques } = req.payload
        const painting = new Painting({
          name,
          url,
          techniques
        })
        return painting.save()
      }
    }
  ])
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()