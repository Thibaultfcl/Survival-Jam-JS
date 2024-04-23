const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const offset = {
    x: -450,
    y: -2722
};

//music
let audioStarted = false;

function startAudio() {
    if (!audioStarted) {
        audio.Map.play();
        audioStarted = true;
    }
}
function createEnemy(x, y, image, frames, imageLeft, framesLeft, imageRight, framesRight, motion) {
    const sprites = imageLeft !== imageRight ? { left: imageLeft, right: imageRight } : { left: image, right: image };
    const framesSprites = imageLeft !== imageRight ? { left: framesLeft, right: framesRight } : { left: frames, right: frames };

    const enemy = new Sprite({
        position: { x, y },
        image: image,
        frames: frames,
        sprites: sprites,
        animate: true
    });

    if (motion) {
        ennemieswithmotion.push(enemy);
    } else {
        ennemiesmotionless.push(enemy);
    }


    return enemy;
}

//list for all monster with motion and motionless
const ennemieswithmotion = [];
const ennemiesmotionless = [];

function checkEnemyCollision(animationID) {
    ennemieswithmotion.forEach(enemy => {
    if (
        rectangleCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && !enemy.isDead
    ) {
        window.cancelAnimationFrame(animationID);
        audio.Map.stop();
        audio.Transibattle.play();
        battle.initiated = true;
        document.getElementById('transitionDiv').classList.add('show-transition');
        document.getElementById('transitionDiv').addEventListener('animationend', function() {
            animateBattle(enemy);
        }, { once: true });
    }
});
    ennemiesmotionless.forEach(enemy => {
    if (
        rectangleCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && !enemy.isDead
    ) {
        window.cancelAnimationFrame(animationID);
        audio.Map.stop();
        audio.Transibattle.play();
        battle.initiated = true;
        document.getElementById('transitionDiv').classList.add('show-transition');
        document.getElementById('transitionDiv').addEventListener('animationend', function() {
            animateBattle(enemy);
        }, { once: true });
    }
});
}

function moveEnemy(ennemyBoundaries) {
    ennemieswithmotion.forEach(enemy => {
        if (enemy.movingLeft) {
            if (rectangleCollision({ rectangle1: enemy, rectangle2: ennemyBoundaries[0]})||
                rectangleCollision({ rectangle1: enemy, rectangle2: ennemyBoundaries[2] })||
                rectangleCollision({ rectangle1: enemy, rectangle2: ennemyBoundaries[4] })) {
                enemy.movingLeft = false;
                enemy.image = enemy.sprites.left;
            } else {
                enemy.position.x -= 0.5;
            }
        } else {
            if (rectangleCollision({ rectangle1: enemy, rectangle2: ennemyBoundaries[1]})||
                rectangleCollision({ rectangle1: enemy, rectangle2: ennemyBoundaries[3]})||
                rectangleCollision({ rectangle1: enemy, rectangle2: ennemyBoundaries[5]})) {
                enemy.movingLeft = true;
                enemy.image = enemy.sprites.right;
            } else {
                enemy.position.x += 0.5;
            }
        }
    });
}

function pancartes() {
    document.querySelector('#pancartes').style.display = 'none'
    document.querySelector('#pancarteBox').style.display = 'none'

    pancarte1.forEach((boundary) => {
        if(rectangleCollision({
            rectangle1: player,
            rectangle2: boundary
        })) {
            document.querySelector('#pancartes').style.display = 'block'
            document.querySelector('#pancarteBox').style.display = 'block'
            document.querySelector('#pancarteBox').innerHTML = 'Pancarte 1 text'
        }
    });
    pancarte2.forEach((boundary) => {
        if(rectangleCollision({
            rectangle1: player,
            rectangle2: boundary
        })) {
            document.querySelector('#pancartes').style.display = 'block'
            document.querySelector('#pancarteBox').style.display = 'block'
            document.querySelector('#pancarteBox').innerHTML = 'Pancarte 2 text'
        }
    });
    pancarte3.forEach((boundary) => {
        if(rectangleCollision({
            rectangle1: player,
            rectangle2: boundary
        })) {
            document.querySelector('#pancartes').style.display = 'block'
            document.querySelector('#pancarteBox').style.display = 'block'
            document.querySelector('#pancarteBox').innerHTML = 'Pancarte 3 text'
        }
    });
}


addEventListener('click', startAudio);

const image = new Image();
image.src = "./img/map.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/foreground.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const ennemyImage = new Image();
ennemyImage.src = "./img/ennemy.png";

const ennemyImage2 = new Image();
ennemyImage2.src = "./img/ennemy2.png";

const ennemy2Image = new Image();
ennemy2Image.src = "./img/ennemy.png";

const ennemy2Image2 = new Image();
ennemy2Image2.src = "./img/ennemy2.png";

const ennemy3Image = new Image();
ennemy3Image.src = "./img/demonright.png";

const ennemy3Image2 = new Image();
ennemy3Image2.src = "./img/demonleft.png";

const ennemy4Image = new Image();
ennemy4Image.src = "./img/Evilgod.png"

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 20
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage,
    }
});

createEnemy(1200, 80, ennemyImage, { max: 13, hold: 10 }, ennemy2Image, { max: 13, hold: 10 }, ennemy2Image2, { max: 13, hold: 10 }, true); 
createEnemy(1100, -150, ennemy2Image, { max: 13, hold: 10 }, ennemy2Image, { max: 13, hold: 10 }, ennemy2Image2, { max: 13, hold: 10 }, true); 
createEnemy(300, -680, ennemy3Image, { max: 6, hold: 50 }, ennemy3Image, { max: 6, hold: 50 }, ennemy3Image2, { max: 6, hold: 40 }, true); 
createEnemy(5050, -750, ennemy4Image, { max: 1, hold: 1 }, ennemy4Image, { max: 1, hold: 1 }, ennemy4Image, { max: 1, hold: 1 }, false); 

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const collisionMap = [];
for (let i = 0; i < collision.length; i += 139) {
    collisionMap.push(collision.slice(i, 139 + i));
}

const boundaries = [];
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2102)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width - 450,
                        y: i * Boundary.height - 2722
                    }
                })
            );
    });
});

const ennemyBoundaries = [];
ennemyBoundaries.push(
    new Boundary({
        position: {
            x: 1150,
            y: 110
        }
    }),
    new Boundary({
        position: {
            x: 1900,
            y: 110
        }
    }),
    new Boundary({
        position: {
            x: 900,
            y: -100
        }
    }),
    new Boundary({
        position: {
            x: 1500,
            y: -100
        }
    }),
    new Boundary({
        position: {
            x: 220,
            y: -600
        }
    }),
    new Boundary({
        position: {
            x: 800,
            y: -600
        }
    })
);
const pancarte1 = [];
pancarte1.push(
    new Boundary({
        position: {
            x: 4350,
            y: 110
        }
    }),
    new Boundary({
        position: {
            x: 4398,
            y: 110
        }
    })
)

const pancarte2 = [];
pancarte2.push(
    new Boundary({
        position: {
            x: 4850,
            y: 150
        }
    }),
    new Boundary({
        position: {
            x: 4898,
            y: 150
        }
    }),
    new Boundary({
        position: {
            x: 4946,
            y: 150
        }
    }),
)

const pancarte3 = [];
pancarte3.push(
    new Boundary({
        position: {
            x: 5260,
            y: 110
        }
    }),
    new Boundary({
        position: {
            x: 5308,
            y: 110
        }
    })
)

const movables = [background, ...boundaries, foreground, ...ennemieswithmotion, ...ennemiesmotionless, ...ennemyBoundaries, ...pancarte1, ...pancarte2, ...pancarte3];

function rectangleCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}

const keys = {
    z: {
        presser: false
    },
    q: {
        presser: false
    },
    s: {
        presser: false
    },
    d: {
        presser: false
    },
};

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'z':
        case 'Z':
        case 'ArrowUp':
            keys.z.presser = true;
            break;
        case 'q':
        case 'Q':
        case 'ArrowLeft':
            keys.q.presser = true;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            keys.s.presser = true;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.presser = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'z':
        case 'Z':
        case 'ArrowUp':
            keys.z.presser = false;
            break;
        case 'q':
        case 'Q':
        case 'ArrowLeft':
            keys.q.presser = false;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            keys.s.presser = false;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.presser = false;
            break;
    }
});

const battle = {
    initiated: false
};

let mooveLeft = true;
let crosse = false;
let passage_map_active = true;
let isFirstMapVisible = true;

function deplacement() {
    let moving = true;
    player.animate = false

    //player movement
    if (keys.z.presser) {
        player.animate = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 5
                        }
                    }
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 5;
            });
        }
    } else if (keys.q.presser) {
        player.animate = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 5,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 5;
            });
        }
    } else if (keys.s.presser) {
        player.animate = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 5
                        }
                    }
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 5;
            });
        }
    } else if (keys.d.presser) {
        player.animate = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 5,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 5;
            });
        }
    }
}

function firstMap() {
    const animationID = window.requestAnimationFrame(firstMap);

    //draw elements
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });
    ennemyBoundaries.forEach((boundary) => {
        boundary.draw();
    });
    pancarte1.forEach((boundary) => {
        boundary.draw();
    });
    pancarte2.forEach((boundary) => {
        boundary.draw();
    });
    pancarte3.forEach((boundary) => {
        boundary.draw();
    });

    player.draw();
    ennemieswithmotion.forEach(enemy => enemy.draw()); //draw every monster with motion
    ennemiesmotionless.forEach(enemy => enemy.draw()); //draw every monster motionless
    foreground.draw();

    // let moving = true;
    // player.animate = false
    
    //battle
    if (battle.initiated) {
        animateBattle(ennemieswithmotion,ennemiesmotionless); // Appeler animateBattle seulement si le combat est initié
        return;
    }

    
    //checkEnemyCollision(animationID)
    moveEnemy(ennemyBoundaries)
    deplacement()
    pancartes()

    document.querySelector('#Attack1Button').innerHTML = selectedSpells[0]
    document.querySelector('#Attack2Button').innerHTML = selectedSpells[1]
}
firstMap();