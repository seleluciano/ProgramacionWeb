document.addEventListener('DOMContentLoaded', function () {
    // Gráfico de distribución de tareas
    const dataDistribucion = [{
        x: ['Pendientes', 'Completadas', 'Vencidas'],
        y: [tareasPendientes, tareasCompletadas, tareasVencidas],
        type: 'bar'
    }];

    const layoutDistribucion = {
        title: 'Distribución de las Tareas',
        xaxis: { title: 'Estado de la Tarea' },
        yaxis: { title: 'Cantidad' }
    };

    Plotly.newPlot('grafico', dataDistribucion, layoutDistribucion);
});
