/*
    Steven Tran
    Assignment 6, 2018
    UofT SCS Coding Bootcamp
*/
//Global Variables
var APIKEY = "&api_key=V6MIkHhjl9BLPayiWYXlTRldvlrW2fpn"; //My own APIKey 
var topics = ["Final Fantasy", "Tera Online", "Mario Kart", "Metal Gear Solid", "Pokemon", "Fate Grand Order", "Overwatch", "Command and Conquer"]; //Array of strings, each element related to the topic: Games

//Functions
function displayGIF() {
    //variables to build and hold queryURL
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + APIKEY + "&limit=10";
    
    //DEBUG CODE
    console.log(topic);
    
    //Create AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //DEBUG CODE
        console.log(response);

        var results = response.data;
        $("#display-view").empty();

        for (var i=0; i<results.length; i++){
            //Setting variables for ease of use
            var gifSource = results[i].images.fixed_height.url;
            var gifStill = results[i].images.fixed_height_still.url;
            var rating = results[i].rating;

            var gifDiv = $("<div class='gif-container col-sm-4'>");
            var p = $("<p>").text("Rating: " + rating);
            var gameImage =$("<img>");
            gameImage.attr({
                src: gifStill,
                alt: "gif-Image",
                "data-still": gifStill,
                "data-animate": gifSource,
                "data-state": "still",
                class: "gif",
            });

            gifDiv.append(gameImage);
            gifDiv.append(p);
            $("#display-view").append(gifDiv);

            //DEBUG CODE
            /*console.log(gifSource);
            console.log(gifStill);
            console.log(rating);
            console.log("-----------------");*/
        }
    });
}

function renderButtons (){
    //TODO render buttons from topic array
    //deletes buttons prior to generating new ones to prevent repeats
    $("#buttons-view").empty();

    for (var i=0; i< topics.length; i++){
        var newButton = $("<button>");
        newButton.attr({
            class: "topic-buttons btn btn-light btn-sm mr-1 mb-1",
            "data-name": topics[i],
        });
        newButton.text(topics[i]);
        $("#buttons-view").append(newButton);
    }
}

//MAIN
$(document).ready(function() {
    //DEBUG REMOVE WHEN DONE
    //displayGIF();

    //Click event for submit button to add to topic array
    $("#add-game").on("click", function(event) {
        event.preventDefault();
        var topic = $("#game-input").val().trim();
        topics.push(topic);
        renderButtons();
    });

    //Click event for topics buttons
    $("#buttons-view").on("click", ".topic-buttons", displayGIF);

    //Click event for pausing and running gifs
    $("#display-view").on("click",".gif", function(){
        var state = $(this).attr("data-state");
        if (state == "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        }
        else if(state == "animate"){
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    });

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});