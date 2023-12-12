const inputNombre = document.querySelector('#email');
    inputNombre.focus();
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errores = []
        
        if(form.email.value == '') {
            form.email.classList.remove('.valid');
            form.email.classList.add('.errors');
            errores.push('El campo "Email" es obligatorio.');
        } else {
            form.email.classList.remove('errors');
            form.email.classList.add('valid');
        }
        if(form.password.value == '') {
            form.password.classList.remove('.valid');
            form.password.classList.add('.errors');
            errores.push('El campo Password" es obligatorio.');
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
        
        } else {
            form.submit();
        }
    }
    )       