const api =
  "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";

let actualData;

const temp = document.querySelector(".table-body");

let empArr = actualData?.employee;

dirFlag = 1;


//general table rendering function
///////////////////////////////////////////////
const tableCreate = (arr) => {
  arr.forEach(objelem => {
    let dep = actualData.department[objelem.department - 1].departmentName;
    temp.innerHTML += `
    <tr class="data-row">
        <td>${objelem.id}</td>
        <td>${objelem.fullName}</td>
        <td>${objelem.email}</td>
        <td>${dep}</td>
        <td id="action-button-cell">
            <button class="view-image-icon"><img src="assets/images/view-img.svg"
                    alt="view button image"></button>
            <button class="edit-image-icon"><img src="assets/images/edit-img.svg"
                    alt="Edit button image"></button>
            <button class="del-image-icon"><img src="assets/images/del-img.svg"
                    alt="Delete button image"></button>
        </td>
    </tr>
    `
  })
}



// fetch skill form firebase and display it on the filter skill section 
///////////////////////////////////////////////////////
const changeSkillState = (skillId) => {
  console.log(skillId);
  const temp = document.querySelector(`#${skillId}`);
  temp.click();
  checkFilter();
}
document.querySelector(".skill-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("skill-element")) {
    changeSkillState(e.target.dataset.skillId)
  }
})


// sort functionality
//////////////////////////////////////
const sortFun = () => {
  let arrToRender = actualData.employee.sort((a, b) => {
    const name1 = a.fullName.toLowerCase();
    const name2 = b.fullName.toLowerCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1 * dirFlag;
    } else if (name1 < name2) {
      comparison = -1 * dirFlag;
    }
    return comparison;
  });
  temp.innerHTML = "";
  tableCreate(arrToRender);
  if (dirFlag == 1) {
    document.querySelector(".sort-button").src = "../assets/images/down-arrow.svg";
    dirFlag = -1;
  }
  else {
    dirFlag = 1;
    document.querySelector(".sort-button").src = "../assets/images/up-arrow.svg";
  }
}





// fetching data from firebase and display it into the table
///////////////////////////////////////////
const fillentry = (obj) => {
  const skill = document.querySelector(".skill-list")
  tableCreate(obj.employee);

  // filter skill button script
  obj.skill.forEach(objelem => {
    const skillId = objelem.skill.split(" ").join("")
    skill.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`
  })

};


// display table according to the filtered elements

function checkFilter() {
  let tempArr = [];
  let inputs = document.querySelectorAll('.skill-element');
  console.log(inputs);
  inputs.forEach((elem) => {
    if (elem.querySelector(`#${elem.dataset.skillId}`).checked) {
      tempArr.push(elem.dataset.skillId);
    }
  }
  )
  console.log(tempArr);
}






//fetching data whole data from firebase
////////////////////////////////////////////////
const fetchData = function (fillentry) {
  fetch(api + "/.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "data");
      actualData = data;
      fillentry(data);
    })
    .catch((err) => console.log(err, "error"));
};

fetchData(fillentry);

document.querySelector(".sort-button").onclick = sortFun;
