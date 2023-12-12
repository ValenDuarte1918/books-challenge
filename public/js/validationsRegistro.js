const inputNombre = document.querySelector('#name');
    inputNombre.focus();
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errores = []
        
        if(form.name.value == '' || form.name.value.length < 2) {
            form.name.classList.remove('valid');
            form.name.classList.add('errors');
            errores.push('El nombre debe de tener al menos 2 caracteres.');
        } else {
            form.name.classList.remove('errors');
            form.name.classList.add('valid');
        }
        if(form.password.value == '' || form.password.value.length < 2) {
            form.password.classList.remove('valid');
            form.password.classList.add('errors');
            errores.push('La contraseña debe de tener al menos 8 caracteres.');
        } else {
            form.password.classList.remove('errors');
            form.password.classList.add('valid');
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