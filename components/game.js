// Constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const PLAYER_SIZE = 70;
const PLAYER_SPEED = 5;
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 600;

const player = {
    size: PLAYER_SIZE,
    character: null,
    x: canvas.width / 2,
    y: canvas.height / 2,
    pv: 100,
    inventory: [],
    spells: [],
    isAlive() {
        return this.pv > 0;
    }
};

const ennemy1 = {
    size: PLAYER_SIZE,
    character: "/assets/img/ennemy.png",
    x: 900,
    y: 300,
    map: 1,
    pv: 25,
    isAlive() {
        return this.pv > 0;
    }
}

// Maps
const maps = [
    { image: "/assets/img/map1.png" },
    { image: "/assets/img/map2.png" },
    { image: "/assets/img/map3.png" },
    { image: "/assets/img/map4.png" }
];
let currentMapIndex = 0;

// Obstacles
const obstacles = {
    1 : [
        { x: 0, y: 0, width: 1200, height: 50 },
        { x: 0, y: 0, width: 50, height: 600 },
        { x: 0, y: 550, width: 1200, height: 50 },
        { x: 1150, y: 0, width: 50, height: 200 },
        { x: 1150, y: 400, width: 50, height: 200 },
    ],
    2 : [
        { x: 0, y: 0, width: 1200, height: 50 },
        { x: 0, y: 0, width: 50, height: 200 },
        { x: 0, y: 400, width: 50, height: 200 },
        { x: 0, y: 550, width: 1200, height: 50 },
        { x: 1150, y: 0, width: 50, height: 200 },
        { x: 1150, y: 400, width: 50, height: 200 },
    ],
    3 : [
        { x: 0, y: 0, width: 1200, height: 50 },
        { x: 0, y: 0, width: 50, height: 200 },
        { x: 0, y: 400, width: 50, height: 200 },
        { x: 0, y: 550, width: 1200, height: 50 },
        { x: 1150, y: 0, width: 50, height: 200 },
        { x: 1150, y: 400, width: 50, height: 200 },
    ],
    4 : [
        { x: 0, y: 0, width: 1200, height: 50 },
        { x: 0, y: 0, width: 50, height: 200 },
        { x: 0, y: 400, width: 50, height: 200 },
        { x: 0, y: 550, width: 1200, height: 50 },
        { x: 1150, y: 0, width: 50, height: 600 },
    ],
};

// Draw the player
function drawPlayer() {
    const playerImg = new Image();
    playerImg.src = player.character;
    ctx.drawImage(playerImg, player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
}

//Draw the ennemy
function drawEnnemy(ennemy) {
    if (ennemy.map == currentMapIndex) {
        const ennemyImg = new Image();
        ennemyImg.src = ennemy.character;
        ctx.drawImage(ennemyImg, ennemy.x - ennemy.size / 2, ennemy.y - ennemy.size / 2, ennemy.size, ennemy.size);
    }
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
    const currentMapObstacles = obstacles[currentMapIndex+1];
    currentMapObstacles.forEach(obstacle => {
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

    // Draw ennemy
    drawEnnemy(ennemy1);
    
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
    const currentMapObstacles = obstacles[currentMapIndex+1];
    currentMapObstacles.forEach(obstacle => {
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
function startGame(selectedCharacter) {
    player.character = selectedCharacter;
    update();
}
