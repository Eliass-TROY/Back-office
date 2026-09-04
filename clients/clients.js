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

const searchInput = document.getElementById("searchInput");
const clientsTable = document.getElementById("clientsTable");
const resultCount = document.getElementById("resultCount");

searchInput.addEventListener("input", function () {
    const search = this.value.toLowerCase();
    const rows = clientsTable.querySelectorAll("tr");
    let count = 0;

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(search)) {
            row.style.display = "";
            count++;
        } else {
            row.style.display = "none";
        }
    });

    resultCount.textContent = count + " client(s) trouvé(s)";
});