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
        console.log(tryObj);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2pELG1DQUFtQyxxQkFBcUI7QUFDeEQ7QUFDQSxLQUFLO0FBQ0wsb0JBQW9CLG9EQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7VUM3Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvQXBwU3VwcG9ydEZ1bmN0aW9uLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9EYXRhU2VydmljZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvU29ydEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvYWRkVXBkYXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvZGVsZXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvc2NyaXB0LnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy90YWJsZUFjdGlvbkJ1dHRvbi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdHlwZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdXBkYXRlRW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3ZpZXdFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFwcFN1cHBvcnRGdW4ge1xuICAgIC8vc3RhdGljIG1ldGhvZCB0byBjb252ZXJ0IHNraWxsTmFtZSB0byBza2lsbCBpZCBhcnJheVxuICAgIHN0YXRpYyByZXR1cm5Ta2lsbEFycihhcnJPZk5hbWVzLCBkYXRhKSB7XG4gICAgICAgIGFyck9mTmFtZXMgPSBhcnJPZk5hbWVzLm1hcCgoZWxlbSkgPT4gZWxlbS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgY29uc3Qgc2tpbGxJREFyciA9IGRhdGEuc2tpbGwucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGVsZW0pIHtcbiAgICAgICAgICAgIGlmIChhcnJPZk5hbWVzLmluY2x1ZGVzKGVsZW0uc2tpbGwudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbElEXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICAgICAgfSwgW10pO1xuICAgICAgICByZXR1cm4gc2tpbGxJREFycjtcbiAgICB9XG4gICAgLy8gY29udmVydHMgZGVwYXJ0bWVudCBuYW1lIHRvIGRlcGFydG1lbnQgaWRcbiAgICBzdGF0aWMgcmV0dXJuRGVwSUQoZGVwTmFtZSwgZGF0YSkge1xuICAgICAgICBkZXBOYW1lID0gZGVwTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBkZXBJRCA9IGRhdGEuZGVwYXJ0bWVudC5yZWR1Y2UoKHZhbHVlLCBlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbS5kZXBhcnRtZW50TmFtZS50b0xvd2VyQ2FzZSgpID09IGRlcE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGVsZW0uZGVwYXJ0bWVudElEO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwgMCk7XG4gICAgICAgIHJldHVybiBkZXBJRDtcbiAgICB9XG4gICAgLy9zdGF0aWMgbWV0aG9kIHRvIHJlYWQgRmlsZSBhcyBiYXNlNjRcbiAgICBzdGF0aWMgcmVhZEZpbGVBc0Jhc2U2NChmaWxlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJObyBmaWxlIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgoX2EgPSBlLnRhcmdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgYXBwU3RyaW5ncyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuaW1wb3J0IHsgYXBwQ29uc3RhbnRzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5leHBvcnQgbGV0IGZpcmViYXNlRGF0YTtcbmV4cG9ydCBsZXQgb3JpZ2luYWxEYXRhO1xuZXhwb3J0IGxldCBhY3R1YWxEYXRhO1xuY2xhc3MgRmlyZWJhc2VTaW5nbGV0b24ge1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKCFGaXJlYmFzZVNpbmdsZXRvbi5pbnN0YW5jZSkge1xuICAgICAgICAgICAgRmlyZWJhc2VTaW5nbGV0b24uaW5zdGFuY2UgPSBuZXcgRmlyZWJhc2VTaW5nbGV0b24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRmlyZWJhc2VTaW5nbGV0b24uaW5zdGFuY2U7XG4gICAgfVxuICAgIC8vIFJlYWQgaXRlbXMgZnJvbSBmaXJlYmFzZSBkYXRhYmFzZVxuICAgIGZldGNoRGF0YShmaWxsZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYCR7YXBwQ29uc3RhbnRzLmRhdGFiYXNlVXJsfS8uanNvbmApO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBmaXJlYmFzZURhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgZGF0YS5lbXBsb3llZSA9IGRhdGEuZW1wbG95ZWUuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgICAgICAgICAgICAgICBhY3R1YWxEYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICBmaWxsZW50cnkoZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgPyBkYXRhIDogW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWxldGVEYXRhKGluZGV4LCBmaWxsZW50cnksIHRvYXN0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAke2FwcENvbnN0YW50cy5kYXRhYmFzZVVybH0vZW1wbG95ZWUvJHtpbmRleH0uanNvbmAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gZGVsZXRpbmcgZW1wbG95ZWVcIik7XG4gICAgICAgICAgICAgICAgdG9hc3QodHJ1ZSwgYXBwU3RyaW5ncy5kZWxFcnJNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdG9hc3QoZmFsc2UsIGFwcFN0cmluZ3MuZGVsU3VjY2Vzc01zZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaERhdGEoZmlsbGVudHJ5KS50aGVuKChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgKEFkZCkgYSBuZXcgaXRlbSB0byB0aGUgRmlyZWJhc2UgUmVhbHRpbWUgRGF0YWJhc2VcbiAgICBwdXREYXRhKG9iaiwgZmlsbGVudHJ5LCB0b2FzdCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgJHthcHBDb25zdGFudHMuZGF0YWJhc2VVcmx9L2VtcGxveWVlLyR7b2JqLmluZGV4fS5qc29uYCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVPZkJpcnRoOiBvYmouZG9iLFxuICAgICAgICAgICAgICAgICAgICBkYXRlT2ZKb2luOiBvYmouZG9qLFxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50OiBvYmouZGVwLFxuICAgICAgICAgICAgICAgICAgICBpZDogb2JqLmlkLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiBvYmoucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgc2tpbGxzOiBvYmouc2tpbGwsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtMb2NhdGlvbjogb2JqLmxvYyxcbiAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogb2JqLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNyYzogb2JqLmltZyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRvYXN0KHRydWUsIG9iai5lcnJNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9hc3QoZmFsc2UsIG9iai5zdWNjTXNnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG4gICAgICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaERhdGEoZmlsbGVudHJ5KS50aGVuKChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBocm1BcHAgPSBGaXJlYmFzZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpO1xuIiwiaW1wb3J0IHsgdGFibGVDcmVhdGUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuaW1wb3J0IHsgRmlsdGVyQXJyIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5jb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG5jb25zdCBzb3J0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0LWJ1dHRvblwiKTtcbmxldCBkaXJGbGFnID0gMTtcbi8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBzb3J0RnVuID0gKCkgPT4ge1xuICAgIGxldCBhcnJheVRvU29ydCA9IGFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgaWYgKEZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgIGFycmF5VG9Tb3J0ID0gRmlsdGVyQXJyO1xuICAgIGxldCBhcnJUb1JlbmRlciA9IGFycmF5VG9Tb3J0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IG5hbWUyID0gYi5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgY29tcGFyaXNvbiA9IDA7XG4gICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uID0gMSAqIGRpckZsYWc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgY29tcGFyaXNvbiA9IC0xICogZGlyRmxhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICB9KTtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShhcnJUb1JlbmRlcik7XG4gICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy9kb3duLWFycm93LnN2Z1wiO1xuICAgICAgICBkaXJGbGFnID0gLTE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkaXJGbGFnID0gMTtcbiAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvdXAtYXJyb3cuc3ZnXCI7XG4gICAgfVxufTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZmlsbGVudHJ5LCBza2lsbE5hbWVBcnIsIGNoYW5nZVNraWxsTmFtZUFyciwgdG9hc3QgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IEFwcFN1cHBvcnRGdW4gfSBmcm9tIFwiLi9BcHBTdXBwb3J0RnVuY3Rpb25cIjtcbmltcG9ydCB7IGFwcFN0cmluZ3MgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHVwZGF0ZUluZGV4LCBpZE9mRW1wIH0gZnJvbSBcIi4vdXBkYXRlRW1wbG95ZWVcIjtcbmltcG9ydCB7IHNraWxsTmFtZSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgaHJtQXBwLCBmaXJlYmFzZURhdGEsIG9yaWdpbmFsRGF0YSwgYWN0dWFsRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5jb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lXCIpO1xuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpO1xuY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuY29uc3QgZGF0YU9mQmlydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmNvbnN0IGRlcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBsb2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jXCIpO1xuY29uc3Qgc2tpbGxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2tpbGxcIik7XG5jb25zdCBGdWxsdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlXCIpO1xuY29uc3QgZm9ybVNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLXNraWxsXCIpO1xuY29uc3QgZm9ybUltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbC1pbWdcIik7XG5jb25zdCBpbWdFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlLWlucHV0XCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmNvbnN0IGRhdGFFbnRyeU5hbWVBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1uYW1lLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5RG9qQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZG9qLWFsZXJ0IFwiKTtcbmNvbnN0IGRhdGFFbnRyeURvYkFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWRvYi1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeVJvbGVBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1yb2xlLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5RGVwQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZGVwLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5TG9jQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbG9jLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5U2tpbGxBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1za2lsbC1hbGVydFwiKTtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5jb25zdCBkYXRhRW50cnlGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWZvcm1cIik7XG5jb25zdCBkYXRhRW50cnlFbWFpbEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWVtYWlsLWFsZXJ0XCIpO1xubGV0IHB1dGRhdGEgPSB7XG4gICAgaW5kZXg6IDAsXG4gICAgaWQ6IDAsXG4gICAgbmFtZTogXCJcIixcbiAgICBlbWFpbDogXCJcIixcbiAgICBkb2o6IFwiXCIsXG4gICAgZG9iOiBcIlwiLFxuICAgIGRlcDogMCxcbiAgICByb2xlOiBcIlwiLFxuICAgIGxvYzogXCJcIixcbiAgICBza2lsbDogW10sXG4gICAgaW1nOiBcIlwiLFxuICAgIGVyck1zZzogXCJcIixcbiAgICBzdWNjTXNnOiBcIlwiLFxufTtcbi8vIGltYWdlIGdlbmVyYXRpbmcgZnVuY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5sZXQgYmFzZTY0U3RyaW5nMTtcbmNvbnN0IGFkZEltZ1RvRm9ybSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHZhciBfYTtcbiAgICBsZXQgaW1nRmlsZTEgPSAoX2EgPSBpbWdFbGVtLmZpbGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF07XG4gICAgdHJ5IHtcbiAgICAgICAgYmFzZTY0U3RyaW5nMSA9IHlpZWxkIEFwcFN1cHBvcnRGdW4ucmVhZEZpbGVBc0Jhc2U2NChpbWdGaWxlMSk7XG4gICAgICAgIHB1dGRhdGEuaW1nID0gYmFzZTY0U3RyaW5nMTtcbiAgICAgICAgZm9ybUltZy5zcmMgPSBiYXNlNjRTdHJpbmcxO1xuICAgIH1cbiAgICBjYXRjaCAoX2IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBmZXRjaGluZyBiYXNlNjRTdHJpbmdcIik7XG4gICAgICAgIGZvcm1JbWcuc3JjID0gYXBwU3RyaW5ncy5kZWZhdWx0UGljO1xuICAgICAgICBwdXRkYXRhLmltZyA9IGFwcFN0cmluZ3MuZGVmYXVsdFBpYztcbiAgICB9XG4gICAgaWYgKGltZ0ZpbGUxID09IHVuZGVmaW5lZCkge1xuICAgICAgICBiYXNlNjRTdHJpbmcxID0gYXBwU3RyaW5ncy5kZWZhdWx0UGljO1xuICAgICAgICBwdXRkYXRhLmltZyA9IGFwcFN0cmluZ3MuZGVmYXVsdFBpYztcbiAgICB9XG59KTtcbmltZ0VsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGFkZEltZ1RvRm9ybSk7XG4vL2hhbmRsaW5nIHRoZSBzdWJtaXQgYnV0dG9uIGNsaWNrXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNvbnN0IGhhbmRsZVN1Ym1pdENsaWNrID0gKGUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwdXRkYXRhLm5hbWUgPSBuYW1lLnZhbHVlO1xuICAgIHB1dGRhdGEuZW1haWwgPSBlbWFpbC52YWx1ZTtcbiAgICBwdXRkYXRhLmRvaiA9IGRhdGVPZkpvaW4udmFsdWU7XG4gICAgcHV0ZGF0YS5kb2IgPSBkYXRhT2ZCaXJ0aC52YWx1ZTtcbiAgICBwdXRkYXRhLmRlcCA9IEFwcFN1cHBvcnRGdW4ucmV0dXJuRGVwSUQoZGVwSW5wdXQudmFsdWUsIGFjdHVhbERhdGEpO1xuICAgIHB1dGRhdGEucm9sZSA9IHJvbGVJbnB1dC52YWx1ZTtcbiAgICBwdXRkYXRhLmxvYyA9IGxvY0lucHV0LnZhbHVlO1xuICAgIHB1dGRhdGEuc2tpbGwgPSBBcHBTdXBwb3J0RnVuLnJldHVyblNraWxsQXJyKHNraWxsTmFtZUFyciwgYWN0dWFsRGF0YSk7XG4gICAgbGV0IGlzRXJyID0gZmFsc2U7XG4gICAgaWYgKHB1dGRhdGEubmFtZS5sZW5ndGggPCAyKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5TmFtZUFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5TmFtZUFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIXB1dGRhdGEuZG9qKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RG9qQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEb2pBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFwdXRkYXRhLmRvYikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURvYkFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RG9iQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChwdXRkYXRhLnJvbGUgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5Um9sZUFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5Um9sZUFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIXB1dGRhdGEuZGVwKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RGVwQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEZXBBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKHB1dGRhdGEubG9jID09PSBcIm5vbmVcIikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeUxvY0FsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5TG9jQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghcHV0ZGF0YS5za2lsbC5sZW5ndGgpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlTa2lsbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5U2tpbGxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFlbWFpbC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgZGF0YUVudHJ5RW1haWxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeUVtYWlsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChkYXRhRW50cnlTdWJtaXQudmFsdWUgPT0gXCJBZGRcIikge1xuICAgICAgICBpZiAoIWlzRXJyKSB7XG4gICAgICAgICAgICBsZXQgZW50cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxEYXRhLmVtcGxveWVlKSB7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2VEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGVudHJ5SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IGVudHJ5SW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGVtcGxveWVlSUQgPSAxMDAxO1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsRGF0YS5lbXBsb3llZSkge1xuICAgICAgICAgICAgICAgIGVtcGxveWVlSUQgPVxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIob3JpZ2luYWxEYXRhLmVtcGxveWVlW29yaWdpbmFsRGF0YS5lbXBsb3llZS5sZW5ndGggLSAxXS5pZCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlbXBsb3llZUlEID0gMTAwMTtcbiAgICAgICAgICAgIHB1dGRhdGEuaWQgPSBlbXBsb3llZUlEO1xuICAgICAgICAgICAgcHV0ZGF0YS5pbmRleCA9IGVudHJ5SW5kZXg7XG4gICAgICAgICAgICBwdXRkYXRhLmVyck1zZyA9IGFwcFN0cmluZ3MuYWRkRXJyTXNnO1xuICAgICAgICAgICAgcHV0ZGF0YS5zdWNjTXNnID0gYXBwU3RyaW5ncy5hZGRTdWNjZXNzTXNnO1xuICAgICAgICAgICAgLy9wYXNzaW5nIGRhdGEgdG8gZW50ZXIgbmV3IGVtcGxveWVlIGRldGFpbHNcbiAgICAgICAgICAgIGhybUFwcC5wdXREYXRhKHB1dGRhdGEsIGZpbGxlbnRyeSwgdG9hc3QpO1xuICAgICAgICAgICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIGxldCBudWxsQXJyID0gW107XG4gICAgICAgICAgICBjaGFuZ2VTa2lsbE5hbWVBcnIobnVsbEFycik7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvYXN0KHRydWUsIGFwcFN0cmluZ3MuYWRkRXJyTXNnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhRW50cnlTdWJtaXQudmFsdWUgPT0gXCJVcGRhdGVcIikge1xuICAgICAgICBpZiAoIWlzRXJyKSB7XG4gICAgICAgICAgICBsZXQgZW1wbG95ZWVJRCA9IGlkT2ZFbXA7XG4gICAgICAgICAgICBwdXRkYXRhLmlkID0gZW1wbG95ZWVJRDtcbiAgICAgICAgICAgIGlmIChiYXNlNjRTdHJpbmcxKVxuICAgICAgICAgICAgICAgIHB1dGRhdGEuaW1nID0gYmFzZTY0U3RyaW5nMTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBwdXRkYXRhLmltZyA9IGFwcFN0cmluZ3MuZGVmYXVsdFBpYztcbiAgICAgICAgICAgIHB1dGRhdGEuZXJyTXNnID0gYXBwU3RyaW5ncy51cGRhdGVFcnJNc2c7XG4gICAgICAgICAgICBwdXRkYXRhLnN1Y2NNc2cgPSBhcHBTdHJpbmdzLnVwZGF0ZVN1Y2Nlc3NNc2c7XG4gICAgICAgICAgICBwdXRkYXRhLmluZGV4ID0gdXBkYXRlSW5kZXg7XG4gICAgICAgICAgICAvL3Bhc3NpbmcgZGF0YSB0byB1cGRhdGUgZW1wbG95ZWVcbiAgICAgICAgICAgIGhybUFwcC5wdXREYXRhKHB1dGRhdGEsIGZpbGxlbnRyeSwgdG9hc3QpO1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmRhdGFFbnRyeUZvcm0ub25zdWJtaXQgPSBoYW5kbGVTdWJtaXRDbGljaztcbi8vZGF0YS1lbnRyeS1mb3JtIHNraWxsIHNlY3Rpb24gZnVuY3Rpb25hbGl0aWVzXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuRnVsbHRhYmxlLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIGNoYW5nZVNraWxsTmFtZUFycihza2lsbE5hbWUpO1xuICAgIH1cbn07XG5mb3JtU2tpbGwub25jbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5pZCA9PSBcInNraWxsXCIgJiYgIXNraWxsTmFtZUFyci5pbmNsdWRlcyhza2lsbElucHV0LnZhbHVlKSkge1xuICAgICAgICBpZiAoc2tpbGxJbnB1dC52YWx1ZSAhPSBcIm5vbmVcIikge1xuICAgICAgICAgICAgc2tpbGxOYW1lQXJyLnB1c2goc2tpbGxJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgKz0gYFxuICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke3NraWxsSW5wdXQudmFsdWV9XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgJHtza2lsbElucHV0LnZhbHVlfVxuPC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtb3B0aW9uc1wiKSAmJlxuICAgICAgICAhc2tpbGxOYW1lQXJyLmluY2x1ZGVzKHRhcmdldC5pZCkpIHtcbiAgICAgICAgc2tpbGxOYW1lQXJyLnB1c2godGFyZ2V0LmlkKTtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9XCIke3RhcmdldC5pZH1cIiBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAgICAgICAgICR7dGFyZ2V0LmlkfVxuICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgIH1cbn07XG5hZGRlZFNraWxscy5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmRhdGFzZXQucmVtSWQpIHtcbiAgICAgICAgbGV0IHNraWxsTmFtZUFyckNvcHkgPSBza2lsbE5hbWVBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtICE9IHRhcmdldC5kYXRhc2V0LnJlbUlkKTtcbiAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKHNraWxsTmFtZUFyckNvcHkpO1xuICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBza2lsbE5hbWVBcnIuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHtlbGVtfVwiIGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICR7ZWxlbX1cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBza2lsbElucHV0LnZhbHVlID0gXCJub25lXCI7XG59O1xuIiwiLy8gQXBwQ29uc3RhbnRzXG5leHBvcnQgY29uc3QgYXBwQ29uc3RhbnRzID0ge1xuICAgIGRhdGFiYXNlVXJsOiBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCIsXG59O1xuLy8gQXBwU3RyaW5nc1xuZXhwb3J0IGNvbnN0IGFwcFN0cmluZ3MgPSB7XG4gICAgYWRkU3VjY2Vzc01zZzogXCJTdWNjZXNmdWxseSBhZGRlZCBlbXBsb3llZVwiLFxuICAgIGFkZEVyck1zZzogXCJFcnJvciB3aGlsZSBhZGRpbmcgZW1wbG95ZWVcIixcbiAgICB1cGRhdGVTdWNjZXNzTXNnOiBcIlN1Y2Nlc2Z1bGx5IHVwZGF0ZWQgZW1wbG95ZWVcIixcbiAgICB1cGRhdGVFcnJNc2c6IFwiRXJyb3Igd2hpbGUgdXBkYXRpbmcgZW1wbG95ZWVcIixcbiAgICBkZWxTdWNjZXNzTXNnOiBcIlN1Y2Nlc2Z1bGx5IGRlbGV0ZWQgdGhlIGVtcGxveWVlXCIsXG4gICAgZGVsRXJyTXNnOiBcIkVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIsXG4gICAgZmV0Y2hFcnJNc2c6IFwiRXJyb3Igd2hpbGUgZmV0Y2hpbmcgdGhlIGRhdGFcIixcbiAgICBkZWZhdWx0UGljOiBcIi4vYXNzZXRzL2ltYWdlcy9wcm9maWxlLnBuZ1wiLFxufTtcbiIsImltcG9ydCB7IGZpbGxlbnRyeSwgdG9hc3QgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGhybUFwcCwgZmlyZWJhc2VEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5jb25zdCBkYXRhRGVsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZGVsLW1vZGFsXCIpO1xuY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS1idXR0b25cIik7XG5leHBvcnQgY29uc3QgZGVsRW1wID0gKGlkKSA9PiB7XG4gICAgbGV0IGRlbEluZGV4O1xuICAgIGZpcmViYXNlRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoZWxlbSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlbHNlIGlmIChlbGVtLmlkID09IGlkKVxuICAgICAgICAgICAgZGVsSW5kZXggPSBpbmRleDtcbiAgICB9KTtcbiAgICBjb25maXJtQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGhybUFwcC5kZWxldGVEYXRhKGRlbEluZGV4LCBmaWxsZW50cnksIHRvYXN0KTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfTtcbn07XG4iLCIvLyBmZXRjaCBza2lsbCBmb3JtIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IG9uIHRoZSBmaWx0ZXIgc2tpbGwgc2VjdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaW1wb3J0IHsgZmlsdGVyVGFibGUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGFjdHVhbERhdGEgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuY29uc3QgZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbmNvbnN0IGNsZWFyRmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGVhci1maWx0ZXItYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IFJlbmRlckZpbHRlckJveCA9ICgpID0+IHtcbiAgICBsZXQgdmFsdWUgPSBmaWx0ZXJTZWFyY2hCb3gudmFsdWU7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFjdHVhbERhdGEuc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbElkID0gb2JqZWxlbS5za2lsbC5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgaWYgKHNraWxsSWQuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICAgICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGNsZWFyRmlsdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50IGlucHV0XCIpO1xuICAgIHNraWxsLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbUNoZWNrZWQgPSBlbGVtO1xuICAgICAgICBpZiAoZWxlbUNoZWNrZWQuY2hlY2tlZCkge1xuICAgICAgICAgICAgZWxlbUNoZWNrZWQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZmlsdGVyVGFibGUoKTtcbn07XG5maWx0ZXJTZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIFJlbmRlckZpbHRlckJveCk7XG5jbGVhckZpbHRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xlYXJGaWx0ZXIpO1xuIiwiaW1wb3J0IHsgaGFuZGxlVGFibGVDbGljayB9IGZyb20gXCIuL3RhYmxlQWN0aW9uQnV0dG9uXCI7XG5pbXBvcnQgeyBocm1BcHAgfSBmcm9tIFwiLi9EYXRhU2VydmljZVwiO1xuaW1wb3J0IHsgYXBwU3RyaW5ncyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY29uc3QgZGF0YUVudHJ5U3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRhLWVudHJ5LXN1Ym1pdFwiKTtcbmNvbnN0IGRhdGFFbnRyeUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZm9ybVwiKTtcbmNvbnN0IG1hdGVyaWFsU3ltYm9sc091dGxpbmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIFwiKTtcbmNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuY29uc3QgZGVwYXJ0bWVudEVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBza2lsbFNlbGVjRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuY29uc3QgZGF0YVZpZXdDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LWNsb3NlXCIpO1xuY29uc3QgY2FuY2VsRGVsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtZGVsLWJ1dHRvblwiKTtcbmNvbnN0IGFkZEVtcGxveWVlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtZW1wbG95ZWUtYnV0dG9uXCIpO1xuY29uc3QgZGF0YUVudHJ5Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktY2xvc2VcIik7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IGZvcm1JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWwtaW1nXCIpO1xuY29uc3QgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlXCIpO1xuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IGRhdGFWaWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1tb2RhbFwiKTtcbmNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5jb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG5jb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG5pbXBvcnQgeyBzb3J0RnVuIH0gZnJvbSBcIi4vU29ydEZ1blwiO1xuaW1wb3J0IHsgb3JpZ2luYWxEYXRhLCBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmV4cG9ydCBsZXQgc2tpbGxOYW1lQXJyID0gW107IC8vc3RyaW5nIGFycmF5XG5leHBvcnQgbGV0IHNraWxsTmFtZTtcbmV4cG9ydCBjb25zdCBjaGFuZ2VTa2lsbE5hbWVBcnIgPSAoZWxlbSkgPT4ge1xuICAgIHNraWxsTmFtZUFyciA9IGVsZW07XG59O1xuZXhwb3J0IGNvbnN0IGNoYW5nZVNraWxsTmFtZSA9IChlbGVtKSA9PiB7XG4gICAgc2tpbGxOYW1lID0gZWxlbTtcbn07XG5jb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBmb3JtU2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2tpbGxcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuY29uc3QgdG9hc3RNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0LW1zZ1wiKTtcbmNvbnN0IHRvYXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdFwiKTtcbi8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3QgdG9hc3QgPSAodHlwZSwgbXNnKSA9PiB7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdG9hc3RNc2cuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZC5pbm5lckhUTUwgPSBcImVycm9yXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLmJhY2tncm91bmQgPVxuICAgICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoMTExLjRkZWcsIHJnYigyNDYsIDQsIDI2KSAwLjQlLCByZ2IoMjUxLCAxMzksIDM0KSAxMDAuMiUpXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgxNzAlKVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdG9hc3RNc2cuaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICB0b2FzdERpdi5zdHlsZS5iYWNrZ3JvdW5kID1cbiAgICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDE3OS4xZGVnLCByZ2IoNDMsIDE3MCwgOTYpIDIuMyUsIHJnYigxMjksIDIwNCwgMTA0KSA5OC4zJSlcIjtcbiAgICAgICAgbWF0ZXJpYWxTeW1ib2xzT3V0bGluZWQuaW5uZXJIVE1MID0gXCJkb25lXCI7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgxNzAlKVwiO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDApXCI7XG4gICAgfSwgMzAwMCk7XG59O1xuZXhwb3J0IGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGxldCBkZXAgPSBvcmlnaW5hbERhdGEuZGVwYXJ0bWVudFtvYmplbGVtLmRlcGFydG1lbnQgLSAxXS5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCArPSBgXG4gICAgPHRyIGNsYXNzPVwiZGF0YS1yb3dcIj5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5pZH08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmZ1bGxOYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZW1haWx9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGVwfTwvdGQ+XG4gICAgICAgIDx0ZCBpZD1cImFjdGlvbi1idXR0b24tY2VsbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0+PGltZyBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfSBjbGFzcz1cInZpZXctaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvdmlldy1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwidmlldyBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2VkaXQtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkVkaXQgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZGVsLWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICBgO1xuICAgIH0pO1xufTtcbi8vIGZldGNoaW5nIGRhdGEgZnJvbSBmaXJlYmFzZSBhbmQgZGlzcGxheSBpdCBpbnRvIHRoZSB0YWJsZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IGZpbGxlbnRyeSA9IChvYmopID0+IHtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShvYmouZW1wbG95ZWUpO1xuICAgIC8vIGZpbHRlciBza2lsbCBidXR0b24gc2NyaXB0XG4gICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIik7XG4gICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgIH0pO1xuICAgIC8vZmlsbCBkZXBhcnRtZW50IGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBkZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgIG9iai5kZXBhcnRtZW50LmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9XCI+JHtvYmplbGVtLmRlcGFydG1lbnROYW1lfTwvb3B0aW9uPmA7XG4gICAgfSk7XG4gICAgLy8gZmlsbCByb2xlIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICByb2xlRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgcm9sZUVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0ucm9sZX1cIj4ke29iamVsZW0ucm9sZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPmNob29zZSBza2lsbDwvb3B0aW9uPmA7XG4gICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gY2xhc3M9XCJza2lsbC1vcHRpb25zXCIgaWQ9XCIke29iamVsZW0uc2tpbGx9XCIgdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgfSk7XG59O1xuLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5ocm1BcHAuZmV0Y2hEYXRhKGZpbGxlbnRyeSkudGhlbigoZGF0YSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHNvcnRGdW4oKTtcbn0pO1xudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRhYmxlQ2xpY2spO1xuLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbmRhdGFWaWV3Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9jbG9zZSBkYXRhLWRlbC1tb2RhbFxuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9BZGQgZW1wbG95ZWUgZnVuY3Rpb25cbmFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgIGNoYW5nZVNraWxsTmFtZUFycihbXSk7XG4gICAgZm9ybUltZy5zcmMgPSBhcHBTdHJpbmdzLmRlZmF1bHRQaWM7XG4gICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBkYXRhRW50cnlTdWJtaXQudmFsdWUgPSBcIkFkZFwiO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufSk7XG5kYXRhRW50cnlDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vZmlsdGVyQW5kU2VhcmNoIGZ1bmN0aW9uYWxpdHlcbmV4cG9ydCBsZXQgRmlsdGVyQXJyID0gW107XG5leHBvcnQgY29uc3QgZmlsdGVyVGFibGUgPSAoKSA9PiB7XG4gICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudFwiKTtcbiAgICBsZXQgY2hlY2tlZEZpbHRlckFyciA9IFtdO1xuICAgIGlucHV0cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtO1xuICAgICAgICBjb25zdCB0cmlhbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZWxlbWVudC5kYXRhc2V0LnNraWxsSWR9YCk7XG4gICAgICAgIGlmICh0cmlhbC5jaGVja2VkKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZWxlbWVudC5kYXRhc2V0LnNraWxsTnVtO1xuICAgICAgICAgICAgY2hlY2tlZEZpbHRlckFyci5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qgc2VhcmNodmFsdWUgPSBzZWFyY2hCYXIudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICBGaWx0ZXJBcnIgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgIGlmIChzZWFyY2hCYXIudmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgRmlsdGVyQXJyID0gRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5mdWxsTmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2h2YWx1ZSkpO1xuICAgIH1cbiAgICBpZiAoY2hlY2tlZEZpbHRlckFyci5sZW5ndGggIT09IDApIHtcbiAgICAgICAgRmlsdGVyQXJyID0gRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gY2hlY2tlZEZpbHRlckFyci5ldmVyeSgoY2hlY2tFbGVtKSA9PiBlbGVtLnNraWxscy5pbmNsdWRlcyhOdW1iZXIoY2hlY2tFbGVtKSkpKTtcbiAgICB9XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUoRmlsdGVyQXJyKTtcbn07XG5jb25zdCBjaGFuZ2VTa2lsbFN0YXRlID0gKHNraWxsSWQpID0+IHtcbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2tpbGxJZH1gKTtcbiAgICB0ZW1wLmNsaWNrKCk7XG4gICAgZmlsdGVyVGFibGUoKTtcbn07XG5za2lsbExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbC1lbGVtZW50XCIpICYmXG4gICAgICAgIHRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCIpIHtcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgIGNoYW5nZVNraWxsU3RhdGUoZGF0YXNldCk7XG4gICAgfVxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gXCJJTlBVVFwiIHx8IHRhcmdldC50YWdOYW1lID09PSBcIkxBQkVMXCIpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xvc2VzdCA9IHRhcmdldC5jbG9zZXN0KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0Q2xvc2VzdC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgIGZpbHRlclRhYmxlKCk7XG4gICAgfVxufSk7XG5zb3J0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzb3J0RnVuKTtcbnNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZmlsdGVyVGFibGUpO1xuLy9zZXR0aW5nIGxpbWl0IHRvIGRhdGUgb2YgYmlydGhcbmxldCB0b2RheSA9IG5ldyBEYXRlKCkudG9KU09OKCkuc2xpY2UoMCwgMTApO1xuY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JcIik7XG5kYXRlSW5wdXQuc2V0QXR0cmlidXRlKFwibWF4XCIsIHRvZGF5KTtcbiIsImNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5jb25zdCBkYXRhVmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctbW9kYWxcIik7XG5jb25zdCBkYXRhRGVsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZGVsLW1vZGFsXCIpO1xuY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG5jb25zdCBkYXRhRW50cnlTdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGEtZW50cnktc3VibWl0XCIpO1xuY29uc3QgZm9ybUltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbC1pbWdcIik7XG5pbXBvcnQgeyB1cGRhdGVFbXAgfSBmcm9tIFwiLi91cGRhdGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgdmlld01vZGFsIH0gZnJvbSBcIi4vdmlld0VtcGxveWVlXCI7XG5pbXBvcnQgeyBkZWxFbXAgfSBmcm9tIFwiLi9kZWxldGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgb3JpZ2luYWxEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbmltcG9ydCB7IGFwcFN0cmluZ3MgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmV4cG9ydCBjb25zdCBoYW5kbGVUYWJsZUNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInZpZXctaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdmlld01vZGFsKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRlbEVtcChOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICB9XG4gICAgLy8vIHVwZGF0ZSB1c2VyIGRldGFpbHMgZnVuY3Rpb25hbGl0eVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YUVudHJ5U3VibWl0LnZhbHVlID0gXCJVcGRhdGVcIjtcbiAgICAgICAgbGV0IHRyeU9iaiA9IG9yaWdpbmFsRGF0YS5lbXBsb3llZS5maWx0ZXIoKGVsZW0pID0+IGVsZW0uaWQgPT0gTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRyeU9iaik7XG4gICAgICAgIGlmICh0cnlPYmpbMF0uaW1hZ2VTcmMpIHtcbiAgICAgICAgICAgIGZvcm1JbWcuc3JjID0gdHJ5T2JqWzBdLmltYWdlU3JjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9ybUltZy5zcmMgPSBhcHBTdHJpbmdzLmRlZmF1bHRQaWM7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlRW1wKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbn07XG4iLCJleHBvcnQge307XG4iLCJpbXBvcnQgeyBjaGFuZ2VTa2lsbE5hbWUsIHNraWxsTmFtZSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgYWN0dWFsRGF0YSwgZmlyZWJhc2VEYXRhIH0gZnJvbSBcIi4vRGF0YVNlcnZpY2VcIjtcbi8vIGV4cG9ydCBsZXQgc2tpbGxOYW1lOiBzdHJpbmdbXTtcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIik7XG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIik7XG5jb25zdCBkYXRlT2ZKb2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pcIik7XG5jb25zdCBkYXRhT2ZCaXJ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iXCIpO1xuY29uc3QgZGVwSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmNvbnN0IHJvbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbmNvbnN0IGxvY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xubGV0IHVwZGF0ZUluZGV4ID0gMDtcbmxldCBpZE9mRW1wID0gMTAwMTtcbmV4cG9ydCBjb25zdCB1cGRhdGVFbXAgPSAoaWQpID0+IHtcbiAgICBpZE9mRW1wID0gaWQ7XG4gICAgbGV0IGN1cnJPYmo7XG4gICAgbGV0IGRlcGFydG1lbnQ7XG4gICAgZmlyZWJhc2VEYXRhLmVtcGxveWVlLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBpZiAob2JqID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGVsc2UgaWYgKG9iai5pZCA9PSBpZCkge1xuICAgICAgICAgICAgY3Vyck9iaiA9IG9iajtcbiAgICAgICAgICAgIGZpcmViYXNlRGF0YS5kZXBhcnRtZW50LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYmogPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3Vyck9iai5kZXBhcnRtZW50ID09IG9iai5kZXBhcnRtZW50SUQpXG4gICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnQgPSBvYmouZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAobGV0IHN0ZXAgPSAwOyBzdGVwIDwgZmlyZWJhc2VEYXRhLmVtcGxveWVlLmxlbmd0aDsgc3RlcCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcmViYXNlRGF0YS5lbXBsb3llZVtzdGVwXSA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmaXJlYmFzZURhdGEuZW1wbG95ZWVbc3RlcF0uaWQgPT0gY3Vyck9iai5pZClcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlSW5kZXggPSBzdGVwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmFtZS52YWx1ZSA9IGAke2N1cnJPYmouZnVsbE5hbWV9YDtcbiAgICAgICAgICAgIGVtYWlsLnZhbHVlID0gYCR7Y3Vyck9iai5lbWFpbH1gO1xuICAgICAgICAgICAgZGF0ZU9mSm9pbi52YWx1ZSA9IGAke2N1cnJPYmouZGF0ZU9mQmlydGh9YDtcbiAgICAgICAgICAgIGRhdGFPZkJpcnRoLnZhbHVlID0gYCR7Y3Vyck9iai5kYXRlT2ZKb2lufWA7XG4gICAgICAgICAgICBsb2NJbnB1dC52YWx1ZSA9IGAke2N1cnJPYmoud29ya0xvY2F0aW9ufWA7XG4gICAgICAgICAgICByb2xlSW5wdXQudmFsdWUgPSBgJHtjdXJyT2JqLnJvbGV9YDtcbiAgICAgICAgICAgIGRlcElucHV0LnZhbHVlID0gYCR7ZGVwYXJ0bWVudH1gO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGV0IHNraWxsTmFtZUNvcHkgPSBhY3R1YWxEYXRhLnNraWxsLnJlZHVjZSgoYWNjLCBlbGVtKSA9PiB7XG4gICAgICAgIGlmIChjdXJyT2JqLnNraWxscy5pbmNsdWRlcyhlbGVtLnNraWxsSUQpKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2NdO1xuICAgIH0sIFtdKTtcbiAgICBjaGFuZ2VTa2lsbE5hbWUoc2tpbGxOYW1lQ29weSk7XG4gICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBza2lsbE5hbWUuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPSR7ZWxlbX0gY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7ZWxlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbn07XG5leHBvcnQgeyB1cGRhdGVJbmRleCwgaWRPZkVtcCB9O1xuIiwiaW1wb3J0IHsgYWN0dWFsRGF0YSB9IGZyb20gXCIuL0RhdGFTZXJ2aWNlXCI7XG5jb25zdCBuYW1lVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVZpZXdcIik7XG5jb25zdCBlbWFpbFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsVmlld1wiKTtcbmNvbnN0IGVtcElkVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1wSWRWaWV3XCIpO1xuY29uc3QgZG9qVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qVmlld1wiKTtcbmNvbnN0IGRvYlZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlZpZXdcIik7XG5jb25zdCBkZXBWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBWaWV3XCIpO1xuY29uc3Qgcm9sZVZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVWaWV3XCIpO1xuY29uc3QgbG9jVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jVmlld1wiKTtcbmNvbnN0IGltZ1ZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltZ1wiKTtcbmNvbnN0IHZpZXdTa2lsbEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmlldy1za2lsbC1ib3hcIik7XG5leHBvcnQgY29uc3Qgdmlld01vZGFsID0gKGlkKSA9PiB7XG4gICAgbGV0IHZpZXdPYmo7XG4gICAgbGV0IGRlcGFydG1lbnQ7XG4gICAgYWN0dWFsRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGlmIChlbGVtLmlkID09IGlkKSB7XG4gICAgICAgICAgICB2aWV3T2JqID0gZWxlbTtcbiAgICAgICAgICAgIGFjdHVhbERhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmlld09iai5kZXBhcnRtZW50ID09IG9iai5kZXBhcnRtZW50SUQpXG4gICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnQgPSBvYmouZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGltZ1ZpZXcuc3JjID0gYCR7dmlld09iai5pbWFnZVNyY31gO1xuICAgICAgICAgICAgbmFtZVZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5mdWxsTmFtZX1gO1xuICAgICAgICAgICAgZW1haWxWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZW1haWx9YDtcbiAgICAgICAgICAgIGVtcElkVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmlkfWA7XG4gICAgICAgICAgICBkb2pWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZGF0ZU9mSm9pbn1gO1xuICAgICAgICAgICAgZG9iVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmRhdGVPZkJpcnRofWA7XG4gICAgICAgICAgICBkZXBWaWV3LmlubmVySFRNTCA9IGAke2RlcGFydG1lbnR9YDtcbiAgICAgICAgICAgIHJvbGVWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmoucm9sZX1gO1xuICAgICAgICAgICAgbG9jVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLndvcmtMb2NhdGlvbn1gO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGV0IGVhY2hTa2lsbCA9IGFjdHVhbERhdGEuc2tpbGwucmVkdWNlKChhY2MsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKHZpZXdPYmouc2tpbGxzLmluY2x1ZGVzKGVsZW0uc2tpbGxJRCkpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgfSwgW10pO1xuICAgIHZpZXdTa2lsbEJveC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGVhY2hTa2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIHZpZXdTa2lsbEJveC5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFjaC1za2lsbC12aWV3XCI+JHtlbGVtfTwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZmlsdGVyQW5kU2VhcmNoRnVuLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHQudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvU29ydEZ1bi50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90YWJsZUFjdGlvbkJ1dHRvbi50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb25zdGFudHMudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdHlwZS50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hZGRVcGRhdGVFbXBsb3llZS50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9kZWxldGVFbXBsb3llZS50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy91cGRhdGVFbXBsb3llZS50c1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3ZpZXdFbXBsb3llZS50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==