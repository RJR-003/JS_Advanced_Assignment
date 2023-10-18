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
const putData = (index, id, name, email, doj, dob, dep, role, loc, skill, img, errMsg, succMsg) => {
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
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.toast)(false, succMsg);
        return res.json();
    })
        .then((data) => {
        const skillList = document.querySelector(".skill-list");
        skillList.innerHTML = "";
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.fetchData)(_script__WEBPACK_IMPORTED_MODULE_0__.fillentry);
        console.log(data, "data");
    })
        .catch((err) => {
        console.log(err, "error while performing the action");
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.toast)(true, errMsg);
    });
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
            let errMsg = "Error while adding employee";
            let succMsg = "Succesfully added employee";
            putData(entryIndex, employeeID, nameVal, emailVal, dateOfJoinVal, dateOfBirthVal, depInputVal, roleInputVal, locInputVal, skillInputVal, base64String, errMsg, succMsg);
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
            let errMsg = "Error while updating employee";
            let succMsg = "Succesfully updated employee";
            putData(_updateEmployee__WEBPACK_IMPORTED_MODULE_1__.updateIndex, employeeID, nameVal, emailVal, dateOfJoinVal, dateOfBirthVal, depInputVal, roleInputVal, locInputVal, skillInputVal, base64String, errMsg, succMsg);
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
/* harmony export */   materialSymbolsOutlined: () => (/* binding */ materialSymbolsOutlined),
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
const materialSymbolsOutlined = document.querySelector(".material-symbols-outlined ");


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
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.toast)(false, "Succesfully deleted the employee");
        return res.json();
    })
        .then((data) => {
        // tableCreate(data);
        _constants__WEBPACK_IMPORTED_MODULE_1__.skillList.innerHTML = "";
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.fetchData)(_script__WEBPACK_IMPORTED_MODULE_0__.fillentry);
        console.log(data, "data");
    })
        .catch((err) => {
        console.log(err, "error while deleting employee");
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.toast)(true, "Error while deleting employee");
    });
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
/* harmony export */   tableCreate: () => (/* binding */ tableCreate),
/* harmony export */   toast: () => (/* binding */ toast)
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
const toastMsg = document.querySelector(".toast-msg");
const toastDiv = document.querySelector(".toast");
//general table rendering function
///////////////////////////////////////////////
const toast = (type, msg) => {
    if (type) {
        toastMsg.innerHTML = msg;
        _constants__WEBPACK_IMPORTED_MODULE_1__.materialSymbolsOutlined.innerHTML = "error";
        toastDiv.style.background =
            "linear-gradient(111.4deg, rgb(246, 4, 26) 0.4%, rgb(251, 139, 34) 100.2%)";
        toastDiv.style.transform = "translateY(170%)";
    }
    else {
        toastMsg.innerHTML = msg;
        toastDiv.style.background =
            "linear-gradient(179.1deg, rgb(43, 170, 96) 2.3%, rgb(129, 204, 104) 98.3%)";
        _constants__WEBPACK_IMPORTED_MODULE_1__.materialSymbolsOutlined.innerHTML = "done";
        toastDiv.style.transform = "translateY(170%)";
    }
    setTimeout(() => {
        toastDiv.style.transform = "translateY(0)";
    }, 3000);
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZDtBQUNlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNPO0FBQ1Asc0JBQXNCLCtDQUFVO0FBQ2hDLFFBQVEsOENBQVM7QUFDakIsc0JBQXNCLDhDQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxpREFBUztBQUNiLElBQUksb0RBQVc7QUFDZjtBQUNBLFFBQVEsa0RBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFVO0FBQ2xCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hDQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDb0g7QUFDNUQ7QUFDbkI7QUFDeVU7QUFDOVc7QUFDQTtBQUNBLFVBQVUsMkNBQUc7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDhDQUFLO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBUyxDQUFDLDhDQUFTO0FBQzNCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDhDQUFLO0FBQ2IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLCtDQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsK0NBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRDQUFJO0FBQ3hCLHFCQUFxQiw2Q0FBSztBQUMxQiwwQkFBMEIsa0RBQVU7QUFDcEMsMkJBQTJCLG1EQUFXO0FBQ3RDLG9DQUFvQyxnREFBUTtBQUM1Qyx5QkFBeUIsaURBQVM7QUFDbEMsd0JBQXdCLGdEQUFRO0FBQ2hDLHlDQUF5QyxpREFBWTtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBEQUFrQjtBQUMxQjtBQUNBO0FBQ0EsUUFBUSwwREFBa0I7QUFDMUI7QUFDQTtBQUNBLFFBQVEseURBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxRQUFRLHlEQUFpQjtBQUN6QjtBQUNBO0FBQ0EsUUFBUSx5REFBaUI7QUFDekI7QUFDQTtBQUNBLFFBQVEseURBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxRQUFRLDBEQUFrQjtBQUMxQjtBQUNBO0FBQ0EsUUFBUSwwREFBa0I7QUFDMUI7QUFDQTtBQUNBLFFBQVEseURBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxRQUFRLHlEQUFpQjtBQUN6QjtBQUNBO0FBQ0EsUUFBUSx5REFBaUI7QUFDekI7QUFDQTtBQUNBLFFBQVEseURBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxRQUFRLDJEQUFtQjtBQUMzQjtBQUNBO0FBQ0EsUUFBUSwyREFBbUI7QUFDM0IsU0FBUyw2Q0FBSztBQUNkLFFBQVEsMkRBQW1CO0FBQzNCO0FBQ0E7QUFDQSxRQUFRLDJEQUFtQjtBQUMzQixRQUFRLHVEQUFlO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsK0NBQVU7QUFDMUIsZ0JBQWdCLCtDQUFVO0FBQzFCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpREFBWTtBQUM1QjtBQUNBLDJCQUEyQixpREFBWSxVQUFVLGlEQUFZO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkscURBQWE7QUFDekIsWUFBWSxtREFBVztBQUN2QjtBQUNBO0FBQ0EsWUFBWSwyREFBa0I7QUFDOUIsWUFBWSwrQ0FBTztBQUNuQixZQUFZLHNEQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHVEQUFlO0FBQzVCO0FBQ0EsNkJBQTZCLG9EQUFPO0FBQ3BDLDJCQUEyQixpREFBWSxVQUFVLHdEQUFXO0FBQzVEO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0I7QUFDQSx3QkFBd0Isd0RBQVc7QUFDbkMsWUFBWSwrQ0FBTztBQUNuQixZQUFZLHNEQUFjO0FBQzFCO0FBQ0E7QUFDQSxDQUFDO0FBQ0QscURBQWE7QUFDYjtBQUNBO0FBQ0EsaURBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxRQUFRLDJEQUFrQixDQUFDLDhDQUFTO0FBQ3BDO0FBQ0E7QUFDQSxpREFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxpQkFBaUI7QUFDMUQsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGlEQUFZO0FBQ3JCLFFBQVEsaURBQVk7QUFDcEIsUUFBUSxtREFBVztBQUNuQixzQ0FBc0MsVUFBVTtBQUNoRCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQVc7QUFDWDtBQUNBO0FBQ0EsK0JBQStCLGlEQUFZO0FBQzNDLFFBQVEsMkRBQWtCO0FBQzFCLFFBQVEsbURBQVc7QUFDbkIsUUFBUSxpREFBWTtBQUNwQixZQUFZLG1EQUFXO0FBQ3ZCLDhCQUE4QixLQUFLO0FBQ25DLFlBQVk7QUFDWjtBQUNBLFNBQVM7QUFDVDtBQUNBLElBQUksa0RBQVU7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pRTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDK0Q7QUFDRjtBQUNwRTtBQUNBO0FBQ0EsVUFBVSwyQ0FBRztBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDhDQUFLO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsaURBQVM7QUFDakIsUUFBUSxrREFBUyxDQUFDLDhDQUFTO0FBQzNCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDhDQUFLO0FBQ2IsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsdUJBQXVCLE9BQU8saURBQVksa0JBQWtCO0FBQzVELFlBQVksaURBQVk7QUFDeEI7QUFDQSxpQkFBaUIsaURBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlEQUFZO0FBQ2hDLFFBQVEsK0NBQU87QUFDZixRQUFRLG9EQUFZO0FBQ3BCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUNBO0FBQ21EO0FBQ3lCO0FBQ3JFO0FBQ1AsZ0JBQWdCLHVEQUFlO0FBQy9CO0FBQ0EsSUFBSSxpREFBUztBQUNiLElBQUksK0NBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlEQUFTLDREQUE0RCxRQUFRLG9CQUFvQixTQUFTO0FBQ3RILHNDQUFzQyxRQUFRO0FBQzlDLHNCQUFzQixRQUFRLEtBQUssY0FBYztBQUNqRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxvREFBVztBQUNmO0FBQ0EsdURBQWU7QUFDZix5REFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCc0M7QUFDK1A7QUFDbFI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLFFBQVEsK0RBQXVCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUF1QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBLFFBQVEsaURBQVM7QUFDakI7QUFDQSxjQUFjLFdBQVc7QUFDekIsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxjQUFjO0FBQzVCLGNBQWMsSUFBSTtBQUNsQjtBQUNBLG9DQUFvQyxXQUFXLHFCQUFxQixZQUFZO0FBQ2hGO0FBQ0EsMERBQTBELFdBQVcscUJBQXFCLFlBQVk7QUFDdEc7QUFDQSx5REFBeUQsV0FBVyxxQkFBcUIsWUFBWTtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlEQUFTLDREQUE0RCxRQUFRLG9CQUFvQixTQUFTO0FBQ2xILGtDQUFrQyxRQUFRO0FBQzFDLGtCQUFrQixRQUFRLEtBQUssY0FBYztBQUM3QztBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksdURBQWU7QUFDbkI7QUFDQSxRQUFRLHVEQUFlLGlDQUFpQyx1QkFBdUIsSUFBSSx1QkFBdUI7QUFDMUcsS0FBSztBQUNMO0FBQ0EsSUFBSSxpREFBUztBQUNiO0FBQ0EsUUFBUSxpREFBUyxpQ0FBaUMsYUFBYSxJQUFJLGFBQWE7QUFDaEYsS0FBSztBQUNMO0FBQ0EsSUFBSSx1REFBZTtBQUNuQjtBQUNBLFFBQVEsdURBQWUsb0RBQW9ELGNBQWMsV0FBVyxjQUFjLElBQUksY0FBYztBQUNwSSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ087QUFDUCxVQUFVLDJDQUFHO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaURBQU87QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkNBQUssMkJBQTJCLGdFQUFnQjtBQUNoRDtBQUNBLHFEQUFhO0FBQ2IsSUFBSSwrQ0FBTztBQUNYLElBQUkscURBQWE7QUFDakIsQ0FBQztBQUNEO0FBQ0EsdURBQWU7QUFDZixJQUFJLCtDQUFPO0FBQ1gsSUFBSSxvREFBWTtBQUNoQixDQUFDO0FBQ0Q7QUFDQSx5REFBaUI7QUFDakIsSUFBSSxxREFBYTtBQUNqQjtBQUNBLElBQUksdURBQWU7QUFDbkIsSUFBSSwrQ0FBTztBQUNYLElBQUksc0RBQWM7QUFDbEIsQ0FBQztBQUNELHNEQUFjO0FBQ2QsSUFBSSxxREFBYTtBQUNqQixJQUFJLCtDQUFPO0FBQ1gsSUFBSSxzREFBYztBQUNsQixDQUFDO0FBQ0Q7QUFDTztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsd0JBQXdCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHdCQUF3QixpREFBUztBQUNqQztBQUNBLFFBQVEsaURBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaURBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsUUFBUTtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxpREFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0RBQVUsMkJBQTJCLDZDQUFPO0FBQzVDLGlEQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuTG9GO0FBQ3ZDO0FBQ0Y7QUFDRDtBQUNJO0FBQ3ZDO0FBQ1A7QUFDQTtBQUNBLFFBQVEsK0NBQU87QUFDZixRQUFRLHFEQUFhO0FBQ3JCLFFBQVEsd0RBQVM7QUFDakI7QUFDQTtBQUNBLFFBQVEsK0NBQU87QUFDZixRQUFRLG9EQUFZO0FBQ3BCLFFBQVEsdURBQU07QUFDZDtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtDQUFPO0FBQ2YsUUFBUSxzREFBYztBQUN0QixRQUFRLHVEQUFlO0FBQ3ZCLFFBQVEsMERBQVM7QUFDakI7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEJVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBc0U7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBVTtBQUNkO0FBQ0E7QUFDQSxZQUFZLCtDQUFVO0FBQ3RCO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsNEJBQTRCLGlCQUFpQjtBQUM3Qyw2QkFBNkIsY0FBYztBQUMzQyxrQ0FBa0Msb0JBQW9CO0FBQ3RELG1DQUFtQyxtQkFBbUI7QUFDdEQsZ0NBQWdDLHFCQUFxQjtBQUNyRCxpQ0FBaUMsYUFBYTtBQUM5QyxnQ0FBZ0MsV0FBVztBQUMzQztBQUNBLEtBQUs7QUFDTCx3QkFBd0IsK0NBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJLHdEQUFlO0FBQ25CO0FBQ0EsSUFBSSw4Q0FBUztBQUNiO0FBQ0EsMkJBQTJCLE1BQU07QUFDakMsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxpREFBWTtBQUNoQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ2dDOzs7Ozs7Ozs7Ozs7Ozs7O0FDckRNO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsSUFBSSwrQ0FBVTtBQUNkO0FBQ0E7QUFDQSxZQUFZLCtDQUFVO0FBQ3RCO0FBQ0E7QUFDQSxhQUFhO0FBQ2Isb0NBQW9DLGlCQUFpQjtBQUNyRCxxQ0FBcUMsY0FBYztBQUNuRCxxQ0FBcUMsV0FBVztBQUNoRCxtQ0FBbUMsbUJBQW1CO0FBQ3RELG1DQUFtQyxvQkFBb0I7QUFDdkQsbUNBQW1DLFdBQVc7QUFDOUMsb0NBQW9DLGFBQWE7QUFDakQsbUNBQW1DLHFCQUFxQjtBQUN4RDtBQUNBLGdEQUFnRCxpQkFBaUI7QUFDakUsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxnQ0FBZ0MsaUJBQWlCO0FBQ2pEO0FBQ0EsS0FBSztBQUNMLG9CQUFvQiwrQ0FBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDbERBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL1NvcnRGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2FkZFVwZGF0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2RlbGV0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9maWx0ZXJBbmRTZWFyY2hGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3NjcmlwdC50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3R5cGUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3VwZGF0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy92aWV3RW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFjdHVhbERhdGEsIHRhYmxlQ3JlYXRlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBGaWx0ZXJBcnIgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IHRhYmxlQm9keSwgc29ydEJ1dHRvbiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xubGV0IGRpckZsYWcgPSAxO1xuLy8gc29ydCBmdW5jdGlvbmFsaXR5XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IHNvcnRGdW4gPSAoKSA9PiB7XG4gICAgbGV0IGFycmF5VG9Tb3J0ID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoRmlsdGVyQXJyLmxlbmd0aCAhPT0gMClcbiAgICAgICAgYXJyYXlUb1NvcnQgPSBGaWx0ZXJBcnI7XG4gICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBuYW1lMSA9IGEuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbmFtZTIgPSBiLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgaWYgKG5hbWUxID4gbmFtZTIpIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb24gPSAxICogZGlyRmxhZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lMSA8IG5hbWUyKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uID0gLTEgKiBkaXJGbGFnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wYXJpc29uO1xuICAgIH0pO1xuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKGFyclRvUmVuZGVyKTtcbiAgICBpZiAoZGlyRmxhZyA9PSAxKSB7XG4gICAgICAgIHNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL2Rvd24tYXJyb3cuc3ZnXCI7XG4gICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy91cC1hcnJvdy5zdmdcIjtcbiAgICB9XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBhY3R1YWxEYXRhLCBmZXRjaERhdGEsIGZpbGxlbnRyeSwgb3JpZ2luYWxEYXRhLCBza2lsbE5hbWVBcnIsIGNoYW5nZVNraWxsTmFtZUFyciwgdG9hc3QsIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyB1cGRhdGVJbmRleCwgaWRPZkVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGFwaSwgZGF0YUVudHJ5TW9kYWwsIG92ZXJsYXksIG5hbWUsIGVtYWlsLCBkYXRlT2ZKb2luLCBkYXRhT2ZCaXJ0aCwgZGVwSW5wdXQsIHJvbGVJbnB1dCwgbG9jSW5wdXQsIHNraWxsSW5wdXQsIEZ1bGx0YWJsZSwgZm9ybVNraWxsLCBhZGRlZFNraWxscywgZGF0YUVudHJ5TmFtZUFsZXJ0LCBkYXRhRW50cnlEb2pBbGVydCwgZGF0YUVudHJ5RG9iQWxlcnQsIGRhdGFFbnRyeVJvbGVBbGVydCwgZGF0YUVudHJ5RGVwQWxlcnQsIGRhdGFFbnRyeUxvY0FsZXJ0LCBkYXRhRW50cnlTa2lsbEFsZXJ0LCBkYXRhRW50cnlTdWJtaXQsIGRhdGFFbnRyeUZvcm0sIGRhdGFFbnRyeUVtYWlsQWxlcnQsIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG4vL2Z1bmN0aW9uIHRvIHB1dCBkYXRhIHRvIGZpcmViYXNlXG5jb25zdCBwdXREYXRhID0gKGluZGV4LCBpZCwgbmFtZSwgZW1haWwsIGRvaiwgZG9iLCBkZXAsIHJvbGUsIGxvYywgc2tpbGwsIGltZywgZXJyTXNnLCBzdWNjTXNnKSA9PiB7XG4gICAgZmV0Y2goYXBpICsgXCIvZW1wbG95ZWUvXCIgKyBpbmRleCArIFwiLmpzb25cIiwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGRhdGVPZkJpcnRoOiBkb2IsXG4gICAgICAgICAgICBkYXRlT2ZKb2luOiBkb2osXG4gICAgICAgICAgICBkZXBhcnRtZW50OiBkZXAsXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICAgICAgc2tpbGxzOiBza2lsbCxcbiAgICAgICAgICAgIHdvcmtMb2NhdGlvbjogbG9jLFxuICAgICAgICAgICAgZnVsbE5hbWU6IG5hbWUsXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBpbWFnZVNyYzogaW1nLFxuICAgICAgICB9KSxcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCJzdWNjZXNzZnVsbHkgYWRkZWQhISFcIik7XG4gICAgICAgIHRvYXN0KGZhbHNlLCBzdWNjTXNnKTtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEsIFwiZGF0YVwiKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3Igd2hpbGUgcGVyZm9ybWluZyB0aGUgYWN0aW9uXCIpO1xuICAgICAgICB0b2FzdCh0cnVlLCBlcnJNc2cpO1xuICAgIH0pO1xufTtcbi8vY29udmVydHMgc2tpbGxuYW1lIHRvIHNraWxsIGlkIGFycmF5XG5jb25zdCByZXR1cm5Ta2lsbEFyciA9IChhcnJPZk5hbWVzKSA9PiB7XG4gICAgYXJyT2ZOYW1lcyA9IGFyck9mTmFtZXMubWFwKChlbGVtKSA9PiBlbGVtLnRvTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IHNraWxsSURBcnIgPSBhY3R1YWxEYXRhLnNraWxsLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBlbGVtKSB7XG4gICAgICAgIGlmIChhcnJPZk5hbWVzLmluY2x1ZGVzKGVsZW0uc2tpbGwudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsSURdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIHNraWxsSURBcnI7XG59O1xuLy8gY29udmVydHMgZGVwYXJ0bWVudCBuYW1lIHRvIGRlcGFydG1lbnQgaWRcbmNvbnN0IHJldHVybkRlcElEID0gKGRlcE5hbWUpID0+IHtcbiAgICBkZXBOYW1lID0gZGVwTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGRlcElEID0gYWN0dWFsRGF0YS5kZXBhcnRtZW50LnJlZHVjZSgodmFsdWUsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGVsZW0uZGVwYXJ0bWVudE5hbWUudG9Mb3dlckNhc2UoKSA9PSBkZXBOYW1lKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGVsZW0uZGVwYXJ0bWVudElEO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm4gZGVwSUQ7XG59O1xuY29uc3QgcmVhZEZpbGVBc0Jhc2U2NCA9IChmaWxlKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBmaWxlIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmVzb2x2ZSgoX2EgPSBlLnRhcmdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0pO1xufTtcbi8vaGFuZGxpbmcgdGhlIHN1Ym1pdCBidXR0b24gY2xpY2tcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3QgaGFuZGxlU3VibWl0Q2xpY2sgPSAoZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBiYXNlNjRTdHJpbmc7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vdGFraW5nIGltYWdlIGZyb20gdXNlclxuICAgIGNvbnN0IGltZ0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtaW5wdXRcIik7XG4gICAgY29uc3QgaW1nRmlsZSA9IChfYSA9IGltZ0VsZW0uZmlsZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcbiAgICB0cnkge1xuICAgICAgICBiYXNlNjRTdHJpbmcgPSB5aWVsZCByZWFkRmlsZUFzQmFzZTY0KGltZ0ZpbGUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgZmV0Y2hpbmcgYmFzZTY0U3RyaW5nXCIpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lVmFsID0gbmFtZS52YWx1ZTtcbiAgICBjb25zdCBlbWFpbFZhbCA9IGVtYWlsLnZhbHVlO1xuICAgIGNvbnN0IGRhdGVPZkpvaW5WYWwgPSBkYXRlT2ZKb2luLnZhbHVlO1xuICAgIGNvbnN0IGRhdGVPZkJpcnRoVmFsID0gZGF0YU9mQmlydGgudmFsdWU7XG4gICAgY29uc3QgZGVwSW5wdXRWYWwgPSByZXR1cm5EZXBJRChkZXBJbnB1dC52YWx1ZSk7XG4gICAgY29uc3Qgcm9sZUlucHV0VmFsID0gcm9sZUlucHV0LnZhbHVlO1xuICAgIGNvbnN0IGxvY0lucHV0VmFsID0gbG9jSW5wdXQudmFsdWU7XG4gICAgY29uc3Qgc2tpbGxJbnB1dFZhbCA9IHJldHVyblNraWxsQXJyKHNraWxsTmFtZUFycik7XG4gICAgbGV0IGlzRXJyID0gZmFsc2U7XG4gICAgaWYgKG5hbWVWYWwubGVuZ3RoIDwgMikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeU5hbWVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeU5hbWVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFkYXRlT2ZKb2luVmFsKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RG9qQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEb2pBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFkYXRlT2ZCaXJ0aFZhbCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURvYkFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RG9iQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChyb2xlSW5wdXRWYWwgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5Um9sZUFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5Um9sZUFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIWRlcElucHV0VmFsKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RGVwQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEZXBBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKGxvY0lucHV0VmFsID09PSBcIm5vbmVcIikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeUxvY0FsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5TG9jQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghc2tpbGxJbnB1dFZhbC5sZW5ndGgpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlTa2lsbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5U2tpbGxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFlbWFpbC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgZGF0YUVudHJ5RW1haWxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeUVtYWlsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChkYXRhRW50cnlTdWJtaXQudmFsdWUgPT0gXCJBZGRcIikge1xuICAgICAgICBpZiAoIWlzRXJyKSB7XG4gICAgICAgICAgICBsZXQgZW50cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBpZiAoYWN0dWFsRGF0YS5lbXBsb3llZSkge1xuICAgICAgICAgICAgICAgIGFjdHVhbERhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gZW50cnlJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gZW50cnlJbmRleCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgZW1wbG95ZWVJRCA9IDEwMDE7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxEYXRhLmVtcGxveWVlKSB7XG4gICAgICAgICAgICAgICAgZW1wbG95ZWVJRCA9XG4gICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmlnaW5hbERhdGEuZW1wbG95ZWVbb3JpZ2luYWxEYXRhLmVtcGxveWVlLmxlbmd0aCAtIDFdLmlkKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVtcGxveWVlSUQgPSAxMDAxO1xuICAgICAgICAgICAgbGV0IGVyck1zZyA9IFwiRXJyb3Igd2hpbGUgYWRkaW5nIGVtcGxveWVlXCI7XG4gICAgICAgICAgICBsZXQgc3VjY01zZyA9IFwiU3VjY2VzZnVsbHkgYWRkZWQgZW1wbG95ZWVcIjtcbiAgICAgICAgICAgIHB1dERhdGEoZW50cnlJbmRleCwgZW1wbG95ZWVJRCwgbmFtZVZhbCwgZW1haWxWYWwsIGRhdGVPZkpvaW5WYWwsIGRhdGVPZkJpcnRoVmFsLCBkZXBJbnB1dFZhbCwgcm9sZUlucHV0VmFsLCBsb2NJbnB1dFZhbCwgc2tpbGxJbnB1dFZhbCwgYmFzZTY0U3RyaW5nLCBlcnJNc2csIHN1Y2NNc2cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZW1wbG95ZWVJRCwgXCJlbXBsb3llZSBpZCB0aGF0IGlzIGdvaW5nIGZvciB0aGUgbmV3IGRhdGFcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbnRyeUluZGV4LCBcImluZGV4IHRoYXQgdGhlIG5ldyBkYXRhIG9jY3VwaWVzXCIpO1xuICAgICAgICAgICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIC8vICAgc2tpbGxOYW1lQXJyID0gW107XG4gICAgICAgICAgICBsZXQgbnVsbEFyciA9IFtdO1xuICAgICAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKG51bGxBcnIpO1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIGluIGFkZGluZyBuZXcgZW1wbG95ZWVcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YUVudHJ5U3VibWl0LnZhbHVlID09IFwiVXBkYXRlXCIpIHtcbiAgICAgICAgaWYgKCFpc0Vycikge1xuICAgICAgICAgICAgbGV0IGVtcGxveWVlSUQgPSBpZE9mRW1wO1xuICAgICAgICAgICAgYmFzZTY0U3RyaW5nID0gb3JpZ2luYWxEYXRhLmVtcGxveWVlW3VwZGF0ZUluZGV4XS5pbWFnZVNyYztcbiAgICAgICAgICAgIGxldCBlcnJNc2cgPSBcIkVycm9yIHdoaWxlIHVwZGF0aW5nIGVtcGxveWVlXCI7XG4gICAgICAgICAgICBsZXQgc3VjY01zZyA9IFwiU3VjY2VzZnVsbHkgdXBkYXRlZCBlbXBsb3llZVwiO1xuICAgICAgICAgICAgcHV0RGF0YSh1cGRhdGVJbmRleCwgZW1wbG95ZWVJRCwgbmFtZVZhbCwgZW1haWxWYWwsIGRhdGVPZkpvaW5WYWwsIGRhdGVPZkJpcnRoVmFsLCBkZXBJbnB1dFZhbCwgcm9sZUlucHV0VmFsLCBsb2NJbnB1dFZhbCwgc2tpbGxJbnB1dFZhbCwgYmFzZTY0U3RyaW5nLCBlcnJNc2csIHN1Y2NNc2cpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZW1wbG95ZWVJRCwgXCJpZCB0aGF0IGlzIGdvaW5nIHRvIGJlIHVwZGF0ZWRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1cGRhdGVJbmRleCwgXCJpbmRleCB0aGF0IGlzIGdvaW5nIHRvIGJlIHVwZGF0ZWRcIik7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZGF0YUVudHJ5Rm9ybS5vbnN1Ym1pdCA9IGhhbmRsZVN1Ym1pdENsaWNrO1xuLy9kYXRhLWVudHJ5LWZvcm0gc2tpbGwgc2VjdGlvbiBmdW5jdGlvbmFsaXRpZXNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5GdWxsdGFibGUub25jbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgLy8gc2tpbGxOYW1lQXJyID0gc2tpbGxOYW1lO1xuICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoc2tpbGxOYW1lKTtcbiAgICB9XG59O1xuZm9ybVNraWxsLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIC8vIGZvciBjaHJvbWVcbiAgICAvLyAgIGlmICh0YXJnZXQuaWQgPT0gXCJza2lsbFwiICYmICFza2lsbE5hbWVBcnIuaW5jbHVkZXMoc2tpbGxJbnB1dC52YWx1ZSkpIHtcbiAgICAvLyAgICAgaWYgKHNraWxsSW5wdXQudmFsdWUgIT0gXCJub25lXCIpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhza2lsbElucHV0LnZhbHVlLCBcInNraWxsSW5wdXQudmFsdWVcIik7XG4gICAgLy8gICAgICAgc2tpbGxOYW1lQXJyLnB1c2goc2tpbGxJbnB1dC52YWx1ZSk7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgY2hyb21lIHN0eWxlXCIpO1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKHNraWxsTmFtZUFycik7XG4gICAgLy8gICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAvLyAgICAgICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke3NraWxsSW5wdXQudmFsdWV9XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgLy8gICAgICAgICAgICAgICAke3NraWxsSW5wdXQudmFsdWV9XG4gICAgLy8gICAgICAgICAgIDwvZGl2PmA7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyAgIGZvciBtb3J6aWxsYVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtb3B0aW9uc1wiKSAmJlxuICAgICAgICAhc2tpbGxOYW1lQXJyLmluY2x1ZGVzKHRhcmdldC5pZCkpIHtcbiAgICAgICAgc2tpbGxOYW1lQXJyLnB1c2godGFyZ2V0LmlkKTtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke3RhcmdldC5pZH1cIiBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAgICAgICAgICR7dGFyZ2V0LmlkfVxuICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIgZXJyb3Igd2hpbGUgdXBkYXRpbmdcIik7XG4gICAgfVxufTtcbmFkZGVkU2tpbGxzLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuZGF0YXNldC5yZW1JZCkge1xuICAgICAgICBsZXQgc2tpbGxOYW1lQXJyQ29weSA9IHNraWxsTmFtZUFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0gIT0gdGFyZ2V0LmRhdGFzZXQucmVtSWQpO1xuICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoc2tpbGxOYW1lQXJyQ29weSk7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHNraWxsTmFtZUFyci5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke2VsZW19XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgICAgICAgJHtlbGVtfVxuICAgICAgPC9kaXY+YDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNraWxsSW5wdXQudmFsdWUgPSBcIm5vbmVcIjtcbn07XG4iLCJleHBvcnQgY29uc3QgYXBpID0gXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiO1xuZXhwb3J0IGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5leHBvcnQgY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5leHBvcnQgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuZXhwb3J0IGNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWlucHV0LWJveFwiKTtcbmV4cG9ydCBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG5leHBvcnQgY29uc3QgZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbmV4cG9ydCBjb25zdCBkZXBhcnRtZW50RW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmV4cG9ydCBjb25zdCByb2xlRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5leHBvcnQgY29uc3Qgc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhVmlld0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctY2xvc2VcIik7XG5leHBvcnQgY29uc3QgY2FuY2VsRGVsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtZGVsLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBhZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1jbG9zZVwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmV4cG9ydCBjb25zdCB0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5leHBvcnQgY29uc3QgY2xlYXJGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsZWFyLWZpbHRlci1idXR0b25cIik7XG5leHBvcnQgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbmV4cG9ydCBjb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIik7XG5leHBvcnQgY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFPZkJpcnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5leHBvcnQgY29uc3QgZGVwSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmV4cG9ydCBjb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5leHBvcnQgY29uc3QgbG9jSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1wiKTtcbmV4cG9ydCBjb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmV4cG9ydCBjb25zdCBGdWxsdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlXCIpO1xuZXhwb3J0IGNvbnN0IGZvcm1Ta2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1za2lsbFwiKTtcbmV4cG9ydCBjb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeU5hbWVBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1uYW1lLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeURvakFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRvai1hbGVydCBcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5RG9iQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZG9iLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeVJvbGVBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1yb2xlLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeURlcEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRlcC1hbGVydFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlMb2NBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1sb2MtYWxlcnRcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5U2tpbGxBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1za2lsbC1hbGVydFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlTdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGEtZW50cnktc3VibWl0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZm9ybVwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlFbWFpbEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWVtYWlsLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IG1hdGVyaWFsU3ltYm9sc091dGxpbmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIFwiKTtcbiIsImltcG9ydCB7IGZldGNoRGF0YSwgZmlsbGVudHJ5LCBmaXJlYmFzZURhdGEsIHRvYXN0LCB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgYXBpLCBza2lsbExpc3QsIG92ZXJsYXksIGRhdGFEZWxNb2RhbCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS1idXR0b25cIik7XG5jb25zdCBkZWxEYXRhID0gKGluZGV4KSA9PiB7XG4gICAgZmV0Y2goYXBpICsgXCIvZW1wbG95ZWUvXCIgKyBpbmRleCArIFwiLmpzb25cIiwge1xuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMsIFwic3VjY2Vzc2Z1bGx5IGRlbGV0ZWQhISFcIik7XG4gICAgICAgIHRvYXN0KGZhbHNlLCBcIlN1Y2Nlc2Z1bGx5IGRlbGV0ZWQgdGhlIGVtcGxveWVlXCIpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvLyB0YWJsZUNyZWF0ZShkYXRhKTtcbiAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGZldGNoRGF0YShmaWxsZW50cnkpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCBcImRhdGFcIik7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCBcImVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIpO1xuICAgICAgICB0b2FzdCh0cnVlLCBcIkVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBkZWxFbXAgPSAoaWQpID0+IHtcbiAgICBsZXQgZGVsSW5kZXg7XG4gICAgLy8gZmlyZWJhc2VEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgLy8gICBpZiAoZWxlbS5pZCA9PSBpZCkgZGVsSW5kZXggPSBpbmRleDtcbiAgICAvLyB9KTtcbiAgICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IGZpcmViYXNlRGF0YS5lbXBsb3llZS5sZW5ndGg7IHN0ZXArKykge1xuICAgICAgICBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdID09IG51bGwpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgZWxzZSBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdLmlkID09IGlkKVxuICAgICAgICAgICAgZGVsSW5kZXggPSBzdGVwO1xuICAgIH1cbiAgICBjb25maXJtQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRlbERhdGEoZGVsSW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhkZWxJbmRleCwgXCJpbmRleCB0aGF0IGlzIGdvaW5nIHRvIGJlIGRlbGV0ZWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkLCBcInRoZSBpZCB0aGF0IGlzIGdvaW5nIHRvIGJlIGRlbGV0ZWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpcmViYXNlRGF0YSwgXCJmaXJlYmFzZURhdGFcIik7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH07XG59O1xuIiwiLy8gZmV0Y2ggc2tpbGwgZm9ybSBmaXJlYmFzZSBhbmQgZGlzcGxheSBpdCBvbiB0aGUgZmlsdGVyIHNraWxsIHNlY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmltcG9ydCB7IGFjdHVhbERhdGEsIGZpbHRlclRhYmxlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBza2lsbExpc3QsIGZpbHRlclNlYXJjaEJveCwgY2xlYXJGaWx0ZXJCdXR0b24gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmV4cG9ydCBjb25zdCBSZW5kZXJGaWx0ZXJCb3ggPSAoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+IHtcbiAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1DaGVja2VkID0gZWxlbTtcbiAgICAgICAgaWYgKGVsZW1DaGVja2VkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuZmlsdGVyU2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBSZW5kZXJGaWx0ZXJCb3gpO1xuY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFyRmlsdGVyKTtcbiIsImltcG9ydCB7IGhhbmRsZVRhYmxlQ2xpY2sgfSBmcm9tIFwiLi90YWJsZUFjdGlvbkJ1dHRvblwiO1xuaW1wb3J0IHsgYXBpLCBvdmVybGF5LCB0YWJsZSwgZGF0YVZpZXdNb2RhbCwgZGF0YURlbE1vZGFsLCB0YWJsZUJvZHksIHNraWxsTGlzdCwgZGVwYXJ0bWVudEVudHJ5LCByb2xlRW50cnksIHNraWxsU2VsZWNFbnRyeSwgZGF0YVZpZXdDbG9zZSwgY2FuY2VsRGVsQnV0dG9uLCBhZGRFbXBsb3llZUJ1dHRvbiwgZGF0YUVudHJ5Q2xvc2UsIGRhdGFFbnRyeU1vZGFsLCBzZWFyY2hCYXIsIHNvcnRCdXR0b24sIGRhdGFFbnRyeUZvcm0sIGRhdGFFbnRyeVN1Ym1pdCwgbWF0ZXJpYWxTeW1ib2xzT3V0bGluZWQsIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBzb3J0RnVuIH0gZnJvbSBcIi4vU29ydEZ1blwiO1xuZXhwb3J0IGxldCBhY3R1YWxEYXRhO1xuZXhwb3J0IGxldCBvcmlnaW5hbERhdGE7XG5leHBvcnQgbGV0IGZpcmViYXNlRGF0YTtcbmV4cG9ydCBsZXQgc2tpbGxOYW1lQXJyID0gW107IC8vc3RyaW5nIGFycmF5XG5leHBvcnQgbGV0IHNraWxsTmFtZTtcbmV4cG9ydCBjb25zdCBjaGFuZ2VTa2lsbE5hbWVBcnIgPSAoZWxlbSkgPT4ge1xuICAgIHNraWxsTmFtZUFyciA9IGVsZW07XG59O1xuZXhwb3J0IGNvbnN0IGNoYW5nZVNraWxsTmFtZSA9IChlbGVtKSA9PiB7XG4gICAgc2tpbGxOYW1lID0gZWxlbTtcbn07XG5jb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBmb3JtU2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2tpbGxcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuY29uc3QgdG9hc3RNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0LW1zZ1wiKTtcbmNvbnN0IHRvYXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdFwiKTtcbi8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3QgdG9hc3QgPSAodHlwZSwgbXNnKSA9PiB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdG9hc3RNc2cuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZC5pbm5lckhUTUwgPSBcImVycm9yXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLmJhY2tncm91bmQgPVxuICAgICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoMTExLjRkZWcsIHJnYigyNDYsIDQsIDI2KSAwLjQlLCByZ2IoMjUxLCAxMzksIDM0KSAxMDAuMiUpXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgxNzAlKVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdG9hc3RNc2cuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS5iYWNrZ3JvdW5kID1cbiAgICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDE3OS4xZGVnLCByZ2IoNDMsIDE3MCwgOTYpIDIuMyUsIHJnYigxMjksIDIwNCwgMTA0KSA5OC4zJSlcIjtcbiAgICAgICAgbWF0ZXJpYWxTeW1ib2xzT3V0bGluZWQuaW5uZXJIVE1MID0gXCJkb25lXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgxNzAlKVwiO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDApXCI7XG4gICAgfSwgMzAwMCk7XG59O1xuZXhwb3J0IGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGxldCBkZXAgPSBhY3R1YWxEYXRhLmRlcGFydG1lbnRbb2JqZWxlbS5kZXBhcnRtZW50IC0gMV0uZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgKz0gYFxuICAgIDx0ciBjbGFzcz1cImRhdGEtcm93XCI+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uaWR9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5mdWxsTmFtZX08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmVtYWlsfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2RlcH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJhY3Rpb24tYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJ2aWV3LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL3ZpZXctaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInZpZXcgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9lZGl0LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJFZGl0IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2RlbC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICAgYDtcbiAgICB9KTtcbn07XG4vLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBmaWxsZW50cnkgPSAob2JqKSA9PiB7XG4gICAgdGFibGVDcmVhdGUob2JqLmVtcGxveWVlKTtcbiAgICAvLyBmaWx0ZXIgc2tpbGwgYnV0dG9uIHNjcmlwdFxuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuPC9kaXY+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgZGVwYXJ0bWVudCBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLmRlcGFydG1lbnROYW1lfVwiPiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgcm9sZUVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmoucm9sZS5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgc2tpbGwgaW4gc2tpbGwgc2VsZWN0aW9uIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIGNsYXNzPVwic2tpbGwtb3B0aW9uc1wiIGlkPVwiJHtvYmplbGVtLnNraWxsfVwiIHZhbHVlPVwiJHtvYmplbGVtLnNraWxsfVwiPiR7b2JqZWxlbS5za2lsbH08L29wdGlvbj5gO1xuICAgIH0pO1xufTtcbi8vZmV0Y2hpbmcgZGF0YSB3aG9sZSBkYXRhIGZyb20gZmlyZWJhc2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IGZ1bmN0aW9uIChmaWxsZW50cnkpIHtcbiAgICBmZXRjaChhcGkgKyBcIi8uanNvblwiKVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvLyBmaXJlYmFzZURhdGEgPSBkYXRhO1xuICAgICAgICBmaXJlYmFzZURhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUoZGF0YSk7XG4gICAgICAgIGRhdGEuZW1wbG95ZWUgPSBkYXRhLmVtcGxveWVlLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgb3JpZ2luYWxEYXRhID0gc3RydWN0dXJlZENsb25lKGRhdGEpO1xuICAgICAgICBhY3R1YWxEYXRhID0gZGF0YTtcbiAgICAgICAgZmlsbGVudHJ5KGRhdGEpO1xuICAgICAgICBzb3J0RnVuKCk7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVyciwgXCJlcnJvclwiKSk7XG59O1xuZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG50YWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVGFibGVDbGljayk7XG4vL2Nsb3NlIGRhdGEtdmlldy1tb2RhbFxuZGF0YVZpZXdDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL2Nsb3NlIGRhdGEtZGVsLW1vZGFsXG5jYW5jZWxEZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL0FkZCBlbXBsb3llZSBmdW5jdGlvblxuYWRkRW1wbG95ZWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkYXRhRW50cnlGb3JtLnJlc2V0KCk7XG4gICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBkYXRhRW50cnlTdWJtaXQudmFsdWUgPSBcIkFkZFwiO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufSk7XG5kYXRhRW50cnlDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vZmlsdGVyQW5kU2VhcmNoIGZ1bmN0aW9uYWxpdHlcbmV4cG9ydCBsZXQgRmlsdGVyQXJyID0gW107XG5leHBvcnQgY29uc3QgZmlsdGVyVGFibGUgPSAoKSA9PiB7XG4gICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudFwiKTtcbiAgICBsZXQgY2hlY2tlZEZpbHRlckFyciA9IFtdO1xuICAgIGlucHV0cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtO1xuICAgICAgICBjb25zdCB0cmlhbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZWxlbWVudC5kYXRhc2V0LnNraWxsSWR9YCk7XG4gICAgICAgIGlmICh0cmlhbC5jaGVja2VkKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZWxlbWVudC5kYXRhc2V0LnNraWxsTnVtO1xuICAgICAgICAgICAgY2hlY2tlZEZpbHRlckFyci5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qgc2VhcmNodmFsdWUgPSBzZWFyY2hCYXIudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICBGaWx0ZXJBcnIgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgIGlmIChzZWFyY2hCYXIudmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgRmlsdGVyQXJyID0gRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5mdWxsTmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2h2YWx1ZSkpO1xuICAgIH1cbiAgICBpZiAoY2hlY2tlZEZpbHRlckFyci5sZW5ndGggIT09IDApIHtcbiAgICAgICAgRmlsdGVyQXJyID0gRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gY2hlY2tlZEZpbHRlckFyci5ldmVyeSgoY2hlY2tFbGVtKSA9PiBlbGVtLnNraWxscy5pbmNsdWRlcyhOdW1iZXIoY2hlY2tFbGVtKSkpKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUoRmlsdGVyQXJyKTtcbn07XG5jb25zdCBjaGFuZ2VTa2lsbFN0YXRlID0gKHNraWxsSWQpID0+IHtcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2tpbGxJZH1gKTtcbiAgICB0ZW1wLmNsaWNrKCk7XG4gICAgZmlsdGVyVGFibGUoKTtcbn07XG5za2lsbExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbC1lbGVtZW50XCIpICYmXG4gICAgICAgIHRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCIpIHtcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgIGNoYW5nZVNraWxsU3RhdGUoZGF0YXNldCk7XG4gICAgfVxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gXCJJTlBVVFwiIHx8IHRhcmdldC50YWdOYW1lID09PSBcIkxBQkVMXCIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xvc2VzdCA9IHRhcmdldC5jbG9zZXN0KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0Q2xvc2VzdC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgIGNoYW5nZVNraWxsU3RhdGUoZGF0YXNldCk7XG4gICAgfVxufSk7XG5zb3J0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzb3J0RnVuKTtcbnNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZmlsdGVyVGFibGUpO1xuLy9zZXR0aW5nIGxpbWl0IHRvIGRhdGUgb2YgYmlydGhcbmxldCB0b2RheSA9IG5ldyBEYXRlKCkudG9KU09OKCkuc2xpY2UoMCwgMTApO1xuY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5kYXRlSW5wdXQuc2V0QXR0cmlidXRlKFwibWF4XCIsIHRvZGF5KTtcbiIsImltcG9ydCB7IG92ZXJsYXksIGRhdGFWaWV3TW9kYWwsIGRhdGFEZWxNb2RhbCwgZGF0YUVudHJ5TW9kYWwsIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB1cGRhdGVFbXAgfSBmcm9tIFwiLi91cGRhdGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgdmlld01vZGFsIH0gZnJvbSBcIi4vdmlld0VtcGxveWVlXCI7XG5pbXBvcnQgeyBkZWxFbXAgfSBmcm9tIFwiLi9kZWxldGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgZGF0YUVudHJ5U3VibWl0IH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5leHBvcnQgY29uc3QgaGFuZGxlVGFibGVDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aWV3LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHZpZXdNb2RhbChOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWwtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkZWxFbXAoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxuICAgIC8vLyB1cGRhdGUgdXNlciBkZXRhaWxzIGZ1bmN0aW9uYWxpdHlcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9IFwiVXBkYXRlXCI7XG4gICAgICAgIHVwZGF0ZUVtcChOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IHt9O1xuIiwiaW1wb3J0IHsgYWN0dWFsRGF0YSwgb3JpZ2luYWxEYXRhLCBjaGFuZ2VTa2lsbE5hbWUsIHNraWxsTmFtZSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuLy8gZXhwb3J0IGxldCBza2lsbE5hbWU6IHN0cmluZ1tdO1xuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKTtcbmNvbnN0IGRhdGVPZkpvaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvalwiKTtcbmNvbnN0IGRhdGFPZkJpcnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5jb25zdCBkZXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuY29uc3Qgcm9sZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuY29uc3QgbG9jSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1wiKTtcbmNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG5sZXQgdXBkYXRlSW5kZXggPSAwO1xubGV0IGlkT2ZFbXAgPSAxMDAxO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUVtcCA9IChpZCkgPT4ge1xuICAgIGlkT2ZFbXAgPSBpZDtcbiAgICBsZXQgY3Vyck9iajtcbiAgICBsZXQgZGVwYXJ0bWVudDtcbiAgICBhY3R1YWxEYXRhLmVtcGxveWVlLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBpZiAob2JqLmlkID09IGlkKSB7XG4gICAgICAgICAgICBjdXJyT2JqID0gb2JqO1xuICAgICAgICAgICAgYWN0dWFsRGF0YS5kZXBhcnRtZW50LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyT2JqLmRlcGFydG1lbnQgPT0gb2JqLmRlcGFydG1lbnRJRClcbiAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudCA9IG9iai5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmFtZS52YWx1ZSA9IGAke2N1cnJPYmouZnVsbE5hbWV9YDtcbiAgICAgICAgICAgIGVtYWlsLnZhbHVlID0gYCR7Y3Vyck9iai5lbWFpbH1gO1xuICAgICAgICAgICAgZGF0ZU9mSm9pbi52YWx1ZSA9IGAke2N1cnJPYmouZGF0ZU9mQmlydGh9YDtcbiAgICAgICAgICAgIGRhdGFPZkJpcnRoLnZhbHVlID0gYCR7Y3Vyck9iai5kYXRlT2ZKb2lufWA7XG4gICAgICAgICAgICBsb2NJbnB1dC52YWx1ZSA9IGAke2N1cnJPYmoud29ya0xvY2F0aW9ufWA7XG4gICAgICAgICAgICByb2xlSW5wdXQudmFsdWUgPSBgJHtjdXJyT2JqLnJvbGV9YDtcbiAgICAgICAgICAgIGRlcElucHV0LnZhbHVlID0gYCR7ZGVwYXJ0bWVudH1gO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGV0IHNraWxsTmFtZUNvcHkgPSBhY3R1YWxEYXRhLnNraWxsLnJlZHVjZSgoYWNjLCBlbGVtKSA9PiB7XG4gICAgICAgIGlmIChjdXJyT2JqLnNraWxscy5pbmNsdWRlcyhlbGVtLnNraWxsSUQpKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2NdO1xuICAgIH0sIFtdKTtcbiAgICBjaGFuZ2VTa2lsbE5hbWUoc2tpbGxOYW1lQ29weSk7XG4gICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBza2lsbE5hbWUuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPSR7ZWxlbX0gY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7ZWxlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbiAgICBvcmlnaW5hbERhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGVsZW0uaWQgPT0gY3Vyck9iai5pZClcbiAgICAgICAgICAgIHVwZGF0ZUluZGV4ID0gaW5kZXg7XG4gICAgfSk7XG59O1xuZXhwb3J0IHsgdXBkYXRlSW5kZXgsIGlkT2ZFbXAgfTtcbiIsImltcG9ydCB7IGFjdHVhbERhdGEgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmNvbnN0IG5hbWVWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lVmlld1wiKTtcbmNvbnN0IGVtYWlsVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxWaWV3XCIpO1xuY29uc3QgZW1wSWRWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbXBJZFZpZXdcIik7XG5jb25zdCBkb2pWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pWaWV3XCIpO1xuY29uc3QgZG9iVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iVmlld1wiKTtcbmNvbnN0IGRlcFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFZpZXdcIik7XG5jb25zdCByb2xlVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVZpZXdcIik7XG5jb25zdCBsb2NWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NWaWV3XCIpO1xuY29uc3QgaW1nVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nXCIpO1xuY29uc3Qgdmlld1NraWxsQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWV3LXNraWxsLWJveFwiKTtcbmV4cG9ydCBjb25zdCB2aWV3TW9kYWwgPSAoaWQpID0+IHtcbiAgICBsZXQgdmlld09iajtcbiAgICBsZXQgZGVwYXJ0bWVudDtcbiAgICBhY3R1YWxEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGVsZW0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIHZpZXdPYmogPSBlbGVtO1xuICAgICAgICAgICAgYWN0dWFsRGF0YS5kZXBhcnRtZW50LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2aWV3T2JqLmRlcGFydG1lbnQgPT0gb2JqLmRlcGFydG1lbnRJRClcbiAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudCA9IG9iai5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmFtZVZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5mdWxsTmFtZX1gO1xuICAgICAgICAgICAgZW1haWxWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZW1haWx9YDtcbiAgICAgICAgICAgIGVtcElkVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmlkfWA7XG4gICAgICAgICAgICBkb2pWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZGF0ZU9mSm9pbn1gO1xuICAgICAgICAgICAgZG9iVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmRhdGVPZkJpcnRofWA7XG4gICAgICAgICAgICBkZXBWaWV3LmlubmVySFRNTCA9IGAke2RlcGFydG1lbnR9YDtcbiAgICAgICAgICAgIHJvbGVWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmoucm9sZX1gO1xuICAgICAgICAgICAgbG9jVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLndvcmtMb2NhdGlvbn1gO1xuICAgICAgICAgICAgLy8gaWYgKHZpZXdPYmouaW1hZ2VTcmMpIHtcbiAgICAgICAgICAgIC8vICAgaW1nVmlldy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgYCR7dmlld09iai5pbWFnZVNyY31gKTtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgbG9hZGluZyBpbWFnZVwiKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGltZ1ZpZXcuc3JjID0gYCR7dmlld09iai5pbWFnZVNyY31gO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGV0IGVhY2hTa2lsbCA9IGFjdHVhbERhdGEuc2tpbGwucmVkdWNlKChhY2MsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKHZpZXdPYmouc2tpbGxzLmluY2x1ZGVzKGVsZW0uc2tpbGxJRCkpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgfSwgW10pO1xuICAgIHZpZXdTa2lsbEJveC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGVhY2hTa2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIHZpZXdTa2lsbEJveC5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFjaC1za2lsbC12aWV3XCI+JHtlbGVtfTwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZmlsdGVyQW5kU2VhcmNoRnVuLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHQudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvU29ydEZ1bi50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90YWJsZUFjdGlvbkJ1dHRvbi50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb25zdGFudHMudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdHlwZS50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hZGRVcGRhdGVFbXBsb3llZS50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9kZWxldGVFbXBsb3llZS50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy91cGRhdGVFbXBsb3llZS50c1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3ZpZXdFbXBsb3llZS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==