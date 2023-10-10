import { Board } from "./Board.js";
import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Position } from "./Position.js";
import { Screen } from "./Screen.js";
import * as Settings from "./Settings.js";
import { Level } from "./Level.js";
import { SnakeSpeeds } from "./SnakeSpeeds.js";
import { Levels } from "./Levels.js";
import { Interval } from "./Interval.js";
import { Tunnel } from "./Tunnel.js";
import { Entity } from "./Entity.js";
import * as Keys from "./Keys.js";
class Game {
    #board;
    #snake;
    #food;
    #lastSnakeDirection = "Stop";
    #snakeMovingInterval = new Interval();
    #scoreLabel = document.getElementById("labelScore");
    #level;
    #gameStarted = false;
    #tunnels;

    constructor() {
      let height = Screen.board.height / Settings.unitSize;
      let width = Screen.board.width / Settings.unitSize;
      this.#board = new Board(height, width);
      this.#snake = new Snake(this.#board, Settings.snakeColor);
      this.#food = new Food(this.#board, Settings.foodColor);
      this.#init();
      this.#listen();
    }
    #init() {
      this.#scoreLabel.textContent = 0;
      this.#lastSnakeDirection = "Stop";
      Screen.clear();
      this.#board.init();
      this.#snake.init();
    }
    #isMovementKey(keyPressed) {
      return keyPressed == Keys.UP || keyPressed == Keys.DOWN
          || keyPressed == Keys.LEFT || keyPressed == Keys.RIGHT;
    }
    #setSnakeDirection(keyPressed) {
      switch (keyPressed) {
        case Keys.UP:
          this.#lastSnakeDirection = this.#lastSnakeDirection == "Down" ? "Down" : "Up";
          break;
        case Keys.DOWN:
          this.#lastSnakeDirection = this.#lastSnakeDirection == "Up" ? "Up" : "Down";
          break;
        case Keys.LEFT:
          this.#lastSnakeDirection = this.#lastSnakeDirection == "Right" ? "Right" : "Left";
          break;
        case Keys.RIGHT:
          this.#lastSnakeDirection = this.#lastSnakeDirection == "Left" ? "Left" : "Right";
          break;
      }
    }
    #listenToUserKeys() {
        document.addEventListener("keydown", (event) => {
          if (!this.#gameStarted && this.#isMovementKey(event.key)) {
            this.#gameStarted = true;
            this.#setSnakeDirection(event.key);
            this.start();
          }
          else {
            this.#setSnakeDirection(event.key);
          }
        });
    }
    #moveSnake() {
      let newHeadPosition = this.#snake.head;
      switch (this.#lastSnakeDirection) {
        case "Up":
          newHeadPosition = new Position(newHeadPosition.x, newHeadPosition.y - 1);
          break;
        case "Down":
          newHeadPosition = new Position(newHeadPosition.x, newHeadPosition.y + 1);
          break;
        case "Left":
          newHeadPosition = new Position(newHeadPosition.x - 1, newHeadPosition.y);
          break;
        case "Right":
          newHeadPosition = new Position(newHeadPosition.x + 1, newHeadPosition.y);
          break;
        case "Stop":
          return;
      }
      if (this.#board.inBounds(newHeadPosition) && !this.#snake.isBitHimself(newHeadPosition)) {
        if (Position.areEqual(newHeadPosition, this.#food.position)) {
          this.#scoreLabel.textContent = Number(this.#scoreLabel.textContent) + 1;
          this.#food.move();
          this.#snake.grow(newHeadPosition);
        }
        else if (this.#board.inTunnel(newHeadPosition)) {
          let tunnelPosition = [...this.#tunnels.keys()].find(position => Position.areEqual(position, newHeadPosition));
          let tunnel = this.#tunnels.get(tunnelPosition);
          newHeadPosition.x = tunnel.exitTunnel.position.x + (newHeadPosition.x - this.#snake.head.x);
          newHeadPosition.y = tunnel.exitTunnel.position.y + (newHeadPosition.y - this.#snake.head.y);
          this.#snake.move(newHeadPosition);
        }
        else {
          this.#snake.move(newHeadPosition);
        }
      }
      else {
        this.#snakeMovingInterval.clearInterval();
        Screen.write("Game Over");
      }
    }
    start() {
      this.#level = this.#getLevel();
      if (this.#level.withTunnels) {
        this.#createTunnels();
      }
      this.#food.init();
      this.#snakeMovingInterval.interval = setInterval(() => this.#moveSnake(), this.#level.snakeSpeed);
    }
    #listenToResetButton() {
      const resetButton = document.getElementById("buttonReset");
      resetButton.addEventListener("click", () => {
        this.#snakeMovingInterval.clearInterval();
        this.#gameStarted = false;
        this.#init();
      });
    }
    #listen() {
      this.#listenToUserKeys();
      this.#listenToResetButton();
    }
    #getLevel() {
      let level = new Level();
      const buttonLevel = document.getElementById("buttonLevel");
      switch (buttonLevel.textContent) {
        case Levels.EASY:
          level.snakeSpeed = SnakeSpeeds.MEDIUM;
          level.withTunnels = false;
          break;
        case Levels.MEDIUM:
          level.snakeSpeed = SnakeSpeeds.MEDIUM;
          level.withTunnels = true;
          break;
        case Levels.HARD:
          level.snakeSpeed = SnakeSpeeds.FAST;
          level.withTunnels = true;
          break;
      }
      return level;
    }
    #createTunnels() {
      let tunnel1 = new Tunnel();
      tunnel1.position = new Position(this.#board.width / 2, 5);
      
      let tunnel2 = new Tunnel();
      tunnel2.position = new Position(this.#board.width / 2, this.#board.height - 5);
      
      let tunnel3 = new Tunnel();
      tunnel3.position = new Position(0, 0);

      tunnel1.exitTunnel = tunnel2;
      tunnel2.exitTunnel = tunnel1;
      tunnel3.exitTunnel = tunnel2;

      this.#tunnels = new Map();
      this.#tunnels.set(tunnel1.position, tunnel1);
      this.#tunnels.set(tunnel2.position, tunnel2);
      this.#tunnels.set(tunnel3.position, tunnel3);

      for (const tunnel of this.#tunnels.values()) {
        this.#board.insert(tunnel.position, Entity.TUNNEL);
        Screen.paint(tunnel.position, Settings.tunnelColor);
      }
    }
}
export {Game};