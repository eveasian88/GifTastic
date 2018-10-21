// topic theme and make an array
var topics = ["Lord of the Rings", "Star Wars", "The Matrix", "The Dark Night", "Mission Impossible", "The Girl With the Dragon Tatoo", "Jason Bourne", "Indiana Jones", "Toy Story", "Back To the Future", "X-Men", "Mad Max"];

var button;
var newTopic = ""; // new topic that will be added via the input field 

// function to create new buttons from array
var buttonGenerator = function () {
    // the previous div elements are emptied 
    $("#buttonArea").empty();
    // loops through the array and creates buttons
    for (i = 0; i < topics.length; i++) {
        button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data", topics[i]);
        $("#buttonArea").append(button);
    };
}


// user clicks on a generated button, which generates 10 static, non-animated gif images from the GIPHY API
$("#buttonArea").on("click", ".btn", function () {
    var thing = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=fgPnlcaP119kWicPGGCVVNd2liHNjqWl";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function (response) {
        console.log(response);
    }

// console.log(response) to check


// under every gif, display it's rating

// add states of animate and still 

// image is appended to the div

// rating is appended to the div

// new images will be placed at the top of page

// form takes the value from the input box and adds it into the topics  array

// buttonGenerator function is called that takes each topic in the array remakes the buttons on the page



