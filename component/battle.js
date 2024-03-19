const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/bg.png'

const ennemyImgBattle = new Image()
ennemyImgBattle.src = './img/skeletonIdle.png'

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
    },
    animate: true
})

function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    document.getElementById('transitionDiv').classList.add('hide-transition');
    battleBackground.draw()
    ennemyBattle.draw()
}