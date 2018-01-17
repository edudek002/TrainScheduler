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
  var start1 = "";
  var start2 = "";
  var start3 = "";
  var start4 = "";
  var start5 = "";
  var frequency1 = "";
  var frequency2 = "";
  var frequency3 = "";
  var frequency4 = "";
  var frequency5 = "";

  // Capture Button Click for adding Employees
  $("#add-user").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
      
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    start1 = $("#start1-input").val().trim();
    start2 = $("#start2-input").val().trim();
    start3 = $("#start3-input").val().trim();
    start4 = $("#start4-input").val().trim();
    start5 = $("#start5-input").val().trim();
    frequency1 = $("#frequency1-input").val().trim();
    frequency2 = $("#frequency2-input").val().trim();
    frequency3 = $("#frequency3-input").val().trim();
    frequency4 = $("#frequency4-input").val().trim();
    frequency5 = $("#frequency5-input").val().trim();

    //Local temporary object

    var newTrain = {
      name: name,
      destination: destination,
      start1: start1,
      start2: start2,
      start3: start3,
      start4: start4,
      start5: start5,
      frequency1: frequency1,
      frequency2: frequency2,
      frequency3: frequency3,
      frequency4: frequency4,
      frequency5: frequency5
    };

    

    // Uploads data to database
    database.ref().push(newTrain);

      // Log everything 
      
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.start1);
      console.log(newTrain.frequency);

      alert("Train added");

      //clear boxes


      $("#name-input").val("");
      $("#destination-input").val("");
      $("#start1-input").val("");
      $("#start2-input").val("");
      $("#start3-input").val("");
      $("#start4-input").val("");
      $("#start5-input").val("");
      $("#frequency1-input").val("");
      $("#frequency2-input").val("");
      $("#frequency3-input").val("");
      $("#frequency4-input").val("");
      $("#frequency5-input").val("");

});

// Create a Firebase event for adding employee
// to database and a row in HTML

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

 //Store everything into a variable

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart1 = childSnapshot.val().start1;
  var trainStart2 = childSnapshot.val().start2;
  var trainStart3 = childSnapshot.val().start3;
  var trainStart4 = childSnapshot.val().start4;
  var trainStart5 = childSnapshot.val().start5;
  var trainFrequency1 = childSnapshot.val().frequency1;
  var trainFrequency2 = childSnapshot.val().frequency2;
  var trainFrequency3 = childSnapshot.val().frequency3;
  var trainFrequency4 = childSnapshot.val().frequency4;
  var trainFrequency5 = childSnapshot.val().frequency5;

  //Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart1);
  console.log(trainFrequency1);
  console.log(trainStart2);
  console.log(trainFrequency2);
  console.log(trainStart3);
  console.log(trainFrequency3);
  console.log(trainStart4);
  console.log(trainFrequency4);
  console.log(trainStart5);
  console.log(trainFrequency5);

  //Current Time
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("HH:mm"));
  
    var randomFormat = "HH:mm";
    //var convertedTime = moment(trainStart, randomFormat);

    // Using scripts from moment.js write code below to complete each of the following.
    
    //Confirm the format of Start time
    //console.log(moment(convertedTime).format("HH:mm"));


    var convertedTime1 = moment(trainStart1, randomFormat);
    var convertedTime2 = moment(trainStart2, randomFormat);
    var convertedTime3 = moment(trainStart3, randomFormat);
    var convertedTime4 = moment(trainStart4, randomFormat);
    var convertedTime5 = moment(trainStart5, randomFormat);

    //minSince is the the time since the first train Start time, 
    //or time to the future Start time


    minSince1=moment(convertedTime1).diff(moment(), "minutes")
    minSince2=moment(convertedTime2).diff(moment(), "minutes")
    minSince3=moment(convertedTime3).diff(moment(), "minutes")
    minSince4=moment(convertedTime4).diff(moment(), "minutes")
    minSince5=moment(convertedTime5).diff(moment(), "minutes")

    if (minSince5<=0) {
        trainFrequency=trainFrequency5;
        minSince=-minSince5;
        console.log("Fith train");
    }

    else if (minSince4<=0) {
        trainFrequency=trainFrequency4;
        minSince=-minSince4;
        console.log("Forth train");
    }

    else if (minSince3<=0){
        trainFrequency=trainFrequency3;
        minSince=-minSince3;
        console.log("Third train");
    }

    else if (minSince2<=0) {
        trainFrequency=trainFrequency2;
        minSince=-minSince2;
        console.log("Second train");
    }

    else {
        trainFrequency=trainFrequency1;
        minSince=-minSince1;
        console.log("First train");
    }

    console.log(minSince);
    var minAway = trainFrequency-minSince%trainFrequency;
    




    //minAway is number of minutes until the next train
    /*

    var minSince=moment(convertedTime).diff(moment(), "minutes");
    if (minSince<=0) {

    minSince=-minSince;
    console.log(minSince);
    var minAway = trainFrequency-minSince%trainFrequency;
    }

    else{

    console.log(minSince);
    var minAway = minSince;
 
    }
    */
    

    //change minAway to the next train time

    var nextTrainMin = moment().add(minAway, "minutes");

    var nextArrival = moment(nextTrainMin).format("HH:mm");

    console.log("Arrival Time: " + nextArrival);



    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");


  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
   trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");
});

    /*  // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    */

