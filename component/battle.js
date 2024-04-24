const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/combat.png'
const ennemyImgBattle = new Image()
ennemyImgBattle.src = './img/SkeletoNIdle.png'
const playerImgBattle = new Image()
playerImgBattle.src = './img/playerRightBattle.png'
const shieldImg = new Image()
shieldImg.src = './img/shield.png'
const darkSpearImg = new Image()
darkSpearImg.src = './img/Darkspear.png'
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
    isEnnemy: true,
    attackName: 'enemy1'
})

const playerBattle = new Sprite({
    position: {
        x: 200,
        y: 375
    },
    image: playerImgBattle,
    initialPosition: {
        x: 200,
        y: 375
    }
});
const shield = new Sprite({
    position: {
        x: 85,
        y: 250
    },
    image: shieldImg,
    initialPosition: {
        x: 85,
        y: 250
    }
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
    initialPosition: {
        x: 225,
        y: 300
    }
});
const playerWithSpells = [playerBattle, shield];
let shieldActivated = false
let darkSpearActivated = false
let attackEnnemy = false
function resetBattleSprites() {
    playerBattle.position.x = playerBattle.initialPosition.x;
    playerBattle.position.y = playerBattle.initialPosition.y;
    shield.position.x = shield.initialPosition.x;
    shield.position.y = shield.initialPosition.y;
    ennemyBattle.position.x = 700;
    ennemyBattle.position.y = 350;
}

let battleAnimationID;
function animateBattle() {
    battleAnimationID = window.requestAnimationFrame(animateBattle);

    console.log("battle")
    if (!battle.initiated) {
        ennemy.isDead = true;
        window.cancelAnimationFrame(battleAnimationID);
        document.getElementById('battleElements').style.display = 'none';

        moveElementAnimated([playerBattle, shield, ennemyBattle], 0, 1000).then(() => {
            audio.IniBattle.play();
            firstMap(); // Revenir à la carte principale
            deplacement(); // Réinitialiser les positions des sprites
            document.getElementById('transitionDiv').classList.remove('hide-transition');
            document.getElementById('transitionDiv').classList.remove('show-transition');
        });

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
    if (ennemy.health <= 0) {
        battle.initiated = false;
    }
    if (playerBattle.health <= 0) {
        battle.initiated = false;
        document.getElementById('gameOverDiv').style.display = 'block';
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
const spellFunctionsEnemy = {
    enemy1 : () => {
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
}

function castEnemySpell(enemy) {
    const spellFunction = spellFunctionsEnemy[enemy.attackName];
    if (spellFunction) {
        spellFunction();
    } else {
        console.error('No function found for this spell:', enemy.attackName);
    }
}

document.querySelector('#dialogueBox').addEventListener('click', ()=>{
    document.querySelector('#dialogueBox').style.display = 'none'
    if(attackEnnemy && ennemyBattle.health > 0) castEnemySpell(ennemyBattle)
    attackEnnemy = false
})