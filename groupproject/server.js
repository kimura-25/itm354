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

/*function storeappt(POST, response){
  advisor = POST ['advisor'];
  console.log(advisor);
}

app.post("/submitapp", function (request, response) {
  let POST = request.body;
  storeappt(POST, response);
});
*/

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
        <p><strong>Thank you for making your appointment with Career Services</strong></p>
        </html>`;
  response.send(submitapp);
  advisor = POST['advisor'];
  date = POST['date'];
  time = POST['time'];
  console.log(advisor);
sql = "INSERT INTO advises(Uname,advising_date,advising_time) VALUES ('" + advisor + "', '" + date + "','" + time + "')";
con.query(sql,function(err){
if(err) throw err
console.log(sql)
})
con.end();
    };

app.post("/submitapp", function (request, response) {
  let POST = request.body;
  submitapp(POST, response);
});

//note:need to change attributes to eds
function query_advisingnote(POST, response){
  //note to self: need to create cases if person has no advising notes
  var sql = "SELECT * FROM student WHERE s_id = '801'"; //query for the given student
  console.log('studentsingletable');
  con.query(sql,function (err, result, fields){ //run the query
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
  response_form +=`<p>Name: ${res_json[i].S_id}</p>
  <p>Phone: ${res_json[i].S_phone}</p>
  <p>Email: ${res_json[i].S_email}</p>
  <p>Major: ${res_json[i].St_major}</p>`
                  }
/*  response_form += `<form action="advising.html" method="GET">`;
  response_form += `<table border="3" cellpadding="5" cellspacing="5" bgcolor="white">`;
  response_form += `<td><B>Advising Note</td><td><B>Date</td></b>`;
      for (i in res_json) {
        response_form += `<tr><td> ${res_json[i].Advising_date}</td>`;
        response_form += `<td> ${res_json[i].Advising_note}</td>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Add Advising Note"> </form>`;*/
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
};

app.post("/employers", function (request, response) {
  let POST = request.body;
query_employers(POST, response);
});

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});


app.listen(8080, () => console.log(`listening on port 8080`));