//This file includes the functions that use the variables declared in the start file, as well as controlling scene changing


// Shows / hides scene specific information, when clicking trees
function showTextForest1() {
  if(document.getElementById("treeText1").getAttribute("visible") === false) {
    document.getElementById("treeText1").setAttribute("visible", "true");
  } else if(document.getElementById("treeText1").getAttribute("visible") === true) {
    document.getElementById("treeText1").setAttribute("visible", "false");
  }
}
function showTextForest2() {
  if(document.getElementById("treeText2").getAttribute("visible") === false) {
    document.getElementById("treeText2").setAttribute("visible", "true");
  } else if(document.getElementById("treeText2").getAttribute("visible") === true) {
    document.getElementById("treeText2").setAttribute("visible", "false");
  }
}
function showTextForest3() {
  if(document.getElementById("treeText3").getAttribute("visible") === false) {
    document.getElementById("treeText3").setAttribute("visible", "true");
  } else if(document.getElementById("treeText3").getAttribute("visible") === true) {
    document.getElementById("treeText3").setAttribute("visible", "false");
  }
}
function showTextForest4() {
  if(document.getElementById("treeText4").getAttribute("visible") === false) {
    document.getElementById("treeText4").setAttribute("visible", "true");
  } else if(document.getElementById("treeText4").getAttribute("visible") === true) {
    document.getElementById("treeText4").setAttribute("visible", "false");
  }
}

// Shows / hides scene specific information, when clicking trees
function showTextCreek1() {
  if(document.getElementById("creekText1").getAttribute("visible") === false) {
    document.getElementById("creekText1").setAttribute("visible", "true");
  } else if(document.getElementById("creekText1").getAttribute("visible") === true) {
    document.getElementById("creekText1").setAttribute("visible", "false");
  }
}
function showTextCreek2() {
  if(document.getElementById("creekText2").getAttribute("visible") === false) {
    document.getElementById("creekText2").setAttribute("visible", "true");
  } else if(document.getElementById("creekText2").getAttribute("visible") === true) {
    document.getElementById("creekText2").setAttribute("visible", "false");
  }
}
function showTextCreek3() {
  if(document.getElementById("creekText3").getAttribute("visible") === false) {
    document.getElementById("creekText3").setAttribute("visible", "true");
  } else if(document.getElementById("creekText3").getAttribute("visible") === true) {
    document.getElementById("creekText3").setAttribute("visible", "false");
  }
}
function showTextCreek4() {
  if(document.getElementById("creekText4").getAttribute("visible") === false) {
    document.getElementById("creekText4").setAttribute("visible", "true");
  } else if(document.getElementById("creekText4").getAttribute("visible") === true) {
    document.getElementById("creekText4").setAttribute("visible", "false");
  }
}

// Loads Forest Scene
function forestScene() {
    console.log("This is forestScene()");

    //turn off default scene info
    document.getElementById("defText1").setAttribute("visible", "false");
    document.getElementById("defText2").setAttribute("visible", "false");
    document.getElementById("defText3").setAttribute("visible", "false");
    document.getElementById("defText4").setAttribute("visible", "false");

    document.getElementById("debugText").setAttribute("visible", "false");
    document.getElementById("debugText2").setAttribute("visible", "false");
    document.getElementById("instrText").setAttribute("visible", "false");
    document.getElementById("instrText2").setAttribute("visible", "false");

    //make forestStuff entity visible
    panoElement.setAttribute("src", "#forestPano");
    document.getElementById("forestStuff").setAttribute("visible", "true");
    document.getElementById("creekStuff").setAttribute("visible", "false");
    document.getElementById("primitiveStuff").setAttribute("visible", "false");

    // audio = new Audio('https://sdykes3.github.io/forestVR/my-img/forestBest.wav');
    audioForest.play();
    audioCreek.pause();

}

// Loads Creek Scene
function creekScene() {
    console.log("This is creekScene()");

    //turn off default scene info
    document.getElementById("defText1").setAttribute("visible", "false");
    document.getElementById("defText2").setAttribute("visible", "false");
    document.getElementById("defText3").setAttribute("visible", "false");
    document.getElementById("defText4").setAttribute("visible", "false");

    document.getElementById("debugText").setAttribute("visible", "false");
    document.getElementById("debugText2").setAttribute("visible", "false");
    document.getElementById("instrText").setAttribute("visible", "false");
    document.getElementById("instrText2").setAttribute("visible", "false");

    //make creekStuff entity visible
    panoElement.setAttribute("src", "#creekPano");
    document.getElementById("creekStuff").setAttribute("visible", "true");
    document.getElementById("forestStuff").setAttribute("visible", "false");
    document.getElementById("primitiveStuff").setAttribute("visible", "false");

    // audio = new Audio('https://sdykes3.github.io/forestVR/my-img/streamBest.wav');
    audioForest.pause();
    audioCreek.play();

}

// Loads Default Scene
function defaultScene() {
    //turn on default scene info
    document.getElementById("defText1").setAttribute("visible", "true");
    document.getElementById("defText2").setAttribute("visible", "true");
    document.getElementById("defText3").setAttribute("visible", "true");
    document.getElementById("defText4").setAttribute("visible", "true");

    document.getElementById("debugText").setAttribute("visible", "true");
    document.getElementById("debugText2").setAttribute("visible", "true");
    document.getElementById("instrText").setAttribute("visible", "true");
    document.getElementById("instrText2").setAttribute("visible", "true");

    panoElement.setAttribute("src", "#woc");
    document.getElementById("primitiveStuff").setAttribute("visible", "true");
    document.getElementById("forestStuff").setAttribute("visible", "false");
    document.getElementById("creekStuff").setAttribute("visible", "false");

    audioForest.pause();
    audioCreek.pause();

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


    var resultText0="Distance to Forest scene is "+ (newDistance0*1000).toFixed(4) +"m.";

    var resultText1="Distance to Creek scene is "+ (newDistance1*1000).toFixed(4) +"m.";

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
        resultText0+=" Location hasn't been reached yet.";

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
        resultText1+=" Location hasn't been reached yet.";

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
