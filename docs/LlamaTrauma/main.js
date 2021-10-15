title = "Llama Trauma";

description = `  Spit on 
    your 
 adversaries
`;

characters = [
`

`
];

const G = {

  WIDTH: 200,
  HEIGHT: 60
};

/**
 * @typedef {{
 * pos: Vector,
 * ammoCount: number,
 * isReloading: boolean
 * }} Player
 */

/**
 * @type {Player}
 */
let player;

/**
 * @type {number}
 */
let wavecount;

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  seed: 16,
  isPlayingBgm: true,
  isReplayEnabled: true,
  theme: "simple",
  isCapturing: true,
  isCapturingGameCanvasOnly: true,
  captureCanvasScale: 2
};

function update() {
  if (!ticks) {
    //draw the floor and background
    //initialize the player with values
    //initialize values (arrays, nums like wavecount, etc)
  }

  //spawn enemies / update waveCount
  //update for bg 
  //update and draw player
  //  draw bullets and sheet in here with an if (isjustPressed || isHeld or something)
  //update spit
  //update enemies 
  //COLLISION (BUllETS on ENEMIES)
  //  Sparklies + points etc
  //Collision (bullets on good guys)
}
