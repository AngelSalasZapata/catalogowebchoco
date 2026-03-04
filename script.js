document.addEventListener("DOMContentLoaded", function () {

    const galerias = document.querySelectorAll(".galeria");

    galerias.forEach(galeria => {
        const principal = galeria.querySelector(".imagen-principal");
        const miniaturas = galeria.querySelectorAll(".miniaturas img");

        miniaturas.forEach(img => {
            img.addEventListener("click", function () {
                principal.src = this.src;
            });
        });
    });

});