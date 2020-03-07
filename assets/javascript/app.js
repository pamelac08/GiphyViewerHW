
$(document).ready(function () {

    var topics = ["football", "soccer", "basketball", "volleyball", "running", "hockey", "tennis", "crossfit"];
    var offset = 0;

    //initial buttons added to the  page
    addButtonstoPage();

    function addButtonstoPage() {
        for (let i = 0; i < topics.length; i++) {
            topicButton = $("<button>")
            topicButton.attr({
                "id": topics[i],
                "class": "buttons",
                "data-shouldempty": "true"
            });
            topicButton.text(topics[i]);
            closeButton = $("<button>");
            closeButton.attr("id", topics[i]);
            closeButton.attr("class", "close-button");
            closeButton.html("<i class='fas fa-times'></i>");
            topicButton.append(closeButton);
            $("#topic-buttons").append(topicButton);
        }
    };

    //taking input from user and adding a new button to the topics array and re-rendering array to page
    $("#select-topic").click(addTopicsButton);

    function addTopicsButton(event) {

        event.preventDefault();

        topicInput = $("#topic-input").val();

        //this will only run when the user has typed something in the input box, will not do anything if it's empty
        if (topicInput) {
            var inputTopic = $("#topic-input").val().trim();
            topics.push(inputTopic);
            $("#topic-buttons").empty();
            addButtonstoPage();

         //added to clear textbox when submit button is pressed
         $("#topic-input").val("");
        }
    };

    //on clicks for displaying gifs when either the topics buttons or the 'add additional' button is pressed
    $(document).on('click', '.buttons', displayGifs)
    $("#additional-gifs").click(displayGifs);
    

    function displayGifs() {

        var shouldEmpty = $(this).attr("data-shouldempty");
        var increaseOffset = $(this).attr("data-increaseoffset");
       
        //only if topic button is pressed, will it clear any existing gifs, pull the new value of the selected button, and display the gifs for that button
         if (shouldEmpty=="true") {
            $("#display-gifs").empty();
            selectedTopic = $(this).text();
        }
        //if there is already gifs displayed, then it will take the previous value of "selectedTopic" plus pull an additional 10 gifs of the same topic
        if (increaseOffset=="true") {
           offset = offset + 10;
        }
        
        else {
           offset =  0;
        }

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedTopic +
            "&api_key=j08WvOTcX5eaD5thM3BKegRmbcTBCqL2&rating=G&limit=10&offset=" + offset;

        console.log(queryURL); 

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='card card-body col-3 text-center'>");
                var pRating = $("<p>").text("Rating: " + results[i].rating);
                var pTitle = $("<p>").text("Title: " + results[i].title);
                var gifImage = $("<img>");
                gifImage.attr({
                    "src": results[i].images.fixed_height_small_still.url,
                    "data-still": results[i].images.fixed_height_small_still.url,
                    "data-animate": results[i].images.fixed_height_small.url,
                    "class": "gifs",
                    "data-state": "still",
                });
                gifDiv.append(gifImage);
                gifDiv.append(pTitle);
                gifDiv.append(pRating);
                $("#display-gifs").prepend(gifDiv);
            }
        });

    };

    //on click event for gifs to toggle between animate and still
    $(document).on('click', '.gifs', function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    // When a user clicks the x button, then delete the button
        //definitely does not look the best, but couldn't figure out a better way to display an "x" - was wanting it to look like a little bubble you usually see at the  corner of pop-ups/alerts to close them
        //and would have liked it to only show when you hover over the button, but didn't have time to figure that out
    $(document).on("click", ".close-button", deleteButton);

    function deleteButton(event) {
        
        //to prevent the button from also running the 'displayGifs' function also
        event.stopPropagation();

        //clear out any gifs that are being display, mostly for aesthetics
        $("#display-gifs").empty();

        //taking the index of the button being deleted and using splice to remove from topics array
        var toClose = topics.indexOf(($(this).attr("id")));
        topics.splice(toClose, 1);

        //re-rendering button left in topics array to the page
        $("#topic-buttons").empty();
        addButtonstoPage();
    }

});

