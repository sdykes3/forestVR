//This file includes the functions that use the variables declared in
//the variables file.


function setInitialText() {
    console.log(geolocationOptions);
    console.log(checkReceivedLocation);
    console.log("posdata = " + positionData);
}


//These are geolocation related functions.
function error(err) {
    //Send error details to the console.
    console.warn('ERROR(' + err.code + '): ' + err.message);
   //Displaying an error message.
    var messageElement= document.getElementById("choiceMsg");
    messageElement.innerHTML = "<p>You weren't able to get the geolocation.<br> Check the console for more detail.</p>";
}

//This function is the one that determines whether to change the scenery or not
//It gets the distance between our current location and our chosen location
function checkReceivedLocation(positionData) {

    console.log("Checking location...");

    currentLocation = positionData.coords;

    //calculating distance with the circleDistance script, for each scene
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
        inForest = true;
        inCreek = false;
        console.log("Calling forestScene() now.");
        forestScene();

    } else {
        console.log("Forest location hasn't been reached yet.");
        resultText0+=" Forest location hasn't been reached yet.";

        //If not already displaying default scene, load it - in the event of walking out of range of other scenes
        if(!inDefault && !inCreek) {
          inDefault = true;
          inForest = false;
          inCreek = false;
          defaultScene();
        }
    }

    if (newDistance1 <= maxDistance ) {
        //You have reached the location.
        resultText1+="\nCreek location was reached! Updating scene now.";
        console.log("Creek location  was reached. Updating scene now.");

        inDefault = false;
        inForest = false;
        inCreek = true;
        console.log("Calling creekScene() now.");
        creekScene();

    } else {
        console.log("Creek location hasn't been reached yet.");
        resultText1+=" Creek location hasn't been reached yet.";

        //If not already displaying default scene, load it - in the event of walking out of range of other scenes
        if(!inDefault && !inForest) {
          inDefault = true;
          inForest = false;
          inCreek = false;
          defaultScene();
        }
    }

    debugText.setAttribute('text', resultText0);
    debugText2.setAttribute('text', resultText1);

}
