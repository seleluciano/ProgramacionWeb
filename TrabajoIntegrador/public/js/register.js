$(function() {
    $('#registrarForm').on('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

        // Obtener datos del formulario
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const email = $('#email').val();
        const password = $('#password').val();

        // Realizar la solicitud AJAX
        $.ajax({
            type: 'POST',
            url: '/usuarios/registrar', // Asegúrate de que esta sea la ruta correcta
            data: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password
            },
            success: function(response) {
                // Aquí puedes manejar la respuesta exitosa
                $('#mensaje').text(response.message).css('color', 'green').show();
                // Redireccionar o hacer algo más
            },
            error: function(xhr) {
                // Aquí puedes manejar el error
                $('#mensaje').text(xhr.responseJSON.message).css('color', 'red').show();
            }
        });
    });
});
