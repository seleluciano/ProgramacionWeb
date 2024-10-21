document.getElementById('registro-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/usuarios/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            // Redirigir o hacer otra acción después del registro exitoso
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
