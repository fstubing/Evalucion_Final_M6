let mascotas;
let tabla = document.querySelector('#tablaModal')
let btnClose = document.querySelectorAll('.btnCerrarModal')



btnMostrarMascotas.addEventListener("click", () => {

   axios.get("http://localhost:3000/mascotas")
     .then(function (response) {
            tabla.deleteCaption()
            mascotas= response.data.data.mascotas

            let template1 =  `<tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre Mascota</th>
                                <th scope="col">RUN Propietario</th>
                                <th scope="col">Nombre Propietario</th>
                            </tr>`;
            let template2 = "";
            let contador=0
                mascotas.forEach(mascota => {
                    contador++
                    template2 += `
                    <tr scope="row">
                        <td>${contador}</td>
                        <td>${mascota.id}</td>
                        <td>${mascota.nombre}</td>
                        <td>${mascota.propietario.run}</td>
                        <td>${mascota.propietario.nombre}</td>
                    </tr>
                    `
                });
                document.querySelector("#staticBackdropLabel").innerText = `Registro de Mascotas`;
                document.querySelector("#tableHeaders").innerHTML = template1; 
                document.querySelector("#tableBody").innerHTML = template2;
     })
     .catch(function (error) {
        alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
     });

});

btnMascotasxNombre.addEventListener("click", () => {

   let nombreMascota= document.querySelector("#nombre").value;

   axios.get(`http://localhost:3000/mascotas/${nombreMascota}`)
     .then(function (response) {
            tabla.deleteCaption()
            mascotas= response.data.data
            if(mascotas.length==0){
                return alert('Mascota no encontrada'); 
               }else if(nombreMascota.length==0){
                    return alert('Debe ingresar el nombre de la mascota');
                }else{
                    let template1 =  `<tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre Mascota</th>
                                    <th scope="col">RUN Propietario</th>
                                    <th scope="col">Nombre Propietario</th>
                                </tr>`;
                    let template2 = "";
                    let contador=0
                        mascotas.forEach(mascota => {
                            contador++
                            template2 += `
                            <tr scope="row">
                                <td>${contador}</td>
                                <td>${mascota.id}</td>
                                <td>${mascota.nombre}</td>
                                <td>${mascota.propietario.run}</td>
                                <td>${mascota.propietario.nombre}</td>
                            </tr>
                            `
                });
                document.querySelector("#staticBackdropLabel").innerText = `Registro de Mascotas`;
                document.querySelector("#tableHeaders").innerHTML = template1; 
                document.querySelector("#tableBody").innerHTML = template2;
               }
            
     })
     .catch(function (error) {
        alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
     });

});

btnMascotasxRUN.addEventListener("click", () => {

   let runPropietario= document.querySelector("#runPropietario").value;

   axios.get(`http://localhost:3000/mascotas/propietario/${runPropietario}`)
     .then(function (response) {
            tabla.deleteCaption()
            mascotas= response.data.data
            if(mascotas.length==0){
                return alert('No hay mascotas asociadas al run ingresado'); 
               }else if(runPropietario.length==0){
                    return alert('Debe ingresar un número de run válido');
                }else{
                    let template1 =  `<tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre Mascota</th>
                                        <th scope="col">RUN Propietario</th>
                                        <th scope="col">Nombre Propietario</th>
                                    </tr>`;
                    let template2 = "";
                    let contador=0
                        mascotas.forEach(mascota => {
                            contador++
                            template2 += `
                            <tr scope="row">
                                <td>${contador}</td>
                                <td>${mascota.id}</td>
                                <td>${mascota.nombre}</td>
                                <td>${mascota.propietario.run}</td>
                                <td>${mascota.propietario.nombre}</td>
                            </tr>
                            `
                        });
                        document.querySelector("#staticBackdropLabel").innerText = `Registro de Mascotas`;
                        document.querySelector("#tableHeaders").innerHTML = template1; 
                        document.querySelector("#tableBody").innerHTML = template2;
                    }
     })
     .catch(function (error) {
        alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
     });

});


btnGuardarMascota.addEventListener("click", () => {

   let mascota= document.querySelector("#mascota").value;
   let run= document.querySelector("#run").value;
   let propietario= document.querySelector("#propietario").value;

   axios.post('http://localhost:3000/mascotas/', {
      mascota, run, propietario
     })
     .then(function (response) {
        if(response.data.code != 201){
            alert(response.data.message)
        }else {
            alert("Mascota agregada correctamente.")
        }
     })
     .catch(function (error) {
        alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
     });
});


btnDeleteMascota1.addEventListener("click", () => {

    let mascota= document.querySelector("#mascotaName").value;

   axios.delete(`http://localhost:3000/mascotas/${mascota}`)
     .then(function (response) {
        alert(response.data.message);
     })
     .catch(function (error) {
        alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
     });
});


btnDeleteMascota2.addEventListener("click", () => {

    let runPropietario= document.querySelector("#propietarioRun").value;

   axios.delete(`http://localhost:3000/mascotas/propietario/${runPropietario}`)
     .then(function (response) {
        alert(response.data.message);
     })
     .catch(function (error) {
        alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
     });
});



for (let i = 0; i < btnClose.length; i++) {
    btnClose[i].addEventListener('click',  () => {

        document.querySelector("#tableBody").innerHTML = `
        <tr scope="row">
        </tr>
        `;
    })
}