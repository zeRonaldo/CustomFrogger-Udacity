
// Using constants to easen up the logic
const UP_DOWN = 83;
const LEFT_RIGHT = 101;
const TOTAL_ENEMIES = 8;
const DIFFICULTY_MODIFIER = [100, 150, 200];
const Y_POSITION = [60,145,234];

let difficulty = DIFFICULTY_MODIFIER[2];

// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.speed = getRandom(50, difficulty);
    //Enemy location
    this.x = getRandom(-250, 0);
    this.y = Y_POSITION[getRandom(0,2)];


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 680) {
        this.x = 1;
    }

    // Control the collision of the bug with the player
    if (player.x < this.x + 75 && player.x + 65 > this.x && player.y < this.y + 50 && 70 + player.y > this.y) {
        player.die();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let items = function(){
    this.life = 'images/Heart.png';
    this.obstacle = 'images/rock.png';
    this.powerUps = {
        'blue' : 'images/Gem-Blue.png',
        'green' : 'images/Gem-Green.png',
        'orange' : 'images/Gem-Orange.png',
        'star' : 'images/Star.png'
    };
};

let Player = function(x, y) {
    this.speed = 100;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.life = 3;
    this.sprite = 'images/char-boy.png';
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    if (this.x > 603) {
        this.x = 603;

    }
    if (this.x < 0) {
        this.x = 0;
 
    }
    if (this.y > 566) {
        this.y = 566;
        
    }
    if (this.y < 35) {
        this.y = 566;
        this.x = 300;
        player.win();      
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // re-draw the score text
    let text = "Score: "+ this.score;
    ctx.fillText(text, 10, 30);
    ctx.font="42px 'Slabo 27px'";
    ctx.fillStyle='white';

    text="";
    for(let i = this.life; i > 0; i--){
        text+='\u2764';
    };
    ctx.fillText(text, 603, 30);
    ctx.font="42px 'Slabo 27px'";
    ctx.fillStyle='white';
    

    // for(let i = this.life; i >= 0; i--){
    //     ctx.drawImage(Resources.get(items.life), 10,30);
    // }
};

Player.prototype.die = function(){
    if(this.life > 1){
        this.reset();
        this.life--;
    }else{
        // ctx.fillText("Game Over", 350, 300);
        // ctx.font="70px 'Luckiest Guy'";
        // ctx.fillStyle='white';
        // ctx.strokeStyle='black';
        window.location.reload();
    }
    

}


Player.prototype.win = function(){
    this.addPoints(10);
  
}
//move the Player
Player.prototype.handleInput = function(allowedKey) {
    switch (allowedKey) {
        case 'up':
            this.y -= UP_DOWN;
            this.addPoints(1);
            break;
        case 'down':
            this.y += UP_DOWN;
            this.addPoints(-0.5);
            break;
        case 'left':
            this.x -= LEFT_RIGHT;
            break;
        case 'right':
            this.x += LEFT_RIGHT;
            break;
    }
};

//when the Player and the enemies have a collision
Player.prototype.reset = function() {
    //reset Player position
    this.x = 300;
    this.y = 566;
    //reset score
    this.score = 0;
};

// Add points to the score
Player.prototype.addPoints = function(multiplier){
    // Add 100 points to the Player score
    this.score += (10*(multiplier));
    // clear a rectangle over the score text
    ctx.clearRect(1, 580, 600, 20); 
};


// Place the Player object in a variable called player
var player = new Player(300, 566);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies =[]; 
for(var i = 0; i<TOTAL_ENEMIES; i++){
    var enemy = new Enemy();
    // Place all enemy objects in an array called allEnemies
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Function to generate random number between min and max
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
