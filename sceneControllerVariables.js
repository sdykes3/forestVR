
//Variables that store properties for each of the three stages.

//Variables that access the scene objects.
//These will be declared later in the program

//var leftText;  //status text.
// var rightText; //progress text.
var debugText;
var debugText2;

var panoElement;
var audioForest = new Audio('https://sdykes3.github.io/forestVR/my-img/forestBest.wav');
var audioCreek = new Audio('https://sdykes3.github.io/forestVR/my-img/streamBest.wav');

var inDefault = true; //keeps track of which scene has been loaded
var inForest = false; //keeps track of which scene has been loaded
var inCreek = false; //keeps track of which scene has been loaded

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

var maxDistance=0.055; // in km
var locations= [
                  //GT Campanile
                  {
                    name: "Campanile",
                    latitude : 33.774238,
                    longitude: -84.398073
                  },

                  //Skiles
                  {
                    name: "Skiles Building",
                    latitude : 33.773576,
                    longitude: -84.395639
                  },

                  //My house, for testing
                  {
                    name: "Psi U",
                    latitude : 33.7774918,
                    longitude: -84.39175829
                  },

                  //South-eastern Piedmont Park, location of historic but currently non-existant stream
                  {
                    name: "Piedmont Park",
                    latitude : 33.781832,
                    longitude: -84.372836
                  },

                  //Penn and Ponce, location of historic but currently non-existant stream
                  {
                    name: "Penn and Ponce",
                    latitude : 33.772584,
                    longitude: -84.379021
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


//Geolocation related variables.
var geolocationCall;
var geolocationOptions = {

    enableHighAccuracy: true,
    //timeout: 5000,
    maximumAge: 0

};
