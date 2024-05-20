import Swal from "sweetalert2";
import "./alertCustom.css"

export const alertCustom = (title, text, icon, action) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof action === "function") {
        action();
      }
    }
  });
};
export const alertConfirm = (title, text, icon, confirmButtonText, action) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof action === "function") {
        try {
          action();
          Swal.fire({
            title: "Eliminado",
            text: "Eliminado con exito.",
            icon: "success",
          });
        } catch (error) {
          Swal.file({
            title: "Error",
            text: "Ocurrio un error al querer eliminar el usuario",
            icon: "error",
          });
        }
      }
    }
  });
};

export const alertAdd = (position, icon, title) => {
  Swal.fire({
    position,
    icon,
    title,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'swal2-small-alert'
    }
  });
}

export const alertCustomWithTimerInterval = (title, text, icon, action) => {
  let timerInterval; 

  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#3085d6",
    timer: 2000,
    timerProgressBar: true, 
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
      if (typeof action === "function") {
        action();
      }
    }
  });
};
