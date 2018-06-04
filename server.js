var pgp = require('pg-promise')()

const qs = require('query-string')
const express = require('express')
const app = express()
const request = require('request');
const dsKey = process.env['DARK_SKY_API_KEY']

const PORT = 5000;

var db = pgp({
  database: 'db_travelkit'
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

app.get('/triposo', (req, res) => {
  if (req.query.req_type === 'cities') {
    let data = {
      tag_labels: 'city',
      count: '10',
      account: 'C995KGMT',
      token: 'w1iffxcmvhlgj9y76d6ass468nxzt07l'
    }
    let query = qs.stringify(data)
    let url = 'https://www.triposo.com/api/20180507/location.json?' + query
    request(url, (err, resp, body) => {
      res.json(body)
    })

  } else if (req.query.req_type === 'food') {
    let data = {
      label: 'eatingout',
      count: '10',
      offset: '24',
      account: 'C995KGMT',
      token: 'w1iffxcmvhlgj9y76d6ass468nxzt07l'
    }
    let query = qs.stringify(data)
    let url = 'https://www.triposo.com/api/20180507/tag.json?' + query
    request(url, (err, resp, body) => {
      res.json(body)
    })

  } else if (req.query.req_type === 'beaches') {
    let data = {
      child_tag_labels: 'diving',
      diving_score: '>5',
      count: '10',
      offset: '20',
      account: 'C995KGMT',
      token: 'w1iffxcmvhlgj9y76d6ass468nxzt07l'
    }
    let query = qs.stringify(data)
    let url = 'https://www.triposo.com/api/20180507/location.json?' + query
    request(url, (err, resp, body) => {
      res.json(body)
    })

  } else if (req.query.req_type === 'museums') {
    let data = {
      label: 'museums',
      count: '10',
      offset: '16',
      account: 'C995KGMT',
      token: 'w1iffxcmvhlgj9y76d6ass468nxzt07l'
    }
    let query = qs.stringify(data)
    let url = 'https://www.triposo.com/api/20180507/tag.json?' + query
    request(url, (err, resp, body) => {
      res.json(body)
    })
  }
})


app.get('/cityinfo', (req, res) => {
  let { lat, lng, date } = req.query
  request({
  url: `https://api.darksky.net/forecast/${dsKey}/${lat},${lng},${date}`
  }, function(err, resp, body) {
    res.json(JSON.parse(body))
  })
})



//Need to set up database to store weather details
