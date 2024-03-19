const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/bg_14.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    console.log('battle')
    battleBackground.draw
}