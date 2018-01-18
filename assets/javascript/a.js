// Creates buttons with access to CTA schedule online



var button = $("<button>");
button.addClass("line1");
button.attr("data-train", "Pink Line");
button.text("Pink Line");
//button.attr('<img src="assets/images/brownLine.pdf">')
$("#pinkLine").append(button);
      

var button = $("<button>");
button.addClass("line2");
button.attr("data-train", "Green Line");
button.text("Green Line");
//button.attr('<img src="assets/images/brownLine.pdf">')
$("#greenLine").append(button);

    
var button = $("<button>");
button.addClass("line3");
button.attr("data-train", "Brown Line");
button.text("Brown Line");
//button.attr('<img src="assets/images/brownLine.pdf">')
$("#brownLine").append(button);
      
    
var button = $("<button>");
button.addClass("line4");
button.attr("data-train", "Orange line");
button.text("Orange line");
//button.attr('<img src="assets/images/brownLine.pdf">')
$("#orangeLine").append(button);

  

  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyC9BxbOBZF8Da84yKPBauumhif0d7S-TKw",
    authDomain: "trainschedule-4f72a.firebaseapp.com",
    databaseURL: "https://trainschedule-4f72a.firebaseio.com",
    projectId: "trainschedule-4f72a",
    storageBucket: "",
    messagingSenderId: "606257671786"
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
  var currentTime ="";
  var convertedTime = "";
  //Empty values in the table
  var trainName = "";
  var trainDestination = "";
  var trainFrequency = "";
  var nextArrival = "";
  var minAway = "";

  //This function updates current time and displays it in jumbotron  

  function updateTime(){

    currentTime = moment();
    convertedTime = moment(currentTime).format("HH:mm");
    console.log("Current Time: " + convertedTime);
    $("#timeChicago").html( "Current time: "+ convertedTime );
  }

  updateTime();

  setInterval(function(){
    updateTime();
    },60000);


  //----------------------------------CLICK EVENT FOR ADDING NEW TRAINS-------------------------

  $("#add-user").on("click", function(event) {
    // Don't refresh the page
    event.preventDefault();

    // Storing and retrieving the most recent user.
      
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
   
    console.log(newTrain.name);
    console.log(newTrain.destination);

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

//--------------------------FIREBASE EVENT FOR ADDING EMPLOYEE------------------------------------
//---------------------------to database and a row in HTML---------------------------------------

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  //Stores everything into a variable

  trainName = childSnapshot.val().name;
  trainDestination = childSnapshot.val().destination;
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

  //Train Info for 5 different segments 
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



  //-------------------------UPDATE TIME-----------------------------------
    
  var randomFormat = "HH:mm";

  var convertedTime1 = moment(trainStart1, randomFormat);
  var convertedTime2 = moment(trainStart2, randomFormat);
  var convertedTime3 = moment(trainStart3, randomFormat);
  var convertedTime4 = moment(trainStart4, randomFormat);
  var convertedTime5 = moment(trainStart5, randomFormat);

  //minSince:  the the time since the first train Start time

  //This function updates nextArrival and minAway (see console) but doesn't write it to the table
  function updateminSince(){

    minSince1=moment(convertedTime1).diff(moment(), "minutes")
    minSince2=moment(convertedTime2).diff(moment(), "minutes")
    minSince3=moment(convertedTime3).diff(moment(), "minutes")
    minSince4=moment(convertedTime4).diff(moment(), "minutes")
    minSince5=moment(convertedTime5).diff(moment(), "minutes")

    if (minSince5<=0) {
      trainFrequency=trainFrequency5;
      minSince=-minSince5;
      console.log("Fifth train");
    }

    else if (minSince4<=0) {
      trainFrequency=trainFrequency4;
      minSince=-minSince4;
      console.log("Fourth train");
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
    console.log("Minutes since the start of the last segment = " + minSince);

  }

  updateminSince();

  setInterval(function(){
      updateminSince();
      },60000);


  //minAway: the time to the next train

  minAway = trainFrequency-minSince%trainFrequency;  
  var nextTrainMin = moment().add(minAway, "minutes");
  nextArrival = moment(nextTrainMin).format("HH:mm");

  console.log("Arrival Time: " + nextArrival);


  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
   trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

  /* Here I would load the new table every minute, but when I try to do that I get an error message


  setInterval(function(){
    $("#train-table > tbody" ).load("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>"  );
  }, 60000);

  */

});



