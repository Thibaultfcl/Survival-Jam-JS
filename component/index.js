const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1020
canvas.height = 510

const collisionMap = []
for (let i = 0; i < collision.length; i += 70) {
    collisionMap.push(collision.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = "rgba(255, 0, 0, 0.0"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }
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

const playerImage = new Image()
playerImage.src = "./img/playerDown.png"

// const playerUpImage = new Image()
// playerImage.src = "./img/playerDown.png"

// const playerRightImage = new Image()
// playerImage.src = "./img/playerDown.png"

// const playerLeftImage = new Image()
// playerImage.src = "./img/playerDown.png"

class Sprite {
    constructor({position, velocity, image, frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frames = frames
        // {...frames, val: 0, laps: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width);
            console.log(this.height);
        }
        this.moving = false
    }

    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y)
        c.drawImage(
            this.image,
            // this.frames.val * this.width,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, 
            this.image.height
        )

        // if (!this.moving) return
        
        // if (this.frames.val > 1) {
        //     this.frames.laps++
        // }

        // if (this.frames.laps %10 === 0) {
        //     if (this.frames.val < this.frames.max - 1) {
        //         this.frames.val++
        //     } else {
        //         this.frames.val = 0
        //     }
        // }
    }
}

const player = new Sprite ({
    position: {
        x: canvas.width / 2 -  192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerImage,
    frames: {
        max: 4,
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
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

const movables = [background, ...contour]
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

    let moving = true
    if (keys.z.presser) {
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
                movable.position.y += 3
            })
        }

    } else if (keys.q.presser) {
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
                movable.position.x += 3
            })
        }

    } else if (keys.s.presser) {
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
                movable.position.y -= 3
            })
        }

    } else if (keys.d.presser) {
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
                movable.position.x -= 3
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


