var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Timestampifier Micro Service'});
});

router.get('/:time', function(req, res) {
  var input = normalize(req.params.time)
  // check for number string
  var isNaN = Number.isNaN(Number(input))
  var unixTime = null
  var naturalTime = null
  //check for any character in the param string
  var regEx = /[A-Za-z-]/g

  // check if input is a number first, then if not, check if it is a valid date
  if (!isNaN) {
    unixTime = input
    naturalTime = moment.unix(input).format('MMMM Do, YYYY')
  } else if (input.match(regEx) && moment(input).isValid()) {
    naturalTime = moment(input).format('MMMM Do, YYYY')
    unixTime = moment(input).unix().toString()
  }

  // return timestamp object with new values or null
  return res.json({unix: unixTime, natural: naturalTime})
})

function normalize(str) {

  // remove ordinals from str
  var newStr = str.replace(/(\d+)(st|nd|rd|th)/, "$1")

  // replace dots with dashes
  newStr = newStr.replace(/\./g,'-')

  return newStr
}

module.exports = router;
