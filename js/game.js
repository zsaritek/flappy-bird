class Game {
    constructor() {
        this.startScreen = document.querySelector("#game-intro");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.querySelector("#game-end");
        this.height = 800;
        this.width = 1500;

        this.player = new Player(this.gameScreen,
            120, //from left
            this.height / 2, //from top
            50, //bird width
            80, //bird height
            "./images/flappy.png");
        this.gameIsOver = false;
        this.score = 0;
        this.obstacles = [];
        this.gameOverSound = new Audio("../audio/game_over.mp3")
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.player.playAudio.play();
        this.gameLoop();
    }

    gameLoop() {
        if (this.gameIsOver) {
            return
        }
        this.update(); // check for collisions
        window.requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.player.updatePosition();

        let minHeight = this.height - 80; //max space from map top
        if (this.player.top > minHeight) {
            this.endGame()
        }

        // Check for collision and if an obstacle is still on the screen
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (obstacle.left < 0) {
                // Remove the obstacle from the DOM
                obstacle.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1);
                // Update the counter variable to account for the removed obstacle
                i--;
            }

            if (this.player.didCollide(obstacle.topElement)) {
                this.endGame()
            }
            if (this.player.didCollide(obstacle.bottomElement)) {
                this.endGame()
            }
        }

        // Create a new obstacle when there is no other obstacles on the screen
        if (this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
        //get the last element of array 
        let lastObstacle = this.obstacles[this.obstacles.length - 1];
        let rightSpace = this.width - (lastObstacle.left + lastObstacle.width)
        if (Math.random() > 0.98 && rightSpace > 500) { // pixel
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
    }

    endGame() {
        this.gameIsOver = true;
        this.player.playAudio.pause();

        this.gameOverSound.play();
        this.player.element.remove();
        this.player.playAudio.remove();

        this.obstacles.forEach(function (obstacle) {
            obstacle.topElement.remove();
            obstacle.bottomElement.remove();
        });
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block";
    }

    //https://tenor.com/view/flappy-bird-gif-25698881 
}