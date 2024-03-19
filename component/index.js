const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const offset = {
    x: -425,
    y: -850
}

const image = new Image()
image.src = "./img/map.png"

const foregroundImage = new Image()
foregroundImage.src = "./img/foreground.png"

const playerDownImage = new Image()
playerDownImage.src = "./img/playerDown.png"

const playerUpImage = new Image()
playerUpImage.src = "./img/playerUp.png"

const playerRightImage = new Image()
playerRightImage.src = "./img/playerRight.png"

const playerLeftImage = new Image()
playerLeftImage.src = "./img/playerLeft.png"

const ennemyImage = new Image()
ennemyImage.src = "./img/ennemy.png"

const ennemyImage2 = new Image()
ennemyImage2.src = "./img/ennemy2.png"

const player = new Sprite ({
    position: {
        x: canvas.width / 2 -  192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4,
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage,
    }
})

const ennemy = new Sprite ({
    position: {
        x: 1200,
        y: 80,
    },
    image: ennemyImage,
    frames: {
        max: 13,
    },
    sprites: {
        left: ennemyImage,
        right: ennemyImage2,
    },
    animate: true
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const collisionMap = []
for (let i = 0; i < collision.length; i += 70) {
    collisionMap.push(collision.slice(i, 70 + i))
}

const boundaries = []
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 2102)
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            }
          })
        )
    })
})

const ennemyBondaries = []
ennemyBondaries.push(
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
)

const movables = [background, ...boundaries, foreground, ennemy, ...ennemyBondaries]

function rectangleCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && 
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

const keys = {
    z: {
        pressed: false
    },
    q: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'z':
        case 'Z':
        case 'ArrowUp':
            keys.z.pressed = true;
            break;
        case 'q':
        case 'Q':
        case 'ArrowLeft':
            keys.q.pressed = true;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            keys.s.pressed = true;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.pressed = true;
            break;
    }
});
                                
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'z':
        case 'Z':
        case 'ArrowUp':
            keys.z.pressed = false;
            break;
        case 'q':
        case 'Q':
        case 'ArrowLeft':
            keys.q.pressed = false;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            keys.s.pressed = false;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.pressed = false;
            break;
    }
});

const battle = {
    initiated : false
}

let mooveLeft = true
function move() {
    animationID = window.requestAnimationFrame(move)

    //draw elements
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    ennemyBondaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()
    ennemy.draw()
    foreground.draw()

    let moving = true
    player.animate = false

    //battle
    if (battle.initiated) return
    if(
        rectangleCollision({
            rectangle1: player,
            rectangle2: ennemy
        })
    ) {
        window.cancelAnimationFrame(animationID)
        battle.initiated = true
        document.getElementById('transitionDiv').classList.add('show-transition');
        document.getElementById('transitionDiv').addEventListener('animationend', function() {
            animateBattle();
        }, { once: true });
    }

    //ennemy movement
    if(
        rectangleCollision({
            rectangle1: ennemy,
            rectangle2: ennemyBondaries[0]
        })
    ) {
        mooveLeft = true
    } else if (
        rectangleCollision({
            rectangle1: ennemy,
            rectangle2: ennemyBondaries[1]
        })
    ) {
        mooveLeft = false
    }

    if (mooveLeft) {
        ennemy.image = ennemy.sprites.left
        ennemy.position.x += 0.5
    } else {
        ennemy.image = ennemy.sprites.right
        ennemy.position.x -= 0.5
    }

    //player movement
    if (keys.z.pressed) {
        player.animate = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 5
                    }}
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 5
            })
        }

    } else if (keys.q.pressed) {
        player.animate = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x + 5,
                        y: boundary.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 5
            })
        }

    } else if (keys.s.pressed) {
        player.animate = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 5
                    }}
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 5
            })
        }

    } else if (keys.d.pressed) {
        player.animate = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x - 5,
                        y: boundary.position.y
                    }}
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 5
            })
        }
    }
}
animateBattle()