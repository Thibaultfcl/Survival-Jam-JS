const inventoryNPC = document.getElementById("inventoryNPC");

function toggleInventory() {
  inventoryNPC.classList.toggle("hidden");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "i") {
    console.log("Bouton I");
    toggleInventory();
  }
});
