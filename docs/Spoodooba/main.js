title = "CHARGE RUSH";

description = `
Destroy enemies.
`;

characters = [
`
  ll
  ll
PPLLPP  
ppllpp 
ppllpp 
pp  pp
`,`
rr  rr
rrrrrr
rrpprr
rrrrrr
  rr  
  rr
`,`
y  y
yyyyyy
 y  y
yyyyyy
 y  y
`  
];

const G = {
   WIDTH: 100, 
   HEIGHT: 150,

   STAR_SPEED_MIN: 0.5,
   STAR_SPEED_MAX: 2.0,

   ENEMY_MIN_BASE_SPEED: 1.0,
   ENEMY_MAX_BASE_SPEED: 2.0,
   ENEMY_FIRE_RATE: 45,

   EBULLET_SPEED: 2.0,
   EBULLET_ROTATION_SPD: 0.1,

   PLAYER_FIRE_RATE: 4,
   PLAYER_GUN_OFFSET: 3,

   FBULLET_SPEED: 5
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  seed: 16,
  isPlayingBgm: true,
  isReplayEnabled: true,
  theme: "dark",
  isCapturing: true,
  isCapturingGameCanvasOnly: true,
  captureCanvasScale: 2
};

/**
 * @typedef {{
 * pos: Vector, 
 * speed: number
 * }} Star
 */

/**
 * @type { Star [] }
 */
let stars;

/**
 * @typedef {{
 * pos: Vector, 
 * firingCooldown: number,
 * isFiringLeft: boolean
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector
 * }} FBullet
 */

/**
 * @type { FBullet [] }
 */
let fBullets;

/**
 * @typedef {{
 * pos: Vector,
 * firingCooldown: number
 * }} Enemy
 */

/**
 * @type { Enemy[] }
 */
let enemies;

/**
 * @type { number}
 */
let currentEnemySpeed;

/**
 * @type { number}
 */
 let waveCount;

/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * rotation: number
 * }} EBullet
 */

/**
 * @type { EBullet [] }
 */
let eBullets;

//the game loop
function update() {
  // the init function running at startup
    if (!ticks) {
      waveCount = 0;
      stars = times(20, () => {
        const posX = rnd (0, G.WIDTH);
        const posY = rnd (0, G.HEIGHT);
        // an obj of type Star with appropriate properties
        return {
          // creater a vector
          pos: vec(posX, posY),
          //more RNG
          speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
        };
      }); 

      player = {
        pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
        firingCooldown: G.PLAYER_FIRE_RATE,
        isFiringLeft: true
      };

      fBullets = [];

      //initialize values of enemies
      enemies = [];
      waveCount = 0;
      currentEnemySpeed = 0;
      eBullets = [];
  }

  //enemy SETUP
  if (enemies.length === 0) {
    currentEnemySpeed =
      rnd(G.ENEMY_MIN_BASE_SPEED, G.ENEMY_MAX_BASE_SPEED) * difficulty;
    for (let i = 0; i < 9; i++) {
      const posX = rnd(0, G.WIDTH);
      const posY = -rnd(i * G.HEIGHT * 0.1);
      enemies.push({ 
        pos: vec(posX, posY), 
        firingCooldown: G.ENEMY_FIRE_RATE
      })
    }

    waveCount++; //increase the tracking variable by one

  }

  //Update for star
  stars.forEach((s) => {
    //move star down
    s.pos.y += s.speed;
    //bring star back 2 top once it hits bottom
    s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

    //choose a color 2 draw
    color("light_cyan");
    //draw star as a square of size 1
    box(s.pos, 1);
  });

  //Update and draw player
  player.pos = vec(input.pos.x, input.pos.y);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  //cooling down 4 next shot
  player.firingCooldown--;
  //time 2 fire!
  if (player.firingCooldown <= 0) {
    //get side from which bullet is fired
    const offset = (player.isFiringLeft)
      ? -G.PLAYER_GUN_OFFSET
      : G.PLAYER_GUN_OFFSET;
    //create bullet
    fBullets.push({
      pos: vec(player.pos.x + offset, player.pos.y)
    });
    //reset cooldown
    player.firingCooldown = G.PLAYER_FIRE_RATE;
    //switch side gun is firing on
    player.isFiringLeft = !player.isFiringLeft;

    color("light_yellow");
    //generate the sparklies
    particle(
      player.pos.x + offset, //x coord
      player.pos.y, //y coord
      4, //num particles
      1, //speed or particles
      -PI/2, //Emmiting angle
      PI/4 //Emmiting width
    );
  }
  //draw the player
  color("black");
  //PLAYER TIME
  char("a", player.pos);

  //Updating and drawing bullets
  fBullets.forEach((fb) => {
    //move fbulls forward
    fb.pos.y -= G.FBULLET_SPEED;
    //Drawing them
    color("yellow");
    box(fb.pos, 2);
  });

  //update enemies
  remove(enemies, (e) => {
    e.pos.y += currentEnemySpeed;
    e.firingCooldown--;
    if (e.firingCooldown <= 0) {
      eBullets.push({
        pos: vec(e.pos.x, e.pos.y),
        angle: e.pos.angleTo(player.pos),
        rotation: rnd()
      });
      e.firingCooldown = G.ENEMY_FIRE_RATE;
      play("select");
    }

    color("black");
    //shorthand to check 4 coillison vs another specific type
    //also draw the spire
    const isCollidingWithFBullets = char("b", e.pos).isColliding.rect.yellow;

    //check whether 2 make a small explosion @ posit
    if (isCollidingWithFBullets) {
      color("yellow");
      particle(e.pos);
      play("explosion"); 
      addScore(10 * waveCount, e.pos);
    }

    const isCollidingWithPlayer = char("b", e.pos).isColliding.char.a
    if (isCollidingWithPlayer) {
      end();
      play("powerUp");
    }

    //also another condition 2 remove obj
    return (isCollidingWithFBullets || e.pos.y > G.HEIGHT);
  });
  
  //remove bullets
  remove(fBullets, (fb) =>  {
    color("yellow");
    const isCollidingWithEnemies = box(fb.pos, 2).isColliding.char.b;
    return (isCollidingWithEnemies || fb.pos.y < 0);
  });

  remove(eBullets, (eb) => {
    //old fashiponed trig to find velo on axis
    eb.pos.x += G.EBULLET_SPEED * Math.cos(eb.angle);
    eb.pos.y += G.EBULLET_SPEED * Math.sin(eb.angle);
    //bullet also rotates around itself
    eb.rotation += G.EBULLET_ROTATION_SPD;

    color("red");
    const isCollidingWithPlayer
      = char("c", eb.pos, {rotation: eb.rotation}).isColliding.char.a;

    if (isCollidingWithPlayer) {
      //end game!!!
      end();
      //Sarcasml also unintended audio that sounds good in gameplay
      play("powerUp");
    }

    const isCollidingWithFBullets
      = char("c", eb.pos, {rotation: eb.rotation}).isColliding.rect.yellow;
      if (isCollidingWithFBullets) addScore(1, eb.pos);

    //if eBullet is not onscreen, DELETE
    return (!eb.pos.isInRect(0, 0, G.WIDTH, G.HEIGHT));
  });
}
