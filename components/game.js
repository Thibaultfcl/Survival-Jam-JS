// Constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const PLAYER_SIZE = 70;
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
    { x: 0, y: 0, width: 1200, height: 50 },
    { x: 0, y: 0, width: 50, height: 200 },
    { x: 0, y: 400, width: 50, height: 200 },
    { x: 0, y: 550, width: 1200, height: 50 },
    { x: 1150, y: 0, width: 50, height: 200 },
    { x: 1150, y: 400, width: 50, height: 200 },
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
    ctx.fillStyle = 'black';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
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

    // Handle Movement
    handleMovement();
    
    requestAnimationFrame(update);
}

// Handle movement events
function handleMovement(event) {

    if (keys['ArrowUp']) {
        if (player.y - PLAYER_SPEED >= 0 && !checkCollision(player.x, player.y - PLAYER_SPEED)) {
            player.y -= PLAYER_SPEED;
        }
    } 
    if (keys['ArrowDown']) {
        if (player.y + PLAYER_SPEED <= canvas.height && !checkCollision(player.x, player.y + PLAYER_SPEED)) {
            player.y += PLAYER_SPEED;
        }
    }
    if (keys['ArrowLeft']) {
        if (!checkCollision(player.x - PLAYER_SPEED, player.y)) {
            handleLeftArrow();
        }
    }
    if (keys['ArrowRight']) {
        if (!checkCollision(player.x + PLAYER_SPEED, player.y)) {
            handleRightArrow();
        }
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

function checkCollision(x, y) {
    let willCollide = false;
    obstacles.forEach(obstacle => {
        if (
            x-20 < obstacle.x + obstacle.width &&
            x+20 > obstacle.x &&
            y-20 < obstacle.y + obstacle.height &&
            y+20 > obstacle.y
        ) {
            willCollide = true;
        }
    });
    return willCollide;
}

// Event listener for movement keys
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Start the game
update();
