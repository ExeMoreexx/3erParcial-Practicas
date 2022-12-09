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
const coleccion = collection(db, "jugadores");

let editStatus = false;
let id = "";

const onGetAlumnos = (callback) => onSnapshot(coleccion, callback);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetAlumnos((querySnapshot) => {
    const divAlumnos = document.querySelector("#lista");
    divAlumnos.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const jugador = doc.data();
      divAlumnos.innerHTML += `
                <tr>
                    <td>${jugador.num}</td>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.apellido}</td>
                    <td>${jugador.edad}</td>
                    <td>${jugador.nacionalidad}</td>
                    <td>${jugador.posicion}</td>
                    <td>${jugador.goles}</td>
                    <td>${jugador.asistencias}</td>
                    <td><button class="btn btn-danger btnEliminarJugador" data-id="${doc.id}"><i class="bi bi-trash"></i></button></td>
                    <td><button class="btn btn-primary btnEditarJugador" data-bs-toggle="modal" data-bs-target="#editModal"   data-id="${doc.id}"><i class="bi bi-pencil"></i></button></td>
                </tr>`;
    });

    const btnsDelete = document.querySelectorAll(".btnEliminarJugador");
    //console.log(btnsDelete);
    btnsDelete.forEach((btn, idx) =>
      btn.addEventListener("click", () => {
        id = btn.dataset.id;
        console.log(btn.dataset.id);
        Swal.fire({
          title: "Estas Seguro De Eliminar Este Jugador??",
          showDenyButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then(async (result) => {
          try {
            if (result.isConfirmed) {
              await deleteDoc(doc(db, "jugadores", id));
              Swal.fire("Jugador ELIMINADO!!!");
            }
          } catch (error) {
            Swal.fire("ERROR AL ELIMINAR REGISTRO");
          }
        });
      })
    );

    const btnEditarJugador = document.querySelectorAll(".btnEditarJugador");
    btnEditarJugador.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          id = btn.dataset.id;
          console.log(id);
          const data = await getDoc(doc(db, "jugadores", id));
          const jugador = data.data();
          document.querySelector("#enum").value = jugador.num;
          document.querySelector("#enombre").value = jugador.nombre;
          document.querySelector("#eapellido").value = jugador.apellido;
          document.querySelector("#eedad").value = jugador.edad;
          document.querySelector("#enacionalidad").value = jugador.nacionalidad;
          document.querySelector("#eposicion").value = jugador.posicion;
          document.querySelector("#egoles").value = jugador.goles;
          document.querySelector("#easistencias").value = jugador.asistencias;
          editStatus = true;
          id = data.id;
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

const btnAgregarJugador = document.querySelector("#btnAgregarJugador");
btnAgregarJugador.addEventListener("click", () => {
  const num = document.querySelector("#num").value;
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const edad = document.querySelector("#edad").value;
  const nacionalidad = document.querySelector("#nacionalidad").value;
  const posicion = document.querySelector("#posicion").value;
  const goles = document.querySelector("#goles").value;
  const asistencias = document.querySelector("#asistencias").value;

  if (
    num == "" ||
    nombre == "" ||
    apellido == "" ||
    edad == "" ||
    nacionalidad == "" ||
    posicion == "" ||
    goles == "" ||
    asistencias == ""
  ) {
    Swal.fire("Falta Llenar Campos");
    return;
  }

  const jugador = { num, nombre, apellido, edad, nacionalidad, posicion, goles, asistencias };

  if (!editStatus) {
    addDoc(coleccion, jugador);
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
  }

  Swal.fire({
    icon: "success",
    title: "EXITO",
    text: "Se guardo correctamente!",
  });
  document.querySelector("#formAddJugador").reset();
});

const btnGuardarJugador = document.querySelector("#btnGuardarJugador");
btnGuardarJugador.addEventListener("click", () => {
  const num = document.querySelector("#enum").value;
  const nombre = document.querySelector("#enombre").value;
  const apellido = document.querySelector("#eapellido").value;
  const edad = document.querySelector("#eedad").value;
  const nacionalidad = document.querySelector("#enacionalidad").value;
  const posicion = document.querySelector("#eposicion").value;
  const goles = document.querySelector("#egoles").value;
  const asistencias = document.querySelector("#easistencias").value;

  if (
    num == "" ||
    nombre == "" ||
    apellido == "" ||
    edad == "" ||
    nacionalidad == "" ||
    posicion == "" ||
    goles == "" ||
    asistencias == ""
  ) {
    Swal.fire("Falta Llenar Campos");
    return;
  }

  const jugador = { num, nombre, apellido, edad, nacionalidad, posicion, goles, asistencias };

  if (editStatus) {
    updateDoc(doc(db, "jugadores", id), jugador);
    editStatus = false;
    id = "";
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  }

  Swal.fire({
    icon: "success",
    title: "EXITO",
    text: "Se Guardo Correctamente!",
  });
  document.querySelector("#formEditJugador").reset();
});
