import {
  actualData,
  fetchData,
  fillentry,
  originalData,
  skillNameArr,
  changeSkillNameArr,
  toast,
  firebaseData,
} from "./script";
import { constObj } from "./constants";
import { updateIndex, idOfEmp } from "./updateEmployee";
import { skillName } from "./script";

const dataEntryModal = document.querySelector(
  ".data-entry-modal"
)! as HTMLDivElement;
const overlay = document.querySelector(".overlay")! as HTMLDivElement;
const name = document.querySelector("#name")! as HTMLInputElement;
const email = document.querySelector("#email")! as HTMLInputElement;
const dateOfJoin = document.querySelector("#doj")! as HTMLInputElement;
const dataOfBirth = document.querySelector("#dob")! as HTMLInputElement;
const depInput = document.querySelector("#dep")! as HTMLSelectElement;
const roleInput = document.querySelector("#role")! as HTMLSelectElement;
const locInput = document.querySelector("#loc")! as HTMLSelectElement;
const skillInput = document.querySelector("#skill")! as HTMLSelectElement;
const Fulltable = document.querySelector(".table")! as HTMLTableElement;
const formSkill = document.querySelector(".form-skill")! as HTMLDivElement;

const addedSkills = document.querySelector(".added-skills")! as HTMLDivElement;
const dataEntryNameAlert = document.querySelector(
  ".data-entry-name-alert"
)! as HTMLDivElement;
const dataEntryDojAlert = document.querySelector(
  ".data-entry-doj-alert "
)! as HTMLDivElement;
const dataEntryDobAlert = document.querySelector(
  ".data-entry-dob-alert"
)! as HTMLDivElement;
const dataEntryRoleAlert = document.querySelector(
  ".data-entry-role-alert"
)! as HTMLDivElement;
const dataEntryDepAlert = document.querySelector(
  ".data-entry-dep-alert"
)! as HTMLDivElement;
const dataEntryLocAlert = document.querySelector(
  ".data-entry-loc-alert"
)! as HTMLDivElement;
const dataEntrySkillAlert = document.querySelector(
  ".data-entry-skill-alert"
)! as HTMLDivElement;
const dataEntrySubmit = document.querySelector(
  "#data-entry-submit"
)! as HTMLInputElement;
const dataEntryForm = document.querySelector(
  ".data-entry-form"
)! as HTMLFormElement;
const dataEntryEmailAlert = document.querySelector(
  ".data-entry-email-alert"
)! as HTMLDivElement;
//function to put data to firebase
const putData = (
  index: number,
  id: number,
  name: string,
  email: string,
  doj: string,
  dob: string,
  dep: number,
  role: string,
  loc: string,
  skill: number[],
  img: string,
  errMsg: string,
  succMsg: string
) => {
  fetch(constObj.api + "/employee/" + index + ".json", {
    method: "PUT",
    body: JSON.stringify({
      dateOfBirth: dob,
      dateOfJoin: doj,
      department: dep,
      id: id,
      role: role,
      skills: skill,
      workLocation: loc,
      fullName: name,
      email: email,
      imageSrc: img,
    }),
  })
    .then((res) => {
      console.log(res, "successfully added!!!");
      toast(false, succMsg);
      return res.json();
    })
    .then((data) => {
      const skillList = document.querySelector(
        ".skill-list"
      )! as HTMLDivElement;
      skillList.innerHTML = "";
      fetchData(fillentry);
      console.log(data, "data");
    })

    .catch((err) => {
      console.log(err, "error while performing the action");
      toast(true, errMsg);
    });
};

//converts skillname to skill id array
const returnSkillArr = (arrOfNames: string[]) => {
  arrOfNames = arrOfNames.map((elem) => elem.toLowerCase());
  const skillIDArr = actualData.skill.reduce(function (acc: number[], elem) {
    if (arrOfNames.includes(elem.skill.toLowerCase())) {
      return [...acc, elem.skillID];
    }
    return [...acc];
  }, []);
  return skillIDArr;
};

// converts department name to department id
const returnDepID = (depName: string) => {
  depName = depName.toLowerCase();
  const depID = actualData.department.reduce((value: number, elem) => {
    if (elem.departmentName.toLowerCase() == depName) {
      value = elem.departmentID;
      return value;
    }
    return value;
  }, 0);
  return depID;
};

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      resolve(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  });
};

//handling the submit button click
/////////////////////////////////////////////////////////////////////////////////////////////
const handleSubmitClick = async (e: SubmitEvent) => {
  let base64String!: string;
  e.preventDefault();

  //taking image from user
  const imgElem = document.querySelector(".profile-input")! as HTMLInputElement;
  const imgFile = imgElem.files?.[0];

  try {
    base64String = await readFileAsBase64(imgFile!);
  } catch (err) {
    console.log("error while fetching base64String");
  }

  const nameVal = name.value;
  const emailVal = email.value;
  const dateOfJoinVal = dateOfJoin.value;
  const dateOfBirthVal = dataOfBirth.value;
  const depInputVal = returnDepID(depInput.value);
  const roleInputVal = roleInput.value;
  const locInputVal = locInput.value;
  const skillInputVal = returnSkillArr(skillNameArr);

  let isErr = false;
  if (nameVal.length < 2) {
    isErr = true;
    dataEntryNameAlert.style.display = "block";
  } else dataEntryNameAlert.style.display = "none";
  if (!dateOfJoinVal) {
    isErr = true;
    dataEntryDojAlert.style.display = "block";
  } else dataEntryDojAlert.style.display = "none";
  if (!dateOfBirthVal) {
    isErr = true;
    dataEntryDobAlert.style.display = "block";
  } else dataEntryDobAlert.style.display = "none";

  if (roleInputVal === "none") {
    isErr = true;
    dataEntryRoleAlert.style.display = "block";
  } else dataEntryRoleAlert.style.display = "none";
  if (!depInputVal) {
    isErr = true;
    dataEntryDepAlert.style.display = "block";
  } else dataEntryDepAlert.style.display = "none";
  if (locInputVal === "none") {
    isErr = true;
    dataEntryLocAlert.style.display = "block";
  } else dataEntryLocAlert.style.display = "none";
  if (!skillInputVal.length) {
    isErr = true;
    dataEntrySkillAlert.style.display = "block";
  } else dataEntrySkillAlert.style.display = "none";
  if (!email.checkValidity()) {
    dataEntryEmailAlert.style.display = "block";
  } else dataEntryEmailAlert.style.display = "none";

  if (dataEntrySubmit.value == "Add") {
    if (!isErr) {
      let entryIndex = 0;
      if (originalData.employee) {
        firebaseData.employee.forEach((elem, index) => {
          if (index > entryIndex) entryIndex = index;
        });
        entryIndex = entryIndex + 1;
      } else entryIndex = 0;

      let employeeID = 1001;
      if (originalData.employee) {
        employeeID =
          Number(originalData.employee[originalData.employee.length - 1].id) +
          1;
      } else employeeID = 1001;

      let errMsg = "Error while adding employee";
      let succMsg = "Succesfully added employee";
      putData(
        entryIndex,
        employeeID,
        nameVal,
        emailVal,
        dateOfJoinVal,
        dateOfBirthVal,
        depInputVal,
        roleInputVal,
        locInputVal,
        skillInputVal,
        base64String,
        errMsg,
        succMsg
      );
      console.log(employeeID, "employee id that is going for the new data");
      console.log(entryIndex, "index that the new data occupies");
      dataEntryForm.reset();
      addedSkills.innerHTML = "";
      //   skillNameArr = [];
      let nullArr: string[] = [];
      changeSkillNameArr(nullArr);
      overlay.style.display = "none";
      dataEntryModal.style.display = "none";
    } else {
      console.log("error in adding new employee");
    }
  } else if (dataEntrySubmit.value == "Update") {
    if (!isErr) {
      let employeeID = idOfEmp;

      base64String = originalData.employee[updateIndex].imageSrc;

      let errMsg = "Error while updating employee";
      let succMsg = "Succesfully updated employee";
      putData(
        updateIndex,
        employeeID,
        nameVal,
        emailVal,
        dateOfJoinVal,
        dateOfBirthVal,
        depInputVal,
        roleInputVal,
        locInputVal,
        skillInputVal,
        base64String,
        errMsg,
        succMsg
      );
      console.log(employeeID, "id that is going to be updated");
      console.log(updateIndex, "index that is going to be updated");

      overlay.style.display = "none";
      dataEntryModal.style.display = "none";
    }
  }
};
dataEntryForm.onsubmit = handleSubmitClick;

//data-entry-form skill section functionalities
/////////////////////////////////////////////////////////////////////////////////////////////////////
Fulltable.onclick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("edit-image-icon")) {
    // skillNameArr = skillName;
    changeSkillNameArr(skillName);
  }
};

formSkill.onclick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  // for chrome
  //   if (target.id == "skill" && !skillNameArr.includes(skillInput.value)) {
  //     if (skillInput.value != "none") {
  //       console.log(skillInput.value, "skillInput.value");
  //       skillNameArr.push(skillInput.value);
  //       console.log("inside chrome style");
  //       console.log(skillNameArr);
  //       addedSkills.innerHTML += `
  //               <div data-rem-id="${skillInput.value}" class="each-skill-added">
  //               ${skillInput.value}
  //           </div>`;
  //     }
  //   }
  //   for morzilla
  if (
    target.classList.contains("skill-options") &&
    !skillNameArr.includes(target.id)
  ) {
    skillNameArr.push(target.id);
    addedSkills.innerHTML += `
                  <div data-rem-id="${target.id}" class="each-skill-added">
                  ${target.id}
              </div>`;
  } else {
    console.log(" error while updating");
  }
};

addedSkills.onclick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.dataset.remId) {
    let skillNameArrCopy = skillNameArr.filter(
      (elem) => elem != target.dataset.remId
    );
    changeSkillNameArr(skillNameArrCopy);
    addedSkills.innerHTML = "";
    skillNameArr.forEach((elem) => {
      addedSkills.innerHTML += `
          <div data-rem-id="${elem}" class="each-skill-added">
          ${elem}
      </div>`;
    });
  }
  skillInput.value = "none";
};
