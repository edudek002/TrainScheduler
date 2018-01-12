// START CODING BELOW!!

    // Initialize Firebase
    

  // Initialize Firebase
  var config = {
 
    apiKey: "AIzaSyCqyNPiGOGnoUhnTSSkWm_KvGV9SMhEGUg",
    authDomain: "test-project-aabef.firebaseapp.com",
    databaseURL: "https://test-project-aabef.firebaseio.com",
    projectId: "test-project-aabef",
    storageBucket: "test-project-aabef.appspot.com",
    messagingSenderId: "520120387096"
  };
  


  firebase.initializeApp(config);

    // Create a variable to reference the database
  var database = firebase.database();

    // Initial Values
  var name = "";
  var destination = "";
  var start = "";
  var frequency = "";

  // Capture Button Click for adding Employees
  $("#add-user").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
      
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    start = $("#start-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    //Local temporary object

    var newTrain = {
      name: name,
      destination: destination,
      start: start,
      frequency: frequency
    };

    

    // Uploads data to database
    database.ref().push(newTrain);

      // Log everything 
      
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.start);
      console.log(newTrain.frequency);

      alert("Train added");

      //clear boxes


      $("#name-input").val("");
      $("#destination-input").val("");
      $("#start-input").val("");
      $("#frequency-input").val("");

});

// Create a Firebase event for adding employee
// to database and a row in HTML

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

 //Store everything into a variable

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);


  var randomDate = "17:20";
  
  console.log("First=" + randomDate);
  //var empStartPretty = moment.unix(empStart).format("MM/DD/YY"); 


    var randomFormat = "HH:mm";
    var convertedDate = moment(randomDate, randomFormat);

    // Using scripts from moment.js write code below to complete each of the following.
    // Console.log to confirm the code changes you made worked.

    // 1 ...to convert the randomDate into three other date formats
    console.log(moment(convertedDate).format("HH:mm"));
    var minTo=moment(convertedDate).diff(moment(), "minutes");
    var minAway = minTo%trainFrequency;
    console.log(moment(convertedDate).diff(moment(), "minutes"));
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    var nextArrival = minTo;

  /*

// Prettify the employee start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);
  */

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
   trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");
});

    /*  // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    */

