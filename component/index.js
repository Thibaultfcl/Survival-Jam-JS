const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1020
canvas.height = 510

const collisionMap = []
for (let i = 0; i < collision.length; i += 70) {
    collisionMap.push(collision.slice(i, 70 + i))
}

const contour = []
const offset = {
    //positions perso depart
    x: -425,
    y: -850
    // x: 0,
    // y: 0
}

collisionMap.forEach((ligne, i) => {
    ligne.forEach((symbol, j) => {
      if (symbol === 2102)
        contour.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            }
          })
        )
    })
})


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
console.log(player)

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
}

const testbor = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})


let playerSize = 0.5;

const movables = [background, ...contour, foreground]
function rectangleCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && 
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function move () {
    window.requestAnimationFrame(move)
    background.draw()
    contour.forEach((boundari) => {
        boundari.draw()
    })
    player.draw()
    foreground.draw()

    let moving = true
    player.moving = false

    if (keys.z.presser) {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x,
                        y: boundari.position.y + 3
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

    } else if (keys.q.presser) {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x + 3,
                        y: boundari.position.y
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

    } else if (keys.s.presser) {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x,
                        y: boundari.position.y - 3
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

    } else if (keys.d.presser) {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < contour.length; i++) {
            const boundari = contour[i]
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundari, 
                        position: {
                        x: boundari.position.x - 3,
                        y: boundari.position.y
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
move()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'z':
        case 'ArrowUp':
            keys.z.presser = true;
            break;
        case 'q':
        case 'ArrowLeft':
            keys.q.presser = true;
            break;
        case 's':
        case 'ArrowDown':
            keys.s.presser = true;
            break;
        case 'd':
        case 'ArrowRight':
            keys.d.presser = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'z':
        case 'ArrowUp':
            keys.z.presser = false;
            break;
        case 'q':
        case 'ArrowLeft':
            keys.q.presser = false;
            break;
        case 's':
        case 'ArrowDown':
            keys.s.presser = false;
            break;
        case 'd':
        case 'ArrowRight':
            keys.d.presser = false;
            break;
    }
});


