/*
 * @2019 All rights are reserved
 * ${author} Chiragkumar Maniyar
 */

// Colors and variable declarations
var colors = ["red", "blue", "green", "brown", "magenta", "black", "violet"];
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
      alert("Game Over! \n Your Score : " + score);
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
  color_font.innerHTML = getRandomColor();
  style_font.innerHTML = getRandomColor();
}

/**
 *
 * @param {String} user username
 * Selects window to display based on user's name     available or not
 */
function selectWindow(user) {
  if (user === "" || user === null || user === undefined) {
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
 *
 * @param {Boolean} answer Event passes boolean value
 * Manages score while game is on!
 */
function scoreCount(answer) {
  var color_text = document.getElementById("color-text").innerHTML;
  var color_font = document.getElementById("color-font").style.color;
  document.getElementById("score").innerHTML =
    (color_text === color_font) === answer ? (score += 100) : (score -= 50);
  document.getElementById("color-text").innerHTML = getRandomColor();
  document.getElementById("color-font").innerHTML = getRandomColor();
  document.getElementById("color-font").style.color = getRandomColor();
}

/**
 * Collects user name
 */
function getUserName() {
  let user = document.getElementById("username").value;
  username =
    user !== null && user.length > 1
      ? user
      : alert(" User name can not be empty  . . .");
  displayUser.innerHTML = user;
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
