// Constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const PLAYER_SIZE = 50;
const PLAYER_SPEED = 10;
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 600;

// Objects
const player = {
    size: PLAYER_SIZE,
    selectedCharacter: "/assets/img/renard.png",
    x: canvas.width / 2,
    y: canvas.height / 2,
    pv: 100,
    inventory: [],
    spells: [],
    isAlive() {
        return this.pv > 0;
    }
};

const maps = [
    { image: "/assets/img/map1.png" },
    { image: "/assets/img/map2.png" },
    { image: "/assets/img/map3.png" },
    { image: "/assets/img/map4.png" }
];
let currentMapIndex = 0;

// Obstacles
const obstacles = [
    { x: 200, y: 300, width: 50, height: 50 },
    { x: 500, y: 200, width: 70, height: 30 },
];

// Draw the player
function drawPlayer() {
    const playerImg = new Image();
    playerImg.src = player.selectedCharacter;
    ctx.drawImage(playerImg, player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
}

// Draw the map
function drawMap() {
    const map = maps[currentMapIndex];
    const mapImg = new Image();
    mapImg.src = map.image;
    ctx.drawImage(mapImg, 0, 0, MAP_WIDTH, MAP_HEIGHT);
}

// Draw the obstacles
function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Check collisions between player and obstacles
function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.size > obstacle.y
        ) {
            if (player.x < obstacle.x) {
                player.x = obstacle.x - player.size;
            } else if (player.x > obstacle.x) {
                player.x = obstacle.x + obstacle.width;
            }

            if (player.y < obstacle.y) {
                player.y = obstacle.y - player.size;
            } else if (player.y > obstacle.y) {
                player.y = obstacle.y + obstacle.height;
            }
        }
    });
}

// Update the game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw map
    drawMap();

    // Draw player
    drawPlayer();
    
    // Draw obstacles
    drawObstacles();
    
    // Check collisions
    checkCollisions();
    
    requestAnimationFrame(update);
}

// Handle movement events
function handleMovement(event) {
    const keyPressed = event.key;

    if (keyPressed === 'ArrowUp' && player.y - PLAYER_SPEED >= 0) {
        player.y -= PLAYER_SPEED;
    } else if (keyPressed === 'ArrowDown' && player.y + PLAYER_SPEED <= canvas.height) {
        player.y += PLAYER_SPEED;
    } else if (keyPressed === 'ArrowLeft') {
        handleLeftArrow();
    } else if (keyPressed === 'ArrowRight') {
        handleRightArrow();
    }
}

// Handle right arrow movements
function handleRightArrow() {
    if (currentMapIndex === 0 && player.x + PLAYER_SPEED > MAP_WIDTH) {
        currentMapIndex++;
        player.x = PLAYER_SIZE / 2;
    } else if (currentMapIndex >= 1 && currentMapIndex < maps.length - 1 && player.x + PLAYER_SPEED > MAP_WIDTH) {
        currentMapIndex++;
        player.x = PLAYER_SIZE / 2;
    } else if (currentMapIndex === maps.length - 1 && player.x + PLAYER_SPEED > MAP_WIDTH) {
        // Add logic here to prevent the player from moving beyond the boundaries
    } else {
        player.x += PLAYER_SPEED;
    }
}

// Handle left arrow movements
function handleLeftArrow() {
    if (player.x - PLAYER_SPEED >= 0) {
        player.x -= PLAYER_SPEED;
    } else {
        if (currentMapIndex > 0) {
            currentMapIndex--;
            player.x = canvas.width - player.size / 2;
        }
    }
}

// Event listener for movement keys
document.addEventListener('keydown', handleMovement);

// Start the game
update();
