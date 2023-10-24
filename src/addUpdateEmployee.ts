import { fillentry, skillNameArr, changeSkillNameArr, toast } from "./script";
import { AppSupportFun } from "./AppSupportFunction";
import { appStrings } from "./constants";
import { updateIndex, idOfEmp } from "./updateEmployee";
import { skillName } from "./script";
import { sendData } from "./type";
import { hrmApp, firebaseData, originalData, actualData } from "./DataService";

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
const formImg = document.querySelector(
  ".data-entry-modal-img"
)! as HTMLImageElement;
const imgElem = document.querySelector(".profile-input")! as HTMLInputElement;

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
let putdata: sendData = {
  index: 0,
  id: 0,
  name: "",
  email: "",
  doj: "",
  dob: "",
  dep: 0,
  role: "",
  loc: "",
  skill: [],
  img: "",
  errMsg: "",
  succMsg: "",
};
// image generating function
///////////////////////////////////////////////////////////
let base64String1: string;
const addImgToForm = async () => {
  let imgFile1 = imgElem.files?.[0];
  try {
    base64String1 = await AppSupportFun.readFileAsBase64(imgFile1!);
    putdata.img = base64String1;

    formImg.src = base64String1;
  } catch {
    console.log("error while fetching base64String");
    formImg.src = appStrings.defaultPic;
    putdata.img = appStrings.defaultPic;
  }
  if (imgFile1 == undefined) {
    base64String1 = appStrings.defaultPic;
    putdata.img = appStrings.defaultPic;
  }
};
imgElem.addEventListener("input", addImgToForm);

//handling the submit button click
/////////////////////////////////////////////////////////////////////////////////////////////
const handleSubmitClick = async (e: SubmitEvent) => {
  e.preventDefault();
  putdata.name = name.value;
  putdata.email = email.value;
  putdata.doj = dateOfJoin.value;
  putdata.dob = dataOfBirth.value;
  putdata.dep = AppSupportFun.returnDepID(depInput.value, actualData);
  putdata.role = roleInput.value;
  putdata.loc = locInput.value;
  putdata.skill = AppSupportFun.returnSkillArr(skillNameArr, actualData);

  let isErr = false;
  if (putdata.name.length < 2) {
    isErr = true;
    dataEntryNameAlert.style.display = "block";
  } else dataEntryNameAlert.style.display = "none";
  if (!putdata.doj) {
    isErr = true;
    dataEntryDojAlert.style.display = "block";
  } else dataEntryDojAlert.style.display = "none";
  if (!putdata.dob) {
    isErr = true;
    dataEntryDobAlert.style.display = "block";
  } else dataEntryDobAlert.style.display = "none";

  if (putdata.role === "none") {
    isErr = true;
    dataEntryRoleAlert.style.display = "block";
  } else dataEntryRoleAlert.style.display = "none";
  if (!putdata.dep) {
    isErr = true;
    dataEntryDepAlert.style.display = "block";
  } else dataEntryDepAlert.style.display = "none";
  if (putdata.loc === "none") {
    isErr = true;
    dataEntryLocAlert.style.display = "block";
  } else dataEntryLocAlert.style.display = "none";
  if (!putdata.skill.length) {
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

      putdata.id = employeeID;
      putdata.index = entryIndex;
      putdata.errMsg = appStrings.addErrMsg;
      putdata.succMsg = appStrings.addSuccessMsg;

      //passing data to enter new employee details
      hrmApp.putData(putdata, fillentry, toast);
      dataEntryForm.reset();
      addedSkills.innerHTML = "";
      let nullArr: string[] = [];
      changeSkillNameArr(nullArr);
      overlay.style.display = "none";
      dataEntryModal.style.display = "none";
    } else {
      toast(true, appStrings.addErrMsg);
    }
  } else if (dataEntrySubmit.value == "Update") {
    if (!isErr) {
      let employeeID = idOfEmp;
      putdata.id = employeeID;
      if (base64String1) putdata.img = base64String1;
      else putdata.img = appStrings.defaultPic;

      putdata.errMsg = appStrings.updateErrMsg;
      putdata.succMsg = appStrings.updateSuccessMsg;
      putdata.index = updateIndex;
      //passing data to update employee

      hrmApp.putData(putdata, fillentry, toast);
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
    changeSkillNameArr(skillName);
  }
};

formSkill.onclick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.id == "skill" && !skillNameArr.includes(skillInput.value)) {
    if (skillInput.value != "none") {
      skillNameArr.push(skillInput.value);
      addedSkills.innerHTML += `
    <div data-rem-id="${skillInput.value}" class="each-skill-added">
    ${skillInput.value}
</div>`;
    }
  } else if (
    target.classList.contains("skill-options") &&
    !skillNameArr.includes(target.id)
  ) {
    skillNameArr.push(target.id);
    addedSkills.innerHTML += `
                  <div data-rem-id="${target.id}" class="each-skill-added">
                  ${target.id}
              </div>`;
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
