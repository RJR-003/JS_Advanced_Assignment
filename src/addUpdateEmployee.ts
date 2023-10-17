import {
  actualData,
  fetchData,
  fillentry,
  originalData,
  skillNameArr,
  changeSkillNameArr,
} from "./script";
import { updateIndex, idOfEmp } from "./updateEmployee";
import { skillName } from "./script";
import {
  api,
  dataEntryModal,
  overlay,
  name,
  email,
  dateOfJoin,
  dataOfBirth,
  depInput,
  roleInput,
  locInput,
  skillInput,
  Fulltable,
  formSkill,
  addedSkills,
  dataEntryNameAlert,
  dataEntryDojAlert,
  dataEntryDobAlert,
  dataEntryRoleAlert,
  dataEntryDepAlert,
  dataEntryLocAlert,
  dataEntrySkillAlert,
  dataEntrySubmit,
  dataEntryForm,
} from "./constants";

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
  img: string
) => {
  fetch(api + "/employee/" + index + ".json", {
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

    .catch((err) => console.log(err, "error while performing the action"));
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

  if (dataEntrySubmit.value == "Add") {
    if (!isErr) {
      let entryIndex = 0;
      if (actualData.employee) {
        actualData.employee.forEach((elem, index) => {
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
        base64String
      );
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
        base64String
      );
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
