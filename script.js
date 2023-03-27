
// grabbing the canvas element in the index
const canvas = document.getElementById('canvas1');

// sets the initial animation to idle
let playerState = 'idle';

// pulling the player state from the html
let dropdown = document.getElementById('animations')
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

// context variable. 2d is for the 2d drawing methods and now stored in ctx
const ctx = canvas.getContext('2d');

//logging the ctx to be able to see the available canvas methods with 2d
console.log(ctx);

// setting the canvas dimensions and setting them as the same from the style.css
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// setting a global variable so making the sprite animation is easy going forward. These are something you'll have to figure out using your animation sheet
const spriteWidth = 575;
const spriteHeight = 523;

// used to control the speed of the animations
let gameFrame = 0;
const staggerFrames = 10;

// setting up the array that will contain the various animation cycles' positions within the animation sheet
const spriteAnimations = [];

// the array map that defines each animation type
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'chill',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];

// This will map out the x,y coordinates of each animation within the animation sheet and assign them to the spriteAnimations array.
animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      }
      for (let i = 0; i < state.frames; i++) {
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;

        frames.loc.push({
            x: positionX,
            y: positionY,
        })

        spriteAnimations[state.name] = frames;
        
      }
})

// built in image class constructor
const playerImage = new Image();
// setting the image source 
playerImage.src = './assets/sprite/shadow_dog.png';

function animate() {

    // clearing the canvas. The 4 args are from 0,0 (top left) to the width and height of the canvas (essentially saying clear the entire space);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // this adjusts the position by 6 so that the animation loops over the 6 frames. 
    let position = Math.floor(gameFrame /staggerFrames % spriteAnimations[playerState].loc.length)

    // defining the position of the animation frame within the sheet
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    
    // drawImage can take 3, 5, or 9 args depending on the control you want. First is always the image you want to draw. second and third is the position of the image.
    // The fourth and fifth arguments are what dimensions you want to pull from the image file.
    // Using 9 args, they are (sourceImage, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight)
    // You will need to know the dimensions of your animation frames within the source image to properly use it. 
    ctx.drawImage(playerImage, frameX , frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    // only advancing the frame by the amount of staggerFrames. This is still at the mercy of the CPU.
    if (gameFrame % staggerFrames == 0){
        if(frameX<6) frameX++;
        else frameX =0;
    }

    gameFrame++;

    // this is a built in method that runs the function passed in to it once. Calling animate creates and animation loop.
    // unsepcified fill styles default to black
    requestAnimationFrame(animate);


};

// runs the animation function
animate();