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
const formImg = document.querySelector(".data-entry-modal-img");
const imgElem = document.querySelector(".profile-input");
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
// image generating function
///////////////////////////////////////////////////////////
let base64String1;
const addImgToForm = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let imgFile1 = (_a = imgElem.files) === null || _a === void 0 ? void 0 : _a[0];
    try {
        base64String1 = yield _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.readFileAsBase64(imgFile1);
        putdata.img = base64String1;
    }
    catch (_b) {
        console.log("error while fetching base64String");
    }
    if (imgFile1 == undefined) {
        base64String1 = "../assets/images/profile.png";
    }
});
imgElem.addEventListener("input", addImgToForm);
//handling the submit button click
/////////////////////////////////////////////////////////////////////////////////////////////
const handleSubmitClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    let base64String;
    e.preventDefault();
    //taking image from user
    const imgFile = (_c = imgElem.files) === null || _c === void 0 ? void 0 : _c[0];
    console.log(imgFile, "image file that is given to upload");
    try {
        base64String = yield _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.readFileAsBase64(imgFile);
        putdata.img = base64String; //data to be sent to putData function
    }
    catch (err) {
        console.log("error while fetching base64String");
    }
    if (imgFile == undefined) {
        base64String = "../assets/images/profile.png";
    }
    putdata.name = name.value;
    putdata.email = email.value;
    putdata.doj = dateOfJoin.value;
    putdata.dob = dataOfBirth.value;
    putdata.dep = _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.returnDepID(depInput.value, _DataService__WEBPACK_IMPORTED_MODULE_4__.actualData);
    putdata.role = roleInput.value;
    putdata.loc = locInput.value;
    putdata.skill = _AppSupportFunction__WEBPACK_IMPORTED_MODULE_1__.AppSupportFun.returnSkillArr(_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr, _DataService__WEBPACK_IMPORTED_MODULE_4__.actualData);
    putdata.img = base64String;
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
            putdata.errMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.updateErrMsg;
            putdata.succMsg = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.updateSuccessMsg;
            putdata.index = _updateEmployee__WEBPACK_IMPORTED_MODULE_3__.updateIndex;
            //passing data to update employee
            console.log(_updateEmployee__WEBPACK_IMPORTED_MODULE_3__.updateIndex, "index to be updated");
            console.log(putdata.img, "image that is going to be updated");
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
const formImg = document.querySelector(".data-entry-modal-img");
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
    formImg.src = "../assets/images/profile.png";
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
            imgView.src = `${viewObj.imageSrc}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDN0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL0FwcFN1cHBvcnRGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvRGF0YVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL1NvcnRGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2FkZFVwZGF0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2RlbGV0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9maWx0ZXJBbmRTZWFyY2hGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3NjcmlwdC50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3R5cGUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3VwZGF0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy92aWV3RW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcHBTdXBwb3J0RnVuIHtcbiAgICAvL3N0YXRpYyBtZXRob2QgdG8gY29udmVydCBza2lsbE5hbWUgdG8gc2tpbGwgaWQgYXJyYXlcbiAgICBzdGF0aWMgcmV0dXJuU2tpbGxBcnIoYXJyT2ZOYW1lcywgZGF0YSkge1xuICAgICAgICBhcnJPZk5hbWVzID0gYXJyT2ZOYW1lcy5tYXAoKGVsZW0pID0+IGVsZW0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIGNvbnN0IHNraWxsSURBcnIgPSBkYXRhLnNraWxsLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBlbGVtKSB7XG4gICAgICAgICAgICBpZiAoYXJyT2ZOYW1lcy5pbmNsdWRlcyhlbGVtLnNraWxsLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxJRF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIHNraWxsSURBcnI7XG4gICAgfVxuICAgIC8vIGNvbnZlcnRzIGRlcGFydG1lbnQgbmFtZSB0byBkZXBhcnRtZW50IGlkXG4gICAgc3RhdGljIHJldHVybkRlcElEKGRlcE5hbWUsIGRhdGEpIHtcbiAgICAgICAgZGVwTmFtZSA9IGRlcE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgZGVwSUQgPSBkYXRhLmRlcGFydG1lbnQucmVkdWNlKCh2YWx1ZSwgZWxlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW0uZGVwYXJ0bWVudE5hbWUudG9Mb3dlckNhc2UoKSA9PSBkZXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBlbGVtLmRlcGFydG1lbnRJRDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sIDApO1xuICAgICAgICByZXR1cm4gZGVwSUQ7XG4gICAgfVxuICAgIC8vc3RhdGljIG1ldGhvZCB0byByZWFkIEZpbGUgYXMgYmFzZTY0XG4gICAgc3RhdGljIHJlYWRGaWxlQXNCYXNlNjQoZmlsZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gZmlsZSBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKF9hID0gZS50YXJnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGFwcFN0cmluZ3MgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmltcG9ydCB7IGFwcENvbnN0YW50cyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuZXhwb3J0IGxldCBmaXJlYmFzZURhdGE7XG5leHBvcnQgbGV0IG9yaWdpbmFsRGF0YTtcbmV4cG9ydCBsZXQgYWN0dWFsRGF0YTtcbmNsYXNzIEZpcmViYXNlU2luZ2xldG9uIHtcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICghRmlyZWJhc2VTaW5nbGV0b24uaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIEZpcmViYXNlU2luZ2xldG9uLmluc3RhbmNlID0gbmV3IEZpcmViYXNlU2luZ2xldG9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZpcmViYXNlU2luZ2xldG9uLmluc3RhbmNlO1xuICAgIH1cbiAgICAvLyBSZWFkIGl0ZW1zIGZyb20gZmlyZWJhc2UgZGF0YWJhc2VcbiAgICBmZXRjaERhdGEoZmlsbGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke2FwcENvbnN0YW50cy5kYXRhYmFzZVVybH0vLmpzb25gKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2VEYXRhID0gc3RydWN0dXJlZENsb25lKGRhdGEpO1xuICAgICAgICAgICAgICAgIGRhdGEuZW1wbG95ZWUgPSBkYXRhLmVtcGxveWVlLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbERhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgYWN0dWFsRGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZmlsbGVudHJ5KGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhID8gZGF0YSA6IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVsZXRlRGF0YShpbmRleCwgZmlsbGVudHJ5LCB0b2FzdCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHthcHBDb25zdGFudHMuZGF0YWJhc2VVcmx9L2VtcGxveWVlLyR7aW5kZXh9Lmpzb25gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGRlbGV0aW5nIGVtcGxveWVlXCIpO1xuICAgICAgICAgICAgICAgIHRvYXN0KHRydWUsIGFwcFN0cmluZ3MuZGVsRXJyTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRvYXN0KGZhbHNlLCBhcHBTdHJpbmdzLmRlbFN1Y2Nlc3NNc2cpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hEYXRhKGZpbGxlbnRyeSkudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIChBZGQpIGEgbmV3IGl0ZW0gdG8gdGhlIEZpcmViYXNlIFJlYWx0aW1lIERhdGFiYXNlXG4gICAgcHV0RGF0YShvYmosIGZpbGxlbnRyeSwgdG9hc3QpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7YXBwQ29uc3RhbnRzLmRhdGFiYXNlVXJsfS9lbXBsb3llZS8ke29iai5pbmRleH0uanNvbmAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBkYXRlT2ZCaXJ0aDogb2JqLmRvYixcbiAgICAgICAgICAgICAgICAgICAgZGF0ZU9mSm9pbjogb2JqLmRvaixcbiAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudDogb2JqLmRlcCxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG9iai5pZCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogb2JqLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIHNraWxsczogb2JqLnNraWxsLFxuICAgICAgICAgICAgICAgICAgICB3b3JrTG9jYXRpb246IG9iai5sb2MsXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lOiBvYmoubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IG9iai5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTcmM6IG9iai5pbWcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0b2FzdCh0cnVlLCBvYmouZXJyTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvYXN0KGZhbHNlLCBvYmouc3VjY01zZyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgICAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hEYXRhKGZpbGxlbnRyeSkudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgaHJtQXBwID0gRmlyZWJhc2VTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKTtcbiIsImltcG9ydCB7IHRhYmxlQ3JlYXRlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmltcG9ydCB7IEZpbHRlckFyciB9IGZyb20gXCIuL3NjcmlwdFwiO1xuY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuY29uc3Qgc29ydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydC1idXR0b25cIik7XG5sZXQgZGlyRmxhZyA9IDE7XG4vLyBzb3J0IGZ1bmN0aW9uYWxpdHlcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3Qgc29ydEZ1biA9ICgpID0+IHtcbiAgICBsZXQgYXJyYXlUb1NvcnQgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgIGlmIChGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKVxuICAgICAgICBhcnJheVRvU29ydCA9IEZpbHRlckFycjtcbiAgICBsZXQgYXJyVG9SZW5kZXIgPSBhcnJheVRvU29ydC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUxID0gYS5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBuYW1lMiA9IGIuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IGNvbXBhcmlzb24gPSAwO1xuICAgICAgICBpZiAobmFtZTEgPiBuYW1lMikge1xuICAgICAgICAgICAgY29tcGFyaXNvbiA9IDEgKiBkaXJGbGFnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUxIDwgbmFtZTIpIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb24gPSAtMSAqIGRpckZsYWc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBhcmlzb247XG4gICAgfSk7XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUoYXJyVG9SZW5kZXIpO1xuICAgIGlmIChkaXJGbGFnID09IDEpIHtcbiAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvZG93bi1hcnJvdy5zdmdcIjtcbiAgICAgICAgZGlyRmxhZyA9IC0xO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGlyRmxhZyA9IDE7XG4gICAgICAgIHNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL3VwLWFycm93LnN2Z1wiO1xuICAgIH1cbn07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGZpbGxlbnRyeSwgc2tpbGxOYW1lQXJyLCBjaGFuZ2VTa2lsbE5hbWVBcnIsIHRvYXN0IH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBBcHBTdXBwb3J0RnVuIH0gZnJvbSBcIi4vQXBwU3VwcG9ydEZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBhcHBTdHJpbmdzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB1cGRhdGVJbmRleCwgaWRPZkVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGhybUFwcCwgZmlyZWJhc2VEYXRhLCBvcmlnaW5hbERhdGEsIGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKTtcbmNvbnN0IGRhdGVPZkpvaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvalwiKTtcbmNvbnN0IGRhdGFPZkJpcnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5jb25zdCBkZXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuY29uc3Qgcm9sZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuY29uc3QgbG9jSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1wiKTtcbmNvbnN0IHNraWxsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuY29uc3QgRnVsbHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IGZvcm1Ta2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1za2lsbFwiKTtcbmNvbnN0IGZvcm1JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWwtaW1nXCIpO1xuY29uc3QgaW1nRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1pbnB1dFwiKTtcbmNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG5jb25zdCBkYXRhRW50cnlOYW1lQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbmFtZS1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeURvakFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRvai1hbGVydCBcIik7XG5jb25zdCBkYXRhRW50cnlEb2JBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kb2ItYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlSb2xlQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktcm9sZS1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeURlcEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRlcC1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeUxvY0FsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWxvYy1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeVNraWxsQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktc2tpbGwtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlTdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGEtZW50cnktc3VibWl0XCIpO1xuY29uc3QgZGF0YUVudHJ5Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1mb3JtXCIpO1xuY29uc3QgZGF0YUVudHJ5RW1haWxBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1lbWFpbC1hbGVydFwiKTtcbmxldCBwdXRkYXRhID0ge1xuICAgIGluZGV4OiAwLFxuICAgIGlkOiAwLFxuICAgIG5hbWU6IFwiXCIsXG4gICAgZW1haWw6IFwiXCIsXG4gICAgZG9qOiBcIlwiLFxuICAgIGRvYjogXCJcIixcbiAgICBkZXA6IDAsXG4gICAgcm9sZTogXCJcIixcbiAgICBsb2M6IFwiXCIsXG4gICAgc2tpbGw6IFtdLFxuICAgIGltZzogXCJcIixcbiAgICBlcnJNc2c6IFwiXCIsXG4gICAgc3VjY01zZzogXCJcIixcbn07XG4vLyBpbWFnZSBnZW5lcmF0aW5nIGZ1bmN0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xubGV0IGJhc2U2NFN0cmluZzE7XG5jb25zdCBhZGRJbWdUb0Zvcm0gPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGltZ0ZpbGUxID0gKF9hID0gaW1nRWxlbS5maWxlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xuICAgIHRyeSB7XG4gICAgICAgIGJhc2U2NFN0cmluZzEgPSB5aWVsZCBBcHBTdXBwb3J0RnVuLnJlYWRGaWxlQXNCYXNlNjQoaW1nRmlsZTEpO1xuICAgICAgICBwdXRkYXRhLmltZyA9IGJhc2U2NFN0cmluZzE7XG4gICAgfVxuICAgIGNhdGNoIChfYikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGZldGNoaW5nIGJhc2U2NFN0cmluZ1wiKTtcbiAgICB9XG4gICAgaWYgKGltZ0ZpbGUxID09IHVuZGVmaW5lZCkge1xuICAgICAgICBiYXNlNjRTdHJpbmcxID0gXCIuLi9hc3NldHMvaW1hZ2VzL3Byb2ZpbGUucG5nXCI7XG4gICAgfVxufSk7XG5pbWdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBhZGRJbWdUb0Zvcm0pO1xuLy9oYW5kbGluZyB0aGUgc3VibWl0IGJ1dHRvbiBjbGlja1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBoYW5kbGVTdWJtaXRDbGljayA9IChlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB2YXIgX2M7XG4gICAgbGV0IGJhc2U2NFN0cmluZztcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy90YWtpbmcgaW1hZ2UgZnJvbSB1c2VyXG4gICAgY29uc3QgaW1nRmlsZSA9IChfYyA9IGltZ0VsZW0uZmlsZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1swXTtcbiAgICBjb25zb2xlLmxvZyhpbWdGaWxlLCBcImltYWdlIGZpbGUgdGhhdCBpcyBnaXZlbiB0byB1cGxvYWRcIik7XG4gICAgdHJ5IHtcbiAgICAgICAgYmFzZTY0U3RyaW5nID0geWllbGQgQXBwU3VwcG9ydEZ1bi5yZWFkRmlsZUFzQmFzZTY0KGltZ0ZpbGUpO1xuICAgICAgICBwdXRkYXRhLmltZyA9IGJhc2U2NFN0cmluZzsgLy9kYXRhIHRvIGJlIHNlbnQgdG8gcHV0RGF0YSBmdW5jdGlvblxuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgZmV0Y2hpbmcgYmFzZTY0U3RyaW5nXCIpO1xuICAgIH1cbiAgICBpZiAoaW1nRmlsZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYmFzZTY0U3RyaW5nID0gXCIuLi9hc3NldHMvaW1hZ2VzL3Byb2ZpbGUucG5nXCI7XG4gICAgfVxuICAgIHB1dGRhdGEubmFtZSA9IG5hbWUudmFsdWU7XG4gICAgcHV0ZGF0YS5lbWFpbCA9IGVtYWlsLnZhbHVlO1xuICAgIHB1dGRhdGEuZG9qID0gZGF0ZU9mSm9pbi52YWx1ZTtcbiAgICBwdXRkYXRhLmRvYiA9IGRhdGFPZkJpcnRoLnZhbHVlO1xuICAgIHB1dGRhdGEuZGVwID0gQXBwU3VwcG9ydEZ1bi5yZXR1cm5EZXBJRChkZXBJbnB1dC52YWx1ZSwgYWN0dWFsRGF0YSk7XG4gICAgcHV0ZGF0YS5yb2xlID0gcm9sZUlucHV0LnZhbHVlO1xuICAgIHB1dGRhdGEubG9jID0gbG9jSW5wdXQudmFsdWU7XG4gICAgcHV0ZGF0YS5za2lsbCA9IEFwcFN1cHBvcnRGdW4ucmV0dXJuU2tpbGxBcnIoc2tpbGxOYW1lQXJyLCBhY3R1YWxEYXRhKTtcbiAgICBwdXRkYXRhLmltZyA9IGJhc2U2NFN0cmluZztcbiAgICBsZXQgaXNFcnIgPSBmYWxzZTtcbiAgICBpZiAocHV0ZGF0YS5uYW1lLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlOYW1lQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlOYW1lQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5kb2opIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEb2pBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURvakFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIXB1dGRhdGEuZG9iKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RG9iQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEb2JBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKHB1dGRhdGEucm9sZSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlSb2xlQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlSb2xlQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5kZXApIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEZXBBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURlcEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAocHV0ZGF0YS5sb2MgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5TG9jQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlMb2NBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFwdXRkYXRhLnNraWxsLmxlbmd0aCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeVNraWxsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlTa2lsbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIWVtYWlsLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICBkYXRhRW50cnlFbWFpbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RW1haWxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9PSBcIkFkZFwiKSB7XG4gICAgICAgIGlmICghaXNFcnIpIHtcbiAgICAgICAgICAgIGxldCBlbnRyeUluZGV4ID0gMDtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbERhdGEuZW1wbG95ZWUpIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gZW50cnlJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gZW50cnlJbmRleCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgZW1wbG95ZWVJRCA9IDEwMDE7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxEYXRhLmVtcGxveWVlKSB7XG4gICAgICAgICAgICAgICAgZW1wbG95ZWVJRCA9XG4gICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmlnaW5hbERhdGEuZW1wbG95ZWVbb3JpZ2luYWxEYXRhLmVtcGxveWVlLmxlbmd0aCAtIDFdLmlkKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVtcGxveWVlSUQgPSAxMDAxO1xuICAgICAgICAgICAgcHV0ZGF0YS5pZCA9IGVtcGxveWVlSUQ7XG4gICAgICAgICAgICBwdXRkYXRhLmluZGV4ID0gZW50cnlJbmRleDtcbiAgICAgICAgICAgIHB1dGRhdGEuZXJyTXNnID0gYXBwU3RyaW5ncy5hZGRFcnJNc2c7XG4gICAgICAgICAgICBwdXRkYXRhLnN1Y2NNc2cgPSBhcHBTdHJpbmdzLmFkZFN1Y2Nlc3NNc2c7XG4gICAgICAgICAgICAvL3Bhc3NpbmcgZGF0YSB0byBlbnRlciBuZXcgZW1wbG95ZWUgZGV0YWlsc1xuICAgICAgICAgICAgaHJtQXBwLnB1dERhdGEocHV0ZGF0YSwgZmlsbGVudHJ5LCB0b2FzdCk7XG4gICAgICAgICAgICBkYXRhRW50cnlGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgbGV0IG51bGxBcnIgPSBbXTtcbiAgICAgICAgICAgIGNoYW5nZVNraWxsTmFtZUFycihudWxsQXJyKTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9hc3QodHJ1ZSwgYXBwU3RyaW5ncy5hZGRFcnJNc2cpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9PSBcIlVwZGF0ZVwiKSB7XG4gICAgICAgIGlmICghaXNFcnIpIHtcbiAgICAgICAgICAgIGxldCBlbXBsb3llZUlEID0gaWRPZkVtcDtcbiAgICAgICAgICAgIHB1dGRhdGEuaWQgPSBlbXBsb3llZUlEO1xuICAgICAgICAgICAgYmFzZTY0U3RyaW5nID0gb3JpZ2luYWxEYXRhLmVtcGxveWVlW3VwZGF0ZUluZGV4XS5pbWFnZVNyYztcbiAgICAgICAgICAgIHB1dGRhdGEuZXJyTXNnID0gYXBwU3RyaW5ncy51cGRhdGVFcnJNc2c7XG4gICAgICAgICAgICBwdXRkYXRhLnN1Y2NNc2cgPSBhcHBTdHJpbmdzLnVwZGF0ZVN1Y2Nlc3NNc2c7XG4gICAgICAgICAgICBwdXRkYXRhLmluZGV4ID0gdXBkYXRlSW5kZXg7XG4gICAgICAgICAgICAvL3Bhc3NpbmcgZGF0YSB0byB1cGRhdGUgZW1wbG95ZWVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVwZGF0ZUluZGV4LCBcImluZGV4IHRvIGJlIHVwZGF0ZWRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwdXRkYXRhLmltZywgXCJpbWFnZSB0aGF0IGlzIGdvaW5nIHRvIGJlIHVwZGF0ZWRcIik7XG4gICAgICAgICAgICBocm1BcHAucHV0RGF0YShwdXRkYXRhLCBmaWxsZW50cnksIHRvYXN0KTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5kYXRhRW50cnlGb3JtLm9uc3VibWl0ID0gaGFuZGxlU3VibWl0Q2xpY2s7XG4vL2RhdGEtZW50cnktZm9ybSBza2lsbCBzZWN0aW9uIGZ1bmN0aW9uYWxpdGllc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbkZ1bGx0YWJsZS5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoc2tpbGxOYW1lKTtcbiAgICB9XG59O1xuZm9ybVNraWxsLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtb3B0aW9uc1wiKSAmJlxuICAgICAgICAhc2tpbGxOYW1lQXJyLmluY2x1ZGVzKHRhcmdldC5pZCkpIHtcbiAgICAgICAgc2tpbGxOYW1lQXJyLnB1c2godGFyZ2V0LmlkKTtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke3RhcmdldC5pZH1cIiBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAgICAgICAgICR7dGFyZ2V0LmlkfVxuICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdG9hc3QodHJ1ZSwgYXBwU3RyaW5ncy51cGRhdGVFcnJNc2cpO1xuICAgIH1cbn07XG5hZGRlZFNraWxscy5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmRhdGFzZXQucmVtSWQpIHtcbiAgICAgICAgbGV0IHNraWxsTmFtZUFyckNvcHkgPSBza2lsbE5hbWVBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtICE9IHRhcmdldC5kYXRhc2V0LnJlbUlkKTtcbiAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKHNraWxsTmFtZUFyckNvcHkpO1xuICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBza2lsbE5hbWVBcnIuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHtlbGVtfVwiIGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICR7ZWxlbX1cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBza2lsbElucHV0LnZhbHVlID0gXCJub25lXCI7XG59O1xuIiwiLy8gQXBwQ29uc3RhbnRzXG5leHBvcnQgY29uc3QgYXBwQ29uc3RhbnRzID0ge1xuICAgIGRhdGFiYXNlVXJsOiBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCIsXG59O1xuLy8gQXBwU3RyaW5nc1xuZXhwb3J0IGNvbnN0IGFwcFN0cmluZ3MgPSB7XG4gICAgYWRkU3VjY2Vzc01zZzogXCJTdWNjZXNmdWxseSBhZGRlZCBlbXBsb3llZVwiLFxuICAgIGFkZEVyck1zZzogXCJFcnJvciB3aGlsZSBhZGRpbmcgZW1wbG95ZWVcIixcbiAgICB1cGRhdGVTdWNjZXNzTXNnOiBcIlN1Y2Nlc2Z1bGx5IHVwZGF0ZWQgZW1wbG95ZWVcIixcbiAgICB1cGRhdGVFcnJNc2c6IFwiRXJyb3Igd2hpbGUgdXBkYXRpbmcgZW1wbG95ZWVcIixcbiAgICBkZWxTdWNjZXNzTXNnOiBcIlN1Y2Nlc2Z1bGx5IGRlbGV0ZWQgdGhlIGVtcGxveWVlXCIsXG4gICAgZGVsRXJyTXNnOiBcIkVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIsXG4gICAgZmV0Y2hFcnJNc2c6IFwiRXJyb3Igd2hpbGUgZmV0Y2hpbmcgdGhlIGRhdGFcIixcbn07XG4iLCJpbXBvcnQgeyBmaWxsZW50cnksIGZpcmViYXNlRGF0YSwgdG9hc3QgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGhybUFwcCB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbmZpcm0tYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IGRlbEVtcCA9IChpZCkgPT4ge1xuICAgIGxldCBkZWxJbmRleDtcbiAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGVsZW0gPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAoZWxlbS5pZCA9PSBpZClcbiAgICAgICAgICAgIGRlbEluZGV4ID0gaW5kZXg7XG4gICAgfSk7XG4gICAgY29uZmlybUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBocm1BcHAuZGVsZXRlRGF0YShkZWxJbmRleCwgZmlsbGVudHJ5LCB0b2FzdCk7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH07XG59O1xuIiwiLy8gZmV0Y2ggc2tpbGwgZm9ybSBmaXJlYmFzZSBhbmQgZGlzcGxheSBpdCBvbiB0aGUgZmlsdGVyIHNraWxsIHNlY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmltcG9ydCB7IGZpbHRlclRhYmxlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmNvbnN0IGZpbHRlclNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyLXNlYXJjaC1ib3hcIik7XG5jb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItZmlsdGVyLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBSZW5kZXJGaWx0ZXJCb3ggPSAoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+IHtcbiAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1DaGVja2VkID0gZWxlbTtcbiAgICAgICAgaWYgKGVsZW1DaGVja2VkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuZmlsdGVyU2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBSZW5kZXJGaWx0ZXJCb3gpO1xuY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFyRmlsdGVyKTtcbiIsImltcG9ydCB7IGhhbmRsZVRhYmxlQ2xpY2sgfSBmcm9tIFwiLi90YWJsZUFjdGlvbkJ1dHRvblwiO1xuaW1wb3J0IHsgaHJtQXBwIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5jb25zdCBkYXRhRW50cnlGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWZvcm1cIik7XG5jb25zdCBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCBcIik7XG5jb25zdCBzb3J0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0LWJ1dHRvblwiKTtcbmNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWlucHV0LWJveFwiKTtcbmNvbnN0IGRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuY29uc3Qgcm9sZUVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuY29uc3Qgc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IGRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbmNvbnN0IGNhbmNlbERlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLWRlbC1idXR0b25cIik7XG5jb25zdCBhZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbmNvbnN0IGRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG5jb25zdCBmb3JtSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsLWltZ1wiKTtcbmNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5jb25zdCBkYXRhVmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctbW9kYWxcIik7XG5jb25zdCBkYXRhRGVsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZGVsLW1vZGFsXCIpO1xuY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuaW1wb3J0IHsgc29ydEZ1biB9IGZyb20gXCIuL1NvcnRGdW5cIjtcbmltcG9ydCB7IG9yaWdpbmFsRGF0YSwgYWN0dWFsRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5leHBvcnQgbGV0IGZpcmViYXNlRGF0YTtcbmV4cG9ydCBsZXQgc2tpbGxOYW1lQXJyID0gW107IC8vc3RyaW5nIGFycmF5XG5leHBvcnQgbGV0IHNraWxsTmFtZTtcbmV4cG9ydCBjb25zdCBjaGFuZ2VTa2lsbE5hbWVBcnIgPSAoZWxlbSkgPT4ge1xuICAgIHNraWxsTmFtZUFyciA9IGVsZW07XG59O1xuZXhwb3J0IGNvbnN0IGNoYW5nZVNraWxsTmFtZSA9IChlbGVtKSA9PiB7XG4gICAgc2tpbGxOYW1lID0gZWxlbTtcbn07XG5jb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBmb3JtU2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2tpbGxcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuY29uc3QgdG9hc3RNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0LW1zZ1wiKTtcbmNvbnN0IHRvYXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdFwiKTtcbi8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3QgdG9hc3QgPSAodHlwZSwgbXNnKSA9PiB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdG9hc3RNc2cuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZC5pbm5lckhUTUwgPSBcImVycm9yXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLmJhY2tncm91bmQgPVxuICAgICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoMTExLjRkZWcsIHJnYigyNDYsIDQsIDI2KSAwLjQlLCByZ2IoMjUxLCAxMzksIDM0KSAxMDAuMiUpXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgxNzAlKVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdG9hc3RNc2cuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS5iYWNrZ3JvdW5kID1cbiAgICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDE3OS4xZGVnLCByZ2IoNDMsIDE3MCwgOTYpIDIuMyUsIHJnYigxMjksIDIwNCwgMTA0KSA5OC4zJSlcIjtcbiAgICAgICAgbWF0ZXJpYWxTeW1ib2xzT3V0bGluZWQuaW5uZXJIVE1MID0gXCJkb25lXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgxNzAlKVwiO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDApXCI7XG4gICAgfSwgMzAwMCk7XG59O1xuZXhwb3J0IGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGxldCBkZXAgPSBvcmlnaW5hbERhdGEuZGVwYXJ0bWVudFtvYmplbGVtLmRlcGFydG1lbnQgLSAxXS5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCArPSBgXG4gICAgPHRyIGNsYXNzPVwiZGF0YS1yb3dcIj5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5pZH08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmZ1bGxOYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZW1haWx9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGVwfTwvdGQ+XG4gICAgICAgIDx0ZCBpZD1cImFjdGlvbi1idXR0b24tY2VsbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0+PGltZyBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfSBjbGFzcz1cInZpZXctaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvdmlldy1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwidmlldyBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2VkaXQtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkVkaXQgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZGVsLWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICBgO1xuICAgIH0pO1xufTtcbi8vIGZldGNoaW5nIGRhdGEgZnJvbSBmaXJlYmFzZSBhbmQgZGlzcGxheSBpdCBpbnRvIHRoZSB0YWJsZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IGZpbGxlbnRyeSA9IChvYmopID0+IHtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShvYmouZW1wbG95ZWUpO1xuICAgIC8vIGZpbHRlciBza2lsbCBidXR0b24gc2NyaXB0XG4gICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIik7XG4gICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgIH0pO1xuICAgIC8vZmlsbCBkZXBhcnRtZW50IGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBkZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgIG9iai5kZXBhcnRtZW50LmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9XCI+JHtvYmplbGVtLmRlcGFydG1lbnROYW1lfTwvb3B0aW9uPmA7XG4gICAgfSk7XG4gICAgLy8gZmlsbCByb2xlIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICByb2xlRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgcm9sZUVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0ucm9sZX1cIj4ke29iamVsZW0ucm9sZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPmNob29zZSBza2lsbDwvb3B0aW9uPmA7XG4gICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gY2xhc3M9XCJza2lsbC1vcHRpb25zXCIgaWQ9XCIke29iamVsZW0uc2tpbGx9XCIgdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgfSk7XG59O1xuLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5ocm1BcHAuZmV0Y2hEYXRhKGZpbGxlbnRyeSkudGhlbigoZGF0YSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHNvcnRGdW4oKTtcbn0pO1xudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRhYmxlQ2xpY2spO1xuLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbmRhdGFWaWV3Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9jbG9zZSBkYXRhLWRlbC1tb2RhbFxuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9BZGQgZW1wbG95ZWUgZnVuY3Rpb25cbmFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgIGNoYW5nZVNraWxsTmFtZUFycihbXSk7XG4gICAgZm9ybUltZy5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvcHJvZmlsZS5wbmdcIjtcbiAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9IFwiQWRkXCI7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59KTtcbmRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9maWx0ZXJBbmRTZWFyY2ggZnVuY3Rpb25hbGl0eVxuZXhwb3J0IGxldCBGaWx0ZXJBcnIgPSBbXTtcbmV4cG9ydCBjb25zdCBmaWx0ZXJUYWJsZSA9ICgpID0+IHtcbiAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50XCIpO1xuICAgIGxldCBjaGVja2VkRmlsdGVyQXJyID0gW107XG4gICAgaW5wdXRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW07XG4gICAgICAgIGNvbnN0IHRyaWFsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtlbGVtZW50LmRhdGFzZXQuc2tpbGxJZH1gKTtcbiAgICAgICAgaWYgKHRyaWFsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBlbGVtZW50LmRhdGFzZXQuc2tpbGxOdW07XG4gICAgICAgICAgICBjaGVja2VkRmlsdGVyQXJyLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzZWFyY2h2YWx1ZSA9IHNlYXJjaEJhci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIEZpbHRlckFyciA9IGFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgaWYgKHNlYXJjaEJhci52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtLmZ1bGxOYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaHZhbHVlKSk7XG4gICAgfVxuICAgIGlmIChjaGVja2VkRmlsdGVyQXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBjaGVja2VkRmlsdGVyQXJyLmV2ZXJ5KChjaGVja0VsZW0pID0+IGVsZW0uc2tpbGxzLmluY2x1ZGVzKE51bWJlcihjaGVja0VsZW0pKSkpO1xuICAgIH1cbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShGaWx0ZXJBcnIpO1xufTtcbmNvbnN0IGNoYW5nZVNraWxsU3RhdGUgPSAoc2tpbGxJZCkgPT4ge1xuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtza2lsbElkfWApO1xuICAgIHRlbXAuY2xpY2soKTtcbiAgICBmaWx0ZXJUYWJsZSgpO1xufTtcbnNraWxsTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLWVsZW1lbnRcIikgJiZcbiAgICAgICAgdGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIikge1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIklOUFVUXCIgfHwgdGFyZ2V0LnRhZ05hbWUgPT09IFwiTEFCRUxcIikge1xuICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXRDbG9zZXN0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgZmlsdGVyVGFibGUoKTtcbiAgICB9XG59KTtcbnNvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNvcnRGdW4pO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmaWx0ZXJUYWJsZSk7XG4vL3NldHRpbmcgbGltaXQgdG8gZGF0ZSBvZiBiaXJ0aFxubGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0pTT04oKS5zbGljZSgwLCAxMCk7XG5jb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgdG9kYXkpO1xuIiwiY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IGRhdGFWaWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1tb2RhbFwiKTtcbmNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5pbXBvcnQgeyB1cGRhdGVFbXAgfSBmcm9tIFwiLi91cGRhdGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgdmlld01vZGFsIH0gZnJvbSBcIi4vdmlld0VtcGxveWVlXCI7XG5pbXBvcnQgeyBkZWxFbXAgfSBmcm9tIFwiLi9kZWxldGVFbXBsb3llZVwiO1xuZXhwb3J0IGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlldy1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB2aWV3TW9kYWwoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsLWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGVsRW1wKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbiAgICAvLy8gdXBkYXRlIHVzZXIgZGV0YWlscyBmdW5jdGlvbmFsaXR5XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlTdWJtaXQudmFsdWUgPSBcIlVwZGF0ZVwiO1xuICAgICAgICB1cGRhdGVFbXAoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxufTtcbiIsImV4cG9ydCB7fTtcbiIsImltcG9ydCB7IGNoYW5nZVNraWxsTmFtZSwgc2tpbGxOYW1lIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBhY3R1YWxEYXRhLCBmaXJlYmFzZURhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuLy8gZXhwb3J0IGxldCBza2lsbE5hbWU6IHN0cmluZ1tdO1xuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKTtcbmNvbnN0IGRhdGVPZkpvaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvalwiKTtcbmNvbnN0IGRhdGFPZkJpcnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5jb25zdCBkZXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuY29uc3Qgcm9sZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuY29uc3QgbG9jSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1wiKTtcbmNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG5sZXQgdXBkYXRlSW5kZXggPSAwO1xubGV0IGlkT2ZFbXAgPSAxMDAxO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUVtcCA9IChpZCkgPT4ge1xuICAgIGlkT2ZFbXAgPSBpZDtcbiAgICBsZXQgY3Vyck9iajtcbiAgICBsZXQgZGVwYXJ0bWVudDtcbiAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGlmIChvYmogPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAob2JqLmlkID09IGlkKSB7XG4gICAgICAgICAgICBjdXJyT2JqID0gb2JqO1xuICAgICAgICAgICAgZmlyZWJhc2VEYXRhLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyT2JqLmRlcGFydG1lbnQgPT0gb2JqLmRlcGFydG1lbnRJRClcbiAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudCA9IG9iai5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCBmaXJlYmFzZURhdGEuZW1wbG95ZWUubGVuZ3RoOyBzdGVwKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZpcmViYXNlRGF0YS5lbXBsb3llZVtzdGVwXS5pZCA9PSBjdXJyT2JqLmlkKVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVJbmRleCA9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYW1lLnZhbHVlID0gYCR7Y3Vyck9iai5mdWxsTmFtZX1gO1xuICAgICAgICAgICAgZW1haWwudmFsdWUgPSBgJHtjdXJyT2JqLmVtYWlsfWA7XG4gICAgICAgICAgICBkYXRlT2ZKb2luLnZhbHVlID0gYCR7Y3Vyck9iai5kYXRlT2ZCaXJ0aH1gO1xuICAgICAgICAgICAgZGF0YU9mQmlydGgudmFsdWUgPSBgJHtjdXJyT2JqLmRhdGVPZkpvaW59YDtcbiAgICAgICAgICAgIGxvY0lucHV0LnZhbHVlID0gYCR7Y3Vyck9iai53b3JrTG9jYXRpb259YDtcbiAgICAgICAgICAgIHJvbGVJbnB1dC52YWx1ZSA9IGAke2N1cnJPYmoucm9sZX1gO1xuICAgICAgICAgICAgZGVwSW5wdXQudmFsdWUgPSBgJHtkZXBhcnRtZW50fWA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgc2tpbGxOYW1lQ29weSA9IGFjdHVhbERhdGEuc2tpbGwucmVkdWNlKChhY2MsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGN1cnJPYmouc2tpbGxzLmluY2x1ZGVzKGVsZW0uc2tpbGxJRCkpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgfSwgW10pO1xuICAgIGNoYW5nZVNraWxsTmFtZShza2lsbE5hbWVDb3B5KTtcbiAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHNraWxsTmFtZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9JHtlbGVtfSBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtlbGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xufTtcbmV4cG9ydCB7IHVwZGF0ZUluZGV4LCBpZE9mRW1wIH07XG4iLCJpbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IG5hbWVWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lVmlld1wiKTtcbmNvbnN0IGVtYWlsVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxWaWV3XCIpO1xuY29uc3QgZW1wSWRWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbXBJZFZpZXdcIik7XG5jb25zdCBkb2pWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pWaWV3XCIpO1xuY29uc3QgZG9iVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iVmlld1wiKTtcbmNvbnN0IGRlcFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFZpZXdcIik7XG5jb25zdCByb2xlVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVZpZXdcIik7XG5jb25zdCBsb2NWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NWaWV3XCIpO1xuY29uc3QgaW1nVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nXCIpO1xuY29uc3Qgdmlld1NraWxsQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWV3LXNraWxsLWJveFwiKTtcbmV4cG9ydCBjb25zdCB2aWV3TW9kYWwgPSAoaWQpID0+IHtcbiAgICBsZXQgdmlld09iajtcbiAgICBsZXQgZGVwYXJ0bWVudDtcbiAgICBhY3R1YWxEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGVsZW0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIHZpZXdPYmogPSBlbGVtO1xuICAgICAgICAgICAgYWN0dWFsRGF0YS5kZXBhcnRtZW50LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2aWV3T2JqLmRlcGFydG1lbnQgPT0gb2JqLmRlcGFydG1lbnRJRClcbiAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudCA9IG9iai5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW1nVmlldy5zcmMgPSBgJHt2aWV3T2JqLmltYWdlU3JjfWA7XG4gICAgICAgICAgICBuYW1lVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbFZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5lbWFpbH1gO1xuICAgICAgICAgICAgZW1wSWRWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouaWR9YDtcbiAgICAgICAgICAgIGRvalZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5kYXRlT2ZKb2lufWA7XG4gICAgICAgICAgICBkb2JWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZGF0ZU9mQmlydGh9YDtcbiAgICAgICAgICAgIGRlcFZpZXcuaW5uZXJIVE1MID0gYCR7ZGVwYXJ0bWVudH1gO1xuICAgICAgICAgICAgcm9sZVZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5yb2xlfWA7XG4gICAgICAgICAgICBsb2NWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmoud29ya0xvY2F0aW9ufWA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgZWFjaFNraWxsID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoKGFjYywgZWxlbSkgPT4ge1xuICAgICAgICBpZiAodmlld09iai5za2lsbHMuaW5jbHVkZXMoZWxlbS5za2lsbElEKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgdmlld1NraWxsQm94LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZWFjaFNraWxsLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgdmlld1NraWxsQm94LmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlYWNoLXNraWxsLXZpZXdcIj4ke2VsZW19PC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9maWx0ZXJBbmRTZWFyY2hGdW4udHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdC50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Tb3J0RnVuLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnN0YW50cy50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90eXBlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FkZFVwZGF0ZUVtcGxveWVlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2RlbGV0ZUVtcGxveWVlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3VwZGF0ZUVtcGxveWVlLnRzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdmlld0VtcGxveWVlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9