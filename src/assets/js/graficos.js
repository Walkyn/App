
// Datos para el gráfico de Compras
const comprasOptions = {
    chart: {
        type: 'bar',
        height: 400
    },
    series: [{
        name: 'Compras',
        data: [4000, 3000, 2000, 5000, 1000, 3000, 4000, 2000, 1000, 3000]
    }],
    xaxis: {
        categories: ['27-7', '26-7', '19-6', '14-6', '29-4', '16-4', '15-4', '12-4', '10-4', '31-3']
    },
    colors: ['#36a2eb'],
    yaxis: {
        title: {
            text: 'Monto'
        },
        min: 0,
        max: 5000
    },
    title: {
        text: 'Compra de los últimos 10 días',
        align: 'center'
    }
};

// Datos para el gráfico de Ventas
const ventasOptions = {
    chart: {
        type: 'bar',
        height: 400
    },
    series: [{
        name: 'Ventas',
        data: [12000, 10000, 8000, 15000, 9000, 11000, 13000, 14000, 12000, 10000, 9000, 11000]
    }],
    xaxis: {
        categories: ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
    },
    colors: ['#ff6384'],
    yaxis: {
        title: {
            text: 'Monto'
        },
        min: 0,
        max: 15000
    },
    title: {
        text: 'Venta en los últimos 12 meses',
        align: 'center'
    }
};

// Renderizar los gráficos
window.onload = function() {
    const comprasChart = new ApexCharts(document.querySelector('#comprasChart'), comprasOptions);
    comprasChart.render();

    const ventasChart = new ApexCharts(document.querySelector('#ventasChart'), ventasOptions);
    ventasChart.render();
};
