// topic theme and make an array
var topics = ["Lord of the Rings", "Star Wars", "Mission Impossible", "The Dark Night", "The Matrix", "Jason Bourne", "Games of Thrones", "Indiana Jones", "Mad Max", "Lost"];

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
            $("#gifArea").prepend(topicDiv);
        }
    })
})

// when user clicks one of the still GIPHY images it animates. when user clicks gif again, it stops moving
$("#gifArea").on("click", ".gif", function (event) {
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


// form takes the value from the input box and adds it into the topics array. buttonGenerator function is called that takes each topic in the array remakes the buttons on the page

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



