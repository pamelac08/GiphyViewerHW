

$(document).ready(function () {

    var topics = ["football", "soccer", "basketball", "volleyball", "running", "hockey"];

    addButtonstoPage();

    function addButtonstoPage() {
        for (let i = 0; i < topics.length; i++) {
            topicButton = $("<button>")
            topicButton.attr({
                "id": topics[i],
                "class": "buttons",
            });
            topicButton.text(topics[i]);
            $("#topic-buttons").append(topicButton);
        }
    };

    $("#select-topic").click(addTopicsButton);

    function addTopicsButton() {
        event.preventDefault();
        var inputTopic = $("#topic-input").val().trim();

        topics.push(inputTopic);
        console.log(topics);
        $("#topic-buttons").empty();
        addButtonstoPage();
    };



    $(document).on('click', '.buttons', displayGifs)
    

    function displayGifs() {

        $("#display-gifs").empty();

        selectedTopic = $(this).text();
        console.log("button value: " + selectedTopic);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedTopic +
            "&api_key=j08WvOTcX5eaD5thM3BKegRmbcTBCqL2&rating=G&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.attr("class", "gifDiv");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr({
                    "src": results[i].images.fixed_height_small_still.url,
                    "data-still": results[i].images.fixed_height_small_still.url,
                    "data-animate": results[i].images.fixed_height_small.url,
                    "class": "gifs",
                    "data-state": "still",
                });
                gifDiv.append(gifImage);
                gifDiv.append(p);
                $("#display-gifs").prepend(gifDiv);
            }
        });
    };

    //on click event for gifs to toggle between animate and still
    $(document).on('click', '.gifs', function () {

        var state = $(this).attr("data-state");
        console.log("state: " + state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


});


//returning a random gif only works for returning a single gif
//added title to each gif


    //     Bonus Goals
    // Ensure your app is fully mobile responsive.

    // Allow users to request additional gifs to be added to the page.
            // Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.
    
    
    // List additional metadata (title, tags, etc) for each gif in a clean and readable format.

    // Integrate this search with additional APIs such as OMDB, or Bands in Town. 
            //Be creative and build something you are proud to showcase in your portfolio

    // Allow users to add their favorite gifs to a favorites section.
            // This should persist even when they select or add a new topic.
            // If you are looking for a major challenge, look into making this section persist 
                //even when the page is reloaded(via localStorage or cookies).