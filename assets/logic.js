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
      a.addClass("gif-button");
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
    //$("#movies-view").empty();

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
    //   var newDiv = $("<div>");
    //   var title = $(`<h1>${response.Title}</h1>`);
    //   var ratingData = $(`<p>${response.Ratings[1].Source}: ${response.Ratings[1].Value}</p>`);
    //   var releaseYear = $(`<p>Year Released: ${response.Year}</p>`);
    //   var plot = $(`<p>Plot: ${response.Plot}</p>`);
    //   var image = $(`<img src ="${response.Poster}"/>`);
    //   newDiv.append(title, ratingData, releaseYear, plot, image);
    //   $("#movies-view").prepend(newDiv);
    });

  }

  $(document).on("click", ".gif-button", displayMovieInfo);