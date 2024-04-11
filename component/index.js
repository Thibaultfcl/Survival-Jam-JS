const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const offset = {
    x: -425,
    y: -850
};

const image = new Image();
image.src = "./img/map.png";

const image2 = new Image();
image2.src = "./img/CarteJS.png";

const image3 = new Image();
image3.src = "./img/map3.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/foreground.png";

const foregroundImage2 = new Image();
foregroundImage2.src = "./img/foreground_map2.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const ennemyImage = new Image();
ennemyImage.src = "./img/ennemy.png";

const ennemyImage2 = new Image();
ennemyImage2.src = "./img/ennemy2.png";

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4,
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage,
    }
});

const ennemy = new Sprite({
    position: {
        x: 1200,
        y: 80,
    },
    image: ennemyImage,
    frames: {
        max: 13,
    },
    sprites: {
        left: ennemyImage,
        right: ennemyImage2,
    }
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

const background2 = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image2
});

const background3 = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image3
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const foreground2 = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage2
});

const collisionMap = [];
for (let i = 0; i < collision.length; i += 70) {
    collisionMap.push(collision.slice(i, 70 + i));
}

const boundaries = [];
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2102)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
    });
});

const ennemyBoundaries = [];
ennemyBoundaries.push(
    new Boundary({
        position: {
            x: 1150,
            y: 110
        }
    }),
    new Boundary({
        position: {
            x: 1900,
            y: 110
        }
    })
);

const passage_map = [];
passage_map.push(
    new Boundary({
        position: {
            x: 2400,
            y: 62
        }
    }),
    new Boundary({
        position: {
            x: 2400,
            y: 160
        }
    }),
    new Boundary({
        position: {
            x: 2400,
            y: 112
        }
    })
);

const movables = [background, ...boundaries, foreground, ennemy, ...ennemyBoundaries, ...passage_map];

function rectangleCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}

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
};

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'z':
        case 'Z':
        case 'ArrowUp':
            keys.z.presser = true;
            break;
        case 'q':
        case 'Q':
        case 'ArrowLeft':
            keys.q.presser = true;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            keys.s.presser = true;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.presser = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'z':
        case 'Z':
        case 'ArrowUp':
            keys.z.presser = false;
            break;
        case 'q':
        case 'Q':
        case 'ArrowLeft':
            keys.q.presser = false;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            keys.s.presser = false;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.presser = false;
            break;
    }
});

const battle = {
    initiated: false
};

//music
let audioStarted = false;

function startAudio() {
    if (!audioStarted) {
        audio.Map.play();
        audioStarted = true;
    }
}

addEventListener('click', startAudio);


let mooveLeft = true;
let crosse = false;

function FirstMap() {
    animationID = window.requestAnimationFrame(FirstMap);

    //draw elements
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });
    ennemyBoundaries.forEach((boundary) => {
        boundary.draw();
    });
    passage_map.forEach((boundary) => {
        boundary.draw();
    });
    player.draw();
    ennemy.draw();
    foreground.draw();

    let moving = true;
    player.moving = false;
    ennemy.moving = false;
    

    //battle
    if (battle.initiated) return;
    if (
        rectangleCollision({
            rectangle1: player,
            rectangle2: ennemy
        })
    ) {
        window.cancelAnimationFrame(animationID);
        audio.Map.stop();
        audio.Transibattle.play();
        // audio.Battle.play()
        battle.initiated = true;
        document.getElementById('transitionDiv').classList.add('show-transition');
        animateBattle();
    }

    //ennemy movement
    ennemy.moving = true;
    if (
        rectangleCollision({
            rectangle1: ennemy,
            rectangle2: ennemyBoundaries[0]
        })
    ) {
        mooveLeft = true;
    } else if (
        rectangleCollision({
            rectangle1: ennemy,
            rectangle2: ennemyBoundaries[1]
        })
    ) {
        mooveLeft = false;
    } else if (
        rectangleCollision({
            rectangle1: player,
            rectangle2: passage_map[0]
        })
    ) {
        mooveLeft = false;
    }

    if (mooveLeft) {
        ennemy.image = ennemy.sprites.left;
        ennemy.position.x += 0.5;
    } else {
        ennemy.image = ennemy.sprites.right;
        ennemy.position.x -= 0.5;
    }

    //player movement
    if (!crosse) {
        if (keys.z.presser) {
            player.moving = true;
            player.image = player.sprites.up;
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (
                    rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 5
                            }
                        }
                    })
                ) {
                    moving = false;
                    break;
                }
            }

            if (moving) {
                movables.forEach((movable) => {
                    movable.position.y += 5;
                });
            }
        } else if (keys.q.presser) {
            player.moving = true;
            player.image = player.sprites.left;
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (
                    rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x + 5,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    moving = false;
                    break;
                }
            }

            if (moving) {
                movables.forEach((movable) => {
                    movable.position.x += 5;
                });
            }
        } else if (keys.s.presser) {
            player.moving = true;
            player.image = player.sprites.down;
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (
                    rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 5
                            }
                        }
                    })
                ) {
                    moving = false;
                    break;
                }
            }

            if (moving) {
                movables.forEach((movable) => {
                    movable.position.y -= 5;
                });
            }
        } else if (keys.d.presser) {
            player.moving = true;
            player.image = player.sprites.right;
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (
                    rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x - 5,
                                y: boundary.position.y
                            }
                        }
                    })
                ) {
                    moving = false;
                    break;
                }
            }

            if (moving) {
                movables.forEach((movable) => {
                    movable.position.x -= 5;
                });
            }
        }
    } else {
        if (keys.z.presser) {
            player.moving = true;
            player.image = player.sprites.up;
            player.position.y -= 5;
        } else if (keys.s.presser) {
            player.moving = true;
            player.image = player.sprites.down;
            player.position.y += 5;
        } else if (keys.q.presser) {
            player.moving = true;
            player.image = player.sprites.left;
            player.position.x -= 5;
        }
         else if (keys.d.presser) {
            player.moving = true;
            player.image = player.sprites.right;
            player.position.x += 5;
        }
    }
    if (!crosse) {
        for (let i = 0; i < passage_map.length; i++) {
            if (rectangleCollision({ rectangle1: player, rectangle2: passage_map[i] })) {
                if (player.position.x < passage_map[i].position.x) {
                    crosse = true;
                    break;
                }
            }
        }
    } else {
        // Le joueur a traversé passage_map, donc déplacement automatique vers passage_map2
        const destinationX = 1050; // Position x de passage_map2
        const destinationY = 250; // Position y de passage_map2
        const speed = 5; // Vitesse de déplacement du joueur
        
        // Calculer la direction du déplacement
        const dx = destinationX - player.position.x;
        const dy = destinationY - player.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const vx = (dx / distance) * speed;
        const vy = (dy / distance) * speed;

        // Déplacer le joueur vers la destination
        player.position.x += vx;
        player.position.y += vy;
        // Vérifier si le joueur est arrivé à la destination
        if (Math.abs(player.position.x - destinationX) < speed && Math.abs(player.position.y - destinationY) < speed) {
            // Le joueur est arrivé à la destination, lancer la cinématique
            window.cancelAnimationFrame(animationID);
            SecondMap();
            // TroisiemeMap();
        }
        // Empêcher les mouvements du joueur via les touches du clavier
        keys.z.presser = false;
        keys.q.presser = false;
        keys.s.presser = false;
        keys.d.presser = false;
    }
}
FirstMap();

function SecondMap() {
    // Initialisation des variables de mouvement
    player.moving = false;

    // Chargement de l'image de la carte
    background2.image.src = "./img/CarteJS.png";

    const center_cam = [];
    center_cam.push(
        new Boundary({
            position: {
                x: 470,
                y: 270
            }
        }),
        new Boundary({
            position: {
                x: 470,
                y: 320
            }
        }),
        new Boundary({
            position: {
                x: 470,
                y: 370
            }
        }),
        new Boundary({
            position: {
                x: 470,
                y: 220
            }
        }),
        new Boundary({
            position: {
                x: 470,
                y: 170
            }
        }),
        new Boundary({
            position: {
                x: 470,
                y: 120
            }
        })
    );

    // Création des limites de collision de la carte
    const collisionMap2 = [];
    for (let i = 0; i < collision2.length; i += 70) {
        collisionMap2.push(collision2.slice(i, 70 + i));
    }

    const boundaries2 = [];
    collisionMap2.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 2505) {
                boundaries2.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width + offset.x,
                            y: i * Boundary.height + offset.y
                        }
                    })
                );
            }
        });
    });

    background2.draw();
    boundaries2.forEach((boundary) => {
        boundary.draw();
    });

    // Dessiner les limites de la caméra
    center_cam.forEach((camera) => {
        camera.draw();
    });

    background2.position.x = 0;
    background2.position.y = -700;

    // Chargement de l'image de la carte
    background2.image.onload = function() {
        // Dessin initial de la carte et des limites
        background2.draw();
        boundaries2.forEach((boundary) => {
            boundary.position.x -= -425;
            boundary.position.y -= -150;
            boundary.draw();
        });
        center_cam.forEach((camera) => {
            camera.draw();
        });

        // Positionnement initial du joueur
        player.position.x = 0;
        player.position.y = 250;
        player.draw();

        // Ajout du système de déplacement
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'z':
                case 'Z':
                case 'ArrowUp':
                    player.moving = true;
                    player.image = player.sprites.up;
                    break;
                case 'q':
                case 'Q':
                case 'ArrowLeft':
                    player.moving = true;
                    player.image = player.sprites.left;
                    break;
                case 's':
                case 'S':
                case 'ArrowDown':
                    player.moving = true;
                    player.image = player.sprites.down;
                    break;
                case 'd':
                case 'D':
                case 'ArrowRight':
                    player.moving = true;
                    player.image = player.sprites.right;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            player.moving = false;
        });

        // Fonction de détection de collision entre deux rectangles
        function rectangleCollisions({ rectangle1, rectangle2 }) {
            return (
                rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
                rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
                rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
            );
        }

        function movePlayer() {
            if (player.moving) {
                let dx = 0, dy = 0;
                // Détection des touches pressées et ajustement des coordonnées du joueur en conséquence
                if (keys.z.presser) dy -= 5;
                if (keys.q.presser) dx -= 5;
                if (keys.s.presser) dy += 5;
                if (keys.d.presser) dx += 5;
        
                // Vérifier les collisions avec les limites de collision sur l'axe horizontal (X)
                let canMoveX = true;
                for (let i = 0; i < boundaries2.length; i++) {
                    const boundary = boundaries2[i];
                    if (rectangleCollisions({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x + dx,
                                y: boundary.position.y
                            }
                        }
                    })) {
                        canMoveX = false;
                        // Si une collision est détectée sur l'axe horizontal, ne pas mettre à jour dx
                        dx = 0;
                        break;
                    }
                }
        
                // Vérifier les collisions avec les limites de collision sur l'axe vertical (Y)
                let canMoveY = true;
                for (let i = 0; i < boundaries2.length; i++) {
                    const boundary = boundaries2[i];
                    if (rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + dy
                            }
                        }
                    })) {
                        canMoveY = false;
                        // Si une collision est détectée sur l'axe vertical, ne pas mettre à jour dy
                        dy = 0;
                        break;
                    }
                }
        
                // Mettre à jour les coordonnées du joueur uniquement si le mouvement dans une direction est autorisé
                if (canMoveX) player.position.x += dx;
                if (canMoveY) player.position.y += dy;
        
                // Redessiner la carte et les limites
                background2.draw();
                boundaries2.forEach((boundary) => {
                    boundary.draw();
                });
                center_cam.forEach((camera) => {
                    camera.draw();
                });
        
                // Redessiner le joueur à sa nouvelle position
                player.draw();
            }
        
            // Répéter le déplacement à chaque rafraîchissement de l'écran
            requestAnimationFrame(movePlayer);
        }
        
        // Lancer la fonction de déplacement
        movePlayer();
    };
}

function TroisiemeMap() {
    // Initialisation des variables de mouvement
    player.moving = false;

    // Chargement de l'image de la carte
    background3.image.src = "./img/map3.png";

    const center_cam3 = [];
    center_cam3.push(
        new Boundary({
            position: {
                x: 630,
                y: 290
            }
        }),
        new Boundary({
            position: {
                x: 580,
                y: 290
            }
        }),
        new Boundary({
            position: {
                x: 530,
                y: 290
            }
        }),
        new Boundary({
            position: {
                x: 480,
                y: 290
            }
        })
    );


    // Création des limites de collision de la carte
    const collisionMap3 = [];
    for (let i = 0; i < collision3.length; i += 70) {
        collisionMap3.push(collision3.slice(i, 70 + i));
    }

    const boundaries3 = [];
    collisionMap3.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 2505) {
                boundaries3.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width + offset.x,
                            y: i * Boundary.height + offset.y
                        }
                    })
                );
            }
        });
    });

    background3.draw();
    boundaries3.forEach((boundary) => {
        boundary.draw();
    });
    center_cam3.forEach((boundary) => {
        boundary.draw();
    });

    background3.position.x = -750;
    background3.position.y = -1342;

    // Chargement de l'image de la carte
    background3.image.onload = function() {
        // Dessin initial de la carte et des limites
        background3.draw();
        boundaries3.forEach((boundary) => {
            boundary.position.x -= 325;
            boundary.position.y -= 494;
            boundary.draw();
        });
        center_cam3.forEach((camera) => {
            camera.draw();
        });
    
        // Positionnement initial du joueur
        player.position.x = 465;
        player.position.y = 500;
        player.draw();

        // Ajout du système de déplacement
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'z':
                case 'Z':
                case 'ArrowUp':
                    player.moving = true;
                    player.image = player.sprites.up;
                    break;
                case 'q':
                case 'Q':
                case 'ArrowLeft':
                    player.moving = true;
                    player.image = player.sprites.left;
                    break;
                case 's':
                case 'S':
                case 'ArrowDown':
                    player.moving = true;
                    player.image = player.sprites.down;
                    break;
                case 'd':
                case 'D':
                case 'ArrowRight':
                    player.moving = true;
                    player.image = player.sprites.right;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            player.moving = false;
        });

        // Fonction de déplacement
        function movePlayer() {
            if (player.moving) {
                let dx = 0, dy = 0;
                if (keys.z.presser) dy -= 5;
                if (keys.q.presser) dx -= 5;
                if (keys.s.presser) dy += 5;
                if (keys.d.presser) dx += 5;

                // Mise à jour de la position du joueur
                player.position.x += dx;
                player.position.y += dy;

                // Redessiner la carte et les limites
                background3.draw();
                boundaries3.forEach((boundary) => {
                    boundary.draw();
                });
                center_cam3.forEach((camera) => {
                    camera.draw();
                });

                // Redessiner le joueur à sa nouvelle position
                player.draw();
            }

            // Répéter le déplacement à chaque rafraîchissement de l'écran
            requestAnimationFrame(movePlayer);
        }

        // Lancer la fonction de déplacement
        movePlayer();
    };
}