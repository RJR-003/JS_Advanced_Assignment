import { originalData, fetchData, fillentry, firebaseData } from "./script";
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
  // firebaseData.employee.forEach((elem, index) => {
  //   if (elem.id == id) delIndex = index;
  // });
  for (let step = 0; step < firebaseData.employee.length; step++) {
    if (firebaseData.employee[step] == null) continue;
    else if (firebaseData.employee[step].id == id) delIndex = step;
  }

  confirmButton.onclick = () => {
    delData(delIndex);
    console.log(delIndex, "index that is going to be deleted");
    console.log(id, "the id that is going to be deleted");
    console.log(firebaseData, "firebaseData");
    overlay.style.display = "none";
    dataDelModal.style.display = "none";
  };
};
