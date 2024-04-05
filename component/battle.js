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
    animate: true
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
}