const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  fs.readFile(__dirname + req.url, (err,data) => {
    if (err) {
      res.writeHead(404)
      res.end(JSON.stringify(err))
      return
    }
    res.writeHead(200)
    res.end(data)
  })
})

server.listen(3000, () => console.log('server started'))
