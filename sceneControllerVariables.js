
//Variables that store properties for each of the three stages.

//Variables that access the scene objects.
//These will be declared later in the program

var leftText;  //status text.
// var rightText; //progress text.
var debugText;
var debugText2;

var panoElement;
var audioForest = new Audio('https://sdykes3.github.io/forestVR/my-img/forestBest.wav');
var audioCreek = new Audio('https://sdykes3.github.io/forestVR/my-img/streamBest.wav');

var inDefault = true; //keeps track of which scene has been loaded

//looping for audio, in different browsers
if (typeof audioCreek.loop == 'boolean')
{
    audioCreek.loop = true;
}
else
{
    audioCreek.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
if (typeof audioForest.loop == 'boolean')
{
    audioForest.loop = true;
}
else
{
    audioForest.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}


var forestStuff;
var creekStuff;
var primitiveStuff;

//Progress variables.
var targetLocation=0;
var currentMessage=0;
var isJourneyDone=false;

//Data we need to tell we're making progress.
var maxDistance=0.055; //in km.
var locations= [
                  //Location 1: Clough Commons.
                  {
                    name: "Clough Commons",
                    latitude : 33.774890,
                    longitude: -84.396097
                  }  ,

                  //Location 2: Skiles.
                  {
                    name: "Skiles Building",
                    latitude : 33.773576,
                    longitude: -84.395639
                  },

                  //Location 3: The Student Center.
                  {
                    name: "The Student Center",
                    latitude : 33.773928,
                    longitude: -84.398388
                  }
              ];

//Status messages to be shown to the player.
var locationMessages=
[
  "You are somewhere in Georgia Tech.",
  "You arrive in the Clough Commons.",
  "You have found the Skiles Building.",
  "You have found the Student Center."
];

var progressMessages=
[
  "You have to go to the following 3 locations:\nFirst to the Clough Commons,\nthen to the Skiles Building,\nfinally to the Student Center.",
  "You've arrived to the first location.  Now, go find the Skiles Building.",
  "You've found the second location.  Go to your final stop: the Student Center",
  "You completed the challenge. Your reward is an aframe animation!"
];


//Geolocation related variables.
var geolocationCall;
var geolocationOptions = {

    enableHighAccuracy: true,
    //timeout: 5000,
    maximumAge: 0

};
