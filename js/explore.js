/*jslint devel: true */

/****************************** Setup ******************************/

//calls function upon page load
$(document).ready(function(){
  determineYear();
  fill_section('music');
  fill_section('shows');
  fill_section('movies');
});

/****************************** Helper Functions ******************************/

//Fisher-Yates shuffle to shuffle an array
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle_array(array, string) {
  "use strict";
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  //store the shuffled array into localStorage
  localStorage.setItem(string, JSON.stringify(array));
}

//helper function for refresh button
function set_prev() {
  localStorage.setItem("previous_page", "explore");
}

//temporary function for default year values
function determineYear() {
  var temp = localStorage.selected_year;
  var year = parseInt(temp);
  if (year > 1969){
    localStorage.setItem('explore_year', 1970);
  }
  else if (year > 1959) {
    localStorage.setItem('explore_year', 1960);
  }
  else {
    localStorage.setItem('explore_year', 1950);
  } 
  console.log('year being used: ' + localStorage.explore_year);
}

/****************************** Fills Content Sections ******************************/

//fills in the section of the explore page corresponding to the string parameter
function fill_section(string) {
  "use strict";
  //setup variables
  var arrayName = string + 'Array';
  var currArray = localStorage.getItem(arrayName);

  //if coming from home page or 
  //if if the data for the string parameter is not in localStorage,
  if(localStorage.getItem('previous_page') == 'home' || 
     currArray == null || currArray == 'undefined'){
    //gets json object from js file and stores it in localStorage
    var fileArray = string + localStorage.explore_year;
    console.log('adding ' + fileArray + ' to localStorage...');
    localStorage.setItem(arrayName, JSON.stringify(window[fileArray]));
  }

  //uses data from localStorage instead of the js data file
  currArray = JSON.parse(window.localStorage.getItem(arrayName));

  //if function was called from home page GO button or explore page refresh button
  if(localStorage.getItem("previous_page") != "closeup"){
    //shuffles the array and stores it in localStorage
    shuffle_array(currArray, arrayName);
  }

  //fills the section of explore page specified by string parameter
  document.getElementById(string + "_thumbnail1").src = currArray[0].picture;
  document.getElementById(string + "_thumbnail2").src = currArray[1].picture;
  document.getElementById(string + "_thumbnail3").src = currArray[2].picture;
  document.getElementById(string + "_thumbnail4").src = currArray[3].picture;
}

/****************************** Content On-Click ******************************/

//functionality for when a thumbnail in a section is clicked
function newPage(cat, img) {
  for( var i = 0; i < cat.length; i++ ) {
    if( cat[i][picture] == img ) {
      var temp = object[0];
      break;
    }
  }
  //fill in template from closeup.html
  var html = template(temp);
  console.log(html);
  parentDiv.append(html);
}

//functionality for when a thumbnail in a section is clicked
function onCatClick(cat, img) {
  //variable for section+year (ex: movies1970)
  cat = cat + localStorage.explore_year;
  //set up data for closeup page load
  localStorage.setItem('cat', JSON.stringify(window[cat]));
  localStorage.setItem('img', img);
  location.assign("closeup.html");
};

/****************************** OLD CODE ******************************/

/*
//declares variables to retrieve the correct data from the js data file
var musicArray = 'music' + localStorage.selected_year;
var showsArray = 'shows' + localStorage.selected_year;
var moviesArray = 'movies' + localStorage.selected_year;

  //fills in music section
  function fill_music() {
  "use strict";

  //if localStorage has no data for this section, populates localStorage
  var currArray = localStorage.getItem('musicArray');
  if(currArray == null || currArray == 'undefined'){
    console.log('adding musicArray to localStorage...');
    localStorage.setItem('musicArray', JSON.stringify(window[musicArray]));
  }

  //uses data from localStorage instead of the js data file
  musicArray = JSON.parse(window.localStorage.getItem('musicArray'));

  //only shuffles musicArray if called from home page or refresh button
  if(localStorage.getItem("previous_page") != "closeup"){
    shuffle_array(musicArray, "musicArray");
  }

  //fills the Music section of explore page
  document.getElementById("music_thumbnail1").src = musicArray[0].picture;
  document.getElementById("music_thumbnail2").src = musicArray[1].picture;
  document.getElementById("music_thumbnail3").src = musicArray[2].picture;
  document.getElementById("music_thumbnail4").src = musicArray[3].picture;
}

  //fills in the shows section
  function fill_shows() {
  "use strict";

  //if localStorage has no data for this section, populates localStorage
  var currArray = localStorage.getItem('showsArray');
  if(currArray == null || currArray == 'undefined'){
    console.log('adding showsArray to localStorage...');
    localStorage.setItem('showsArray', JSON.stringify(window[showsArray]));
  }

  //uses data from localStorage instead of the js data file
  showsArray = JSON.parse(window.localStorage.getItem("showsArray"));

  //only shuffles showsArray if called from home page or refresh button
  if(localStorage.getItem("previous_page") != "closeup"){
    shuffle_array(showsArray, "showsArray");
  }

  //fills the Shows section of explore page
  document.getElementById("shows_thumbnail1").src = showsArray[0].picture;
  document.getElementById("shows_thumbnail2").src = showsArray[1].picture;
  document.getElementById("shows_thumbnail3").src = showsArray[2].picture;
  document.getElementById("shows_thumbnail4").src = showsArray[3].picture;

}

  //fills in the movies section
  function fill_movies() {
  "use strict";

  //if localStorage has no data for this section, populates localStorage
  var currArray = localStorage.getItem('moviesArray');
  if(currArray == null || currArray == 'undefined'){
    console.log('adding moviesArray to localStorage...');
    localStorage.setItem('moviesArray', JSON.stringify(window[moviesArray]));
  }

  //uses data from localStorage instead of the js data file
  moviesArray = JSON.parse(window.localStorage.getItem("moviesArray"));

  //only shuffles moviesArray if called from home page or refresh button
  if(localStorage.getItem("previous_page") != "closeup"){
    shuffle_array(moviesArray, "moviesArray");
  }

  //fills the Movies section of explore page
  document.getElementById("movies_thumbnail1").src = moviesArray[0].picture;
  document.getElementById("movies_thumbnail2").src = moviesArray[1].picture;
  document.getElementById("movies_thumbnail3").src = moviesArray[2].picture;
  document.getElementById("movies_thumbnail4").src = moviesArray[3].picture;
}
*/
