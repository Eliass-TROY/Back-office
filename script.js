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
        const statusText =
            row.children[5].textContent.trim();

        const gravityText =
            row.children[4].textContent.trim();


        const searchMatch =
            text.includes(search);


        const statusMatch =
            status === "all" ||
            statusText === status;


        const gravityMatch =
            gravity === "all" ||
            gravityText === gravity;


        if (
            searchMatch &&
            statusMatch &&
            gravityMatch
        ) {

            row.style.display = "";

            count++;

        } else {

            row.style.display = "none";

        }

    });


    resultCount.textContent =
        count + " saisine(s) trouvée(s)";
}


searchInput.addEventListener(
    "input",
    filterSaisines
);


statusFilter.addEventListener(
    "change",
    filterSaisines
);


gravityFilter.addEventListener(
    "change",
    filterSaisines
);


/* ACTION DE TRAITEMENT */

document.querySelectorAll(".view-btn").forEach(button => {

    button.addEventListener("click", function () {

        const row = this.closest("tr");

        const reference =
            row.children[0].textContent;

        alert(
            "Ouverture du traitement de : " +
            reference
        );

    });

});