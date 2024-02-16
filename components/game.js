// Initialisation du jeu
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    size : 50,
    selectedCharacter : "/public/renard.png",
    x : canvas.width / 2,
    y : canvas.height / 2,
    pv: 100,
    inventory: [],
    spells: [],
    isAlive() {
        return this.pv > 0;
    },
    printStatus() {
        console.log(`Player's status :
            Position X: ${this.x}
            Position Y: ${this.y}
            PV: ${this.pv}
            Inventory: ${this.inventory.join(", ")}
            Spells: ${this.spells.join(", ")}`);
    },
    addObject(object) {
        this.inventory.push(object);
        console.log(`You add ${object.name} in your inventory.`);
    },
    addSpell(spell) {
      this.spells.push(spell.name);
      console.log(`You learn the spell : ${spell.name}.`);
    },
    castSpell(spell) {
        const sortIndex = this.spells.indexOf(spell);
        if (sortIndex !== -1) {
          console.log(`You are casting the spell : ${spell.name}.`);
          //spell logic here
        } else {
          console.log(`You didn't learn that spell : ${spell.name}.`);
        }
    },
};

//spell object
const fireBall = {
    name: "Fireball",
    dmg: 20,
    manaCost: 30,
};
//item object
const sword = {
    name: "Sword",
    dmg: 10,
};

// Définition des cartes
const maps = [
    { image: "/public/map1.png", width: 1495, height: 820 },
    { image: "/public/map2.png", width: 1495, height: 820 },
    { image: "/public/map3.png", width: 1495, height: 820 },
    { image: "/public/map4.png", width: 1495, height: 820 }
];
let currentMapIndex = 0;

// Fonction pour dessiner le joueur
function drawPlayer() {
    const playerImg = new Image();
    playerImg.src = player.selectedCharacter;
    ctx.drawImage(playerImg, player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
}

// Fonction pour dessiner la carte
function drawMap() {
    const map = maps[currentMapIndex];
    const mapImg = new Image();
    mapImg.src = map.image;
    ctx.drawImage(mapImg, 0, 0, map.width, map.height);
}

// Fonction principale pour mettre à jour le jeu
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface l'écran

    // Dessine la carte actuelle
    drawMap();

    // Met à jour et dessine le joueur
    drawPlayer();

    requestAnimationFrame(update); // Appelle update() à nouveau pour créer une boucle de jeu
}

// Écouteur d'événement pour les touches de déplacement
document.addEventListener('keydown', function(event) {
    const keyPressed = event.key;

    // Déplacement du joueur
    if (keyPressed === 'ArrowUp') {
        if (player.y - 5 >= 0) {
            player.y -= 5;
        }
    } else if (keyPressed === 'ArrowDown') {
        if (player.y + 5 <= canvas.height) {
            player.y += 5;
        }
    } else if (keyPressed === 'ArrowLeft') {
        if (player.x - 5 >= 0) {
            player.x -= 5;
        } else {
            // Le joueur dépasse la limite vers la gauche
            if (currentMapIndex > 0) {
                currentMapIndex--;
                player.x = canvas.width - player.size / 2; // Déplacer le joueur à l'extrême droite de la carte précédente
            }
        }
    } else if (keyPressed === 'ArrowRight') {
        if (currentMapIndex === 0 && player.x + 5 > maps[currentMapIndex].width) {
            // Le joueur dépasse la limite vers la droite de la première carte
            currentMapIndex++;
            player.x = player.size / 2; // Déplacer le joueur à l'extrême gauche de la carte suivante
        } else if (currentMapIndex === 1 && player.x + 5 > maps[currentMapIndex].width) {
            // Le joueur dépasse la limite vers la droite de la deuxième carte
            currentMapIndex++;
            player.x = player.size / 2; // Déplacer le joueur à l'extrême gauche de la carte suivante
        } else if (currentMapIndex === 2 && player.x + 5 > maps[currentMapIndex].width) {
            currentMapIndex++;
            player.x = player.size / 2; // Déplacer le joueur à l'extrême gauche de la carte suivante
            // Le joueur dépasse la limite vers la droite de la troisieme carte
            
        } else if (currentMapIndex === 3 && player.x + 5 > maps[currentMapIndex].width) {
            // Ajouter ici le code pour placer une barrière ou prendre une autre action
            // pour empêcher le joueur de continuer en dehors des limites
        } else {
            player.x += 5;
        }
    }
});



// Lancer le jeu
update(); // Démarre la boucle de jeu
