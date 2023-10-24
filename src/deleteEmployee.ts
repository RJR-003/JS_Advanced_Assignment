import { fillentry, toast } from "./script";
import { hrmApp, firebaseData } from "./DataService";
const overlay = document.querySelector(".overlay")! as HTMLDivElement;
const dataDelModal = document.querySelector(
  ".data-del-modal"
)! as HTMLDivElement;

const confirmButton = document.querySelector(
  ".confirm-button"
)! as HTMLButtonElement;

export const delEmp = (id: number) => {
  let delIndex: number;
  firebaseData.employee.forEach((elem, index) => {
    if (elem == null) return;
    else if (elem.id == id) delIndex = index;
  });

  confirmButton.onclick = () => {
    hrmApp.deleteData(delIndex, fillentry, toast);

    overlay.style.display = "none";
    dataDelModal.style.display = "none";
  };
};
