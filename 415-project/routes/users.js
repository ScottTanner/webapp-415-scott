var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json([
		{id: 1, username:"Scott"},
		{id: 2, username:"Bob"},
		{id: 3, username:"Kim"},
		{id: 4, username:"Meagan"}
	]);
});

module.exports = router;
