const carouselStates = {};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".section").forEach((section) => {
        const sectionId = section.id;
        const carousel = section.querySelector(".carousel");
        const items = Array.from(carousel.querySelectorAll(".carousel-item"));

        // Clonar elementos al principio y al final
        const clonesStart = items.map((item) => item.cloneNode(true));
        const clonesEnd = items.map((item) => item.cloneNode(true));

        clonesStart.forEach((clone) => carousel.insertBefore(clone, carousel.firstChild));
        clonesEnd.forEach((clone) => carousel.appendChild(clone));

        const itemWidth = items[0].offsetWidth + 10; // Ancho de cada elemento
        const totalItems = items.length;

        // Guardar el estado inicial para este carrusel
        carouselStates[sectionId] = {
            currentIndex: totalItems, // Posición inicial en los originales
            itemWidth: itemWidth,
            totalItems: totalItems,
        };

        // Configurar la posición inicial
        carousel.style.transform = `translateX(-${totalItems * itemWidth}px)`;
    });
});

function moveCarousel(sectionId, direction) {
    const state = carouselStates[sectionId];
    const section = document.getElementById(sectionId);
    const carousel = section.querySelector(".carousel");

    // Mover el índice
    if (direction === "left") {
        state.currentIndex -= 1;
    } else if (direction === "right") {
        state.currentIndex += 1;
    }

    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${state.currentIndex * state.itemWidth}px)`;

    // Ajustar el índice al alcanzar los límites
    carousel.addEventListener(
        "transitionend",
        () => {
            const totalClones = state.totalItems * 2; // Clones al inicio y al final
            if (state.currentIndex === 0) {
                carousel.style.transition = "none"; // Deshabilitar transición temporalmente
                state.currentIndex = state.totalItems; // Saltar al final de los originales
                carousel.style.transform = `translateX(-${state.currentIndex * state.itemWidth}px)`;
            } else if (state.currentIndex === totalClones) {
                carousel.style.transition = "none"; // Deshabilitar transición temporalmente
                state.currentIndex = state.totalItems; // Saltar al inicio de los originales
                carousel.style.transform = `translateX(-${state.currentIndex * state.itemWidth}px)`;
            }
        },
        { once: true } // Ejecutar el evento solo una vez
    );
}
