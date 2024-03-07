var selectedCharacter;

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");

    var characterModal = document.createElement("div");
    characterModal.className = "modal";
    characterModal.id = "characterModal";

    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    var heading = document.createElement("h2");
    heading.textContent = "Choose your character";

    var characterPreview = document.createElement("img");
    characterPreview.id = "characterPreview";
    characterPreview.src = "";

    var character1Button = document.createElement("button");
    character1Button.id = "character1";
    character1Button.textContent = "Knight";

    var character2Button = document.createElement("button");
    character2Button.id = "character2";
    character2Button.textContent = "Mage";

    var confirmButton = document.createElement("button");
    confirmButton.id = "confirmButton";
    confirmButton.textContent = "Confirm";

    modalContent.appendChild(heading);
    modalContent.appendChild(character1Button);
    modalContent.appendChild(character2Button);
    modalContent.appendChild(characterPreview);
    modalContent.appendChild(confirmButton);

    characterModal.appendChild(modalContent);
    document.body.appendChild(characterModal);

    var canvasRect = canvas.getBoundingClientRect();
    var modalWidth = 280;
    var modalHeight = 250;
    characterModal.style.left = canvasRect.left + (canvas.width - modalWidth) / 2 + "px";
    characterModal.style.top = canvasRect.top + (canvas.height - modalHeight) / 2 + "px";

    var character1Button = document.getElementById("character1");
    var character2Button = document.getElementById("character2");
    var characterPreview = document.getElementById("characterPreview");
    var confirmButton = document.getElementById("confirmButton");

    character1Button.addEventListener("click", function() {
        selectedCharacter = "/assets/img/chevalier.png";
        characterPreview.src = selectedCharacter;
    });

    character2Button.addEventListener("click", function() {
        selectedCharacter = "/assets/img/mage.png";
        characterPreview.src = selectedCharacter;
    });

    confirmButton.addEventListener("click", function() {
        if (selectedCharacter) {
            characterModal.style.display = "none";
            startGame(selectedCharacter);
        } else {
            alert("Please select a character.");
        }
    });
});