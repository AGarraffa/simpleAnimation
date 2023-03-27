
// grabbing the canvas element in the index
const canvas = document.getElementById('canvas1');

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

// used to select the specific animations you want to use
let playerState = 'run'

// setting frame variables to be used to animate the image later
// let frameX = 0;
// let frameY = 0;
// commenting them out since I've built the animation array that has the exact coordinates to work with.

// used to control the speed of the animations
let gameFrame = 0;
const staggerFrames = 5;

// setting up the array that will house the various animation cycles
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

console.log(spriteAnimations)

// built in image class constructor
const playerImage = new Image();
// setting the image source 
playerImage.src = '../assets/sprite/shadow_dog.png';

function animate() {

    // clearing the canvas. The 4 args are from 0,0 (top left) to the width and height of the canvas (essentially saying clear the entire space);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // this adjusts the position by 6 so that the animation loops over the 6 frames. 
    let position = Math.floor(gameFrame /staggerFrames % spriteAnimations[playerState].loc.length)
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    
    // drawImage can take 3, 5, or 9 args depending on the control you want. First is always the image you want to draw. second and third is the position of the image.
    // The fourth and fifth arguments are what dimensions you want to pull from the image file.
    // Using 9 args, they are (sourceImage, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight)
    // You will need to know the dimensions of your animation frames within the source image to properly use it. 
    // Using x * spriteWidth allows you to cycle through the animation frames
    // Using x * spriteHeight allows you to cycle through which animation you want to play 
    ctx.drawImage(playerImage, frameX , frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    // testing the canvas. fillRect draws a rectangle starting at 50, 50, and with a width and height of 100.
    // ctx.fillRect(x, 50, 100, 100);
    // getting the square to bounce back and forth
    // if(x==CANVAS_WIDTH-100){
    //     y=x;
    //     x=499;
    // }
    // if(x==0){
    //     y=x;
    // }
    // if (x>=y){
    //     y=x;
    //     x++;
    // }
    // if (x<y){
    //     y=x;
    //     x--;
    // }

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


// because the different animation cycles have a different number of sprites, you can either standardize them across the board (which can possibly increase file sizes), you can write specific functions for each action, you can include arguments to specify what you want to do (further, you can build obects that contain the frame positions of the desired animation within the sheet)
animate();