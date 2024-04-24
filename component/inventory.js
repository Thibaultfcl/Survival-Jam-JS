const inventory = document.getElementById("inventory");
const spellsContainer = document.getElementById("spells-container");
let inventoryDisplayed = false
let selectedSpells = ["Tackle", "Shield"];
let learnedSpells = ["Tackle", "Shield", "Lightning"];

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case 'i':
    case 'I':
      if(inventoryDisplayed){
        inventory.style.display = 'none'
        inventoryDisplayed = false
      } else {
        generateSpell()
        inventory.style.display = 'block'
        inventoryDisplayed = true
      }
  }
});

function generateSpell() {
  spellsContainer.innerHTML = "";

  learnedSpells.forEach((spell) => {
    const spellItem = document.createElement("div");
    spellItem.classList.add("spell-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = spell;

    if (selectedSpells.includes(spell)) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", handleSpellSelection);

    const label = document.createElement("label");
    label.textContent = spell;

    spellItem.appendChild(checkbox);
    spellItem.appendChild(label);
    spellsContainer.appendChild(spellItem);
  });
}

function handleSpellSelection(event) {
  const spell = event.target.value;

  if (event.target.checked) {
    if (selectedSpells.length < 2) {
      selectedSpells.push(spell);
    } else {
      event.target.checked = false;
      alert("You can only select two spells");
    }
  } else {
    selectedSpells = selectedSpells.filter((selectedSpell) => selectedSpell !== spell);
  }
}