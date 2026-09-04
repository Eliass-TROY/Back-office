const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("show");
});

// Fermer le menu en cliquant en dehors de la sidebar
document.addEventListener("click", function (event) {
    if ( sidebar.classList.contains("show") && !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
        sidebar.classList.remove("show");
    }
});

// saisine/saisine.js
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const gravityFilter = document.getElementById("gravityFilter");
const table = document.getElementById("saisinesTable");
const resultCount = document.getElementById("resultCount");

function filterSaisines() {
    const search = searchInput.value.toLowerCase();
    const status = statusFilter.value;
    const gravity = gravityFilter.value;
    const rows = table.querySelectorAll("tr");
    let count = 0;

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const statusText = row.children[5].textContent.trim();
        const gravityText = row.children[4].textContent.trim();
        const searchMatch = text.includes(search);
        const statusMatch = status === "all" || statusText === status;
        const gravityMatch = gravity === "all" || gravityText === gravity;

        if (searchMatch && statusMatch && gravityMatch) {
            row.style.display = "";
            count++;
        } else {
            row.style.display = "none";
        }
    });
    resultCount.textContent = count + " saisine(s) trouvée(s)";
}

searchInput.addEventListener( "input", filterSaisines);
statusFilter.addEventListener( "change", filterSaisines);
gravityFilter.addEventListener( "change", filterSaisines);

/* ACTION DE TRAITEMENT */
document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", function () {
        const row = this.closest("tr");
        const reference =row.children[0].textContent;
    });
});

function ouvrirTraitement(reference) {
    const fenetre = document.getElementById("fenetreTraitement");
    const iframe = document.getElementById("traitementFrame");

    // Ouvre la page traitement
    iframe.src = "traitement/traitement.html?reference=" + reference;

    // Affiche la fenêtre
    fenetre.style.display = "flex";
}


function fermerTraitement() {
    const fenetre = document.getElementById("fenetreTraitement");
    const iframe = document.getElementById("traitementFrame");

    // Ferme la fenêtre
    fenetre.style.display = "none";

    // Vide l'iframe
    iframe.src = "";
}

const fenetre = document.getElementById("fenetreTraitement");
const contenu = document.querySelector(".contenu-traitement");
const header = document.getElementById("windowHeader");

let deplacement = false;
let positionX = 0;
let positionY = 0;


header.addEventListener("mousedown", function(e) {
    deplacement = true;

    const rect = contenu.getBoundingClientRect();

    positionX = e.clientX - rect.left;
    positionY = e.clientY - rect.top;

});


document.addEventListener("mousemove", function(e) {
    if (!deplacement) return;

    let x = e.clientX - positionX;
    let y = e.clientY - positionY;

    contenu.style.left = x + "px";
    contenu.style.top = y + "px";
});


document.addEventListener("mouseup", function() {
    deplacement = false;

});