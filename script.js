const msgEl = document.getElementById('msg');

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(event) {
  const msg = event.results[0][0].transcript;  // You can log the event to view the structure of the data
  writeMessage(msg);
  checkNumber(msg);
}

// Speak result
recognition.addEventListener('result', onSpeak);




// Write what user speaks
function writeMessage(msg) {
    const div = document.createElement('div');
    div.textContent = 'You said:';
    const span = document.createElement('span');
    span.classList.add('box');
    span.textContent = msg;
    msgEl.append(div, span);

  }



  // Check msg against the secret number
function checkNumber(msg) {
   let num = Number(msg); 




//edge case but doesn't work D:
if (msg === 'one' || msg === 'won') {
    num = 1
} else if (msg === 'two') {
    num = 2
}
else if (msg === 'three') { 
    num = 3
}
else if (msg === 'four') {
    num = 4
}
else if (msg === 'five') {
    num = 5
}
else if (msg === 'six') {
    num = 6
}
else if (msg === 'seven') {
    num = 7 
}
else if (msg === 'eight') {
    num = 8
}
else if (msg === 'nine') {
    num = 9 
}

    // Check if the spoken content is a valid number
    if (Number.isNaN(num)) {
      const div = document.createElement('div');
      div.textContent = 'That is not a valid number';
      msgEl.innerHTML = '';
      msgEl.append(div);
  
      return;
    }
  

    // Check if it's in range
    if (num < 1 || num > 100) {
      const div = document.createElement('div');
      div.textContent = 'Number must be between 1 and 100';
      msgEl.append(div);
  
      return;
    }
  
    // Check the number and provide feedback
    //getting it right
    if (num === randomNum) {
      const h2 = document.createElement('h2');
      h2.textContent = `Congrats! You have guessed the number! It was ${num}`;
  
      const button = document.createElement('button');
      button.classList.add('play-again');
      button.id = 'play-again';
      button.textContent = 'Play Again';
      // Add listener and handler to button
      button.addEventListener('click', () => window.location.reload());

    msgEl.innerHTML = '';
      msgEl.append(h2, button);

      //getting it wrong
    } else if (num > randomNum) {
      const div = document.createElement('div');
      div.textContent = 'A LITTLE LOWER';
        msgEl.innerHTML = '';
      msgEl.append(div);
    } else {
      // if (num < randomNum)
      const div = document.createElement('div');
      div.textContent = 'A LITTLE HIGHER';
        msgEl.innerHTML = '';
      msgEl.append(div);
    }
  }
  
// restart game
  recognition.addEventListener('end', () => recognition.start());


// add listener and handler to play again button
