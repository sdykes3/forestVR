//This file includes the functions that use the variables declared in
//the variables file.


function setInitialText()
{

    leftText.setAttribute('text', locationMessages[currentMessage] );
    //rightText.setAttribute('text', progressMessages[currentMessage] );

    console.log(locationMessages[currentMessage]);
    // console.log(progressMessages[currentMessage]);
    console.log(geolocationOptions);
    console.log(checkReceivedLocation);
    console.log("posdata = " + positionData);

}


// function updateScene()
// {
//     targetLocation++;
//     currentMessage++;

//     if(targetLocation>=locations.length) {
//       //We are finished.  We can stop fetching locations.
//       navigator.geolocation.clearWatch(geolocationCall);
//       isJourneyDone=true;

//       //Updating to the final messages.
//       leftText.setAttribute('text', locationMessages[currentMessage] );
//       rightText.setAttribute('text', progressMessages[currentMessage] );


//       // //Making a few more changes.
//       // boxAnimElement.emit("stop!");
//       // boxElement.setAttribute('color','purple');
//       // cylElement.setAttribute('opacity', '0.5');
//       // panoElement.setAttribute("src", "#century");
//       // panoElement.setAttribute('color','pink');
//     }

//     else {

//         //You have not reached the last area yet.

//         //Updating the messages.
//         leftText.setAttribute('text', locationMessages[currentMessage] );
//         rightText.setAttribute('text', progressMessages[currentMessage] );


//         //Making the animation changes.
//         if(targetLocation === 1) {
//           //now moving to target location 1.

//           //Scenery changes in location 2 (1, if starting from 0):
//             //The ball moves.
//             //The box fades.
//             //The texts are updated.(already did this above.)
//             //also, change the panorama.

//             // sphereAnimElement.emit("move!");
//             // boxAnimElement.emit("fade!");
//             // panoElement.setAttribute("src", "#forestPano");
//             // cylElement.setAttribute('color', 'pink');


//             leftText.setAttribute('text', "");
//             rightText.setAttribute('text', "LOCATION 1");
//             debugText.setAttribute('text', "");

//             //make treeStuff entity visible
//             panoElement.setAttribute("src", "#forestPano");
//             // document.getElementById("forestStuff").setAttribute("visible", "true");
//             // document.getElementById("creekStuff").setAttribute("visible", "false");
//             // document.getElementById("primitiveStuff").setAttribute("visible", "false");

//             audio = new Audio('https://sdykes3.github.io/forestVR/my-img/forestBest.wav');
//             audio.play();



//         }

//         if(targetLocation === 2) {
//           //now moving to target location 2.

//           //Scenery changes in location 3 (2, if starting from 0):
//             //Object animations change.
//             //The rotating green ball is visible and moving.
//             //The text color changes.
//             //also, change the panorama.

//             // sphereElement.setAttribute('color',"brown");
//             // sphereElement.setAttribute('radius',"0.75");
//             // spinBall.setAttribute('visible', 'true');
//             // spinBallAnim.emit("move!");
//             // boxElement.setAttribute('height','0.5');


//             // leftText.setAttribute('text', "");
//             rightText.setAttribute('text', "LOCATION 2");
//             // debugText.setAttribute('text', "");

//             //make treeStuff entity visible
//             panoElement.setAttribute("src", "#creekPano");
//             // document.getElementById("creekStuff").setAttribute("visible", "true");
//             // document.getElementById("forestStuff").setAttribute("visible", "false");
//             // document.getElementById("primitiveStuff").setAttribute("visible", "false");

//             audio = new Audio('https://sdykes3.github.io/forestVR/my-img/streamBest.wav');
//             audio.play();

//         }

//     }

// }


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

    console.log("Checking location...");

    currentLocation = positionData.coords;

    //calculating distance with the circleDistance script.
    var newDistance0=circleDistance(currentLocation.longitude,
                                   currentLocation.latitude,
                                   locations[0].longitude,
                                   locations[0].latitude);

    var newDistance1=circleDistance(currentLocation.longitude,
                                   currentLocation.latitude,
                                   locations[1].longitude,
                                   locations[1].latitude);


    var resultText0="Distance to Forest scene is "+ newDistance0.toFixed(4)+".";

    var resultText1="Distance to Creek scene is "+ newDistance1.toFixed(4)+".";

    console.log(resultText0);
    console.log(resultText1);

    if (newDistance0 <= maxDistance ) {
        //You have reached the location.
        resultText0+="\nForest location was reached! Updating scene now.";
        console.log("Forest location was reached. Updating scene now.");

        inDefault = false;
        forestScene();

    } else {
        console.log("Forest location hasn't been reached yet.");
        resultText0+=" Forest location hasn't been reached yet.";

        //If not already displaying default scene, load it - in the event of walking out of range of other scenes
        if(!inDefault) {
          inDefault = true;
          defaultScene();
        }
    }

    if (newDistance1 <= maxDistance ) {
        //You have reached the location.
        resultText1+="\nCreek location was reached! Updating scene now.";
        console.log("Creek location  was reached. Updating scene now.");

        inDefault = false;
        creekScene();

    } else {
        console.log("Creek location hasn't been reached yet.");
        resultText1+=" Creek location hasn't been reached yet.";

        //If not already displaying default scene, load it - in the event of walking out of range of other scenes
        if(!inDefault) {
          inDefault = true;
          defaultScene();
        }
    }

    debugText.setAttribute('text', resultText0);
    debugText2.setAttribute('text', resultText1);

}
