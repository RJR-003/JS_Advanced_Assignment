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
/* harmony export */   actualData: () => (/* binding */ actualData),
/* harmony export */   firebaseData: () => (/* binding */ firebaseData),
/* harmony export */   hrmApp: () => (/* binding */ hrmApp),
/* harmony export */   originalData: () => (/* binding */ originalData)
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

let firebaseData;
let originalData;
let actualData;
class FirebaseSingleton {
    static getInstance() {
        if (!FirebaseSingleton.instance) {
            FirebaseSingleton.instance = new FirebaseSingleton();
        }
        return FirebaseSingleton.instance;
    }
    // Read items from firebase database
    fetchData(fillentry) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${_constants__WEBPACK_IMPORTED_MODULE_0__.appConstants.databaseUrl}/.json`);
            if (response.ok) {
                const data = yield response.json();
                firebaseData = structuredClone(data);
                data.employee = data.employee.filter(Boolean);
                originalData = structuredClone(data);
                actualData = data;
                fillentry(data);
                return data ? data : [];
            }
            else {
                return [];
            }
        });
    }
    deleteData(index, fillentry, toast) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${_constants__WEBPACK_IMPORTED_MODULE_0__.appConstants.databaseUrl}/employee/${index}.json`, {
                method: "DELETE",
            });
            if (!response.ok) {
                console.error("Error in deleting employee");
                toast(true, _constants__WEBPACK_IMPORTED_MODULE_0__.appStrings.delErrMsg);
            }
            else {
                skillList.innerHTML = "";
                toast(false, _constants__WEBPACK_IMPORTED_MODULE_0__.appStrings.delSuccessMsg);
                this.fetchData(fillentry).then((data) => console.log(data));
            }
        });
    }
    // Create (Add) a new item to the Firebase Realtime Database
    putData(obj, fillentry, toast) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${_constants__WEBPACK_IMPORTED_MODULE_0__.appConstants.databaseUrl}/employee/${obj.index}.json`, {
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
                toast(true, obj.errMsg);
            }
            else {
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
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");



const tableBody = document.querySelector(".table-body");
const sortButton = document.querySelector(".sort-button");
let dirFlag = 1;
// sort functionality
//////////////////////////////////////
const sortFun = () => {
    let arrayToSort = _DataService__WEBPACK_IMPORTED_MODULE_1__.actualData.employee;
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
    putdata.dep = _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.returnDepID(depInput.value, _DataService__WEBPACK_IMPORTED_MODULE_4__.actualData);
    putdata.role = roleInput.value;
    putdata.loc = locInput.value;
    putdata.skill = _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.returnSkillArr(_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr, _DataService__WEBPACK_IMPORTED_MODULE_4__.actualData);
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
            if (_DataService__WEBPACK_IMPORTED_MODULE_4__.originalData.employee) {
                _DataService__WEBPACK_IMPORTED_MODULE_4__.firebaseData.employee.forEach((elem, index) => {
                    if (index > entryIndex)
                        entryIndex = index;
                });
                entryIndex = entryIndex + 1;
            }
            else
                entryIndex = 0;
            let employeeID = 1001;
            if (_DataService__WEBPACK_IMPORTED_MODULE_4__.originalData.employee) {
                employeeID =
                    Number(_DataService__WEBPACK_IMPORTED_MODULE_4__.originalData.employee[_DataService__WEBPACK_IMPORTED_MODULE_4__.originalData.employee.length - 1].id) +
                        1;
            }
            else
                employeeID = 1001;
            putdata.id = employeeID;
            putdata.index = entryIndex;
            putdata.errMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.addErrMsg;
            putdata.succMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.addSuccessMsg;
            //passing data to enter new employee details
            _DataService__WEBPACK_IMPORTED_MODULE_4__.hrmApp.putData(putdata, _script__WEBPACK_IMPORTED_MODULE_0__.fillentry, _script__WEBPACK_IMPORTED_MODULE_0__.toast);
            dataEntryForm.reset();
            addedSkills.innerHTML = "";
            let nullArr = [];
            (0,_script__WEBPACK_IMPORTED_MODULE_0__.changeSkillNameArr)(nullArr);
            overlay.style.display = "none";
            dataEntryModal.style.display = "none";
        }
        else {
            (0,_script__WEBPACK_IMPORTED_MODULE_0__.toast)(true, _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.addErrMsg);
        }
    }
    else if (dataEntrySubmit.value == "Update") {
        if (!isErr) {
            let employeeID = _updateEmployee__WEBPACK_IMPORTED_MODULE_3__.idOfEmp;
            putdata.id = employeeID;
            base64String = _DataService__WEBPACK_IMPORTED_MODULE_4__.originalData.employee[_updateEmployee__WEBPACK_IMPORTED_MODULE_3__.updateIndex].imageSrc;
            putdata.img = base64String;
            putdata.errMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.updateErrMsg;
            putdata.succMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.updateSuccessMsg;
            putdata.index = _updateEmployee__WEBPACK_IMPORTED_MODULE_3__.updateIndex;
            //passing data to update employee
            _DataService__WEBPACK_IMPORTED_MODULE_4__.hrmApp.putData(putdata, _script__WEBPACK_IMPORTED_MODULE_0__.fillentry, _script__WEBPACK_IMPORTED_MODULE_0__.toast);
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
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.toast)(true, _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.updateErrMsg);
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
    databaseUrl: "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app",
};
// AppStrings
const appStrings = {
    addSuccessMsg: "Succesfully added employee",
    addErrMsg: "Error while adding employee",
    updateSuccessMsg: "Succesfully updated employee",
    updateErrMsg: "Error while updating employee",
    delSuccessMsg: "Succesfully deleted the employee",
    delErrMsg: "Error while deleting employee",
    fetchErrMsg: "Error while fetching the data",
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
    confirmButton.onclick = () => {
        _DataService__WEBPACK_IMPORTED_MODULE_1__.hrmApp.deleteData(delIndex, _script__WEBPACK_IMPORTED_MODULE_0__.fillentry, _script__WEBPACK_IMPORTED_MODULE_0__.toast);
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
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");
// fetch skill form firebase and display it on the filter skill section
///////////////////////////////////////////////////////


const skillList = document.querySelector(".skill-list");
const filterSearchBox = document.querySelector(".filter-search-box");
const clearFilterButton = document.querySelector(".clear-filter-button");
const RenderFilterBox = () => {
    let value = filterSearchBox.value;
    value = value.split(" ").join("").toLowerCase();
    skillList.innerHTML = "";
    _DataService__WEBPACK_IMPORTED_MODULE_1__.actualData.skill.forEach((objelem) => {
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
/* harmony export */   changeSkillName: () => (/* binding */ changeSkillName),
/* harmony export */   changeSkillNameArr: () => (/* binding */ changeSkillNameArr),
/* harmony export */   fillentry: () => (/* binding */ fillentry),
/* harmony export */   filterTable: () => (/* binding */ filterTable),
/* harmony export */   firebaseData: () => (/* binding */ firebaseData),
/* harmony export */   skillName: () => (/* binding */ skillName),
/* harmony export */   skillNameArr: () => (/* binding */ skillNameArr),
/* harmony export */   tableCreate: () => (/* binding */ tableCreate),
/* harmony export */   toast: () => (/* binding */ toast)
/* harmony export */ });
/* harmony import */ var _tableActionButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableActionButton */ "./src/tableActionButton.ts");
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");
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
        let dep = _DataService__WEBPACK_IMPORTED_MODULE_1__.originalData.department[objelem.department - 1].departmentName;
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
_DataService__WEBPACK_IMPORTED_MODULE_1__.hrmApp.fetchData(fillentry).then((data) => {
    console.log(data);
    (0,_SortFun__WEBPACK_IMPORTED_MODULE_2__.sortFun)();
});
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
    FilterArr = _DataService__WEBPACK_IMPORTED_MODULE_1__.actualData.employee;
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
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");


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
    _DataService__WEBPACK_IMPORTED_MODULE_1__.firebaseData.employee.forEach((obj) => {
        if (obj == null)
            return;
        else if (obj.id == id) {
            currObj = obj;
            _DataService__WEBPACK_IMPORTED_MODULE_1__.firebaseData.department.forEach((obj) => {
                if (obj == null)
                    return null;
                else if (currObj.department == obj.departmentID)
                    department = obj.departmentName;
            });
            for (let step = 0; step < _DataService__WEBPACK_IMPORTED_MODULE_1__.firebaseData.employee.length; step++) {
                if (_DataService__WEBPACK_IMPORTED_MODULE_1__.firebaseData.employee[step] == null)
                    continue;
                else if (_DataService__WEBPACK_IMPORTED_MODULE_1__.firebaseData.employee[step].id == currObj.id)
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
    let skillNameCopy = _DataService__WEBPACK_IMPORTED_MODULE_1__.actualData.skill.reduce((acc, elem) => {
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
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");

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
    _DataService__WEBPACK_IMPORTED_MODULE_0__.actualData.employee.forEach((elem) => {
        if (elem.id == id) {
            viewObj = elem;
            _DataService__WEBPACK_IMPORTED_MODULE_0__.actualData.department.forEach((obj) => {
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
        }
    });
    let eachSkill = _DataService__WEBPACK_IMPORTED_MODULE_0__.actualData.skill.reduce((acc, elem) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9BcHBTdXBwb3J0RnVuY3Rpb24udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL0RhdGFTZXJ2aWNlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9Tb3J0RnVuLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9hZGRVcGRhdGVFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9kZWxldGVFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvZmlsdGVyQW5kU2VhcmNoRnVuLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy90eXBlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy91cGRhdGVFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdmlld0VtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXBwU3VwcG9ydEZ1biB7XG4gICAgLy9zdGF0aWMgbWV0aG9kIHRvIGNvbnZlcnQgc2tpbGxOYW1lIHRvIHNraWxsIGlkIGFycmF5XG4gICAgc3RhdGljIHJldHVyblNraWxsQXJyKGFyck9mTmFtZXMsIGRhdGEpIHtcbiAgICAgICAgYXJyT2ZOYW1lcyA9IGFyck9mTmFtZXMubWFwKChlbGVtKSA9PiBlbGVtLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBjb25zdCBza2lsbElEQXJyID0gZGF0YS5za2lsbC5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgZWxlbSkge1xuICAgICAgICAgICAgaWYgKGFyck9mTmFtZXMuaW5jbHVkZXMoZWxlbS5za2lsbC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsSURdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2NdO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIHJldHVybiBza2lsbElEQXJyO1xuICAgIH1cbiAgICAvLyBjb252ZXJ0cyBkZXBhcnRtZW50IG5hbWUgdG8gZGVwYXJ0bWVudCBpZFxuICAgIHN0YXRpYyByZXR1cm5EZXBJRChkZXBOYW1lLCBkYXRhKSB7XG4gICAgICAgIGRlcE5hbWUgPSBkZXBOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGRlcElEID0gZGF0YS5kZXBhcnRtZW50LnJlZHVjZSgodmFsdWUsIGVsZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtLmRlcGFydG1lbnROYW1lLnRvTG93ZXJDYXNlKCkgPT0gZGVwTmFtZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gZWxlbS5kZXBhcnRtZW50SUQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9LCAwKTtcbiAgICAgICAgcmV0dXJuIGRlcElEO1xuICAgIH1cbiAgICAvL3N0YXRpYyBtZXRob2QgdG8gcmVhZCBGaWxlIGFzIGJhc2U2NFxuICAgIHN0YXRpYyByZWFkRmlsZUFzQmFzZTY0KGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIGZpbGUgc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKChfYSA9IGUudGFyZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVzdWx0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBhcHBTdHJpbmdzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG5pbXBvcnQgeyBhcHBDb25zdGFudHMgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmV4cG9ydCBsZXQgZmlyZWJhc2VEYXRhO1xuZXhwb3J0IGxldCBvcmlnaW5hbERhdGE7XG5leHBvcnQgbGV0IGFjdHVhbERhdGE7XG5jbGFzcyBGaXJlYmFzZVNpbmdsZXRvbiB7XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAoIUZpcmViYXNlU2luZ2xldG9uLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBGaXJlYmFzZVNpbmdsZXRvbi5pbnN0YW5jZSA9IG5ldyBGaXJlYmFzZVNpbmdsZXRvbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBGaXJlYmFzZVNpbmdsZXRvbi5pbnN0YW5jZTtcbiAgICB9XG4gICAgLy8gUmVhZCBpdGVtcyBmcm9tIGZpcmViYXNlIGRhdGFiYXNlXG4gICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHthcHBDb25zdGFudHMuZGF0YWJhc2VVcmx9Ly5qc29uYCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIGZpcmViYXNlRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgICAgICAgICAgICAgICBkYXRhLmVtcGxveWVlID0gZGF0YS5lbXBsb3llZS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxEYXRhID0gc3RydWN0dXJlZENsb25lKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFjdHVhbERhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YSA/IGRhdGEgOiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlbGV0ZURhdGEoaW5kZXgsIGZpbGxlbnRyeSwgdG9hc3QpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7YXBwQ29uc3RhbnRzLmRhdGFiYXNlVXJsfS9lbXBsb3llZS8ke2luZGV4fS5qc29uYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiBkZWxldGluZyBlbXBsb3llZVwiKTtcbiAgICAgICAgICAgICAgICB0b2FzdCh0cnVlLCBhcHBTdHJpbmdzLmRlbEVyck1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0b2FzdChmYWxzZSwgYXBwU3RyaW5ncy5kZWxTdWNjZXNzTXNnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoRGF0YShmaWxsZW50cnkpLnRoZW4oKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIENyZWF0ZSAoQWRkKSBhIG5ldyBpdGVtIHRvIHRoZSBGaXJlYmFzZSBSZWFsdGltZSBEYXRhYmFzZVxuICAgIHB1dERhdGEob2JqLCBmaWxsZW50cnksIHRvYXN0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke2FwcENvbnN0YW50cy5kYXRhYmFzZVVybH0vZW1wbG95ZWUvJHtvYmouaW5kZXh9Lmpzb25gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZU9mQmlydGg6IG9iai5kb2IsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVPZkpvaW46IG9iai5kb2osXG4gICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnQ6IG9iai5kZXAsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBvYmouaWQsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IG9iai5yb2xlLFxuICAgICAgICAgICAgICAgICAgICBza2lsbHM6IG9iai5za2lsbCxcbiAgICAgICAgICAgICAgICAgICAgd29ya0xvY2F0aW9uOiBvYmoubG9jLFxuICAgICAgICAgICAgICAgICAgICBmdWxsTmFtZTogb2JqLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBvYmouZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3JjOiBvYmouaW1nLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdG9hc3QodHJ1ZSwgb2JqLmVyck1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2FzdChmYWxzZSwgb2JqLnN1Y2NNc2cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbiAgICAgICAgICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoRGF0YShmaWxsZW50cnkpLnRoZW4oKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGhybUFwcCA9IEZpcmViYXNlU2luZ2xldG9uLmdldEluc3RhbmNlKCk7XG4iLCJpbXBvcnQgeyB0YWJsZUNyZWF0ZSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgYWN0dWFsRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaWx0ZXJBcnIgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbmNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xubGV0IGRpckZsYWcgPSAxO1xuLy8gc29ydCBmdW5jdGlvbmFsaXR5XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IHNvcnRGdW4gPSAoKSA9PiB7XG4gICAgbGV0IGFycmF5VG9Tb3J0ID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoRmlsdGVyQXJyLmxlbmd0aCAhPT0gMClcbiAgICAgICAgYXJyYXlUb1NvcnQgPSBGaWx0ZXJBcnI7XG4gICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBuYW1lMSA9IGEuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbmFtZTIgPSBiLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgaWYgKG5hbWUxID4gbmFtZTIpIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb24gPSAxICogZGlyRmxhZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lMSA8IG5hbWUyKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uID0gLTEgKiBkaXJGbGFnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wYXJpc29uO1xuICAgIH0pO1xuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKGFyclRvUmVuZGVyKTtcbiAgICBpZiAoZGlyRmxhZyA9PSAxKSB7XG4gICAgICAgIHNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL2Rvd24tYXJyb3cuc3ZnXCI7XG4gICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy91cC1hcnJvdy5zdmdcIjtcbiAgICB9XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBmaWxsZW50cnksIHNraWxsTmFtZUFyciwgY2hhbmdlU2tpbGxOYW1lQXJyLCB0b2FzdCB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgQXBwU3VwcG9ydEZ1biB9IGZyb20gXCIuL0FwcFN1cHBvcnRGdW5jdGlvblwiO1xuaW1wb3J0IHsgYXBwU3RyaW5ncyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdXBkYXRlSW5kZXgsIGlkT2ZFbXAgfSBmcm9tIFwiLi91cGRhdGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgc2tpbGxOYW1lIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBocm1BcHAsIGZpcmViYXNlRGF0YSwgb3JpZ2luYWxEYXRhLCBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIik7XG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIik7XG5jb25zdCBkYXRlT2ZKb2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pcIik7XG5jb25zdCBkYXRhT2ZCaXJ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iXCIpO1xuY29uc3QgZGVwSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmNvbnN0IHJvbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbmNvbnN0IGxvY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NcIik7XG5jb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBmb3JtU2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2tpbGxcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuY29uc3QgZGF0YUVudHJ5TmFtZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW5hbWUtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlEb2pBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kb2otYWxlcnQgXCIpO1xuY29uc3QgZGF0YUVudHJ5RG9iQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZG9iLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5Um9sZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LXJvbGUtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlEZXBBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kZXAtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlMb2NBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1sb2MtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlTa2lsbEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LXNraWxsLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5U3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRhLWVudHJ5LXN1Ym1pdFwiKTtcbmNvbnN0IGRhdGFFbnRyeUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZm9ybVwiKTtcbmNvbnN0IGRhdGFFbnRyeUVtYWlsQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZW1haWwtYWxlcnRcIik7XG5sZXQgcHV0ZGF0YSA9IHtcbiAgICBpbmRleDogMCxcbiAgICBpZDogMCxcbiAgICBuYW1lOiBcIlwiLFxuICAgIGVtYWlsOiBcIlwiLFxuICAgIGRvajogXCJcIixcbiAgICBkb2I6IFwiXCIsXG4gICAgZGVwOiAwLFxuICAgIHJvbGU6IFwiXCIsXG4gICAgbG9jOiBcIlwiLFxuICAgIHNraWxsOiBbXSxcbiAgICBpbWc6IFwiXCIsXG4gICAgZXJyTXNnOiBcIlwiLFxuICAgIHN1Y2NNc2c6IFwiXCIsXG59O1xuLy9oYW5kbGluZyB0aGUgc3VibWl0IGJ1dHRvbiBjbGlja1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBoYW5kbGVTdWJtaXRDbGljayA9IChlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGJhc2U2NFN0cmluZztcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy90YWtpbmcgaW1hZ2UgZnJvbSB1c2VyXG4gICAgY29uc3QgaW1nRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1pbnB1dFwiKTtcbiAgICBjb25zdCBpbWdGaWxlID0gKF9hID0gaW1nRWxlbS5maWxlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xuICAgIHRyeSB7XG4gICAgICAgIGJhc2U2NFN0cmluZyA9IHlpZWxkIEFwcFN1cHBvcnRGdW4ucmVhZEZpbGVBc0Jhc2U2NChpbWdGaWxlKTtcbiAgICAgICAgcHV0ZGF0YS5pbWcgPSBiYXNlNjRTdHJpbmc7IC8vZGF0YSB0byBiZSBzZW50IHRvIHB1dERhdGEgZnVuY3Rpb25cbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGZldGNoaW5nIGJhc2U2NFN0cmluZ1wiKTtcbiAgICB9XG4gICAgcHV0ZGF0YS5uYW1lID0gbmFtZS52YWx1ZTtcbiAgICBwdXRkYXRhLmVtYWlsID0gZW1haWwudmFsdWU7XG4gICAgcHV0ZGF0YS5kb2ogPSBkYXRlT2ZKb2luLnZhbHVlO1xuICAgIHB1dGRhdGEuZG9iID0gZGF0YU9mQmlydGgudmFsdWU7XG4gICAgcHV0ZGF0YS5kZXAgPSBBcHBTdXBwb3J0RnVuLnJldHVybkRlcElEKGRlcElucHV0LnZhbHVlLCBhY3R1YWxEYXRhKTtcbiAgICBwdXRkYXRhLnJvbGUgPSByb2xlSW5wdXQudmFsdWU7XG4gICAgcHV0ZGF0YS5sb2MgPSBsb2NJbnB1dC52YWx1ZTtcbiAgICBwdXRkYXRhLnNraWxsID0gQXBwU3VwcG9ydEZ1bi5yZXR1cm5Ta2lsbEFycihza2lsbE5hbWVBcnIsIGFjdHVhbERhdGEpO1xuICAgIGxldCBpc0VyciA9IGZhbHNlO1xuICAgIGlmIChwdXRkYXRhLm5hbWUubGVuZ3RoIDwgMikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeU5hbWVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeU5hbWVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFwdXRkYXRhLmRvaikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURvakFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RG9qQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5kb2IpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEb2JBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURvYkFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAocHV0ZGF0YS5yb2xlID09PSBcIm5vbmVcIikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeVJvbGVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeVJvbGVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFwdXRkYXRhLmRlcCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURlcEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RGVwQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChwdXRkYXRhLmxvYyA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlMb2NBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeUxvY0FsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIXB1dGRhdGEuc2tpbGwubGVuZ3RoKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5U2tpbGxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeVNraWxsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghZW1haWwuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgIGRhdGFFbnRyeUVtYWlsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlFbWFpbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoZGF0YUVudHJ5U3VibWl0LnZhbHVlID09IFwiQWRkXCIpIHtcbiAgICAgICAgaWYgKCFpc0Vycikge1xuICAgICAgICAgICAgbGV0IGVudHJ5SW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsRGF0YS5lbXBsb3llZSkge1xuICAgICAgICAgICAgICAgIGZpcmViYXNlRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBlbnRyeUluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSBlbnRyeUluZGV4ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gMDtcbiAgICAgICAgICAgIGxldCBlbXBsb3llZUlEID0gMTAwMTtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbERhdGEuZW1wbG95ZWUpIHtcbiAgICAgICAgICAgICAgICBlbXBsb3llZUlEID1cbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyKG9yaWdpbmFsRGF0YS5lbXBsb3llZVtvcmlnaW5hbERhdGEuZW1wbG95ZWUubGVuZ3RoIC0gMV0uaWQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZW1wbG95ZWVJRCA9IDEwMDE7XG4gICAgICAgICAgICBwdXRkYXRhLmlkID0gZW1wbG95ZWVJRDtcbiAgICAgICAgICAgIHB1dGRhdGEuaW5kZXggPSBlbnRyeUluZGV4O1xuICAgICAgICAgICAgcHV0ZGF0YS5lcnJNc2cgPSBhcHBTdHJpbmdzLmFkZEVyck1zZztcbiAgICAgICAgICAgIHB1dGRhdGEuc3VjY01zZyA9IGFwcFN0cmluZ3MuYWRkU3VjY2Vzc01zZztcbiAgICAgICAgICAgIC8vcGFzc2luZyBkYXRhIHRvIGVudGVyIG5ldyBlbXBsb3llZSBkZXRhaWxzXG4gICAgICAgICAgICBocm1BcHAucHV0RGF0YShwdXRkYXRhLCBmaWxsZW50cnksIHRvYXN0KTtcbiAgICAgICAgICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgbnVsbEFyciA9IFtdO1xuICAgICAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKG51bGxBcnIpO1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b2FzdCh0cnVlLCBhcHBTdHJpbmdzLmFkZEVyck1zZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YUVudHJ5U3VibWl0LnZhbHVlID09IFwiVXBkYXRlXCIpIHtcbiAgICAgICAgaWYgKCFpc0Vycikge1xuICAgICAgICAgICAgbGV0IGVtcGxveWVlSUQgPSBpZE9mRW1wO1xuICAgICAgICAgICAgcHV0ZGF0YS5pZCA9IGVtcGxveWVlSUQ7XG4gICAgICAgICAgICBiYXNlNjRTdHJpbmcgPSBvcmlnaW5hbERhdGEuZW1wbG95ZWVbdXBkYXRlSW5kZXhdLmltYWdlU3JjO1xuICAgICAgICAgICAgcHV0ZGF0YS5pbWcgPSBiYXNlNjRTdHJpbmc7XG4gICAgICAgICAgICBwdXRkYXRhLmVyck1zZyA9IGFwcFN0cmluZ3MudXBkYXRlRXJyTXNnO1xuICAgICAgICAgICAgcHV0ZGF0YS5zdWNjTXNnID0gYXBwU3RyaW5ncy51cGRhdGVTdWNjZXNzTXNnO1xuICAgICAgICAgICAgcHV0ZGF0YS5pbmRleCA9IHVwZGF0ZUluZGV4O1xuICAgICAgICAgICAgLy9wYXNzaW5nIGRhdGEgdG8gdXBkYXRlIGVtcGxveWVlXG4gICAgICAgICAgICBocm1BcHAucHV0RGF0YShwdXRkYXRhLCBmaWxsZW50cnksIHRvYXN0KTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5kYXRhRW50cnlGb3JtLm9uc3VibWl0ID0gaGFuZGxlU3VibWl0Q2xpY2s7XG4vL2RhdGEtZW50cnktZm9ybSBza2lsbCBzZWN0aW9uIGZ1bmN0aW9uYWxpdGllc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbkZ1bGx0YWJsZS5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoc2tpbGxOYW1lKTtcbiAgICB9XG59O1xuZm9ybVNraWxsLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtb3B0aW9uc1wiKSAmJlxuICAgICAgICAhc2tpbGxOYW1lQXJyLmluY2x1ZGVzKHRhcmdldC5pZCkpIHtcbiAgICAgICAgc2tpbGxOYW1lQXJyLnB1c2godGFyZ2V0LmlkKTtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke3RhcmdldC5pZH1cIiBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAgICAgICAgICR7dGFyZ2V0LmlkfVxuICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdG9hc3QodHJ1ZSwgYXBwU3RyaW5ncy51cGRhdGVFcnJNc2cpO1xuICAgIH1cbn07XG5hZGRlZFNraWxscy5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmRhdGFzZXQucmVtSWQpIHtcbiAgICAgICAgbGV0IHNraWxsTmFtZUFyckNvcHkgPSBza2lsbE5hbWVBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtICE9IHRhcmdldC5kYXRhc2V0LnJlbUlkKTtcbiAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKHNraWxsTmFtZUFyckNvcHkpO1xuICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBza2lsbE5hbWVBcnIuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHtlbGVtfVwiIGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICR7ZWxlbX1cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBza2lsbElucHV0LnZhbHVlID0gXCJub25lXCI7XG59O1xuIiwiLy8gQXBwQ29uc3RhbnRzXG5leHBvcnQgY29uc3QgYXBwQ29uc3RhbnRzID0ge1xuICAgIGRhdGFiYXNlVXJsOiBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCIsXG59O1xuLy8gQXBwU3RyaW5nc1xuZXhwb3J0IGNvbnN0IGFwcFN0cmluZ3MgPSB7XG4gICAgYWRkU3VjY2Vzc01zZzogXCJTdWNjZXNmdWxseSBhZGRlZCBlbXBsb3llZVwiLFxuICAgIGFkZEVyck1zZzogXCJFcnJvciB3aGlsZSBhZGRpbmcgZW1wbG95ZWVcIixcbiAgICB1cGRhdGVTdWNjZXNzTXNnOiBcIlN1Y2Nlc2Z1bGx5IHVwZGF0ZWQgZW1wbG95ZWVcIixcbiAgICB1cGRhdGVFcnJNc2c6IFwiRXJyb3Igd2hpbGUgdXBkYXRpbmcgZW1wbG95ZWVcIixcbiAgICBkZWxTdWNjZXNzTXNnOiBcIlN1Y2Nlc2Z1bGx5IGRlbGV0ZWQgdGhlIGVtcGxveWVlXCIsXG4gICAgZGVsRXJyTXNnOiBcIkVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIsXG4gICAgZmV0Y2hFcnJNc2c6IFwiRXJyb3Igd2hpbGUgZmV0Y2hpbmcgdGhlIGRhdGFcIixcbn07XG4iLCJpbXBvcnQgeyBmaWxsZW50cnksIGZpcmViYXNlRGF0YSwgdG9hc3QgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGhybUFwcCB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbmZpcm0tYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IGRlbEVtcCA9IChpZCkgPT4ge1xuICAgIGxldCBkZWxJbmRleDtcbiAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGVsZW0gPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAoZWxlbS5pZCA9PSBpZClcbiAgICAgICAgICAgIGRlbEluZGV4ID0gaW5kZXg7XG4gICAgfSk7XG4gICAgY29uZmlybUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBocm1BcHAuZGVsZXRlRGF0YShkZWxJbmRleCwgZmlsbGVudHJ5LCB0b2FzdCk7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH07XG59O1xuIiwiLy8gZmV0Y2ggc2tpbGwgZm9ybSBmaXJlYmFzZSBhbmQgZGlzcGxheSBpdCBvbiB0aGUgZmlsdGVyIHNraWxsIHNlY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmltcG9ydCB7IGZpbHRlclRhYmxlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmNvbnN0IGZpbHRlclNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyLXNlYXJjaC1ib3hcIik7XG5jb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItZmlsdGVyLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBSZW5kZXJGaWx0ZXJCb3ggPSAoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+IHtcbiAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1DaGVja2VkID0gZWxlbTtcbiAgICAgICAgaWYgKGVsZW1DaGVja2VkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuZmlsdGVyU2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBSZW5kZXJGaWx0ZXJCb3gpO1xuY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFyRmlsdGVyKTtcbiIsImltcG9ydCB7IGhhbmRsZVRhYmxlQ2xpY2sgfSBmcm9tIFwiLi90YWJsZUFjdGlvbkJ1dHRvblwiO1xuaW1wb3J0IHsgaHJtQXBwIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5jb25zdCBkYXRhRW50cnlGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWZvcm1cIik7XG5jb25zdCBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCBcIik7XG5jb25zdCBzb3J0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0LWJ1dHRvblwiKTtcbmNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWlucHV0LWJveFwiKTtcbmNvbnN0IGRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuY29uc3Qgcm9sZUVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuY29uc3Qgc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IGRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbmNvbnN0IGNhbmNlbERlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLWRlbC1idXR0b25cIik7XG5jb25zdCBhZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbmNvbnN0IGRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG5jb25zdCB0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmltcG9ydCB7IHNvcnRGdW4gfSBmcm9tIFwiLi9Tb3J0RnVuXCI7XG5pbXBvcnQgeyBvcmlnaW5hbERhdGEsIGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuZXhwb3J0IGxldCBmaXJlYmFzZURhdGE7XG5leHBvcnQgbGV0IHNraWxsTmFtZUFyciA9IFtdOyAvL3N0cmluZyBhcnJheVxuZXhwb3J0IGxldCBza2lsbE5hbWU7XG5leHBvcnQgY29uc3QgY2hhbmdlU2tpbGxOYW1lQXJyID0gKGVsZW0pID0+IHtcbiAgICBza2lsbE5hbWVBcnIgPSBlbGVtO1xufTtcbmV4cG9ydCBjb25zdCBjaGFuZ2VTa2lsbE5hbWUgPSAoZWxlbSkgPT4ge1xuICAgIHNraWxsTmFtZSA9IGVsZW07XG59O1xuY29uc3Qgc2tpbGxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2tpbGxcIik7XG5jb25zdCBGdWxsdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlXCIpO1xuY29uc3QgZm9ybVNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLXNraWxsXCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmNvbnN0IHRvYXN0TXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdC1tc2dcIik7XG5jb25zdCB0b2FzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9hc3RcIik7XG4vL2dlbmVyYWwgdGFibGUgcmVuZGVyaW5nIGZ1bmN0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IHRvYXN0ID0gKHR5cGUsIG1zZykgPT4ge1xuICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRvYXN0TXNnLmlubmVySFRNTCA9IG1zZztcbiAgICAgICAgbWF0ZXJpYWxTeW1ib2xzT3V0bGluZWQuaW5uZXJIVE1MID0gXCJlcnJvclwiO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS5iYWNrZ3JvdW5kID1cbiAgICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDExMS40ZGVnLCByZ2IoMjQ2LCA0LCAyNikgMC40JSwgcmdiKDI1MSwgMTM5LCAzNCkgMTAwLjIlKVwiO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMTcwJSlcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRvYXN0TXNnLmlubmVySFRNTCA9IG1zZztcbiAgICAgICAgdG9hc3REaXYuc3R5bGUuYmFja2dyb3VuZCA9XG4gICAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCgxNzkuMWRlZywgcmdiKDQzLCAxNzAsIDk2KSAyLjMlLCByZ2IoMTI5LCAyMDQsIDEwNCkgOTguMyUpXCI7XG4gICAgICAgIG1hdGVyaWFsU3ltYm9sc091dGxpbmVkLmlubmVySFRNTCA9IFwiZG9uZVwiO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMTcwJSlcIjtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgwKVwiO1xuICAgIH0sIDMwMDApO1xufTtcbmV4cG9ydCBjb25zdCB0YWJsZUNyZWF0ZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBsZXQgZGVwID0gb3JpZ2luYWxEYXRhLmRlcGFydG1lbnRbb2JqZWxlbS5kZXBhcnRtZW50IC0gMV0uZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgKz0gYFxuICAgIDx0ciBjbGFzcz1cImRhdGEtcm93XCI+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uaWR9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5mdWxsTmFtZX08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmVtYWlsfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2RlcH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJhY3Rpb24tYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJ2aWV3LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL3ZpZXctaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInZpZXcgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9lZGl0LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJFZGl0IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2RlbC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICAgYDtcbiAgICB9KTtcbn07XG4vLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBmaWxsZW50cnkgPSAob2JqKSA9PiB7XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUob2JqLmVtcGxveWVlKTtcbiAgICAvLyBmaWx0ZXIgc2tpbGwgYnV0dG9uIHNjcmlwdFxuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuPC9kaXY+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgZGVwYXJ0bWVudCBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLmRlcGFydG1lbnROYW1lfVwiPiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgcm9sZUVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmoucm9sZS5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgc2tpbGwgaW4gc2tpbGwgc2VsZWN0aW9uIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIGNsYXNzPVwic2tpbGwtb3B0aW9uc1wiIGlkPVwiJHtvYmplbGVtLnNraWxsfVwiIHZhbHVlPVwiJHtvYmplbGVtLnNraWxsfVwiPiR7b2JqZWxlbS5za2lsbH08L29wdGlvbj5gO1xuICAgIH0pO1xufTtcbi8vZmV0Y2hpbmcgZGF0YSB3aG9sZSBkYXRhIGZyb20gZmlyZWJhc2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaHJtQXBwLmZldGNoRGF0YShmaWxsZW50cnkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBzb3J0RnVuKCk7XG59KTtcbnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUYWJsZUNsaWNrKTtcbi8vY2xvc2UgZGF0YS12aWV3LW1vZGFsXG5kYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vY2xvc2UgZGF0YS1kZWwtbW9kYWxcbmNhbmNlbERlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vQWRkIGVtcGxveWVlIGZ1bmN0aW9uXG5hZGRFbXBsb3llZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoW10pO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZGF0YUVudHJ5U3VibWl0LnZhbHVlID0gXCJBZGRcIjtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn0pO1xuZGF0YUVudHJ5Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkYXRhRW50cnlGb3JtLnJlc2V0KCk7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL2ZpbHRlckFuZFNlYXJjaCBmdW5jdGlvbmFsaXR5XG5leHBvcnQgbGV0IEZpbHRlckFyciA9IFtdO1xuZXhwb3J0IGNvbnN0IGZpbHRlclRhYmxlID0gKCkgPT4ge1xuICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnRcIik7XG4gICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbTtcbiAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICBpZiAodHJpYWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGVsZW1lbnQuZGF0YXNldC5za2lsbE51bTtcbiAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgRmlsdGVyQXJyID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0uZnVsbE5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNodmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrZWRGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgfVxuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKEZpbHRlckFycik7XG59O1xuY29uc3QgY2hhbmdlU2tpbGxTdGF0ZSA9IChza2lsbElkKSA9PiB7XG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgdGVtcC5jbGljaygpO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuc2tpbGxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSAmJlxuICAgICAgICB0YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXQuZGF0YXNldC5za2lsbElkO1xuICAgICAgICBjaGFuZ2VTa2lsbFN0YXRlKGRhdGFzZXQpO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IFwiSU5QVVRcIiB8fCB0YXJnZXQudGFnTmFtZSA9PT0gXCJMQUJFTFwiKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldENsb3Nlc3QgPSB0YXJnZXQuY2xvc2VzdChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldENsb3Nlc3QuZGF0YXNldC5za2lsbElkO1xuICAgICAgICBmaWx0ZXJUYWJsZSgpO1xuICAgIH1cbn0pO1xuc29ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc29ydEZ1bik7XG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZpbHRlclRhYmxlKTtcbi8vc2V0dGluZyBsaW1pdCB0byBkYXRlIG9mIGJpcnRoXG5sZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvSlNPTigpLnNsaWNlKDAsIDEwKTtcbmNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iXCIpO1xuZGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcIm1heFwiLCB0b2RheSk7XG4iLCJjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuY29uc3QgZGF0YUVudHJ5U3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRhLWVudHJ5LXN1Ym1pdFwiKTtcbmltcG9ydCB7IHVwZGF0ZUVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyB2aWV3TW9kYWwgfSBmcm9tIFwiLi92aWV3RW1wbG95ZWVcIjtcbmltcG9ydCB7IGRlbEVtcCB9IGZyb20gXCIuL2RlbGV0ZUVtcGxveWVlXCI7XG5leHBvcnQgY29uc3QgaGFuZGxlVGFibGVDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aWV3LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHZpZXdNb2RhbChOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWwtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkZWxFbXAoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxuICAgIC8vLyB1cGRhdGUgdXNlciBkZXRhaWxzIGZ1bmN0aW9uYWxpdHlcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9IFwiVXBkYXRlXCI7XG4gICAgICAgIHVwZGF0ZUVtcChOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IHt9O1xuIiwiaW1wb3J0IHsgY2hhbmdlU2tpbGxOYW1lLCBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGFjdHVhbERhdGEsIGZpcmViYXNlRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG4vLyBleHBvcnQgbGV0IHNraWxsTmFtZTogc3RyaW5nW107XG5jb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lXCIpO1xuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpO1xuY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuY29uc3QgZGF0YU9mQmlydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmNvbnN0IGRlcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBsb2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jXCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmxldCB1cGRhdGVJbmRleCA9IDA7XG5sZXQgaWRPZkVtcCA9IDEwMDE7XG5leHBvcnQgY29uc3QgdXBkYXRlRW1wID0gKGlkKSA9PiB7XG4gICAgaWRPZkVtcCA9IGlkO1xuICAgIGxldCBjdXJyT2JqO1xuICAgIGxldCBkZXBhcnRtZW50O1xuICAgIGZpcmViYXNlRGF0YS5lbXBsb3llZS5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlbHNlIGlmIChvYmouaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIGN1cnJPYmogPSBvYmo7XG4gICAgICAgICAgICBmaXJlYmFzZURhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JqID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJPYmouZGVwYXJ0bWVudCA9PSBvYmouZGVwYXJ0bWVudElEKVxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50ID0gb2JqLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IGZpcmViYXNlRGF0YS5lbXBsb3llZS5sZW5ndGg7IHN0ZXArKykge1xuICAgICAgICAgICAgICAgIGlmIChmaXJlYmFzZURhdGEuZW1wbG95ZWVbc3RlcF0gPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdLmlkID09IGN1cnJPYmouaWQpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUluZGV4ID0gc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWUudmFsdWUgPSBgJHtjdXJyT2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbC52YWx1ZSA9IGAke2N1cnJPYmouZW1haWx9YDtcbiAgICAgICAgICAgIGRhdGVPZkpvaW4udmFsdWUgPSBgJHtjdXJyT2JqLmRhdGVPZkJpcnRofWA7XG4gICAgICAgICAgICBkYXRhT2ZCaXJ0aC52YWx1ZSA9IGAke2N1cnJPYmouZGF0ZU9mSm9pbn1gO1xuICAgICAgICAgICAgbG9jSW5wdXQudmFsdWUgPSBgJHtjdXJyT2JqLndvcmtMb2NhdGlvbn1gO1xuICAgICAgICAgICAgcm9sZUlucHV0LnZhbHVlID0gYCR7Y3Vyck9iai5yb2xlfWA7XG4gICAgICAgICAgICBkZXBJbnB1dC52YWx1ZSA9IGAke2RlcGFydG1lbnR9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBza2lsbE5hbWVDb3B5ID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoKGFjYywgZWxlbSkgPT4ge1xuICAgICAgICBpZiAoY3Vyck9iai5za2lsbHMuaW5jbHVkZXMoZWxlbS5za2lsbElEKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgY2hhbmdlU2tpbGxOYW1lKHNraWxsTmFtZUNvcHkpO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2tpbGxOYW1lLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBkYXRhLXJlbS1pZD0ke2VsZW19IGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2VsZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG59O1xuZXhwb3J0IHsgdXBkYXRlSW5kZXgsIGlkT2ZFbXAgfTtcbiIsImltcG9ydCB7IGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuY29uc3QgbmFtZVZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVWaWV3XCIpO1xuY29uc3QgZW1haWxWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFZpZXdcIik7XG5jb25zdCBlbXBJZFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtcElkVmlld1wiKTtcbmNvbnN0IGRvalZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvalZpZXdcIik7XG5jb25zdCBkb2JWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JWaWV3XCIpO1xuY29uc3QgZGVwVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwVmlld1wiKTtcbmNvbnN0IHJvbGVWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlVmlld1wiKTtcbmNvbnN0IGxvY1ZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1ZpZXdcIik7XG5jb25zdCBpbWdWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWdcIik7XG5jb25zdCB2aWV3U2tpbGxCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpZXctc2tpbGwtYm94XCIpO1xuZXhwb3J0IGNvbnN0IHZpZXdNb2RhbCA9IChpZCkgPT4ge1xuICAgIGxldCB2aWV3T2JqO1xuICAgIGxldCBkZXBhcnRtZW50O1xuICAgIGFjdHVhbERhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBpZiAoZWxlbS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgdmlld09iaiA9IGVsZW07XG4gICAgICAgICAgICBhY3R1YWxEYXRhLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdPYmouZGVwYXJ0bWVudCA9PSBvYmouZGVwYXJ0bWVudElEKVxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50ID0gb2JqLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuYW1lVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbFZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5lbWFpbH1gO1xuICAgICAgICAgICAgZW1wSWRWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouaWR9YDtcbiAgICAgICAgICAgIGRvalZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5kYXRlT2ZKb2lufWA7XG4gICAgICAgICAgICBkb2JWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZGF0ZU9mQmlydGh9YDtcbiAgICAgICAgICAgIGRlcFZpZXcuaW5uZXJIVE1MID0gYCR7ZGVwYXJ0bWVudH1gO1xuICAgICAgICAgICAgcm9sZVZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5yb2xlfWA7XG4gICAgICAgICAgICBsb2NWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmoud29ya0xvY2F0aW9ufWA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgZWFjaFNraWxsID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoKGFjYywgZWxlbSkgPT4ge1xuICAgICAgICBpZiAodmlld09iai5za2lsbHMuaW5jbHVkZXMoZWxlbS5za2lsbElEKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgdmlld1NraWxsQm94LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZWFjaFNraWxsLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgdmlld1NraWxsQm94LmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlYWNoLXNraWxsLXZpZXdcIj4ke2VsZW19PC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9maWx0ZXJBbmRTZWFyY2hGdW4udHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdC50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Tb3J0RnVuLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnN0YW50cy50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90eXBlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FkZFVwZGF0ZUVtcGxveWVlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2RlbGV0ZUVtcGxveWVlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3VwZGF0ZUVtcGxveWVlLnRzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdmlld0VtcGxveWVlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9