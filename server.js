var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(bodyParser.json());

var apiLot;
var totalCount= [];

var regCount = 0;
var valCount = 0;
var terCount = 0;



app.use(express.static(__dirname + '/public'));




fs.readFile('etc/cars.json','utf8',  function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  apiLot = JSON.parse(data);
  
}); 


app.get('/api/lot', function (req, res) {

fs.readFile('etc/cars.json','utf8',  function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  apiLot = JSON.parse(data);

  res.send(apiLot);
  
});
});




app.get('/', function(req, res){

  res.redirect('/index.html');

});


app.get('/api/types', function(req, res){
	regCount = 0;
	valCount = 0;
	terCount = 0;

fs.readFile('etc/cars.json','utf8',  function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("success");
  var temp = JSON.parse(data);


	for(var i=0; i<temp.Vehicles.length; i++){
		if(temp.Vehicles[i].Type === "Regular"){
		regCount++;
		
		}
			
		else if(temp.Vehicles[i].Type === "Valet"){
		valCount++;
		}

		else if(temp.Vehicles[i].Type === "Term"){
		terCount++;
		}
	
	};

	var emptySpaces = 200 - (regCount + valCount + terCount);
 	totalCount = [emptySpaces, regCount,valCount,terCount];



console.log(totalCount)


  res.send(totalCount);
  
});


});





app.post('/api/addvehicle',urlencodedParser, function (req, res) {
   console.log(req.body);

       var newfiletext = JSON.stringify(req.body);

	fs.writeFile('etc/cars.json', newfiletext, 'utf8', function (err) {
  	if (err){
 		return console.log(err) 
	};
 	 
	console.log('written');
	
	});


   res.end();
})

app.listen(3000, function () {
  console.log('Your app is now running');
});