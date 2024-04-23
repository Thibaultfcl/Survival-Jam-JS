const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/bg.png'

const ennemyImgBattle = new Image()
ennemyImgBattle.src = './img/skeletonIdle.png'

const playerImgBattle = new Image()
playerImgBattle.src = './img/playerRightBattle.png'

const shieldImg = new Image()
shieldImg.src = './img/shield.png'

const darkSpearImg = new Image()
darkSpearImg.src = './img/darkSpear.png'

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
    image: playerImgBattle,
});

const shield = new Sprite({
    position: {
        x: 85,
        y: 250
    },
    image: shieldImg,
});

const darkSpear = new Sprite({
    position: {
        x: 225,
        y: 300
    },
    image: darkSpearImg,
    frames: {
        max: 20,
        hold: 10
    },
    animate: true,
});


const playerWithSpells = [playerBattle, shield];
let shieldActivated = false
let darkSpearActivated = false
let attackEnnemy = false

function combat() {
    window.cancelAnimationFrame(battleAnimationID);
    document.getElementById('battleElements').style.display = 'none';
    // Arrêtez la musique de combat
    // audio.Battle.stop();
    audio.IniBattle.play();
    // Reprenez la musique de la carte
    // audio.Map.play();
        
    moveElementAnimated([playerBattle, shield, ennemyBattle], 0, 1000).then(() => {
        firstMap(); // Revenir à la carte principale
        document.querySelector('#userInterface').style.display = 'none';
        deplacement(); // Réinitialiser les positions des sprites
    });
    return;
}


function animateBattle() {
    battleAnimationID = window.requestAnimationFrame(animateBattle);

    if (!battle.initiated) {
        ennemy.isDead = true;
        combat();
        return;
    }

    document.getElementById('transitionDiv').classList.add('hide-transition');
    battleBackground.draw();
    ennemyBattle.draw();
    playerBattle.draw();
    document.getElementById('battleElements').style.display = 'block';

    if (shieldActivated) shield.draw();
    if (darkSpearActivated) darkSpear.draw();
    if (darkSpear.frames.val == 19) {
        darkSpearActivated = false;
    }

    // Si la santé de l'ennemi est zéro, fin du combat
    if (ennemies.health <= 0) {
        battle.initiated = false;
    }
}

function moveElementAnimated(elements, deltaX, duration) {
    return new Promise((resolve, _) => {
        const fps = 60;
        const frames = duration * fps / 1000;
        const intervalTime = duration / frames;
    
        let currentFrame = 0;
        const interval = setInterval(() => {
            if (currentFrame >= frames) {
                clearInterval(interval);
                resolve();
                return;
            }
    
            const progress = currentFrame / frames;
            const moveAmount = deltaX * progress;
    
            elements.forEach(element => {
                element.position.x += moveAmount;
            });
            
            currentFrame++;
        }, intervalTime);
    });
}

const spellFunctions = {
    Tackle: () => {
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = 'You used Tackle and dealed a total of 10 dmg'

        moveElementAnimated(playerWithSpells, -2, 750)
            .then(() => {
                return moveElementAnimated(playerWithSpells, +6, 500);
            })
            .then(() => {
                playerBattle.attack({
                    attack: {
                        name: 'Tackle',
                        damage: 50,
                    },
                    target: ennemyBattle
                });
                return moveElementAnimated(playerWithSpells, -2, 750);
            })
            .then(() => {
                shieldActivated = false;
            });
        attackEnnemy = true;
    },
    Shield: () => {
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = 'You used Shield, the next ammount of dammage you take will be canceled'
        shieldActivated = true;
        attackEnnemy = true;
    },
};

function castEquippedSpell(equippedSpell) {
    const spellFunction = spellFunctions[equippedSpell];
    if (spellFunction) {
        spellFunction();
    } else {
        console.error('No function found for the equipped spell:', equippedSpell);
    }
}

document.getElementById('Attack1Button').addEventListener('click', (event) => {
    const clickedButton = event.target;
    if (clickedButton.tagName === 'BUTTON') {
        castEquippedSpell(selectedSpells[0])
    }
});

document.getElementById('Attack2Button').addEventListener('click', (event) => {
    const clickedButton = event.target;
    if (clickedButton.tagName === 'BUTTON') {
        castEquippedSpell(selectedSpells[1])
    }
});

let index = 0
function spellEnnemy1() {
    const attackArray = [5, 5, 100]
    const attackDmg = attackArray[index]
    index ++
    if(index > attackArray.length-1) index = 0

    document.querySelector('#dialogueBox').style.display = 'block'
    if(shieldActivated) {
        document.querySelector('#dialogueBox').innerHTML = 'The enemy used dark spear on you. Your sield blocked the dammage'
    } else {
        document.querySelector('#dialogueBox').innerHTML = 'The enemy used dark spear on you. You lost ' + attackDmg + ' hp'
    }

    darkSpearActivated = true
    if(shieldActivated) darkSpearActivated = false
    darkSpear.frames.val = 0

    ennemyBattle.attack({
        attack: {
            name: 'Dark Spear',
            damage: attackDmg,
        },
        target: playerBattle
    });
}

document.querySelector('#dialogueBox').addEventListener('click', ()=>{
    document.querySelector('#dialogueBox').style.display = 'none'
    if(attackEnnemy && ennemyBattle.health > 0) spellEnnemy1()
    attackEnnemy = false
})

