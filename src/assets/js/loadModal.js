  document.addEventListener('DOMContentLoaded', () => {
    console.log('loadModal.js script loaded');
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        const createProductButton = document.getElementById('createProductButton');
        const closeButton = document.getElementById('closeModalButton');
        const loadingOverlay = document.createElement('div');
        loadingOverlay.classList.add('loading');
        loadingOverlay.innerHTML = '<div class="spinner"></div>';

        createProductButton.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.classList.add('opacity-0', 'scale-90');
            document.body.appendChild(loadingOverlay);  // Mostrar animación de carga
            fetch('../productos/registrarProductos.html')
                .then(response => response.text())
                .then(data => {
                    modalBody.innerHTML = data;
                    document.body.removeChild(loadingOverlay); // Ocultar animación de carga
                    modal.classList.remove('opacity-0', 'scale-90');
                    modal.classList.add('opacity-100', 'scale-100'); // Mostrar modal con animación
                })
                .catch(error => {
                    console.error('Error al cargar el formulario:', error);
                    document.body.removeChild(loadingOverlay); // Ocultar animación de carga
                });
        });

        closeButton.addEventListener('click', () => {
            modal.classList.remove('opacity-100', 'scale-100');
            modal.classList.add('opacity-0', 'scale-90'); // Ocultar modal con animación
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300); // Tiempo de duración de la animación
        });
    });