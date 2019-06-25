//Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCvOhlkfaB89T8oO2b8BVDPnW8VsXuTrN8",
  authDomain: "train-scheduler-2ce70.firebaseapp.com",
  databaseURL: "https://train-scheduler-2ce70.firebaseio.com",
  projectId: "train-scheduler-2ce70",
  storageBucket: "",
  messagingSenderId: "181245977711",
  appId: "1:181245977711:web:bb5ba920330f9194"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Variable to reference the database
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#name-input")
    .val()
    .trim();
  var trainDest = $("#dest-input")
    .val()
    .trim();
  var trainStart = $("#first-train-input")
    .val()
    .trim();

  var trainFreq = $("#freq-input")
    .val()
    .trim();

  //creates object from user input
  var newTrain = {
    name: trainName,
    dest: trainDest,
    start: trainStart,
    freq: trainFreq
  };

  //pushes user input object to firebase database
  database.ref().push(newTrain);

  //empties out input fields
  $("#name-input").val("");
  $("#dest-input").val("");
  $("#first-train-input").val("");
  $("#freq-input").val("");
});

//Triggers function for existing children of firebase database and each new child added
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  //Gets the pieces of data out of the snapshot object and sets them to variables
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().freq;

  console.log(trainStart);
  console.log(moment().format("HH:mm"));

  //Set variables for current time and working train time (initializing with first train time)
  var timeNow = moment().format("HH:mm");
  var trainTime = moment(trainStart, "HH:mm");

  //Checks if train time is in the future
  //If not, adds the train frequency in minutes to train time until it is
  while (moment(timeNow, "HH:mm").isAfter(trainTime)) {
    trainTime.add(trainFreq, "m");
  }

  //Sets new train time value in correct display format as a variable
  var nextTrain = trainTime.format("HH:mm");
  //Sets the difference in minutes between the current time and the next train time
  var minutesAway = trainTime.diff(moment(timeNow, "HH:mm"), "m");

  //Appends new table data entries containing train info to a new table row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAway)
  );

  // Appends the new row to the table
  $("#train-table > tbody").append(newRow);
});
