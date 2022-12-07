import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { app } from "./firebase.js ";

const db = getFirestore(app);
const coleccion = collection(db, "productos");

let editStatus = false;
let id = "";

const onGetAlumnos = (callback) => onSnapshot(coleccion, callback);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetAlumnos((querySnapshot) => {
    const divAlumnos = document.querySelector("#lista");
    divAlumnos.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const producto = doc.data();
      divAlumnos.innerHTML += `
                <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.proveedor}</td>
                    <td>${producto.codigo}</td>
                    <td>${producto.caducidad}</td>
                    <td><button class="btn btn-danger btnEliminarProducto" data-id="${doc.id}"><i class="bi bi-trash"></i></button></td>
                    <td><button class="btn btn-primary btnEditarProducto" data-bs-toggle="modal" data-bs-target="#editModal"   data-id="${doc.id}"><i class="bi bi-pencil"></i></button></td>
                </tr>`;
    });

    const btnsDelete = document.querySelectorAll(".btnEliminarProducto");
    //console.log(btnsDelete);
    btnsDelete.forEach((btn, idx) =>
      btn.addEventListener("click", () => {
        id = btn.dataset.id;
        console.log(btn.dataset.id);
        Swal.fire({
          title: "Estas Seguro De Eliminar Este Producto??",
          showDenyButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then(async (result) => {
          try {
            if (result.isConfirmed) {
              await deleteDoc(doc(db, "productos", id));
              Swal.fire("PRODUCTO ELIMINADO!!!");
            }
          } catch (error) {
            Swal.fire("ERROR AL ELIMINAR REGISTRO");
          }
        });
      })
    );

    const btnEditarProducto = document.querySelectorAll(".btnEditarProducto");
    btnEditarProducto.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          id = btn.dataset.id;
          console.log(id);
          const data = await getDoc(doc(db, "jugadores", id));
          const producto = data.data();
          document.querySelector("#eid").value = producto.id;
          document.querySelector("#enombre").value = producto.nombre;
          document.querySelector("#estock").value = producto.stock;
          document.querySelector("#eproveedor").value = producto.proveedor;
          document.querySelector("#ecodigo").value = producto.codigo;
          document.querySelector("#ecaducidad").value = producto.caducidad;
          editStatus = true;
          id = data.id;
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

const btnAgregarProducto = document.querySelector("#btnAgregarProducto");
btnAgregarProducto.addEventListener("click", () => {
  const id = document.querySelector("#id").value;
  const nombre = document.querySelector("#nombre").value;
  const stock = document.querySelector("#stock").value;
  const proveedor = document.querySelector("#proveedor").value;
  const codigo = document.querySelector("#codigo").value;
  const caducidad = document.querySelector("#caducidad").value;

  if (
    id == "" ||
    nombre == "" ||
    stock == "" ||
    proveedor == "" ||
    codigo == "" ||
    caducidad == ""
  ) {
    Swal.fire("Falta Llenar Campos");
    return;
  }

  const producto = { id, nombre, stock, proveedor, codigo, caducidad};

  if (!editStatus) {
    addDoc(coleccion, producto);
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
  }

  Swal.fire({
    icon: "success",
    title: "EXITO",
    text: "Se guardo correctamente!",
  });
  document.querySelector("#formAddProducto").reset();
});

const btnGuardarProducto = document.querySelector("#btnGuardarProducto");
btnGuardarProducto.addEventListener("click", () => {
  const id = document.querySelector("#eid").value;
  const nombre = document.querySelector("#enombre").value;
  const stock = document.querySelector("#estock").value;
  const proveedor = document.querySelector("#eproveedor").value;
  const codigo = document.querySelector("#ecodigo").value;
  const caducidad = document.querySelector("#ecaducidad").value;

  if (
    id == "" ||
    nombre == "" ||
    stock == "" ||
    proveedor == "" ||
    codigo == "" ||
    caducidad == ""
  ) {
    Swal.fire("Falta Llenar Campos");
    return;
  }

  const producto = { id, nombre, stock, proveedor, codigo, caducidad};

  if (editStatus) {
    updateDoc(doc(db, "productos", id), producto);
    editStatus = false;
    id = "";
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  }

  Swal.fire({
    icon: "success",
    title: "EXITO",
    text: "Se Guardo Correctamente!",
  });
  document.querySelector("#formEditProducto").reset();
});
