/**
 * A number guessing game
 * 3 lives would be provided on starting of the game
 * At every wrong guess, the player would lose a life
 * After every stage, an extra life would be added
 */
const inquirer = require('inquirer');

let player_name = "";
let stage = 1;
let lives = 3;
let points = 0;
let correct_answer = 0;

function instantiate_correct_answer(range) {
    // Generate a random number between 1 and range
    correct_answer = Math.floor(Math.random() * range) + 1;
}


function promote_player(range){
    points += 10;
    stage += 1;
    lives += 1;
    instantiate_correct_answer(range);
}


const get_player_name = ((func) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ]).then(function (answers) {
        player_name = answers.name;
        console.log(`Welcome ${player_name}`);
        
        if (func !== undefined) {
            func(2);
        }
    });
});




const get_player_guess = ((range) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'guess',
            message: '\nGuess a number between 1 and '+range+' \nYou have '+lives+' lives left\n ',
        }
    ]).then(function (answers) {
        let guess = parseInt(answers.guess);

        if (guess === correct_answer) {
            console.log("You guessed correctly!");
            promote_player(range+1);
            get_player_guess(range+1);
        }
        else {
            console.log("You guessed wrong!");
            lives -= 1;
            if (lives === 0) {
                console.log("You lost!");
                console.log("The correct answer was "+correct_answer);
                console.log("Game over!");
                process.exit();
            }
            else {
                console.log("You have "+lives+" lives left");
                get_player_guess(range);
            }
        }

    });
});


function main(){
    instantiate_correct_answer(2)
    console.log("Welcome to the number guessing game!");
    get_player_name(get_player_guess);
}

main();