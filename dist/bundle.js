/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SortFun.ts":
/*!************************!*\
  !*** ./src/SortFun.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sortFun: () => (/* binding */ sortFun)
/* harmony export */ });
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ "./src/script.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");



let dirFlag = 1;
// sort functionality
//////////////////////////////////////
const sortFun = () => {
    let arrayToSort = _script__WEBPACK_IMPORTED_MODULE_0__.actualData.employee;
    if (_script__WEBPACK_IMPORTED_MODULE_0__.FilterArr.length !== 0)
        arrayToSort = _script__WEBPACK_IMPORTED_MODULE_0__.FilterArr;
    let arrToRender = arrayToSort.sort((a, b) => {
        const name1 = a.fullName.toLowerCase();
        const name2 = b.fullName.toLowerCase();
        let comparison = 0;
        if (name1 > name2) {
            comparison = 1 * dirFlag;
        }
        else if (name1 < name2) {
            comparison = -1 * dirFlag;
        }
        return comparison;
    });
    _constants__WEBPACK_IMPORTED_MODULE_1__.tableBody.innerHTML = "";
    (0,_script__WEBPACK_IMPORTED_MODULE_0__.tableCreate)(arrToRender);
    if (dirFlag == 1) {
        _constants__WEBPACK_IMPORTED_MODULE_1__.sortButton.src = "../assets/images/down-arrow.svg";
        dirFlag = -1;
    }
    else {
        dirFlag = 1;
        _constants__WEBPACK_IMPORTED_MODULE_1__.sortButton.src = "../assets/images/up-arrow.svg";
    }
};


/***/ }),

/***/ "./src/addUpdateEmployee.ts":
/*!**********************************!*\
  !*** ./src/addUpdateEmployee.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ "./src/script.ts");
/* harmony import */ var _updateEmployee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateEmployee */ "./src/updateEmployee.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




//function to put data to firebase
const putData = (index, id, name, email, doj, dob, dep, role, loc, skill, img) => {
    fetch(_constants__WEBPACK_IMPORTED_MODULE_2__.api + "/employee/" + index + ".json", {
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
        const skillList = document.querySelector(".skill-list");
        skillList.innerHTML = "";
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.fetchData)(_script__WEBPACK_IMPORTED_MODULE_0__.fillentry);
        console.log(data, "data");
    })
        .catch((err) => console.log(err, "error while performing the action"));
};
//converts skillname to skill id array
const returnSkillArr = (arrOfNames) => {
    arrOfNames = arrOfNames.map((elem) => elem.toLowerCase());
    const skillIDArr = _script__WEBPACK_IMPORTED_MODULE_0__.actualData.skill.reduce(function (acc, elem) {
        if (arrOfNames.includes(elem.skill.toLowerCase())) {
            return [...acc, elem.skillID];
        }
        return [...acc];
    }, []);
    return skillIDArr;
};
// converts department name to department id
const returnDepID = (depName) => {
    depName = depName.toLowerCase();
    const depID = _script__WEBPACK_IMPORTED_MODULE_0__.actualData.department.reduce((value, elem) => {
        if (elem.departmentName.toLowerCase() == depName) {
            value = elem.departmentID;
            return value;
        }
        return value;
    }, 0);
    return depID;
};
const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file selected");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            resolve((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
        };
        reader.readAsDataURL(file);
    });
};
//handling the submit button click
/////////////////////////////////////////////////////////////////////////////////////////////
const handleSubmitClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let base64String;
    e.preventDefault();
    //taking image from user
    const imgElem = document.querySelector(".profile-input");
    const imgFile = (_a = imgElem.files) === null || _a === void 0 ? void 0 : _a[0];
    try {
        base64String = yield readFileAsBase64(imgFile);
    }
    catch (err) {
        console.log("error while fetching base64String");
    }
    const nameVal = _constants__WEBPACK_IMPORTED_MODULE_2__.name.value;
    const emailVal = _constants__WEBPACK_IMPORTED_MODULE_2__.email.value;
    const dateOfJoinVal = _constants__WEBPACK_IMPORTED_MODULE_2__.dateOfJoin.value;
    const dateOfBirthVal = _constants__WEBPACK_IMPORTED_MODULE_2__.dataOfBirth.value;
    const depInputVal = returnDepID(_constants__WEBPACK_IMPORTED_MODULE_2__.depInput.value);
    const roleInputVal = _constants__WEBPACK_IMPORTED_MODULE_2__.roleInput.value;
    const locInputVal = _constants__WEBPACK_IMPORTED_MODULE_2__.locInput.value;
    const skillInputVal = returnSkillArr(_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr);
    let isErr = false;
    if (nameVal.length < 2) {
        isErr = true;
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryNameAlert.style.display = "block";
    }
    else
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryNameAlert.style.display = "none";
    if (!dateOfJoinVal) {
        isErr = true;
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryDojAlert.style.display = "block";
    }
    else
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryDojAlert.style.display = "none";
    if (!dateOfBirthVal) {
        isErr = true;
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryDobAlert.style.display = "block";
    }
    else
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryDobAlert.style.display = "none";
    if (roleInputVal === "none") {
        isErr = true;
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryRoleAlert.style.display = "block";
    }
    else
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryRoleAlert.style.display = "none";
    if (!depInputVal) {
        isErr = true;
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryDepAlert.style.display = "block";
    }
    else
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryDepAlert.style.display = "none";
    if (locInputVal === "none") {
        isErr = true;
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryLocAlert.style.display = "block";
    }
    else
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryLocAlert.style.display = "none";
    if (!skillInputVal.length) {
        isErr = true;
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntrySkillAlert.style.display = "block";
    }
    else
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntrySkillAlert.style.display = "none";
    if (!_constants__WEBPACK_IMPORTED_MODULE_2__.email.checkValidity()) {
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryEmailAlert.style.display = "block";
    }
    else
        _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryEmailAlert.style.display = "none";
    if (_constants__WEBPACK_IMPORTED_MODULE_2__.dataEntrySubmit.value == "Add") {
        if (!isErr) {
            let entryIndex = 0;
            if (_script__WEBPACK_IMPORTED_MODULE_0__.actualData.employee) {
                _script__WEBPACK_IMPORTED_MODULE_0__.actualData.employee.forEach((elem, index) => {
                    if (index > entryIndex)
                        entryIndex = index;
                });
                entryIndex = entryIndex + 1;
            }
            else
                entryIndex = 0;
            let employeeID = 1001;
            if (_script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee) {
                employeeID =
                    Number(_script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee[_script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee.length - 1].id) +
                        1;
            }
            else
                employeeID = 1001;
            putData(entryIndex, employeeID, nameVal, emailVal, dateOfJoinVal, dateOfBirthVal, depInputVal, roleInputVal, locInputVal, skillInputVal, base64String);
            console.log(employeeID, "employee id that is going for the new data");
            console.log(entryIndex, "index that the new data occupies");
            _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryForm.reset();
            _constants__WEBPACK_IMPORTED_MODULE_2__.addedSkills.innerHTML = "";
            //   skillNameArr = [];
            let nullArr = [];
            (0,_script__WEBPACK_IMPORTED_MODULE_0__.changeSkillNameArr)(nullArr);
            _constants__WEBPACK_IMPORTED_MODULE_2__.overlay.style.display = "none";
            _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryModal.style.display = "none";
        }
        else {
            console.log("error in adding new employee");
        }
    }
    else if (_constants__WEBPACK_IMPORTED_MODULE_2__.dataEntrySubmit.value == "Update") {
        if (!isErr) {
            let employeeID = _updateEmployee__WEBPACK_IMPORTED_MODULE_1__.idOfEmp;
            base64String = _script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee[_updateEmployee__WEBPACK_IMPORTED_MODULE_1__.updateIndex].imageSrc;
            putData(_updateEmployee__WEBPACK_IMPORTED_MODULE_1__.updateIndex, employeeID, nameVal, emailVal, dateOfJoinVal, dateOfBirthVal, depInputVal, roleInputVal, locInputVal, skillInputVal, base64String);
            console.log(employeeID, "id that is going to be updated");
            console.log(_updateEmployee__WEBPACK_IMPORTED_MODULE_1__.updateIndex, "index that is going to be updated");
            _constants__WEBPACK_IMPORTED_MODULE_2__.overlay.style.display = "none";
            _constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryModal.style.display = "none";
        }
    }
});
_constants__WEBPACK_IMPORTED_MODULE_2__.dataEntryForm.onsubmit = handleSubmitClick;
//data-entry-form skill section functionalities
/////////////////////////////////////////////////////////////////////////////////////////////////////
_constants__WEBPACK_IMPORTED_MODULE_2__.Fulltable.onclick = (e) => {
    const target = e.target;
    if (target.classList.contains("edit-image-icon")) {
        // skillNameArr = skillName;
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.changeSkillNameArr)(_script__WEBPACK_IMPORTED_MODULE_0__.skillName);
    }
};
_constants__WEBPACK_IMPORTED_MODULE_2__.formSkill.onclick = (e) => {
    const target = e.target;
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
    if (target.classList.contains("skill-options") &&
        !_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.includes(target.id)) {
        _script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.push(target.id);
        _constants__WEBPACK_IMPORTED_MODULE_2__.addedSkills.innerHTML += `
                  <div data-rem-id="${target.id}" class="each-skill-added">
                  ${target.id}
              </div>`;
    }
    else {
        console.log(" error while updating");
    }
};
_constants__WEBPACK_IMPORTED_MODULE_2__.addedSkills.onclick = (e) => {
    const target = e.target;
    if (target.dataset.remId) {
        let skillNameArrCopy = _script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.filter((elem) => elem != target.dataset.remId);
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.changeSkillNameArr)(skillNameArrCopy);
        _constants__WEBPACK_IMPORTED_MODULE_2__.addedSkills.innerHTML = "";
        _script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.forEach((elem) => {
            _constants__WEBPACK_IMPORTED_MODULE_2__.addedSkills.innerHTML += `
          <div data-rem-id="${elem}" class="each-skill-added">
          ${elem}
      </div>`;
        });
    }
    _constants__WEBPACK_IMPORTED_MODULE_2__.skillInput.value = "none";
};


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fulltable: () => (/* binding */ Fulltable),
/* harmony export */   addEmployeeButton: () => (/* binding */ addEmployeeButton),
/* harmony export */   addedSkills: () => (/* binding */ addedSkills),
/* harmony export */   api: () => (/* binding */ api),
/* harmony export */   cancelDelButton: () => (/* binding */ cancelDelButton),
/* harmony export */   clearFilterButton: () => (/* binding */ clearFilterButton),
/* harmony export */   dataDelModal: () => (/* binding */ dataDelModal),
/* harmony export */   dataEntryClose: () => (/* binding */ dataEntryClose),
/* harmony export */   dataEntryDepAlert: () => (/* binding */ dataEntryDepAlert),
/* harmony export */   dataEntryDobAlert: () => (/* binding */ dataEntryDobAlert),
/* harmony export */   dataEntryDojAlert: () => (/* binding */ dataEntryDojAlert),
/* harmony export */   dataEntryEmailAlert: () => (/* binding */ dataEntryEmailAlert),
/* harmony export */   dataEntryForm: () => (/* binding */ dataEntryForm),
/* harmony export */   dataEntryLocAlert: () => (/* binding */ dataEntryLocAlert),
/* harmony export */   dataEntryModal: () => (/* binding */ dataEntryModal),
/* harmony export */   dataEntryNameAlert: () => (/* binding */ dataEntryNameAlert),
/* harmony export */   dataEntryRoleAlert: () => (/* binding */ dataEntryRoleAlert),
/* harmony export */   dataEntrySkillAlert: () => (/* binding */ dataEntrySkillAlert),
/* harmony export */   dataEntrySubmit: () => (/* binding */ dataEntrySubmit),
/* harmony export */   dataOfBirth: () => (/* binding */ dataOfBirth),
/* harmony export */   dataViewClose: () => (/* binding */ dataViewClose),
/* harmony export */   dataViewModal: () => (/* binding */ dataViewModal),
/* harmony export */   dateOfJoin: () => (/* binding */ dateOfJoin),
/* harmony export */   depInput: () => (/* binding */ depInput),
/* harmony export */   departmentEntry: () => (/* binding */ departmentEntry),
/* harmony export */   email: () => (/* binding */ email),
/* harmony export */   filterSearchBox: () => (/* binding */ filterSearchBox),
/* harmony export */   formSkill: () => (/* binding */ formSkill),
/* harmony export */   locInput: () => (/* binding */ locInput),
/* harmony export */   name: () => (/* binding */ name),
/* harmony export */   overlay: () => (/* binding */ overlay),
/* harmony export */   roleEntry: () => (/* binding */ roleEntry),
/* harmony export */   roleInput: () => (/* binding */ roleInput),
/* harmony export */   searchBar: () => (/* binding */ searchBar),
/* harmony export */   skillInput: () => (/* binding */ skillInput),
/* harmony export */   skillList: () => (/* binding */ skillList),
/* harmony export */   skillSelecEntry: () => (/* binding */ skillSelecEntry),
/* harmony export */   sortButton: () => (/* binding */ sortButton),
/* harmony export */   table: () => (/* binding */ table),
/* harmony export */   tableBody: () => (/* binding */ tableBody)
/* harmony export */ });
const api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
const overlay = document.querySelector(".overlay");
const dataViewModal = document.querySelector(".data-view-modal");
const dataDelModal = document.querySelector(".data-del-modal");
const tableBody = document.querySelector(".table-body");
const sortButton = document.querySelector(".sort-button");
const searchBar = document.querySelector(".search-input-box");
const skillList = document.querySelector(".skill-list");
const filterSearchBox = document.querySelector(".filter-search-box");
const departmentEntry = document.querySelector("#dep");
const roleEntry = document.querySelector("#role");
const skillSelecEntry = document.querySelector("#skill");
const dataViewClose = document.querySelector(".data-view-close");
const cancelDelButton = document.querySelector(".cancel-del-button");
const addEmployeeButton = document.querySelector(".add-employee-button");
const dataEntryClose = document.querySelector(".data-entry-close");
const dataEntryModal = document.querySelector(".data-entry-modal");
const table = document.querySelector(".table");
const clearFilterButton = document.querySelector(".clear-filter-button");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const dateOfJoin = document.querySelector("#doj");
const dataOfBirth = document.querySelector("#dob");
const depInput = document.querySelector("#dep");
const roleInput = document.querySelector("#role");
const locInput = document.querySelector("#loc");
const skillInput = document.querySelector("#skill");
const Fulltable = document.querySelector(".table");
const formSkill = document.querySelector(".form-skill");
const addedSkills = document.querySelector(".added-skills");
const dataEntryNameAlert = document.querySelector(".data-entry-name-alert");
const dataEntryDojAlert = document.querySelector(".data-entry-doj-alert ");
const dataEntryDobAlert = document.querySelector(".data-entry-dob-alert");
const dataEntryRoleAlert = document.querySelector(".data-entry-role-alert");
const dataEntryDepAlert = document.querySelector(".data-entry-dep-alert");
const dataEntryLocAlert = document.querySelector(".data-entry-loc-alert");
const dataEntrySkillAlert = document.querySelector(".data-entry-skill-alert");
const dataEntrySubmit = document.querySelector("#data-entry-submit");
const dataEntryForm = document.querySelector(".data-entry-form");
const dataEntryEmailAlert = document.querySelector(".data-entry-email-alert");


/***/ }),

/***/ "./src/deleteEmployee.ts":
/*!*******************************!*\
  !*** ./src/deleteEmployee.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delEmp: () => (/* binding */ delEmp)
/* harmony export */ });
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ "./src/script.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");


const confirmButton = document.querySelector(".confirm-button");
const delData = (index) => {
    fetch(_constants__WEBPACK_IMPORTED_MODULE_1__.api + "/employee/" + index + ".json", {
        method: "DELETE",
    })
        .then((res) => {
        console.log(res, "successfully deleted!!!");
        return res.json();
    })
        .then((data) => {
        // tableCreate(data);
        _constants__WEBPACK_IMPORTED_MODULE_1__.skillList.innerHTML = "";
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.fetchData)(_script__WEBPACK_IMPORTED_MODULE_0__.fillentry);
        console.log(data, "data");
    })
        .catch((err) => console.log(err, "error while deleting employee"));
};
const delEmp = (id) => {
    let delIndex;
    // firebaseData.employee.forEach((elem, index) => {
    //   if (elem.id == id) delIndex = index;
    // });
    for (let step = 0; step < _script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee.length; step++) {
        if (_script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee[step] == null)
            continue;
        else if (_script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee[step].id == id)
            delIndex = step;
    }
    confirmButton.onclick = () => {
        delData(delIndex);
        console.log(delIndex, "index that is going to be deleted");
        console.log(id, "the id that is going to be deleted");
        console.log(_script__WEBPACK_IMPORTED_MODULE_0__.firebaseData, "firebaseData");
        _constants__WEBPACK_IMPORTED_MODULE_1__.overlay.style.display = "none";
        _constants__WEBPACK_IMPORTED_MODULE_1__.dataDelModal.style.display = "none";
    };
};


/***/ }),

/***/ "./src/filterAndSearchFun.ts":
/*!***********************************!*\
  !*** ./src/filterAndSearchFun.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderFilterBox: () => (/* binding */ RenderFilterBox),
/* harmony export */   clearFilter: () => (/* binding */ clearFilter)
/* harmony export */ });
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ "./src/script.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
// fetch skill form firebase and display it on the filter skill section
///////////////////////////////////////////////////////


const RenderFilterBox = () => {
    let value = _constants__WEBPACK_IMPORTED_MODULE_1__.filterSearchBox.value;
    value = value.split(" ").join("").toLowerCase();
    _constants__WEBPACK_IMPORTED_MODULE_1__.skillList.innerHTML = "";
    _script__WEBPACK_IMPORTED_MODULE_0__.actualData.skill.forEach((objelem) => {
        const skillId = objelem.skill.split(" ").join("").toLowerCase();
        const skillNum = objelem.skillID;
        if (skillId.includes(value)) {
            _constants__WEBPACK_IMPORTED_MODULE_1__.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
        <input  type="checkbox" id="${skillId}" >
        <label for="${skillId}"> ${objelem.skill}</label><br>
    </div>`;
        }
    });
};
const clearFilter = () => {
    const skill = document.querySelectorAll(".skill-element input");
    skill.forEach((elem) => {
        const elemChecked = elem;
        if (elemChecked.checked) {
            elemChecked.checked = false;
        }
    });
    (0,_script__WEBPACK_IMPORTED_MODULE_0__.filterTable)();
};
_constants__WEBPACK_IMPORTED_MODULE_1__.filterSearchBox.addEventListener("input", RenderFilterBox);
_constants__WEBPACK_IMPORTED_MODULE_1__.clearFilterButton.addEventListener("click", clearFilter);


/***/ }),

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterArr: () => (/* binding */ FilterArr),
/* harmony export */   actualData: () => (/* binding */ actualData),
/* harmony export */   changeSkillName: () => (/* binding */ changeSkillName),
/* harmony export */   changeSkillNameArr: () => (/* binding */ changeSkillNameArr),
/* harmony export */   fetchData: () => (/* binding */ fetchData),
/* harmony export */   fillentry: () => (/* binding */ fillentry),
/* harmony export */   filterTable: () => (/* binding */ filterTable),
/* harmony export */   firebaseData: () => (/* binding */ firebaseData),
/* harmony export */   originalData: () => (/* binding */ originalData),
/* harmony export */   skillName: () => (/* binding */ skillName),
/* harmony export */   skillNameArr: () => (/* binding */ skillNameArr),
/* harmony export */   tableCreate: () => (/* binding */ tableCreate)
/* harmony export */ });
/* harmony import */ var _tableActionButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableActionButton */ "./src/tableActionButton.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _SortFun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SortFun */ "./src/SortFun.ts");



let actualData;
let originalData;
let firebaseData;
let skillNameArr = []; //string array
let skillName;
const changeSkillNameArr = (elem) => {
    skillNameArr = elem;
};
const changeSkillName = (elem) => {
    skillName = elem;
};
const skillInput = document.querySelector("#skill");
const Fulltable = document.querySelector(".table");
const formSkill = document.querySelector(".form-skill");
const addedSkills = document.querySelector(".added-skills");
//general table rendering function
///////////////////////////////////////////////
const tableCreate = (arr) => {
    arr.forEach((objelem) => {
        let dep = actualData.department[objelem.department - 1].departmentName;
        _constants__WEBPACK_IMPORTED_MODULE_1__.tableBody.innerHTML += `
    <tr class="data-row">
        <td>${objelem.id}</td>
        <td>${objelem.fullName}</td>
        <td>${objelem.email}</td>
        <td>${dep}</td>
        <td id="action-button-cell">
            <button  data-emp-id= ${objelem.id}><img data-emp-id= ${objelem.id} class="view-image-icon" src="assets/images/view-img.svg"
                    alt="view button image"></button>
            <button class="edit-image-icon" data-emp-id=${objelem.id}><img data-emp-id= ${objelem.id} class="edit-image-icon" src="assets/images/edit-img.svg"
                    alt="Edit button image"></button>
            <button class="del-image-icon" data-emp-id=${objelem.id}><img data-emp-id= ${objelem.id} class="del-image-icon" src="assets/images/del-img.svg"
                    alt="Delete button image"></button>
        </td>
    </tr>
    `;
    });
};
// fetching data from firebase and display it into the table
///////////////////////////////////////////
const fillentry = (obj) => {
    tableCreate(obj.employee);
    // filter skill button script
    obj.skill.forEach((objelem) => {
        const skillId = objelem.skill.split(" ").join("");
        const skillNum = objelem.skillID;
        _constants__WEBPACK_IMPORTED_MODULE_1__.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
    });
    //fill department in data entry modal
    _constants__WEBPACK_IMPORTED_MODULE_1__.departmentEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
    obj.department.forEach((objelem) => {
        _constants__WEBPACK_IMPORTED_MODULE_1__.departmentEntry.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
    });
    // fill role in data entry modal
    _constants__WEBPACK_IMPORTED_MODULE_1__.roleEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
    obj.role.forEach((objelem) => {
        _constants__WEBPACK_IMPORTED_MODULE_1__.roleEntry.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
    });
    //fill skill in skill selection in data entry modal
    _constants__WEBPACK_IMPORTED_MODULE_1__.skillSelecEntry.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
    obj.skill.forEach((objelem) => {
        _constants__WEBPACK_IMPORTED_MODULE_1__.skillSelecEntry.innerHTML += ` <option class="skill-options" id="${objelem.skill}" value="${objelem.skill}">${objelem.skill}</option>`;
    });
};
//fetching data whole data from firebase
////////////////////////////////////////////////
const fetchData = function (fillentry) {
    fetch(_constants__WEBPACK_IMPORTED_MODULE_1__.api + "/.json")
        .then((res) => res.json())
        .then((data) => {
        // firebaseData = data;
        firebaseData = structuredClone(data);
        data.employee = data.employee.filter(Boolean);
        originalData = structuredClone(data);
        actualData = data;
        fillentry(data);
        (0,_SortFun__WEBPACK_IMPORTED_MODULE_2__.sortFun)();
    })
        .catch((err) => console.log(err, "error"));
};
fetchData(fillentry);
_constants__WEBPACK_IMPORTED_MODULE_1__.table.addEventListener("click", _tableActionButton__WEBPACK_IMPORTED_MODULE_0__.handleTableClick);
//close data-view-modal
_constants__WEBPACK_IMPORTED_MODULE_1__.dataViewClose.addEventListener("click", () => {
    _constants__WEBPACK_IMPORTED_MODULE_1__.overlay.style.display = "none";
    _constants__WEBPACK_IMPORTED_MODULE_1__.dataViewModal.style.display = "none";
});
//close data-del-modal
_constants__WEBPACK_IMPORTED_MODULE_1__.cancelDelButton.addEventListener("click", () => {
    _constants__WEBPACK_IMPORTED_MODULE_1__.overlay.style.display = "none";
    _constants__WEBPACK_IMPORTED_MODULE_1__.dataDelModal.style.display = "none";
});
//Add employee function
_constants__WEBPACK_IMPORTED_MODULE_1__.addEmployeeButton.addEventListener("click", () => {
    _constants__WEBPACK_IMPORTED_MODULE_1__.dataEntryForm.reset();
    addedSkills.innerHTML = "";
    _constants__WEBPACK_IMPORTED_MODULE_1__.dataEntrySubmit.value = "Add";
    _constants__WEBPACK_IMPORTED_MODULE_1__.overlay.style.display = "block";
    _constants__WEBPACK_IMPORTED_MODULE_1__.dataEntryModal.style.display = "block";
});
_constants__WEBPACK_IMPORTED_MODULE_1__.dataEntryClose.addEventListener("click", () => {
    _constants__WEBPACK_IMPORTED_MODULE_1__.dataEntryForm.reset();
    _constants__WEBPACK_IMPORTED_MODULE_1__.overlay.style.display = "none";
    _constants__WEBPACK_IMPORTED_MODULE_1__.dataEntryModal.style.display = "none";
});
//filterAndSearch functionality
let FilterArr = [];
const filterTable = () => {
    let inputs = document.querySelectorAll(".skill-element");
    let checkedFilterArr = [];
    inputs.forEach((elem) => {
        const element = elem;
        const trial = element.querySelector(`#${element.dataset.skillId}`);
        if (trial.checked) {
            const dataset = element.dataset.skillNum;
            checkedFilterArr.push(dataset);
        }
    });
    const searchvalue = _constants__WEBPACK_IMPORTED_MODULE_1__.searchBar.value.toLowerCase();
    FilterArr = actualData.employee;
    if (_constants__WEBPACK_IMPORTED_MODULE_1__.searchBar.value !== "") {
        FilterArr = FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
    }
    if (checkedFilterArr.length !== 0) {
        FilterArr = FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
    }
    _constants__WEBPACK_IMPORTED_MODULE_1__.tableBody.innerHTML = "";
    tableCreate(FilterArr);
};
const changeSkillState = (skillId) => {
    const temp = document.querySelector(`#${skillId}`);
    temp.click();
    filterTable();
};
_constants__WEBPACK_IMPORTED_MODULE_1__.skillList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("skill-element") &&
        target.tagName !== "INPUT") {
        const dataset = target.dataset.skillId;
        changeSkillState(dataset);
    }
    if (target.tagName === "INPUT" || target.tagName === "LABEL") {
        const targetClosest = target.closest("div");
        const dataset = targetClosest.dataset.skillId;
        changeSkillState(dataset);
    }
});
_constants__WEBPACK_IMPORTED_MODULE_1__.sortButton.addEventListener("click", _SortFun__WEBPACK_IMPORTED_MODULE_2__.sortFun);
_constants__WEBPACK_IMPORTED_MODULE_1__.searchBar.addEventListener("input", filterTable);
//setting limit to date of birth
let today = new Date().toJSON().slice(0, 10);
const dateInput = document.querySelector("#dob");
dateInput.setAttribute("max", today);


/***/ }),

/***/ "./src/tableActionButton.ts":
/*!**********************************!*\
  !*** ./src/tableActionButton.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleTableClick: () => (/* binding */ handleTableClick)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _updateEmployee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateEmployee */ "./src/updateEmployee.ts");
/* harmony import */ var _viewEmployee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./viewEmployee */ "./src/viewEmployee.ts");
/* harmony import */ var _deleteEmployee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deleteEmployee */ "./src/deleteEmployee.ts");





const handleTableClick = (e) => {
    const target = e.target;
    if (target.classList.contains("view-image-icon")) {
        _constants__WEBPACK_IMPORTED_MODULE_0__.overlay.style.display = "block";
        _constants__WEBPACK_IMPORTED_MODULE_0__.dataViewModal.style.display = "block";
        (0,_viewEmployee__WEBPACK_IMPORTED_MODULE_2__.viewModal)(Number(target.dataset.empId));
    }
    if (target.classList.contains("del-image-icon")) {
        _constants__WEBPACK_IMPORTED_MODULE_0__.overlay.style.display = "block";
        _constants__WEBPACK_IMPORTED_MODULE_0__.dataDelModal.style.display = "block";
        (0,_deleteEmployee__WEBPACK_IMPORTED_MODULE_3__.delEmp)(Number(target.dataset.empId));
    }
    /// update user details functionality
    if (target.classList.contains("edit-image-icon")) {
        _constants__WEBPACK_IMPORTED_MODULE_0__.overlay.style.display = "block";
        _constants__WEBPACK_IMPORTED_MODULE_0__.dataEntryModal.style.display = "block";
        _constants__WEBPACK_IMPORTED_MODULE_0__.dataEntrySubmit.value = "Update";
        (0,_updateEmployee__WEBPACK_IMPORTED_MODULE_1__.updateEmp)(Number(target.dataset.empId));
    }
};


/***/ }),

/***/ "./src/type.ts":
/*!*********************!*\
  !*** ./src/type.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/updateEmployee.ts":
/*!*******************************!*\
  !*** ./src/updateEmployee.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   idOfEmp: () => (/* binding */ idOfEmp),
/* harmony export */   updateEmp: () => (/* binding */ updateEmp),
/* harmony export */   updateIndex: () => (/* binding */ updateIndex)
/* harmony export */ });
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ "./src/script.ts");

// export let skillName: string[];
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const dateOfJoin = document.querySelector("#doj");
const dataOfBirth = document.querySelector("#dob");
const depInput = document.querySelector("#dep");
const roleInput = document.querySelector("#role");
const locInput = document.querySelector("#loc");
const addedSkills = document.querySelector(".added-skills");
let updateIndex = 0;
let idOfEmp = 1001;
const updateEmp = (id) => {
    idOfEmp = id;
    let currObj;
    let department;
    _script__WEBPACK_IMPORTED_MODULE_0__.actualData.employee.forEach((obj) => {
        if (obj.id == id) {
            currObj = obj;
            _script__WEBPACK_IMPORTED_MODULE_0__.actualData.department.forEach((obj) => {
                if (currObj.department == obj.departmentID)
                    department = obj.departmentName;
            });
            name.value = `${currObj.fullName}`;
            email.value = `${currObj.email}`;
            dateOfJoin.value = `${currObj.dateOfBirth}`;
            dataOfBirth.value = `${currObj.dateOfJoin}`;
            locInput.value = `${currObj.workLocation}`;
            roleInput.value = `${currObj.role}`;
            depInput.value = `${department}`;
        }
    });
    let skillNameCopy = _script__WEBPACK_IMPORTED_MODULE_0__.actualData.skill.reduce((acc, elem) => {
        if (currObj.skills.includes(elem.skillID)) {
            return [...acc, elem.skill];
        }
        else
            return [...acc];
    }, []);
    (0,_script__WEBPACK_IMPORTED_MODULE_0__.changeSkillName)(skillNameCopy);
    addedSkills.innerHTML = "";
    _script__WEBPACK_IMPORTED_MODULE_0__.skillName.forEach((elem) => {
        addedSkills.innerHTML += `
        <div data-rem-id=${elem} class="each-skill-added">
                                ${elem}
                            </div>
        `;
    });
    _script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee.forEach((elem, index) => {
        if (elem.id == currObj.id)
            updateIndex = index;
    });
};



/***/ }),

/***/ "./src/viewEmployee.ts":
/*!*****************************!*\
  !*** ./src/viewEmployee.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   viewModal: () => (/* binding */ viewModal)
/* harmony export */ });
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ "./src/script.ts");

const nameView = document.querySelector("#nameView");
const emailView = document.querySelector("#emailView");
const empIdView = document.querySelector("#empIdView");
const dojView = document.querySelector("#dojView");
const dobView = document.querySelector("#dobView");
const depView = document.querySelector("#depView");
const roleView = document.querySelector("#roleView");
const locView = document.querySelector("#locView");
const imgView = document.querySelector(".img");
const viewSkillBox = document.querySelector(".view-skill-box");
const viewModal = (id) => {
    let viewObj;
    let department;
    _script__WEBPACK_IMPORTED_MODULE_0__.actualData.employee.forEach((elem) => {
        if (elem.id == id) {
            viewObj = elem;
            _script__WEBPACK_IMPORTED_MODULE_0__.actualData.department.forEach((obj) => {
                if (viewObj.department == obj.departmentID)
                    department = obj.departmentName;
            });
            nameView.innerHTML = `${viewObj.fullName}`;
            emailView.innerHTML = `${viewObj.email}`;
            empIdView.innerHTML = `${viewObj.id}`;
            dojView.innerHTML = `${viewObj.dateOfJoin}`;
            dobView.innerHTML = `${viewObj.dateOfBirth}`;
            depView.innerHTML = `${department}`;
            roleView.innerHTML = `${viewObj.role}`;
            locView.innerHTML = `${viewObj.workLocation}`;
            // if (viewObj.imageSrc) {
            //   imgView.setAttribute("src", `${viewObj.imageSrc}`);
            // } else {
            //   console.log("error while loading image");
            // }
            // imgView.src = `${viewObj.imageSrc}`;
        }
    });
    let eachSkill = _script__WEBPACK_IMPORTED_MODULE_0__.actualData.skill.reduce((acc, elem) => {
        if (viewObj.skills.includes(elem.skillID)) {
            return [...acc, elem.skill];
        }
        else
            return [...acc];
    }, []);
    viewSkillBox.innerHTML = "";
    eachSkill.forEach((elem) => {
        viewSkillBox.innerHTML += `
        <div class="each-skill-view">${elem}</div>
        `;
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/filterAndSearchFun.ts");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/script.ts");
/******/ 	__webpack_require__("./src/SortFun.ts");
/******/ 	__webpack_require__("./src/tableActionButton.ts");
/******/ 	__webpack_require__("./src/constants.ts");
/******/ 	__webpack_require__("./src/type.ts");
/******/ 	__webpack_require__("./src/addUpdateEmployee.ts");
/******/ 	__webpack_require__("./src/deleteEmployee.ts");
/******/ 	__webpack_require__("./src/updateEmployee.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/viewEmployee.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBLEtBQUs7QUFDTDs7Ozs7OztVQ2xEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9Tb3J0RnVuLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9hZGRVcGRhdGVFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9kZWxldGVFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvZmlsdGVyQW5kU2VhcmNoRnVuLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy90eXBlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy91cGRhdGVFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdmlld0VtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3R1YWxEYXRhLCB0YWJsZUNyZWF0ZSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgRmlsdGVyQXJyIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyB0YWJsZUJvZHksIHNvcnRCdXR0b24gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmxldCBkaXJGbGFnID0gMTtcbi8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBzb3J0RnVuID0gKCkgPT4ge1xuICAgIGxldCBhcnJheVRvU29ydCA9IGFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgaWYgKEZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgIGFycmF5VG9Tb3J0ID0gRmlsdGVyQXJyO1xuICAgIGxldCBhcnJUb1JlbmRlciA9IGFycmF5VG9Tb3J0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IG5hbWUyID0gYi5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgY29tcGFyaXNvbiA9IDA7XG4gICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uID0gMSAqIGRpckZsYWc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgY29tcGFyaXNvbiA9IC0xICogZGlyRmxhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICB9KTtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShhcnJUb1JlbmRlcik7XG4gICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy9kb3duLWFycm93LnN2Z1wiO1xuICAgICAgICBkaXJGbGFnID0gLTE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkaXJGbGFnID0gMTtcbiAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvdXAtYXJyb3cuc3ZnXCI7XG4gICAgfVxufTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgYWN0dWFsRGF0YSwgZmV0Y2hEYXRhLCBmaWxsZW50cnksIG9yaWdpbmFsRGF0YSwgc2tpbGxOYW1lQXJyLCBjaGFuZ2VTa2lsbE5hbWVBcnIsIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyB1cGRhdGVJbmRleCwgaWRPZkVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGFwaSwgZGF0YUVudHJ5TW9kYWwsIG92ZXJsYXksIG5hbWUsIGVtYWlsLCBkYXRlT2ZKb2luLCBkYXRhT2ZCaXJ0aCwgZGVwSW5wdXQsIHJvbGVJbnB1dCwgbG9jSW5wdXQsIHNraWxsSW5wdXQsIEZ1bGx0YWJsZSwgZm9ybVNraWxsLCBhZGRlZFNraWxscywgZGF0YUVudHJ5TmFtZUFsZXJ0LCBkYXRhRW50cnlEb2pBbGVydCwgZGF0YUVudHJ5RG9iQWxlcnQsIGRhdGFFbnRyeVJvbGVBbGVydCwgZGF0YUVudHJ5RGVwQWxlcnQsIGRhdGFFbnRyeUxvY0FsZXJ0LCBkYXRhRW50cnlTa2lsbEFsZXJ0LCBkYXRhRW50cnlTdWJtaXQsIGRhdGFFbnRyeUZvcm0sIGRhdGFFbnRyeUVtYWlsQWxlcnQsIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG4vL2Z1bmN0aW9uIHRvIHB1dCBkYXRhIHRvIGZpcmViYXNlXG5jb25zdCBwdXREYXRhID0gKGluZGV4LCBpZCwgbmFtZSwgZW1haWwsIGRvaiwgZG9iLCBkZXAsIHJvbGUsIGxvYywgc2tpbGwsIGltZykgPT4ge1xuICAgIGZldGNoKGFwaSArIFwiL2VtcGxveWVlL1wiICsgaW5kZXggKyBcIi5qc29uXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBkYXRlT2ZCaXJ0aDogZG9iLFxuICAgICAgICAgICAgZGF0ZU9mSm9pbjogZG9qLFxuICAgICAgICAgICAgZGVwYXJ0bWVudDogZGVwLFxuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgICAgIHNraWxsczogc2tpbGwsXG4gICAgICAgICAgICB3b3JrTG9jYXRpb246IGxvYyxcbiAgICAgICAgICAgIGZ1bGxOYW1lOiBuYW1lLFxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgaW1hZ2VTcmM6IGltZyxcbiAgICAgICAgfSksXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMsIFwic3VjY2Vzc2Z1bGx5IGFkZGVkISEhXCIpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG4gICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBmZXRjaERhdGEoZmlsbGVudHJ5KTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSwgXCJkYXRhXCIpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3Igd2hpbGUgcGVyZm9ybWluZyB0aGUgYWN0aW9uXCIpKTtcbn07XG4vL2NvbnZlcnRzIHNraWxsbmFtZSB0byBza2lsbCBpZCBhcnJheVxuY29uc3QgcmV0dXJuU2tpbGxBcnIgPSAoYXJyT2ZOYW1lcykgPT4ge1xuICAgIGFyck9mTmFtZXMgPSBhcnJPZk5hbWVzLm1hcCgoZWxlbSkgPT4gZWxlbS50b0xvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCBza2lsbElEQXJyID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgZWxlbSkge1xuICAgICAgICBpZiAoYXJyT2ZOYW1lcy5pbmNsdWRlcyhlbGVtLnNraWxsLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbElEXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgfSwgW10pO1xuICAgIHJldHVybiBza2lsbElEQXJyO1xufTtcbi8vIGNvbnZlcnRzIGRlcGFydG1lbnQgbmFtZSB0byBkZXBhcnRtZW50IGlkXG5jb25zdCByZXR1cm5EZXBJRCA9IChkZXBOYW1lKSA9PiB7XG4gICAgZGVwTmFtZSA9IGRlcE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBkZXBJRCA9IGFjdHVhbERhdGEuZGVwYXJ0bWVudC5yZWR1Y2UoKHZhbHVlLCBlbGVtKSA9PiB7XG4gICAgICAgIGlmIChlbGVtLmRlcGFydG1lbnROYW1lLnRvTG93ZXJDYXNlKCkgPT0gZGVwTmFtZSkge1xuICAgICAgICAgICAgdmFsdWUgPSBlbGVtLmRlcGFydG1lbnRJRDtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuIGRlcElEO1xufTtcbmNvbnN0IHJlYWRGaWxlQXNCYXNlNjQgPSAoZmlsZSkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgcmVqZWN0KFwiTm8gZmlsZSBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJlc29sdmUoKF9hID0gZS50YXJnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9KTtcbn07XG4vL2hhbmRsaW5nIHRoZSBzdWJtaXQgYnV0dG9uIGNsaWNrXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNvbnN0IGhhbmRsZVN1Ym1pdENsaWNrID0gKGUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHZhciBfYTtcbiAgICBsZXQgYmFzZTY0U3RyaW5nO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvL3Rha2luZyBpbWFnZSBmcm9tIHVzZXJcbiAgICBjb25zdCBpbWdFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlLWlucHV0XCIpO1xuICAgIGNvbnN0IGltZ0ZpbGUgPSAoX2EgPSBpbWdFbGVtLmZpbGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XG4gICAgdHJ5IHtcbiAgICAgICAgYmFzZTY0U3RyaW5nID0geWllbGQgcmVhZEZpbGVBc0Jhc2U2NChpbWdGaWxlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGZldGNoaW5nIGJhc2U2NFN0cmluZ1wiKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZVZhbCA9IG5hbWUudmFsdWU7XG4gICAgY29uc3QgZW1haWxWYWwgPSBlbWFpbC52YWx1ZTtcbiAgICBjb25zdCBkYXRlT2ZKb2luVmFsID0gZGF0ZU9mSm9pbi52YWx1ZTtcbiAgICBjb25zdCBkYXRlT2ZCaXJ0aFZhbCA9IGRhdGFPZkJpcnRoLnZhbHVlO1xuICAgIGNvbnN0IGRlcElucHV0VmFsID0gcmV0dXJuRGVwSUQoZGVwSW5wdXQudmFsdWUpO1xuICAgIGNvbnN0IHJvbGVJbnB1dFZhbCA9IHJvbGVJbnB1dC52YWx1ZTtcbiAgICBjb25zdCBsb2NJbnB1dFZhbCA9IGxvY0lucHV0LnZhbHVlO1xuICAgIGNvbnN0IHNraWxsSW5wdXRWYWwgPSByZXR1cm5Ta2lsbEFycihza2lsbE5hbWVBcnIpO1xuICAgIGxldCBpc0VyciA9IGZhbHNlO1xuICAgIGlmIChuYW1lVmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlOYW1lQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlOYW1lQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghZGF0ZU9mSm9pblZhbCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURvakFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RG9qQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghZGF0ZU9mQmlydGhWYWwpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEb2JBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURvYkFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAocm9sZUlucHV0VmFsID09PSBcIm5vbmVcIikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeVJvbGVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeVJvbGVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFkZXBJbnB1dFZhbCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURlcEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RGVwQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChsb2NJbnB1dFZhbCA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlMb2NBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeUxvY0FsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIXNraWxsSW5wdXRWYWwubGVuZ3RoKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5U2tpbGxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeVNraWxsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghZW1haWwuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgIGRhdGFFbnRyeUVtYWlsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlFbWFpbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoZGF0YUVudHJ5U3VibWl0LnZhbHVlID09IFwiQWRkXCIpIHtcbiAgICAgICAgaWYgKCFpc0Vycikge1xuICAgICAgICAgICAgbGV0IGVudHJ5SW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKGFjdHVhbERhdGEuZW1wbG95ZWUpIHtcbiAgICAgICAgICAgICAgICBhY3R1YWxEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGVudHJ5SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IGVudHJ5SW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGVtcGxveWVlSUQgPSAxMDAxO1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsRGF0YS5lbXBsb3llZSkge1xuICAgICAgICAgICAgICAgIGVtcGxveWVlSUQgPVxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIob3JpZ2luYWxEYXRhLmVtcGxveWVlW29yaWdpbmFsRGF0YS5lbXBsb3llZS5sZW5ndGggLSAxXS5pZCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlbXBsb3llZUlEID0gMTAwMTtcbiAgICAgICAgICAgIHB1dERhdGEoZW50cnlJbmRleCwgZW1wbG95ZWVJRCwgbmFtZVZhbCwgZW1haWxWYWwsIGRhdGVPZkpvaW5WYWwsIGRhdGVPZkJpcnRoVmFsLCBkZXBJbnB1dFZhbCwgcm9sZUlucHV0VmFsLCBsb2NJbnB1dFZhbCwgc2tpbGxJbnB1dFZhbCwgYmFzZTY0U3RyaW5nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVtcGxveWVlSUQsIFwiZW1wbG95ZWUgaWQgdGhhdCBpcyBnb2luZyBmb3IgdGhlIG5ldyBkYXRhXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnlJbmRleCwgXCJpbmRleCB0aGF0IHRoZSBuZXcgZGF0YSBvY2N1cGllc1wiKTtcbiAgICAgICAgICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAvLyAgIHNraWxsTmFtZUFyciA9IFtdO1xuICAgICAgICAgICAgbGV0IG51bGxBcnIgPSBbXTtcbiAgICAgICAgICAgIGNoYW5nZVNraWxsTmFtZUFycihudWxsQXJyKTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpbiBhZGRpbmcgbmV3IGVtcGxveWVlXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9PSBcIlVwZGF0ZVwiKSB7XG4gICAgICAgIGlmICghaXNFcnIpIHtcbiAgICAgICAgICAgIGxldCBlbXBsb3llZUlEID0gaWRPZkVtcDtcbiAgICAgICAgICAgIGJhc2U2NFN0cmluZyA9IG9yaWdpbmFsRGF0YS5lbXBsb3llZVt1cGRhdGVJbmRleF0uaW1hZ2VTcmM7XG4gICAgICAgICAgICBwdXREYXRhKHVwZGF0ZUluZGV4LCBlbXBsb3llZUlELCBuYW1lVmFsLCBlbWFpbFZhbCwgZGF0ZU9mSm9pblZhbCwgZGF0ZU9mQmlydGhWYWwsIGRlcElucHV0VmFsLCByb2xlSW5wdXRWYWwsIGxvY0lucHV0VmFsLCBza2lsbElucHV0VmFsLCBiYXNlNjRTdHJpbmcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZW1wbG95ZWVJRCwgXCJpZCB0aGF0IGlzIGdvaW5nIHRvIGJlIHVwZGF0ZWRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1cGRhdGVJbmRleCwgXCJpbmRleCB0aGF0IGlzIGdvaW5nIHRvIGJlIHVwZGF0ZWRcIik7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZGF0YUVudHJ5Rm9ybS5vbnN1Ym1pdCA9IGhhbmRsZVN1Ym1pdENsaWNrO1xuLy9kYXRhLWVudHJ5LWZvcm0gc2tpbGwgc2VjdGlvbiBmdW5jdGlvbmFsaXRpZXNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5GdWxsdGFibGUub25jbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgLy8gc2tpbGxOYW1lQXJyID0gc2tpbGxOYW1lO1xuICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoc2tpbGxOYW1lKTtcbiAgICB9XG59O1xuZm9ybVNraWxsLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIC8vIGZvciBjaHJvbWVcbiAgICAvLyAgIGlmICh0YXJnZXQuaWQgPT0gXCJza2lsbFwiICYmICFza2lsbE5hbWVBcnIuaW5jbHVkZXMoc2tpbGxJbnB1dC52YWx1ZSkpIHtcbiAgICAvLyAgICAgaWYgKHNraWxsSW5wdXQudmFsdWUgIT0gXCJub25lXCIpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhza2lsbElucHV0LnZhbHVlLCBcInNraWxsSW5wdXQudmFsdWVcIik7XG4gICAgLy8gICAgICAgc2tpbGxOYW1lQXJyLnB1c2goc2tpbGxJbnB1dC52YWx1ZSk7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgY2hyb21lIHN0eWxlXCIpO1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKHNraWxsTmFtZUFycik7XG4gICAgLy8gICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAvLyAgICAgICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke3NraWxsSW5wdXQudmFsdWV9XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgLy8gICAgICAgICAgICAgICAke3NraWxsSW5wdXQudmFsdWV9XG4gICAgLy8gICAgICAgICAgIDwvZGl2PmA7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyAgIGZvciBtb3J6aWxsYVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtb3B0aW9uc1wiKSAmJlxuICAgICAgICAhc2tpbGxOYW1lQXJyLmluY2x1ZGVzKHRhcmdldC5pZCkpIHtcbiAgICAgICAgc2tpbGxOYW1lQXJyLnB1c2godGFyZ2V0LmlkKTtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke3RhcmdldC5pZH1cIiBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAgICAgICAgICR7dGFyZ2V0LmlkfVxuICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIgZXJyb3Igd2hpbGUgdXBkYXRpbmdcIik7XG4gICAgfVxufTtcbmFkZGVkU2tpbGxzLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuZGF0YXNldC5yZW1JZCkge1xuICAgICAgICBsZXQgc2tpbGxOYW1lQXJyQ29weSA9IHNraWxsTmFtZUFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0gIT0gdGFyZ2V0LmRhdGFzZXQucmVtSWQpO1xuICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoc2tpbGxOYW1lQXJyQ29weSk7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHNraWxsTmFtZUFyci5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke2VsZW19XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgICAgICAgJHtlbGVtfVxuICAgICAgPC9kaXY+YDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNraWxsSW5wdXQudmFsdWUgPSBcIm5vbmVcIjtcbn07XG4iLCJleHBvcnQgY29uc3QgYXBpID0gXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiO1xuZXhwb3J0IGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5leHBvcnQgY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5leHBvcnQgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuZXhwb3J0IGNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWlucHV0LWJveFwiKTtcbmV4cG9ydCBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG5leHBvcnQgY29uc3QgZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbmV4cG9ydCBjb25zdCBkZXBhcnRtZW50RW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmV4cG9ydCBjb25zdCByb2xlRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5leHBvcnQgY29uc3Qgc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhVmlld0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctY2xvc2VcIik7XG5leHBvcnQgY29uc3QgY2FuY2VsRGVsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtZGVsLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBhZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1jbG9zZVwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmV4cG9ydCBjb25zdCB0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5leHBvcnQgY29uc3QgY2xlYXJGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsZWFyLWZpbHRlci1idXR0b25cIik7XG5leHBvcnQgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbmV4cG9ydCBjb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIik7XG5leHBvcnQgY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFPZkJpcnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5leHBvcnQgY29uc3QgZGVwSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmV4cG9ydCBjb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5leHBvcnQgY29uc3QgbG9jSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1wiKTtcbmV4cG9ydCBjb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmV4cG9ydCBjb25zdCBGdWxsdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlXCIpO1xuZXhwb3J0IGNvbnN0IGZvcm1Ta2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1za2lsbFwiKTtcbmV4cG9ydCBjb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeU5hbWVBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1uYW1lLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeURvakFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRvai1hbGVydCBcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5RG9iQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZG9iLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeVJvbGVBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1yb2xlLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeURlcEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRlcC1hbGVydFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlMb2NBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1sb2MtYWxlcnRcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5U2tpbGxBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1za2lsbC1hbGVydFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlTdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGEtZW50cnktc3VibWl0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZm9ybVwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlFbWFpbEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWVtYWlsLWFsZXJ0XCIpO1xuIiwiaW1wb3J0IHsgZmV0Y2hEYXRhLCBmaWxsZW50cnksIGZpcmViYXNlRGF0YSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgYXBpLCBza2lsbExpc3QsIG92ZXJsYXksIGRhdGFEZWxNb2RhbCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS1idXR0b25cIik7XG5jb25zdCBkZWxEYXRhID0gKGluZGV4KSA9PiB7XG4gICAgZmV0Y2goYXBpICsgXCIvZW1wbG95ZWUvXCIgKyBpbmRleCArIFwiLmpzb25cIiwge1xuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMsIFwic3VjY2Vzc2Z1bGx5IGRlbGV0ZWQhISFcIik7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIC8vIHRhYmxlQ3JlYXRlKGRhdGEpO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEsIFwiZGF0YVwiKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyLCBcImVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIpKTtcbn07XG5leHBvcnQgY29uc3QgZGVsRW1wID0gKGlkKSA9PiB7XG4gICAgbGV0IGRlbEluZGV4O1xuICAgIC8vIGZpcmViYXNlRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgIC8vICAgaWYgKGVsZW0uaWQgPT0gaWQpIGRlbEluZGV4ID0gaW5kZXg7XG4gICAgLy8gfSk7XG4gICAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCBmaXJlYmFzZURhdGEuZW1wbG95ZWUubGVuZ3RoOyBzdGVwKyspIHtcbiAgICAgICAgaWYgKGZpcmViYXNlRGF0YS5lbXBsb3llZVtzdGVwXSA9PSBudWxsKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGVsc2UgaWYgKGZpcmViYXNlRGF0YS5lbXBsb3llZVtzdGVwXS5pZCA9PSBpZClcbiAgICAgICAgICAgIGRlbEluZGV4ID0gc3RlcDtcbiAgICB9XG4gICAgY29uZmlybUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBkZWxEYXRhKGRlbEluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2coZGVsSW5kZXgsIFwiaW5kZXggdGhhdCBpcyBnb2luZyB0byBiZSBkZWxldGVkXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhpZCwgXCJ0aGUgaWQgdGhhdCBpcyBnb2luZyB0byBiZSBkZWxldGVkXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhmaXJlYmFzZURhdGEsIFwiZmlyZWJhc2VEYXRhXCIpO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9O1xufTtcbiIsIi8vIGZldGNoIHNraWxsIGZvcm0gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgb24gdGhlIGZpbHRlciBza2lsbCBzZWN0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5pbXBvcnQgeyBhY3R1YWxEYXRhLCBmaWx0ZXJUYWJsZSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgc2tpbGxMaXN0LCBmaWx0ZXJTZWFyY2hCb3gsIGNsZWFyRmlsdGVyQnV0dG9uIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5leHBvcnQgY29uc3QgUmVuZGVyRmlsdGVyQm94ID0gKCkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGZpbHRlclNlYXJjaEJveC52YWx1ZTtcbiAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgYWN0dWFsRGF0YS5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICBpZiAoc2tpbGxJZC5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgICAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3QgY2xlYXJGaWx0ZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnQgaW5wdXRcIik7XG4gICAgc2tpbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtQ2hlY2tlZCA9IGVsZW07XG4gICAgICAgIGlmIChlbGVtQ2hlY2tlZC5jaGVja2VkKSB7XG4gICAgICAgICAgICBlbGVtQ2hlY2tlZC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmaWx0ZXJUYWJsZSgpO1xufTtcbmZpbHRlclNlYXJjaEJveC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgUmVuZGVyRmlsdGVyQm94KTtcbmNsZWFyRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGVhckZpbHRlcik7XG4iLCJpbXBvcnQgeyBoYW5kbGVUYWJsZUNsaWNrIH0gZnJvbSBcIi4vdGFibGVBY3Rpb25CdXR0b25cIjtcbmltcG9ydCB7IGFwaSwgb3ZlcmxheSwgdGFibGUsIGRhdGFWaWV3TW9kYWwsIGRhdGFEZWxNb2RhbCwgdGFibGVCb2R5LCBza2lsbExpc3QsIGRlcGFydG1lbnRFbnRyeSwgcm9sZUVudHJ5LCBza2lsbFNlbGVjRW50cnksIGRhdGFWaWV3Q2xvc2UsIGNhbmNlbERlbEJ1dHRvbiwgYWRkRW1wbG95ZWVCdXR0b24sIGRhdGFFbnRyeUNsb3NlLCBkYXRhRW50cnlNb2RhbCwgc2VhcmNoQmFyLCBzb3J0QnV0dG9uLCBkYXRhRW50cnlGb3JtLCBkYXRhRW50cnlTdWJtaXQsIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBzb3J0RnVuIH0gZnJvbSBcIi4vU29ydEZ1blwiO1xuZXhwb3J0IGxldCBhY3R1YWxEYXRhO1xuZXhwb3J0IGxldCBvcmlnaW5hbERhdGE7XG5leHBvcnQgbGV0IGZpcmViYXNlRGF0YTtcbmV4cG9ydCBsZXQgc2tpbGxOYW1lQXJyID0gW107IC8vc3RyaW5nIGFycmF5XG5leHBvcnQgbGV0IHNraWxsTmFtZTtcbmV4cG9ydCBjb25zdCBjaGFuZ2VTa2lsbE5hbWVBcnIgPSAoZWxlbSkgPT4ge1xuICAgIHNraWxsTmFtZUFyciA9IGVsZW07XG59O1xuZXhwb3J0IGNvbnN0IGNoYW5nZVNraWxsTmFtZSA9IChlbGVtKSA9PiB7XG4gICAgc2tpbGxOYW1lID0gZWxlbTtcbn07XG5jb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBmb3JtU2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2tpbGxcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuLy9nZW5lcmFsIHRhYmxlIHJlbmRlcmluZyBmdW5jdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCB0YWJsZUNyZWF0ZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBsZXQgZGVwID0gYWN0dWFsRGF0YS5kZXBhcnRtZW50W29iamVsZW0uZGVwYXJ0bWVudCAtIDFdLmRlcGFydG1lbnROYW1lO1xuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MICs9IGBcbiAgICA8dHIgY2xhc3M9XCJkYXRhLXJvd1wiPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmlkfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZnVsbE5hbWV9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5lbWFpbH08L3RkPlxuICAgICAgICA8dGQ+JHtkZXB9PC90ZD5cbiAgICAgICAgPHRkIGlkPVwiYWN0aW9uLWJ1dHRvbi1jZWxsXCI+XG4gICAgICAgICAgICA8YnV0dG9uICBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwidmlldy1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy92aWV3LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJ2aWV3IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtaW1hZ2UtaWNvblwiIGRhdGEtZW1wLWlkPSR7b2JqZWxlbS5pZH0+PGltZyBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfSBjbGFzcz1cImVkaXQtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZWRpdC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRWRpdCBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIGRhdGEtZW1wLWlkPSR7b2JqZWxlbS5pZH0+PGltZyBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfSBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9kZWwtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkRlbGV0ZSBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIGA7XG4gICAgfSk7XG59O1xuLy8gZmV0Y2hpbmcgZGF0YSBmcm9tIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IGludG8gdGhlIHRhYmxlXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3QgZmlsbGVudHJ5ID0gKG9iaikgPT4ge1xuICAgIHRhYmxlQ3JlYXRlKG9iai5lbXBsb3llZSk7XG4gICAgLy8gZmlsdGVyIHNraWxsIGJ1dHRvbiBzY3JpcHRcbiAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbElkID0gb2JqZWxlbS5za2lsbC5zcGxpdChcIiBcIikuam9pbihcIlwiKTtcbiAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbjwvZGl2PmA7XG4gICAgfSk7XG4gICAgLy9maWxsIGRlcGFydG1lbnQgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgb2JqLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBkZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX1cIj4ke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9PC9vcHRpb24+YDtcbiAgICB9KTtcbiAgICAvLyBmaWxsIHJvbGUgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgb2JqLnJvbGUuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICByb2xlRW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5yb2xlfVwiPiR7b2JqZWxlbS5yb2xlfTwvb3B0aW9uPmA7XG4gICAgfSk7XG4gICAgLy9maWxsIHNraWxsIGluIHNraWxsIHNlbGVjdGlvbiBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+Y2hvb3NlIHNraWxsPC9vcHRpb24+YDtcbiAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiBjbGFzcz1cInNraWxsLW9wdGlvbnNcIiBpZD1cIiR7b2JqZWxlbS5za2lsbH1cIiB2YWx1ZT1cIiR7b2JqZWxlbS5za2lsbH1cIj4ke29iamVsZW0uc2tpbGx9PC9vcHRpb24+YDtcbiAgICB9KTtcbn07XG4vL2ZldGNoaW5nIGRhdGEgd2hvbGUgZGF0YSBmcm9tIGZpcmViYXNlXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGEgPSBmdW5jdGlvbiAoZmlsbGVudHJ5KSB7XG4gICAgZmV0Y2goYXBpICsgXCIvLmpzb25cIilcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy8gZmlyZWJhc2VEYXRhID0gZGF0YTtcbiAgICAgICAgZmlyZWJhc2VEYXRhID0gc3RydWN0dXJlZENsb25lKGRhdGEpO1xuICAgICAgICBkYXRhLmVtcGxveWVlID0gZGF0YS5lbXBsb3llZS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgIG9yaWdpbmFsRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgICAgICAgYWN0dWFsRGF0YSA9IGRhdGE7XG4gICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgc29ydEZ1bigpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xufTtcbmZldGNoRGF0YShmaWxsZW50cnkpO1xudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRhYmxlQ2xpY2spO1xuLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbmRhdGFWaWV3Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9jbG9zZSBkYXRhLWRlbC1tb2RhbFxuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9BZGQgZW1wbG95ZWUgZnVuY3Rpb25cbmFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZGF0YUVudHJ5U3VibWl0LnZhbHVlID0gXCJBZGRcIjtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn0pO1xuZGF0YUVudHJ5Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkYXRhRW50cnlGb3JtLnJlc2V0KCk7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL2ZpbHRlckFuZFNlYXJjaCBmdW5jdGlvbmFsaXR5XG5leHBvcnQgbGV0IEZpbHRlckFyciA9IFtdO1xuZXhwb3J0IGNvbnN0IGZpbHRlclRhYmxlID0gKCkgPT4ge1xuICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnRcIik7XG4gICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbTtcbiAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICBpZiAodHJpYWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGVsZW1lbnQuZGF0YXNldC5za2lsbE51bTtcbiAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgRmlsdGVyQXJyID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0uZnVsbE5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNodmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrZWRGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgfVxuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKEZpbHRlckFycik7XG59O1xuY29uc3QgY2hhbmdlU2tpbGxTdGF0ZSA9IChza2lsbElkKSA9PiB7XG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgdGVtcC5jbGljaygpO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuc2tpbGxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSAmJlxuICAgICAgICB0YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXQuZGF0YXNldC5za2lsbElkO1xuICAgICAgICBjaGFuZ2VTa2lsbFN0YXRlKGRhdGFzZXQpO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IFwiSU5QVVRcIiB8fCB0YXJnZXQudGFnTmFtZSA9PT0gXCJMQUJFTFwiKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldENsb3Nlc3QgPSB0YXJnZXQuY2xvc2VzdChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldENsb3Nlc3QuZGF0YXNldC5za2lsbElkO1xuICAgICAgICBjaGFuZ2VTa2lsbFN0YXRlKGRhdGFzZXQpO1xuICAgIH1cbn0pO1xuc29ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc29ydEZ1bik7XG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZpbHRlclRhYmxlKTtcbi8vc2V0dGluZyBsaW1pdCB0byBkYXRlIG9mIGJpcnRoXG5sZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvSlNPTigpLnNsaWNlKDAsIDEwKTtcbmNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iXCIpO1xuZGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcIm1heFwiLCB0b2RheSk7XG4iLCJpbXBvcnQgeyBvdmVybGF5LCBkYXRhVmlld01vZGFsLCBkYXRhRGVsTW9kYWwsIGRhdGFFbnRyeU1vZGFsLCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdXBkYXRlRW1wIH0gZnJvbSBcIi4vdXBkYXRlRW1wbG95ZWVcIjtcbmltcG9ydCB7IHZpZXdNb2RhbCB9IGZyb20gXCIuL3ZpZXdFbXBsb3llZVwiO1xuaW1wb3J0IHsgZGVsRW1wIH0gZnJvbSBcIi4vZGVsZXRlRW1wbG95ZWVcIjtcbmltcG9ydCB7IGRhdGFFbnRyeVN1Ym1pdCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuZXhwb3J0IGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlldy1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB2aWV3TW9kYWwoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsLWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGVsRW1wKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbiAgICAvLy8gdXBkYXRlIHVzZXIgZGV0YWlscyBmdW5jdGlvbmFsaXR5XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlTdWJtaXQudmFsdWUgPSBcIlVwZGF0ZVwiO1xuICAgICAgICB1cGRhdGVFbXAoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxufTtcbiIsImV4cG9ydCB7fTtcbiIsImltcG9ydCB7IGFjdHVhbERhdGEsIG9yaWdpbmFsRGF0YSwgY2hhbmdlU2tpbGxOYW1lLCBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbi8vIGV4cG9ydCBsZXQgc2tpbGxOYW1lOiBzdHJpbmdbXTtcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIik7XG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIik7XG5jb25zdCBkYXRlT2ZKb2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pcIik7XG5jb25zdCBkYXRhT2ZCaXJ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iXCIpO1xuY29uc3QgZGVwSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmNvbnN0IHJvbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbmNvbnN0IGxvY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xubGV0IHVwZGF0ZUluZGV4ID0gMDtcbmxldCBpZE9mRW1wID0gMTAwMTtcbmV4cG9ydCBjb25zdCB1cGRhdGVFbXAgPSAoaWQpID0+IHtcbiAgICBpZE9mRW1wID0gaWQ7XG4gICAgbGV0IGN1cnJPYmo7XG4gICAgbGV0IGRlcGFydG1lbnQ7XG4gICAgYWN0dWFsRGF0YS5lbXBsb3llZS5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgaWYgKG9iai5pZCA9PSBpZCkge1xuICAgICAgICAgICAgY3Vyck9iaiA9IG9iajtcbiAgICAgICAgICAgIGFjdHVhbERhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY3Vyck9iai5kZXBhcnRtZW50ID09IG9iai5kZXBhcnRtZW50SUQpXG4gICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnQgPSBvYmouZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5hbWUudmFsdWUgPSBgJHtjdXJyT2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbC52YWx1ZSA9IGAke2N1cnJPYmouZW1haWx9YDtcbiAgICAgICAgICAgIGRhdGVPZkpvaW4udmFsdWUgPSBgJHtjdXJyT2JqLmRhdGVPZkJpcnRofWA7XG4gICAgICAgICAgICBkYXRhT2ZCaXJ0aC52YWx1ZSA9IGAke2N1cnJPYmouZGF0ZU9mSm9pbn1gO1xuICAgICAgICAgICAgbG9jSW5wdXQudmFsdWUgPSBgJHtjdXJyT2JqLndvcmtMb2NhdGlvbn1gO1xuICAgICAgICAgICAgcm9sZUlucHV0LnZhbHVlID0gYCR7Y3Vyck9iai5yb2xlfWA7XG4gICAgICAgICAgICBkZXBJbnB1dC52YWx1ZSA9IGAke2RlcGFydG1lbnR9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBza2lsbE5hbWVDb3B5ID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoKGFjYywgZWxlbSkgPT4ge1xuICAgICAgICBpZiAoY3Vyck9iai5za2lsbHMuaW5jbHVkZXMoZWxlbS5za2lsbElEKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgY2hhbmdlU2tpbGxOYW1lKHNraWxsTmFtZUNvcHkpO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2tpbGxOYW1lLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBkYXRhLXJlbS1pZD0ke2VsZW19IGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2VsZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG4gICAgb3JpZ2luYWxEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChlbGVtLmlkID09IGN1cnJPYmouaWQpXG4gICAgICAgICAgICB1cGRhdGVJbmRleCA9IGluZGV4O1xuICAgIH0pO1xufTtcbmV4cG9ydCB7IHVwZGF0ZUluZGV4LCBpZE9mRW1wIH07XG4iLCJpbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5jb25zdCBuYW1lVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVZpZXdcIik7XG5jb25zdCBlbWFpbFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsVmlld1wiKTtcbmNvbnN0IGVtcElkVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1wSWRWaWV3XCIpO1xuY29uc3QgZG9qVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qVmlld1wiKTtcbmNvbnN0IGRvYlZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlZpZXdcIik7XG5jb25zdCBkZXBWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBWaWV3XCIpO1xuY29uc3Qgcm9sZVZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVWaWV3XCIpO1xuY29uc3QgbG9jVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jVmlld1wiKTtcbmNvbnN0IGltZ1ZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltZ1wiKTtcbmNvbnN0IHZpZXdTa2lsbEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmlldy1za2lsbC1ib3hcIik7XG5leHBvcnQgY29uc3Qgdmlld01vZGFsID0gKGlkKSA9PiB7XG4gICAgbGV0IHZpZXdPYmo7XG4gICAgbGV0IGRlcGFydG1lbnQ7XG4gICAgYWN0dWFsRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGlmIChlbGVtLmlkID09IGlkKSB7XG4gICAgICAgICAgICB2aWV3T2JqID0gZWxlbTtcbiAgICAgICAgICAgIGFjdHVhbERhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmlld09iai5kZXBhcnRtZW50ID09IG9iai5kZXBhcnRtZW50SUQpXG4gICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnQgPSBvYmouZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5hbWVWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZnVsbE5hbWV9YDtcbiAgICAgICAgICAgIGVtYWlsVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmVtYWlsfWA7XG4gICAgICAgICAgICBlbXBJZFZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5pZH1gO1xuICAgICAgICAgICAgZG9qVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmRhdGVPZkpvaW59YDtcbiAgICAgICAgICAgIGRvYlZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5kYXRlT2ZCaXJ0aH1gO1xuICAgICAgICAgICAgZGVwVmlldy5pbm5lckhUTUwgPSBgJHtkZXBhcnRtZW50fWA7XG4gICAgICAgICAgICByb2xlVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLnJvbGV9YDtcbiAgICAgICAgICAgIGxvY1ZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai53b3JrTG9jYXRpb259YDtcbiAgICAgICAgICAgIC8vIGlmICh2aWV3T2JqLmltYWdlU3JjKSB7XG4gICAgICAgICAgICAvLyAgIGltZ1ZpZXcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke3ZpZXdPYmouaW1hZ2VTcmN9YCk7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGxvYWRpbmcgaW1hZ2VcIik7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBpbWdWaWV3LnNyYyA9IGAke3ZpZXdPYmouaW1hZ2VTcmN9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBlYWNoU2tpbGwgPSBhY3R1YWxEYXRhLnNraWxsLnJlZHVjZSgoYWNjLCBlbGVtKSA9PiB7XG4gICAgICAgIGlmICh2aWV3T2JqLnNraWxscy5pbmNsdWRlcyhlbGVtLnNraWxsSUQpKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2NdO1xuICAgIH0sIFtdKTtcbiAgICB2aWV3U2tpbGxCb3guaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlYWNoU2tpbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICB2aWV3U2tpbGxCb3guaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVhY2gtc2tpbGwtdmlld1wiPiR7ZWxlbX08L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0LnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL1NvcnRGdW4udHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29uc3RhbnRzLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3R5cGUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYWRkVXBkYXRlRW1wbG95ZWUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZGVsZXRlRW1wbG95ZWUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdXBkYXRlRW1wbG95ZWUudHNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy92aWV3RW1wbG95ZWUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=