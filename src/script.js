import { handleTableClick } from "./tableActionButton.js";

const api =
  "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";

export let actualData;

const tableBody = document.querySelector(".table-body");

//general table rendering function
///////////////////////////////////////////////
export const tableCreate = (arr) => {
  arr.forEach((objelem) => {
    let dep = actualData.department[objelem.department - 1].departmentName;
    tableBody.innerHTML += `
    <tr class="data-row">
        <td>${objelem.id}</td>
        <td>${objelem.fullName}</td>
        <td>${objelem.email}</td>
        <td>${dep}</td>
        <td id="action-button-cell">
            <button  data-emp-id= ${objelem.id}><img class="view-image-icon" src="assets/images/view-img.svg"
                    alt="view button image"></button>
            <button class="edit-image-icon" data-emp-id=${objelem.id}><img class="edit-image-icon" src="assets/images/edit-img.svg"
                    alt="Edit button image"></button>
            <button class="del-image-icon" data-emp-id=${objelem.id}><img class="del-image-icon" src="assets/images/del-img.svg"
                    alt="Delete button image"></button>
        </td>
    </tr>
    `;
  });
};

// fetching data from firebase and display it into the table
///////////////////////////////////////////
const fillentry = (obj) => {
  const skill = document.querySelector(".skill-list");
  tableCreate(obj.employee);

  // filter skill button script
  obj.skill.forEach((objelem) => {
    const skillId = objelem.skill.split(" ").join("");
    skill.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
  });

  //fill department in data entry modal
  const department = document.querySelector("#dep");
  dep.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
  obj.department.forEach((objelem) => {
    dep.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
  });
  // fill role in data entry modal
  const role = document.querySelector("#role");
  role.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
  obj.role.forEach((objelem) => {
    role.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
  });
  //fill skill in skill selection in data entry modal
  const skillSelec = document.querySelector("#skill");
  skillSelec.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
  obj.skill.forEach((objelem) => {
    skillSelec.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
  });
};

// // display table according to the filtered elements

// function checkFilter() {
//   let tempArr = [];
//   let inputs = document.querySelectorAll('.skill-element');
//   console.log(inputs);
//   inputs.forEach((elem) => {
//     if (elem.querySelector(`#${elem.dataset.skillId}`).checked) {
//       tempArr.push(elem.dataset.skillId);
//     }
//   }
//   )
//   console.log(tempArr);
// }

//fetching data whole data from firebase
////////////////////////////////////////////////
const fetchData = function (fillentry) {
  fetch(api + "/.json")
    .then((res) => res.json())
    .then((data) => {
      actualData = data;
      console.log(data, "data");
      fillentry(data);
    })
    .catch((err) => console.log(err, "error"));
};

fetchData(fillentry);

document.querySelector(".table").addEventListener("click", handleTableClick);

//close data-view-modal
document.querySelector(".data-view-close").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".data-view-modal").style.display = "none";
});

//close data-del-modal
document.querySelector(".cancel-del-button").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".data-del-modal").style.display = "none";
});

//Add employee function
document.querySelector(".add-employee-button").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".data-entry-modal").style.display = "block";
});
document.querySelector(".data-entry-close").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".data-entry-modal").style.display = "none";
});
