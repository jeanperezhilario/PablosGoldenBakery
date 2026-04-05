document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('#products .card-img-top');
    const modalImage = document.getElementById('galleryModalImage');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    let currentIndex = 0;

    const images = [
        { src: 'images/Alfajores.png', alt: 'Alfajores' },
        { src: 'images/FotoTorta.png', alt: 'Torta personalizada' },
        { src: 'images/MilHojas.png', alt: 'Mil Hojas' },
        { src: 'images/PieDeLimon.png', alt: 'Pie de limón' },
        { src: 'images/Pionono.png', alt: 'Pionono' },
        { src: 'images/SelvaNegra.png', alt: 'Selva Negra' },
        { src: 'images/Torta.png', alt: 'Torta especial' },
        { src: 'images/TortaChocolate.png', alt: 'Torta de chocolate' },
        { src: 'images/TortaHelada.png', alt: 'Torta helada' }
    ];

    function showImage(index) {
        currentIndex = index;
        modalImage.src = images[index].src;
        modalImage.alt = images[index].alt;
        galleryModal.show();
    }

    productImages.forEach((img) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const index = parseInt(this.dataset.index, 10);
            if (!Number.isNaN(index)) {
                showImage(index);
            }
        });
    });

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    document.addEventListener('keydown', function(event) {
        if (galleryModal._isShown) {
            if (event.key === 'ArrowLeft') {
                prevButton.click();
            } else if (event.key === 'ArrowRight') {
                nextButton.click();
            } else if (event.key === 'Escape') {
                galleryModal.hide();
            }
        }
    });

    // Botón Cómo llegar: abre Google Maps en una nueva pestaña con la ubicación de la tienda
    const directionsButton = document.getElementById('btn-directions');
    if (directionsButton) {
        directionsButton.addEventListener('click', function(event) {
            event.preventDefault();
            const destination = '-12.058887546511354,-75.19829856326074';
            const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formEndpoint = 'https://formspree.io/f/xlgoowqk';
        const messageBox = document.getElementById('formMessage');
        let messageTimer = null;

        function showFormMessage(text, type) {
            clearTimeout(messageTimer);
            messageBox.textContent = text;
            messageBox.classList.remove('d-none', 'alert-success', 'alert-danger');
            messageBox.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
            messageTimer = setTimeout(() => {
                messageBox.classList.add('d-none');
            }, 6000);
        }

        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(formEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormMessage('¡Gracias! Tu mensaje se ha enviado y pronto te responderemos.', 'success');
                    contactForm.reset();
                } else {
                    showFormMessage('No se pudo enviar el mensaje. Intenta de nuevo en unos instantes.', 'danger');
                }
            } catch (error) {
                console.error('Error enviando el formulario:', error);
                showFormMessage('Hubo un problema al enviar el mensaje. Por favor, prueba más tarde.', 'danger');
            }
        });
    }
});
