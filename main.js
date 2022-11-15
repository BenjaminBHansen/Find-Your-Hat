// npm: prompt-sync
const prompt = require('prompt-sync')({sigint: true});

// Defining elements of game field
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Field class of game
class Field {
  constructor(field, fixed) {
    this.field = field;
    this.originalField = JSON.parse(JSON.stringify(field));
    this.activeGame = false;
  }

   play() {
    // Starts the game
    this.activeGame = true;
    // Boundaries of field
    const verticalBound = this.field.length;
    const horizontalBound = this.field[0].length;

    // Player position must be equal to initial star position
    let vert = 0;
    let hori = 0;
    for (let i = 0; i < verticalBound; i++) {
      for (let j = 0; j < horizontalBound; j++) {
        if (this.field[i][j] === '*') {
          vert = i;
          hori = j;
        }
      }
    }
    const playerPosition = this.field[vert][hori];
    // Initializes gameloop
    this.print();
    let input = prompt('Which way? ');

    // Stay in this loop while the game is on-going.
    while (this.activeGame) {
    
    // Handling of inputs of player
    if (input == 'd') {
      vert++;
    } else if (input == 'l') {
      hori--;
    } else if (input == 'u') {
      vert--;
    } else if (input == 'r') {
      hori++;
    }

    // Player going out of bounds and losing the game
    if (vert < 0 | vert >= verticalBound | hori < 0 | hori >= horizontalBound) {
      console.log('You stepped over the edge and fell off. You lose.');
      this.activeGame = false;
      this.restartGame();
      // Player stepping into a "0" and losing
    } else if (this.field[vert][hori] == 'O') {
      console.log('You just stepped into a hole! You lose.');
      this.activeGame = false;
      this.restartGame();
      // Player stepping on their hat and "finding" it = Wins!
    } else if (this.field[vert][hori] == '^') {
      console.log('Congratulations! You found the hat!');
      this.activeGame = false;
      this.restartGame();
    } else {
      this.field[vert][hori] = '*';
      this.print();
      input = prompt('Which way? ');
    }
  }
}
  // method for updating field position after input
  print() {
    process.stdout.write('\x1Bc'); 
    for (let i = 0; i < this.field.length; i++) {
      process.stdout.write(this.field[i].join(''));
      process.stdout.write("\n")
    }
  }

  // Basic restart/quit prompt.
  restartGame() {
    let input = prompt('Try again? Y/N?');
    if (input === 'Y' | input === 'y') {
      process.stdout.write('\x1Bc');
      this.resetField();
      this.play();
    } else if (input === 'N' | input === 'n') {
      process.stdout.write('\x1Bc');
      process.exit();
    }
  }
  // Game restarts with same field through deep cloning of this.field
  resetField() {
    this.field = JSON.parse(JSON.stringify(this.originalField))
  }

  // static generateField method
  static generateField(height, width, percentage = 33, fixedPlayer) {
    let fixed = fixedPlayer.toLowerCase();

    if (typeof height !== 'number' | typeof width !== 'number') {
      return 'Please input integers only.';
    }

  // Defining playField, hole amount and hat location
    let playField = [];
    let hatLocation = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
    let holeSeedX;
    let holeSeedY;
    let holeAmount = (height * width * percentage) / 100;
    
   // Fill playField with safe squares
    for (let i = 0; i < height; i++) {
      let tempArr = [];
      let randNum;
      for (let j = 0; j < width; j++) {
        tempArr.push(fieldCharacter);
      }
      playField.push(tempArr);
    }

    // Creates holes that corresponds with the percentage set by player
    let counter = 1;
    while (counter <= holeAmount) {
      holeSeedX = Math.floor(Math.random() * height);
      holeSeedY = Math.floor(Math.random() * width);
      if (playField[holeSeedX][holeSeedY] != hole) {
      playField[holeSeedX][holeSeedY] = hole;
      counter++;
      }
    }

    if (fixed == 'y' | fixed == 'yes') {
      playField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = pathCharacter;
    } else {
      playField[0][0] = pathCharacter;
    }


    playField[hatLocation[0]][hatLocation[1]] = hat;
    return playField;
  }
}

// User inputs to set the map settings
let fieldHeight = prompt('Enter Field Height: ');
let fieldWidth = prompt('Enter Field Width: ');
let holePerc = prompt('How many holes do you want (% of map)? ');
let fixedPlayer = prompt('Do you want to spawn randomly? Y/N?');

// Generating field through static method
let fieldInstance = Field.generateField(parseInt(fieldHeight), parseInt(fieldWidth), parseInt(holePerc), fixedPlayer);


// Instantiation of Field with user inputs
const myField = new Field(fieldInstance);
myField.play();
