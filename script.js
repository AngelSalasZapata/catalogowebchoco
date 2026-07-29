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

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <span class="lightbox-cerrar">&times;</span>
        <div class="lightbox-contenedor">
            <img src="" alt="Vista previa">
        </div>
        <div class="lightbox-zoom-controls">
            <button class="lightbox-zoom-btn" id="zoom-in">+</button>
            <span class="lightbox-zoom-nivel" id="zoom-nivel">100%</span>
            <button class="lightbox-zoom-btn" id="zoom-out">-</button>
            <button class="lightbox-zoom-btn" id="zoom-reset">&#x21BA;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");
    const cerrar = lightbox.querySelector(".lightbox-cerrar");
    const zoomIn = lightbox.querySelector("#zoom-in");
    const zoomOut = lightbox.querySelector("#zoom-out");
    const zoomReset = lightbox.querySelector("#zoom-reset");
    const zoomNivel = lightbox.querySelector("#zoom-nivel");

    let escala = 1;
    let escalaMax = 5;
    let escalaMin = 0.5;

    function actualizarZoom() {
        lightboxImg.style.transform = `scale(${escala})`;
        zoomNivel.textContent = `${Math.round(escala * 100)}%`;
    }

    function abrirLightbox(src) {
        lightboxImg.src = src;
        escala = 1;
        actualizarZoom();
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function cerrarLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".imagen-principal").forEach(img => {
        img.addEventListener("click", function () {
            abrirLightbox(this.src);
        });
    });

    cerrar.addEventListener("click", cerrarLightbox);

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            cerrarLightbox();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") {
            cerrarLightbox();
        }
    });

    zoomIn.addEventListener("click", function () {
        if (escala < escalaMax) {
            escala = Math.min(escala + 0.5, escalaMax);
            actualizarZoom();
        }
    });

    zoomOut.addEventListener("click", function () {
        if (escala > escalaMin) {
            escala = Math.max(escala - 0.5, escalaMin);
            actualizarZoom();
        }
    });

    zoomReset.addEventListener("click", function () {
        escala = 1;
        actualizarZoom();
        lightboxImg.style.left = "0px";
        lightboxImg.style.top = "0px";
    });

    lightboxImg.addEventListener("wheel", function (e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            escala = Math.min(escala + 0.25, escalaMax);
        } else {
            escala = Math.max(escala - 0.25, escalaMin);
        }
        actualizarZoom();
    }, { passive: false });

    let isDragging = false;
    let startX, startY, offsetX = 0, offsetY = 0;

    lightboxImg.addEventListener("mousedown", function (e) {
        if (escala > 1) {
            isDragging = true;
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;
            lightboxImg.classList.add("dragging");
        }
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        lightboxImg.style.transform = `scale(${escala}) translate(${offsetX / escala}px, ${offsetY / escala}px)`;
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        lightboxImg.classList.remove("dragging");
    });

});
