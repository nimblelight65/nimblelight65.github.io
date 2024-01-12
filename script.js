const idGuessArray = [
  ["a1_hash", "a1_1", "a1_2", "a1_3", "a1_4", "a1_5", "a1_6"],
  ["a2_hash", "a2_1", "a2_2", "a2_3", "a2_4", "a2_5", "a2_6"],
  ["a3_hash", "a3_1", "a3_2", "a3_3", "a3_4", "a3_5", "a3_6"],
  ["a4_hash", "a4_1", "a4_2", "a4_3", "a4_4", "a4_5", "a4_6"],
  ["a5_hash", "a5_1", "a5_2", "a5_3", "a5_4", "a5_5", "a5_6"],
  ["a6_hash", "a6_1", "a6_2", "a6_3", "a6_4", "a6_5", "a6_6"],
  ["ans_hash", "ans_1", "ans_2", "ans_3", "ans_4", "ans_5", "ans_6"]
];

const idStatsArray = [
  ["data_1", "data_2", "data_3", "data_4", "data_5", "data_6"],
  ["pct_1", "pct_2", "pct_3", "pct_4", "pct_5", "pct_6"]];

const statBar = "-";

//Variables
let [rowGuess, guess, red, blue, green, secret, ansList] = [0, 1, 0, 0, 0, null, idGuessArray[6]];

//I learned how to use this through w3schools.com. Local storage won't effect the outcome of the game, more for keeping stats
let attemptStats = JSON.parse(localStorage.getItem('attempt_stats'));
let attemptsOverall = JSON.parse(localStorage.getItem('attempts_overall'));

//If there is a new user, it creates a new data list for stats, and turns it into a string for storage.
if (attemptStats === undefined || attemptStats === null) {
  localStorage.setItem('attempt_stats', JSON.stringify([0, 0, 0, 0, 0, 0]));
  localStorage.setItem('attempts_overall', JSON.stringify(0));
  attemptStats = JSON.parse(localStorage.getItem('attempt_stats'));
  attemptsOverall = JSON.parse(localStorage.getItem('attempts_overall'));
}

/*
 * This here generates a random color.
 * It generates a number between 0-1, and multiplies by 255.
 * To convert to hexadecimal, it uses the toString method to turn it into hexadecimal.
 * Finally, it uses the .toUpperCase() function for style.
*/
function generateColor() {
  red = (Math.floor(Math.random() * 255)).toString(16).toUpperCase();
  if (red.length == 1) {
    /**
     * in the case it generates a number less than 16,
     * add a 0 infront in order for the code to work.
    **/
    red = "0" + red;
  }
  blue = (Math.floor(Math.random() * 255)).toString(16).toUpperCase();
  if (blue.length == 1) {
    blue = "0" + blue;
  }
  green = (Math.floor(Math.random() * 255)).toString(16).toUpperCase();
  if (green.length == 1) {
    green = "0" + green;
  }

  //Here, the code is combined.
  secret = "#"+red+blue+green;
  let secretArr = secret.split("");
  /**
   * This sets up the answer screen in the event a user gets tha answer incorrect.
   * This includes the background color and the value itself.
  **/
  for (let i = 0; i < idGuessArray.length; i++) {
    let square = document.getElementById(idGuessArray[6][i])
    square.textContent = secretArr[i];
    square.style.backgroundColor = secret;
  }
  
  //Then, return the value for use in the title.
  return (secret);
}

//girthleLogo() sets up the title text in order for the game to operate.
function girthleLogo() {
  const title = document.getElementById("title");
  title.style.color = generateColor();
}

//This function generates the percent error color. This is a hint for users to help them get it correct.
function giveHint(userGuess, rowGuess) {
  let hintList = [];
  let text = userGuess.split("").splice(1, 6);
  let secretText = secret.split("").splice(1, 6);
  //This goes through each item in the row.
  for (let i = 0; i < text.length; i++) {
    //First, the square is identified by id.
    if (text[i] === secretText[i]) {
      /*
      if the hex digit of the guess is in the same position as the actual hex digit,
      the background color is turned yellow, indicating it is correct.
      The color text is replaced with an X for keeping track during development.
      */
      hintList.push("#FFFF00");
    }
    else {
      //If the hex is incorrect, the data returns a hue based on how incorrect the guessed color is in comparison.
      let toDec = parseInt(text[i], 16);
      let secretDec = parseInt(secretText[i], 16);
      //We first convert the integers to decimal values using parseInt.
      let percent = 100*Math.abs((toDec-secretDec) / 12);
      
      if (percent > 92){
        percent = 92;
      }
      
      /*
      This switch case allows the program to place a certain number
      in a certain place (place 0 and 1 will be a red hue... etc).
      */
      switch (i) {
        case 0:
          hintList.push("rgb(100%," + percent.toString() + "%," + percent.toString() + "%)");
          break;
        case 1:
          hintList.push("rgb(100%," + percent.toString() + "%," + percent.toString() + "%)");
          break;
        case 2:
          percent = (percent/100)*85;
          hintList.push("rgb(" + percent.toString() + "%," + "85%," + percent.toString() + "%)");
          break;
        case 3:
          percent = (percent/100)*85;
          hintList.push("rgb(" + percent.toString() + "%," + "85%," + percent.toString() + "%)");
          break;
        case 4:
          hintList.push("rgb(" + percent.toString() + "%," + percent.toString() + "%," + "100%)");
          break;
        case 5:
          hintList.push("rgb(" + percent.toString() + "%," + percent.toString() + "%," + "100%)");
      }
    }
  }
  console.log(hintList);
  return(hintList);
}

function makeGuess(x) {
  let userGuess = "#";
  i = 1;
  while (i != 7) {
    userGuess += (document.getElementById(idGuessArray[x - 1][i]).textContent);
    i++;
  }
  let hintList = giveHint(userGuess, rowGuess);
  console.log(hintList);
  for(i = 0; i < 6; i++){
    document.getElementById(idGuessArray[x - 1][i + 1]).style.backgroundColor = hintList[i];
  }
  if (userGuess == secret) {
    attemptStats[rowGuess - 1]++;
    localStorage.setItem('attempt_stats', JSON.stringify(attemptStats));
    attemptsOverall++;
    localStorage.setItem('attempts_overall', JSON.stringify(attemptsOverall));
    if (rowGuess == 1) {
      displayWindow("Cheater!", ("You guessed the color correctly in the first try!"), true, false);
      document.removeEventListener('keydown', keyPress);
      document.getElementById('failNewGame').style.visibility = "visible";
    }
    else {
      displayWindow("Well Done!", ("You guessed the color correctly in " + (rowGuess) + " attempts."), true, false);
      document.removeEventListener('keydown', keyPress);
      document.getElementById('failNewGame').style.visibility = "visible";
    }

  }
  else if (rowGuess == 6) {
    attemptsOverall++;
    localStorage.setItem('attempts_overall', JSON.stringify(attemptsOverall));
    for (let i = 0; i < 7; i++) {
      let toReveal = document.getElementById(ansList[i]);
      toReveal.classList.toggle('reveal');
    }
    document.getElementById('failNewGame').style.visibility = "visible";
  }
  document.getElementById(idGuessArray[x - 1][0]).style.backgroundColor = userGuess;
}

function keyPress(event) {
  //If the user has completed a row, and someone attempts to press enter or backspace is pressed:
  if ((guess == 7 && event.code == 'Enter') || event.code == 'Backspace') {
    if (event.code == 'Enter') {
      //if enter is pressed, the next row is started, and makeGuess is called.
      //guess is reset.
      rowGuess++;
      guess = 1;
      makeGuess(rowGuess);
    }
    else if (event.code == 'Backspace' && guess > 1) {
      //if a user pressed backspace, guess is subtracted and the entry is deleted.
      guess--;
      document.getElementById(idGuessArray[rowGuess][guess]).textContent = "";
    }
    else {
      //if guess is greater than 7, then an error will occur.
      console.log("Cannot Guess anymore characters for this attempt. Press Enter to continue.");
    }
  }
  //The remainder of the function allows the user to press hexadecimal keys, 0-9 and A-F.
  else if (event.key == '0') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "0";
    guess++;
  }
  else if (event.key == '1') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "1";
    guess++;
  }
  else if (event.key == '2') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "2";
    guess++;
  }
  else if (event.key == '3') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "3";
    guess++;
  }
  else if (event.key == '4') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "4";
    guess++;
  }
  else if (event.key == '5') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "5";
    guess++;
  }
  else if (event.key == '6') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "6";
    guess++;
  }
  else if (event.key == '7') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "7";
    guess++;
  }
  else if (event.key == '8') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "8";
    guess++;
  }
  else if (event.key == '9') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "9";
    guess++;
  }
  else if (event.key == 'a') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "A";
    guess++;
  }
  else if (event.key == 'b') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "B";
    guess++;
  }
  else if (event.key == 'c') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "C";
    guess++;
  }
  else if (event.key == 'd') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "D";
    guess++;
  }
  else if (event.key == 'e') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "E";
    guess++;
  }
  else if (event.key == 'f') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "F";
    guess++;
  }
  else {
    //If the key is not a hexadecimal character, backspace or enter, an error will occur.
    console.log("Not a vaild hexadecimal character. hexadecimal charaters are 0-9, and A-F");
  }

}

/*
This function is a repeat of the above function.
It mainly serves the purpose of taking in button presses from the HTML.
This isn't necessary, but it allows more accessability for mobile users.
*/
function alt_button(key) {
  if ((guess == 7 && key == 'Enter') || key == 'Backspace') {
    if (key == 'Enter') {
      //if enter is pressed, the next row is started, and makeGuess is called.
      //guess is reset.
      rowGuess++;
      guess = 1;
      makeGuess(rowGuess);
    }
    else if (key == 'Backspace' && guess > 1) {
      //if a user pressed backspace, guess is subtracted and the entry is deleted.
      guess--;
      document.getElementById(idGuessArray[rowGuess][guess]).textContent = "";
    }
    else {
      //if guess is greater than 7, then an error will occur.
      console.log("Cannot Guess anymore characters for this attempt. Press Enter to continue.");
    }
  }
  //The remainder of the function allows the user to press hexadecimal keys, 0-9 and A-F.
  else if (key == '0') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "0";
    guess++;
  }
  else if (key == '1') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "1";
    guess++;
  }
  else if (key == '2') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "2";
    guess++;
  }
  else if (key == '3') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "3";
    guess++;
  }
  else if (key == '4') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "4";
    guess++;
  }
  else if (key == '5') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "5";
    guess++;
  }
  else if (key == '6') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "6";
    guess++;
  }
  else if (key == '7') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "7";
    guess++;
  }
  else if (key == '8') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "8";
    guess++;
  }
  else if (key == '9') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "9";
    guess++;
  }
  else if (key == 'a') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "A";
    guess++;
  }
  else if (key == 'b') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "B";
    guess++;
  }
  else if (key == 'c') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "C";
    guess++;
  }
  else if (key == 'd') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "D";
    guess++;
  }
  else if (key == 'e') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "E";
    guess++;
  }
  else if (key == 'f') {
    document.getElementById(idGuessArray[rowGuess][guess]).textContent = "F";
    guess++;
  }
}

/*
displayWindow allows a window to display.
The parameters include a title, a quick blurb, and then the actual content boolean.*/
function displayWindow(title, text, stats, help) {
  document.getElementById("info_txt_title").textContent = title;
  document.getElementById("info_txt_paragraph").textContent = text;
  document.getElementById("info").style.overflowY = "initial";
  //if the stats boolean is selected, then it will display stats.
  if (stats) {
    document.getElementById("stats").style.display = "block";
    document.getElementById("help").style.display = "none";
    for (i = 0; i < 6; i++) {
      for (x = 0; x < 2; x++) {
        let percentComplete = Math.round((attemptStats[i] / attemptsOverall) * 1000) / 10;
        //This creates a percent of how many attempts through local storage, and then it creates a basic stats bar to show a relative percentage are correct.
        if (x === 0) {
          document.getElementById(idStatsArray[x][i]).textContent = statBar.repeat((Math.ceil(percentComplete) / 5));
        }
        else {
          //This is just a display of the percentage.
          document.getElementById(idStatsArray[x][i]).textContent = percentComplete + "%";
        }
      }
    }
  }
  else if (help) {
    /*
    If help is selected, it will display the help div in HTML.
    It will also allow the user to scroll through the rules.
    */
    document.getElementById("stats").style.display = "none";
    document.getElementById("help").style.display = "block";
    document.getElementById("info").style.overflowY = "scroll";
  }
  fade();
}

function fade() {
  // A simple toggle function to turn the modal (help or stats)
  document.getElementById("modal").classList.toggle('reveal');
}

girthleLogo();

document.addEventListener('keydown', keyPress);


