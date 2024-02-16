// Initialisation du jeu
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Définition de la taille du joueur
const playerSize = 50; // Ajustez la taille du joueur selon vos besoins
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;

// Chemin de l'image du personnage sélectionné
let selectedCharacter = "/public/renard.png"; // Par défaut, le panda est sélectionné

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
    playerImg.src = selectedCharacter;
    ctx.drawImage(playerImg, playerX - playerSize / 2, playerY - playerSize / 2, playerSize, playerSize);
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
        if (playerY - 5 >= 0) {
            playerY -= 5;
        }
    } else if (keyPressed === 'ArrowDown') {
        if (playerY + 5 <= canvas.height) {
            playerY += 5;
        }
    } else if (keyPressed === 'ArrowLeft') {
        if (playerX - 5 >= 0) {
            playerX -= 5;
        } else {
            // Le joueur dépasse la limite vers la gauche
            if (currentMapIndex > 0) {
                currentMapIndex--;
                playerX = canvas.width - playerSize / 2; // Déplacer le joueur à l'extrême droite de la carte précédente
            }
        }
    } else if (keyPressed === 'ArrowRight') {
        if (currentMapIndex === 0 && playerX + 5 > maps[currentMapIndex].width) {
            // Le joueur dépasse la limite vers la droite de la première carte
            currentMapIndex++;
            playerX = playerSize / 2; // Déplacer le joueur à l'extrême gauche de la carte suivante
        } else if (currentMapIndex === 1 && playerX + 5 > maps[currentMapIndex].width) {
            // Le joueur dépasse la limite vers la droite de la deuxième carte
            currentMapIndex++;
            playerX = playerSize / 2; // Déplacer le joueur à l'extrême gauche de la carte suivante
        } else if (currentMapIndex === 2 && playerX + 5 > maps[currentMapIndex].width) {
            currentMapIndex++;
            playerX = playerSize / 2; // Déplacer le joueur à l'extrême gauche de la carte suivante
            // Le joueur dépasse la limite vers la droite de la troisieme carte
            
        } else if (currentMapIndex === 3 && playerX + 5 > maps[currentMapIndex].width) {
            // Ajouter ici le code pour placer une barrière ou prendre une autre action
            // pour empêcher le joueur de continuer en dehors des limites
        } else {
            playerX += 5;
        }
    }
});



// Lancer le jeu
update(); // Démarre la boucle de jeu
