// Setting up canvas
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = '#ff8';
let color = ['red', 'green', 'blue'];
let platforms = [];


let offset = 0;


const backgroundImg = new Image();
backgroundImg.src = '../images/background.png'
const backgroundImg2 = new Image();
backgroundImg2.src = '../images/hills.png'
//Start animation after backGround image load
backgroundImg.onload = function () {
  playerAnimation();
}



// Gravity
let gravity = 0.5;

// Making platform
class Platform {
  constructor(x, y, width, height, imgSrc) {
    this.platform = { x: x, y: y, width: width, height: height };
    this.img = new Image();
    this.img.src = imgSrc;

  }

  draw() {

    context.drawImage(this.img, this.platform.x, this.platform.y, this.platform.width, this.platform.height);

  }
}

// Making player
class Player {
  constructor() {
    this.position = { x: 200, y: 200 };
    this.velocity = { x: 0, y: 2 };
    this.onGround = 0; // onGround = 1 player is on the ground, onGround = 0 player is mid-air
    this.height = 50;
    this.width = 50;
    
  }

  draw() {
    context.fillStyle = "black";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  playerMovement() {
    if ((this.position.y + this.height) > canvas.height) {
      this.position.y = canvas.height - this.height;
      this.velocity.y = 0; // Reset velocity when hitting the ground
      this.onGround = 1; // Set player as grounded
    } else {
      this.velocity.y += gravity; // Gravity continues if not grounded
      this.onGround = 0; // Player is mid-air
    }

    for (let i = 0; i < platforms.length; i++) {
      if (
        (this.position.x + this.width > platforms[i].platform.x) &&
        (this.position.x < platforms[i].platform.x + platforms[i].platform.width) &&
        (this.position.y + this.height <= platforms[i].platform.y) && // Check if player is above the platform
        (this.position.y + this.height + this.velocity.y >= platforms[i].platform.y) // Check if falling onto the platform
      ) {
        this.velocity.y = 0; // Stop vertical movement when landing on the platform
        this.onGround = 1; // Set player as grounded
        this.position.y = platforms[i].platform.y - this.height; // Place player on top of the platform
      }

      // stop player after collision with platform
      if (this.velocity.x > 0 &&
        (this.position.x + this.width + 2 > platforms[i].platform.x) &&
        (this.position.x + this.width < platforms[i].platform.x + platforms[i].platform.width) &&
        (this.position.y + this.height > platforms[i].platform.y) &&
        (this.position.y < platforms[i].platform.y + platforms[i].platform.height)) {
        this.velocity.x = 0

      }

      platforms[i].platform.x += offset;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;


    this.draw();
  }
}





// Creating player
let player = new Player();

// Creating platforms
let platform1 = new Platform(20, 520, 300, 140, '../images/platform.png');
let platform2 = new Platform(500, 520, 450, 150, '../images/platform.png');
let platform3 = new Platform(1200, 520, 200, 150, '../images/platform.png');
let platform4 = new Platform(1600, 520, 250, 190, '../images/platform.png');
platforms.push(platform1, platform2, platform3,platform4);

// Event listeners
addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    player.velocity.x = 2;
    offset = -5;
  }
  if (e.key === 'ArrowLeft') {
    player.velocity.x = -2;
    offset = 5;
  }
  if (e.key === 'ArrowUp') { // Jump only if grounded

    player.velocity.y = -12; // Smooth jump effect
    player.onGround = 0; // Temporarily disable jump button

  }

  if (e.key === ' ') { // Jump only if grounded
    if (player.onGround) {
      player.velocity.y = -12; // Smooth jump effect
      player.onGround = 0; // Temporarily disable jump button
    }
  }
});

addEventListener('keyup', function (e) {
  if (e.key === 'ArrowRight') {
    player.velocity.x = 0;
    offset = 0;
  }
  if (e.key === 'ArrowLeft') {
    player.velocity.x = 0;
    offset = 0;
  }
  if (e.key === 'ArrowUp') { // Jump only if grounded

    player.velocity.y = 0; // Smooth jump effect
    player.onGround = 0; // Temporarily disable jump button

  }



  }
);

// Main animation loop
function playerAnimation() {
  requestAnimationFrame(playerAnimation);
  context.clearRect(0, 0, canvas.width, canvas.height);


  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
  context.drawImage(backgroundImg2, 2, 100, 2200, 550)
  player.playerMovement();

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

}
                                                                                                                                                        