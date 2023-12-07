window.onload = function() {
    const inputNombre = document.querySelector('#email');
    inputNombre.focus();
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errores = []
        
        if(form.email.value == '' || form.email.value.length < 2) {
            form.email.classList.remove('valid');
            form.email.classList.add('errors');
            errores.push('El nombre debe de tener al menos 2 caracteres.');
        } else {
            form.email.classList.remove('errors');
            form.email.classList.add('valid');
        }
        if(form.apellido.value == '' || form.apellido.value.length < 2) {
            form.apellido.classList.remove('valid');
            form.apellido.classList.add('errors');
            errores.push('El apellido debe de tener al menos 3 caracteres.');
        } else {
            form.apellido.classList.remove('errors');
            form.apellido.classList.add('valid');
        }

        const ul = document.querySelector('.errores');

        if (errores.length != 0) {
            ul.innerHTML = ''
            ul.classList.add('alert-warning');
            for (let i = 0; i < errores.length; i++) {
                const error = errores[i];
                ul.innerHTML += `<li>${error}</li>`;
            }
            Swal.fire(
                {icon : 'error',
                title : 'Hubo un error!',
                text : 'Revisar los errores!'
            }
            )
        } else {
          Swal.fire(
            'Buen trabajo!',
            'Te registraste con exito!',
            'success'
          ).then (()=> {
            form.submit()
          })
          }
        })
}