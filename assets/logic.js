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

$("#add-gif").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var gif = $("#gif-input").val().trim();
  gifSearch.push(gif);
  console.log(gifSearch);
  renderButtons();
  $("#gif-input").val("");
});

function displayGif() {
  $("#display-gif-0").empty();
  $("#display-gif-1").empty();
  $("#display-gif-2").empty();


  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("you have entered teh void");
    console.log(response);
    for (var i in response.data) {
      console.log("further the void: " + response.data[i].rating);
      var newDiv = $("<div>");
      var ratingData = $(`<p>Rating: ${response.data[i].rating}</p>`);
      var image = $(`<img src ="${response.data[i].images.fixed_height_small_still.url}"/>`);
      image.attr("data-value", i);
      image.attr("data-name", gif);
      image.attr("id", "gif_" + i);
      image.attr("class", "gif");
      newDiv.append(ratingData, image);
      $("#display-gif-"+column(i)).append(newDiv);
    }
  });

}

function animateGif() {
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=dc6zaTOxFJmzC&limit=10";
  var gifID = $(this).attr("data-value");
  var selectGif = $(this).attr("id");
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var $select //need to select the actual gif that is why its not working then we need to add columns and we gucci
    console.log(response);
    console.log("bambambam");
    console.log(`id: ${gifID} selectedgif ${selectGif} target: ${$(this)}`);
    console.log(this);
    $(`#${selectGif}`).attr("src", response.data[gifID].images.fixed_height_small.url);
  });
}
var col = 0;
function column(num){
  if(col>2){
    col = 0;
  }

  if((num+1)%3===0){
    col++
  }
  return col;
}

$(document).on("click", ".gif-button", displayGif);
$(document).on("click", ".gif", animateGif);