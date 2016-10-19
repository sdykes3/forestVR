
//Variables that store properties for each of the three stages.

//Variables that access the scene objects.
//These will be declared later in the program
var sphereElement;
var sphereAnimElement;

var boxElement;
var boxAnimElement;

var cylElement;

var spinBallElement;
var spinBallAnimElement;

var leftText;  //status text.
var rightText; //progress text.
var debugText;

var panoElement;


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

















//This file includes the functions that use the variables declared in
//the variables file.

function setInitialText()
{

    leftText.setAttribute('text', locationMessages[currentMessage] );
    rightText.setAttribute('text', progressMessages[currentMessage] );

}

//When updating the scene elements, here are the changes I was considering:

//Scenery before location 1:
  //No visible object is animating.
  //The moving green ball is invisible.
  //The left text shows info about the current location 1.
  //The progress text shows the movement required.

//Scenery once in location 1, before location 2:
  //The ball moves.
  //The cube fades.
  //The texts are updated.
  //also, change the panorama.

//Scenery changes once in location 2, before location 3:
  //Object animations change.
  //The rotating green ball is visible and moving.
  //The text is tinted.
  //also, change the panorama.

//And with this, you're done.


function updateScene()
{

    targetLocation++;
    currentMessage++;

    if(targetLocation>=locations.length)
    {
      //We are finished.  We can stop fetching locations.
      navigator.geolocation.clearWatch(geolocationCall);
      isJourneyDone=true;

      //Updating to the final messages.
      leftText.setAttribute('text', locationMessages[currentMessage] );
      rightText.setAttribute('text', progressMessages[currentMessage] );


      //Making a few more changes.
      boxAnimElement.emit("stop!");
      boxElement.setAttribute('color','purple');
      cylElement.setAttribute('opacity', '0.5');
      panoElement.setAttribute("src", "#century");
      panoElement.setAttribute('color','pink');
    }

    else{

        //You have not reached the last area yet.

        //Updating the messages.
        leftText.setAttribute('text', locationMessages[currentMessage] );
        rightText.setAttribute('text', progressMessages[currentMessage] );


        //Making the animation changes.
        if(targetLocation === 1)
        {
          //now moving to target location 1.

          //Scenery changes in location 2 (1, if starting from 0):
            //The ball moves.
            //The box fades.
            //The texts are updated.(already did this above.)
            //also, change the panorama.

            sphereAnimElement.emit("move!");
            boxAnimElement.emit("fade!");
            panoElement.setAttribute("src", "#museum");
            cylElement.setAttribute('color', 'pink');

        }

        if(targetLocation === 2)
        {
          //now moving to target location 2.

          //Scenery changes in location 3 (2, if starting from 0):
            //Object animations change.
            //The rotating green ball is visible and moving.
            //The text color changes.
            //also, change the panorama.

            sphereElement.setAttribute('color',"brown");
            sphereElement.setAttribute('radius',"0.75");
            spinBall.setAttribute('visible', 'true');
            spinBallAnim.emit("move!");
            panoElement.setAttribute("src", "#aquarium");
            boxElement.setAttribute('height','0.5');

        }

    }

}


//These are geolocation related functions.
function error(err) {
    //Send error details to the console.
    console.warn('ERROR(' + err.code + '): ' + err.message);
   //Displaying an error message.
    var messageElement= document.getElementById("choiceMsg");
    messageElement.innerHTML = "<p>You weren't able to get the geolocation.<br> Check the console for more detail.</p>";

}

//This function is the one that determines whether to change the scenery or not.
//It gets the distance between our current location and our chosen location.
function checkReceivedLocation(positionData)
{

    console.log("checking location.");

    currentLocation = positionData.coords;

    //calculating distance with the circleDistance script.
    var newDistance=circleDistance(currentLocation.longitude,
                                   currentLocation.latitude,
                                   locations[targetLocation].longitude,
                                   locations[targetLocation].latitude);


    var resultText="newDistance is "+ newDistance.toFixed(4)+".";

    console.log(resultText);

    if (newDistance <= maxDistance )
      {
          //You have reached the location.
          updateScene();
          resultText+="\nLocation number "+(targetLocation+1)+" was reached! Updating scene now.";
          console.log("Location number "+(targetLocation+1)+" was reached. Updating scene now.");

      }

      else
        {
          console.log("Location number "+(targetLocation+1)+" hasn't been reached yet.");
          resultText+="Location number "+(targetLocation+1)+" hasn't been reached yet.";
        }

        debugText.setAttribute('text', resultText);

}

