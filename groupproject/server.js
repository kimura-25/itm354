var express = require('express');
var app = express();
var myParser = require("body-parser");
var mysql = require('mysql');
const querystring = require('querystring');
const { query } = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({ secret: "anything" }));


console.log("Connecting to localhost...");
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: "root",
  port: 3306,
  database: "eds",
  password: ""
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

app.get("/runreport5.html", function(request, response){
  let POST = request.body;
  runreport5(POST, response);
});
 
function runreport5(POST, response){
  reportsql = "SELECT * FROM contact_info"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>All Company Contacts</h2>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <form action="/runreport5a.html" method="POST">
 <label for="major">Select Major to Search By</label>
 <select name="Major" id="Major">
 <option value="" disable selected>Choose a major</option>
   <option value="Accounting">Accounting</option>
     <option value="Finance">Finance</option>
     <option value="Human Resource Management">Human Resource Management</option>
     <option value="IT Management">IT Management</option>
</select>
<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>

 <table>
 <td><strong>Contact Name</strong></td><td><strong>Company Name</strong></td><td><strong>Email</strong></td><td><strong>Phone</strong></td><td><strong>Job Title</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].C_fname} ${res_json[i].C_minit} ${res_json[i].C_lname}</td>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].C_email}</td>
   <td>${res_json[i].C_phone}</td>
   <td>${res_json[i].C_jobtitle}</td>

 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.get("/runreport0.html", function(request, response){
  let POST = request.body;
  runreport0(POST, response);
});
 
function runreport0(POST, response){
  major = POST['Major'];
  console.log(major);
  reportsql = "SELECT * FROM Employer"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>Company Contacts in All Industries</h2>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <form action="/runreport0a.html" method="POST">
 <label for="E_industry">Select Industry to Search By</label>
 <select name="E_industry" id="E_industry">
 <option value="" disable selected>Choose an industry</option>
 <option value="Airline">Airline</option>
     <option value="Banking">Banking</option>
     <option value="Accounting">Accounting</option>
     <option value="Business Policy">Business Policy</option>
     <option value="Information Security">Information Security</option>

     </select>


<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>

 <table>
 <td><strong>Company Name</strong></td><td><strong>Phone</strong></td><td><strong>Email</strong></td><td><strong>Address</strong></td><td><strong>Industry</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].E_phone}</td>
   <td>${res_json[i].E_email}</td>
   <td>${res_json[i].E_street} ${res_json[i].E_city}, ${res_json[i].E_state} ${res_json[i].E_zipcode}</td>
   <td>${res_json[i].E_industry}</td>

 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.post("/runreport0a.html", function(request, response){
  let POST = request.body;
  runreport0a(POST, response);
});
 
function runreport0a(POST, response){
  E_industry = POST['E_industry'];
  console.log(E_industry);
  reportsql = "SELECT * FROM Employer WHERE E_industry = '" + E_industry+"'"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>Company Contacts in All Industries</h2>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <form action="/runreport0a.html" method="POST">
 <label for="E_industry">Select Industry to Search By</label>
 <select name="E_industry" id="E_industry">
 <option value="" disable selected>Choose an industry</option>
 <option value="Airline">Airline</option>
     <option value="Banking">Banking</option>
     <option value="Accounting">Accounting</option>
     <option value="Business Policy">Business Policy</option>
     <option value="Information Security">Information Security</option>

     </select>


<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>

 <table>
 <td><strong>Company Name</strong></td><td><strong>Phone</strong></td><td><strong>Email</strong></td><td><strong>Address</strong></td><td><strong>Industry</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].E_phone}</td>
   <td>${res_json[i].E_email}</td>
   <td>${res_json[i].E_street} ${res_json[i].E_city}, ${res_json[i].E_state} ${res_json[i].E_zipcode}</td>
   <td>${res_json[i].E_industry}</td>

 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.get("/runreport1.html", function(request, response){
  let POST = request.body;
  runreport1(POST, response);
});
 
function runreport1(POST, response){
  reportsql = " SELECT * FROM Employer WHERE E_id IN (SELECT Emp_id FROM Presents_at WHERE Evt_name IN (SELECT Event_name FROM Events  WHERE Event_name = 'Career Expo Spring 2021'))"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>Career Expo Attendees for Spring 2021</h2>
 <br>
 <form action="/runreport1a.html" method="POST">
 <label for="semester">Choose Semester</label>
 <select name="semester" id="semester">
 <option value="" disable selected>Semester</option>
     <option value="Spring">Spring</option>
     <option value="Fall">Fall</option>
</select>
     <label for="year">Choose Year</label>
     <select name="year" id="year">
     <option value="" disable selected>Year</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
</select>
<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <table>
 <td><strong>Company Name</strong></td><td><strong>Email</strong></td><td><strong>Phone</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].E_email}</td>
   <td>${res_json[i].E_phone}</td>
   </tr>
`}
 runreport+=`
 </table>
 <script>
   //note to self: need to make view for # of students with X amount of internships
 </script>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.post("/runreport1a.html", function(request, response){
  let POST = request.body;
  runreport1a(POST, response);
});
 
function runreport1a(POST, response){
  semester = POST['semester'];
  year = POST['year'];
  console.log(semester);
  console.log(year);
  reportsql = " SELECT * FROM Employer WHERE E_id IN (SELECT Emp_id FROM Presents_at WHERE Evt_name IN (SELECT Event_name FROM Events  WHERE Event_name = 'Career Expo "+ semester + " " + year +"'))"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
    if (res_json.length == 0){
      runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>Career Expo Attendees for ${semester} ${year}</h2>
 <br>
 <form action="/runreport1a.html" method="POST">
 <label for="semester">Choose Semester</label>
 <select name="semester" id="semester">
 <option value="" disable selected>Semester</option>
     <option value="Spring">Spring</option>
     <option value="Fall">Fall</option>
</select>
     <label for="year">Choose Year</label>
     <select name="year" id="year">
     <option value="" disable selected>Year</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
</select>
<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>
<h2>No attendees this semester</h2>
  </body>
  </html>`;
  response.send(runreport);
    } else {
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>Career Expo Attendees for ${semester} ${year}</h2>
 <br>
 <form action="/runreport1a.html" method="POST">
 <label for="semester">Choose Semester</label>
 <select name="semester" id="semester">
 <option value="" disable selected>Semester</option>
     <option value="Spring">Spring</option>
     <option value="Fall">Fall</option>
</select>
     <label for="year">Choose Year</label>
     <select name="year" id="year">
     <option value="" disable selected>Year</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
</select>
<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <table>
 <td><strong>Company Name</strong></td><td><strong>Email</strong></td><td><strong>Phone</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].E_email}</td>
   <td>${res_json[i].E_phone}</td>
   </tr>
`}
 runreport+=`
 </table>
 <script>
   //note to self: need to make view for # of students with X amount of internships
 </script>
  </body>
  </html>`;
  response.send(runreport);
}
})
}

app.get("/runreport2.html", function(request, response){
  let POST = request.body;
  runreport2(POST, response);
});
 
function runreport2(POST, response){
  reportsql = "SELECT st_major, percent FROM percent_students_by_major"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <table>
 <td><strong>Major</strong></td><td><strong>Percent</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].st_major}</td>
   <td>${res_json[i].percent}%</td>
 </tr>
`}
 runreport+=`
 </table>
 <script>
   //note to self: need to make view for # of students with X amount of internships
 </script>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.get("/runreport3.html", function(request, response){
  let POST = request.body;
  runreport3(POST, response);
});
 
function runreport3(POST, response){
  reportsql = "SELECT E_name, E_phone, E_email, E_street, E_city, E_state, E_zipcode, Students_who_interned FROM total_students_interning_per_co ORDER BY Students_who_interned DESC"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <table>
 <td><strong>Company Name</strong></td> <td><strong>Phone</strong></td><td><strong>Email</strong></td> <td><strong>Address</strong></td><td><strong>Number of Students</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].E_phone}</td>
   <td>${res_json[i].E_email}</td>
   <td>${res_json[i].E_street} ${res_json[i].E_city}, ${res_json[i].E_state} ${res_json[i].E_zipcode}</td>
   <td>${res_json[i].Students_who_interned}</td>
 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.get("/runreport5.html", function(request, response){
  let POST = request.body;
  runreport5(POST, response);
});
 
function runreport5(POST, response){
  reportsql = "SELECT * FROM Contact, Employer WHERE E_id = Empl_id"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>All Company Contacts</h2>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <form action="/runreport5a.html" method="POST">
 <label for="major">Select Major to Search By</label>
 <select name="Major" id="Major">
 <option value="" disable selected>Choose a major</option>
   <option value="Accounting">Accounting</option>
     <option value="Finance">Finance</option>
     <option value="Human Resource Management">Human Resource Management</option>
     <option value="IT Management">IT Management</option>
</select>
<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>

 <table>
 <td><strong>Contact Name</strong></td><td><strong>Company Name</strong></td><td><strong>Email</strong></td><td><strong>Phone</strong></td><td><strong>Job Title</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].C_fname} ${res_json[i].C_minit} ${res_json[i].C_lname}</td>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].C_email}</td>
   <td>${res_json[i].C_phone}</td>
   <td>${res_json[i].C_jobtitle}</td>

 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.post("/runreport5a.html", function(request, response){
  let POST = request.body;
  runreport5a(POST, response);
});
 
function runreport5a(POST, response){
  major = POST['Major'];
  console.log(major);
  reportsql = "SELECT * FROM contact_info WHERE C_specialty = '" + major +"'"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>Company Contacts in ${res_json[0].C_specialty}</h2>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <form action="/runreport5a.html" method="POST">
 <label for="major">Select Major to Search By</label>
 <select name="Major" id="Major">
 <option value="" disable selected>Choose a major</option>
 <option value="Accounting">Accounting</option>
     <option value="Finance">Finance</option>
     <option value="Human Resource Management">Human Resource Management</option>
     <option value="IT Management">IT Management</option>
</select>

<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>

 <table>
 <td><strong>Contact Name</strong></td><td><strong>Company Name</strong></td><td><strong>Email</strong></td><td><strong>Phone</strong></td><td><strong>Job Title</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].C_fname} ${res_json[i].C_minit} ${res_json[i].C_lname}</td>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].C_email}</td>
   <td>${res_json[i].C_phone}</td>
   <td>${res_json[i].C_jobtitle}</td>

 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.post("/runreport5b.html", function(request, response){
  let POST = request.body;
  runreport5b(POST, response);
});
 
function runreport5b(POST, response){
  major = POST['Major'];
  console.log(major);
  reportsql = "SELECT * FROM contact_info WHERE C_specialty = '" + major +"'"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>Company Contacts in ${res_json[0].C_specialty}</h2>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <form action="/runreport5a.html" method="POST">
 <label for="major">Select Major to Search By</label>
 <select name="Major" id="Major">
 <option value="" disable selected>Choose a major</option>
 <option value="Accounting">Accounting</option>
     <option value="Finance">Finance</option>
     <option value="Human Resource Management">Human Resource Management</option>
     <option value="IT Management">IT Management</option>
</select>

<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>

 <table>
 <td><strong>Contact Name</strong></td> <td><strong>Company Name</strong></td><td><strong>Email</strong></td><td><strong>Phone</strong></td><td><strong>Job Title</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].C_fname} ${res_json[i].C_minit} ${res_json[i].C_lname}</td>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].C_email}</td>
   <td>${res_json[i].C_phone}</td>
   <td>${res_json[i].C_jobtitle}</td>

 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}


app.get("/runreport6.html", function(request, response){
  let POST = request.body;
  runreport6(POST, response);
});
 
function runreport6(POST, response){
  reportsql = "SELECT * FROM primary_contacts"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <table>
 <td><strong>Company Name</strong></td><td><strong>Primary Contact Name</strong></td><td><strong>Email</strong></td><td><strong>Phone</strong></td><td><strong>Job Title</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].C_fname} ${res_json[i].C_minit} ${res_json[i].C_lname}</td>
   <td>${res_json[i].C_email}</td>
   <td>${res_json[i].C_phone}</td>
   <td>${res_json[i].C_jobtitle}</td>

 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.get("/runreport7.html", function(request, response){
  let POST = request.body;
  runreport7(POST, response);
});
 
function runreport7(POST, response){
  reportsql = "SELECT * FROM Employer WHERE E_state = 'HI'"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <table>
 <td><strong>Company Name</strong></td><td><strong>Phone</strong></td><td><strong>Email</strong></td><td><strong>Street</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].E_name}</td>
   <td>${res_json[i].E_phone}</td>
   <td>${res_json[i].E_email}</td>
   <td>${res_json[i].E_street} ${res_json[i].E_city}, ${res_json[i].E_state} ${res_json[i].E_zipcode}</td>
 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.get("/runreport8.html", function(request, response){
  let POST = request.body;
  runreport8(POST, response);
});
 
function runreport8(POST, response){
  reportsql = "SELECT * FROM student_info"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  runreport=` <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>EDS</title>
     <link rel="stylesheet" href="reportstyle.css">
     
 </head>
 <body>
     
    <h1>Shidler Career Services and Professional Development</h1> 
   
       <!-- The navigation menu -->
 <div class="navbar">
   <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
     <div class="subnav">
      <a href="./contactlist.html">Contact List</a>
    </div>
 
    <div class="subnav">
      <a href="./employerlist.html">Employer List</a>
    </div>

    <div class="subnav">
      <a href="./studentinformation.html">Student List</a>
    </div>
    
    <div class="subnav">
      <a href="./internshiplist.html">Internship List</a>
    </div>

     <div class="subnav">
      <a href="./appointment.html">Appointments</a>
    </div>

     <div>
      <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
    </div>
 </div>
   </div>
 <h2>Students in All Majors</h2>
 <style>
   .links {
     background-color:rgb(136, 181, 192);
     border-radius:28px;
     display:inline-block;
     cursor:pointer;
     color: black;
     font-family:Arial;
     font-size:25px;
     padding:16px 31px;
     text-decoration:none;
     font-weight: bold;
     margin-inline: 50px;
     text-align: center;
   }
   .links:hover {
     background-color: rgb(23, 94, 112);
 }
   ul{
     text-align: left;
     padding: 20%;
     ;
   }
 </style>
 <form action="/runreport8a.html" method="POST">
 <label for="major">Select Major to Search By</label>
 <select name="Major" id="Major">
 <option value="" disable selected>Choose a major</option>
   <option value="Accounting">Accounting</option>
     <option value="Finance">Finance</option>
     <option value="Human Resource Management">Human Resource Management</option>
     <option value="IT Management">IT Management</option>
</select>
<input type="submit" id="submit" value="Run Report" name="submit">  
 </form>

 <table>
 <td><strong>Student Name</strong></td><td><strong>Phone</strong></td><td><strong>Email</strong></td><td><strong>Major</strong></td><td><strong>Graduation</strong></td>`;
 for (i in res_json){
   runreport+=`
   <tr>
   <td>${res_json[i].S_fname} ${res_json[i].S_lname}</td>
   <td>${res_json[i].S_phone}</td>
   <td>${res_json[i].S_email}</td>
   <td>${res_json[i].St_major}</td>
   <td>${res_json[i].Expected_grad}</td>
 </tr>
`}
 runreport+=`
 </table>
  </body>
  </html>`;
  response.send(runreport);
})
}

app.post("/runreport8a.html", function(request, response){
  let POST = request.body;
  runreport8a(POST, response);
});
 
function runreport8a(POST, response){
  major = POST['Major'];
  reportsql = "SELECT * FROM student_info WHERE St_major = '" + major+"'"; 
  con.query(reportsql, function(err, result, fields){
    if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
    if (res_json.length == 0){
      console.log('none of that major');
      console.log(major);
      runreport=` <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>EDS</title>
          <link rel="stylesheet" href="reportstyle.css">
          
      </head>
      <body>
          
         <h1>Shidler Career Services and Professional Development</h1> 
        
            <!-- The navigation menu -->
      <div class="navbar">
        <div class="subnav">
         <a href="./officehomepage.html">Home</a>
       </div>
       <div class="subnav">
         <a href="./runreports.html">Run Reports</a>
       </div>
          <div class="subnav">
           <a href="./contactlist.html">Contact List</a>
         </div>
      
         <div class="subnav">
           <a href="./employerlist.html">Employer List</a>
         </div>
     
         <div class="subnav">
           <a href="./studentinformation.html">Student List</a>
         </div>
         
         <div class="subnav">
           <a href="./internshiplist.html">Internship List</a>
         </div>
     
          <div class="subnav">
           <a href="./appointment.html">Appointments</a>
         </div>
     
          <div>
           <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
         </div>
      </div>
        </div>
      <h2>Students in ${major}</h2>
      <style>
        .links {
          background-color:rgb(136, 181, 192);
          border-radius:28px;
          display:inline-block;
          cursor:pointer;
          color: black;
          font-family:Arial;
          font-size:25px;
          padding:16px 31px;
          text-decoration:none;
          font-weight: bold;
          margin-inline: 50px;
          text-align: center;
        }
        .links:hover {
          background-color: rgb(23, 94, 112);
      }
        ul{
          text-align: left;
          padding: 20%;
          ;
        }
      </style>
      <form action="/runreport8a.html" method="POST">
      <label for="major">Select Major to Search By</label>
      <select name="Major" id="Major">
      <option value="" disable selected>Choose a major</option>
        <option value="Accounting">Accounting</option>
          <option value="Finance">Finance</option>
          <option value="Human Resource Management">Human Resource Management</option>
          <option value="IT Management">IT Management</option>
     </select>
     <input type="submit" id="submit" value="Run Report" name="submit">  
      </form>
       </body>
       </html>`;
       response.send(runreport);
    }else{  runreport=` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>EDS</title>
        <link rel="stylesheet" href="reportstyle.css">
        
    </head>
    <body>
        
       <h1>Shidler Career Services and Professional Development</h1> 
      
          <!-- The navigation menu -->
    <div class="navbar">
      <div class="subnav">
       <a href="./officehomepage.html">Home</a>
     </div>
     <div class="subnav">
       <a href="./runreports.html">Run Reports</a>
     </div>
        <div class="subnav">
         <a href="./contactlist.html">Contact List</a>
       </div>
    
       <div class="subnav">
         <a href="./employerlist.html">Employer List</a>
       </div>
   
       <div class="subnav">
         <a href="./studentinformation.html">Student List</a>
       </div>
       
       <div class="subnav">
         <a href="./internshiplist.html">Internship List</a>
       </div>
   
        <div class="subnav">
         <a href="./appointment.html">Appointments</a>
       </div>
   
        <div>
         <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
       </div>
    </div>
      </div>
    <h2>Students in ${res_json[0].St_major}</h2>
    <style>
      .links {
        background-color:rgb(136, 181, 192);
        border-radius:28px;
        display:inline-block;
        cursor:pointer;
        color: black;
        font-family:Arial;
        font-size:25px;
        padding:16px 31px;
        text-decoration:none;
        font-weight: bold;
        margin-inline: 50px;
        text-align: center;
      }
      .links:hover {
        background-color: rgb(23, 94, 112);
    }
      ul{
        text-align: left;
        padding: 20%;
        ;
      }
    </style>
    <form action="/runreport8a.html" method="POST">
    <label for="major">Select Major to Search By</label>
    <select name="Major" id="Major">
    <option value="" disable selected>Choose a major</option>
      <option value="Accounting">Accounting</option>
        <option value="Finance">Finance</option>
        <option value="Human Resource Management">Human Resource Management</option>
        <option value="IT Management">IT Management</option>
   </select>
   <input type="submit" id="submit" value="Run Report" name="submit">  
    </form>
   
    <table>
    <td><strong>Student Name</strong></td><td><strong>Phone</strong></td><td><strong>Email</strong></td><td><strong>Major</strong></td><td><strong>Graduation</strong></td>`;
    for (i in res_json){
      runreport+=`
      <tr>
      <td>${res_json[i].S_fname} ${res_json[i].S_lname}</td>
      <td>${res_json[i].S_phone}</td>
      <td>${res_json[i].S_email}</td>
      <td>${res_json[i].St_major}</td>
      <td>${res_json[i].Expected_grad}</td>
    </tr>
   `}
    runreport+=`
    </table>
     </body>
     </html>`;
     response.send(runreport);}

})
}

function studentinformation(POST, response){
          //note to self: need to create cases if person has no advising notes
          var sql = "SELECT * FROM student_info"; //query for the given student
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
              <link rel="stylesheet" href="reportstyle.css">
              <title>Student Notes</title>
          </head>
          <body>
              <h1>Shidler Career Services and Professional Development</h1> 
              <h2>Student Notes</h2>
          
              <!-- The navigation menu -->
              <div class="navbar">
               <div class="subnav">
                <a href="./officehomepage.html">Home</a>
              </div>
              <div class="subnav">
                <a href="./runreports.html">Run Reports</a>
              </div>
                 <div class="subnav">
                  <a href="./contactlist.html">Contact List</a>
                </div>
             
                <div class="subnav">
                  <a href="./employerlist.html">Employer List</a>
                </div>
            
                <div class="subnav">
                  <a href="./studentinformation.html">Student List</a>
                </div>
                
                <div class="subnav">
                  <a href="./internshiplist.html">Internship List</a>
                </div>
            
                 <div class="subnav">
                  <a href="./appointment.html">Appointments</a>
                </div>
            
                 <div>
                  <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
                </div>
             </div>
                                     <br>
                <Form action="/s_fname_query" method="POST">
                <label for = "S_fname">By Name</label>
               <input type='text' name='S_fname'>
               <input type="submit" value="Submit">
               </Form>
               <br>
           <Form action="/s_phone_query" method= "POST">
                 <label for="S_phone">By Phone:</label>
                 <input type="text" name= "S_phone">
                 <input type="submit" value="Submit">
               </Form> 
               <br>
           <Form action="/s_email_query" method= "POST">
                 <label for="S_email">By Email:</label>
                 <input type="text" name= "S_email">
                 <input type="submit" value="Submit">
               </Form> 
               <br>
           <Form action="/s_major_query" method= "POST">
                 <label for="S_major">By Major:</label>
                 <input type="text" name= "S_major">
                 <input type="submit" value="Submit">
               </Form> 
                <br>`
              response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
              response_form += `<td><B>Name</td><td><B>Phone</td><td><B>Email</td><td><B>Major</td></b>`;
              for (i in res_json){
                console.log(i)
                response_form +=`<form action="/advisingnotes" method="POST">`;
                response_form +=`
                <tr>
                <td>${res_json[i].S_fname} ${res_json[i].S_lname}
                <input type="hidden" id="s_id" name="s_id" value="${res_json[i].S_id}">
                <input type="submit" name="${res_json[i].S_id}" value="View"></form></td>
                <td>${res_json[i].S_phone}</td>
                <td>${res_json[i].S_email}</td>
                <td>${res_json[i].St_major}</td>`
                }
              response_form += `</tr></html>`;
              response.send(response_form);
        });
        }

app.get("/studentinformation.html", function (request, response) {
  let POST = request.body;
  studentinformation(POST, response);
});


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
    <div class="subnav">
      <a href="./index.html">Home</a></div>
  <div class="subnav">
    <button class="subnavbtn" >About<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./aboutus.html">About Shidler College</a>
      <a href="./studentservices.html">About Student Services</a>

    </div>
  </div>
   
  <div class="subnav">
    <button class="subnavbtn">Career Development<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./careeradvising.html">Career Advising</a>
      <a href="./jobintsearch.html">Jobs & Internships</a>
    </div>
  </div>

  <div class="subnav">
    <button class="subnavbtn">Company Resources<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./companies.html">Resources</a>
</div>
    </div>

    <div class="subnav">
      <button class="subnavbtn">Events<i class="fa fa-caret-down"></i></button>
      <div class="subnav-content">
        <a href="./eventregistration.html">Student Events & Registration</a>
        <a href="./employerevents.html">Employer Events List</a>
        <a href="./careerexpo.html">Employer Career Expo Registration</a>
      </div>
  </div>
  <div class="subnav">
    <button class="subnavbtn">Internships<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./internships.html">Internships Information</a>
    </div>
</div>
<div class="subnav">
  <button class="subnavbtn">Job Opportunities<i class="fa fa-caret-down"></i></button>
  <div class="subnav-content">
    <a href="./addjposting.html">Post Job Opportunities</a>
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

function query_internshipsearchstudent(POST, response){
  stuID = POST['studentID'];
  var sql = "SELECT * FROM student, interns_at, employer, job_posting WHERE Stu_id = S_id AND S_id = " + stuID + " AND Stu_id = " + stuID + " AND E_id = Empl_id AND Empl_id = Emplo_id AND Type = 'Internship'";
  con.query(sql, function (err, result, fields){ 
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  
    job_search_form =`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Job search</title>
  </head><h1>Shidler Career Services and Professional Development</h1> 
  <div class="navbar">

  <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
  <div class="subnav">
   <a href="./contactlist.html">Contact List</a>
 </div>

 <div class="subnav">
   <a href="./employerlist.html">Employer List</a>
 </div>
  
 <div class="subnav">
   <a href="./internshiplist.html">Internship List</a>
 </div>

  
  <div class="subnav">
    <a href="./appointment.html">Appointments</a>
  </div>
</div>`
   job_search_form += `<h2>Internships</h2>`
    job_search_form += `<form action="/apply" method="POST">`;
    job_search_form += `<table align="center" border="3" cellpadding="5" cellspacing="5">`
      job_search_form += `<td><B>Student Name</td><td><B>Internship class</td><td><B>Position</td><td><B>Company</td><td><B>Semester</td></b>`;
      for (i in res_json) {
        job_search_form += `<tr><td> ${res_json[i].S_fname} ${res_json[i].S_lname}</td>`;
        job_search_form += `<td> ${res_json[i].Internship_class}</td>`;
        job_search_form += `<td> ${res_json[i].Position}</td>`;
        job_search_form += `<td> ${res_json[i].E_name}</td>`;
        job_search_form += `<td> ${res_json[i].Semester}</td>`
      }
      job_search_form += `</table> <br> <br>`
    response.send(job_search_form)
  })
};

function query_internshipsearch(POST, response){
  ename = POST['employer_name'];
  var sql = "SELECT * FROM employer, job_posting WHERE E_name = '" + ename + "' AND E_id = empl_id AND type = 'Internship'";
  con.query(sql, function (err, result, fields){ 
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  
    job_search_form =`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Job search</title>
  </head><h1>Shidler Career Services and Professional Development</h1> 
  <div class="navbar">

  <div class="subnav">
    <a href="./officehomepage.html">Home</a>
  </div>
  <div class="subnav">
    <a href="./runreports.html">Run Reports</a>
  </div>
  <div class="subnav">
   <a href="./contactlist.html">Contact List</a>
 </div>

 <div class="subnav">
   <a href="./employerlist.html">Employer List</a>
 </div>
  
 <div class="subnav">
   <a href="./internshiplist.html">Internship List</a>
 </div>

  
  <div class="subnav">
    <a href="./appointment.html">Appointments</a>
  </div>
</div>`
   job_search_form += `<h2>Internships</h2>`
    job_search_form += `<form action="/apply" method="POST">`;
    job_search_form += `<table align="center" border="3" cellpadding="5" cellspacing="5">`
      job_search_form += `<td><B>Company</td><td><B>Industry</td><td><B>Job title</td><td><B>Type</td><td><B>Job description</td><td><B>Job ID</td></b>`;
      for (i in res_json) {
        job_search_form += `<tr><td> ${res_json[i].E_name}</td>`;
        job_search_form += `<td> ${res_json[i].E_industry}</td>`;
        job_search_form += `<td> ${res_json[i].Job_title}</td>`;
        job_search_form += `<td> ${res_json[i].Type}</td>`;
        job_search_form += `<td> ${res_json[i].Job_description}</td>`;
        job_search_form += `<td> ${res_json[i].Job_id}</td>`;
      }
      job_search_form += `</table> <br> <br>`
    response.send(job_search_form)
  })
};

function query_jobsearchname(POST, response){
  ename = POST['employer_name'];
  var sql = "SELECT * FROM job_posting_info WHERE E_name = '" + ename + "'";
  con.query(sql, function (err, result, fields){ 
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  
    job_search_form =`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Job search</title>
  </head><h1>Shidler Career Services and Professional Development</h1> 
  <!-- The navigation menu -->
  <div class="navbar">
    <div class="subnav">
      <a href="./index.html">Home</a></div>
  <div class="subnav">
    <button class="subnavbtn" >About<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./aboutus.html">About Shidler College</a>
      <a href="./studentservices.html">About Student Services</a>

    </div>
  </div>
   
  <div class="subnav">
    <button class="subnavbtn">Career Development<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./careeradvising.html">Career Advising</a>
      <a href="./jobintsearch.html">Jobs & Internships</a>
    </div>
  </div>

  <div class="subnav">
    <button class="subnavbtn">Company Resources<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./companies.html">Resources</a>
</div>
    </div>

    <div class="subnav">
      <button class="subnavbtn">Events<i class="fa fa-caret-down"></i></button>
      <div class="subnav-content">
        <a href="./eventregistration.html">Student Events & Registration</a>
        <a href="./employerevents.html">Employer Events List</a>
        <a href="./careerexpo.html">Employer Career Expo Registration</a>
      </div>
  </div>
  <div class="subnav">
    <button class="subnavbtn">Internships<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./internships.html">Internships Information</a>
    </div>
</div>
<div class="subnav">
  <button class="subnavbtn">Job Opportunities<i class="fa fa-caret-down"></i></button>
  <div class="subnav-content">
    <a href="./addjposting.html">Post Job Opportunities</a>
  </div>
</div>
  </div>
      <br>
  <div class = "aboutus"> 
   <div class="row">`
   job_search_form += `<h2>Current career opportunuties</h2>`
    job_search_form += `<form action="/apply" method="POST">`;
    job_search_form += `<table align="center" border="3" cellpadding="5" cellspacing="5">`
      job_search_form += `<td><B>Company</td><td><B>Industry</td><td><B>Job title</td><td><B>Type</td><td><B>Job description</td><td><B>Job ID</td></b>`;
      for (i in res_json) {
        job_search_form += `<tr><td> ${res_json[i].E_name}</td>`;
        job_search_form += `<td> ${res_json[i].E_industry}</td>`;
        job_search_form += `<td> ${res_json[i].Job_title}</td>`;
        job_search_form += `<td> ${res_json[i].Type}</td>`;
        job_search_form += `<td> ${res_json[i].Job_description}</td>`;
        job_search_form += `<td> ${res_json[i].Job_id}</td>`;
      }
      job_search_form += `</table> <br> <br>
      Enter the job ID of the opportunity you want to apply for: <input name = 'job_id'> <input type = "submit" value = "Apply"> </form>`;
    response.send(job_search_form)
  })
};

function query_jobsearchtype(POST, response){
  jobtype = POST['job_type'];
  var sql = "SELECT * FROM job_posting_info WHERE type = " + jobtype;
  con.query(sql, function (err, result, fields){ 
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  
  job_search_form =`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Job search</title>
  </head><h1>Shidler Career Services and Professional Development</h1> 
  <!-- The navigation menu -->
  <div class="navbar">
    <div class="subnav">
      <a href="./index.html">Home</a></div>
  <div class="subnav">
    <button class="subnavbtn" >About<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./aboutus.html">About Shidler College</a>
      <a href="./studentservices.html">About Student Services</a>

    </div>
  </div>
   
  <div class="subnav">
    <button class="subnavbtn">Career Development<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./careeradvising.html">Career Advising</a>
      <a href="./jobintsearch.html">Jobs & Internships</a>
    </div>
  </div>

  <div class="subnav">
    <button class="subnavbtn">Company Resources<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./companies.html">Resources</a>
</div>
    </div>

    <div class="subnav">
      <button class="subnavbtn">Events<i class="fa fa-caret-down"></i></button>
      <div class="subnav-content">
        <a href="./eventregistration.html">Student Events & Registration</a>
        <a href="./employerevents.html">Employer Events List</a>
        <a href="./careerexpo.html">Employer Career Expo Registration</a>
      </div>
  </div>
  <div class="subnav">
    <button class="subnavbtn">Internships<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./internships.html">Internships Information</a>
    </div>
</div>
<div class="subnav">
  <button class="subnavbtn">Job Opportunities<i class="fa fa-caret-down"></i></button>
  <div class="subnav-content">
    <a href="./addjposting.html">Post Job Opportunities</a>
  </div>
</div>
  </div>
      <br>
  <div class = "aboutus"> 
   <div class="row">`
   job_search_form += `<h2>Current career opportunities</h2>`
    job_search_form += `<form action="/apply" method="POST">`;
      job_search_form += `<table align="center" border="3" cellpadding="5" cellspacing="5">`;
      job_search_form += `<td><B>Company</td><td><B>Industry</td><td><B>Job title</td><td><B>Type</td><td><B>Job description</td><td><B>Job ID</td></b>`;
      for (i in res_json) {
        job_search_form += `<tr><td> ${res_json[i].E_name}</td>`;
        job_search_form += `<td> ${res_json[i].E_industry}</td>`;
        job_search_form += `<td> ${res_json[i].Job_title}</td>`;
        job_search_form += `<td> ${res_json[i].Type}</td>`;
        job_search_form += `<td> ${res_json[i].Job_description}</td>`;
        job_search_form += `<td> ${res_json[i].Job_id}</td>`;
      }
      job_search_form += `</table> <br> <br>
      Enter the job ID of the opportunity you want to apply for: <input name = 'job_id'> <input type = "submit" value = "Apply"></form>`;
    response.send(job_search_form)
  })
};

function apply(POST, response){
  job_id = POST['job_id'];
  var sql = "SELECT * FROM job_posting_info WHERE Job_id = " + job_id;
  con.query(sql, function (err, result, fields){ 
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
  
    apply_form =`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Job search</title>
  </head><h1>Shidler Career Services and Professional Development</h1> 
  <!-- The navigation menu -->
  <div class="navbar">
    <div class="subnav">
      <a href="./index.html">Home</a></div>
  <div class="subnav">
    <button class="subnavbtn" >About<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./aboutus.html">About Shidler College</a>
      <a href="./studentservices.html">About Student Services</a>

    </div>
  </div>
   
  <div class="subnav">
    <button class="subnavbtn">Career Development<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./careeradvising.html">Career Advising</a>
      <a href="./jobintsearch.html">Jobs & Internships</a>
    </div>
  </div>

  <div class="subnav">
    <button class="subnavbtn">Company Resources<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./companies.html">Resources</a>
</div>
    </div>

    <div class="subnav">
      <button class="subnavbtn">Events<i class="fa fa-caret-down"></i></button>
      <div class="subnav-content">
        <a href="./eventregistration.html">Student Events & Registration</a>
        <a href="./employerevents.html">Employer Events List</a>
        <a href="./careerexpo.html">Employer Career Expo Registration</a>
      </div>
  </div>
  <div class="subnav">
    <button class="subnavbtn">Internships<i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="./internships.html">Internships Information</a>
    </div>
</div>
<div class="subnav">
  <button class="subnavbtn">Job Opportunities<i class="fa fa-caret-down"></i></button>
  <div class="subnav-content">
    <a href="./addjposting.html">Post Job Opportunities</a>
  </div>
</div>
  </div>
      <br>
  <div class = "aboutus"> 
   <div class="row">`
    apply_form += `<h2>Thank you for using Shidler Career Services! <br> Please send your resume and application to the contact information provided</h2>`
    apply_form += `<form action="/apply" method="POST">`;
    apply_form += `<table align="center" border="3" cellpadding="5" cellspacing="5">`
      apply_form += `<td><B>Company</td><td><B>Phone</td><td><B>Email</td><td><B>Job title</td><td><B>Type</td><td><B>Job description</td><td><B>Job ID</td></b>`;
      for (i in res_json) {
        apply_form += `<tr><td> ${res_json[i].E_name}</td>`;
        apply_form += `<td> ${res_json[i].E_phone}</td>`
        apply_form += `<td> ${res_json[i].E_email}</td>`;
        apply_form += `<td> ${res_json[i].Job_title}</td>`;
        apply_form += `<td> ${res_json[i].Type}</td>`;
        apply_form += `<td> ${res_json[i].Job_description}</td>`;
        apply_form += `<td> ${res_json[i].Job_id}</td>`;
      }
      apply_form += `</table> </form>`;
    response.send(apply_form)
  })
};

app.get("/makeappointment.html", function (request, response) {
  //note to self: need to create cases if person has no advising notes
  let POST = request.body;
  makeappt=`<!DOCTYPE html>

  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Make Appointment</title>
      <link rel="stylesheet" href="homepage.css">`
      
      /*Validating Date is after today onclick*/
  //Source: https://www.codexworld.com/how-to/check-given-date-is-greater-than-today-javascript/
  
  function checkdate() {
      var d = new Date(date.value); //taking value of date from the form
      console.log(date);
      var t = new Date()
      console.log(t + d);
      //if date selected is today or before that, show error message
      if(d <= t){ 
          console.log('nogoodday');
          document.getElementById("dateerror").innerHTML =  '<font color="red">Date has already passed. Please select a future date.</font>'
      }
      //if date selected is after today, do not display anything
      else{
          document.getElementById("dateerror").innerHTML = " "
  
      }
  }
  
      
  makeappt+=`</head>
  <body>
      
     <h1>Shidler Career Services and Professional Development</h1> 
     <h2>Make Advising Appointment</h2>
    
     <!-- The navigation menu -->
     <div class="navbar">
       <div class="subnav">
         <a href="./index.html">Home</a></div>
     <div class="subnav">
       <button class="subnavbtn" >About<i class="fa fa-caret-down"></i></button>
       <div class="subnav-content">
         <a href="./aboutus.html">About Shidler College</a>
         <a href="./studentservices.html">About Student Services</a>
   
       </div>
     </div>
      
     <div class="subnav">
       <button class="subnavbtn">Career Development<i class="fa fa-caret-down"></i></button>
       <div class="subnav-content">
         <a href="./careeradvising.html">Career Advising</a>
         <a href="./jobintsearch.html">Jobs & Internships</a>
       </div>
     </div>
   
     <div class="subnav">
       <button class="subnavbtn">Company Resources<i class="fa fa-caret-down"></i></button>
       <div class="subnav-content">
         <a href="./companies.html">Resources</a>
   </div>
       </div>
   
       <div class="subnav">
         <button class="subnavbtn">Events<i class="fa fa-caret-down"></i></button>
         <div class="subnav-content">
           <a href="./eventregistration.html">Student Events & Registration</a>
           <a href="./employerevents.html">Employer Events List</a>
           <a href="./careerexpo.html">Employer Career Expo Registration</a>
         </div>
     </div>
     <div class="subnav">
       <button class="subnavbtn">Internships<i class="fa fa-caret-down"></i></button>
       <div class="subnav-content">
         <a href="./internships.html">Internships Information</a>
       </div>
   </div>
   <div class="subnav">
     <button class="subnavbtn">Job Opportunities<i class="fa fa-caret-down"></i></button>
     <div class="subnav-content">
       <a href="./addjposting.html">Post Job Opportunities</a>
     </div>
   </div>
     </div>
    
  </body>
  <br>
  <br>
  Student Name
  <br>
  <br>
  <form action="/submitapp" method="POST" name="submitapp"  >
      <label for="date">Appointment Date</label>
      <label for="dateerror" id="dateerror" name="dateerror"></label>
      <br>
      <input type="date" id="date" name="date" onclick="checkdate()" required>
      <br>
      <br>
      <label for="time">Approximate Start time</label>
      <br>
      <input type="time" id="time" name="time" min="9:00" max="16:00" required>
      <br>
      <br>
      <label for="advisor">Choose Advisor</label>
      <select name="advisor" id="advisor">
          <option value="rvarley">Richard Varley (Internships)</option>
          <option value="jpstuart">Patrick Stuart (Full-Time Jobs)</option>
      </select>
      <br>
      <br>
      <br>
      <label for="appt_notes">Please describe the reason for your appointment</label>
      <br>
      <input type="text" id="appt_notes" name="appt_notes" style="height:200px;width:400px;">
      <br>
      <input type="submit" id="submit_appt" name="submit_appt">
  </form>
  
  </html>`;
  response.send(makeappt);
  
});

app.post("/advisingnotes", function (request, response) {
    //note to self: need to create cases if person has no advising notes
    s_id = request.body.s_id;
    console.log(s_id);
    advisingnote(request,response);
});


app.post("/advising.html", function (request, response) {
  //note to self: need to create cases if person has no advising notes
  let POST = request.body;
  advisingpg=`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Log Advising Notes</title>
      
  </head>
  <body>
      <h1>Shidler Career Services and Professional Development</h1> 
      <h2>Log Advising Notes</h2>
  
     <!-- The navigation menu -->
      <div class="navbar">
          <a href="index.html">Home</a>
          <div class="subnav">
      
            <button class="subnavbtn">Companies<i class="fa fa-caret-down"></i></button>
            <div class="subnav-content">
              <a href="./employers.html">Employers</a>
              <a href="./contacts.html">Contacts</a>
              <a href="./jobpostings.html">Job Postings</a>
              <a href="./contactlog.html">Contact Log</a>
  
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
    <form action="/addappt" method="POST" name="addappt"  >
      <input type="hidden" id="s_id" name="s_id" value=${s_id}>
      <label for="date">Appointment Date</label>
      <br>
      <input type="date" id="date" name="date" required>
      <br>
      <br>
      <label for="time">Approximate Start time</label>
      <br>
      <input type="time" id="time" name="time" min="9:00" max="16:00" required>
      <br>
      <br>
      <label for="advisor">Choose Advisor</label>
      <select name="advisor" id="advisor">
          <option value="rvarley">Richard Varley</option>
          <option value="jpstuart">Patrick Stuart</option>
      </select>
      <br>
      <br>
      <br>
      <label for="appt_notes">Advising Notes</label>
      <br>
      <input type="text" id="appt_notes" name="appt_notes" style="height:200px;width:400px;">
      <br>
      <input type="submit" id="addappt" name="addappt">
  </form>
  <br>
  <br>
      <button onclick="window.location.href='/student-single.html'">Back</button>
  </body>
  
  </html>`;
  response.send(advisingpg);
});


function addappt(POST, response){
addappt=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Log Advising Notes</title>
    
</head>
<body>
    <h1>Shidler Career Services and Professional Development</h1> 
    <h2>Log Advising Notes</h2>

   <!-- The navigation menu -->
    <div class="navbar">
        <a href="index.html">Home</a>
        <div class="subnav">
    
          <button class="subnavbtn">Companies<i class="fa fa-caret-down"></i></button>
          <div class="subnav-content">
            <a href="./employers.html">Employers</a>
            <a href="./contacts.html">Contacts</a>
            <a href="./jobpostings.html">Job Postings</a>
            <a href="./contactlog.html">Contact Log</a>

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
      </div>
      <br>
      <p><strong>Appointment added</strong></p>
      </html>`;
    response.send(addappt);
  s_id = POST['s_id'];
  advisor = POST['advisor'];
  date = POST['date'];
  time = POST['time'];
  appt_notes = POST['appt_notes'];
  console.log(s_id);
sql = "INSERT INTO advises(Stud_id,Uname,advising_date,advising_time,advising_note) VALUES ('"+ s_id +"', '" + advisor + "', '" + date + "','" + time + "', '" + appt_notes + "')";
con.query(sql,function(err){
if(err) throw err
console.log(sql)
})
}

app.post("/addappt", function (request, response) {
  //note to self: need to create cases if person has no advising notes
  let POST = request.body;
  addappt(POST, response);
});


function advisingnote(request,response){
  s_id = request.body.s_id;
 var sql = "SELECT * FROM student, student_major, advises, career_services_employee WHERE s_id = st_id AND s_id = stud_id AND Username = Uname AND s_id = " + s_id; //query for the given student
    con.query(sql,function (err, result, fields){ //run the query
      if (err) throw err;
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
    console.log(res_json.length);

    if (res_json.length == 0){
      console.log('no advising')
      console.log(s_id);
      var sql2 = "SELECT * FROM student, student_major WHERE s_id = st_id AND s_id = " + s_id;
    con.query(sql2,function (err, result, fields){ //run the query
      if (err) throw err;
  //  console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
    console.log(res_json.length);
    
      response_form=`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="reportstyle.css">
          <title>Student Notes</title>
      </head>
      <body>
          <h1>Shidler Career Services and Professional Development</h1> 
          <h2>Student Notes</h2>
      
          <!-- The navigation menu -->
          <div class="navbar">
            <div class="subnav">
             <a href="./officehomepage.html">Home</a>
           </div>
           <div class="subnav">
             <a href="./runreports.html">Run Reports</a>
           </div>
              <div class="subnav">
               <a href="./contactlist.html">Contact List</a>
             </div>
          
             <div class="subnav">
               <a href="./employerlist.html">Employer List</a>
             </div>
         
             <div class="subnav">
               <a href="./studentinformation.html">Student List</a>
             </div>
             
             <div class="subnav">
               <a href="./internshiplist.html">Internship List</a>
             </div>
         
              <div class="subnav">
               <a href="./appointment.html">Appointments</a>
             </div>
         
              <div>
               <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
             </div>
          </div>               <br>
            <br>`
        for (i in res_json){
          console.log(i);
          response_form +=`<p>Name: ${res_json[i].S_fname} ${res_json[i].S_lname}</p>
      <p>Phone: ${res_json[i].S_phone}</p>
      <p>Email: ${res_json[i].S_email}</p>
      <p>Major: ${res_json[i].St_major}</p>`
                      }
                      response_form += `<form action="advising.html" method="POST">`;
                      response_form += `<input type="hidden" id="s_id" name="s_id" value="${res_json[0].S_id}">`;
                      response_form += `<input type="hidden" id="s_fname" name="s_fname" value="${res_json[0].S_fname}">`;
                      response_form += `<input type="hidden" id="s_lname" name="s_lname" value="${res_json[0].S_lname}">`;
                      response_form += `<input type="submit" value="Add Advising Note"> </form>`;
                  
          response_form += `</html>`;
          response.send(response_form);
        })} else {
      console.log('has advising')
    
    
    //now build the response for student detail page
    response_form=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="reportstyle.css">
        <title>Student Notes</title>
    </head>
    <body>
        <h1>Shidler Career Services and Professional Development</h1> 
        <h2>Student Notes</h2>
    
        <!-- The navigation menu -->
        <div class="navbar">
          <div class="subnav">
           <a href="./officehomepage.html">Home</a>
         </div>
         <div class="subnav">
           <a href="./runreports.html">Run Reports</a>
         </div>
            <div class="subnav">
             <a href="./contactlist.html">Contact List</a>
           </div>
        
           <div class="subnav">
             <a href="./employerlist.html">Employer List</a>
           </div>
       
           <div class="subnav">
             <a href="./studentinformation.html">Student List</a>
           </div>
           
           <div class="subnav">
             <a href="./internshiplist.html">Internship List</a>
           </div>
       
            <div class="subnav">
             <a href="./appointment.html">Appointments</a>
           </div>
       
            <div>
             <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
           </div>
        </div>
          </div>
          <br>
          <br>`
        response_form +=`<p>Name: ${res_json[0].S_fname} ${res_json[0].S_lname}</p>
    <p>Phone: ${res_json[0].S_phone}</p>
    <p>Email: ${res_json[0].S_email}</p>
    <p>Major: ${res_json[0].St_major}</p>`
                    
    response_form += `<table class="center" border="3" cellpadding="5" cellspacing="5" bgcolor="white">`;
    response_form += `<td><B>Advising Date</B></td><td><B>Appointment Note</B></td><td><B>Advisor</B></td><td><B>Advisor's Note</B></td>`;
        for (i in res_json) {
          response_form += `<tr><td> ${res_json[i].Advising_date}</td>`;
          response_form += `<td> ${res_json[i].Advising_note}</td>`;
          response_form += `<td> ${res_json[i].A_name}</td>`;
          response_form += `<td> ${res_json[i].advisor_note}</td>`;

        }
        response_form += "</table><br><br>";
        response_form += `<form action="advising.html" method="POST">`;
        response_form += `<input type="hidden" id="s_id" name="s_id" value="${res_json[0].S_id}">`;
        response_form += `<input type="hidden" id="s_fname" name="s_fname" value="${res_json[0].S_fname}">`;
        response_form += `<input type="hidden" id="s_lname" name="s_lname" value="${res_json[0].S_lname}">`;
        response_form += `<input type="submit" value="Add Advising Note"> </form>`;
        response_form += `</html>`;
        response.send(response_form);
   
      }});
}

function query_name(POST, response) {
  Name = POST ['Employer_name'];
  var sql = "SELECT * FROM employer WHERE E_name = '" + Name +"'";
  con.query (sql, function (err, result, fields){
    if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  name_form = '<form action"employers.html" method = "GET">';
  name_form += `<table border="3" cellpadding="5" cellspacing="5">`;
  name_form += `<td><B>E_id</td><td><B>E_name</td><td><B>E_phone</td><td><B>E_email</td><td><B>E_street</td><td><B>E_city</td><td><B>E_state</td><td><B>E_zipcode</td><td><B>E_industry</td></b>`;
      for (i in res_json) {
        name_form += `<tr><td> ${res_json[i].E_id}</td>`;
        name_form += `<td> ${res_json[i].E_name}</td>`;
        name_form += `<td> ${res_json[i].E_phone}</td>`;
        name_form += `<td> ${res_json[i].E_email}</td>`
        name_form += `<td> ${res_json[i].E_street}</td>`
        name_form += `<td> ${res_json[i].E_city}</td>`
        name_form += `<td> ${res_json[i].E_state}</td>`
        name_form += `<td> ${res_json[i].E_zipcode}</td>`
        name_form += `<td> ${res_json[i].E_industry}</td></tr>`;
      }
      name_form += `</table></form>`;
      response.send(name_form);
    });
};

function query_state(POST, response) {
  State = POST ['Employer_state'];
  var sql = "SELECT * FROM employer WHERE E_state = '" + State + "'";
  con.query (sql, function (err, result, fields){
    if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  state_form = '<form action"employers.html" method = "GET">';
  state_form += `<table border="3" cellpadding="5" cellspacing="5">`;
  state_form += `<td><B>E_id</td><td><B>E_name</td><td><B>E_phone</td><td><B>E_email</td><td><B>E_street</td><td><B>E_city</td><td><B>E_state</td><td><B>E_zipcode</td><td><B>E_industry</td></b>`;
      for (i in res_json) {
        state_form += `<tr><td> ${res_json[i].E_id}</td>`;
        state_form += `<td> ${res_json[i].E_name}</td>`;
        state_form += `<td> ${res_json[i].E_phone}</td>`;
        state_form += `<td> ${res_json[i].E_email}</td>`
        state_form += `<td> ${res_json[i].E_street}</td>`
        state_form += `<td> ${res_json[i].E_city}</td>`
        state_form += `<td> ${res_json[i].E_state}</td>`
        state_form += `<td> ${res_json[i].E_zipcode}</td>`
        state_form += `<td> ${res_json[i].E_industry}</td></tr>`;
      }
      state_form += `</table> </form>`;
      response.send(state_form);
    });
};

function query_zipcode(POST, response) {
  Zip = POST ['Employer_zip'];
  var sql = "SELECT * FROM employer WHERE E_zipcode = " + Zip;
  con.query (sql, function (err, result, fields){
    if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  zip_form = '<form action"employers.html" method = "GET">';
  zip_form += `<table border="3" cellpadding="5" cellspacing="5">`;
  zip_form += `<td><B>E_id</td><td><B>E_name</td><td><B>E_phone</td><td><B>E_email</td><td><B>E_street</td><td><B>E_city</td><td><B>E_state</td><td><B>E_zipcode</td><td><B>E_industry</td></b>`;
      for (i in res_json) {
        zip_form += `<tr><td> ${res_json[i].E_id}</td>`;
        zip_form += `<td> ${res_json[i].E_name}</td>`;
        zip_form += `<td> ${res_json[i].E_phone}</td>`;
        zip_form += `<td> ${res_json[i].E_email}</td>`
        zip_form += `<td> ${res_json[i].E_street}</td>`
        zip_form += `<td> ${res_json[i].E_city}</td>`
        zip_form += `<td> ${res_json[i].E_state}</td>`
        zip_form += `<td> ${res_json[i].E_zipcode}</td>`
        zip_form += `<td> ${res_json[i].E_industry}</td></tr>`;
      }
      zip_form += `</table></form>`;
      response.send(zip_form);
    });
};

function query_industry(POST, response) {
  Ind = POST ['Employer_industry'];
  var sql = "SELECT * FROM employer WHERE E_industry = '" + Ind + "'";
  con.query (sql, function (err, result, fields){
    if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  industry_form = '<form action"employers.html" method = "GET">';
  industry_form += `<table border="3" cellpadding="5" cellspacing="5">`;
  industry_form += `<td><B>E_id</td><td><B>E_name</td><td><B>E_phone</td><td><B>E_email</td><td><B>E_street</td><td><B>E_city</td><td><B>E_state</td><td><B>E_zipcode</td><td><B>E_industry</td></b>`;
      for (i in res_json) {
        industry_form += `<tr><td> ${res_json[i].E_id}</td>`;
        industry_form += `<td> ${res_json[i].E_name}</td>`;
        industry_form += `<td> ${res_json[i].E_phone}</td>`;
        industry_form += `<td> ${res_json[i].E_email}</td>`
        industry_form += `<td> ${res_json[i].E_street}</td>`
        industry_form += `<td> ${res_json[i].E_city}</td>`
        industry_form += `<td> ${res_json[i].E_state}</td>`
        industry_form += `<td> ${res_json[i].E_zipcode}</td>`
        industry_form += `<td> ${res_json[i].E_industry}</td></tr>`;
      }
      industry_form += `</table></form>`;
      response.send(industry_form);
    });
};

function query_jpostings (POST, response){
  Cname = POST ['E_name']; 
  var sql = "SELECT E_id, E_name, E_email, E_city, E_state, E_zipcode, E_industry, Job_title, Job_description FROM job_posting, employer WHERE Empl_id = E_id AND E_name = '" + Cname + "'";
  con.query (sql, function (err, result, fields){
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);
    //Response: table of results and form to do another query 
    job_postings_form = `<form action"jobpostings.html" method = "GET">`;
    job_postings_form += `<table border="3" cellpadding="5" cellspacing="5">`;
    job_postings_form += `<td><B>Comp_id</td><td><B>Name</td><td><B>Phone</td><td><B>Email</td><td><B>Street</td><td><B>City</td><td><B>State</td><td><B>Zipcode</td><td><B>Industry</td><td><B>Job_title</td><td><B>Job_description</td></b>`;
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
          job_postings_form += `<td> ${res_json[i].Job_description}</td>`;
        }
        job_postings_form += `</table></form>`;
        response.send(job_postings_form)
      })
  };

  function query_viewemp (POST, response){
    emid = POST ['E_id']; 
    var sql = "SELECT * FROM employer";
    con.query (sql, function (err, result, fields){
      if (err) throw err;
      console.log(result);
      var res_string = JSON.stringify(result);
      var res_json = JSON.parse(res_string);
      console.log(res_json);

      viewemp_form =`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>Job search</title>
      </head>`
    

      //Response: table of results and form to do another query 
      viewemp_form = `<form action"updateaccount.html" method = "GET">`;
      viewemp_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      viewemp_form += `<td><B>Company_ID</td><td><B>Name</td><td><B>Phone</td><td><B>Email</td><td><B>Street</td><td><B>City</td><td><B>State</td><td><B>Zipcode</td><td><B>Industry</td></b>`;
          for (i in res_json) {
            viewemp_form += `<tr><td> ${res_json[i].E_id}</td>`;
            viewemp_form += `<td> ${res_json[i].E_name}</td>`;
            viewemp_form += `<td> ${res_json[i].E_phone}</td>`;
            viewemp_form += `<td> ${res_json[i].E_email}</td>`;
            viewemp_form += `<td> ${res_json[i].E_street}</td>`;
            viewemp_form += `<td> ${res_json[i].E_city}</td>`;
            viewemp_form += `<td> ${res_json[i].E_state}</td>`;
            viewemp_form += `<td> ${res_json[i].E_zipcode}</td>`;
            viewemp_form += `<td> ${res_json[i].E_industry}</td>`;
          }
          viewemp_form += `</table></form>`;
          response.send(viewemp_form)
        })
    };

  function query_upempl (POST, response){
      Id = POST ['E_id'];
      NewEname = POST ['E_name'];
      NewPhone = POST ['E_phone'];
      NewEmail = POST ['E_email'];
      NewStreet = POST ['E_street'];
      NewCity = POST ['E_city'];
      NewState = POST ['E_state'];
      NewZipcode = POST ['E_zipcode'];
      NewIndustry = POST ['E_industry'];
      NewCid = POST ['Primary_cid'];
      var sql = "UPDATE Employer SET E_name = '"+ NewEname + "', E_phone = '" + NewPhone + "', E_email = '" + NewEmail + "', E_street = '" + NewStreet + "', E_city = '" + NewCity + "', E_state = '" + NewState + "', E_zipcode = '" + NewZipcode + "', E_industry = '" + NewIndustry + "', Primary_cid = '" + NewCid + "' WHERE E_id = '" + Id +"'";
      con.query (sql, function (err, result, fields){
        if (err) throw err;
        console.log(result);
        var res_string = JSON.stringify(result);
        var res_json = JSON.parse(res_string);
        console.log(res_json);
        //Response: table of results and form to do another query 
        update_form = `<form action"updateaccount.html" method = "GET">`;
        update_form += `<table border="3" cellpadding="5" cellspacing="5">`;
        update_form += `<td><B>Id</td><td><B>Company</td><td><B>Phone</td><td><B>Email</td><td><B>Street</td><td><B>City</td><td><B>State</td><td><B>Zipcode</td><td><B>Industry</td><td><B>Primary_cid</td</b>`;
            for (i in res_json) {
              update_form += `<tr><td> ${res_json[i].E_id}</td>`;
              update_form += `<td> ${res_json[i].E_name}</td>`;
              update_form += `<td> ${res_json[i].E_phone}</td>`;
              update_form += `<td> ${res_json[i].E_email}</td>`;
              update_form += `<td> ${res_json[i].E_street}</td>`;
              update_form += `<td> ${res_json[i].E_city}</td>`;
              update_form += `<td> ${res_json[i].E_state}</td>`;
              update_form += `<td> ${res_json[i].E_zipcode}</td>`;
              update_form += `<td> ${res_json[i].E_industry}</td>`;
              update_form += `<td> ${res_json[i].Primary_cid}</td>`;
            }
            update_form += `</table></form>`;
            response.send(update_form)
          })
      };

      function query_addingjp (POST, response){
        Jid = POST ['Job_id'];
        Jtitle = POST ['Job_title'];
        Descrip = POST ['Job_description'];
        Jtype = POST ['Type'];
        Jpid = POST ['Empl_id']; 
        var sql = "INSERT INTO job_posting(Job_id,Job_title,Job_description,Type,Empl_id) VALUES ('" + Jid + "', '" + Jtitle + "','" + Descrip + "', '" + Jtype + "','" + Jpid + "')";
        con.query (sql, function (err, result, fields){
          if (err) throw err;
          console.log(result);
          var res_string = JSON.stringify(result);
          var res_json = JSON.parse(res_string);
          console.log(res_json);
          //Response: table of results and form to do another query 
          adding_jp_form = `<form action"jobpostings.html" method = "GET">`;
          adding_jp_form += `<table border="3" cellpadding="5" cellspacing="5">`;
          adding_jp_form += `<td><B>JobId</td><td><B>Title</td><td><B>Description</td><td><B>Type</td><td><B>Comp_id</td></b>`;
              for (i in res_json) {
                adding_jp_form += `<tr><td> ${res_json[i].Job_id}</td>`;
                adding_jp_form += `<td> ${res_json[i].Job_title}</td>`;
                adding_jp_form += `<td> ${res_json[i].Job_description}</td>`;
                adding_jp_form += `<td> ${res_json[i].Type}</td>`;
                adding_jp_form += `<td> ${res_json[i].Empl_id}</td>`;
              }
              adding_jp_form += `</table></form>`;
              response.send(adding_jp_form)
            })
        };

//Post for processing any job searches from students
app.post("/search_job_by_name", function (request,response){
  let POST = request.body;
  username = request.session.username;
  console.log(username);
  query_jobsearchname(POST, response);
});

app.post("/search_internship_by_name", function (request,response){
  let POST = request.body;
  username = request.session.username;
  console.log(username);
  query_internshipsearch(POST, response);
});
app.post("/search_internship_by_student", function (request,response){
  let POST = request.body;
  username = request.session.username;
  console.log(username);
  query_internshipsearchstudent(POST, response);
});

app.post("/search_job_by_type", function (request,response){
  let POST = request.body;
  query_jobsearchtype(POST, response);
});

app.post("/apply", function (request,response){
  let POST = request.body;
  apply(POST, response);
});


app.post("/name_query", function (request, response) {
  let POST = request.body;
query_name(POST, response);
});

app.post("/state_query", function (request, response) {
  let POST = request.body;
query_state(POST, response);
});

app.post("/zip_query", function (request, response) {
  let POST = request.body;
query_zipcode(POST, response);
});

app.post("/industry_query", function (request, response) {
  let POST = request.body;
query_industry(POST, response);
});

app.post("/jposting_query", function (request, response) {
  let POST = request.body;
query_jpostings(POST, response);
});

app.post("/view_employers_query", function (request, response) {
  let POST = request.body;
  query_viewemp(POST, response);
});

app.post("/update_employer_query", function (request, response) {
  let POST = request.body;
  query_upempl(POST, response);
});

app.post ("/addingjpost_query", function (request, response) {
  let POST = request.body;
  query_addingjp(POST, response);
});


app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

function s_query_fname(POST, response) {
  Name = POST ['S_fname'];
  var sql = "SELECT * FROM student_info WHERE S_fname = '" + Name +"'";
  con.query (sql, function (err, result, fields){
    if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  response_form = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="reportstyle.css">
      <title>Student Notes</title>
  </head>
  <body>
      <h1>Shidler Career Services and Professional Development</h1> 
      <h2>Student Notes</h2>
  
      <!-- The navigation menu -->
      <div class="navbar">
       <div class="subnav">
        <a href="./officehomepage.html">Home</a>
      </div>
      <div class="subnav">
        <a href="./runreports.html">Run Reports</a>
      </div>
         <div class="subnav">
          <a href="./contactlist.html">Contact List</a>
        </div>
     
        <div class="subnav">
          <a href="./employerlist.html">Employer List</a>
        </div>
    
        <div class="subnav">
          <a href="./studentinformation.html">Student List</a>
        </div>
        
        <div class="subnav">
          <a href="./internshiplist.html">Internship List</a>
        </div>
    
         <div class="subnav">
          <a href="./appointment.html">Appointments</a>
        </div>
    
         <div>
          <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
        </div>
     </div>

        <br>
        <Form action="/s_fname_query" method="POST">
        <label for = "S_fname">By Name</label><br>
       <input type='text' name='S_fname'><BR>
       <input type="submit" value="Submit">
       </Form>
<br>
   <Form action="/s_phone_query" method= "POST">
         <label for="S_phone">By Phone:</label><br>
         <input type="text" name= "S_phone"><br>
         <input type="submit" value="Submit">
       </Form> 
<br>
   <Form action="/s_email_query" method= "POST">
         <label for="S_email">By Email:</label><br>
         <input type="text" name= "S_email"><br>
         <input type="submit" value="Submit">
       </Form> 
<br>
   <Form action="/s_major_query" method= "POST">
         <label for="S_major">By Major:</label><br>
         <input type="text" name= "S_major"><br>
         <input type="submit" value="Submit">
       </Form> 
        <br>`
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>Name</td><td><B>Phone</td><td><B>Email</td><td><B>Major</td></b>`;
      for (i in res_json){
        console.log(i)
        response_form +=`<form action="/advisingnotes" method="POST">`;
        response_form +=`
        <tr>
        <td>${res_json[i].S_fname} ${res_json[i].S_lname}
        <input type="hidden" id="s_id" name="s_id" value="${res_json[i].S_id}">
        <input type="submit" name="${res_json[i].S_id}" value="View"></form></td>
        <td>${res_json[i].S_phone}</td>
        <td>${res_json[i].S_email}</td>
        <td>${res_json[i].St_major}</td>`
        }
      response_form += `</tr></html>`;
      response.send(response_form);
    });
};

function s_query_st_major(POST, response) {
  major = POST ['S_major'];
  var sql = "SELECT * FROM student_info WHERE St_major = '" + major +"'";
  con.query (sql, function (err, result, fields){
    if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  response_form = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="reportstyle.css">
      <title>Student Notes</title>
  </head>
  <body>
      <h1>Shidler Career Services and Professional Development</h1> 
      <h2>Student Notes</h2>
  
      <!-- The navigation menu -->
      <div class="navbar">
       <div class="subnav">
        <a href="./officehomepage.html">Home</a>
      </div>
      <div class="subnav">
        <a href="./runreports.html">Run Reports</a>
      </div>
         <div class="subnav">
          <a href="./contactlist.html">Contact List</a>
        </div>
     
        <div class="subnav">
          <a href="./employerlist.html">Employer List</a>
        </div>
    
        <div class="subnav">
          <a href="./studentinformation.html">Student List</a>
        </div>
        
        <div class="subnav">
          <a href="./internshiplist.html">Internship List</a>
        </div>
    
         <div class="subnav">
          <a href="./appointment.html">Appointments</a>
        </div>
    
         <div>
          <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
        </div>
     </div>
       </div>
        <br>
        <Form action="/s_fname_query" method="POST">
        <label for = "S_fname">By Name</label><br>
       <input type='text' name='S_fname'><BR>
       <input type="submit" value="Submit">
       </Form>
<br>
   <Form action="/s_phone_query" method= "POST">
         <label for="S_phone">By Phone:</label><br>
         <input type="text" name= "S_phone"><br>
         <input type="submit" value="Submit">
       </Form> 
<br>
   <Form action="/s_email_query" method= "POST">
         <label for="S_email">By Email:</label><br>
         <input type="text" name= "S_email"><br>
         <input type="submit" value="Submit">
       </Form> 
<br>
   <Form action="/s_major_query" method= "POST">
         <label for="S_major">By Major:</label><br>
         <input type="text" name= "S_major"><br>
         <input type="submit" value="Submit">
       </Form> 
        <br>`
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>Name</td><td><B>Phone</td><td><B>Email</td><td><B>Major</td></b>`;
      for (i in res_json){
        console.log(i)
        response_form +=`<form action="/advisingnotes" method="POST">`;
        response_form +=`
        <tr>
        <td>${res_json[i].S_fname} ${res_json[i].S_lname}
        <input type="hidden" id="s_id" name="s_id" value="${res_json[i].S_id}">
        <input type="submit" name="${res_json[i].S_id}" value="View"></form></td>
        <td>${res_json[i].S_phone}</td>
        <td>${res_json[i].S_email}</td>
        <td>${res_json[i].St_major}</td>`
        }
      response_form += `</tr></html>`;
      response.send(response_form);
    });
};

function s_email_query(POST, response) {
  email = POST ['S_email'];
  var sql = "SELECT * FROM student_info WHERE S_email = '" + email +"'";
  con.query (sql, function (err, result, fields){
    if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  response_form = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="reportstyle.css">
      <title>Student Notes</title>
  </head>
  <body>
      <h1>Shidler Career Services and Professional Development</h1> 
      <h2>Student Notes</h2>
  
      <!-- The navigation menu -->
      <div class="navbar">
       <div class="subnav">
        <a href="./officehomepage.html">Home</a>
      </div>
      <div class="subnav">
        <a href="./runreports.html">Run Reports</a>
      </div>
         <div class="subnav">
          <a href="./contactlist.html">Contact List</a>
        </div>
     
        <div class="subnav">
          <a href="./employerlist.html">Employer List</a>
        </div>
    
        <div class="subnav">
          <a href="./studentinformation.html">Student List</a>
        </div>
        
        <div class="subnav">
          <a href="./internshiplist.html">Internship List</a>
        </div>
    
         <div class="subnav">
          <a href="./appointment.html">Appointments</a>
        </div>
    
         <div>
          <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
        </div>
     </div>
       </div>
        <br>
        <Form action="/s_fname_query" method="POST">
        <label for = "S_fname">By Name</label><br>
       <input type='text' name='S_fname'><BR>
       <input type="submit" value="Submit">
       </Form>
<br>
   <Form action="/s_phone_query" method= "POST">
         <label for="S_phone">By Phone:</label><br>
         <input type="text" name= "S_phone"><br>
         <input type="submit" value="Submit">
       </Form> 
<br>
   <Form action="/s_email_query" method= "POST">
         <label for="S_email">By Email:</label><br>
         <input type="text" name= "S_email"><br>
         <input type="submit" value="Submit">
       </Form> 
<br>
   <Form action="/s_major_query" method= "POST">
         <label for="S_major">By Major:</label><br>
         <input type="text" name= "S_major"><br>
         <input type="submit" value="Submit">
       </Form> 
        <br>`
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>Name</td><td><B>Phone</td><td><B>Email</td><td><B>Major</td></b>`;
      for (i in res_json){
        console.log(i)
        response_form +=`<form action="/advisingnotes" method="POST">`;
        response_form +=`
        <tr>
        <td>${res_json[i].S_fname} ${res_json[i].S_lname}
        <input type="hidden" id="s_id" name="s_id" value="${res_json[i].S_id}">
        <input type="submit" name="${res_json[i].S_id}" value="View"></form></td>
        <td>${res_json[i].S_phone}</td>
        <td>${res_json[i].S_email}</td>
        <td>${res_json[i].St_major}</td>`
        }
      response_form += `</tr></html>`;
      response.send(response_form);
    });
};

function s_phone_query(POST, response) {
  email = POST ['S_phone'];
  var sql = "SELECT * FROM student_info WHERE S_phone = '" + email +"'";
  con.query (sql, function (err, result, fields){
    if (err) throw err;
  console.log(result);
  var res_string = JSON.stringify(result);
  var res_json = JSON.parse(res_string);
  console.log(res_json);
  //Response: table of results and form to do another query 
  response_form = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="reportstyle.css">
      <title>Student Notes</title>
  </head>
  <body>
      <h1>Shidler Career Services and Professional Development</h1> 
      <h2>Student Notes</h2>
  
      <!-- The navigation menu -->
      <div class="navbar">
       <div class="subnav">
        <a href="./officehomepage.html">Home</a>
      </div>
      <div class="subnav">
        <a href="./runreports.html">Run Reports</a>
      </div>
         <div class="subnav">
          <a href="./contactlist.html">Contact List</a>
        </div>
     
        <div class="subnav">
          <a href="./employerlist.html">Employer List</a>
        </div>
    
        <div class="subnav">
          <a href="./studentinformation.html">Student List</a>
        </div>
        
        <div class="subnav">
          <a href="./internshiplist.html">Internship List</a>
        </div>
    
         <div class="subnav">
          <a href="./appointment.html">Appointments</a>
        </div>
    
         <div>
          <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
        </div>
     </div>
       </div>
        <br>
        <Form action="/s_fname_query" method="POST">
        <label for = "S_fname">By Name</label><br>
       <input type='text' name='S_fname'><BR>
       <input type="submit" value="Submit">
       </Form>
<br>
   <Form action="/s_phone_query" method= "POST">
         <label for="S_phone">By Phone:</label><br>
         <input type="text" name= "S_phone"><br>
         <input type="submit" value="Submit">
       </Form> 
<br>
   <Form action="/s_email_query" method= "POST">
         <label for="S_email">By Email:</label><br>
         <input type="text" name= "S_email"><br>
         <input type="submit" value="Submit">
       </Form> 
<br>
   <Form action="/s_major_query" method= "POST">
         <label for="S_major">By Major:</label><br>
         <input type="text" name= "S_major"><br>
         <input type="submit" value="Submit">
       </Form> 
        <br>`
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>Name</td><td><B>Phone</td><td><B>Email</td><td><B>Major</td></b>`;
      for (i in res_json){
        console.log(i)
        response_form +=`<form action="/advisingnotes" method="POST">`;
        response_form +=`
        <tr>
        <td>${res_json[i].S_fname} ${res_json[i].S_lname}
        <input type="hidden" id="s_id" name="s_id" value="${res_json[i].S_id}">
        <input type="submit" name="${res_json[i].S_id}" value="View"></form></td>
        <td>${res_json[i].S_phone}</td>
        <td>${res_json[i].S_email}</td>
        <td>${res_json[i].St_major}</td>`
        }
      response_form += `</tr></html>`;
      response.send(response_form);
    });
};

app.post("/s_phone_query", function (request, response) {
  let POST = request.body;
  s_phone_query(POST, response);
});

app.post("/s_email_query", function (request, response) {
  let POST = request.body;
  s_email_query(POST, response);
});

app.post("/s_fname_query", function (request, response) {
  let POST = request.body;
s_query_fname(POST, response);
});

app.post("/s_major_query", function (request, response) {
  let POST = request.body;
s_query_st_major(POST, response);
});

function contactlist(POST, response){
  //note to self: need to create cases if person has no advising notes
  var sql = "SELECT * FROM Contact"; //query for the given student
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
      <link rel="stylesheet" href="reportstyle.css">
      <title>Student Notes</title>
  </head>
  <body>
      <h1>Shidler Career Services and Professional Development</h1> 
      <h2>Student Notes</h2>
  
      <!-- The navigation menu -->
      <div class="navbar">
       <div class="subnav">
        <a href="./officehomepage.html">Home</a>
      </div>
      <div class="subnav">
        <a href="./runreports.html">Run Reports</a>
      </div>
         <div class="subnav">
          <a href="./contactlist.html">Contact List</a>
        </div>
     
        <div class="subnav">
          <a href="./employerlist.html">Employer List</a>
        </div>
    
        <div class="subnav">
          <a href="./studentinformation.html">Student List</a>
        </div>
        
        <div class="subnav">
          <a href="./internshiplist.html">Internship List</a>
        </div>
    
         <div class="subnav">
          <a href="./appointment.html">Appointments</a>
        </div>
    
         <div>
          <a class="logout" href="index.html"subnavbtn">Log Out</i></button></a>
        </div>
     </div>
     <H1>Search for Contacts</H1>

     <Form action="/contact_query" method="POST">
          <label for = "C_name">By Name</label><br>
         <input type='text' name='Contact_name'><BR>
         <input type="submit" value="Submit">
         </Form>
 <br>
     <Form action="/email_query" method= "POST">
           <label for="C_email">By Email:</label><br>
           <input type="text" name= "Contact_email"><br>
           <input type="submit" value="Submit">
         </Form> 
 <br>
 
     <Form action="/phone_query" method="POST">
           <label for = "C_phone">By Phone</label><br>
           <input type='text' name='Contact_phone'><BR>
           <input type="submit" value="Submit">
         </Form>
 <br>
     <Form action="/jobtitle_query" method= "POST">
           <label for="C_jobtitle">By Jobtitle:</label><br>
           <input type="text" name= "Contact_jobtitle"><br>
           <input type="submit" value="Submit">
         </Form> 
 <br>
     <Form action="/specialty_query" method= "POST">
           <label for="C_specialty">By Specialty:</label><br>
           <input type="text" name= "Contact_specialty"><br>
           <input type="submit" value="Submit">
         </Form> 
 <br>`
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>Name</td><td><B>Phone</td><td><B>Email</td><td><B>Major Specialty</td></b>`;
      for (i in res_json){
        console.log(i)
        response_form +=`<form action="/advisingnotes" method="POST">`;
        response_form +=`
        <tr>
        <td>${res_json[i].C_fname} ${res_json[i].C_minit} ${res_json[i].C_lname}
        <input type="hidden" id="C_id" name="C_id" value="${res_json[i].C_id}">
        <td>${res_json[i].C_phone}</td>
        <td>${res_json[i].C_email}</td>
        <td>${res_json[i].C_specialty}</td>`
        }
      response_form += `</tr></html>`;
      response.send(response_form);
});
}

app.get("/contactlist.html", function (request, response) {
let POST = request.body;
contactlist(POST, response);
});

app.listen(8080, () => console.log(`listening on port 8080`));