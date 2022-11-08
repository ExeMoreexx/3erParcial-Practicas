const cargarPosts = async () => {
  let url = "https://jsonplaceholder.typicode.com/posts";
  const api = await fetch(url);
  const data = await api.json();
  console.log(data);
  tabla = document.querySelector("#lista");
  data.map((item) => {
    tabla.innerHTML += `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.title}</td>
        <td>${item.body}</td>
        <td><button type="button" class="btn btn-primary float-end mb-3" data-bs-toggle="modal"
        data-bs-target="#editModal"><i class="bi bi-pencil-square"></i>Editar
      </button></td>
        <td><button type="button" class="btn btn-danger float-end mb-3" onclick="borrar()"><i class="bi bi-trash3"></i>Eliminar
      </button></td>
    </tr>
  `;
  });
};

const addPost = async () => {
  let titulo = document.querySelector("#titulo").value;
  let body = document.querySelector("#body").value;
  const post = {
    title: titulo,
    body: body,
    userId: 1
  };

  const api = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset-UTF-8",
    },
  });

  const respuesta = await api.json();
  tabla = document.querySelector("#lista");
  tr = document.createElement("tr");
  tr.innerHTML = `
<th scope="row">${respuesta.id}</th>
            <td>${respuesta.title}</td>
            <td>${respuesta.body}</td>
            <td><button class="btn btn-primary btn-lg"  data-bs-toggle="modal" data-bs-target="#editModal"><i class="bi bi-pencil-square"></i>Editar</button></td>
            <td><button class="btn btn-danger btn-lg"  data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-trash"></i></i>Eliminar</button></td>
`;
  tabla.appendChild(tr);
  if (respuesta != null) {
    Swal.fire({
      icon: "success",
      title: "INSERTAR",
      text: "SE INSERTO CORRECTAMENTE!!",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "ERROR",
      text: "ALG0 FALLO!!!",
    });
  }
};

const borrar = () => {
  Swal.fire({
    title: "Estas Seguro?",
    text: "No Sera Posible Recuperarlo Despues De Ser Borrado!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Borrar!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Exitoso!",
        "El Archivo Fue Borrado Correctamente!.",
        "success"
      );
    }
  });
};
