document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            // Guardar el token en localStorage y redirigir
            localStorage.setItem('token', result.accessToken);
            window.location.href = '/tareas'; // Cambiar a la ruta de tareas
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
