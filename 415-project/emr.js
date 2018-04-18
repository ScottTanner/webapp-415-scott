var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var jsonData=`{"emrs":[
            {"name":"Messi", "health":"Excellent"},
            {"name":"Ronaldo", "health":"Good"},
            {"name":"Costa", "health":"Poor"},
            {"name":"Neymar", "health":"Dying"},
            {"name":"Arabi", "health":"Dead"},
            {"name":"Toquero", "health":"WishingHeWasDead"}]}`;

var obj = JSON.parse(jsonData);

//rest for 'restful' api
app.get('/rest/emr', function(req, res) {
  var user_id = req.param('id');
  var result = "";

  if(user_id)
  {
   if(user_id=="*")
   {
      result = JSON.stringify(obj.emrs);
   }
   else
   {
    result = user_id+" Not Found.";
    for (i = 0; i < obj.emrs.length; i++)
    {
     if((obj.emrs[i].name == user_id))
     {
      result = JSON.stringify(obj.emrs[i]);
     }
    }
   }

  res.send(result);

  }
  else
      res.send("Nothing to Find!");

});

//rest for 'restful' api
app.post('/rest/emr', function(req, res) {
    var user_id = req.body.id;
    var name = req.body.name;
    var health = req.body.health;

    obj.emrs.push({"name": name, "health": health});
    res.send(user_id + ' ' + name + ' ' + health);
});



// start the server on the specified port
app.listen(8080);