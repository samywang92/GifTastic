var gifSearch = [];

function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $(".button-container").empty();
    // Loops through the array of movies
    for (var i = 0; i < gifSearch.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("gif-button btn btn-primary");
      // Added a data-attribute
      a.attr("data-name", gifSearch[i]);
      // Provided the initial button text
      a.text(gifSearch[i]);
      // Added the button to the buttons-view div
      $(".button-container").append(a);
    }
  }

  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    gifSearch.push(gif);
    console.log(gifSearch);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  function displayMovieInfo() {
    $("#display-gif").empty();
    

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("you have entered teh void");
        console.log(response);
        for(var i in response.data){
          console.log("further the void: "+response.data[i].rating);
          var newDiv = $("<div>");
          var ratingData = $(`<p>Rating: ${response.data[i].rating}</p>`);
          var image = $(`<img src ="${response.data[i].images.original_still.url}"/>`);
          image.attr("data-value",i);
          image.attr("id","gif_"+i);
          image.attr("class","gif");
          newDiv.append(ratingData, image);
          $("#display-gif").prepend(newDiv);
        }
    });

  }

  function animateGif(){
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var gifID = $(this).attr("data-value");
        var selectGif = $(this).attr("id")
        console.log(response);
        console.log("bambambam");
    });
  }

  $(document).on("click", ".gif-button", displayMovieInfo);
  $(document).on("click", ".gif", animateGif);