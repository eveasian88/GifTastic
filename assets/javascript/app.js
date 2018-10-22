// top movies and tv shows theme and make an array
var topics = ["Harry Potter", "The Lord of the Rings", "Star Wars", "Pirates of the Caribbean", "Toy Story", "Mission Impossible", "James Bond", "Breaking Bad", "Games of Thrones", "House of Cards", "Orange is the New Black", "Lost", "The Office"];

var button;
var newTopic = ""; // new topic that will be added via input field 

// function to create new buttons from array
var buttonGenerator = function () {
    // the previous div elements are emptied 
    $("#button-area").empty();
    // loops through the array and creates buttons
    for (i = 0; i < topics.length; i++) {
        button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data", topics[i]);
        $("#button-area").append(button);
    };
}

// user clicks on a generated button, which generates 10 static, non-animated gif images from the GIPHY API
$("#button-area").on("click", ".btn", function () {
    var thing = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=fgPnlcaP119kWicPGGCVVNd2liHNjqWl";  // use my API key for GIPHY here
   

    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function (response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            // a div is created to hold a gif of any topic
            var topicDiv = $("<div>");

            // under every gif, display its rating
            var p = $("<p>");
            p.text(results[i].rating);
            var p = $("<p>").text("Rating: " + results[i].rating);

            // add a CSS style to create colored borders around the gifs
            var topicImage = $("<img>").addClass("orangeBorder");

            // add states of animate and still which will be toggled 
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url)
            topicImage.attr("data-state", "still")
            topicImage.addClass("gif");

            // image is appended to the div
            topicDiv.append(topicImage);
            // rating is appended to the div below the gif
            topicDiv.append(p);
            // new images will be placed at the beginning (top) of the containing gif area
            $("#gif-area").prepend(topicDiv);
        }
    })
})

// when user clicks one of the still GIPHY images it animates. when user clicks gif again, it stops moving
$("#gif-area").on("click", ".gif", function (event) {
    event.preventDefault();

    // gets the current state of the clicked gif 
    var state = $(this).attr("data-state");

    // according to the current state gifs toggle between animate and still 
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

})


// form takes the value from input box and adds it into the topics array
// buttonGenerator function is called that takes each topic in the array and remakes buttons on page
$(".submit").on("click", function (event) {
    event.preventDefault();

    console.log("submit");
    // sets inputted value to newTopic 
    newTopic = $("#topic-input").val();
    // new topic is added to the topics array 
    topics.push(newTopic);
    console.log(topics);
    // call the function that creates the new button
    buttonGenerator();
});


buttonGenerator();