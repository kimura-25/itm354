var express = require('express');
var app = express();
var myParser = require("body-parser");
var mysql = require('mysql');
const querystring = require('querystring');

console.log("Connecting to localhost...");
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: "root",
  port: 3306,
  database: "travel",
  password: ""
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

function query_advisingnote(POST, response){
  query = "SELECT * FROM booking, guest WHERE booking.guestNo = guest.guestNo AND guest.guestNO = '1';" //query for the given student
  console.log('studentsingletable');
  con.query(query,function (err, result, fields){ //run the query
  if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);

  //now build the response for student detail page
  response_form=`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Student Notes</title>
  </head>
  <body>
      <h1>Shidler Career Services and Professional Development</h1> 
      <h2>Student Notes</h2>
  
     <!-- The navigation menu -->
      <div class="navbar">
          <a href="index.html">Home</a>
          <div class="subnav">
      
            <button class="subnavbtn">Companies<i class="fa fa-caret-down"></i></button>
            <div class="subnav-content">
              <a href="./employers.html">Employers</a>
              <a href="./contacts.html">Contacts</a>
              <a href="./jobpostings.html">Job Postings</a>
            </div>
          </div>
      
          <div class="subnav">
            <button class="subnavbtn">Events<i class="fa fa-caret-down"></i></button>
            <div class="subnav-content">
              <a href="./careerexpo.html">Career Expo</a>
              <a href="./addemployer.html">Add Employer</a>
            </div>
          </div>
      
          <div class="subnav">
            <button class="subnavbtn">Students<i class="fa fa-caret-down"></i></button>
            <div class="subnav-content">
              <a href="./studentinformation.html">Student Information</a>
              <a href="./advising.html">Advising</a>
        
            </div>
          </div>
        </div>
        <br>
        <br>`
    for (i in res_json){
  response_form +=`<p>Name: ${res_json[i].guestName}</p>
  <p>Phone: ${res_json[i].guestAddress}</p>
  <p>Email: ${res_json[i].guestAddress}</p>
  <p>Major: ${res_json[i].guestNo}</p>`
                  }
  response_form += `<form action="advising.html" method="GET">`;
  response_form += `<table border="3" cellpadding="5" cellspacing="5" bgcolor="white">`;
  response_form += `<td><B>Advising Note</td><td><B>Date</td></b>`;
      for (i in res_json) {
        response_form += `<tr><td> ${res_json[i].dateFrom}</td>`;
        response_form += `<td> ${res_json[i].dateTo}</td>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Add Advising Note"> </form>`; 
      response_form += `</html>`;
      response.send(response_form);
});
}

app.post("/advisingnotes", function (request, response) {
  let POST = request.body;
  query_advisingnote(POST, response);
});


/*function isNonNegInt(stringToCheck, returnErrors = false) {
  errors = []; // assume no errors at first
  if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
  if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

  return returnErrors ? errors : (errors.length == 0);
}



function query_DB(POST, response) {
  if (isNonNegInt(POST['low_price'])
    && isNonNegInt(POST['high_price'])) {   // Only query if we got a low and high price
    low = POST['low_price'];      // Grab the parameters from the submitted form
    high = POST['high_price'];
    query = "SELECT * FROM Room where price > " + low + " and price < " + high;  // Build the query string
    con.query(query, function (err, result, fields) {   // Run the query
      if (err) throw err;
      console.log(result);
      var res_string = JSON.stringify(result);
      var res_json = JSON.parse(res_string);
      console.log(res_json);

      // Now build the response: table of results and form to do another query
      response_form = `<form action="Room-query.html" method="GET">`;
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>Room#</td><td><B>Hotel#</td><td><B>Type</td><td><B>Price</td></b>`;
      for (i in res_json) {
        response_form += `<tr><td> ${res_json[i].roomNo}</td>`;
        response_form += `<td> ${res_json[i].hotelNo}</td>`;
        response_form += `<td> ${res_json[i].type}</td>`;
        response_form += `<td> ${res_json[i].price}</td></tr>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Another Query?"> </form>`;
      response.send(response_form);
    });
  } else {
    response.send("Enter some prices doofus!");
  }
}

app.post("/process_query", function (request, response) {
  let POST = request.body;
  query_DB(POST, response);
});

*/

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});


app.listen(8080, () => console.log(`listening on port 8080`));