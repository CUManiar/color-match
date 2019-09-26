/*
 * @2019 All rights are reserved
 * ${author} Chiragkumar Maniyar
 */

// Colors and variable declarations
var colors = ["red", "blue", "green", "brown", "magenta", "violet"];
var score = 0;
var username = "";
var game_time = 30;

// Elements list need to be interacted with
var color_text = document.getElementById("color-text");
var color_font = document.getElementById("color-font");
var style_font = document.getElementById("color-font");
var displayUser = document.getElementById("user");
var user_window = document.getElementById("user-window");
var game_window = document.getElementById("game-window");
var timer_value = document.getElementById("time");
var high_score_table = document.getElementById("highestScores");
var answerNo = document.getElementById("no-btn");
var answerYes = document.getElementById("yes-btn");

/**
 *
 * @param {Boolean} answer Event passes boolean value
 * Manages score while game is on!
 */
const scoreCount = (answer, text, text_color) => {
  document.getElementById("score").innerHTML =
    (text === text_color) === answer ? (score += 100) : (score -= 200);
};

/**
 * Get current text of card1 and color of font card2
 */
const getCardValues = id => {
  return document.getElementById(id);
};

/**
 * Score count setting
 */
const _scoreHandling = answer => {
  var color_text = getCardValues("color-text").innerHTML;
  var color_font = getCardValues("color-font").style.color;
  scoreCount(answer, color_text, color_font);
  _setCardColorValues();
};

/**
 * Key press score count
 */
const _keyPressHandle = answer => {
  _scoreHandling(answer);
};

/**
 * Debounce will restrict user click unlawfully
 */
const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

/**
 * Manages High Score table
 */
function highScoreTable() {
  if (JSON.parse(localStorage.getItem("score_arr")) === null) {
    localStorage.setItem("score_arr", JSON.stringify([]));
    return;
  }
  var list = JSON.parse(localStorage.getItem("score_arr"));
  list =
    list !== null && list.length > 0
      ? list.sort((a, b) => b.score - a.score)
      : [];
  var count = 0;
  for (let i = 0; i < list.length; i++) {
    if (count < 10) {
      high_score_table.innerHTML += `<div class="row m-2">
            <div class="col">
              <span class="p-2 m-2 float-left">${list[i].user}</span>
              <span class="p-2 m-2 float-right">${list[i].score}</span>
            </div>
          </div> `;
    }
    count++;
  }
}

/**
 * Timer function
 */
function timer_Count() {
  var timer = setInterval(countdown, 1000);
  function countdown() {
    if (game_time < 0) {
      score > 1000
        ? alert("Congratulations! You Rocked \n Your Score : " + score)
        : alert(
            "Keep playing! You will definately nail it! \n Your Score : " +
              score
          );
      clearTimeout(timer);
      var list = JSON.parse(localStorage.getItem("score_arr"));
      var scoreInfo = { user: username, score: score };
      list.push(scoreInfo);
      localStorage.setItem("score_arr", JSON.stringify(list));
      highScoreTable();
      location.reload();
    } else {
      timer_value.innerHTML = game_time + " sec";
      game_time--;
    }
  }
}

/**
 * Sets and updates value and color of card text
 */
function _setCardColorValues() {
  color_text.innerHTML = getRandomColor();
  color_text.style.color = getRandomColor();
  style_font.style.color = getRandomColor();
  color_font.innerHTML = getRandomColor();
}

/**
 *
 * @param {String} user username
 * Selects window to display based on user's name     available or not
 */
function selectWindow(user) {
  if (user === "" || user === null || user === undefined || user.length < 3) {
    game_window.style.display = "none";
    user_window.style.display = "block";
  } else {
    user_window.style.display = "none";
    game_window.style.display = "block";
    timer_Count();
    _setCardColorValues();
  }
}

/**
 * Generates random colours from colour array
 */
function getRandomColor() {
  return colors[Math.floor((Math.random() * colors.length) / 2)];
}

/**
 * Event listener for score counting
 */
answerNo.addEventListener(
  "click",
  debounce(function() {
    _scoreHandling(false);
  }, 200)
);

/**
 * Event listener for score counting
 */
answerYes.addEventListener(
  "click",
  debounce(function() {
    _scoreHandling(true);
  }, 200)
);

/**
 * Collects user name
 */
function getUserName() {
  let user = document.getElementById("username").value;
  if (user !== "" && user.length > 2) {
    username = user;
    displayUser.innerHTML = user;
  } else if (user === "") {
    return alert("Username can not be empty!");
  } else {
    return alert("Username should be at least 3 characters!");
  }
  selectWindow(displayUser.innerHTML);
}

/**
 * Handles local storage data
 */
function localStorageInit() {
  localStorage.setItem(
    "Color-Match",
    "Check if color written in first card is same of the second card's text color!"
  );
}

/**
 * Key press scoring
 */
game_window.onkeydown = e => {
  if (e.keyCode === 39) {
    console.log("true");
    _keyPressHandle(true);
  }
  if (e.keyCode === 37) {
    console.log("false");
    _keyPressHandle(false);
  }
};

/**
 * Swiping score handling
 */
var start = null;
game_window.addEventListener("touchstart", function(event) {
  if (event.touches.length === 1) {
    //just one finger touched
    start = event.touches.item(0).clientX;
    console.log(start);
  } else {
    //a second finger hit the screen, abort the touch
    start = null;
    console.log("there");
  }
});

game_window.addEventListener("touchend", function(event) {
  var offset = 50; //at least 50px are a swipe
  if (start) {
    //the only finger that hit the screen left it
    var end = event.changedTouches.item(0).clientX;
    console.log(end);
    if (end > start + offset) {
      _scoreHandling(true); //Right swipe
    }
    if (end < start - offset) {
      _scoreHandling(false); //Left swipe
    }
  }
});

/**
 * Everything starts from here!!!!!!
 */
function main() {
  selectWindow(displayUser.value);
  if (game_window.style.display === "block") {
    timer_Count();
    _setCardColorValues();
  }
  highScoreTable();
}

/**
 * Commands to manage what to do when!?
 */
window.onloadstart = localStorageInit();
window.onload = main();
