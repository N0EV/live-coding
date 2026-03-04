/*
let login = document.getElementById("exec-cmd");
let inputValue = document.getElementById("user");
let inputpass = document.getElementById("pass");
let inputpass2 = document.getElementById("pass2");
let userLabel = document.getElementById("nameuser");

const regexSeguridad = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

login.addEventListener("click", function (e) {
    e.preventDefault();

    // 1. Validaciones de seguridad
    if (!regexSeguridad.test(inputpass.value)) {
        Swal.fire({ title: 'Error de seguridad', text: 'Mínimo 8 caracteres...', icon: 'error' });
        return;
    }

    // 2. Validar coincidencia (solo si existe pass2 en el HTML)
    if (inputpass2 && inputpass.value !== inputpass2.value) {
        Swal.fire({ title: 'No coinciden', icon: 'error' });
        return;
    }

    // 3. ENVIAR AL BACKEND (Esto debe ir AQUÍ dentro)
    fetch('http://localhost:5000/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: inputValue.value,
            pass: inputpass.value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Servidor Python dice:", data);
        Swal.fire({ title: '¡Perfecto!', text: 'Registro completado.', icon: 'success' });
        userLabel.textContent = "[#" + inputValue.value + "@fsociety]";
    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire({ title: 'Error de conexión', text: '¿Está Docker encendido?', icon: 'error' });
    });
});*/

let registro = document.getElementById("exec-cmd");
let login = document.getElementById("exec-cmd-login");
let inputValue = document.getElementById("user");
let inputpass = document.getElementById("pass");
let inputpass2 = document.getElementById("pass2"); // Esto será null en Login
let userLabel = document.getElementById("nameuser");

const regexSeguridad = /^(?=.*[A-Z])(?=.*\d).{8,}$/;


if(registro){
  registro.addEventListener("click", function (e) {
      e.preventDefault();
  
      // 1. Validar que los campos no estén vacíos
      if (!inputValue.value || !inputpass.value) {
          Swal.fire({ title: 'Campos incompletos', text: 'Introduce ID y PASSWORD', icon: 'warning' });
          return;
      }
  
      // 2. Validar seguridad (Solo si estás registrando, pero lo mantenemos por tu petición)
      if (!regexSeguridad.test(inputpass.value)) {
          Swal.fire({ title: 'Error de seguridad', text: 'Mínimo 8 caracteres, una mayúscula y un número.', icon: 'error' });
          return;
      }
  
      // 3. Validar coincidencia SOLO SI EXISTE el segundo campo (Registro)
      if (inputpass2 && inputpass.value !== inputpass2.value) {
          Swal.fire({ title: 'No coinciden', text: 'Las contraseñas deben ser iguales', icon: 'error' });
          return;
      }
  
      // 4. ENVIAR AL BACKEND
      fetch('http://localhost:5000/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              user: inputValue.value,
              pass: inputpass.value
          })
      })
      .then(response => {
          if (!response.ok) throw new Error('Error en el servidor');
          return response.json();
      })
      .then(data => {
          console.log("Servidor Python dice:", data);
          Swal.fire({ 
              title: '¡Acceso Concedido!', 
              text: 'Datos sincronizados con la base de datos.', 
              icon: 'success',
              confirmButtonColor: '#28a745'
          });
          userLabel.textContent = "[#" + inputValue.value + "@fsociety]";
      })
      .catch(error => {
          console.error("Error:", error);
          Swal.fire({ title: 'Servidor Offline', text: 'Revisa que Docker esté corriendo en el puerto 5000', icon: 'error' });
      });
  });
}

if(login){
  login.addEventListener("click", function (e) {
      e.preventDefault();
  
      const datos = {
          user: inputValue.value,
          pass: inputpass.value
      };
  
      // Petición a la nueva ruta /login
      fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === "success") {
              Swal.fire({
                  title: 'ACCESO CONCEDIDO',
                  text: 'Bienvenido al sistema, Nivel 4.',
                  icon: 'success',
                  confirmButtonColor: '#28a745'
              });
              userLabel.textContent = "[#" + datos.user + "@fsociety]";
          } else {
              Swal.fire({
                  title: 'ERROR DE ACCESO',
                  text: data.msg,
                  icon: 'error',
                  confirmButtonColor: '#d33'
              });
          }
      })
      .catch(error => {
          console.error("Error:", error);
          Swal.fire({ title: 'Servidor Offline', icon: 'error' });
      });
  });
}