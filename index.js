var colors = ["red", "blue", "green", "brown", "magenta", "black", "violet"];
var score = 0;
var username = "";
var game_time = 10;

var color_text = document.getElementById("color-text");
var color_font = document.getElementById("color-font");
var style_font = document.getElementById("color-font");
var displayUser = document.getElementById("user");
var user_window = document.getElementById("user-window");
var game_window = document.getElementById("game-window");
var timer_value = document.getElementById("time");
var high_score_table = document.getElementById("highestScores");

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

function _setCardColorValues() {
  color_text.innerHTML = getRandomColor();
  color_font.innerHTML = getRandomColor();
  style_font.innerHTML = getRandomColor();
}

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

function getRandomColor() {
  return colors[Math.floor((Math.random() * colors.length) / 2)];
}

function scoreCount(answer) {
  var color_text = document.getElementById("color-text").innerHTML;
  var color_font = document.getElementById("color-font").style.color;
  document.getElementById("score").innerHTML =
    (color_text === color_font) === answer ? (score += 100) : (score -= 50);
  document.getElementById("color-text").innerHTML = getRandomColor();
  document.getElementById("color-font").innerHTML = getRandomColor();
  document.getElementById("color-font").style.color = getRandomColor();
}

function getUserName() {
  let user = document.getElementById("username").value;
  username =
    user !== null && user.length > 1
      ? user
      : alert(" User name can not be empty  . . .");
  displayUser.innerHTML = user;
  selectWindow(displayUser.innerHTML);
}

function localStorageInit() {
  localStorage.setItem(
    "Color-Match",
    "Check if color written in first card is same of the second card's text color!"
  );
}

function main() {
  selectWindow(displayUser.value);
  if (game_window.style.display === "block") {
    timer_Count();
    _setCardColorValues();
  }
  highScoreTable();
}

window.onloadstart = localStorageInit();
window.onload = main();
