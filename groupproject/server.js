var express = require('express');
var app = express();
var myParser = require("body-parser");
var mysql = require('mysql');
const querystring = require('querystring');
const { query } = require('express');
console.log("Connecting to localhost...");
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: "root",
  port: 3306,
  database: "employer_database_system",
  password: ""
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));


function submitapp(POST, response){


  //now build the response for student detail page
  submitapp=`<!DOCTYPE html>
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
        <p>Thank you for making your appointment with Career Services</p>
        </html>`;
      response.send(submitapp);
};

app.post("/submitapp", function (request, response) {
  let POST = request.body;
  submitapp(POST, response);
});

function query_advisingnote(POST, response){
  query = "SELECT * FROM booking, guest WHERE booking.guestNo = guest.guestNo AND guest.guestNO = '2';" //query for the given student
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


function query_employers(POST, response) {
  query = "SELECT * FROM Employer";
  con.query (query, function (err, result, fields){
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  response_form = '<form action"employers.html" method = "GET">';
  response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
  response_form += `<td><B>E_id</td><td><B>E_name</td><td><B>E_phone</td><td><B>E_email</td><td><B>E_street</td><td><B>E_city</td><td><B>E_state</td><td><B>E_zipcode</td><td><B>E_industry</td></b>`;
      for (i in res_json) {
        response_form += `<tr><td> ${res_json[i].E_id}</td>`;
        response_form += `<td> ${res_json[i].E_name}</td>`;
        response_form += `<td> ${res_json[i].E_phone}</td>`;
        response_form += `<td> ${res_json[i].E_email}</td>`
        response_form += `<td> ${res_json[i].E_street}</td>`
        response_form += `<td> ${res_json[i].E_city}</td>`
        response_form += `<td> ${res_json[i].E_state}</td>`
        response_form += `<td> ${res_json[i].E_zipcode}</td>`
        response_form += `<td> ${res_json[i].E_industry}</td></tr>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Another Query?"> </form>`;
      response.send(response_form);
    });
};
function query_jpostings (POST, response){
  if (isNonNegInt(POST['Eid'])) { 
  query = "SELECT* FROM job_posting, employer WHERE Emp_id = E_id  "
}
};
app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});
app.post("/employers_query", function (request, response) {
  let POST = request.body;
query_employers(POST, response);
});

app.post("/Jposting_query", function (request, response) {
  let POST = request.body;
query_jpostings(POST, response);
});


app.listen(8080, () => console.log(`listening on port 8080`));