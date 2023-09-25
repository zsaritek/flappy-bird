class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.gravity = 0.1; // Set the gravity value
        this.gravitySpeed = 0; // Set the initial gravity speed
        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        this.playAudio = document.createElement("audio");
        this.playAudio.id = 'playAudio';
        this.playAudio.src = '../audio/game_play.mp3';
        this.playAudio.loop = true;

        this.gameScreen.appendChild(this.element);
        this.gameScreen.appendChild(this.playAudio);
    }
    jump() {
        this.gravitySpeed = -3; // Adjust this value to control the jump height vertically-the positive y-direction is downwards,
        // so a negative value in the y - component represents an upward movement.
    }
    didCollide(obstacle) {
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.x < obstacleRect.x + obstacleRect.width &&
            playerRect.x + playerRect.width > obstacleRect.x &&
            playerRect.y < obstacleRect.y + obstacleRect.height &&
            playerRect.y + playerRect.height > obstacleRect.y
        ) {
            return true;
        } else {
            return false;
        }
    } //check whether the player has collided with an obstacle in the game
    updatePosition() {
        this.gravitySpeed += this.gravity;
        this.top += this.gravitySpeed;

        // if no space left at top, set it zero. 
        if (this.top < 0) {
            this.top = 0;
        }
        this.element.style.top = `${this.top}px`;
    }
}
