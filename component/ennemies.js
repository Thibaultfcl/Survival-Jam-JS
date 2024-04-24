const ennemyImage = new Image();
ennemyImage.src = "./img/ennemy.png";

const ennemyImage2 = new Image();
ennemyImage2.src = "./img/ennemy2.png";

const ennemy2Image = new Image();
ennemy2Image.src = "./img/ennemy.png";

const ennemy2Image2 = new Image();
ennemy2Image2.src = "./img/ennemy2.png";

const ennemy3Image = new Image();
ennemy3Image.src = "./img/demonright.png";

const ennemy3Image2 = new Image();
ennemy3Image2.src = "./img/demonleft.png";

const ennemy4Image = new Image();
ennemy4Image.src = "./img/Evilgod.png"

const ennemy5Image = new Image();
ennemy5Image.src = "./img/hell-beast-idle-left.png";

const ennemy5Image2 = new Image();
ennemy5Image2.src = "./img/hell-beast-idle.png"

const ennemy6Image = new Image();
ennemy6Image.src = "./img/hell-beast-idle-left.png";

const ennemy6Image2 = new Image();
ennemy6Image2.src = "./img/hell-beast-idle.png"

const ennemy7Image = new Image();
ennemy7Image.src = "./img/ennemy.png";

const ennemy7Image2 = new Image();
ennemy7Image2.src = "./img/ennemy2.png";

const ennemy = new Sprite({
    position: {
        x: 1200,
        y: 80,
    },
    image: ennemyImage,
    frames: {
        max: 13,
        hold: 10
    },
    sprites: {
        left: ennemyImage,
        right: ennemyImage2,
    },
    animate: true
});

const ennemy2 = new Sprite({
    position: {
        x: 1100,
        y: -150,
    },
    image: ennemy2Image,
    frames: {
        max: 13,
        hold: 10
    },
    sprites: {
        left: ennemy2Image,
        right: ennemy2Image2,
    },
    animate: true
});

const ennemy3 = new Sprite({
    position: {
        x: 300,
        y: -680,
    },
    image: ennemy3Image,
    frames: {
        max: 6,
        hold: 50
    },
    sprites: {
        left: ennemy3Image,
        right: ennemy3Image2,
    },
    animate: true
});

const ennemy4 = new Sprite({
    position: {
        x: 5050,
        y: -750,
    },
    image: ennemy4Image,
    frames: {
        max: 1,
        hold: 1
    },
    sprites: {
        left: ennemy4Image,
        right: ennemy4Image,
    },
    animate: true
});

const ennemy5 = new Sprite({
    position: {
        x: 1300,
        y: -600,
    },
    image: ennemy5Image,
    frames: {
        max: 6,
        hold: 30
    },
    sprites: {
        left: ennemy5Image,
        right: ennemy5Image2,
    },
    animate: true
});

const ennemy6 = new Sprite({
    position: {
        x: 1100,
        y: -700,
    },
    image: ennemy6Image,
    frames: {
        max: 6,
        hold: 30
    },
    sprites: {
        left: ennemy6Image,
        right: ennemy6Image2,
    },
    animate: true
});

const ennemy7 = new Sprite({
    position: {
        x: 3950,
        y: -300,
    },
    image: ennemy7Image,
    frames: {
        max: 13,
        hold: 10
    },
    sprites: {
        left: ennemy7Image,
        right: ennemy7Image2,
    },
    animate: true
});