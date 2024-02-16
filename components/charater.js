const player = {
    positionX: 0,
    positionY: 0,
    pv: 100,
    inventory: [],
    spells: [],
    isAlive() {
        return this.pv > 0;
    },
    printStatus() {
        console.log(`Player's status :
            Position X: ${this.positionX}
            Position Y: ${this.positionY}
            PV: ${this.pv}
            Inventory: ${this.inventaire.join(", ")}
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
    moove(direction) {
        switch (direction) {
            case 'Z':
                this.positionY -= 1;
                break;
            case 'Q':
                this.positionX -= 1;
                break;
            case 'S':
                this.positionY += 1;
                break;
            case 'D':
                this.positionX += 1;
                break;
            default:
                console.log("Direction non reconnue.");
        }
    }
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