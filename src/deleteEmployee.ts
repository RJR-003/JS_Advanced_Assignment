import { originalData, fetchData, fillentry } from "./script";
import { api, skillList, overlay, dataDelModal } from "./constants";
const confirmButton = document.querySelector(
  ".confirm-button"
)! as HTMLButtonElement;
const delData = (index: number) => {
  fetch(api + "/employee/" + index + ".json", {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res, "successfully deleted!!!");
      return res.json();
    })
    .then((data) => {
      // tableCreate(data);
      skillList.innerHTML = "";
      fetchData(fillentry);
      console.log(data, "data");
    })

    .catch((err) => console.log(err, "error while deleting employee"));
};

export const delEmp = (id: number) => {
  let delIndex: number;
  originalData.employee.forEach((elem, index) => {
    if (elem.id == id) delIndex = index;
  });

  confirmButton.onclick = () => {
    delData(delIndex);
    overlay.style.display = "none";
    dataDelModal.style.display = "none";
  };
};
