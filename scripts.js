// Select all balloons
const numberOfBalloons = 10; // Increase the number of balloons
    const popSound = document.getElementById('popSound');
    const highScoreElement = document.getElementById('highScoreValue');
    let highScore = localStorage.getItem('highScore') || null; // Retrieve high score from localStorage
    let balloons = [];
    let poppedBalloons = 0;
    let startTime;
    let speedMultiplier = 1;

    if (highScore) {
      highScoreElement.textContent = highScore;
    }

    // Initialize balloons
    function createBalloons() {
      for (let i = 0; i < numberOfBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = getRandomColor();
        balloon.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        balloon.style.left = Math.random() * (window.innerWidth - 50) + 'px';
        balloon.id = 'balloon' + (i + 1);
        document.body.appendChild(balloon);
        balloons.push(balloon);

        moveBalloon(balloon);
        balloon.addEventListener('click', popBalloon);
      }
    }

    function startGame() {
      startTime = Date.now(); // Record the start time of the game
      createBalloons(); // Create balloons
    }

    function getRandomColor() {
      const colors = ['red', 'yellow', 'green', 'blue', 'purple', 'orange', 'pink', 'brown', 'cyan', 'magenta'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

// Function to move balloons
function moveBalloon(balloon) {
  let deltaX = Math.random() * 2 - 1; // Horizontal movement (-1 to 1)
  let deltaY = Math.random() * 2 - 1; // Vertical movement (-1 to 1)

  function animateBalloon() {
    // Get current position
    let currentX = parseFloat(balloon.style.left);
    let currentY = parseFloat(balloon.style.top);

    // Update position
    currentX += deltaX * speedMultiplier;
    currentY += deltaY * speedMultiplier;

    // Keep balloons within bounds of the window
    if (currentX <= 0 || currentX >= window.innerWidth - 50) {
      deltaX *= -1; // Reverse direction on horizontal bounds
    }
    if (currentY <= 0 || currentY >= window.innerHeight - 100) {
      deltaY *= -1; // Reverse direction on vertical bounds
    }

    balloon.style.left = currentX + 'px';
    balloon.style.top = currentY + 'px';

    // Continue animating if balloon is not popped
    if (balloon.style.display !== 'none') {
      requestAnimationFrame(animateBalloon);
    }
  }

  animateBalloon(); // Start the animation loop
}

// Function to pop a balloon
function popBalloon(event) {
  const balloon = event.target;
  balloon.style.display = 'none'; // Hide balloon
  poppedBalloons++; // Increment popped balloons count

  // Speed up remaining balloons
  speedMultiplier += 0.5;

  // Check if all balloons are popped
  if (poppedBalloons === balloons.length) {
    endGame();
  }
}

// Function to end the game
function endGame() {
  const endTime = Date.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time taken in seconds

  // Show game over message
  const gameOverMessage = document.getElementById('gameOverMessage');
  const timeTakenElement = document.getElementById('timeTaken');
  timeTakenElement.textContent = timeTaken;
  gameOverMessage.style.display = 'block';

  if (!highScore || timeTaken < highScore) {
    highScore = timeTaken;
    localStorage.setItem('highScore', highScore);
    highScoreElement.textContent = highScore;
  }
}

// Start the game on page load
window.onload = startGame;