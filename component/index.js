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

const ennemy = new Sprite({
    position: {
        x: 1200,
        y: 80,
    },
    image: ennemyImage,
    frames: {
        max: 13,
        hold: 10
    },
    sprites: {
        left: ennemyImage,
        right: ennemyImage2,
    },
    animate: true
});

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

const movables = [background, ...boundaries, foreground, ennemy, ...ennemyBoundaries, ...pancarte1];

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

    player.draw();
    ennemy.draw();
    foreground.draw();

    let moving = true;
    player.animate = false
    
    //battle
    if (battle.initiated) return;
    if (
        rectangleCollision({
            rectangle1: player,
            rectangle2: ennemy
        }) && !ennemy.isDead
    ) {
        window.cancelAnimationFrame(animationID);
        audio.Map.stop();
        audio.Transibattle.play();
        // audio.Battle.play()
        battle.initiated = true;
        document.getElementById('transitionDiv').classList.add('show-transition');
        document.getElementById('transitionDiv').addEventListener('animationend', function() {
            animateBattle(ennemy);
        }, { once: true });
    }

    //ennemy movement
    if(
        rectangleCollision({
            rectangle1: ennemy,
            rectangle2: ennemyBoundaries[0]
        })
    ) {
        mooveLeft = true
    } else if (
        rectangleCollision({
            rectangle1: ennemy,
            rectangle2: ennemyBoundaries[1]
        })
    ) {
        mooveLeft = false
    }
    // else if (
    //     rectangleCollision({
    //         rectangle1: player,
    //         rectangle2: passage_map[0]
    //     })
    // ) {
    //     mooveLeft = false
    // }

    if (mooveLeft) {
        ennemy.image = ennemy.sprites.left
        ennemy.position.x += 0.5
    } else {
        ennemy.image = ennemy.sprites.right
        ennemy.position.x -= 0.5
    }

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
    
    pancarte1.forEach((boundary) => {
        if(rectangleCollision({
            rectangle1: player,
            rectangle2: boundary
        })) {
            document.querySelector('#pancarte1').style.display = 'block'
            document.querySelector('#pancarteBox').style.display = 'block'
            document.querySelector('#pancarteBox').innerHTML = 'Pancarte 1 text'
        } else {
            document.querySelector('#pancarte1').style.display = 'none'
            document.querySelector('#pancarteBox').style.display = 'none'
        }
    });
}
firstMap();