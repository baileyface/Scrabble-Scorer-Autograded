// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let greetAndAskForWord;

function initialPrompt() {
   greetAndAskForWord = input.question("Let's play some scrabble! Enter a word: ")
   };


let newPointStructure = transform(oldPointStructure);



function simpleScorer(word) {
   word = word.toUpperCase();
   let onePointPerLetter = 0;

   for (let j = 0; j < word.length; j++) {
      onePointPerLetter += 1;
   }
   return onePointPerLetter;
}


function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   const vowels = ['A', 'E', 'I', 'O', 'U'];

   for (let k = 0; k < word.length; k++) {
      if (vowels.includes(word[k])) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
}

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;

   for(let n = 0; n < word.length; n++) {
      score += newPointStructure[word[n]] || 0;
   }
   return score;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log('Choose a scoring algorithm: ');
   for (let l = 0; l < scoringAlgorithms.length; l++) {
      console.log(`${l} - ${scoringAlgorithms[l].name}: ${scoringAlgorithms[l].description}`);
   }
   
   let algorithmIndex = input.question('Enter 0, 1, or 2: ');
   let score = scoringAlgorithms[algorithmIndex].scorerFunction(greetAndAskForWord);
   console.log(`Score for '${greetAndAskForWord}':\n${score}`);
};




function transform(oldPointStructure) { 
   let newPointStructure = {};

   for(let pointValue in oldPointStructure) {
      let letters = oldPointStructure[pointValue];
      
      for(let m = 0; m < letters.length; m++) {
         newPointStructure[letters[m].toLowerCase()] = Number(pointValue);
      }
   }
   return newPointStructure;
};

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
