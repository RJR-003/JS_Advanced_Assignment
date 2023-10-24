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
        sortButton.src = "./assets/images/down-arrow.svg";
        dirFlag = -1;
    }
    else {
        dirFlag = 1;
        sortButton.src = "./assets/images/up-arrow.svg";
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
        formImg.src = base64String1;
    }
    catch (_b) {
        console.log("error while fetching base64String");
        formImg.src = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.defaultPic;
        putdata.img = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.defaultPic;
    }
    if (imgFile1 == undefined) {
        base64String1 = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.defaultPic;
        putdata.img = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.defaultPic;
    }
});
imgElem.addEventListener("input", addImgToForm);
//handling the submit button click
/////////////////////////////////////////////////////////////////////////////////////////////
const handleSubmitClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
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
            if (base64String1)
                putdata.img = base64String1;
            else
                putdata.img = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.defaultPic;
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
    if (target.id == "skill" && !_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.includes(skillInput.value)) {
        if (skillInput.value != "none") {
            _script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.push(skillInput.value);
            addedSkills.innerHTML += `
    <div data-rem-id="${skillInput.value}" class="each-skill-added">
    ${skillInput.value}
</div>`;
        }
    }
    else if (target.classList.contains("skill-options") &&
        !_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.includes(target.id)) {
        _script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr.push(target.id);
        addedSkills.innerHTML += `
                  <div data-rem-id="${target.id}" class="each-skill-added">
                  ${target.id}
              </div>`;
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
    defaultPic: "./assets/images/profile.png",
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
    _DataService__WEBPACK_IMPORTED_MODULE_1__.firebaseData.employee.forEach((elem, index) => {
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
/* harmony export */   skillName: () => (/* binding */ skillName),
/* harmony export */   skillNameArr: () => (/* binding */ skillNameArr),
/* harmony export */   tableCreate: () => (/* binding */ tableCreate),
/* harmony export */   toast: () => (/* binding */ toast)
/* harmony export */ });
/* harmony import */ var _tableActionButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableActionButton */ "./src/tableActionButton.ts");
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _SortFun__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SortFun */ "./src/SortFun.ts");



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
    (0,_SortFun__WEBPACK_IMPORTED_MODULE_3__.sortFun)();
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
    formImg.src = _constants__WEBPACK_IMPORTED_MODULE_2__.appStrings.defaultPic;
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
sortButton.addEventListener("click", _SortFun__WEBPACK_IMPORTED_MODULE_3__.sortFun);
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
/* harmony import */ var _DataService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataService */ "./src/DataService.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const overlay = document.querySelector(".overlay");
const dataViewModal = document.querySelector(".data-view-modal");
const dataDelModal = document.querySelector(".data-del-modal");
const dataEntryModal = document.querySelector(".data-entry-modal");
const dataEntrySubmit = document.querySelector("#data-entry-submit");
const formImg = document.querySelector(".data-entry-modal-img");





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
        let tryObj = _DataService__WEBPACK_IMPORTED_MODULE_3__.originalData.employee.filter((elem) => elem.id == Number(target.dataset.empId));
        if (tryObj[0].imageSrc) {
            formImg.src = tryObj[0].imageSrc;
        }
        else {
            formImg.src = _constants__WEBPACK_IMPORTED_MODULE_4__.appStrings.defaultPic;
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2pELG1DQUFtQyxxQkFBcUI7QUFDeEQ7QUFDQSxLQUFLO0FBQ0wsb0JBQW9CLG9EQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7VUM3Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvQXBwU3VwcG9ydEZ1bmN0aW9uLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9EYXRhU2VydmljZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvU29ydEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvYWRkVXBkYXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvZGVsZXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvc2NyaXB0LnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy90YWJsZUFjdGlvbkJ1dHRvbi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdHlwZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdXBkYXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3ZpZXdFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFwcFN1cHBvcnRGdW4ge1xuICAgIC8vc3RhdGljIG1ldGhvZCB0byBjb252ZXJ0IHNraWxsTmFtZSB0byBza2lsbCBpZCBhcnJheVxuICAgIHN0YXRpYyByZXR1cm5Ta2lsbEFycihhcnJPZk5hbWVzLCBkYXRhKSB7XG4gICAgICAgIGFyck9mTmFtZXMgPSBhcnJPZk5hbWVzLm1hcCgoZWxlbSkgPT4gZWxlbS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgY29uc3Qgc2tpbGxJREFyciA9IGRhdGEuc2tpbGwucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGVsZW0pIHtcbiAgICAgICAgICAgIGlmIChhcnJPZk5hbWVzLmluY2x1ZGVzKGVsZW0uc2tpbGwudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbElEXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICAgICAgfSwgW10pO1xuICAgICAgICByZXR1cm4gc2tpbGxJREFycjtcbiAgICB9XG4gICAgLy8gY29udmVydHMgZGVwYXJ0bWVudCBuYW1lIHRvIGRlcGFydG1lbnQgaWRcbiAgICBzdGF0aWMgcmV0dXJuRGVwSUQoZGVwTmFtZSwgZGF0YSkge1xuICAgICAgICBkZXBOYW1lID0gZGVwTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBkZXBJRCA9IGRhdGEuZGVwYXJ0bWVudC5yZWR1Y2UoKHZhbHVlLCBlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbS5kZXBhcnRtZW50TmFtZS50b0xvd2VyQ2FzZSgpID09IGRlcE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGVsZW0uZGVwYXJ0bWVudElEO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwgMCk7XG4gICAgICAgIHJldHVybiBkZXBJRDtcbiAgICB9XG4gICAgLy9zdGF0aWMgbWV0aG9kIHRvIHJlYWQgRmlsZSBhcyBiYXNlNjRcbiAgICBzdGF0aWMgcmVhZEZpbGVBc0Jhc2U2NChmaWxlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJObyBmaWxlIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgoX2EgPSBlLnRhcmdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgYXBwU3RyaW5ncyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuaW1wb3J0IHsgYXBwQ29uc3RhbnRzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5leHBvcnQgbGV0IGZpcmViYXNlRGF0YTtcbmV4cG9ydCBsZXQgb3JpZ2luYWxEYXRhO1xuZXhwb3J0IGxldCBhY3R1YWxEYXRhO1xuY2xhc3MgRmlyZWJhc2VTaW5nbGV0b24ge1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKCFGaXJlYmFzZVNpbmdsZXRvbi5pbnN0YW5jZSkge1xuICAgICAgICAgICAgRmlyZWJhc2VTaW5nbGV0b24uaW5zdGFuY2UgPSBuZXcgRmlyZWJhc2VTaW5nbGV0b24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRmlyZWJhc2VTaW5nbGV0b24uaW5zdGFuY2U7XG4gICAgfVxuICAgIC8vIFJlYWQgaXRlbXMgZnJvbSBmaXJlYmFzZSBkYXRhYmFzZVxuICAgIGZldGNoRGF0YShmaWxsZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7YXBwQ29uc3RhbnRzLmRhdGFiYXNlVXJsfS8uanNvbmApO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZURhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgZGF0YS5lbXBsb3llZSA9IGRhdGEuZW1wbG95ZWUuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgICAgICAgICAgICAgICBhY3R1YWxEYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICBmaWxsZW50cnkoZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgPyBkYXRhIDogW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWxldGVEYXRhKGluZGV4LCBmaWxsZW50cnksIHRvYXN0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke2FwcENvbnN0YW50cy5kYXRhYmFzZVVybH0vZW1wbG95ZWUvJHtpbmRleH0uanNvbmAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gZGVsZXRpbmcgZW1wbG95ZWVcIik7XG4gICAgICAgICAgICAgICAgdG9hc3QodHJ1ZSwgYXBwU3RyaW5ncy5kZWxFcnJNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdG9hc3QoZmFsc2UsIGFwcFN0cmluZ3MuZGVsU3VjY2Vzc01zZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaERhdGEoZmlsbGVudHJ5KS50aGVuKChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgKEFkZCkgYSBuZXcgaXRlbSB0byB0aGUgRmlyZWJhc2UgUmVhbHRpbWUgRGF0YWJhc2VcbiAgICBwdXREYXRhKG9iaiwgZmlsbGVudHJ5LCB0b2FzdCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHthcHBDb25zdGFudHMuZGF0YWJhc2VVcmx9L2VtcGxveWVlLyR7b2JqLmluZGV4fS5qc29uYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVPZkJpcnRoOiBvYmouZG9iLFxuICAgICAgICAgICAgICAgICAgICBkYXRlT2ZKb2luOiBvYmouZG9qLFxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50OiBvYmouZGVwLFxuICAgICAgICAgICAgICAgICAgICBpZDogb2JqLmlkLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiBvYmoucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxzOiBvYmouc2tpbGwsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtMb2NhdGlvbjogb2JqLmxvYyxcbiAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogb2JqLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNyYzogb2JqLmltZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRvYXN0KHRydWUsIG9iai5lcnJNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9hc3QoZmFsc2UsIG9iai5zdWNjTXNnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG4gICAgICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaERhdGEoZmlsbGVudHJ5KS50aGVuKChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBocm1BcHAgPSBGaXJlYmFzZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpO1xuIiwiaW1wb3J0IHsgdGFibGVDcmVhdGUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuaW1wb3J0IHsgRmlsdGVyQXJyIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5jb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG5jb25zdCBzb3J0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0LWJ1dHRvblwiKTtcbmxldCBkaXJGbGFnID0gMTtcbi8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBzb3J0RnVuID0gKCkgPT4ge1xuICAgIGxldCBhcnJheVRvU29ydCA9IGFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgaWYgKEZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgIGFycmF5VG9Tb3J0ID0gRmlsdGVyQXJyO1xuICAgIGxldCBhcnJUb1JlbmRlciA9IGFycmF5VG9Tb3J0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IG5hbWUyID0gYi5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgY29tcGFyaXNvbiA9IDA7XG4gICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uID0gMSAqIGRpckZsYWc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgY29tcGFyaXNvbiA9IC0xICogZGlyRmxhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICB9KTtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShhcnJUb1JlbmRlcik7XG4gICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi9hc3NldHMvaW1hZ2VzL2Rvd24tYXJyb3cuc3ZnXCI7XG4gICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi9hc3NldHMvaW1hZ2VzL3VwLWFycm93LnN2Z1wiO1xuICAgIH1cbn07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGZpbGxlbnRyeSwgc2tpbGxOYW1lQXJyLCBjaGFuZ2VTa2lsbE5hbWVBcnIsIHRvYXN0IH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBBcHBTdXBwb3J0RnVuIH0gZnJvbSBcIi4vQXBwU3VwcG9ydEZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBhcHBTdHJpbmdzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB1cGRhdGVJbmRleCwgaWRPZkVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGhybUFwcCwgZmlyZWJhc2VEYXRhLCBvcmlnaW5hbERhdGEsIGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKTtcbmNvbnN0IGRhdGVPZkpvaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvalwiKTtcbmNvbnN0IGRhdGFPZkJpcnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5jb25zdCBkZXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuY29uc3Qgcm9sZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuY29uc3QgbG9jSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1wiKTtcbmNvbnN0IHNraWxsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuY29uc3QgRnVsbHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IGZvcm1Ta2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1za2lsbFwiKTtcbmNvbnN0IGZvcm1JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWwtaW1nXCIpO1xuY29uc3QgaW1nRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1pbnB1dFwiKTtcbmNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG5jb25zdCBkYXRhRW50cnlOYW1lQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbmFtZS1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeURvakFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRvai1hbGVydCBcIik7XG5jb25zdCBkYXRhRW50cnlEb2JBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kb2ItYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlSb2xlQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktcm9sZS1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeURlcEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRlcC1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeUxvY0FsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWxvYy1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeVNraWxsQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktc2tpbGwtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlTdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGEtZW50cnktc3VibWl0XCIpO1xuY29uc3QgZGF0YUVudHJ5Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1mb3JtXCIpO1xuY29uc3QgZGF0YUVudHJ5RW1haWxBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1lbWFpbC1hbGVydFwiKTtcbmxldCBwdXRkYXRhID0ge1xuICAgIGluZGV4OiAwLFxuICAgIGlkOiAwLFxuICAgIG5hbWU6IFwiXCIsXG4gICAgZW1haWw6IFwiXCIsXG4gICAgZG9qOiBcIlwiLFxuICAgIGRvYjogXCJcIixcbiAgICBkZXA6IDAsXG4gICAgcm9sZTogXCJcIixcbiAgICBsb2M6IFwiXCIsXG4gICAgc2tpbGw6IFtdLFxuICAgIGltZzogXCJcIixcbiAgICBlcnJNc2c6IFwiXCIsXG4gICAgc3VjY01zZzogXCJcIixcbn07XG4vLyBpbWFnZSBnZW5lcmF0aW5nIGZ1bmN0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xubGV0IGJhc2U2NFN0cmluZzE7XG5jb25zdCBhZGRJbWdUb0Zvcm0gPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGltZ0ZpbGUxID0gKF9hID0gaW1nRWxlbS5maWxlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xuICAgIHRyeSB7XG4gICAgICAgIGJhc2U2NFN0cmluZzEgPSB5aWVsZCBBcHBTdXBwb3J0RnVuLnJlYWRGaWxlQXNCYXNlNjQoaW1nRmlsZTEpO1xuICAgICAgICBwdXRkYXRhLmltZyA9IGJhc2U2NFN0cmluZzE7XG4gICAgICAgIGZvcm1JbWcuc3JjID0gYmFzZTY0U3RyaW5nMTtcbiAgICB9XG4gICAgY2F0Y2ggKF9iKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgZmV0Y2hpbmcgYmFzZTY0U3RyaW5nXCIpO1xuICAgICAgICBmb3JtSW1nLnNyYyA9IGFwcFN0cmluZ3MuZGVmYXVsdFBpYztcbiAgICAgICAgcHV0ZGF0YS5pbWcgPSBhcHBTdHJpbmdzLmRlZmF1bHRQaWM7XG4gICAgfVxuICAgIGlmIChpbWdGaWxlMSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYmFzZTY0U3RyaW5nMSA9IGFwcFN0cmluZ3MuZGVmYXVsdFBpYztcbiAgICAgICAgcHV0ZGF0YS5pbWcgPSBhcHBTdHJpbmdzLmRlZmF1bHRQaWM7XG4gICAgfVxufSk7XG5pbWdFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBhZGRJbWdUb0Zvcm0pO1xuLy9oYW5kbGluZyB0aGUgc3VibWl0IGJ1dHRvbiBjbGlja1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBoYW5kbGVTdWJtaXRDbGljayA9IChlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcHV0ZGF0YS5uYW1lID0gbmFtZS52YWx1ZTtcbiAgICBwdXRkYXRhLmVtYWlsID0gZW1haWwudmFsdWU7XG4gICAgcHV0ZGF0YS5kb2ogPSBkYXRlT2ZKb2luLnZhbHVlO1xuICAgIHB1dGRhdGEuZG9iID0gZGF0YU9mQmlydGgudmFsdWU7XG4gICAgcHV0ZGF0YS5kZXAgPSBBcHBTdXBwb3J0RnVuLnJldHVybkRlcElEKGRlcElucHV0LnZhbHVlLCBhY3R1YWxEYXRhKTtcbiAgICBwdXRkYXRhLnJvbGUgPSByb2xlSW5wdXQudmFsdWU7XG4gICAgcHV0ZGF0YS5sb2MgPSBsb2NJbnB1dC52YWx1ZTtcbiAgICBwdXRkYXRhLnNraWxsID0gQXBwU3VwcG9ydEZ1bi5yZXR1cm5Ta2lsbEFycihza2lsbE5hbWVBcnIsIGFjdHVhbERhdGEpO1xuICAgIGxldCBpc0VyciA9IGZhbHNlO1xuICAgIGlmIChwdXRkYXRhLm5hbWUubGVuZ3RoIDwgMikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeU5hbWVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeU5hbWVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFwdXRkYXRhLmRvaikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURvakFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RG9qQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5kb2IpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEb2JBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURvYkFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAocHV0ZGF0YS5yb2xlID09PSBcIm5vbmVcIikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeVJvbGVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeVJvbGVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFwdXRkYXRhLmRlcCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURlcEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RGVwQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChwdXRkYXRhLmxvYyA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlMb2NBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeUxvY0FsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIXB1dGRhdGEuc2tpbGwubGVuZ3RoKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5U2tpbGxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeVNraWxsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghZW1haWwuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgIGRhdGFFbnRyeUVtYWlsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlFbWFpbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoZGF0YUVudHJ5U3VibWl0LnZhbHVlID09IFwiQWRkXCIpIHtcbiAgICAgICAgaWYgKCFpc0Vycikge1xuICAgICAgICAgICAgbGV0IGVudHJ5SW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsRGF0YS5lbXBsb3llZSkge1xuICAgICAgICAgICAgICAgIGZpcmViYXNlRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBlbnRyeUluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSBlbnRyeUluZGV4ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gMDtcbiAgICAgICAgICAgIGxldCBlbXBsb3llZUlEID0gMTAwMTtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbERhdGEuZW1wbG95ZWUpIHtcbiAgICAgICAgICAgICAgICBlbXBsb3llZUlEID1cbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyKG9yaWdpbmFsRGF0YS5lbXBsb3llZVtvcmlnaW5hbERhdGEuZW1wbG95ZWUubGVuZ3RoIC0gMV0uaWQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZW1wbG95ZWVJRCA9IDEwMDE7XG4gICAgICAgICAgICBwdXRkYXRhLmlkID0gZW1wbG95ZWVJRDtcbiAgICAgICAgICAgIHB1dGRhdGEuaW5kZXggPSBlbnRyeUluZGV4O1xuICAgICAgICAgICAgcHV0ZGF0YS5lcnJNc2cgPSBhcHBTdHJpbmdzLmFkZEVyck1zZztcbiAgICAgICAgICAgIHB1dGRhdGEuc3VjY01zZyA9IGFwcFN0cmluZ3MuYWRkU3VjY2Vzc01zZztcbiAgICAgICAgICAgIC8vcGFzc2luZyBkYXRhIHRvIGVudGVyIG5ldyBlbXBsb3llZSBkZXRhaWxzXG4gICAgICAgICAgICBocm1BcHAucHV0RGF0YShwdXRkYXRhLCBmaWxsZW50cnksIHRvYXN0KTtcbiAgICAgICAgICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgbnVsbEFyciA9IFtdO1xuICAgICAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKG51bGxBcnIpO1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b2FzdCh0cnVlLCBhcHBTdHJpbmdzLmFkZEVyck1zZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YUVudHJ5U3VibWl0LnZhbHVlID09IFwiVXBkYXRlXCIpIHtcbiAgICAgICAgaWYgKCFpc0Vycikge1xuICAgICAgICAgICAgbGV0IGVtcGxveWVlSUQgPSBpZE9mRW1wO1xuICAgICAgICAgICAgcHV0ZGF0YS5pZCA9IGVtcGxveWVlSUQ7XG4gICAgICAgICAgICBpZiAoYmFzZTY0U3RyaW5nMSlcbiAgICAgICAgICAgICAgICBwdXRkYXRhLmltZyA9IGJhc2U2NFN0cmluZzE7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcHV0ZGF0YS5pbWcgPSBhcHBTdHJpbmdzLmRlZmF1bHRQaWM7XG4gICAgICAgICAgICBwdXRkYXRhLmVyck1zZyA9IGFwcFN0cmluZ3MudXBkYXRlRXJyTXNnO1xuICAgICAgICAgICAgcHV0ZGF0YS5zdWNjTXNnID0gYXBwU3RyaW5ncy51cGRhdGVTdWNjZXNzTXNnO1xuICAgICAgICAgICAgcHV0ZGF0YS5pbmRleCA9IHVwZGF0ZUluZGV4O1xuICAgICAgICAgICAgLy9wYXNzaW5nIGRhdGEgdG8gdXBkYXRlIGVtcGxveWVlXG4gICAgICAgICAgICBocm1BcHAucHV0RGF0YShwdXRkYXRhLCBmaWxsZW50cnksIHRvYXN0KTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5kYXRhRW50cnlGb3JtLm9uc3VibWl0ID0gaGFuZGxlU3VibWl0Q2xpY2s7XG4vL2RhdGEtZW50cnktZm9ybSBza2lsbCBzZWN0aW9uIGZ1bmN0aW9uYWxpdGllc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbkZ1bGx0YWJsZS5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoc2tpbGxOYW1lKTtcbiAgICB9XG59O1xuZm9ybVNraWxsLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuaWQgPT0gXCJza2lsbFwiICYmICFza2lsbE5hbWVBcnIuaW5jbHVkZXMoc2tpbGxJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgaWYgKHNraWxsSW5wdXQudmFsdWUgIT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgIHNraWxsTmFtZUFyci5wdXNoKHNraWxsSW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHtza2lsbElucHV0LnZhbHVlfVwiIGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICR7c2tpbGxJbnB1dC52YWx1ZX1cbjwvZGl2PmA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLW9wdGlvbnNcIikgJiZcbiAgICAgICAgIXNraWxsTmFtZUFyci5pbmNsdWRlcyh0YXJnZXQuaWQpKSB7XG4gICAgICAgIHNraWxsTmFtZUFyci5wdXNoKHRhcmdldC5pZCk7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHt0YXJnZXQuaWR9XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgICAgICAgICAgICAgICAke3RhcmdldC5pZH1cbiAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICB9XG59O1xuYWRkZWRTa2lsbHMub25jbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5kYXRhc2V0LnJlbUlkKSB7XG4gICAgICAgIGxldCBza2lsbE5hbWVBcnJDb3B5ID0gc2tpbGxOYW1lQXJyLmZpbHRlcigoZWxlbSkgPT4gZWxlbSAhPSB0YXJnZXQuZGF0YXNldC5yZW1JZCk7XG4gICAgICAgIGNoYW5nZVNraWxsTmFtZUFycihza2lsbE5hbWVBcnJDb3B5KTtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgc2tpbGxOYW1lQXJyLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgPGRpdiBkYXRhLXJlbS1pZD1cIiR7ZWxlbX1cIiBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAke2VsZW19XG4gICAgICA8L2Rpdj5gO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2tpbGxJbnB1dC52YWx1ZSA9IFwibm9uZVwiO1xufTtcbiIsIi8vIEFwcENvbnN0YW50c1xuZXhwb3J0IGNvbnN0IGFwcENvbnN0YW50cyA9IHtcbiAgICBkYXRhYmFzZVVybDogXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiLFxufTtcbi8vIEFwcFN0cmluZ3NcbmV4cG9ydCBjb25zdCBhcHBTdHJpbmdzID0ge1xuICAgIGFkZFN1Y2Nlc3NNc2c6IFwiU3VjY2VzZnVsbHkgYWRkZWQgZW1wbG95ZWVcIixcbiAgICBhZGRFcnJNc2c6IFwiRXJyb3Igd2hpbGUgYWRkaW5nIGVtcGxveWVlXCIsXG4gICAgdXBkYXRlU3VjY2Vzc01zZzogXCJTdWNjZXNmdWxseSB1cGRhdGVkIGVtcGxveWVlXCIsXG4gICAgdXBkYXRlRXJyTXNnOiBcIkVycm9yIHdoaWxlIHVwZGF0aW5nIGVtcGxveWVlXCIsXG4gICAgZGVsU3VjY2Vzc01zZzogXCJTdWNjZXNmdWxseSBkZWxldGVkIHRoZSBlbXBsb3llZVwiLFxuICAgIGRlbEVyck1zZzogXCJFcnJvciB3aGlsZSBkZWxldGluZyBlbXBsb3llZVwiLFxuICAgIGZldGNoRXJyTXNnOiBcIkVycm9yIHdoaWxlIGZldGNoaW5nIHRoZSBkYXRhXCIsXG4gICAgZGVmYXVsdFBpYzogXCIuL2Fzc2V0cy9pbWFnZXMvcHJvZmlsZS5wbmdcIixcbn07XG4iLCJpbXBvcnQgeyBmaWxsZW50cnksIHRvYXN0IH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBocm1BcHAsIGZpcmViYXNlRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbmZpcm0tYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IGRlbEVtcCA9IChpZCkgPT4ge1xuICAgIGxldCBkZWxJbmRleDtcbiAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGVsZW0gPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAoZWxlbS5pZCA9PSBpZClcbiAgICAgICAgICAgIGRlbEluZGV4ID0gaW5kZXg7XG4gICAgfSk7XG4gICAgY29uZmlybUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBocm1BcHAuZGVsZXRlRGF0YShkZWxJbmRleCwgZmlsbGVudHJ5LCB0b2FzdCk7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH07XG59O1xuIiwiLy8gZmV0Y2ggc2tpbGwgZm9ybSBmaXJlYmFzZSBhbmQgZGlzcGxheSBpdCBvbiB0aGUgZmlsdGVyIHNraWxsIHNlY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmltcG9ydCB7IGZpbHRlclRhYmxlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmNvbnN0IGZpbHRlclNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyLXNlYXJjaC1ib3hcIik7XG5jb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItZmlsdGVyLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBSZW5kZXJGaWx0ZXJCb3ggPSAoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+IHtcbiAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1DaGVja2VkID0gZWxlbTtcbiAgICAgICAgaWYgKGVsZW1DaGVja2VkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuZmlsdGVyU2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBSZW5kZXJGaWx0ZXJCb3gpO1xuY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFyRmlsdGVyKTtcbiIsImltcG9ydCB7IGhhbmRsZVRhYmxlQ2xpY2sgfSBmcm9tIFwiLi90YWJsZUFjdGlvbkJ1dHRvblwiO1xuaW1wb3J0IHsgaHJtQXBwIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmltcG9ydCB7IGFwcFN0cmluZ3MgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5jb25zdCBkYXRhRW50cnlGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWZvcm1cIik7XG5jb25zdCBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCBcIik7XG5jb25zdCBzb3J0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0LWJ1dHRvblwiKTtcbmNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWlucHV0LWJveFwiKTtcbmNvbnN0IGRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuY29uc3Qgcm9sZUVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuY29uc3Qgc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IGRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbmNvbnN0IGNhbmNlbERlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLWRlbC1idXR0b25cIik7XG5jb25zdCBhZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbmNvbnN0IGRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG5jb25zdCBmb3JtSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsLWltZ1wiKTtcbmNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5jb25zdCBkYXRhVmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctbW9kYWxcIik7XG5jb25zdCBkYXRhRGVsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZGVsLW1vZGFsXCIpO1xuY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuaW1wb3J0IHsgc29ydEZ1biB9IGZyb20gXCIuL1NvcnRGdW5cIjtcbmltcG9ydCB7IG9yaWdpbmFsRGF0YSwgYWN0dWFsRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5leHBvcnQgbGV0IHNraWxsTmFtZUFyciA9IFtdOyAvL3N0cmluZyBhcnJheVxuZXhwb3J0IGxldCBza2lsbE5hbWU7XG5leHBvcnQgY29uc3QgY2hhbmdlU2tpbGxOYW1lQXJyID0gKGVsZW0pID0+IHtcbiAgICBza2lsbE5hbWVBcnIgPSBlbGVtO1xufTtcbmV4cG9ydCBjb25zdCBjaGFuZ2VTa2lsbE5hbWUgPSAoZWxlbSkgPT4ge1xuICAgIHNraWxsTmFtZSA9IGVsZW07XG59O1xuY29uc3Qgc2tpbGxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2tpbGxcIik7XG5jb25zdCBGdWxsdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlXCIpO1xuY29uc3QgZm9ybVNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLXNraWxsXCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmNvbnN0IHRvYXN0TXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdC1tc2dcIik7XG5jb25zdCB0b2FzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9hc3RcIik7XG4vL2dlbmVyYWwgdGFibGUgcmVuZGVyaW5nIGZ1bmN0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IHRvYXN0ID0gKHR5cGUsIG1zZykgPT4ge1xuICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHRvYXN0TXNnLmlubmVySFRNTCA9IG1zZztcbiAgICAgICAgbWF0ZXJpYWxTeW1ib2xzT3V0bGluZWQuaW5uZXJIVE1MID0gXCJlcnJvclwiO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS5iYWNrZ3JvdW5kID1cbiAgICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDExMS40ZGVnLCByZ2IoMjQ2LCA0LCAyNikgMC40JSwgcmdiKDI1MSwgMTM5LCAzNCkgMTAwLjIlKVwiO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMTcwJSlcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRvYXN0TXNnLmlubmVySFRNTCA9IG1zZztcbiAgICAgICAgdG9hc3REaXYuc3R5bGUuYmFja2dyb3VuZCA9XG4gICAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCgxNzkuMWRlZywgcmdiKDQzLCAxNzAsIDk2KSAyLjMlLCByZ2IoMTI5LCAyMDQsIDEwNCkgOTguMyUpXCI7XG4gICAgICAgIG1hdGVyaWFsU3ltYm9sc091dGxpbmVkLmlubmVySFRNTCA9IFwiZG9uZVwiO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMTcwJSlcIjtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgwKVwiO1xuICAgIH0sIDMwMDApO1xufTtcbmV4cG9ydCBjb25zdCB0YWJsZUNyZWF0ZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBsZXQgZGVwID0gb3JpZ2luYWxEYXRhLmRlcGFydG1lbnRbb2JqZWxlbS5kZXBhcnRtZW50IC0gMV0uZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgKz0gYFxuICAgIDx0ciBjbGFzcz1cImRhdGEtcm93XCI+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uaWR9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5mdWxsTmFtZX08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmVtYWlsfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2RlcH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJhY3Rpb24tYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJ2aWV3LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL3ZpZXctaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInZpZXcgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9lZGl0LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJFZGl0IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2RlbC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICAgYDtcbiAgICB9KTtcbn07XG4vLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBmaWxsZW50cnkgPSAob2JqKSA9PiB7XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUob2JqLmVtcGxveWVlKTtcbiAgICAvLyBmaWx0ZXIgc2tpbGwgYnV0dG9uIHNjcmlwdFxuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuPC9kaXY+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgZGVwYXJ0bWVudCBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLmRlcGFydG1lbnROYW1lfVwiPiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgcm9sZUVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmoucm9sZS5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgc2tpbGwgaW4gc2tpbGwgc2VsZWN0aW9uIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIGNsYXNzPVwic2tpbGwtb3B0aW9uc1wiIGlkPVwiJHtvYmplbGVtLnNraWxsfVwiIHZhbHVlPVwiJHtvYmplbGVtLnNraWxsfVwiPiR7b2JqZWxlbS5za2lsbH08L29wdGlvbj5gO1xuICAgIH0pO1xufTtcbi8vZmV0Y2hpbmcgZGF0YSB3aG9sZSBkYXRhIGZyb20gZmlyZWJhc2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaHJtQXBwLmZldGNoRGF0YShmaWxsZW50cnkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBzb3J0RnVuKCk7XG59KTtcbnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUYWJsZUNsaWNrKTtcbi8vY2xvc2UgZGF0YS12aWV3LW1vZGFsXG5kYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vY2xvc2UgZGF0YS1kZWwtbW9kYWxcbmNhbmNlbERlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vQWRkIGVtcGxveWVlIGZ1bmN0aW9uXG5hZGRFbXBsb3llZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoW10pO1xuICAgIGZvcm1JbWcuc3JjID0gYXBwU3RyaW5ncy5kZWZhdWx0UGljO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZGF0YUVudHJ5U3VibWl0LnZhbHVlID0gXCJBZGRcIjtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn0pO1xuZGF0YUVudHJ5Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkYXRhRW50cnlGb3JtLnJlc2V0KCk7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL2ZpbHRlckFuZFNlYXJjaCBmdW5jdGlvbmFsaXR5XG5leHBvcnQgbGV0IEZpbHRlckFyciA9IFtdO1xuZXhwb3J0IGNvbnN0IGZpbHRlclRhYmxlID0gKCkgPT4ge1xuICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnRcIik7XG4gICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbTtcbiAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICBpZiAodHJpYWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGVsZW1lbnQuZGF0YXNldC5za2lsbE51bTtcbiAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgRmlsdGVyQXJyID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0uZnVsbE5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNodmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrZWRGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgfVxuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKEZpbHRlckFycik7XG59O1xuY29uc3QgY2hhbmdlU2tpbGxTdGF0ZSA9IChza2lsbElkKSA9PiB7XG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgdGVtcC5jbGljaygpO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuc2tpbGxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSAmJlxuICAgICAgICB0YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXQuZGF0YXNldC5za2lsbElkO1xuICAgICAgICBjaGFuZ2VTa2lsbFN0YXRlKGRhdGFzZXQpO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IFwiSU5QVVRcIiB8fCB0YXJnZXQudGFnTmFtZSA9PT0gXCJMQUJFTFwiKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldENsb3Nlc3QgPSB0YXJnZXQuY2xvc2VzdChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldENsb3Nlc3QuZGF0YXNldC5za2lsbElkO1xuICAgICAgICBmaWx0ZXJUYWJsZSgpO1xuICAgIH1cbn0pO1xuc29ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc29ydEZ1bik7XG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZpbHRlclRhYmxlKTtcbi8vc2V0dGluZyBsaW1pdCB0byBkYXRlIG9mIGJpcnRoXG5sZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvSlNPTigpLnNsaWNlKDAsIDEwKTtcbmNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iXCIpO1xuZGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcIm1heFwiLCB0b2RheSk7XG4iLCJjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuY29uc3QgZGF0YUVudHJ5U3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRhLWVudHJ5LXN1Ym1pdFwiKTtcbmNvbnN0IGZvcm1JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWwtaW1nXCIpO1xuaW1wb3J0IHsgdXBkYXRlRW1wIH0gZnJvbSBcIi4vdXBkYXRlRW1wbG95ZWVcIjtcbmltcG9ydCB7IHZpZXdNb2RhbCB9IGZyb20gXCIuL3ZpZXdFbXBsb3llZVwiO1xuaW1wb3J0IHsgZGVsRW1wIH0gZnJvbSBcIi4vZGVsZXRlRW1wbG95ZWVcIjtcbmltcG9ydCB7IG9yaWdpbmFsRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5pbXBvcnQgeyBhcHBTdHJpbmdzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5leHBvcnQgY29uc3QgaGFuZGxlVGFibGVDbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aWV3LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHZpZXdNb2RhbChOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWwtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkZWxFbXAoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxuICAgIC8vLyB1cGRhdGUgdXNlciBkZXRhaWxzIGZ1bmN0aW9uYWxpdHlcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXQtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9IFwiVXBkYXRlXCI7XG4gICAgICAgIGxldCB0cnlPYmogPSBvcmlnaW5hbERhdGEuZW1wbG95ZWUuZmlsdGVyKChlbGVtKSA9PiBlbGVtLmlkID09IE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgICAgICBjb25zb2xlLmxvZyh0cnlPYmopO1xuICAgICAgICBpZiAodHJ5T2JqWzBdLmltYWdlU3JjKSB7XG4gICAgICAgICAgICBmb3JtSW1nLnNyYyA9IHRyeU9ialswXS5pbWFnZVNyYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1JbWcuc3JjID0gYXBwU3RyaW5ncy5kZWZhdWx0UGljO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUVtcChOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IHt9O1xuIiwiaW1wb3J0IHsgY2hhbmdlU2tpbGxOYW1lLCBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGFjdHVhbERhdGEsIGZpcmViYXNlRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG4vLyBleHBvcnQgbGV0IHNraWxsTmFtZTogc3RyaW5nW107XG5jb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lXCIpO1xuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpO1xuY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuY29uc3QgZGF0YU9mQmlydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmNvbnN0IGRlcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBsb2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jXCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmxldCB1cGRhdGVJbmRleCA9IDA7XG5sZXQgaWRPZkVtcCA9IDEwMDE7XG5leHBvcnQgY29uc3QgdXBkYXRlRW1wID0gKGlkKSA9PiB7XG4gICAgaWRPZkVtcCA9IGlkO1xuICAgIGxldCBjdXJyT2JqO1xuICAgIGxldCBkZXBhcnRtZW50O1xuICAgIGZpcmViYXNlRGF0YS5lbXBsb3llZS5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlbHNlIGlmIChvYmouaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIGN1cnJPYmogPSBvYmo7XG4gICAgICAgICAgICBmaXJlYmFzZURhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JqID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJPYmouZGVwYXJ0bWVudCA9PSBvYmouZGVwYXJ0bWVudElEKVxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50ID0gb2JqLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IGZpcmViYXNlRGF0YS5lbXBsb3llZS5sZW5ndGg7IHN0ZXArKykge1xuICAgICAgICAgICAgICAgIGlmIChmaXJlYmFzZURhdGEuZW1wbG95ZWVbc3RlcF0gPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdLmlkID09IGN1cnJPYmouaWQpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUluZGV4ID0gc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWUudmFsdWUgPSBgJHtjdXJyT2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbC52YWx1ZSA9IGAke2N1cnJPYmouZW1haWx9YDtcbiAgICAgICAgICAgIGRhdGVPZkpvaW4udmFsdWUgPSBgJHtjdXJyT2JqLmRhdGVPZkJpcnRofWA7XG4gICAgICAgICAgICBkYXRhT2ZCaXJ0aC52YWx1ZSA9IGAke2N1cnJPYmouZGF0ZU9mSm9pbn1gO1xuICAgICAgICAgICAgbG9jSW5wdXQudmFsdWUgPSBgJHtjdXJyT2JqLndvcmtMb2NhdGlvbn1gO1xuICAgICAgICAgICAgcm9sZUlucHV0LnZhbHVlID0gYCR7Y3Vyck9iai5yb2xlfWA7XG4gICAgICAgICAgICBkZXBJbnB1dC52YWx1ZSA9IGAke2RlcGFydG1lbnR9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBza2lsbE5hbWVDb3B5ID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoKGFjYywgZWxlbSkgPT4ge1xuICAgICAgICBpZiAoY3Vyck9iai5za2lsbHMuaW5jbHVkZXMoZWxlbS5za2lsbElEKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgY2hhbmdlU2tpbGxOYW1lKHNraWxsTmFtZUNvcHkpO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2tpbGxOYW1lLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBkYXRhLXJlbS1pZD0ke2VsZW19IGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2VsZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG59O1xuZXhwb3J0IHsgdXBkYXRlSW5kZXgsIGlkT2ZFbXAgfTtcbiIsImltcG9ydCB7IGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuY29uc3QgbmFtZVZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVWaWV3XCIpO1xuY29uc3QgZW1haWxWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFZpZXdcIik7XG5jb25zdCBlbXBJZFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtcElkVmlld1wiKTtcbmNvbnN0IGRvalZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvalZpZXdcIik7XG5jb25zdCBkb2JWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JWaWV3XCIpO1xuY29uc3QgZGVwVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwVmlld1wiKTtcbmNvbnN0IHJvbGVWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlVmlld1wiKTtcbmNvbnN0IGxvY1ZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1ZpZXdcIik7XG5jb25zdCBpbWdWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWdcIik7XG5jb25zdCB2aWV3U2tpbGxCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpZXctc2tpbGwtYm94XCIpO1xuZXhwb3J0IGNvbnN0IHZpZXdNb2RhbCA9IChpZCkgPT4ge1xuICAgIGxldCB2aWV3T2JqO1xuICAgIGxldCBkZXBhcnRtZW50O1xuICAgIGFjdHVhbERhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBpZiAoZWxlbS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgdmlld09iaiA9IGVsZW07XG4gICAgICAgICAgICBhY3R1YWxEYXRhLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdPYmouZGVwYXJ0bWVudCA9PSBvYmouZGVwYXJ0bWVudElEKVxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50ID0gb2JqLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbWdWaWV3LnNyYyA9IGAke3ZpZXdPYmouaW1hZ2VTcmN9YDtcbiAgICAgICAgICAgIG5hbWVWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZnVsbE5hbWV9YDtcbiAgICAgICAgICAgIGVtYWlsVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmVtYWlsfWA7XG4gICAgICAgICAgICBlbXBJZFZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5pZH1gO1xuICAgICAgICAgICAgZG9qVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmRhdGVPZkpvaW59YDtcbiAgICAgICAgICAgIGRvYlZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5kYXRlT2ZCaXJ0aH1gO1xuICAgICAgICAgICAgZGVwVmlldy5pbm5lckhUTUwgPSBgJHtkZXBhcnRtZW50fWA7XG4gICAgICAgICAgICByb2xlVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLnJvbGV9YDtcbiAgICAgICAgICAgIGxvY1ZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai53b3JrTG9jYXRpb259YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBlYWNoU2tpbGwgPSBhY3R1YWxEYXRhLnNraWxsLnJlZHVjZSgoYWNjLCBlbGVtKSA9PiB7XG4gICAgICAgIGlmICh2aWV3T2JqLnNraWxscy5pbmNsdWRlcyhlbGVtLnNraWxsSUQpKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2NdO1xuICAgIH0sIFtdKTtcbiAgICB2aWV3U2tpbGxCb3guaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlYWNoU2tpbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICB2aWV3U2tpbGxCb3guaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVhY2gtc2tpbGwtdmlld1wiPiR7ZWxlbX08L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0LnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL1NvcnRGdW4udHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29uc3RhbnRzLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3R5cGUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYWRkVXBkYXRlRW1wbG95ZWUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZGVsZXRlRW1wbG95ZWUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdXBkYXRlRW1wbG95ZWUudHNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy92aWV3RW1wbG95ZWUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
=======

