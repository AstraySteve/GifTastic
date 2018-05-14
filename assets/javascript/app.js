/*
    Steven Tran
    Assignment 6, 2018
    UofT SCS Coding Bootcamp
*/
//Global Variables
var APIKEY = "&api_key=V6MIkHhjl9BLPayiWYXlTRldvlrW2fpn"; //My own APIKey 
var topics = ["test1", "test2", "tessa"]; //Array of strings, each element related to the topic: 
//Functions
const displayGIF = () => {
    //variables to build and hold queryURL
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + APIKEY + "&limit=10";
    
    //DEBUG CODE
    console.log(queryURL);
    
    //Create AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //DEBUG CODE
        console.log(response);

        //TODO: grab images and displays them accordingly
    });
}

const renderButtons = () => {
    //TODO render buttons from topic array
    //deletes buttons prior to generating new ones to prevent repeats
    $("#butons-view").empty();

    for (var i=0; i< topics.length; i++){
        var newButton = $("<button>");
        newButton.attr({
            class: "",
            "data-name": topics[i],
        });
        newButton.text(topics[i]);
        $("#buttons-view").append(newButton);
    }
}

//MAIN
$(document).ready(function() {
    displayGIF();  //DEBUG REMOVE WHEN DONE

    //TODO Button Click event for submit button

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});