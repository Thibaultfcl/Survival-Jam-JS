class Sprite {
    constructor({position, velocity, image, frames = {max: 1, hold: 10}, sprites, animate = false, health = 100, isEnnemy = false}) {
        this.position = position
        this.velocity = velocity
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.health = health
        this.isEnnemy = isEnnemy
        this.moving = false
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, 
            this.image.height
        )
        c.restore()

        if (!this.moving) {
            return
        }

        if (!this.animate) {
            return
        }

        if (this.frames.max > 1) {
            this.frames.elapsed ++
        }

        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
    }

    attack({ attack, target}) {
        const retreatDuration = 0.1;
        const attackDuration = 0.08;
        const numRetreatRepeats = 5;

        let healthBar = 'ennemyHealthBar'
        if (this.isEnnemy) healthBar = 'playerHealthBar'

        setTimeout(() => {
            target.health -= attack.damage
            document.getElementById(healthBar).style.width = `${target.health}%`;
            let retreatCounter = 0;
            let retreatInterval = setInterval(() => {
                target.position.x += 5;
                target.opacity = (retreatCounter % 2 === 0) ? 0 : 1;
                retreatCounter++;
                if (retreatCounter >= numRetreatRepeats * 2) {
                    let targets = [target]
                    moveElementAnimated(targets, -3.5, 500)
                    if (target.health <= 0) target.opacity = 0;
                    clearInterval(retreatInterval);
                }
            }, attackDuration * 1000);
        }, retreatDuration * 1000);
    }
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
        c.fillStyle = "rgba(255, 0, 0, 0.0)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
