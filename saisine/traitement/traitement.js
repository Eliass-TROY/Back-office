const params = new URLSearchParams(window.location.search);

const reference = params.get("reference");

if (reference) {
    document.getElementById("reference").textContent =
        "Référence : " + reference;

    document.getElementById("refInfo").textContent =
        reference;
}

const formCard = document.getElementById(".form-card");
const cancelBtn = document.getElementById(".cancel");

cancelBtn.addEventListener("click", function () {
    formCard.style.display = "none";
});