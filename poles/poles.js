const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        sidebar.classList.toggle("show");
    });

    document.addEventListener("click", function (event) {
        if (sidebar.classList.contains("show") && !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
            sidebar.classList.remove("show");
        }
    });
}

// MODAL : AJOUTER UN PÔLE
const addPoleBtn = document.getElementById("addPoleBtn");
const poleModal = document.getElementById("poleModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const poleForm = document.getElementById("poleForm");

/* OUVRIR */
if (addPoleBtn && poleModal) {
    addPoleBtn.addEventListener("click", function () {
        poleModal.classList.add("show");
    });
}

/* FERMER AVEC X */
if (closeModal && poleModal) {
    closeModal.addEventListener("click", function () {
        poleModal.classList.remove("show");
    });
}

/* FERMER AVEC ANNULER */
if (cancelBtn && poleModal) {
    cancelBtn.addEventListener("click", function () {
        poleModal.classList.remove("show");
        if (poleForm) {
            poleForm.reset();
        }
    });
}

/* FERMER EN CLIQUANT SUR LE FOND */
if (poleModal) {
    poleModal.addEventListener("click", function (event) {
        if (event.target === poleModal) {
            poleModal.classList.remove("show");
            if (poleForm) {
                poleForm.reset();
            }
        }
    });
}

// AJOUTER UN NOUVEAU PÔLE
if (poleForm) {
    poleForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Récupérer les données
        const poleName = document.getElementById("poleName").value.trim();
        const poleDescription = document.getElementById("poleDescription").value.trim();
        const poleStatus = document.getElementById("poleStatus").value;

        // Vérification
        if (poleName === "" || poleDescription === "") {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        // Liste des pôles
        const polesList = document.getElementById("polesList");

        // Créer la carte
        const newPole = document.createElement("div");
        newPole.classList.add("pole-card");

        // Classe du badge
        const badgeClass = poleStatus === "Actif" ? "active" : "inactive";

        // Contenu
        newPole.innerHTML = `
            <div class="pole-icon">
                <i class='bx bx-building-house'></i>
            </div>

            <div class="pole-info">
                <h3>${poleName}</h3>
                <p>${poleDescription}</p>
                <span>0 saisines</span>
            </div>

            <div class="pole-status">
                <span class="badge ${badgeClass}">
                    ${poleStatus}
                </span>
            </div>

            <!-- MENU 3 POINTS -->
            <div class="pole-menu">
                <button class="pole-menu-btn" type="button">
                    <i class='bx bx-dots-vertical-rounded'></i>
                </button>

                <div class="pole-menu-content">
                    <button type="button" class="set-active">
                        <i class='bx bx-check-circle'></i>
                        Actif
                    </button>

                    <button type="button" class="set-inactive">
                        <i class='bx bx-x-circle'></i>
                        Inactif
                    </button>

                    <button type="button" class="delete-pole">
                        <i class='bx bx-trash'></i>
                        Supprimer
                    </button>
                </div>
            </div>
        `;

        // Ajouter à la liste
        polesList.appendChild(newPole);

        // Fermer
        poleModal.classList.remove("show");

        // Vider
        poleForm.reset();
    });

}

// MENU 3 POINTS
document.addEventListener("click", function (event) {

    // BOUTON 3 POINTS
    const menuButton = event.target.closest(".pole-menu-btn");

    if (menuButton) {
        const menu =  menuButton.parentElement.querySelector(".pole-menu-content");

        // Fermer les autres menus
        document.querySelectorAll(".pole-menu-content").forEach(function (item) {
                if (item !== menu) {
                    item.classList.remove("show");
                }
            });

        // Ouvrir celui-ci
        menu.classList.toggle("show");
        return;
    }

    // ACTIF
    const activeButton = event.target.closest(".set-active");

    if (activeButton) {
        const poleCard = activeButton.closest(".pole-card");
        const badge = poleCard.querySelector(".pole-status .badge");

        // Changer le texte
        badge.textContent = "Actif";

        // Changer les classes
        badge.classList.remove("inactive");
        badge.classList.add("active");

        // Fermer le menu
        activeButton.closest(".pole-menu-content").classList.remove("show");
        return;
    }

    // INACTIF
    const inactiveButton = event.target.closest(".set-inactive");

    if (inactiveButton) {
        const poleCard = inactiveButton.closest(".pole-card");
        const badge = poleCard.querySelector(".pole-status .badge");

        // Changer le texte
        badge.textContent = "Inactif";

        // Changer les classes
        badge.classList.remove("active");
        badge.classList.add("inactive");

        // Fermer le menu
        inactiveButton.closest(".pole-menu-content").classList.remove("show");
        return;
    }

    // SUPPRIMER
    const deleteButton = event.target.closest(".delete-pole");

    if (deleteButton) {
        const poleCard = deleteButton.closest(".pole-card");
        const poleName = poleCard.querySelector(".pole-info h3").textContent.trim();

        // Demander confirmation
        const confirmation = confirm('Voulez-vous supprimer le pôle "' +  poleName + '" ?');

        if (confirmation) {
            poleCard.remove();
        }
        return;
    }

    // CLIQUER AILLEURS
    if (!event.target.closest(".pole-menu")) {
        document.querySelectorAll(".pole-menu-content").forEach(function (menu) {
                menu.classList.remove("show");
            });
    }
});