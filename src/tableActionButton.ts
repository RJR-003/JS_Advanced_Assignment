import {
  overlay,
  dataViewModal,
  dataDelModal,
  tableBody,
  sortButton,
  searchBar,
  skillList,
  filterSearchBox,
  departmentEntry,
  roleEntry,
  skillSelecEntry,
  dataViewClose,
  cancelDelButton,
  addEmployeeButton,
  dataEntryClose,
  dataEntryModal,
} from "./constants";

export const handleTableClick = (e: MouseEvent) => {
  const target = e.target as HTMLTableElement;
  if (target.classList.contains("view-image-icon")) {
    overlay.style.display = "block";
    dataViewModal.style.display = "block";
  }
  if (target.classList.contains("del-image-icon")) {
    console.log("del button clicked");
    overlay.style.display = "block";
    dataDelModal.style.display = "block";
  }
};
