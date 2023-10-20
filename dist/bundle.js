/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AppSupportFunction.ts":
/*!***********************************!*\
  !*** ./src/AppSupportFunction.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppSupportFun: () => (/* binding */ AppSupportFun)
/* harmony export */ });
class AppSupportFun {
    //static method to convert skillName to skill id array
    static returnSkillArr(arrOfNames, data) {
        arrOfNames = arrOfNames.map((elem) => elem.toLowerCase());
        const skillIDArr = data.skill.reduce(function (acc, elem) {
            if (arrOfNames.includes(elem.skill.toLowerCase())) {
                return [...acc, elem.skillID];
            }
            return [...acc];
        }, []);
        return skillIDArr;
    }
    // converts department name to department id
    static returnDepID(depName, data) {
        depName = depName.toLowerCase();
        const depID = data.department.reduce((value, elem) => {
            if (elem.departmentName.toLowerCase() == depName) {
                value = elem.departmentID;
                return value;
            }
            return value;
        }, 0);
        return depID;
    }
    //static method to read File as base64
    static readFileAsBase64(file) {
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
    }
}


/***/ }),

/***/ "./src/DataService.ts":
/*!****************************!*\
  !*** ./src/DataService.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hrmApp: () => (/* binding */ hrmApp)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const skillList = document.querySelector(".skill-list");
// import { firebaseData } from "./script";
let firebaseData;
class FirebaseSingleton {
    constructor() {
        this.databaseUrl = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    }
    static getInstance() {
        if (!FirebaseSingleton.instance) {
            FirebaseSingleton.instance = new FirebaseSingleton();
        }
        return FirebaseSingleton.instance;
    }
    // Read items from firebase database
    fetchData(fillentry) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.databaseUrl}/.json`);
            if (response.ok) {
                const data = yield response.json();
                firebaseData = structuredClone(data);
                data.employee = data.employee.filter(Boolean);
                fillentry(data);
                return data ? data : [];
            }
            else {
                console.log("error while fetching data");
                return [];
            }
        });
    }
    deleteData(index, fillentry, toast) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.databaseUrl}/employee/${index}.json`, {
                method: "DELETE",
            });
            if (!response.ok) {
                console.error("Error in deleting employee");
                toast(true, _constants__WEBPACK_IMPORTED_MODULE_0__.appStrings.delErrMsg);
            }
            else {
                console.log("successfully deleted");
                skillList.innerHTML = "";
                toast(false, _constants__WEBPACK_IMPORTED_MODULE_0__.appStrings.delSuccessMsg);
                this.fetchData(fillentry).then((data) => console.log(data));
            }
        });
    }
    // Create (Add) a new item to the Firebase Realtime Database
    putData(obj, fillentry, toast) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.databaseUrl}/employee/${obj.index}.json`, {
                method: "PUT",
                body: JSON.stringify({
                    dateOfBirth: obj.dob,
                    dateOfJoin: obj.doj,
                    department: obj.dep,
                    id: obj.id,
                    role: obj.role,
                    skills: obj.skill,
                    workLocation: obj.loc,
                    fullName: obj.name,
                    email: obj.email,
                    imageSrc: obj.img,
                }),
            });
            if (!response.ok) {
                console.log(this.databaseUrl);
                console.log(response);
                console.log("error while performing the action");
                toast(true, obj.errMsg);
            }
            else {
                console.log("successfully added");
                toast(false, obj.succMsg);
                const skillList = document.querySelector(".skill-list");
                skillList.innerHTML = "";
                this.fetchData(fillentry).then((data) => console.log(data));
            }
        });
    }
}
const hrmApp = FirebaseSingleton.getInstance();


/***/ }),

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


const tableBody = document.querySelector(".table-body");
const sortButton = document.querySelector(".sort-button");
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
    tableBody.innerHTML = "";
    (0,_script__WEBPACK_IMPORTED_MODULE_0__.tableCreate)(arrToRender);
    if (dirFlag == 1) {
        sortButton.src = "../assets/images/down-arrow.svg";
        dirFlag = -1;
    }
    else {
        dirFlag = 1;
        sortButton.src = "../assets/images/up-arrow.svg";
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
/* harmony import */ var _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppSupportFunction */ "./src/AppSupportFunction.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _updateEmployee__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateEmployee */ "./src/updateEmployee.ts");
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const dataEntryModal = document.querySelector(".data-entry-modal");
const overlay = document.querySelector(".overlay");
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
let putdata = {
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
        base64String = yield _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.readFileAsBase64(imgFile);
        putdata.img = base64String; //data to be sent to putData function
    }
    catch (err) {
        console.log("error while fetching base64String");
    }
    putdata.name = name.value;
    putdata.email = email.value;
    putdata.doj = dateOfJoin.value;
    putdata.dob = dataOfBirth.value;
    putdata.dep = _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.returnDepID(depInput.value, _script__WEBPACK_IMPORTED_MODULE_0__.actualData);
    putdata.role = roleInput.value;
    putdata.loc = locInput.value;
    putdata.skill = _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.returnSkillArr(_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr, _script__WEBPACK_IMPORTED_MODULE_0__.actualData);
    let isErr = false;
    if (putdata.name.length < 2) {
        isErr = true;
        dataEntryNameAlert.style.display = "block";
    }
    else
        dataEntryNameAlert.style.display = "none";
    if (!putdata.doj) {
        isErr = true;
        dataEntryDojAlert.style.display = "block";
    }
    else
        dataEntryDojAlert.style.display = "none";
    if (!putdata.dob) {
        isErr = true;
        dataEntryDobAlert.style.display = "block";
    }
    else
        dataEntryDobAlert.style.display = "none";
    if (putdata.role === "none") {
        isErr = true;
        dataEntryRoleAlert.style.display = "block";
    }
    else
        dataEntryRoleAlert.style.display = "none";
    if (!putdata.dep) {
        isErr = true;
        dataEntryDepAlert.style.display = "block";
    }
    else
        dataEntryDepAlert.style.display = "none";
    if (putdata.loc === "none") {
        isErr = true;
        dataEntryLocAlert.style.display = "block";
    }
    else
        dataEntryLocAlert.style.display = "none";
    if (!putdata.skill.length) {
        isErr = true;
        dataEntrySkillAlert.style.display = "block";
    }
    else
        dataEntrySkillAlert.style.display = "none";
    if (!email.checkValidity()) {
        dataEntryEmailAlert.style.display = "block";
    }
    else
        dataEntryEmailAlert.style.display = "none";
    if (dataEntrySubmit.value == "Add") {
        if (!isErr) {
            let entryIndex = 0;
            if (_script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee) {
                _script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee.forEach((elem, index) => {
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
            putdata.id = employeeID;
            putdata.index = entryIndex;
            putdata.errMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.addErrMsg;
            putdata.succMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.addSuccessMsg;
            //passing data to enter new employee details
            console.log(putdata, "putdata created");
            _DataService__WEBPACK_IMPORTED_MODULE_4__.hrmApp.putData(putdata, _script__WEBPACK_IMPORTED_MODULE_0__.fillentry, _script__WEBPACK_IMPORTED_MODULE_0__.toast);
            console.log(employeeID, "employee id that is going for the new data");
            console.log(entryIndex, "index that the new data occupies");
            dataEntryForm.reset();
            addedSkills.innerHTML = "";
            //   skillNameArr = [];
            let nullArr = [];
            (0,_script__WEBPACK_IMPORTED_MODULE_0__.changeSkillNameArr)(nullArr);
            overlay.style.display = "none";
            dataEntryModal.style.display = "none";
        }
        else {
            console.log("error in adding new employee");
        }
    }
    else if (dataEntrySubmit.value == "Update") {
        if (!isErr) {
            let employeeID = _updateEmployee__WEBPACK_IMPORTED_MODULE_3__.idOfEmp;
            putdata.id = employeeID;
            base64String = _script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee[_updateEmployee__WEBPACK_IMPORTED_MODULE_3__.updateIndex].imageSrc;
            putdata.img = base64String;
            putdata.errMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.updateErrMsg;
            putdata.succMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.updateSuccessMsg;
            putdata.index = _updateEmployee__WEBPACK_IMPORTED_MODULE_3__.updateIndex;
            //passing data to update employee
            console.log(putdata, "putdata created");
            _DataService__WEBPACK_IMPORTED_MODULE_4__.hrmApp.putData(putdata, _script__WEBPACK_IMPORTED_MODULE_0__.fillentry, _script__WEBPACK_IMPORTED_MODULE_0__.toast);
            console.log(employeeID, "id that is going to be updated");
            console.log(_updateEmployee__WEBPACK_IMPORTED_MODULE_3__.updateIndex, "index that is going to be updated");
            overlay.style.display = "none";
            dataEntryModal.style.display = "none";
        }
    }
});
dataEntryForm.onsubmit = handleSubmitClick;
//data-entry-form skill section functionalities
/////////////////////////////////////////////////////////////////////////////////////////////////////
Fulltable.onclick = (e) => {
    const target = e.target;
    if (target.classList.contains("edit-image-icon")) {
        // skillNameArr = skillName;
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.changeSkillNameArr)(_script__WEBPACK_IMPORTED_MODULE_0__.skillName);
    }
};
formSkill.onclick = (e) => {
    const target = e.target;
    if (target.classList.contains("skill-options") &&
        !_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.includes(target.id)) {
        _script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.push(target.id);
        addedSkills.innerHTML += `
                  <div data-rem-id="${target.id}" class="each-skill-added">
                  ${target.id}
              </div>`;
    }
    else {
        console.log(" error while updating");
    }
};
addedSkills.onclick = (e) => {
    const target = e.target;
    if (target.dataset.remId) {
        let skillNameArrCopy = _script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.filter((elem) => elem != target.dataset.remId);
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.changeSkillNameArr)(skillNameArrCopy);
        addedSkills.innerHTML = "";
        _script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.forEach((elem) => {
            addedSkills.innerHTML += `
          <div data-rem-id="${elem}" class="each-skill-added">
          ${elem}
      </div>`;
        });
    }
    skillInput.value = "none";
};


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appConstants: () => (/* binding */ appConstants),
/* harmony export */   appStrings: () => (/* binding */ appStrings)
/* harmony export */ });
// AppConstants
const appConstants = {
    api: "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app",
};
// AppStrings
const appStrings = {
    addSuccessMsg: "Succesfully added employee",
    addErrMsg: "Error while adding employee",
    updateSuccessMsg: "Succesfully updated employee",
    updateErrMsg: "Error while updating employee",
    delSuccessMsg: "Succesfully deleted the employee",
    delErrMsg: "Error while deleting employee",
};


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
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");


const skillList = document.querySelector(".skill-list");
const overlay = document.querySelector(".overlay");
const dataDelModal = document.querySelector(".data-del-modal");
const confirmButton = document.querySelector(".confirm-button");
const delEmp = (id) => {
    let delIndex;
    _script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee.forEach((elem, index) => {
        if (elem == null)
            return;
        else if (elem.id == id)
            delIndex = index;
    });
    // for (let step = 0; step < firebaseData.employee.length; step++) {
    //   if (firebaseData.employee[step] == null) continue;
    //   else if (firebaseData.employee[step].id == id) delIndex = step;
    // }
    confirmButton.onclick = () => {
        _DataService__WEBPACK_IMPORTED_MODULE_1__.hrmApp.deleteData(delIndex, _script__WEBPACK_IMPORTED_MODULE_0__.fillentry, _script__WEBPACK_IMPORTED_MODULE_0__.toast);
        console.log(delIndex, "index that is going to be deleted");
        console.log(id, "the id that is going to be deleted");
        console.log(_script__WEBPACK_IMPORTED_MODULE_0__.firebaseData, "firebaseData");
        overlay.style.display = "none";
        dataDelModal.style.display = "none";
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
// fetch skill form firebase and display it on the filter skill section
///////////////////////////////////////////////////////

const skillList = document.querySelector(".skill-list");
const filterSearchBox = document.querySelector(".filter-search-box");
const clearFilterButton = document.querySelector(".clear-filter-button");
const RenderFilterBox = () => {
    let value = filterSearchBox.value;
    value = value.split(" ").join("").toLowerCase();
    skillList.innerHTML = "";
    _script__WEBPACK_IMPORTED_MODULE_0__.actualData.skill.forEach((objelem) => {
        const skillId = objelem.skill.split(" ").join("").toLowerCase();
        const skillNum = objelem.skillID;
        if (skillId.includes(value)) {
            skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
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
filterSearchBox.addEventListener("input", RenderFilterBox);
clearFilterButton.addEventListener("click", clearFilter);


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

const dataEntrySubmit = document.querySelector("#data-entry-submit");
const dataEntryForm = document.querySelector(".data-entry-form");
const materialSymbolsOutlined = document.querySelector(".material-symbols-outlined ");
const sortButton = document.querySelector(".sort-button");
const searchBar = document.querySelector(".search-input-box");
const departmentEntry = document.querySelector("#dep");
const roleEntry = document.querySelector("#role");
const skillSelecEntry = document.querySelector("#skill");
const dataViewClose = document.querySelector(".data-view-close");
const cancelDelButton = document.querySelector(".cancel-del-button");
const addEmployeeButton = document.querySelector(".add-employee-button");
const dataEntryClose = document.querySelector(".data-entry-close");
const dataEntryModal = document.querySelector(".data-entry-modal");
const table = document.querySelector(".table");
const overlay = document.querySelector(".overlay");

const dataViewModal = document.querySelector(".data-view-modal");
const dataDelModal = document.querySelector(".data-del-modal");
const tableBody = document.querySelector(".table-body");
const skillList = document.querySelector(".skill-list");

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
        materialSymbolsOutlined.innerHTML = "error";
        toastDiv.style.background =
            "linear-gradient(111.4deg, rgb(246, 4, 26) 0.4%, rgb(251, 139, 34) 100.2%)";
        toastDiv.style.transform = "translateY(170%)";
    }
    else {
        toastMsg.innerHTML = msg;
        toastDiv.style.background =
            "linear-gradient(179.1deg, rgb(43, 170, 96) 2.3%, rgb(129, 204, 104) 98.3%)";
        materialSymbolsOutlined.innerHTML = "done";
        toastDiv.style.transform = "translateY(170%)";
    }
    setTimeout(() => {
        toastDiv.style.transform = "translateY(0)";
    }, 3000);
};
const tableCreate = (arr) => {
    arr.forEach((objelem) => {
        let dep = actualData.department[objelem.department - 1].departmentName;
        tableBody.innerHTML += `
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
    tableBody.innerHTML = "";
    tableCreate(obj.employee);
    // filter skill button script
    obj.skill.forEach((objelem) => {
        const skillId = objelem.skill.split(" ").join("");
        const skillNum = objelem.skillID;
        skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
    });
    //fill department in data entry modal
    departmentEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
    obj.department.forEach((objelem) => {
        departmentEntry.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
    });
    // fill role in data entry modal
    roleEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
    obj.role.forEach((objelem) => {
        roleEntry.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
    });
    //fill skill in skill selection in data entry modal
    skillSelecEntry.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
    obj.skill.forEach((objelem) => {
        skillSelecEntry.innerHTML += ` <option class="skill-options" id="${objelem.skill}" value="${objelem.skill}">${objelem.skill}</option>`;
    });
};
//fetching data whole data from firebase
////////////////////////////////////////////////
const fetchData = function (fillentry) {
    fetch(_constants__WEBPACK_IMPORTED_MODULE_1__.appConstants.api + "/.json")
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
table.addEventListener("click", _tableActionButton__WEBPACK_IMPORTED_MODULE_0__.handleTableClick);
//close data-view-modal
dataViewClose.addEventListener("click", () => {
    overlay.style.display = "none";
    dataViewModal.style.display = "none";
});
//close data-del-modal
cancelDelButton.addEventListener("click", () => {
    overlay.style.display = "none";
    dataDelModal.style.display = "none";
});
//Add employee function
addEmployeeButton.addEventListener("click", () => {
    dataEntryForm.reset();
    changeSkillNameArr([]);
    addedSkills.innerHTML = "";
    dataEntrySubmit.value = "Add";
    overlay.style.display = "block";
    dataEntryModal.style.display = "block";
});
dataEntryClose.addEventListener("click", () => {
    dataEntryForm.reset();
    overlay.style.display = "none";
    dataEntryModal.style.display = "none";
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
    const searchvalue = searchBar.value.toLowerCase();
    FilterArr = actualData.employee;
    if (searchBar.value !== "") {
        FilterArr = FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
    }
    if (checkedFilterArr.length !== 0) {
        FilterArr = FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
    }
    tableBody.innerHTML = "";
    tableCreate(FilterArr);
};
const changeSkillState = (skillId) => {
    const temp = document.querySelector(`#${skillId}`);
    temp.click();
    filterTable();
};
skillList.addEventListener("click", (e) => {
    const target = e.target;
    console.log(target);
    if (target.classList.contains("skill-element") &&
        target.tagName !== "INPUT") {
        const dataset = target.dataset.skillId;
        changeSkillState(dataset);
    }
    if (target.tagName === "INPUT" || target.tagName === "LABEL") {
        const targetClosest = target.closest("div");
        const dataset = targetClosest.dataset.skillId;
        filterTable();
    }
});
sortButton.addEventListener("click", _SortFun__WEBPACK_IMPORTED_MODULE_2__.sortFun);
searchBar.addEventListener("input", filterTable);
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
/* harmony import */ var _updateEmployee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateEmployee */ "./src/updateEmployee.ts");
/* harmony import */ var _viewEmployee__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewEmployee */ "./src/viewEmployee.ts");
/* harmony import */ var _deleteEmployee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deleteEmployee */ "./src/deleteEmployee.ts");
const overlay = document.querySelector(".overlay");
const dataViewModal = document.querySelector(".data-view-modal");
const dataDelModal = document.querySelector(".data-del-modal");
const dataEntryModal = document.querySelector(".data-entry-modal");
const dataEntrySubmit = document.querySelector("#data-entry-submit");



const handleTableClick = (e) => {
    const target = e.target;
    if (target.classList.contains("view-image-icon")) {
        overlay.style.display = "block";
        dataViewModal.style.display = "block";
        (0,_viewEmployee__WEBPACK_IMPORTED_MODULE_1__.viewModal)(Number(target.dataset.empId));
    }
    if (target.classList.contains("del-image-icon")) {
        overlay.style.display = "block";
        dataDelModal.style.display = "block";
        (0,_deleteEmployee__WEBPACK_IMPORTED_MODULE_2__.delEmp)(Number(target.dataset.empId));
    }
    /// update user details functionality
    if (target.classList.contains("edit-image-icon")) {
        overlay.style.display = "block";
        dataEntryModal.style.display = "block";
        dataEntrySubmit.value = "Update";
        (0,_updateEmployee__WEBPACK_IMPORTED_MODULE_0__.updateEmp)(Number(target.dataset.empId));
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
    _script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee.forEach((obj) => {
        if (obj == null)
            return;
        else if (obj.id == id) {
            currObj = obj;
            _script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.department.forEach((obj) => {
                if (obj == null)
                    return null;
                else if (currObj.department == obj.departmentID)
                    department = obj.departmentName;
            });
            for (let step = 0; step < _script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee.length; step++) {
                if (_script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee[step] == null)
                    continue;
                else if (_script__WEBPACK_IMPORTED_MODULE_0__.firebaseData.employee[step].id == currObj.id)
                    updateIndex = step;
            }
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
    // firebaseData.employee.forEach((elem, index) => {
    //   if (elem == null) {
    //     console.log("null is found");
    //     return;
    //   } else if (elem.id == currObj.id) updateIndex = index;
    //   else {
    //     console.log(firebaseData, "firebaseData when finding update Index");
    //     console.log("error while getting updateIndex");
    //     console.log(updateIndex, "updateIndex when failed");
    //   }
    // });
    // for(let step=0;step<firebaseData.employee.length;step++){
    //   if (firebaseData.employee[step] == null) continue;
    //   else if(firebaseData.employee[step].id == currObj.id) updateIndex=step;
    // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxpQkFBaUI7QUFDakQ7QUFDQSxLQUFLO0FBQ0wsb0JBQW9CLCtDQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7VUNsREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvQXBwU3VwcG9ydEZ1bmN0aW9uLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9EYXRhU2VydmljZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvU29ydEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvYWRkVXBkYXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvZGVsZXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvc2NyaXB0LnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy90YWJsZUFjdGlvbkJ1dHRvbi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdHlwZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdXBkYXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3ZpZXdFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFwcFN1cHBvcnRGdW4ge1xuICAgIC8vc3RhdGljIG1ldGhvZCB0byBjb252ZXJ0IHNraWxsTmFtZSB0byBza2lsbCBpZCBhcnJheVxuICAgIHN0YXRpYyByZXR1cm5Ta2lsbEFycihhcnJPZk5hbWVzLCBkYXRhKSB7XG4gICAgICAgIGFyck9mTmFtZXMgPSBhcnJPZk5hbWVzLm1hcCgoZWxlbSkgPT4gZWxlbS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgY29uc3Qgc2tpbGxJREFyciA9IGRhdGEuc2tpbGwucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGVsZW0pIHtcbiAgICAgICAgICAgIGlmIChhcnJPZk5hbWVzLmluY2x1ZGVzKGVsZW0uc2tpbGwudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbElEXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICAgICAgfSwgW10pO1xuICAgICAgICByZXR1cm4gc2tpbGxJREFycjtcbiAgICB9XG4gICAgLy8gY29udmVydHMgZGVwYXJ0bWVudCBuYW1lIHRvIGRlcGFydG1lbnQgaWRcbiAgICBzdGF0aWMgcmV0dXJuRGVwSUQoZGVwTmFtZSwgZGF0YSkge1xuICAgICAgICBkZXBOYW1lID0gZGVwTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBkZXBJRCA9IGRhdGEuZGVwYXJ0bWVudC5yZWR1Y2UoKHZhbHVlLCBlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbS5kZXBhcnRtZW50TmFtZS50b0xvd2VyQ2FzZSgpID09IGRlcE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGVsZW0uZGVwYXJ0bWVudElEO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwgMCk7XG4gICAgICAgIHJldHVybiBkZXBJRDtcbiAgICB9XG4gICAgLy9zdGF0aWMgbWV0aG9kIHRvIHJlYWQgRmlsZSBhcyBiYXNlNjRcbiAgICBzdGF0aWMgcmVhZEZpbGVBc0Jhc2U2NChmaWxlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJObyBmaWxlIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgoX2EgPSBlLnRhcmdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgYXBwU3RyaW5ncyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuLy8gaW1wb3J0IHsgZmlyZWJhc2VEYXRhIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5sZXQgZmlyZWJhc2VEYXRhO1xuY2xhc3MgRmlyZWJhc2VTaW5nbGV0b24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRhdGFiYXNlVXJsID0gXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICghRmlyZWJhc2VTaW5nbGV0b24uaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIEZpcmViYXNlU2luZ2xldG9uLmluc3RhbmNlID0gbmV3IEZpcmViYXNlU2luZ2xldG9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZpcmViYXNlU2luZ2xldG9uLmluc3RhbmNlO1xuICAgIH1cbiAgICAvLyBSZWFkIGl0ZW1zIGZyb20gZmlyZWJhc2UgZGF0YWJhc2VcbiAgICBmZXRjaERhdGEoZmlsbGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke3RoaXMuZGF0YWJhc2VVcmx9Ly5qc29uYCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIGZpcmViYXNlRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgICAgICAgICAgICAgICBkYXRhLmVtcGxveWVlID0gZGF0YS5lbXBsb3llZS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICAgICAgZmlsbGVudHJ5KGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhID8gZGF0YSA6IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBmZXRjaGluZyBkYXRhXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlbGV0ZURhdGEoaW5kZXgsIGZpbGxlbnRyeSwgdG9hc3QpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7dGhpcy5kYXRhYmFzZVVybH0vZW1wbG95ZWUvJHtpbmRleH0uanNvbmAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gZGVsZXRpbmcgZW1wbG95ZWVcIik7XG4gICAgICAgICAgICAgICAgdG9hc3QodHJ1ZSwgYXBwU3RyaW5ncy5kZWxFcnJNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzZnVsbHkgZGVsZXRlZFwiKTtcbiAgICAgICAgICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0b2FzdChmYWxzZSwgYXBwU3RyaW5ncy5kZWxTdWNjZXNzTXNnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoRGF0YShmaWxsZW50cnkpLnRoZW4oKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIENyZWF0ZSAoQWRkKSBhIG5ldyBpdGVtIHRvIHRoZSBGaXJlYmFzZSBSZWFsdGltZSBEYXRhYmFzZVxuICAgIHB1dERhdGEob2JqLCBmaWxsZW50cnksIHRvYXN0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke3RoaXMuZGF0YWJhc2VVcmx9L2VtcGxveWVlLyR7b2JqLmluZGV4fS5qc29uYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVPZkJpcnRoOiBvYmouZG9iLFxuICAgICAgICAgICAgICAgICAgICBkYXRlT2ZKb2luOiBvYmouZG9qLFxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50OiBvYmouZGVwLFxuICAgICAgICAgICAgICAgICAgICBpZDogb2JqLmlkLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiBvYmoucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxzOiBvYmouc2tpbGwsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtMb2NhdGlvbjogb2JqLmxvYyxcbiAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogb2JqLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNyYzogb2JqLmltZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YWJhc2VVcmwpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIHBlcmZvcm1pbmcgdGhlIGFjdGlvblwiKTtcbiAgICAgICAgICAgICAgICB0b2FzdCh0cnVlLCBvYmouZXJyTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc2Z1bGx5IGFkZGVkXCIpO1xuICAgICAgICAgICAgICAgIHRvYXN0KGZhbHNlLCBvYmouc3VjY01zZyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgICAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hEYXRhKGZpbGxlbnRyeSkudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgaHJtQXBwID0gRmlyZWJhc2VTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKTtcbiIsImltcG9ydCB7IGFjdHVhbERhdGEsIHRhYmxlQ3JlYXRlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBGaWx0ZXJBcnIgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbmNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xubGV0IGRpckZsYWcgPSAxO1xuLy8gc29ydCBmdW5jdGlvbmFsaXR5XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IHNvcnRGdW4gPSAoKSA9PiB7XG4gICAgbGV0IGFycmF5VG9Tb3J0ID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoRmlsdGVyQXJyLmxlbmd0aCAhPT0gMClcbiAgICAgICAgYXJyYXlUb1NvcnQgPSBGaWx0ZXJBcnI7XG4gICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBuYW1lMSA9IGEuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbmFtZTIgPSBiLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgaWYgKG5hbWUxID4gbmFtZTIpIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb24gPSAxICogZGlyRmxhZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lMSA8IG5hbWUyKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uID0gLTEgKiBkaXJGbGFnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wYXJpc29uO1xuICAgIH0pO1xuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKGFyclRvUmVuZGVyKTtcbiAgICBpZiAoZGlyRmxhZyA9PSAxKSB7XG4gICAgICAgIHNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL2Rvd24tYXJyb3cuc3ZnXCI7XG4gICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy91cC1hcnJvdy5zdmdcIjtcbiAgICB9XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBhY3R1YWxEYXRhLCBmaWxsZW50cnksIG9yaWdpbmFsRGF0YSwgc2tpbGxOYW1lQXJyLCBjaGFuZ2VTa2lsbE5hbWVBcnIsIHRvYXN0LCBmaXJlYmFzZURhdGEsIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBBcHBTdXBwb3J0RnVuIH0gZnJvbSBcIi4vQXBwU3VwcG9ydEZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBhcHBTdHJpbmdzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB1cGRhdGVJbmRleCwgaWRPZkVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGhybUFwcCB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5jb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lXCIpO1xuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpO1xuY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuY29uc3QgZGF0YU9mQmlydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmNvbnN0IGRlcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBsb2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jXCIpO1xuY29uc3Qgc2tpbGxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2tpbGxcIik7XG5jb25zdCBGdWxsdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlXCIpO1xuY29uc3QgZm9ybVNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLXNraWxsXCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmNvbnN0IGRhdGFFbnRyeU5hbWVBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1uYW1lLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5RG9qQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZG9qLWFsZXJ0IFwiKTtcbmNvbnN0IGRhdGFFbnRyeURvYkFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRvYi1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeVJvbGVBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1yb2xlLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5RGVwQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZGVwLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5TG9jQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbG9jLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5U2tpbGxBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1za2lsbC1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5jb25zdCBkYXRhRW50cnlGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWZvcm1cIik7XG5jb25zdCBkYXRhRW50cnlFbWFpbEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWVtYWlsLWFsZXJ0XCIpO1xubGV0IHB1dGRhdGEgPSB7XG4gICAgaW5kZXg6IDAsXG4gICAgaWQ6IDAsXG4gICAgbmFtZTogXCJcIixcbiAgICBlbWFpbDogXCJcIixcbiAgICBkb2o6IFwiXCIsXG4gICAgZG9iOiBcIlwiLFxuICAgIGRlcDogMCxcbiAgICByb2xlOiBcIlwiLFxuICAgIGxvYzogXCJcIixcbiAgICBza2lsbDogW10sXG4gICAgaW1nOiBcIlwiLFxuICAgIGVyck1zZzogXCJcIixcbiAgICBzdWNjTXNnOiBcIlwiLFxufTtcbi8vaGFuZGxpbmcgdGhlIHN1Ym1pdCBidXR0b24gY2xpY2tcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3QgaGFuZGxlU3VibWl0Q2xpY2sgPSAoZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBiYXNlNjRTdHJpbmc7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vdGFraW5nIGltYWdlIGZyb20gdXNlclxuICAgIGNvbnN0IGltZ0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtaW5wdXRcIik7XG4gICAgY29uc3QgaW1nRmlsZSA9IChfYSA9IGltZ0VsZW0uZmlsZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcbiAgICB0cnkge1xuICAgICAgICBiYXNlNjRTdHJpbmcgPSB5aWVsZCBBcHBTdXBwb3J0RnVuLnJlYWRGaWxlQXNCYXNlNjQoaW1nRmlsZSk7XG4gICAgICAgIHB1dGRhdGEuaW1nID0gYmFzZTY0U3RyaW5nOyAvL2RhdGEgdG8gYmUgc2VudCB0byBwdXREYXRhIGZ1bmN0aW9uXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBmZXRjaGluZyBiYXNlNjRTdHJpbmdcIik7XG4gICAgfVxuICAgIHB1dGRhdGEubmFtZSA9IG5hbWUudmFsdWU7XG4gICAgcHV0ZGF0YS5lbWFpbCA9IGVtYWlsLnZhbHVlO1xuICAgIHB1dGRhdGEuZG9qID0gZGF0ZU9mSm9pbi52YWx1ZTtcbiAgICBwdXRkYXRhLmRvYiA9IGRhdGFPZkJpcnRoLnZhbHVlO1xuICAgIHB1dGRhdGEuZGVwID0gQXBwU3VwcG9ydEZ1bi5yZXR1cm5EZXBJRChkZXBJbnB1dC52YWx1ZSwgYWN0dWFsRGF0YSk7XG4gICAgcHV0ZGF0YS5yb2xlID0gcm9sZUlucHV0LnZhbHVlO1xuICAgIHB1dGRhdGEubG9jID0gbG9jSW5wdXQudmFsdWU7XG4gICAgcHV0ZGF0YS5za2lsbCA9IEFwcFN1cHBvcnRGdW4ucmV0dXJuU2tpbGxBcnIoc2tpbGxOYW1lQXJyLCBhY3R1YWxEYXRhKTtcbiAgICBsZXQgaXNFcnIgPSBmYWxzZTtcbiAgICBpZiAocHV0ZGF0YS5uYW1lLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlOYW1lQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlOYW1lQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5kb2opIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEb2pBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURvakFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIXB1dGRhdGEuZG9iKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RG9iQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEb2JBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKHB1dGRhdGEucm9sZSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlSb2xlQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlSb2xlQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5kZXApIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEZXBBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURlcEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAocHV0ZGF0YS5sb2MgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5TG9jQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlMb2NBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFwdXRkYXRhLnNraWxsLmxlbmd0aCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeVNraWxsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlTa2lsbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIWVtYWlsLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICBkYXRhRW50cnlFbWFpbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RW1haWxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9PSBcIkFkZFwiKSB7XG4gICAgICAgIGlmICghaXNFcnIpIHtcbiAgICAgICAgICAgIGxldCBlbnRyeUluZGV4ID0gMDtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbERhdGEuZW1wbG95ZWUpIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gZW50cnlJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gZW50cnlJbmRleCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgZW1wbG95ZWVJRCA9IDEwMDE7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxEYXRhLmVtcGxveWVlKSB7XG4gICAgICAgICAgICAgICAgZW1wbG95ZWVJRCA9XG4gICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmlnaW5hbERhdGEuZW1wbG95ZWVbb3JpZ2luYWxEYXRhLmVtcGxveWVlLmxlbmd0aCAtIDFdLmlkKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVtcGxveWVlSUQgPSAxMDAxO1xuICAgICAgICAgICAgcHV0ZGF0YS5pZCA9IGVtcGxveWVlSUQ7XG4gICAgICAgICAgICBwdXRkYXRhLmluZGV4ID0gZW50cnlJbmRleDtcbiAgICAgICAgICAgIHB1dGRhdGEuZXJyTXNnID0gYXBwU3RyaW5ncy5hZGRFcnJNc2c7XG4gICAgICAgICAgICBwdXRkYXRhLnN1Y2NNc2cgPSBhcHBTdHJpbmdzLmFkZFN1Y2Nlc3NNc2c7XG4gICAgICAgICAgICAvL3Bhc3NpbmcgZGF0YSB0byBlbnRlciBuZXcgZW1wbG95ZWUgZGV0YWlsc1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHV0ZGF0YSwgXCJwdXRkYXRhIGNyZWF0ZWRcIik7XG4gICAgICAgICAgICBocm1BcHAucHV0RGF0YShwdXRkYXRhLCBmaWxsZW50cnksIHRvYXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVtcGxveWVlSUQsIFwiZW1wbG95ZWUgaWQgdGhhdCBpcyBnb2luZyBmb3IgdGhlIG5ldyBkYXRhXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnlJbmRleCwgXCJpbmRleCB0aGF0IHRoZSBuZXcgZGF0YSBvY2N1cGllc1wiKTtcbiAgICAgICAgICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAvLyAgIHNraWxsTmFtZUFyciA9IFtdO1xuICAgICAgICAgICAgbGV0IG51bGxBcnIgPSBbXTtcbiAgICAgICAgICAgIGNoYW5nZVNraWxsTmFtZUFycihudWxsQXJyKTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpbiBhZGRpbmcgbmV3IGVtcGxveWVlXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9PSBcIlVwZGF0ZVwiKSB7XG4gICAgICAgIGlmICghaXNFcnIpIHtcbiAgICAgICAgICAgIGxldCBlbXBsb3llZUlEID0gaWRPZkVtcDtcbiAgICAgICAgICAgIHB1dGRhdGEuaWQgPSBlbXBsb3llZUlEO1xuICAgICAgICAgICAgYmFzZTY0U3RyaW5nID0gb3JpZ2luYWxEYXRhLmVtcGxveWVlW3VwZGF0ZUluZGV4XS5pbWFnZVNyYztcbiAgICAgICAgICAgIHB1dGRhdGEuaW1nID0gYmFzZTY0U3RyaW5nO1xuICAgICAgICAgICAgcHV0ZGF0YS5lcnJNc2cgPSBhcHBTdHJpbmdzLnVwZGF0ZUVyck1zZztcbiAgICAgICAgICAgIHB1dGRhdGEuc3VjY01zZyA9IGFwcFN0cmluZ3MudXBkYXRlU3VjY2Vzc01zZztcbiAgICAgICAgICAgIHB1dGRhdGEuaW5kZXggPSB1cGRhdGVJbmRleDtcbiAgICAgICAgICAgIC8vcGFzc2luZyBkYXRhIHRvIHVwZGF0ZSBlbXBsb3llZVxuICAgICAgICAgICAgY29uc29sZS5sb2cocHV0ZGF0YSwgXCJwdXRkYXRhIGNyZWF0ZWRcIik7XG4gICAgICAgICAgICBocm1BcHAucHV0RGF0YShwdXRkYXRhLCBmaWxsZW50cnksIHRvYXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVtcGxveWVlSUQsIFwiaWQgdGhhdCBpcyBnb2luZyB0byBiZSB1cGRhdGVkXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codXBkYXRlSW5kZXgsIFwiaW5kZXggdGhhdCBpcyBnb2luZyB0byBiZSB1cGRhdGVkXCIpO1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmRhdGFFbnRyeUZvcm0ub25zdWJtaXQgPSBoYW5kbGVTdWJtaXRDbGljaztcbi8vZGF0YS1lbnRyeS1mb3JtIHNraWxsIHNlY3Rpb24gZnVuY3Rpb25hbGl0aWVzXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuRnVsbHRhYmxlLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIC8vIHNraWxsTmFtZUFyciA9IHNraWxsTmFtZTtcbiAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKHNraWxsTmFtZSk7XG4gICAgfVxufTtcbmZvcm1Ta2lsbC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLW9wdGlvbnNcIikgJiZcbiAgICAgICAgIXNraWxsTmFtZUFyci5pbmNsdWRlcyh0YXJnZXQuaWQpKSB7XG4gICAgICAgIHNraWxsTmFtZUFyci5wdXNoKHRhcmdldC5pZCk7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHt0YXJnZXQuaWR9XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgICAgICAgICAgICAgICAke3RhcmdldC5pZH1cbiAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIGVycm9yIHdoaWxlIHVwZGF0aW5nXCIpO1xuICAgIH1cbn07XG5hZGRlZFNraWxscy5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmRhdGFzZXQucmVtSWQpIHtcbiAgICAgICAgbGV0IHNraWxsTmFtZUFyckNvcHkgPSBza2lsbE5hbWVBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtICE9IHRhcmdldC5kYXRhc2V0LnJlbUlkKTtcbiAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKHNraWxsTmFtZUFyckNvcHkpO1xuICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBza2lsbE5hbWVBcnIuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHtlbGVtfVwiIGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICR7ZWxlbX1cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBza2lsbElucHV0LnZhbHVlID0gXCJub25lXCI7XG59O1xuIiwiLy8gQXBwQ29uc3RhbnRzXG5leHBvcnQgY29uc3QgYXBwQ29uc3RhbnRzID0ge1xuICAgIGFwaTogXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiLFxufTtcbi8vIEFwcFN0cmluZ3NcbmV4cG9ydCBjb25zdCBhcHBTdHJpbmdzID0ge1xuICAgIGFkZFN1Y2Nlc3NNc2c6IFwiU3VjY2VzZnVsbHkgYWRkZWQgZW1wbG95ZWVcIixcbiAgICBhZGRFcnJNc2c6IFwiRXJyb3Igd2hpbGUgYWRkaW5nIGVtcGxveWVlXCIsXG4gICAgdXBkYXRlU3VjY2Vzc01zZzogXCJTdWNjZXNmdWxseSB1cGRhdGVkIGVtcGxveWVlXCIsXG4gICAgdXBkYXRlRXJyTXNnOiBcIkVycm9yIHdoaWxlIHVwZGF0aW5nIGVtcGxveWVlXCIsXG4gICAgZGVsU3VjY2Vzc01zZzogXCJTdWNjZXNmdWxseSBkZWxldGVkIHRoZSBlbXBsb3llZVwiLFxuICAgIGRlbEVyck1zZzogXCJFcnJvciB3aGlsZSBkZWxldGluZyBlbXBsb3llZVwiLFxufTtcbiIsImltcG9ydCB7IGZpbGxlbnRyeSwgZmlyZWJhc2VEYXRhLCB0b2FzdCwgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGhybUFwcCB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5jb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbmZpcm0tYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IGRlbEVtcCA9IChpZCkgPT4ge1xuICAgIGxldCBkZWxJbmRleDtcbiAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGVsZW0gPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAoZWxlbS5pZCA9PSBpZClcbiAgICAgICAgICAgIGRlbEluZGV4ID0gaW5kZXg7XG4gICAgfSk7XG4gICAgLy8gZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCBmaXJlYmFzZURhdGEuZW1wbG95ZWUubGVuZ3RoOyBzdGVwKyspIHtcbiAgICAvLyAgIGlmIChmaXJlYmFzZURhdGEuZW1wbG95ZWVbc3RlcF0gPT0gbnVsbCkgY29udGludWU7XG4gICAgLy8gICBlbHNlIGlmIChmaXJlYmFzZURhdGEuZW1wbG95ZWVbc3RlcF0uaWQgPT0gaWQpIGRlbEluZGV4ID0gc3RlcDtcbiAgICAvLyB9XG4gICAgY29uZmlybUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBocm1BcHAuZGVsZXRlRGF0YShkZWxJbmRleCwgZmlsbGVudHJ5LCB0b2FzdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlbEluZGV4LCBcImluZGV4IHRoYXQgaXMgZ29pbmcgdG8gYmUgZGVsZXRlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coaWQsIFwidGhlIGlkIHRoYXQgaXMgZ29pbmcgdG8gYmUgZGVsZXRlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZmlyZWJhc2VEYXRhLCBcImZpcmViYXNlRGF0YVwiKTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfTtcbn07XG4iLCIvLyBmZXRjaCBza2lsbCBmb3JtIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IG9uIHRoZSBmaWx0ZXIgc2tpbGwgc2VjdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaW1wb3J0IHsgYWN0dWFsRGF0YSwgZmlsdGVyVGFibGUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmNvbnN0IGZpbHRlclNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyLXNlYXJjaC1ib3hcIik7XG5jb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItZmlsdGVyLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBSZW5kZXJGaWx0ZXJCb3ggPSAoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+IHtcbiAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1DaGVja2VkID0gZWxlbTtcbiAgICAgICAgaWYgKGVsZW1DaGVja2VkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuZmlsdGVyU2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBSZW5kZXJGaWx0ZXJCb3gpO1xuY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFyRmlsdGVyKTtcbiIsImltcG9ydCB7IGhhbmRsZVRhYmxlQ2xpY2sgfSBmcm9tIFwiLi90YWJsZUFjdGlvbkJ1dHRvblwiO1xuY29uc3QgZGF0YUVudHJ5U3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRhLWVudHJ5LXN1Ym1pdFwiKTtcbmNvbnN0IGRhdGFFbnRyeUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZm9ybVwiKTtcbmNvbnN0IG1hdGVyaWFsU3ltYm9sc091dGxpbmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIFwiKTtcbmNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuY29uc3QgZGVwYXJ0bWVudEVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBza2lsbFNlbGVjRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuY29uc3QgZGF0YVZpZXdDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LWNsb3NlXCIpO1xuY29uc3QgY2FuY2VsRGVsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtZGVsLWJ1dHRvblwiKTtcbmNvbnN0IGFkZEVtcGxveWVlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtZW1wbG95ZWUtYnV0dG9uXCIpO1xuY29uc3QgZGF0YUVudHJ5Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktY2xvc2VcIik7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5pbXBvcnQgeyBhcHBDb25zdGFudHMgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNvbnN0IGRhdGFWaWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1tb2RhbFwiKTtcbmNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5jb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG5jb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG5pbXBvcnQgeyBzb3J0RnVuIH0gZnJvbSBcIi4vU29ydEZ1blwiO1xuZXhwb3J0IGxldCBhY3R1YWxEYXRhO1xuZXhwb3J0IGxldCBvcmlnaW5hbERhdGE7XG5leHBvcnQgbGV0IGZpcmViYXNlRGF0YTtcbmV4cG9ydCBsZXQgc2tpbGxOYW1lQXJyID0gW107IC8vc3RyaW5nIGFycmF5XG5leHBvcnQgbGV0IHNraWxsTmFtZTtcbmV4cG9ydCBjb25zdCBjaGFuZ2VTa2lsbE5hbWVBcnIgPSAoZWxlbSkgPT4ge1xuICAgIHNraWxsTmFtZUFyciA9IGVsZW07XG59O1xuZXhwb3J0IGNvbnN0IGNoYW5nZVNraWxsTmFtZSA9IChlbGVtKSA9PiB7XG4gICAgc2tpbGxOYW1lID0gZWxlbTtcbn07XG5jb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBmb3JtU2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2tpbGxcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuY29uc3QgdG9hc3RNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0LW1zZ1wiKTtcbmNvbnN0IHRvYXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdFwiKTtcbi8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3QgdG9hc3QgPSAodHlwZSwgbXNnKSA9PiB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdG9hc3RNc2cuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZC5pbm5lckhUTUwgPSBcImVycm9yXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLmJhY2tncm91bmQgPVxuICAgICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoMTExLjRkZWcsIHJnYigyNDYsIDQsIDI2KSAwLjQlLCByZ2IoMjUxLCAxMzksIDM0KSAxMDAuMiUpXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgxNzAlKVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdG9hc3RNc2cuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS5iYWNrZ3JvdW5kID1cbiAgICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDE3OS4xZGVnLCByZ2IoNDMsIDE3MCwgOTYpIDIuMyUsIHJnYigxMjksIDIwNCwgMTA0KSA5OC4zJSlcIjtcbiAgICAgICAgbWF0ZXJpYWxTeW1ib2xzT3V0bGluZWQuaW5uZXJIVE1MID0gXCJkb25lXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgxNzAlKVwiO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDApXCI7XG4gICAgfSwgMzAwMCk7XG59O1xuZXhwb3J0IGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGxldCBkZXAgPSBhY3R1YWxEYXRhLmRlcGFydG1lbnRbb2JqZWxlbS5kZXBhcnRtZW50IC0gMV0uZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgKz0gYFxuICAgIDx0ciBjbGFzcz1cImRhdGEtcm93XCI+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uaWR9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5mdWxsTmFtZX08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmVtYWlsfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2RlcH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJhY3Rpb24tYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJ2aWV3LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL3ZpZXctaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInZpZXcgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9lZGl0LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJFZGl0IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2RlbC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICAgYDtcbiAgICB9KTtcbn07XG4vLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBmaWxsZW50cnkgPSAob2JqKSA9PiB7XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUob2JqLmVtcGxveWVlKTtcbiAgICAvLyBmaWx0ZXIgc2tpbGwgYnV0dG9uIHNjcmlwdFxuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuPC9kaXY+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgZGVwYXJ0bWVudCBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLmRlcGFydG1lbnROYW1lfVwiPiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgcm9sZUVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmoucm9sZS5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgc2tpbGwgaW4gc2tpbGwgc2VsZWN0aW9uIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIGNsYXNzPVwic2tpbGwtb3B0aW9uc1wiIGlkPVwiJHtvYmplbGVtLnNraWxsfVwiIHZhbHVlPVwiJHtvYmplbGVtLnNraWxsfVwiPiR7b2JqZWxlbS5za2lsbH08L29wdGlvbj5gO1xuICAgIH0pO1xufTtcbi8vZmV0Y2hpbmcgZGF0YSB3aG9sZSBkYXRhIGZyb20gZmlyZWJhc2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IGZ1bmN0aW9uIChmaWxsZW50cnkpIHtcbiAgICBmZXRjaChhcHBDb25zdGFudHMuYXBpICsgXCIvLmpzb25cIilcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy8gZmlyZWJhc2VEYXRhID0gZGF0YTtcbiAgICAgICAgZmlyZWJhc2VEYXRhID0gc3RydWN0dXJlZENsb25lKGRhdGEpO1xuICAgICAgICBkYXRhLmVtcGxveWVlID0gZGF0YS5lbXBsb3llZS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgIG9yaWdpbmFsRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgICAgICAgYWN0dWFsRGF0YSA9IGRhdGE7XG4gICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgc29ydEZ1bigpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xufTtcbmZldGNoRGF0YShmaWxsZW50cnkpO1xudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRhYmxlQ2xpY2spO1xuLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbmRhdGFWaWV3Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9jbG9zZSBkYXRhLWRlbC1tb2RhbFxuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9BZGQgZW1wbG95ZWUgZnVuY3Rpb25cbmFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgIGNoYW5nZVNraWxsTmFtZUFycihbXSk7XG4gICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBkYXRhRW50cnlTdWJtaXQudmFsdWUgPSBcIkFkZFwiO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufSk7XG5kYXRhRW50cnlDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vZmlsdGVyQW5kU2VhcmNoIGZ1bmN0aW9uYWxpdHlcbmV4cG9ydCBsZXQgRmlsdGVyQXJyID0gW107XG5leHBvcnQgY29uc3QgZmlsdGVyVGFibGUgPSAoKSA9PiB7XG4gICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudFwiKTtcbiAgICBsZXQgY2hlY2tlZEZpbHRlckFyciA9IFtdO1xuICAgIGlucHV0cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtO1xuICAgICAgICBjb25zdCB0cmlhbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZWxlbWVudC5kYXRhc2V0LnNraWxsSWR9YCk7XG4gICAgICAgIGlmICh0cmlhbC5jaGVja2VkKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZWxlbWVudC5kYXRhc2V0LnNraWxsTnVtO1xuICAgICAgICAgICAgY2hlY2tlZEZpbHRlckFyci5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qgc2VhcmNodmFsdWUgPSBzZWFyY2hCYXIudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICBGaWx0ZXJBcnIgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgIGlmIChzZWFyY2hCYXIudmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgRmlsdGVyQXJyID0gRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5mdWxsTmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2h2YWx1ZSkpO1xuICAgIH1cbiAgICBpZiAoY2hlY2tlZEZpbHRlckFyci5sZW5ndGggIT09IDApIHtcbiAgICAgICAgRmlsdGVyQXJyID0gRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gY2hlY2tlZEZpbHRlckFyci5ldmVyeSgoY2hlY2tFbGVtKSA9PiBlbGVtLnNraWxscy5pbmNsdWRlcyhOdW1iZXIoY2hlY2tFbGVtKSkpKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUoRmlsdGVyQXJyKTtcbn07XG5jb25zdCBjaGFuZ2VTa2lsbFN0YXRlID0gKHNraWxsSWQpID0+IHtcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2tpbGxJZH1gKTtcbiAgICB0ZW1wLmNsaWNrKCk7XG4gICAgZmlsdGVyVGFibGUoKTtcbn07XG5za2lsbExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgY29uc29sZS5sb2codGFyZ2V0KTtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLWVsZW1lbnRcIikgJiZcbiAgICAgICAgdGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIikge1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIklOUFVUXCIgfHwgdGFyZ2V0LnRhZ05hbWUgPT09IFwiTEFCRUxcIikge1xuICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXRDbG9zZXN0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgZmlsdGVyVGFibGUoKTtcbiAgICB9XG59KTtcbnNvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNvcnRGdW4pO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmaWx0ZXJUYWJsZSk7XG4vL3NldHRpbmcgbGltaXQgdG8gZGF0ZSBvZiBiaXJ0aFxubGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0pTT04oKS5zbGljZSgwLCAxMCk7XG5jb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgdG9kYXkpO1xuIiwiY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IGRhdGFWaWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1tb2RhbFwiKTtcbmNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5pbXBvcnQgeyB1cGRhdGVFbXAgfSBmcm9tIFwiLi91cGRhdGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgdmlld01vZGFsIH0gZnJvbSBcIi4vdmlld0VtcGxveWVlXCI7XG5pbXBvcnQgeyBkZWxFbXAgfSBmcm9tIFwiLi9kZWxldGVFbXBsb3llZVwiO1xuZXhwb3J0IGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlldy1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB2aWV3TW9kYWwoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsLWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGVsRW1wKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbiAgICAvLy8gdXBkYXRlIHVzZXIgZGV0YWlscyBmdW5jdGlvbmFsaXR5XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlTdWJtaXQudmFsdWUgPSBcIlVwZGF0ZVwiO1xuICAgICAgICB1cGRhdGVFbXAoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxufTtcbiIsImV4cG9ydCB7fTtcbiIsImltcG9ydCB7IGFjdHVhbERhdGEsIGNoYW5nZVNraWxsTmFtZSwgc2tpbGxOYW1lLCBmaXJlYmFzZURhdGEsIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG4vLyBleHBvcnQgbGV0IHNraWxsTmFtZTogc3RyaW5nW107XG5jb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lXCIpO1xuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpO1xuY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuY29uc3QgZGF0YU9mQmlydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmNvbnN0IGRlcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBsb2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jXCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmxldCB1cGRhdGVJbmRleCA9IDA7XG5sZXQgaWRPZkVtcCA9IDEwMDE7XG5leHBvcnQgY29uc3QgdXBkYXRlRW1wID0gKGlkKSA9PiB7XG4gICAgaWRPZkVtcCA9IGlkO1xuICAgIGxldCBjdXJyT2JqO1xuICAgIGxldCBkZXBhcnRtZW50O1xuICAgIGZpcmViYXNlRGF0YS5lbXBsb3llZS5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlbHNlIGlmIChvYmouaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIGN1cnJPYmogPSBvYmo7XG4gICAgICAgICAgICBmaXJlYmFzZURhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JqID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJPYmouZGVwYXJ0bWVudCA9PSBvYmouZGVwYXJ0bWVudElEKVxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50ID0gb2JqLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IGZpcmViYXNlRGF0YS5lbXBsb3llZS5sZW5ndGg7IHN0ZXArKykge1xuICAgICAgICAgICAgICAgIGlmIChmaXJlYmFzZURhdGEuZW1wbG95ZWVbc3RlcF0gPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdLmlkID09IGN1cnJPYmouaWQpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUluZGV4ID0gc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWUudmFsdWUgPSBgJHtjdXJyT2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbC52YWx1ZSA9IGAke2N1cnJPYmouZW1haWx9YDtcbiAgICAgICAgICAgIGRhdGVPZkpvaW4udmFsdWUgPSBgJHtjdXJyT2JqLmRhdGVPZkJpcnRofWA7XG4gICAgICAgICAgICBkYXRhT2ZCaXJ0aC52YWx1ZSA9IGAke2N1cnJPYmouZGF0ZU9mSm9pbn1gO1xuICAgICAgICAgICAgbG9jSW5wdXQudmFsdWUgPSBgJHtjdXJyT2JqLndvcmtMb2NhdGlvbn1gO1xuICAgICAgICAgICAgcm9sZUlucHV0LnZhbHVlID0gYCR7Y3Vyck9iai5yb2xlfWA7XG4gICAgICAgICAgICBkZXBJbnB1dC52YWx1ZSA9IGAke2RlcGFydG1lbnR9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBza2lsbE5hbWVDb3B5ID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoKGFjYywgZWxlbSkgPT4ge1xuICAgICAgICBpZiAoY3Vyck9iai5za2lsbHMuaW5jbHVkZXMoZWxlbS5za2lsbElEKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgY2hhbmdlU2tpbGxOYW1lKHNraWxsTmFtZUNvcHkpO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2tpbGxOYW1lLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBkYXRhLXJlbS1pZD0ke2VsZW19IGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2VsZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG4gICAgLy8gZmlyZWJhc2VEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgLy8gICBpZiAoZWxlbSA9PSBudWxsKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwibnVsbCBpcyBmb3VuZFwiKTtcbiAgICAvLyAgICAgcmV0dXJuO1xuICAgIC8vICAgfSBlbHNlIGlmIChlbGVtLmlkID09IGN1cnJPYmouaWQpIHVwZGF0ZUluZGV4ID0gaW5kZXg7XG4gICAgLy8gICBlbHNlIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZmlyZWJhc2VEYXRhLCBcImZpcmViYXNlRGF0YSB3aGVuIGZpbmRpbmcgdXBkYXRlIEluZGV4XCIpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGdldHRpbmcgdXBkYXRlSW5kZXhcIik7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHVwZGF0ZUluZGV4LCBcInVwZGF0ZUluZGV4IHdoZW4gZmFpbGVkXCIpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICAgIC8vIGZvcihsZXQgc3RlcD0wO3N0ZXA8ZmlyZWJhc2VEYXRhLmVtcGxveWVlLmxlbmd0aDtzdGVwKyspe1xuICAgIC8vICAgaWYgKGZpcmViYXNlRGF0YS5lbXBsb3llZVtzdGVwXSA9PSBudWxsKSBjb250aW51ZTtcbiAgICAvLyAgIGVsc2UgaWYoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdLmlkID09IGN1cnJPYmouaWQpIHVwZGF0ZUluZGV4PXN0ZXA7XG4gICAgLy8gfVxufTtcbmV4cG9ydCB7IHVwZGF0ZUluZGV4LCBpZE9mRW1wIH07XG4iLCJpbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5jb25zdCBuYW1lVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVZpZXdcIik7XG5jb25zdCBlbWFpbFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsVmlld1wiKTtcbmNvbnN0IGVtcElkVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1wSWRWaWV3XCIpO1xuY29uc3QgZG9qVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qVmlld1wiKTtcbmNvbnN0IGRvYlZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlZpZXdcIik7XG5jb25zdCBkZXBWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBWaWV3XCIpO1xuY29uc3Qgcm9sZVZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVWaWV3XCIpO1xuY29uc3QgbG9jVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jVmlld1wiKTtcbmNvbnN0IGltZ1ZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltZ1wiKTtcbmNvbnN0IHZpZXdTa2lsbEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmlldy1za2lsbC1ib3hcIik7XG5leHBvcnQgY29uc3Qgdmlld01vZGFsID0gKGlkKSA9PiB7XG4gICAgbGV0IHZpZXdPYmo7XG4gICAgbGV0IGRlcGFydG1lbnQ7XG4gICAgYWN0dWFsRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGlmIChlbGVtLmlkID09IGlkKSB7XG4gICAgICAgICAgICB2aWV3T2JqID0gZWxlbTtcbiAgICAgICAgICAgIGFjdHVhbERhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmlld09iai5kZXBhcnRtZW50ID09IG9iai5kZXBhcnRtZW50SUQpXG4gICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnQgPSBvYmouZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5hbWVWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZnVsbE5hbWV9YDtcbiAgICAgICAgICAgIGVtYWlsVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmVtYWlsfWA7XG4gICAgICAgICAgICBlbXBJZFZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5pZH1gO1xuICAgICAgICAgICAgZG9qVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmRhdGVPZkpvaW59YDtcbiAgICAgICAgICAgIGRvYlZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5kYXRlT2ZCaXJ0aH1gO1xuICAgICAgICAgICAgZGVwVmlldy5pbm5lckhUTUwgPSBgJHtkZXBhcnRtZW50fWA7XG4gICAgICAgICAgICByb2xlVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLnJvbGV9YDtcbiAgICAgICAgICAgIGxvY1ZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai53b3JrTG9jYXRpb259YDtcbiAgICAgICAgICAgIC8vIGlmICh2aWV3T2JqLmltYWdlU3JjKSB7XG4gICAgICAgICAgICAvLyAgIGltZ1ZpZXcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke3ZpZXdPYmouaW1hZ2VTcmN9YCk7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGxvYWRpbmcgaW1hZ2VcIik7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBpbWdWaWV3LnNyYyA9IGAke3ZpZXdPYmouaW1hZ2VTcmN9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBlYWNoU2tpbGwgPSBhY3R1YWxEYXRhLnNraWxsLnJlZHVjZSgoYWNjLCBlbGVtKSA9PiB7XG4gICAgICAgIGlmICh2aWV3T2JqLnNraWxscy5pbmNsdWRlcyhlbGVtLnNraWxsSUQpKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2NdO1xuICAgIH0sIFtdKTtcbiAgICB2aWV3U2tpbGxCb3guaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlYWNoU2tpbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICB2aWV3U2tpbGxCb3guaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVhY2gtc2tpbGwtdmlld1wiPiR7ZWxlbX08L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0LnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL1NvcnRGdW4udHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29uc3RhbnRzLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3R5cGUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYWRkVXBkYXRlRW1wbG95ZWUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZGVsZXRlRW1wbG95ZWUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdXBkYXRlRW1wbG95ZWUudHNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy92aWV3RW1wbG95ZWUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=