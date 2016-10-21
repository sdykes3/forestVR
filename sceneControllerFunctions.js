//This file includes the functions that use the variables declared in
//the variables file.

function setInitialText()
{

    leftText.setAttribute('text', locationMessages[currentMessage] );
    rightText.setAttribute('text', progressMessages[currentMessage] );

        console.log(locationMessages[currentMessage]);
    console.log(progressMessages[currentMessage]);
    console.log(geolocationOptions);
    console.log(checkReceivedLocation);
    console.log("posdata = " + positionData);

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
            panoElement.setAttribute("src", "#forestPano");
            cylElement.setAttribute('color', 'pink');

            rightText.setAttribute('text', "LOCATION 1");

            //make treeStuff entity visible

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
            panoElement.setAttribute("src", "#creekPano");
            boxElement.setAttribute('height','0.5');

            rightText.setAttribute('text', "LOCATION 2");

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
