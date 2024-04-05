const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/bg.png'

const ennemyImgBattle = new Image()
ennemyImgBattle.src = './img/skeletonIdle.png'

const playerImgBattle = new Image()
playerImgBattle.src = './img/playerRightBattle.png'

const battleBackground = new Sprite({
    position: {
        x: -200,
        y: -200
    },
    image: battleBackgroundImage
})

const ennemyBattle = new Sprite({
    position: {
        x: 700,
        y: 350
    },
    image: ennemyImgBattle,
    frames: {
        max: 11,
        hold: 20
    },
    animate: true,
    isEnnemy: true
})

const playerBattle = new Sprite({
    position: {
        x: 200,
        y: 375
    },
    image: playerImgBattle
})

function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    document.getElementById('transitionDiv').classList.add('hide-transition');
    battleBackground.draw()
    ennemyBattle.draw()
    playerBattle.draw()
    document.getElementById('battleElements').style.display = 'block';
}

function moveElementAnimated(element, deltaX, duration) {
    return new Promise((resolve, _) => {
        const fps = 60; // Frames per second
        const frames = duration * fps / 1000; // Total number of frames
        const intervalTime = duration / frames; // Time between each frame
    
        let currentFrame = 0;
        const interval = setInterval(() => {
            if (currentFrame >= frames) {
                clearInterval(interval);
                resolve();
                return;
            }
    
            const progress = currentFrame / frames;
            const moveAmount = deltaX * progress;
    
            element.position.x += moveAmount;
    
            currentFrame++;
        }, intervalTime);
    });
}

document.getElementById('tackleButton').addEventListener('click', (event) => {
    const clickedButton = event.target;
    if (clickedButton.tagName === 'BUTTON') {
        moveElementAnimated(playerBattle, -2, 750)
        .then(() => {
            return moveElementAnimated(playerBattle, +6, 500);
        })
        .then(() => {
            playerBattle.attack({
                attack: {
                    name: 'Tackle',
                    damage: 10,
                },
                target: ennemyBattle
            });
            return moveElementAnimated(playerBattle, -2, 750);
        })
    }
});