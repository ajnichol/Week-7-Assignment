
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDeRG3sRA9OH5ohGpUPjboQRq7HNuD08Bk",
    authDomain: "traintime-da2aa.firebaseapp.com",
    databaseURL: "https://traintime-da2aa.firebaseio.com",
    storageBucket: "traintime-da2aa.appspot.com",
    messagingSenderId: "206126849131"
  };
  firebase.initializeApp(config);

  var datum = firebase.database();

  $("#trainSearch").on("click", function(){

  	var eachTrain = $("#trainName").val().trim();
  	var location = $("#destination").val().trim();
  	var firstTrainTime = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  	var eachFrequency = $("#trainFrequency").val().trim();

  	var trainObject = {

  		name: eachTrain,
  		destination: location,
  		time: firstTrainTime,
  		frequency: eachFrequency
  	}

  	datum.ref().push(trainObject);

  	console.log(trainObject.name);
  	console.log(trainObject.destination);
  	console.log(trainObject.time);
  	console.log(trainObject.frequency);

  	$("#trainName").val("");
  	$("#destination").val("");
  	$("#timeInput").val("");
  	$("#trainFrequency").val("");

  	return false;
  })