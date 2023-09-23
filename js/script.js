window.onload = function () {  // this method applicable once time when the screen open it.
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });


  function startGame() {
    game = new Game();

    game.start();
  }
  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    location.reload();//for refresh the page 
  }

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      game.player.jump();
    }
  });
};
