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
    _board;
    _snake;
    _food;
    _lastSnakeDirection = "Stop";
    _snakeMovingInterval = new Interval();
    _scoreLabel = document.getElementById("labelScore");
    _level;
    _gameStarted = false;
    _tunnels;

    constructor() {
      let height = Screen.board.height / Settings.unitSize;
      let width = Screen.board.width / Settings.unitSize;
      this._board = new Board(height, width);
      this._snake = new Snake(this._board, Settings.snakeColor);
      this._food = new Food(this._board, Settings.foodColor);
      this.init();
      this.listen();
    }
    init() {
      this._scoreLabel.textContent = 0;
      this._lastSnakeDirection = "Stop";
      Screen.clear();
      this._board.init();
      this._snake.init();
    }
    isMovementKey(keyPressed) {
      return keyPressed == Keys.UP || keyPressed == Keys.DOWN
          || keyPressed == Keys.LEFT || keyPressed == Keys.RIGHT;
    }
    setSnakeDirection(keyPressed) {
      switch (keyPressed) {
        case Keys.UP:
          this._lastSnakeDirection = this._lastSnakeDirection == "Down" ? "Down" : "Up";
          break;
        case Keys.DOWN:
          this._lastSnakeDirection = this._lastSnakeDirection == "Up" ? "Up" : "Down";
          break;
        case Keys.LEFT:
          this._lastSnakeDirection = this._lastSnakeDirection == "Right" ? "Right" : "Left";
          break;
        case Keys.RIGHT:
          this._lastSnakeDirection = this._lastSnakeDirection == "Left" ? "Left" : "Right";
          break;
      }
    }
    listenToUserKeys() {
        document.addEventListener("keydown", (event) => {
          if (!this._gameStarted && this.isMovementKey(event.key)) {
            this._gameStarted = true;
            this.setSnakeDirection(event.key);
            this.start();
          }
          else {
            this.setSnakeDirection(event.key);
          }
        });
    }
    moveSnake() {
      let newHeadPosition = this._snake.head;
      switch (this._lastSnakeDirection) {
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
      if (this._board.inBounds(newHeadPosition) && !this._snake.isBitHimself(newHeadPosition)) {
        if (Position.areEqual(newHeadPosition, this._food.position)) {
          this._scoreLabel.textContent = Number(this._scoreLabel.textContent) + 1;
          this._food.move();
          this._snake.grow(newHeadPosition);
        }
        else if (this._board.inTunnel(newHeadPosition)) {
          let tunnelPosition = [...this._tunnels.keys()].find(position => Position.areEqual(position, newHeadPosition));
          let tunnel = this._tunnels.get(tunnelPosition);
          newHeadPosition.x = tunnel.exitTunnel.position.x + (newHeadPosition.x - this._snake.head.x);
          newHeadPosition.y = tunnel.exitTunnel.position.y + (newHeadPosition.y - this._snake.head.y);
          this._snake.move(newHeadPosition);
        }
        else {
          this._snake.move(newHeadPosition);
        }
      }
      else {
        this._snakeMovingInterval.clearInterval();
        Screen.write("Game Over");
      }
    }
    start() {
      this._level = this.getLevel();
      if (this._level.withTunnels) {
        this.createTunnels();
      }
      this._food.init();
      this._snakeMovingInterval.interval = setInterval(() => this.moveSnake(), this._level.snakeSpeed);
    }
    listenToResetButton() {
      const resetButton = document.getElementById("buttonReset");
      resetButton.addEventListener("click", () => {
        this._snakeMovingInterval.clearInterval();
        this._gameStarted = false;
        this.init();
      });
    }
    listen() {
      this.listenToUserKeys();
      this.listenToResetButton();
    }
    getLevel() {
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
    createTunnels() {
      let tunnel1 = new Tunnel();
      tunnel1.position = new Position(this._board.width / 2, 5);
      
      let tunnel2 = new Tunnel();
      tunnel2.position = new Position(this._board.width / 2, this._board._height - 5);
      
      let tunnel3 = new Tunnel();
      tunnel3.position = new Position(0, 0);

      tunnel1.exitTunnel = tunnel2;
      tunnel2.exitTunnel = tunnel1;
      tunnel3.exitTunnel = tunnel2;

      this._tunnels = new Map();
      this._tunnels.set(tunnel1.position, tunnel1);
      this._tunnels.set(tunnel2.position, tunnel2);
      this._tunnels.set(tunnel3.position, tunnel3);

      for (const tunnel of this._tunnels.values()) {
        this._board.insert(tunnel.position, Entity.TUNNEL);
        Screen.paint(tunnel.position, Settings.tunnelColor);
      }
    }
}
export {Game};