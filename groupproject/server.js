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
//build student info page on server
/*function studentinformation(POST,response){
  studentinfo=`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Student Information</title>
  </head>
  <body>
      <h1>Shidler Career Services and Professional Development</h1> 
      <h2>Student Information</h2>
  
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
        <br>
        <br>
        <br>`
    for (i in res_json){
      response_form += `<table border="3" cellpadding="5" cellspacing="5" bgcolor="white">`;
      response_form += `<td><B>First Name</td><td><B>Last Name</td></b>`;
            response_form += `<tr><td> ${res_json[i].Advising_date}</td>`;
            response_form += `<td> ${res_json[i].Advising_note}</td>`;
          }
        }
        
 studentinfo=+`<table cellpadding="10" border="1">
          <tr>
              <th>Student ID</th>
              <th>Student First Name</th>
              <th>Student Last Name</th>
              <th>Email</th>
              <th>Major</th>
              <th>Expected Graduation</th>
              <th></th>
          </tr>
          <tr>
              <td>12345678</td>
              <td>Da Cookie</td>
              <td>Monster</td>
              <td>cookie@sesamestreet.com</td>
              <td>Management</td>
              <td>Spring 2022</td>
              <td>            
                  <form action="/advisingnotes" method="POST">
                  <button type="view">View Student</button>
                  </form>
              </td>
          </tr>
  </body>
  </html>`;
  response.send(studentinfo);
}

app.get("/studentinformation", function (request, response) {
  let POST = request.body;
  studentinformation(POST, response);
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
          <a href="makeappointment.html"subnavbtn">Make Appointment</i></button></a>
          </div>
          <div class="subnav">
             <a href="jobsearch.html"subnavbtn">Search Jobs</i></button></a>
           </div>
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
  appt_notes = POST['appt_notes'];
  console.log(advisor);
sql = "INSERT INTO advises(Uname,advising_date,advising_time,advising_note) VALUES ('" + advisor + "', '" + date + "','" + time + "', '" + appt_notes + "')";
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
  var sql = "SELECT * FROM student, student_major WHERE s_id = st_id AND s_id = '801'"; //query for the given student
//  var sql1 = "SELECT IF(EXISTS(SELECT * FROM advises WHERE stud_id = '801'), '1','0'"; //query for the given student
//  console.log(sql1);
  con.query(sql,function (err, result, fields){ //run the query
  if (err) throw err;
//  console.log(result);
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



function query_jobsearch(POST, response){
  eid = POST['employer_id'];
  var sql = "SELECT * FROM job_posting WHERE empl_id =" + eid;
  con.query(sql, function (err, result, fields){ 
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  

    job_search_form = `<form action="jobsearch.html" method="GET">`;
      job_search_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      job_search_form += `<td><B>Room#</td><td><B>Hotel#</td><td><B>Type</td></b>`;
      for (i in res_json) {
        job_search_form += `<tr><td> ${res_json[i].Job_id}</td>`;
        job_search_form += `<td> ${res_json[i].Job_title}</td>`;
        job_search_form += `<td> ${res_json[i].Job_description}</td>`;
      }
      job_search_form += `</table> </form>`;
    response.send(job_search_form)
  })
};

function query_employers(POST, response) {
  Name = POST ['E_name'];
  var sql = "SELECT * FROM Employer";
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
  emplid = POST ['empl_id']; 
  var sql = "SELECT E_id, E_name, E_email, E_city, E_state, E_zipcode, E_industry, Job_title, Job_description FROM job_posting, employer WHERE Empl_id = E_id " + emplid;
  con.query (sql, function (err, result, fields){
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
    //Response: table of results and form to do another query 
    job_postings_form = `<form action"jobpostings.html" method = "GET">`;
    job_postings_form += `<table border="3" cellpadding="5" cellspacing="5">`;
    job_postings_form += `<td><B>E_id</td><td><B>E_name</td><td><B>E_phone</td><td><B>E_email</td><td><B>E_street</td><td><B>E_city</td><td><B>E_state</td><td><B>E_zipcode</td><td><B>E_industry</td></b>`;
        for (i in res_json) {
          job_postings_form += `<tr><td> ${res_json[i].E_id}</td>`;
          job_postings_form += `<td> ${res_json[i].E_name}</td>`;
          job_postings_form += `<td> ${res_json[i].E_phone}</td>`;
          job_postings_form += `<td> ${res_json[i].E_email}</td>`;
          job_postings_form += `<td> ${res_json[i].E_street}</td>`;
          job_postings_form += `<td> ${res_json[i].E_city}</td>`;
          job_postings_form += `<td> ${res_json[i].E_state}</td>`;
          job_postings_form += `<td> ${res_json[i].E_zipcode}</td>`;
          job_postings_form += `<td> ${res_json[i].E_industry}</td>`;
          job_postings_form += `<td> ${res_json[i].Job_title}</td>`;
          job_postings_form += `<td> ${res_json[i].E_Job_description}</td>`;
        }
        job_postings_form += `</table> <input type="submit" value="Another Query?"> </form>`;
        response.send(job_postings_form)
      })
  };

//Post for processing any job searches from students
app.post("/process_jobsearch", function (request,response){
  let POST = request.body;
  query_jobsearch(POST, response);
});


app.post("/advisingnotes", function (request, response) {
  let POST = request.body;
  query_advisingnote(POST, response);
});

app.post("/employers_query", function (request, response) {
  let POST = request.body;
query_employers(POST, response);
});

app.post("/jposting_query", function (request, response) {
  let POST = request.body;
query_jpostings(POST, response);
});


app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});



app.listen(8080, () => console.log(`listening on port 8080`));