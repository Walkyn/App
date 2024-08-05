function actualizarHora() {
    const fechaElemento = document.getElementById('fecha');
    const tiempoElemento = document.getElementById('tiempo');

    const ahora = new Date();

    const opcionesFecha = { 
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const opcionesHora = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };

    const fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha).toUpperCase();
    const tiempoFormateado = ahora.toLocaleTimeString('es-ES', opcionesHora);

    fechaElemento.textContent = fechaFormateada;
    tiempoElemento.textContent = tiempoFormateado;
}

setInterval(actualizarHora, 1000);
actualizarHora();
