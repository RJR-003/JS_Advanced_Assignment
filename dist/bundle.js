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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ3lDO0FBQ3pDO0FBQzJDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLG9EQUFZLGFBQWE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxvREFBWSxhQUFhLFlBQVksTUFBTTtBQUN2RjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsNEJBQTRCLGtEQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixrREFBVTtBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLG9EQUFZLGFBQWEsWUFBWSxVQUFVO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RmdDO0FBQ0k7QUFDTjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxzQkFBc0Isb0RBQVU7QUFDaEMsUUFBUSw4Q0FBUztBQUNqQixzQkFBc0IsOENBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUM4RTtBQUN6QjtBQUNaO0FBQ2U7QUFDbkI7QUFDMEM7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw4REFBYTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtEQUFVO0FBQ2hDLHNCQUFzQixrREFBVTtBQUNoQztBQUNBO0FBQ0Esd0JBQXdCLGtEQUFVO0FBQ2xDLHNCQUFzQixrREFBVTtBQUNoQztBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsOERBQWEsNkJBQTZCLG9EQUFVO0FBQ3RFO0FBQ0E7QUFDQSxvQkFBb0IsOERBQWEsZ0JBQWdCLGlEQUFZLEVBQUUsb0RBQVU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNEQUFZO0FBQzVCLGdCQUFnQixzREFBWTtBQUM1QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQVk7QUFDNUI7QUFDQSwyQkFBMkIsc0RBQVksVUFBVSxzREFBWTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0RBQVU7QUFDdkMsOEJBQThCLGtEQUFVO0FBQ3hDO0FBQ0EsWUFBWSxnREFBTSxrQkFBa0IsOENBQVMsRUFBRSwwQ0FBSztBQUNwRDtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJEQUFrQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksOENBQUssT0FBTyxrREFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvREFBTztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrREFBVTtBQUN4Qyw2QkFBNkIsa0RBQVU7QUFDdkMsOEJBQThCLGtEQUFVO0FBQ3hDLDRCQUE0Qix3REFBVztBQUN2QztBQUNBLFlBQVksZ0RBQU0sa0JBQWtCLDhDQUFTLEVBQUUsMENBQUs7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyREFBa0IsQ0FBQyw4Q0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpREFBWTtBQUM3QztBQUNBLFlBQVksaURBQVk7QUFDeEI7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsaURBQVk7QUFDckIsUUFBUSxpREFBWTtBQUNwQjtBQUNBLHNDQUFzQyxVQUFVO0FBQ2hELG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsaURBQVk7QUFDM0MsUUFBUSwyREFBa0I7QUFDMUI7QUFDQSxRQUFRLGlEQUFZO0FBQ3BCO0FBQ0EsOEJBQThCLEtBQUs7QUFDbkMsWUFBWTtBQUNaO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNPQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDRDO0FBQ1M7QUFDckQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLElBQUksc0RBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLGdEQUFNLHNCQUFzQiw4Q0FBUyxFQUFFLDBDQUFLO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUN1QztBQUNJO0FBQzNDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvREFBVTtBQUNkO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixRQUFRLG9CQUFvQixTQUFTO0FBQ3RILHNDQUFzQyxRQUFRO0FBQzlDLHNCQUFzQixRQUFRLEtBQUssY0FBYztBQUNqRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxvREFBVztBQUNmO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakN1RDtBQUNoQjtBQUNFO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDb0M7QUFDcUI7QUFDbEQsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0Esa0JBQWtCLHNEQUFZO0FBQzlCO0FBQ0E7QUFDQSxjQUFjLFdBQVc7QUFDekIsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxjQUFjO0FBQzVCLGNBQWMsSUFBSTtBQUNsQjtBQUNBLG9DQUFvQyxXQUFXLHFCQUFxQixZQUFZO0FBQ2hGO0FBQ0EsMERBQTBELFdBQVcscUJBQXFCLFlBQVk7QUFDdEc7QUFDQSx5REFBeUQsV0FBVyxxQkFBcUIsWUFBWTtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSxRQUFRLG9CQUFvQixTQUFTO0FBQ2xILGtDQUFrQyxRQUFRO0FBQzFDLGtCQUFrQixRQUFRLEtBQUssY0FBYztBQUM3QztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsdUJBQXVCLElBQUksdUJBQXVCO0FBQzFHLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsYUFBYSxJQUFJLGFBQWE7QUFDaEYsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSxjQUFjLFdBQVcsY0FBYyxJQUFJLGNBQWM7QUFDcEksS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdEQUFNO0FBQ047QUFDQSxJQUFJLGlEQUFPO0FBQ1gsQ0FBQztBQUNELGdDQUFnQyxnRUFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isa0RBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDTztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsd0JBQXdCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLG9EQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHFDQUFxQyw2Q0FBTztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNkM7QUFDRjtBQUNEO0FBQ0c7QUFDSjtBQUNsQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3REFBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQU07QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0RBQVk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsa0RBQVU7QUFDcEM7QUFDQSxRQUFRLDBEQUFTO0FBQ2pCO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JDVTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0E0QztBQUNHO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUksc0RBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLCtCQUErQixPQUFPLHNEQUFZLGtCQUFrQjtBQUNwRSxvQkFBb0Isc0RBQVk7QUFDaEM7QUFDQSx5QkFBeUIsc0RBQVk7QUFDckM7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0MsNkJBQTZCLGNBQWM7QUFDM0Msa0NBQWtDLG9CQUFvQjtBQUN0RCxtQ0FBbUMsbUJBQW1CO0FBQ3RELGdDQUFnQyxxQkFBcUI7QUFDckQsaUNBQWlDLGFBQWE7QUFDOUMsZ0NBQWdDLFdBQVc7QUFDM0M7QUFDQSxLQUFLO0FBQ0wsd0JBQXdCLG9EQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSx3REFBZTtBQUNuQjtBQUNBLElBQUksOENBQVM7QUFDYjtBQUNBLDJCQUEyQixNQUFNO0FBQ2pDLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ2dDOzs7Ozs7Ozs7Ozs7Ozs7O0FDNURXO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsSUFBSSxvREFBVTtBQUNkO0FBQ0E7QUFDQSxZQUFZLG9EQUFVO0FBQ3RCO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsNkJBQTZCLGlCQUFpQjtBQUM5QyxvQ0FBb0MsaUJBQWlCO0FBQ3JELHFDQUFxQyxjQUFjO0FBQ25ELHFDQUFxQyxXQUFXO0FBQ2hELG1DQUFtQyxtQkFBbUI7QUFDdEQsbUNBQW1DLG9CQUFvQjtBQUN2RCxtQ0FBbUMsV0FBVztBQUM5QyxvQ0FBb0MsYUFBYTtBQUNqRCxtQ0FBbUMscUJBQXFCO0FBQ3hEO0FBQ0EsS0FBSztBQUNMLG9CQUFvQixvREFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDN0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL0FwcFN1cHBvcnRGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvRGF0YVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL1NvcnRGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2FkZFVwZGF0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2RlbGV0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9maWx0ZXJBbmRTZWFyY2hGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3NjcmlwdC50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3R5cGUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3VwZGF0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy92aWV3RW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcHBTdXBwb3J0RnVuIHtcbiAgICAvL3N0YXRpYyBtZXRob2QgdG8gY29udmVydCBza2lsbE5hbWUgdG8gc2tpbGwgaWQgYXJyYXlcbiAgICBzdGF0aWMgcmV0dXJuU2tpbGxBcnIoYXJyT2ZOYW1lcywgZGF0YSkge1xuICAgICAgICBhcnJPZk5hbWVzID0gYXJyT2ZOYW1lcy5tYXAoKGVsZW0pID0+IGVsZW0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIGNvbnN0IHNraWxsSURBcnIgPSBkYXRhLnNraWxsLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBlbGVtKSB7XG4gICAgICAgICAgICBpZiAoYXJyT2ZOYW1lcy5pbmNsdWRlcyhlbGVtLnNraWxsLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxJRF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIHNraWxsSURBcnI7XG4gICAgfVxuICAgIC8vIGNvbnZlcnRzIGRlcGFydG1lbnQgbmFtZSB0byBkZXBhcnRtZW50IGlkXG4gICAgc3RhdGljIHJldHVybkRlcElEKGRlcE5hbWUsIGRhdGEpIHtcbiAgICAgICAgZGVwTmFtZSA9IGRlcE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgZGVwSUQgPSBkYXRhLmRlcGFydG1lbnQucmVkdWNlKCh2YWx1ZSwgZWxlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW0uZGVwYXJ0bWVudE5hbWUudG9Mb3dlckNhc2UoKSA9PSBkZXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBlbGVtLmRlcGFydG1lbnRJRDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sIDApO1xuICAgICAgICByZXR1cm4gZGVwSUQ7XG4gICAgfVxuICAgIC8vc3RhdGljIG1ldGhvZCB0byByZWFkIEZpbGUgYXMgYmFzZTY0XG4gICAgc3RhdGljIHJlYWRGaWxlQXNCYXNlNjQoZmlsZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gZmlsZSBzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKF9hID0gZS50YXJnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGFwcFN0cmluZ3MgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmltcG9ydCB7IGFwcENvbnN0YW50cyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuZXhwb3J0IGxldCBmaXJlYmFzZURhdGE7XG5leHBvcnQgbGV0IG9yaWdpbmFsRGF0YTtcbmV4cG9ydCBsZXQgYWN0dWFsRGF0YTtcbmNsYXNzIEZpcmViYXNlU2luZ2xldG9uIHtcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICghRmlyZWJhc2VTaW5nbGV0b24uaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIEZpcmViYXNlU2luZ2xldG9uLmluc3RhbmNlID0gbmV3IEZpcmViYXNlU2luZ2xldG9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZpcmViYXNlU2luZ2xldG9uLmluc3RhbmNlO1xuICAgIH1cbiAgICAvLyBSZWFkIGl0ZW1zIGZyb20gZmlyZWJhc2UgZGF0YWJhc2VcbiAgICBmZXRjaERhdGEoZmlsbGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke2FwcENvbnN0YW50cy5kYXRhYmFzZVVybH0vLmpzb25gKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2VEYXRhID0gc3RydWN0dXJlZENsb25lKGRhdGEpO1xuICAgICAgICAgICAgICAgIGRhdGEuZW1wbG95ZWUgPSBkYXRhLmVtcGxveWVlLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbERhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgYWN0dWFsRGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZmlsbGVudHJ5KGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhID8gZGF0YSA6IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVsZXRlRGF0YShpbmRleCwgZmlsbGVudHJ5LCB0b2FzdCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHthcHBDb25zdGFudHMuZGF0YWJhc2VVcmx9L2VtcGxveWVlLyR7aW5kZXh9Lmpzb25gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGRlbGV0aW5nIGVtcGxveWVlXCIpO1xuICAgICAgICAgICAgICAgIHRvYXN0KHRydWUsIGFwcFN0cmluZ3MuZGVsRXJyTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRvYXN0KGZhbHNlLCBhcHBTdHJpbmdzLmRlbFN1Y2Nlc3NNc2cpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hEYXRhKGZpbGxlbnRyeSkudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIChBZGQpIGEgbmV3IGl0ZW0gdG8gdGhlIEZpcmViYXNlIFJlYWx0aW1lIERhdGFiYXNlXG4gICAgcHV0RGF0YShvYmosIGZpbGxlbnRyeSwgdG9hc3QpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7YXBwQ29uc3RhbnRzLmRhdGFiYXNlVXJsfS9lbXBsb3llZS8ke29iai5pbmRleH0uanNvbmAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBkYXRlT2ZCaXJ0aDogb2JqLmRvYixcbiAgICAgICAgICAgICAgICAgICAgZGF0ZU9mSm9pbjogb2JqLmRvaixcbiAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudDogb2JqLmRlcCxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG9iai5pZCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogb2JqLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIHNraWxsczogb2JqLnNraWxsLFxuICAgICAgICAgICAgICAgICAgICB3b3JrTG9jYXRpb246IG9iai5sb2MsXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lOiBvYmoubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IG9iai5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTcmM6IG9iai5pbWcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0b2FzdCh0cnVlLCBvYmouZXJyTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvYXN0KGZhbHNlLCBvYmouc3VjY01zZyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgICAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hEYXRhKGZpbGxlbnRyeSkudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgaHJtQXBwID0gRmlyZWJhc2VTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKTtcbiIsImltcG9ydCB7IHRhYmxlQ3JlYXRlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmltcG9ydCB7IEZpbHRlckFyciB9IGZyb20gXCIuL3NjcmlwdFwiO1xuY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuY29uc3Qgc29ydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydC1idXR0b25cIik7XG5sZXQgZGlyRmxhZyA9IDE7XG4vLyBzb3J0IGZ1bmN0aW9uYWxpdHlcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3Qgc29ydEZ1biA9ICgpID0+IHtcbiAgICBsZXQgYXJyYXlUb1NvcnQgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgIGlmIChGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKVxuICAgICAgICBhcnJheVRvU29ydCA9IEZpbHRlckFycjtcbiAgICBsZXQgYXJyVG9SZW5kZXIgPSBhcnJheVRvU29ydC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUxID0gYS5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBuYW1lMiA9IGIuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IGNvbXBhcmlzb24gPSAwO1xuICAgICAgICBpZiAobmFtZTEgPiBuYW1lMikge1xuICAgICAgICAgICAgY29tcGFyaXNvbiA9IDEgKiBkaXJGbGFnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUxIDwgbmFtZTIpIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb24gPSAtMSAqIGRpckZsYWc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBhcmlzb247XG4gICAgfSk7XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUoYXJyVG9SZW5kZXIpO1xuICAgIGlmIChkaXJGbGFnID09IDEpIHtcbiAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4vYXNzZXRzL2ltYWdlcy9kb3duLWFycm93LnN2Z1wiO1xuICAgICAgICBkaXJGbGFnID0gLTE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkaXJGbGFnID0gMTtcbiAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4vYXNzZXRzL2ltYWdlcy91cC1hcnJvdy5zdmdcIjtcbiAgICB9XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBmaWxsZW50cnksIHNraWxsTmFtZUFyciwgY2hhbmdlU2tpbGxOYW1lQXJyLCB0b2FzdCB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgQXBwU3VwcG9ydEZ1biB9IGZyb20gXCIuL0FwcFN1cHBvcnRGdW5jdGlvblwiO1xuaW1wb3J0IHsgYXBwU3RyaW5ncyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdXBkYXRlSW5kZXgsIGlkT2ZFbXAgfSBmcm9tIFwiLi91cGRhdGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgc2tpbGxOYW1lIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBocm1BcHAsIGZpcmViYXNlRGF0YSwgb3JpZ2luYWxEYXRhLCBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIik7XG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIik7XG5jb25zdCBkYXRlT2ZKb2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pcIik7XG5jb25zdCBkYXRhT2ZCaXJ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iXCIpO1xuY29uc3QgZGVwSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmNvbnN0IHJvbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbmNvbnN0IGxvY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NcIik7XG5jb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBmb3JtU2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2tpbGxcIik7XG5jb25zdCBmb3JtSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsLWltZ1wiKTtcbmNvbnN0IGltZ0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtaW5wdXRcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuY29uc3QgZGF0YUVudHJ5TmFtZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW5hbWUtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlEb2pBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kb2otYWxlcnQgXCIpO1xuY29uc3QgZGF0YUVudHJ5RG9iQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZG9iLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5Um9sZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LXJvbGUtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlEZXBBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kZXAtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlMb2NBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1sb2MtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlTa2lsbEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LXNraWxsLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5U3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRhLWVudHJ5LXN1Ym1pdFwiKTtcbmNvbnN0IGRhdGFFbnRyeUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZm9ybVwiKTtcbmNvbnN0IGRhdGFFbnRyeUVtYWlsQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZW1haWwtYWxlcnRcIik7XG5sZXQgcHV0ZGF0YSA9IHtcbiAgICBpbmRleDogMCxcbiAgICBpZDogMCxcbiAgICBuYW1lOiBcIlwiLFxuICAgIGVtYWlsOiBcIlwiLFxuICAgIGRvajogXCJcIixcbiAgICBkb2I6IFwiXCIsXG4gICAgZGVwOiAwLFxuICAgIHJvbGU6IFwiXCIsXG4gICAgbG9jOiBcIlwiLFxuICAgIHNraWxsOiBbXSxcbiAgICBpbWc6IFwiXCIsXG4gICAgZXJyTXNnOiBcIlwiLFxuICAgIHN1Y2NNc2c6IFwiXCIsXG59O1xuLy8gaW1hZ2UgZ2VuZXJhdGluZyBmdW5jdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmxldCBiYXNlNjRTdHJpbmcxO1xuY29uc3QgYWRkSW1nVG9Gb3JtID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBpbWdGaWxlMSA9IChfYSA9IGltZ0VsZW0uZmlsZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcbiAgICB0cnkge1xuICAgICAgICBiYXNlNjRTdHJpbmcxID0geWllbGQgQXBwU3VwcG9ydEZ1bi5yZWFkRmlsZUFzQmFzZTY0KGltZ0ZpbGUxKTtcbiAgICAgICAgcHV0ZGF0YS5pbWcgPSBiYXNlNjRTdHJpbmcxO1xuICAgICAgICBmb3JtSW1nLnNyYyA9IGJhc2U2NFN0cmluZzE7XG4gICAgfVxuICAgIGNhdGNoIChfYikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGZldGNoaW5nIGJhc2U2NFN0cmluZ1wiKTtcbiAgICAgICAgZm9ybUltZy5zcmMgPSBhcHBTdHJpbmdzLmRlZmF1bHRQaWM7XG4gICAgICAgIHB1dGRhdGEuaW1nID0gYXBwU3RyaW5ncy5kZWZhdWx0UGljO1xuICAgIH1cbiAgICBpZiAoaW1nRmlsZTEgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJhc2U2NFN0cmluZzEgPSBhcHBTdHJpbmdzLmRlZmF1bHRQaWM7XG4gICAgICAgIHB1dGRhdGEuaW1nID0gYXBwU3RyaW5ncy5kZWZhdWx0UGljO1xuICAgIH1cbn0pO1xuaW1nRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgYWRkSW1nVG9Gb3JtKTtcbi8vaGFuZGxpbmcgdGhlIHN1Ym1pdCBidXR0b24gY2xpY2tcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3QgaGFuZGxlU3VibWl0Q2xpY2sgPSAoZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHB1dGRhdGEubmFtZSA9IG5hbWUudmFsdWU7XG4gICAgcHV0ZGF0YS5lbWFpbCA9IGVtYWlsLnZhbHVlO1xuICAgIHB1dGRhdGEuZG9qID0gZGF0ZU9mSm9pbi52YWx1ZTtcbiAgICBwdXRkYXRhLmRvYiA9IGRhdGFPZkJpcnRoLnZhbHVlO1xuICAgIHB1dGRhdGEuZGVwID0gQXBwU3VwcG9ydEZ1bi5yZXR1cm5EZXBJRChkZXBJbnB1dC52YWx1ZSwgYWN0dWFsRGF0YSk7XG4gICAgcHV0ZGF0YS5yb2xlID0gcm9sZUlucHV0LnZhbHVlO1xuICAgIHB1dGRhdGEubG9jID0gbG9jSW5wdXQudmFsdWU7XG4gICAgcHV0ZGF0YS5za2lsbCA9IEFwcFN1cHBvcnRGdW4ucmV0dXJuU2tpbGxBcnIoc2tpbGxOYW1lQXJyLCBhY3R1YWxEYXRhKTtcbiAgICBsZXQgaXNFcnIgPSBmYWxzZTtcbiAgICBpZiAocHV0ZGF0YS5uYW1lLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlOYW1lQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlOYW1lQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5kb2opIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEb2pBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURvakFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIXB1dGRhdGEuZG9iKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RG9iQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEb2JBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKHB1dGRhdGEucm9sZSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlSb2xlQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlSb2xlQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5kZXApIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlEZXBBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeURlcEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAocHV0ZGF0YS5sb2MgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5TG9jQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlMb2NBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFwdXRkYXRhLnNraWxsLmxlbmd0aCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeVNraWxsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlTa2lsbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIWVtYWlsLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICBkYXRhRW50cnlFbWFpbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RW1haWxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9PSBcIkFkZFwiKSB7XG4gICAgICAgIGlmICghaXNFcnIpIHtcbiAgICAgICAgICAgIGxldCBlbnRyeUluZGV4ID0gMDtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbERhdGEuZW1wbG95ZWUpIHtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gZW50cnlJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gZW50cnlJbmRleCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgZW1wbG95ZWVJRCA9IDEwMDE7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxEYXRhLmVtcGxveWVlKSB7XG4gICAgICAgICAgICAgICAgZW1wbG95ZWVJRCA9XG4gICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmlnaW5hbERhdGEuZW1wbG95ZWVbb3JpZ2luYWxEYXRhLmVtcGxveWVlLmxlbmd0aCAtIDFdLmlkKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVtcGxveWVlSUQgPSAxMDAxO1xuICAgICAgICAgICAgcHV0ZGF0YS5pZCA9IGVtcGxveWVlSUQ7XG4gICAgICAgICAgICBwdXRkYXRhLmluZGV4ID0gZW50cnlJbmRleDtcbiAgICAgICAgICAgIHB1dGRhdGEuZXJyTXNnID0gYXBwU3RyaW5ncy5hZGRFcnJNc2c7XG4gICAgICAgICAgICBwdXRkYXRhLnN1Y2NNc2cgPSBhcHBTdHJpbmdzLmFkZFN1Y2Nlc3NNc2c7XG4gICAgICAgICAgICAvL3Bhc3NpbmcgZGF0YSB0byBlbnRlciBuZXcgZW1wbG95ZWUgZGV0YWlsc1xuICAgICAgICAgICAgaHJtQXBwLnB1dERhdGEocHV0ZGF0YSwgZmlsbGVudHJ5LCB0b2FzdCk7XG4gICAgICAgICAgICBkYXRhRW50cnlGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgbGV0IG51bGxBcnIgPSBbXTtcbiAgICAgICAgICAgIGNoYW5nZVNraWxsTmFtZUFycihudWxsQXJyKTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9hc3QodHJ1ZSwgYXBwU3RyaW5ncy5hZGRFcnJNc2cpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9PSBcIlVwZGF0ZVwiKSB7XG4gICAgICAgIGlmICghaXNFcnIpIHtcbiAgICAgICAgICAgIGxldCBlbXBsb3llZUlEID0gaWRPZkVtcDtcbiAgICAgICAgICAgIHB1dGRhdGEuaWQgPSBlbXBsb3llZUlEO1xuICAgICAgICAgICAgaWYgKGJhc2U2NFN0cmluZzEpXG4gICAgICAgICAgICAgICAgcHV0ZGF0YS5pbWcgPSBiYXNlNjRTdHJpbmcxO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHB1dGRhdGEuaW1nID0gYXBwU3RyaW5ncy5kZWZhdWx0UGljO1xuICAgICAgICAgICAgcHV0ZGF0YS5lcnJNc2cgPSBhcHBTdHJpbmdzLnVwZGF0ZUVyck1zZztcbiAgICAgICAgICAgIHB1dGRhdGEuc3VjY01zZyA9IGFwcFN0cmluZ3MudXBkYXRlU3VjY2Vzc01zZztcbiAgICAgICAgICAgIHB1dGRhdGEuaW5kZXggPSB1cGRhdGVJbmRleDtcbiAgICAgICAgICAgIC8vcGFzc2luZyBkYXRhIHRvIHVwZGF0ZSBlbXBsb3llZVxuICAgICAgICAgICAgaHJtQXBwLnB1dERhdGEocHV0ZGF0YSwgZmlsbGVudHJ5LCB0b2FzdCk7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZGF0YUVudHJ5Rm9ybS5vbnN1Ym1pdCA9IGhhbmRsZVN1Ym1pdENsaWNrO1xuLy9kYXRhLWVudHJ5LWZvcm0gc2tpbGwgc2VjdGlvbiBmdW5jdGlvbmFsaXRpZXNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5GdWxsdGFibGUub25jbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKHNraWxsTmFtZSk7XG4gICAgfVxufTtcbmZvcm1Ta2lsbC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmlkID09IFwic2tpbGxcIiAmJiAhc2tpbGxOYW1lQXJyLmluY2x1ZGVzKHNraWxsSW5wdXQudmFsdWUpKSB7XG4gICAgICAgIGlmIChza2lsbElucHV0LnZhbHVlICE9IFwibm9uZVwiKSB7XG4gICAgICAgICAgICBza2lsbE5hbWVBcnIucHVzaChza2lsbElucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgPGRpdiBkYXRhLXJlbS1pZD1cIiR7c2tpbGxJbnB1dC52YWx1ZX1cIiBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAke3NraWxsSW5wdXQudmFsdWV9XG48L2Rpdj5gO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbC1vcHRpb25zXCIpICYmXG4gICAgICAgICFza2lsbE5hbWVBcnIuaW5jbHVkZXModGFyZ2V0LmlkKSkge1xuICAgICAgICBza2lsbE5hbWVBcnIucHVzaCh0YXJnZXQuaWQpO1xuICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLXJlbS1pZD1cIiR7dGFyZ2V0LmlkfVwiIGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICAgICAgICAgJHt0YXJnZXQuaWR9XG4gICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgfVxufTtcbmFkZGVkU2tpbGxzLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuZGF0YXNldC5yZW1JZCkge1xuICAgICAgICBsZXQgc2tpbGxOYW1lQXJyQ29weSA9IHNraWxsTmFtZUFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0gIT0gdGFyZ2V0LmRhdGFzZXQucmVtSWQpO1xuICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIoc2tpbGxOYW1lQXJyQ29weSk7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHNraWxsTmFtZUFyci5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke2VsZW19XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgICAgICAgJHtlbGVtfVxuICAgICAgPC9kaXY+YDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNraWxsSW5wdXQudmFsdWUgPSBcIm5vbmVcIjtcbn07XG4iLCIvLyBBcHBDb25zdGFudHNcbmV4cG9ydCBjb25zdCBhcHBDb25zdGFudHMgPSB7XG4gICAgZGF0YWJhc2VVcmw6IFwiaHR0cHM6Ly9ocm0tYXBwLTM5YmQ5LWRlZmF1bHQtcnRkYi5hc2lhLXNvdXRoZWFzdDEuZmlyZWJhc2VkYXRhYmFzZS5hcHBcIixcbn07XG4vLyBBcHBTdHJpbmdzXG5leHBvcnQgY29uc3QgYXBwU3RyaW5ncyA9IHtcbiAgICBhZGRTdWNjZXNzTXNnOiBcIlN1Y2Nlc2Z1bGx5IGFkZGVkIGVtcGxveWVlXCIsXG4gICAgYWRkRXJyTXNnOiBcIkVycm9yIHdoaWxlIGFkZGluZyBlbXBsb3llZVwiLFxuICAgIHVwZGF0ZVN1Y2Nlc3NNc2c6IFwiU3VjY2VzZnVsbHkgdXBkYXRlZCBlbXBsb3llZVwiLFxuICAgIHVwZGF0ZUVyck1zZzogXCJFcnJvciB3aGlsZSB1cGRhdGluZyBlbXBsb3llZVwiLFxuICAgIGRlbFN1Y2Nlc3NNc2c6IFwiU3VjY2VzZnVsbHkgZGVsZXRlZCB0aGUgZW1wbG95ZWVcIixcbiAgICBkZWxFcnJNc2c6IFwiRXJyb3Igd2hpbGUgZGVsZXRpbmcgZW1wbG95ZWVcIixcbiAgICBmZXRjaEVyck1zZzogXCJFcnJvciB3aGlsZSBmZXRjaGluZyB0aGUgZGF0YVwiLFxuICAgIGRlZmF1bHRQaWM6IFwiLi9hc3NldHMvaW1hZ2VzL3Byb2ZpbGUucG5nXCIsXG59O1xuIiwiaW1wb3J0IHsgZmlsbGVudHJ5LCB0b2FzdCB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgaHJtQXBwLCBmaXJlYmFzZURhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5jb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb25maXJtLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBkZWxFbXAgPSAoaWQpID0+IHtcbiAgICBsZXQgZGVsSW5kZXg7XG4gICAgZmlyZWJhc2VEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChlbGVtID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGVsc2UgaWYgKGVsZW0uaWQgPT0gaWQpXG4gICAgICAgICAgICBkZWxJbmRleCA9IGluZGV4O1xuICAgIH0pO1xuICAgIGNvbmZpcm1CdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgaHJtQXBwLmRlbGV0ZURhdGEoZGVsSW5kZXgsIGZpbGxlbnRyeSwgdG9hc3QpO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9O1xufTtcbiIsIi8vIGZldGNoIHNraWxsIGZvcm0gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgb24gdGhlIGZpbHRlciBza2lsbCBzZWN0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5pbXBvcnQgeyBmaWx0ZXJUYWJsZSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgYWN0dWFsRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5jb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG5jb25zdCBmaWx0ZXJTZWFyY2hCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlci1zZWFyY2gtYm94XCIpO1xuY29uc3QgY2xlYXJGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsZWFyLWZpbHRlci1idXR0b25cIik7XG5leHBvcnQgY29uc3QgUmVuZGVyRmlsdGVyQm94ID0gKCkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGZpbHRlclNlYXJjaEJveC52YWx1ZTtcbiAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgYWN0dWFsRGF0YS5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICBpZiAoc2tpbGxJZC5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgICAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3QgY2xlYXJGaWx0ZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnQgaW5wdXRcIik7XG4gICAgc2tpbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtQ2hlY2tlZCA9IGVsZW07XG4gICAgICAgIGlmIChlbGVtQ2hlY2tlZC5jaGVja2VkKSB7XG4gICAgICAgICAgICBlbGVtQ2hlY2tlZC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmaWx0ZXJUYWJsZSgpO1xufTtcbmZpbHRlclNlYXJjaEJveC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgUmVuZGVyRmlsdGVyQm94KTtcbmNsZWFyRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGVhckZpbHRlcik7XG4iLCJpbXBvcnQgeyBoYW5kbGVUYWJsZUNsaWNrIH0gZnJvbSBcIi4vdGFibGVBY3Rpb25CdXR0b25cIjtcbmltcG9ydCB7IGhybUFwcCB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5pbXBvcnQgeyBhcHBTdHJpbmdzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5jb25zdCBkYXRhRW50cnlTdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGEtZW50cnktc3VibWl0XCIpO1xuY29uc3QgZGF0YUVudHJ5Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1mb3JtXCIpO1xuY29uc3QgbWF0ZXJpYWxTeW1ib2xzT3V0bGluZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgXCIpO1xuY29uc3Qgc29ydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydC1idXR0b25cIik7XG5jb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1pbnB1dC1ib3hcIik7XG5jb25zdCBkZXBhcnRtZW50RW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmNvbnN0IHJvbGVFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbmNvbnN0IHNraWxsU2VsZWNFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2tpbGxcIik7XG5jb25zdCBkYXRhVmlld0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctY2xvc2VcIik7XG5jb25zdCBjYW5jZWxEZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC1kZWwtYnV0dG9uXCIpO1xuY29uc3QgYWRkRW1wbG95ZWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1lbXBsb3llZS1idXR0b25cIik7XG5jb25zdCBkYXRhRW50cnlDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1jbG9zZVwiKTtcbmNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuY29uc3QgZm9ybUltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbC1pbWdcIik7XG5jb25zdCB0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmltcG9ydCB7IHNvcnRGdW4gfSBmcm9tIFwiLi9Tb3J0RnVuXCI7XG5pbXBvcnQgeyBvcmlnaW5hbERhdGEsIGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuZXhwb3J0IGxldCBza2lsbE5hbWVBcnIgPSBbXTsgLy9zdHJpbmcgYXJyYXlcbmV4cG9ydCBsZXQgc2tpbGxOYW1lO1xuZXhwb3J0IGNvbnN0IGNoYW5nZVNraWxsTmFtZUFyciA9IChlbGVtKSA9PiB7XG4gICAgc2tpbGxOYW1lQXJyID0gZWxlbTtcbn07XG5leHBvcnQgY29uc3QgY2hhbmdlU2tpbGxOYW1lID0gKGVsZW0pID0+IHtcbiAgICBza2lsbE5hbWUgPSBlbGVtO1xufTtcbmNvbnN0IHNraWxsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuY29uc3QgRnVsbHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IGZvcm1Ta2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1za2lsbFwiKTtcbmNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG5jb25zdCB0b2FzdE1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9hc3QtbXNnXCIpO1xuY29uc3QgdG9hc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0XCIpO1xuLy9nZW5lcmFsIHRhYmxlIHJlbmRlcmluZyBmdW5jdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCB0b2FzdCA9ICh0eXBlLCBtc2cpID0+IHtcbiAgICBpZiAodHlwZSkge1xuICAgICAgICB0b2FzdE1zZy5pbm5lckhUTUwgPSBtc2c7XG4gICAgICAgIG1hdGVyaWFsU3ltYm9sc091dGxpbmVkLmlubmVySFRNTCA9IFwiZXJyb3JcIjtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUuYmFja2dyb3VuZCA9XG4gICAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCgxMTEuNGRlZywgcmdiKDI0NiwgNCwgMjYpIDAuNCUsIHJnYigyNTEsIDEzOSwgMzQpIDEwMC4yJSlcIjtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDE3MCUpXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0b2FzdE1zZy5pbm5lckhUTUwgPSBtc2c7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLmJhY2tncm91bmQgPVxuICAgICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoMTc5LjFkZWcsIHJnYig0MywgMTcwLCA5NikgMi4zJSwgcmdiKDEyOSwgMjA0LCAxMDQpIDk4LjMlKVwiO1xuICAgICAgICBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZC5pbm5lckhUTUwgPSBcImRvbmVcIjtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDE3MCUpXCI7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0b2FzdERpdi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMClcIjtcbiAgICB9LCAzMDAwKTtcbn07XG5leHBvcnQgY29uc3QgdGFibGVDcmVhdGUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgbGV0IGRlcCA9IG9yaWdpbmFsRGF0YS5kZXBhcnRtZW50W29iamVsZW0uZGVwYXJ0bWVudCAtIDFdLmRlcGFydG1lbnROYW1lO1xuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MICs9IGBcbiAgICA8dHIgY2xhc3M9XCJkYXRhLXJvd1wiPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmlkfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZnVsbE5hbWV9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5lbWFpbH08L3RkPlxuICAgICAgICA8dGQ+JHtkZXB9PC90ZD5cbiAgICAgICAgPHRkIGlkPVwiYWN0aW9uLWJ1dHRvbi1jZWxsXCI+XG4gICAgICAgICAgICA8YnV0dG9uICBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwidmlldy1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy92aWV3LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJ2aWV3IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtaW1hZ2UtaWNvblwiIGRhdGEtZW1wLWlkPSR7b2JqZWxlbS5pZH0+PGltZyBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfSBjbGFzcz1cImVkaXQtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZWRpdC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRWRpdCBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIGRhdGEtZW1wLWlkPSR7b2JqZWxlbS5pZH0+PGltZyBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfSBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9kZWwtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkRlbGV0ZSBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIGA7XG4gICAgfSk7XG59O1xuLy8gZmV0Y2hpbmcgZGF0YSBmcm9tIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IGludG8gdGhlIHRhYmxlXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3QgZmlsbGVudHJ5ID0gKG9iaikgPT4ge1xuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKG9iai5lbXBsb3llZSk7XG4gICAgLy8gZmlsdGVyIHNraWxsIGJ1dHRvbiBzY3JpcHRcbiAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbElkID0gb2JqZWxlbS5za2lsbC5zcGxpdChcIiBcIikuam9pbihcIlwiKTtcbiAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbjwvZGl2PmA7XG4gICAgfSk7XG4gICAgLy9maWxsIGRlcGFydG1lbnQgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgb2JqLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBkZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX1cIj4ke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9PC9vcHRpb24+YDtcbiAgICB9KTtcbiAgICAvLyBmaWxsIHJvbGUgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgb2JqLnJvbGUuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICByb2xlRW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5yb2xlfVwiPiR7b2JqZWxlbS5yb2xlfTwvb3B0aW9uPmA7XG4gICAgfSk7XG4gICAgLy9maWxsIHNraWxsIGluIHNraWxsIHNlbGVjdGlvbiBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+Y2hvb3NlIHNraWxsPC9vcHRpb24+YDtcbiAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiBjbGFzcz1cInNraWxsLW9wdGlvbnNcIiBpZD1cIiR7b2JqZWxlbS5za2lsbH1cIiB2YWx1ZT1cIiR7b2JqZWxlbS5za2lsbH1cIj4ke29iamVsZW0uc2tpbGx9PC9vcHRpb24+YDtcbiAgICB9KTtcbn07XG4vL2ZldGNoaW5nIGRhdGEgd2hvbGUgZGF0YSBmcm9tIGZpcmViYXNlXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmhybUFwcC5mZXRjaERhdGEoZmlsbGVudHJ5KS50aGVuKChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgc29ydEZ1bigpO1xufSk7XG50YWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVGFibGVDbGljayk7XG4vL2Nsb3NlIGRhdGEtdmlldy1tb2RhbFxuZGF0YVZpZXdDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL2Nsb3NlIGRhdGEtZGVsLW1vZGFsXG5jYW5jZWxEZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL0FkZCBlbXBsb3llZSBmdW5jdGlvblxuYWRkRW1wbG95ZWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkYXRhRW50cnlGb3JtLnJlc2V0KCk7XG4gICAgY2hhbmdlU2tpbGxOYW1lQXJyKFtdKTtcbiAgICBmb3JtSW1nLnNyYyA9IGFwcFN0cmluZ3MuZGVmYXVsdFBpYztcbiAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9IFwiQWRkXCI7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59KTtcbmRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9maWx0ZXJBbmRTZWFyY2ggZnVuY3Rpb25hbGl0eVxuZXhwb3J0IGxldCBGaWx0ZXJBcnIgPSBbXTtcbmV4cG9ydCBjb25zdCBmaWx0ZXJUYWJsZSA9ICgpID0+IHtcbiAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50XCIpO1xuICAgIGxldCBjaGVja2VkRmlsdGVyQXJyID0gW107XG4gICAgaW5wdXRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW07XG4gICAgICAgIGNvbnN0IHRyaWFsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtlbGVtZW50LmRhdGFzZXQuc2tpbGxJZH1gKTtcbiAgICAgICAgaWYgKHRyaWFsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBlbGVtZW50LmRhdGFzZXQuc2tpbGxOdW07XG4gICAgICAgICAgICBjaGVja2VkRmlsdGVyQXJyLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzZWFyY2h2YWx1ZSA9IHNlYXJjaEJhci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIEZpbHRlckFyciA9IGFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgaWYgKHNlYXJjaEJhci52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtLmZ1bGxOYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaHZhbHVlKSk7XG4gICAgfVxuICAgIGlmIChjaGVja2VkRmlsdGVyQXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBjaGVja2VkRmlsdGVyQXJyLmV2ZXJ5KChjaGVja0VsZW0pID0+IGVsZW0uc2tpbGxzLmluY2x1ZGVzKE51bWJlcihjaGVja0VsZW0pKSkpO1xuICAgIH1cbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShGaWx0ZXJBcnIpO1xufTtcbmNvbnN0IGNoYW5nZVNraWxsU3RhdGUgPSAoc2tpbGxJZCkgPT4ge1xuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtza2lsbElkfWApO1xuICAgIHRlbXAuY2xpY2soKTtcbiAgICBmaWx0ZXJUYWJsZSgpO1xufTtcbnNraWxsTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLWVsZW1lbnRcIikgJiZcbiAgICAgICAgdGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIikge1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIklOUFVUXCIgfHwgdGFyZ2V0LnRhZ05hbWUgPT09IFwiTEFCRUxcIikge1xuICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXRDbG9zZXN0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgZmlsdGVyVGFibGUoKTtcbiAgICB9XG59KTtcbnNvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNvcnRGdW4pO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmaWx0ZXJUYWJsZSk7XG4vL3NldHRpbmcgbGltaXQgdG8gZGF0ZSBvZiBiaXJ0aFxubGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0pTT04oKS5zbGljZSgwLCAxMCk7XG5jb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgdG9kYXkpO1xuIiwiY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IGRhdGFWaWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1tb2RhbFwiKTtcbmNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5jb25zdCBmb3JtSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsLWltZ1wiKTtcbmltcG9ydCB7IHVwZGF0ZUVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyB2aWV3TW9kYWwgfSBmcm9tIFwiLi92aWV3RW1wbG95ZWVcIjtcbmltcG9ydCB7IGRlbEVtcCB9IGZyb20gXCIuL2RlbGV0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyBvcmlnaW5hbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuaW1wb3J0IHsgYXBwU3RyaW5ncyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuZXhwb3J0IGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlldy1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB2aWV3TW9kYWwoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsLWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGVsRW1wKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbiAgICAvLy8gdXBkYXRlIHVzZXIgZGV0YWlscyBmdW5jdGlvbmFsaXR5XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlTdWJtaXQudmFsdWUgPSBcIlVwZGF0ZVwiO1xuICAgICAgICBsZXQgdHJ5T2JqID0gb3JpZ2luYWxEYXRhLmVtcGxveWVlLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5pZCA9PSBOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICAgICAgaWYgKHRyeU9ialswXS5pbWFnZVNyYykge1xuICAgICAgICAgICAgZm9ybUltZy5zcmMgPSB0cnlPYmpbMF0uaW1hZ2VTcmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3JtSW1nLnNyYyA9IGFwcFN0cmluZ3MuZGVmYXVsdFBpYztcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVFbXAoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxufTtcbiIsImV4cG9ydCB7fTtcbiIsImltcG9ydCB7IGNoYW5nZVNraWxsTmFtZSwgc2tpbGxOYW1lIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBhY3R1YWxEYXRhLCBmaXJlYmFzZURhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuLy8gZXhwb3J0IGxldCBza2lsbE5hbWU6IHN0cmluZ1tdO1xuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKTtcbmNvbnN0IGRhdGVPZkpvaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvalwiKTtcbmNvbnN0IGRhdGFPZkJpcnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5jb25zdCBkZXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuY29uc3Qgcm9sZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuY29uc3QgbG9jSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1wiKTtcbmNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG5sZXQgdXBkYXRlSW5kZXggPSAwO1xubGV0IGlkT2ZFbXAgPSAxMDAxO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUVtcCA9IChpZCkgPT4ge1xuICAgIGlkT2ZFbXAgPSBpZDtcbiAgICBsZXQgY3Vyck9iajtcbiAgICBsZXQgZGVwYXJ0bWVudDtcbiAgICBmaXJlYmFzZURhdGEuZW1wbG95ZWUuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGlmIChvYmogPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAob2JqLmlkID09IGlkKSB7XG4gICAgICAgICAgICBjdXJyT2JqID0gb2JqO1xuICAgICAgICAgICAgZmlyZWJhc2VEYXRhLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyT2JqLmRlcGFydG1lbnQgPT0gb2JqLmRlcGFydG1lbnRJRClcbiAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudCA9IG9iai5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCBmaXJlYmFzZURhdGEuZW1wbG95ZWUubGVuZ3RoOyBzdGVwKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZpcmViYXNlRGF0YS5lbXBsb3llZVtzdGVwXS5pZCA9PSBjdXJyT2JqLmlkKVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVJbmRleCA9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYW1lLnZhbHVlID0gYCR7Y3Vyck9iai5mdWxsTmFtZX1gO1xuICAgICAgICAgICAgZW1haWwudmFsdWUgPSBgJHtjdXJyT2JqLmVtYWlsfWA7XG4gICAgICAgICAgICBkYXRlT2ZKb2luLnZhbHVlID0gYCR7Y3Vyck9iai5kYXRlT2ZCaXJ0aH1gO1xuICAgICAgICAgICAgZGF0YU9mQmlydGgudmFsdWUgPSBgJHtjdXJyT2JqLmRhdGVPZkpvaW59YDtcbiAgICAgICAgICAgIGxvY0lucHV0LnZhbHVlID0gYCR7Y3Vyck9iai53b3JrTG9jYXRpb259YDtcbiAgICAgICAgICAgIHJvbGVJbnB1dC52YWx1ZSA9IGAke2N1cnJPYmoucm9sZX1gO1xuICAgICAgICAgICAgZGVwSW5wdXQudmFsdWUgPSBgJHtkZXBhcnRtZW50fWA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgc2tpbGxOYW1lQ29weSA9IGFjdHVhbERhdGEuc2tpbGwucmVkdWNlKChhY2MsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGN1cnJPYmouc2tpbGxzLmluY2x1ZGVzKGVsZW0uc2tpbGxJRCkpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgfSwgW10pO1xuICAgIGNoYW5nZVNraWxsTmFtZShza2lsbE5hbWVDb3B5KTtcbiAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHNraWxsTmFtZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9JHtlbGVtfSBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtlbGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xufTtcbmV4cG9ydCB7IHVwZGF0ZUluZGV4LCBpZE9mRW1wIH07XG4iLCJpbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IG5hbWVWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lVmlld1wiKTtcbmNvbnN0IGVtYWlsVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxWaWV3XCIpO1xuY29uc3QgZW1wSWRWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbXBJZFZpZXdcIik7XG5jb25zdCBkb2pWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pWaWV3XCIpO1xuY29uc3QgZG9iVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iVmlld1wiKTtcbmNvbnN0IGRlcFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFZpZXdcIik7XG5jb25zdCByb2xlVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVZpZXdcIik7XG5jb25zdCBsb2NWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NWaWV3XCIpO1xuY29uc3QgaW1nVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1nXCIpO1xuY29uc3Qgdmlld1NraWxsQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWV3LXNraWxsLWJveFwiKTtcbmV4cG9ydCBjb25zdCB2aWV3TW9kYWwgPSAoaWQpID0+IHtcbiAgICBsZXQgdmlld09iajtcbiAgICBsZXQgZGVwYXJ0bWVudDtcbiAgICBhY3R1YWxEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGVsZW0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIHZpZXdPYmogPSBlbGVtO1xuICAgICAgICAgICAgYWN0dWFsRGF0YS5kZXBhcnRtZW50LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2aWV3T2JqLmRlcGFydG1lbnQgPT0gb2JqLmRlcGFydG1lbnRJRClcbiAgICAgICAgICAgICAgICAgICAgZGVwYXJ0bWVudCA9IG9iai5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW1nVmlldy5zcmMgPSBgJHt2aWV3T2JqLmltYWdlU3JjfWA7XG4gICAgICAgICAgICBuYW1lVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbFZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5lbWFpbH1gO1xuICAgICAgICAgICAgZW1wSWRWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouaWR9YDtcbiAgICAgICAgICAgIGRvalZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5kYXRlT2ZKb2lufWA7XG4gICAgICAgICAgICBkb2JWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZGF0ZU9mQmlydGh9YDtcbiAgICAgICAgICAgIGRlcFZpZXcuaW5uZXJIVE1MID0gYCR7ZGVwYXJ0bWVudH1gO1xuICAgICAgICAgICAgcm9sZVZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5yb2xlfWA7XG4gICAgICAgICAgICBsb2NWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmoud29ya0xvY2F0aW9ufWA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgZWFjaFNraWxsID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoKGFjYywgZWxlbSkgPT4ge1xuICAgICAgICBpZiAodmlld09iai5za2lsbHMuaW5jbHVkZXMoZWxlbS5za2lsbElEKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgdmlld1NraWxsQm94LmlubmVySFRNTCA9IFwiXCI7XG4gICAgZWFjaFNraWxsLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgdmlld1NraWxsQm94LmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlYWNoLXNraWxsLXZpZXdcIj4ke2VsZW19PC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9maWx0ZXJBbmRTZWFyY2hGdW4udHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdC50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Tb3J0RnVuLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnN0YW50cy50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90eXBlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FkZFVwZGF0ZUVtcGxveWVlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2RlbGV0ZUVtcGxveWVlLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3VwZGF0ZUVtcGxveWVlLnRzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdmlld0VtcGxveWVlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9