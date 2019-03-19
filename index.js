// Рабочий сервер
const bodyParser = require("body-parser");
const Chart = require('chart.js')
const request = require('request')
const express = require('express')
const cheerio = require('cheerio')
const path = require('path')
const app = express()
const port = 3000
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

var URL = 'https://www.cbr.ru/currency_base/dynamics/?UniDbQuery.Posted=True&UniDbQuery.mode=1&UniDbQuery.date_req1=&UniDbQuery.date_req2=&UniDbQuery.VAL_NM_RQ=R01100&UniDbQuery.FromDate=01.01.2009&UniDbQuery.ToDate=16.03.2019';

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
app.get('/api', (req, res) => {

  request(URL, function(err, response, body) {
    if (err) throw err;
    var $ = cheerio.load(body);
    var dataJSON = $("table.data").text()
    dataJSON = dataJSON.replace(/\s+/g, " ")
      .split(" ");

    //console.log(dataJSON);
    var mounth = []
    var value = []
    // var cell = []
    for (var i = 6; i < dataJSON.length - 6; i = i + 3) {
      mounth.push(dataJSON[i])
      value.push(dataJSON[i + 2])
    }
    // console.log('mounth', mounth)
    // console.log('value', value)
    res.send({
      mounth: mounth,
      value: value

    });
  })
})
app.get('/', (req, res) => {
  res.render("index")
})
// Test
