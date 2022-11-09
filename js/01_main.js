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
        data-bs-target="#editModal"><i class="bi bi-pencil-square" onclick="editPost(${item.id})"></i>Editar
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
    userId: 1,
  };
  console.log(post);

  const api = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset-UTF-8",
    },
  });

  const item = await api.json();
  console.log(item);
  tabla = document.querySelector("#lista");
  tr = document.createElement("tr");
  tr.innerHTML = `
  <tr>
  <th scope="row">${item.id}</th>
        <td>${item.title}</td>
        <td>${item.body}</td>
        <td><button type="button" class="btn btn-primary float-end mb-3" data-bs-toggle="modal"
        data-bs-target="#editModal" onclick="editPost(${item.id})"><i class="bi bi-pencil-square"></i>Editar
      </button></td>
        <td><button type="button" class="btn btn-danger float-end mb-3" onclick="borrar(${item.id})"><i class="bi bi-trash3"></i>Eliminar
      </button></td>
    </tr>
`;
  tabla.appendChild(tr);
  if (item != null) {
    Swal.fire({
      icon: "success",
      title: "Insertar",
      text: "Se Inserto Correctamente!!",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Algo Fallo!",
    });
  }
};

const editPost = async (id) => {
  const api = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const respuesta = await api.json();
  console.log(respuesta);
  document.querySelector("#etitle").value = respuesta.title;
  document.querySelector("#ebody").value = respuesta.body;
  document.querySelector("#eid").value = respuesta.id;
  document.querySelector("#euserid").value = respuesta.userId;
};

const savePost = async () => {
  document.querySelector("#etitle").value;
  document.querySelector("#ebody").value;
  document.querySelector("#eid").value;
  document.querySelector("#euserid").value;
  const post = {
    title: titulo,
    body: body,
    id: id,
    userId: userId,
  };
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
