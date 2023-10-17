import {
  overlay,
  dataViewModal,
  dataDelModal,
  dataEntryModal,
} from "./constants";
import { updateEmp } from "./updateEmployee";
import { viewModal } from "./viewEmployee";
import { delEmp } from "./deleteEmployee";
import { dataEntrySubmit } from "./constants";
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
