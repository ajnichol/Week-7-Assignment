
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDeRG3sRA9OH5ohGpUPjboQRq7HNuD08Bk",
    authDomain: "traintime-da2aa.firebaseapp.com",
    databaseURL: "https://traintime-da2aa.firebaseio.com",
    storageBucket: "traintime-da2aa.appspot.com",
    messagingSenderId: "206126849131"
  };
  firebase.initializeApp(config);
  //creating a variable and storing our database in it
  var datum = firebase.database();
  //creating an on click event that grabs user inputs and stores them in our database
  $("#trainSearch").on("click", function() {
    //grabbing user inputs
  	var eachTrain = $("#trainName").val().trim();
  	var location = $("#destination").val().trim();
    //formatting and subtracting 10 years from our users input time
  	var firstTrainTime = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  	var eachFrequency = $("#trainFrequency").val().trim();
    //storing our user inputs in a train object
  	var trainObject = {

  		name: eachTrain,
  		destination: location,
  		time: firstTrainTime,
  		frequency: eachFrequency
  	};
    //pushing our train object and user inputs into our database
  	datum.ref().push(trainObject);
    //emptying out our input fields
  	$("#trainName").val("");
  	$("#destination").val("");
  	$("#timeInput").val("");
  	$("#trainFrequency").val("");
    //preventing the default submit action
  	event.preventDefault();
    //preventing bubbling up the DOM tree to our parent div
    event.stopPropagation();

  });
  //when a new child is added to our database append the data into our table
  datum.ref().on("child_added", function(newChild, lastChild) {
    //making sure we're receiving the proper data
  	console.log(newChild.val());
    //grabbing the user's input from our database
  	var checkName = newChild.val().name;
  	var checkDestination = newChild.val().destination;
  	var checkTime = newChild.val().time;
  	var checkFrequency = newChild.val().frequency;
    //calculating the the difference between current time and the time the user requested
  	var timeDifference = moment().diff(moment.unix(checkTime), "minutes");
    //calculating a remainder between the difference in current time from user input and dividing the frequency the user requested and looking for a remainder
  	var timeRemainder = timeDifference % checkFrequency;
    //calculating how far away the next train is by taking the difference between frequency and time remaining
  	var minutesAway = checkFrequency - timeRemainder;
    //adding current time to how many minutes away the next train is
  	var nextArrival = moment().add(minutesAway, "m").format("hh:mm A");
    // appending all the data to the table
  	$("#trainSchedule > tbody").append("<tr><td>" + checkName + "</td><td>" + checkDestination + "</td><td>" + checkFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway "</td><tr>");

  });