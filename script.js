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