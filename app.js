document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const width = 28; // 28x28 squares
  let score = 0;
  let pacDots = 238;
  // layout of grid and what is in the squares
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ];

  const squares = [];

  // Legend
  // 0 - pac-dot
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 empty

  // draw the grid and render it
  function createBoard() {
    layout.forEach((_, index) => {
      const square = document.createElement('div');
      grid.appendChild(square)
      squares.push(square);

      // add layout to the board
      if (layout[index] === 0) {
        squares[index].classList.add('pac-dot');
      } else if (layout[index] === 1) {
        squares[index].classList.add('wall');
      } else if (layout[index] === 2) {
        squares[index].classList.add('ghost-lair');
      } else if (layout[index] === 3) {
        squares[index].classList.add('power-pellet');
      }
    });
  }

  createBoard();

  // starting position of pac-man
  let pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add('pac-man');

  // let blinkyCurrentIndex = 197;
  // squares[blinkyCurrentIndex].classList.add('blinky')

  // move pac-man
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man');

    switch (e.key) {
      case 'ArrowLeft': // turn left
        if (
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
        ) pacmanCurrentIndex -= 1;

        // check if pacman is in the left exit
        if (pacmanCurrentIndex - 1 === 363) {
          pacmanCurrentIndex = 391;
        }

        break;
      case 'ArrowUp': // turn up
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
        ) pacmanCurrentIndex -= width;
        break;
      case 'ArrowRight': // turn right
        if (
          pacmanCurrentIndex % width < width -1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
        ) pacmanCurrentIndex += 1;

        // check if pacman is in the right exit
        if (pacmanCurrentIndex + 1 === 392) {
          pacmanCurrentIndex = 364;
        }

        break;
      case 'ArrowDown': // turn down
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
        ) pacmanCurrentIndex += width;
        break;
    }

    squares[pacmanCurrentIndex].classList.add('pac-man');

    pacDotEaten();
    powerPelletEaten();
    checkForGameOver();
    checkForWin();
  }

  document.addEventListener('keyup', movePacman);

  // what happens when Pac-man eats a pac-dot
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++;
      pacDots -= 1;
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
  }

  // what happens when you eat a power-pellet
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score += 10;
      pacDots -= 1;
      scoreDisplay.innerHTML = score;
      ghosts.forEach(ghost => ghost.isScared = true);
      setTimeout(unScaredGhosts, 10000);
      squares[pacmanCurrentIndex].classList.remove('power-pellet');
    }
  }

  // make the ghosts stop appearing as aquamarine
  function unScaredGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
  }

  // create our Ghost template
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.timerid = NaN;
      this.isScared = false;
    }
  }

  const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500),
  ];

  // draw my ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
  });

  // get Coordinates of pacman or ghost
  function getCoordinates(index) {
    return [index % width, Math.floor(index / width)];
  }

  // smart logic move ghost
  /*function smartMoveGhost(ghost) {
    const directions = [-1, +1 , width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
      if (
        !squares[ghost.currentIndex + direction].classList.contains('wall') &&
        !squares[ghost.currentIndex + direction].classList.contains('ghost')
      ) {
        // remove ghost class
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');

        // check if the new space is closer
        const [ghostX, ghostY] = getCoordinates(ghost.currentIndex);
        const [pacManX, pacManY] = getCoordinates(pacmanCurrentIndex);
        const [ghostNewX, ghostNewY] = getCoordinates(ghost.currentIndex + direction);

        function isXCoordinationCloser() {
          return (ghostNewX - pacManX) > (ghostX - pacManX);
        }

        function isYCoordinationCloser() {
          return (ghostNewY - pacManY) > (ghostY - pacManY);
        }

        if (isXCoordinationCloser() || isYCoordinationCloser()) {
          ghost.currentIndex += direction;
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        } else {
          squares[ghost.currentIndex].classList.add(ghost.className);
          direction = directions[Math.floor(Math.random() * directions.length)];
        }

        squares[ghost.currentIndex].classList.add(ghost.className);
      } else direction = directions[Math.floor(Math.random() * directions.length)];

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost');
      }

      // if the ghosts scared and pacman runs into it
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        scoreDisplay.innerHTML = score;
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      }

      checkForGameOver();
    }, ghost.speed);
  }*/

  // move ALL the ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost));

  // write the function to move the ghost
  function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
      // if the next square your ghost is going to go in does NOT contain a wall and a ghost,
      if (
        !squares[ghost.currentIndex + direction].classList.contains('wall') &&
        !squares[ghost.currentIndex + direction].classList.contains('ghost')
      ) {
        // you can go there
        // remove all ghost related classes
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        // change the currentIndex to the new safe square
        ghost.currentIndex += direction;
        // redraw the ghost in the new safe space
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');


        // else find a new direction to try
      } else direction = directions[Math.floor(Math.random() * directions.length)];

      // if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost');
      }

      // if the ghosts scared and pacman runs into it
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        scoreDisplay.innerHTML = score;
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      }
      checkForGameOver();
    }, ghost.speed);
  }

  // check for a game over
  function checkForGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId));
      document.removeEventListener('keyup', movePacman)
      setTimeout(function () {
        alert(`GAME OVER! YOUR SCORE:${score}`)
      }, 500);
    }
  }

  // check for a win
  function checkForWin() {
    if (pacDots === 0) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId));
      document.removeEventListener('keyup', movePacman)
      setTimeout(function () {
        alert(`YOU HAVE WON! YOUR SCORE:${score}`)
      }, 500);
    }
  }
});
