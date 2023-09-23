class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.width = 100; //obstacle width
        this.height = 800; //map height
        this.gapHeight = 200; //gap between top and bottom pipes
        /* top and bottom element should min 100 pixel */
        this.topElementHeight = Math.floor(Math.random() * 400 + 100);
        this.initialLeft = 1400; //space between obstacle and left part of the map
        this.left = 1400;

        this.speed = 2;

        this.topElement = document.createElement("img");
        this.bottomElement = document.createElement("img");

        this.topElement.src = "./images/obstacle_top.png";
        this.bottomElement.src = "./images/obstacle_bottom.png";

        this.topElement.style.position = "absolute";
        this.bottomElement.style.position = "absolute";

        this.topElement.style.width = `${this.width}px`;
        this.bottomElement.style.width = `${this.width}px`;

        this.topElement.style.height = `${this.topElementHeight}px`;
        this.bottomElement.style.height = `${this.height - this.topElementHeight - this.gapHeight}px`;

        this.topElement.style.left = `${this.initialLeft}px`;
        this.bottomElement.style.left = `${this.initialLeft}px`;

        this.topElement.style.top = `0`;
        this.bottomElement.style.bottom = `0`;

        this.gameScreen.appendChild(this.topElement);
        this.gameScreen.appendChild(this.bottomElement);
    }

    move() {
        const currentLeft = parseInt(this.topElement.style.left, 10);
        this.left = currentLeft - this.speed;
        this.topElement.style.left = `${this.left}px`;
        this.bottomElement.style.left = `${this.left}px`;
    }

    remove() {
        if (this.topElement) {
            this.topElement.remove()
        }

        if (this.bottomElement) {
            this.bottomElement.remove()
        }
    }
}
