const overlay = document.querySelector(".overlay")! as HTMLDivElement;
const dataViewModal = document.querySelector(
  ".data-view-modal"
)! as HTMLDivElement;
const dataDelModal = document.querySelector(
  ".data-del-modal"
)! as HTMLDivElement;
const dataEntryModal = document.querySelector(
  ".data-entry-modal"
)! as HTMLDivElement;
const dataEntrySubmit = document.querySelector(
  "#data-entry-submit"
)! as HTMLInputElement;
import { updateEmp } from "./updateEmployee";
import { viewModal } from "./viewEmployee";
import { delEmp } from "./deleteEmployee";
export const handleTableClick = (e: MouseEvent) => {
  const target = e.target as HTMLTableElement;
  if (target.classList.contains("view-image-icon")) {
    overlay.style.display = "block";
    dataViewModal.style.display = "block";
    viewModal(Number(target.dataset.empId));
  }
  if (target.classList.contains("del-image-icon")) {
    overlay.style.display = "block";
    dataDelModal.style.display = "block";
    delEmp(Number(target.dataset.empId));
  }
  /// update user details functionality
  if (target.classList.contains("edit-image-icon")) {
    overlay.style.display = "block";
    dataEntryModal.style.display = "block";
    dataEntrySubmit.value = "Update";
    updateEmp(Number(target.dataset.empId));
  }
};
