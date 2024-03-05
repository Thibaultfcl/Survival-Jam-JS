var character;

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");

    var characterModal = document.createElement("div");
    characterModal.className = "modal";
    characterModal.id = "characterModal";

    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    var heading = document.createElement("h2");
    heading.textContent = "Choisissez votre personnage";

    var character1Button = document.createElement("button");
    character1Button.id = "character1";
    character1Button.textContent = "Personnage 1";

    var character2Button = document.createElement("button");
    character2Button.id = "character2";
    character2Button.textContent = "Personnage 2";

    modalContent.appendChild(heading);
    modalContent.appendChild(character1Button);
    modalContent.appendChild(character2Button);

    characterModal.appendChild(modalContent);
    document.body.appendChild(characterModal);

    var canvasRect = canvas.getBoundingClientRect();
    var modalWidth = 200; // Largeur du pop-up
    var modalHeight = 150; // Hauteur du pop-up
    characterModal.style.left = canvasRect.left + (canvas.width - modalWidth) / 2 + "px";
    characterModal.style.top = canvasRect.top + (canvas.height - modalHeight) / 2 + "px";

    window.addEventListener("click", function(event) {
        if (event.target == characterModal) {
            characterModal.style.display = "none";
        }
    });

    var character1Button = document.getElementById("character1");
    var character2Button = document.getElementById("character2");

    character1Button.addEventListener("click", function() {
        character = "/assets/img/chat.png";
        characterModal.style.display = "none";
    });

    character2Button.addEventListener("click", function() {
        character = "/assets/img/chien.png";
        characterModal.style.display = "none";
    });
});
