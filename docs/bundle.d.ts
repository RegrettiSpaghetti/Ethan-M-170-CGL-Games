declare let title: string;
declare let description: string;
declare let characters: string[];
declare type Options = {
  isPlayingBgm?: boolean;
  isCapturing?: boolean;
  viewSize?: { x: number; y: number };
  seed?: number;
};
declare let options: Options;
declare function update();

declare let ticks: number;
// difficulty (Starts from 1, increments by a minute)
declare let difficulty: number;
// score
declare let score: number;

// End game
declare function end(): void;

// color
declare type Color =
  | "transparent"
  | "black"
  | "red"
  | "blue"
  | "green"
  | "purple"
  | "cyan"
  | "white";
declare function color(colorName: Color);

// Draw functions return a color bit pattern of overlapping other rectangles.

// Draw rectangle
declare function rect(
  x: number,
  y: number,
  width: number,
  height: number
): number;
declare function rect(x: number, y: number, size: VectorLike): number;
declare function rect(pos: VectorLike, width: number, height: number): number;
declare function rect(pos: VectorLike, size: VectorLike): number;

// Draw box (center-aligned rect)
declare function box(
  x: number,
  y: number,
  width: number,
  height: number
): number;
declare function box(x: number, y: number, size: VectorLike): number;
declare function box(pos: VectorLike, width: number, height: number): number;
declare function box(pos: VectorLike, size: VectorLike): number;

// Draw bar (angled rect)
declare function bar(
  x: number,
  y: number,
  length: number,
  thickness: number,
  rotate: number,
  centerPosRatio?: number
): number;
declare function bar(
  pos: VectorLike,
  length: number,
  thickness: number,
  rotate: number,
  centerPosRatio?: number
): number;

// Draw line
declare function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  thickness?: number
): number;
declare function line(
  x1: number,
  y1: number,
  p2: VectorLike,
  thickness?: number
): number;
declare function line(
  p1: VectorLike,
  x2: number,
  y2: number,
  thickness?: number
): number;
declare function line(
  p1: VectorLike,
  p2: VectorLike,
  thickness?: number
): number;

// Return Vector
declare function vec(x?: number | VectorLike, y?: number): Vector;

// Return random number
declare interface Random {
  get(lowOrHigh?: number, high?: number): number;
  getInt(lowOrHigh?: number, high?: number): number;
  getPlusOrMinus(): number;
  select<T>(values: T[]): T;
}
declare let random: Random;

// Input (mouse, touch, keyboard)
declare interface Input {
  pos: Vector;
  isPressed: boolean;
  isJustPressed: boolean;
  isJustReleased: boolean;
}
declare let input: Input;

// Play sound
declare type SoundEffectType =
  | "coin"
  | "laser"
  | "explosion"
  | "powerUp"
  | "hit"
  | "jump"
  | "select"
  | "lucky";
declare function play(type: SoundEffectType);

declare const PI: number;
declare function abs(v: number): number;
declare function sin(v: number): number;
declare function cos(v: number): number;
declare function atan2(y: number, x: number): number;
declare function pow(b: number, e: number): number;
declare function sqrt(v: number): number;
declare function floor(v: number): number;
declare function round(v: number): number;
declare function ceil(v: number): number;
declare function clamp(v: number, low?: number, high?: number): number;
declare function wrap(v: number, low: number, high: number): number;
declare function range(v: number): number[];

declare interface Vector {
  x: number;
  y: number;
  constructor(x?: number | VectorLike, y?: number);
  set(x?: number | VectorLike, y?: number): this;
  add(x?: number | VectorLike, y?: number): this;
  sub(x?: number | VectorLike, y?: number): this;
  mul(v: number): this;
  div(v: number): this;
  clamp(xLow: number, xHigh: number, yLow: number, yHigh: number): this;
  wrap(xLow: number, xHigh: number, yLow: number, yHigh: number): this;
  addWithAngle(angle: number, length: number): this;
  swapXy(): this;
  normalize(): this;
  rotate(angle: number): this;
  getAngle(to?: VectorLike): number;
  distanceTo(to: VectorLike): number;
  isInRect(x: number, y: number, width: number, height: number): boolean;
  equals(other: VectorLike): boolean;
  floor(): this;
  round(): this;
  ceil(): this;
  length: number;
}

declare interface VectorLike {
  x: number;
  y: number;
}
