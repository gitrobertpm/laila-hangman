(function() {
	"use strict";
	
	// phrase array
	const phrases = [
		"the princess and the frog",
		"punch yourself in the face",
		"james and the giant peach",
		"oops i farted",
		"ohana means family",
		"pull my finger",
		"the land before time",
		"laila clean your office",
		"finding nemo",
		"go hug your family",
		"the last airbender",
		"pink floyd rocks",
		"pinkalicious",
		"be a good girl",
		"rise of the gaurdians",
		"daddy loves you",
		"to infinity and beyond",
		"akuna ma tata"
	];
	
	// working array to prevent duplicates
	let usablePhrases = phrases.slice(0);
	
	// DOM reference variables
	const phrase = document.getElementById("phrase");
	const keyboard = document.getElementById("keyboard");
	const buttons = document.querySelectorAll(".keyrow button");
	const letterClass = document.getElementsByClassName("letter");
	const showClass = document.getElementsByClassName("show");
	const tries = document.getElementsByClassName("tries");
	const gameOver = document.getElementsByClassName("game-over");
	const success = document.getElementById("success");
	const failure = document.getElementById("failure");
	const newGameLose = document.getElementById("newGameLose");
	const newGameWin = document.getElementById("newGameWin");
	
	// initialize guess counter and state
	let missed = 0;
	resetGame();
	
	// return random non-duplicating phrase as array of characters
	function getRandomPhrase() {
		let ran = Math.floor(Math.random() * usablePhrases.length);
		let characters = usablePhrases[ran].split("");
		usablePhrases.splice(ran, 1);
		if (usablePhrases.length === 0) {
			usablePhrases = phrases.slice(0);
		}
		return characters;
	}
	
	// helper function to remove old phrase if there is one
	function cleanPhrase() {
		let oldLetters = document.querySelectorAll("#phrase p")
		if (oldLetters) {
			[].forEach.call(oldLetters, (vally) => {
				vally.parentElement.removeChild(vally);
			});
		}
	}
	
	// helper function for cleaning, creating and displaying phrase
	function displayPhrase() {
		
		// clean old phrase
		cleanPhrase();
		
		// store our phrase
		let ranChar = getRandomPhrase();

		// create, class and append DOM elements for our phrase
		ranChar.forEach((vally) => {
			let char = document.createTextNode(vally);
			let letter = document.createElement("p");
			letter.appendChild(char);
			if (letter.innerHTML !== " ") {
				letter.setAttribute("class", "letter");
			}
			phrase.appendChild(letter);
		});
	}
	
	// generate and display phrase
	displayPhrase();
	
	// check if button clicked mathces letter in our phrase and rturn true if match
	function checkLetter(button) {
		let match = false;
		[].forEach.call(letterClass, (vally) => {
			if (button.innerHTML === vally.innerHTML) {
				vally.setAttribute("class", "letter show");
				match = true;
			}
		});
		return match ? true : false;
	}
	
	// use event delegation to add event handlers to keyboard
	keyboard.addEventListener("click", (e) => {
		if (e.target.tagName === "BUTTON") {
			e.target.disabled = true;
			e.target.setAttribute("class", "chosen");
			let checkedLetter = checkLetter(e.target);
			
			// style clicked keyboard buttons
			if (!checkedLetter) {
				tries[missed].style.background = "red";
				tries[missed].style.color = "black";
				missed++;
			}
			
			// check for win
			checkWin();
		}
	});
	
	// helper function for checking for winnin and losing conditions
	function checkWin() {
		if (letterClass.length === showClass.length) {
			success.style.display = "block";
		}
		if (missed === tries.length) {
			failure.style.display = "block";
		}
	}
	
	// add functionality to new game buttons
	newGameLose.addEventListener("click", resetGame);
	newGameWin.addEventListener("click", resetGame);

	// helper function for resetting game state
	function resetGame() {
		// re-initialize guess counter
		missed = 0;
		
		// generate and display phrase
		displayPhrase();

		// reset all keyboard buttons enabled
		[].forEach.call(buttons, (vally) => {
			vally.disabled = false;
			vally.setAttribute("class", "");
		});
		
		// reset Guesses
		[].forEach.call(tries, (vally) => {
			vally.style.background = "white";
			vally.style.color = "transparent";
		});
		
		// hide game over screen
		[].forEach.call(gameOver, (vally) => {
			vally.style.display = "none";
		});
	}
})();

