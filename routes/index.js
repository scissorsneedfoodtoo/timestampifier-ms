var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Timestampifier Micro Service'});
});

router.get('/:time', function(req, res) {
  var input = normalize(req.params.time)
  var numCheck = parseInt(input)
  var unixTime = null
  var naturalTime = null
  //check for any character in the param string
  var regEx = /[A-Za-z-]/g

  if (input.match(regEx) && moment(input).isValid()) {
    naturalTime = moment(input).format('MMMM Do, YYYY')
    unixTime = moment(input).unix().toString()
  } else if (numCheck) {
    unixTime = numCheck.toString()
    naturalTime = moment.unix(numCheck).format('MMMM Do, YYYY')
  }

  res.json( outputer(unixTime, naturalTime) )
})

function normalize(str) {

  // remove ordinals from str
  var newStr = str.replace(/(\d+)(st|nd|rd|th)/, "$1")

  // replace dots with dashes
  newStr = newStr.replace(/\./g,'-')

  return newStr
}

function outputer(a, b) {
  return { unix: a, natural: b}
}

module.exports = router;
