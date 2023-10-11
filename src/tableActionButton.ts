export const handleTableClick = (e: MouseEvent) => {
  const target = e.target as HTMLTableElement;
  console.log(target.tagName);
  if (target.classList.contains("view-image-icon")) {
    console.log("view button clicked");
    const overlay = document.querySelector(".overlay")! as HTMLDivElement;
    overlay.style.display = "block";
    const dataViewModal = document.querySelector(
      ".data-view-modal"
    )! as HTMLDivElement;
    dataViewModal.style.display = "block";
  }
  if (target.classList.contains("del-image-icon")) {
    console.log("del button clicked");
    const overlay = document.querySelector(".overlay")! as HTMLDivElement;
    overlay.style.display = "block";
    const dataDelModal = document.querySelector(
      ".data-del-modal"
    )! as HTMLDivElement;
    dataDelModal.style.display = "block";
  }
};
