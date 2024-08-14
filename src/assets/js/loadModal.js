document.addEventListener('DOMContentLoaded', () => {
    console.log('loadModal.js script loaded');

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const createProductButton = document.getElementById('createProductButton');
    const addClientButton = document.getElementById('addClientButton');
    const closeButton = document.getElementById('closeModalButton');
    const loadingOverlay = document.createElement('div');
    loadingOverlay.classList.add('loading');
    loadingOverlay.innerHTML = '<div class="spinner"></div>';

    // Función para mostrar el modal
    function showModal(htmlFile) {
        modal.classList.remove('hidden');
        modal.classList.add('opacity-0', 'scale-90');
        document.body.appendChild(loadingOverlay);

        fetch(htmlFile)
            .then(response => response.text())
            .then(data => {
                modalBody.innerHTML = data;
                document.body.removeChild(loadingOverlay);
                modal.classList.remove('opacity-0', 'scale-90');
                modal.classList.add('opacity-100', 'scale-100');
            })
            .catch(error => {
                console.error(`Error al cargar el formulario de ${htmlFile}:`, error);
                document.body.removeChild(loadingOverlay);
            });
    }

    // Listener para crear producto
    if (createProductButton) {
        createProductButton.addEventListener('click', () => {
            showModal('../productos/registrarProductos.html');
        });
    }

    // Listener para agregar cliente
    if (addClientButton) {
        addClientButton.addEventListener('click', () => {
            showModal('../clientes/agregar.html');
        });
    }

    // Listener para cerrar el modal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.classList.remove('opacity-100', 'scale-100');
            modal.classList.add('opacity-0', 'scale-90');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        });
    }
});
