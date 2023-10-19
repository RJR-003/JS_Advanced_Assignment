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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _updateEmployee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateEmployee */ "./src/updateEmployee.ts");
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
//function to put data to firebase
const putData = (index, id, name, email, doj, dob, dep, role, loc, skill, img, errMsg, succMsg) => {
    fetch(_constants__WEBPACK_IMPORTED_MODULE_1__.constObj.api + "/employee/" + index + ".json", {
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
    const nameVal = name.value;
    const emailVal = email.value;
    const dateOfJoinVal = dateOfJoin.value;
    const dateOfBirthVal = dataOfBirth.value;
    const depInputVal = returnDepID(depInput.value);
    const roleInputVal = roleInput.value;
    const locInputVal = locInput.value;
    const skillInputVal = returnSkillArr(_script__WEBPACK_IMPORTED_MODULE_0__.skillNameArr);
    let isErr = false;
    if (nameVal.length < 2) {
        isErr = true;
        dataEntryNameAlert.style.display = "block";
    }
    else
        dataEntryNameAlert.style.display = "none";
    if (!dateOfJoinVal) {
        isErr = true;
        dataEntryDojAlert.style.display = "block";
    }
    else
        dataEntryDojAlert.style.display = "none";
    if (!dateOfBirthVal) {
        isErr = true;
        dataEntryDobAlert.style.display = "block";
    }
    else
        dataEntryDobAlert.style.display = "none";
    if (roleInputVal === "none") {
        isErr = true;
        dataEntryRoleAlert.style.display = "block";
    }
    else
        dataEntryRoleAlert.style.display = "none";
    if (!depInputVal) {
        isErr = true;
        dataEntryDepAlert.style.display = "block";
    }
    else
        dataEntryDepAlert.style.display = "none";
    if (locInputVal === "none") {
        isErr = true;
        dataEntryLocAlert.style.display = "block";
    }
    else
        dataEntryLocAlert.style.display = "none";
    if (!skillInputVal.length) {
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
            let errMsg = "Error while adding employee";
            let succMsg = "Succesfully added employee";
            putData(entryIndex, employeeID, nameVal, emailVal, dateOfJoinVal, dateOfBirthVal, depInputVal, roleInputVal, locInputVal, skillInputVal, base64String, errMsg, succMsg);
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
            let employeeID = _updateEmployee__WEBPACK_IMPORTED_MODULE_2__.idOfEmp;
            base64String = _script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee[_updateEmployee__WEBPACK_IMPORTED_MODULE_2__.updateIndex].imageSrc;
            let errMsg = "Error while updating employee";
            let succMsg = "Succesfully updated employee";
            putData(_updateEmployee__WEBPACK_IMPORTED_MODULE_2__.updateIndex, employeeID, nameVal, emailVal, dateOfJoinVal, dateOfBirthVal, depInputVal, roleInputVal, locInputVal, skillInputVal, base64String, errMsg, succMsg);
            console.log(employeeID, "id that is going to be updated");
            console.log(_updateEmployee__WEBPACK_IMPORTED_MODULE_2__.updateIndex, "index that is going to be updated");
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
/* harmony export */   constObj: () => (/* binding */ constObj)
/* harmony export */ });
const constObj = {
    api: "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app",
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");


const skillList = document.querySelector(".skill-list");
const overlay = document.querySelector(".overlay");
const dataDelModal = document.querySelector(".data-del-modal");
const confirmButton = document.querySelector(".confirm-button");
const delData = (index) => {
    fetch(_constants__WEBPACK_IMPORTED_MODULE_1__.constObj.api + "/employee/" + index + ".json", {
        method: "DELETE",
    })
        .then((res) => {
        console.log(res, "successfully deleted!!!");
        (0,_script__WEBPACK_IMPORTED_MODULE_0__.toast)(false, "Succesfully deleted the employee");
        return res.json();
    })
        .then((data) => {
        // tableCreate(data);
        skillList.innerHTML = "";
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
        delData(delIndex);
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
    fetch(_constants__WEBPACK_IMPORTED_MODULE_1__.constObj.api + "/.json")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxZQUFZLCtDQUFVO0FBQ3RCO0FBQ0E7QUFDQSxhQUFhO0FBQ2Isb0NBQW9DLGlCQUFpQjtBQUNyRCxxQ0FBcUMsY0FBYztBQUNuRCxxQ0FBcUMsV0FBVztBQUNoRCxtQ0FBbUMsbUJBQW1CO0FBQ3RELG1DQUFtQyxvQkFBb0I7QUFDdkQsbUNBQW1DLFdBQVc7QUFDOUMsb0NBQW9DLGFBQWE7QUFDakQsbUNBQW1DLHFCQUFxQjtBQUN4RDtBQUNBLGdEQUFnRCxpQkFBaUI7QUFDakUsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxnQ0FBZ0MsaUJBQWlCO0FBQ2pEO0FBQ0EsS0FBSztBQUNMLG9CQUFvQiwrQ0FBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDbERBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL1NvcnRGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2FkZFVwZGF0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2RlbGV0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9maWx0ZXJBbmRTZWFyY2hGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3NjcmlwdC50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3R5cGUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3VwZGF0ZUVtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy92aWV3RW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFjdHVhbERhdGEsIHRhYmxlQ3JlYXRlIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyBGaWx0ZXJBcnIgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbmNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xubGV0IGRpckZsYWcgPSAxO1xuLy8gc29ydCBmdW5jdGlvbmFsaXR5XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IHNvcnRGdW4gPSAoKSA9PiB7XG4gICAgbGV0IGFycmF5VG9Tb3J0ID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoRmlsdGVyQXJyLmxlbmd0aCAhPT0gMClcbiAgICAgICAgYXJyYXlUb1NvcnQgPSBGaWx0ZXJBcnI7XG4gICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBuYW1lMSA9IGEuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbmFtZTIgPSBiLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgaWYgKG5hbWUxID4gbmFtZTIpIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb24gPSAxICogZGlyRmxhZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lMSA8IG5hbWUyKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uID0gLTEgKiBkaXJGbGFnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wYXJpc29uO1xuICAgIH0pO1xuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKGFyclRvUmVuZGVyKTtcbiAgICBpZiAoZGlyRmxhZyA9PSAxKSB7XG4gICAgICAgIHNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL2Rvd24tYXJyb3cuc3ZnXCI7XG4gICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy91cC1hcnJvdy5zdmdcIjtcbiAgICB9XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBhY3R1YWxEYXRhLCBmZXRjaERhdGEsIGZpbGxlbnRyeSwgb3JpZ2luYWxEYXRhLCBza2lsbE5hbWVBcnIsIGNoYW5nZVNraWxsTmFtZUFyciwgdG9hc3QsIGZpcmViYXNlRGF0YSwgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IGNvbnN0T2JqIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB1cGRhdGVJbmRleCwgaWRPZkVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyBza2lsbE5hbWUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIik7XG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIik7XG5jb25zdCBkYXRlT2ZKb2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pcIik7XG5jb25zdCBkYXRhT2ZCaXJ0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9iXCIpO1xuY29uc3QgZGVwSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmNvbnN0IHJvbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbmNvbnN0IGxvY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NcIik7XG5jb25zdCBza2lsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5jb25zdCBmb3JtU2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tc2tpbGxcIik7XG5jb25zdCBhZGRlZFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkZWQtc2tpbGxzXCIpO1xuY29uc3QgZGF0YUVudHJ5TmFtZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW5hbWUtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlEb2pBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kb2otYWxlcnQgXCIpO1xuY29uc3QgZGF0YUVudHJ5RG9iQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZG9iLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5Um9sZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LXJvbGUtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlEZXBBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kZXAtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlMb2NBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1sb2MtYWxlcnRcIik7XG5jb25zdCBkYXRhRW50cnlTa2lsbEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LXNraWxsLWFsZXJ0XCIpO1xuY29uc3QgZGF0YUVudHJ5U3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRhLWVudHJ5LXN1Ym1pdFwiKTtcbmNvbnN0IGRhdGFFbnRyeUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZm9ybVwiKTtcbmNvbnN0IGRhdGFFbnRyeUVtYWlsQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZW1haWwtYWxlcnRcIik7XG4vL2Z1bmN0aW9uIHRvIHB1dCBkYXRhIHRvIGZpcmViYXNlXG5jb25zdCBwdXREYXRhID0gKGluZGV4LCBpZCwgbmFtZSwgZW1haWwsIGRvaiwgZG9iLCBkZXAsIHJvbGUsIGxvYywgc2tpbGwsIGltZywgZXJyTXNnLCBzdWNjTXNnKSA9PiB7XG4gICAgZmV0Y2goY29uc3RPYmouYXBpICsgXCIvZW1wbG95ZWUvXCIgKyBpbmRleCArIFwiLmpzb25cIiwge1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGRhdGVPZkJpcnRoOiBkb2IsXG4gICAgICAgICAgICBkYXRlT2ZKb2luOiBkb2osXG4gICAgICAgICAgICBkZXBhcnRtZW50OiBkZXAsXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICAgICAgc2tpbGxzOiBza2lsbCxcbiAgICAgICAgICAgIHdvcmtMb2NhdGlvbjogbG9jLFxuICAgICAgICAgICAgZnVsbE5hbWU6IG5hbWUsXG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBpbWFnZVNyYzogaW1nLFxuICAgICAgICB9KSxcbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCJzdWNjZXNzZnVsbHkgYWRkZWQhISFcIik7XG4gICAgICAgIHRvYXN0KGZhbHNlLCBzdWNjTXNnKTtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEsIFwiZGF0YVwiKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3Igd2hpbGUgcGVyZm9ybWluZyB0aGUgYWN0aW9uXCIpO1xuICAgICAgICB0b2FzdCh0cnVlLCBlcnJNc2cpO1xuICAgIH0pO1xufTtcbi8vY29udmVydHMgc2tpbGxuYW1lIHRvIHNraWxsIGlkIGFycmF5XG5jb25zdCByZXR1cm5Ta2lsbEFyciA9IChhcnJPZk5hbWVzKSA9PiB7XG4gICAgYXJyT2ZOYW1lcyA9IGFyck9mTmFtZXMubWFwKChlbGVtKSA9PiBlbGVtLnRvTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IHNraWxsSURBcnIgPSBhY3R1YWxEYXRhLnNraWxsLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBlbGVtKSB7XG4gICAgICAgIGlmIChhcnJPZk5hbWVzLmluY2x1ZGVzKGVsZW0uc2tpbGwudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsSURdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIHNraWxsSURBcnI7XG59O1xuLy8gY29udmVydHMgZGVwYXJ0bWVudCBuYW1lIHRvIGRlcGFydG1lbnQgaWRcbmNvbnN0IHJldHVybkRlcElEID0gKGRlcE5hbWUpID0+IHtcbiAgICBkZXBOYW1lID0gZGVwTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGRlcElEID0gYWN0dWFsRGF0YS5kZXBhcnRtZW50LnJlZHVjZSgodmFsdWUsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGVsZW0uZGVwYXJ0bWVudE5hbWUudG9Mb3dlckNhc2UoKSA9PSBkZXBOYW1lKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGVsZW0uZGVwYXJ0bWVudElEO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm4gZGVwSUQ7XG59O1xuY29uc3QgcmVhZEZpbGVBc0Jhc2U2NCA9IChmaWxlKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBmaWxlIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmVzb2x2ZSgoX2EgPSBlLnRhcmdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0pO1xufTtcbi8vaGFuZGxpbmcgdGhlIHN1Ym1pdCBidXR0b24gY2xpY2tcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3QgaGFuZGxlU3VibWl0Q2xpY2sgPSAoZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBiYXNlNjRTdHJpbmc7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vdGFraW5nIGltYWdlIGZyb20gdXNlclxuICAgIGNvbnN0IGltZ0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtaW5wdXRcIik7XG4gICAgY29uc3QgaW1nRmlsZSA9IChfYSA9IGltZ0VsZW0uZmlsZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcbiAgICB0cnkge1xuICAgICAgICBiYXNlNjRTdHJpbmcgPSB5aWVsZCByZWFkRmlsZUFzQmFzZTY0KGltZ0ZpbGUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgZmV0Y2hpbmcgYmFzZTY0U3RyaW5nXCIpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lVmFsID0gbmFtZS52YWx1ZTtcbiAgICBjb25zdCBlbWFpbFZhbCA9IGVtYWlsLnZhbHVlO1xuICAgIGNvbnN0IGRhdGVPZkpvaW5WYWwgPSBkYXRlT2ZKb2luLnZhbHVlO1xuICAgIGNvbnN0IGRhdGVPZkJpcnRoVmFsID0gZGF0YU9mQmlydGgudmFsdWU7XG4gICAgY29uc3QgZGVwSW5wdXRWYWwgPSByZXR1cm5EZXBJRChkZXBJbnB1dC52YWx1ZSk7XG4gICAgY29uc3Qgcm9sZUlucHV0VmFsID0gcm9sZUlucHV0LnZhbHVlO1xuICAgIGNvbnN0IGxvY0lucHV0VmFsID0gbG9jSW5wdXQudmFsdWU7XG4gICAgY29uc3Qgc2tpbGxJbnB1dFZhbCA9IHJldHVyblNraWxsQXJyKHNraWxsTmFtZUFycik7XG4gICAgbGV0IGlzRXJyID0gZmFsc2U7XG4gICAgaWYgKG5hbWVWYWwubGVuZ3RoIDwgMikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeU5hbWVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeU5hbWVBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFkYXRlT2ZKb2luVmFsKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RG9qQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEb2pBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFkYXRlT2ZCaXJ0aFZhbCkge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeURvYkFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5RG9iQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChyb2xlSW5wdXRWYWwgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5Um9sZUFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5Um9sZUFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpZiAoIWRlcElucHV0VmFsKSB7XG4gICAgICAgIGlzRXJyID0gdHJ1ZTtcbiAgICAgICAgZGF0YUVudHJ5RGVwQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBkYXRhRW50cnlEZXBBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKGxvY0lucHV0VmFsID09PSBcIm5vbmVcIikge1xuICAgICAgICBpc0VyciA9IHRydWU7XG4gICAgICAgIGRhdGFFbnRyeUxvY0FsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5TG9jQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmICghc2tpbGxJbnB1dFZhbC5sZW5ndGgpIHtcbiAgICAgICAgaXNFcnIgPSB0cnVlO1xuICAgICAgICBkYXRhRW50cnlTa2lsbEFsZXJ0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgZGF0YUVudHJ5U2tpbGxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYgKCFlbWFpbC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgZGF0YUVudHJ5RW1haWxBbGVydC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICAgIGRhdGFFbnRyeUVtYWlsQWxlcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGlmIChkYXRhRW50cnlTdWJtaXQudmFsdWUgPT0gXCJBZGRcIikge1xuICAgICAgICBpZiAoIWlzRXJyKSB7XG4gICAgICAgICAgICBsZXQgZW50cnlJbmRleCA9IDA7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxEYXRhLmVtcGxveWVlKSB7XG4gICAgICAgICAgICAgICAgZmlyZWJhc2VEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGVudHJ5SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZW50cnlJbmRleCA9IGVudHJ5SW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVudHJ5SW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGVtcGxveWVlSUQgPSAxMDAxO1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsRGF0YS5lbXBsb3llZSkge1xuICAgICAgICAgICAgICAgIGVtcGxveWVlSUQgPVxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIob3JpZ2luYWxEYXRhLmVtcGxveWVlW29yaWdpbmFsRGF0YS5lbXBsb3llZS5sZW5ndGggLSAxXS5pZCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlbXBsb3llZUlEID0gMTAwMTtcbiAgICAgICAgICAgIGxldCBlcnJNc2cgPSBcIkVycm9yIHdoaWxlIGFkZGluZyBlbXBsb3llZVwiO1xuICAgICAgICAgICAgbGV0IHN1Y2NNc2cgPSBcIlN1Y2Nlc2Z1bGx5IGFkZGVkIGVtcGxveWVlXCI7XG4gICAgICAgICAgICBwdXREYXRhKGVudHJ5SW5kZXgsIGVtcGxveWVlSUQsIG5hbWVWYWwsIGVtYWlsVmFsLCBkYXRlT2ZKb2luVmFsLCBkYXRlT2ZCaXJ0aFZhbCwgZGVwSW5wdXRWYWwsIHJvbGVJbnB1dFZhbCwgbG9jSW5wdXRWYWwsIHNraWxsSW5wdXRWYWwsIGJhc2U2NFN0cmluZywgZXJyTXNnLCBzdWNjTXNnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVtcGxveWVlSUQsIFwiZW1wbG95ZWUgaWQgdGhhdCBpcyBnb2luZyBmb3IgdGhlIG5ldyBkYXRhXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZW50cnlJbmRleCwgXCJpbmRleCB0aGF0IHRoZSBuZXcgZGF0YSBvY2N1cGllc1wiKTtcbiAgICAgICAgICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAvLyAgIHNraWxsTmFtZUFyciA9IFtdO1xuICAgICAgICAgICAgbGV0IG51bGxBcnIgPSBbXTtcbiAgICAgICAgICAgIGNoYW5nZVNraWxsTmFtZUFycihudWxsQXJyKTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpbiBhZGRpbmcgbmV3IGVtcGxveWVlXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9PSBcIlVwZGF0ZVwiKSB7XG4gICAgICAgIGlmICghaXNFcnIpIHtcbiAgICAgICAgICAgIGxldCBlbXBsb3llZUlEID0gaWRPZkVtcDtcbiAgICAgICAgICAgIGJhc2U2NFN0cmluZyA9IG9yaWdpbmFsRGF0YS5lbXBsb3llZVt1cGRhdGVJbmRleF0uaW1hZ2VTcmM7XG4gICAgICAgICAgICBsZXQgZXJyTXNnID0gXCJFcnJvciB3aGlsZSB1cGRhdGluZyBlbXBsb3llZVwiO1xuICAgICAgICAgICAgbGV0IHN1Y2NNc2cgPSBcIlN1Y2Nlc2Z1bGx5IHVwZGF0ZWQgZW1wbG95ZWVcIjtcbiAgICAgICAgICAgIHB1dERhdGEodXBkYXRlSW5kZXgsIGVtcGxveWVlSUQsIG5hbWVWYWwsIGVtYWlsVmFsLCBkYXRlT2ZKb2luVmFsLCBkYXRlT2ZCaXJ0aFZhbCwgZGVwSW5wdXRWYWwsIHJvbGVJbnB1dFZhbCwgbG9jSW5wdXRWYWwsIHNraWxsSW5wdXRWYWwsIGJhc2U2NFN0cmluZywgZXJyTXNnLCBzdWNjTXNnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVtcGxveWVlSUQsIFwiaWQgdGhhdCBpcyBnb2luZyB0byBiZSB1cGRhdGVkXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codXBkYXRlSW5kZXgsIFwiaW5kZXggdGhhdCBpcyBnb2luZyB0byBiZSB1cGRhdGVkXCIpO1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmRhdGFFbnRyeUZvcm0ub25zdWJtaXQgPSBoYW5kbGVTdWJtaXRDbGljaztcbi8vZGF0YS1lbnRyeS1mb3JtIHNraWxsIHNlY3Rpb24gZnVuY3Rpb25hbGl0aWVzXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuRnVsbHRhYmxlLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIC8vIHNraWxsTmFtZUFyciA9IHNraWxsTmFtZTtcbiAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKHNraWxsTmFtZSk7XG4gICAgfVxufTtcbmZvcm1Ta2lsbC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAvLyBmb3IgY2hyb21lXG4gICAgLy8gICBpZiAodGFyZ2V0LmlkID09IFwic2tpbGxcIiAmJiAhc2tpbGxOYW1lQXJyLmluY2x1ZGVzKHNraWxsSW5wdXQudmFsdWUpKSB7XG4gICAgLy8gICAgIGlmIChza2lsbElucHV0LnZhbHVlICE9IFwibm9uZVwiKSB7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coc2tpbGxJbnB1dC52YWx1ZSwgXCJza2lsbElucHV0LnZhbHVlXCIpO1xuICAgIC8vICAgICAgIHNraWxsTmFtZUFyci5wdXNoKHNraWxsSW5wdXQudmFsdWUpO1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiaW5zaWRlIGNocm9tZSBzdHlsZVwiKTtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhza2lsbE5hbWVBcnIpO1xuICAgIC8vICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgLy8gICAgICAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHtza2lsbElucHV0LnZhbHVlfVwiIGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgIC8vICAgICAgICAgICAgICAgJHtza2lsbElucHV0LnZhbHVlfVxuICAgIC8vICAgICAgICAgICA8L2Rpdj5gO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gICBmb3IgbW9yemlsbGFcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLW9wdGlvbnNcIikgJiZcbiAgICAgICAgIXNraWxsTmFtZUFyci5pbmNsdWRlcyh0YXJnZXQuaWQpKSB7XG4gICAgICAgIHNraWxsTmFtZUFyci5wdXNoKHRhcmdldC5pZCk7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHt0YXJnZXQuaWR9XCIgY2xhc3M9XCJlYWNoLXNraWxsLWFkZGVkXCI+XG4gICAgICAgICAgICAgICAgICAke3RhcmdldC5pZH1cbiAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIGVycm9yIHdoaWxlIHVwZGF0aW5nXCIpO1xuICAgIH1cbn07XG5hZGRlZFNraWxscy5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmRhdGFzZXQucmVtSWQpIHtcbiAgICAgICAgbGV0IHNraWxsTmFtZUFyckNvcHkgPSBza2lsbE5hbWVBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtICE9IHRhcmdldC5kYXRhc2V0LnJlbUlkKTtcbiAgICAgICAgY2hhbmdlU2tpbGxOYW1lQXJyKHNraWxsTmFtZUFyckNvcHkpO1xuICAgICAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBza2lsbE5hbWVBcnIuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICA8ZGl2IGRhdGEtcmVtLWlkPVwiJHtlbGVtfVwiIGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICR7ZWxlbX1cbiAgICAgIDwvZGl2PmA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBza2lsbElucHV0LnZhbHVlID0gXCJub25lXCI7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNvbnN0T2JqID0ge1xuICAgIGFwaTogXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiLFxufTtcbiIsImltcG9ydCB7IGZldGNoRGF0YSwgZmlsbGVudHJ5LCBmaXJlYmFzZURhdGEsIHRvYXN0LCB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgY29uc3RPYmogfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5jb25zdCBkYXRhRGVsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZGVsLW1vZGFsXCIpO1xuY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS1idXR0b25cIik7XG5jb25zdCBkZWxEYXRhID0gKGluZGV4KSA9PiB7XG4gICAgZmV0Y2goY29uc3RPYmouYXBpICsgXCIvZW1wbG95ZWUvXCIgKyBpbmRleCArIFwiLmpzb25cIiwge1xuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMsIFwic3VjY2Vzc2Z1bGx5IGRlbGV0ZWQhISFcIik7XG4gICAgICAgIHRvYXN0KGZhbHNlLCBcIlN1Y2Nlc2Z1bGx5IGRlbGV0ZWQgdGhlIGVtcGxveWVlXCIpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvLyB0YWJsZUNyZWF0ZShkYXRhKTtcbiAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGZldGNoRGF0YShmaWxsZW50cnkpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCBcImRhdGFcIik7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCBcImVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIpO1xuICAgICAgICB0b2FzdCh0cnVlLCBcIkVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBkZWxFbXAgPSAoaWQpID0+IHtcbiAgICBsZXQgZGVsSW5kZXg7XG4gICAgZmlyZWJhc2VEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChlbGVtID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGVsc2UgaWYgKGVsZW0uaWQgPT0gaWQpXG4gICAgICAgICAgICBkZWxJbmRleCA9IGluZGV4O1xuICAgIH0pO1xuICAgIC8vIGZvciAobGV0IHN0ZXAgPSAwOyBzdGVwIDwgZmlyZWJhc2VEYXRhLmVtcGxveWVlLmxlbmd0aDsgc3RlcCsrKSB7XG4gICAgLy8gICBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdID09IG51bGwpIGNvbnRpbnVlO1xuICAgIC8vICAgZWxzZSBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdLmlkID09IGlkKSBkZWxJbmRleCA9IHN0ZXA7XG4gICAgLy8gfVxuICAgIGNvbmZpcm1CdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZGVsRGF0YShkZWxJbmRleCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlbEluZGV4LCBcImluZGV4IHRoYXQgaXMgZ29pbmcgdG8gYmUgZGVsZXRlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coaWQsIFwidGhlIGlkIHRoYXQgaXMgZ29pbmcgdG8gYmUgZGVsZXRlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZmlyZWJhc2VEYXRhLCBcImZpcmViYXNlRGF0YVwiKTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfTtcbn07XG4iLCIvLyBmZXRjaCBza2lsbCBmb3JtIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IG9uIHRoZSBmaWx0ZXIgc2tpbGwgc2VjdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaW1wb3J0IHsgYWN0dWFsRGF0YSwgZmlsdGVyVGFibGUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmNvbnN0IGZpbHRlclNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyLXNlYXJjaC1ib3hcIik7XG5jb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItZmlsdGVyLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBSZW5kZXJGaWx0ZXJCb3ggPSAoKSA9PiB7XG4gICAgbGV0IHZhbHVlID0gZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+IHtcbiAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1DaGVja2VkID0gZWxlbTtcbiAgICAgICAgaWYgKGVsZW1DaGVja2VkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuZmlsdGVyU2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBSZW5kZXJGaWx0ZXJCb3gpO1xuY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFyRmlsdGVyKTtcbiIsImltcG9ydCB7IGhhbmRsZVRhYmxlQ2xpY2sgfSBmcm9tIFwiLi90YWJsZUFjdGlvbkJ1dHRvblwiO1xuY29uc3QgZGF0YUVudHJ5U3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRhLWVudHJ5LXN1Ym1pdFwiKTtcbmNvbnN0IGRhdGFFbnRyeUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZm9ybVwiKTtcbmNvbnN0IG1hdGVyaWFsU3ltYm9sc091dGxpbmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIFwiKTtcbmNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuY29uc3QgZGVwYXJ0bWVudEVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBza2lsbFNlbGVjRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuY29uc3QgZGF0YVZpZXdDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LWNsb3NlXCIpO1xuY29uc3QgY2FuY2VsRGVsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtZGVsLWJ1dHRvblwiKTtcbmNvbnN0IGFkZEVtcGxveWVlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtZW1wbG95ZWUtYnV0dG9uXCIpO1xuY29uc3QgZGF0YUVudHJ5Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktY2xvc2VcIik7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5pbXBvcnQgeyBjb25zdE9iaiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbmNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmltcG9ydCB7IHNvcnRGdW4gfSBmcm9tIFwiLi9Tb3J0RnVuXCI7XG5leHBvcnQgbGV0IGFjdHVhbERhdGE7XG5leHBvcnQgbGV0IG9yaWdpbmFsRGF0YTtcbmV4cG9ydCBsZXQgZmlyZWJhc2VEYXRhO1xuZXhwb3J0IGxldCBza2lsbE5hbWVBcnIgPSBbXTsgLy9zdHJpbmcgYXJyYXlcbmV4cG9ydCBsZXQgc2tpbGxOYW1lO1xuZXhwb3J0IGNvbnN0IGNoYW5nZVNraWxsTmFtZUFyciA9IChlbGVtKSA9PiB7XG4gICAgc2tpbGxOYW1lQXJyID0gZWxlbTtcbn07XG5leHBvcnQgY29uc3QgY2hhbmdlU2tpbGxOYW1lID0gKGVsZW0pID0+IHtcbiAgICBza2lsbE5hbWUgPSBlbGVtO1xufTtcbmNvbnN0IHNraWxsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuY29uc3QgRnVsbHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IGZvcm1Ta2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1za2lsbFwiKTtcbmNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG5jb25zdCB0b2FzdE1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9hc3QtbXNnXCIpO1xuY29uc3QgdG9hc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0XCIpO1xuLy9nZW5lcmFsIHRhYmxlIHJlbmRlcmluZyBmdW5jdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCB0b2FzdCA9ICh0eXBlLCBtc2cpID0+IHtcbiAgICBpZiAodHlwZSkge1xuICAgICAgICB0b2FzdE1zZy5pbm5lckhUTUwgPSBtc2c7XG4gICAgICAgIG1hdGVyaWFsU3ltYm9sc091dGxpbmVkLmlubmVySFRNTCA9IFwiZXJyb3JcIjtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUuYmFja2dyb3VuZCA9XG4gICAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCgxMTEuNGRlZywgcmdiKDI0NiwgNCwgMjYpIDAuNCUsIHJnYigyNTEsIDEzOSwgMzQpIDEwMC4yJSlcIjtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDE3MCUpXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0b2FzdE1zZy5pbm5lckhUTUwgPSBtc2c7XG4gICAgICAgIHRvYXN0RGl2LnN0eWxlLmJhY2tncm91bmQgPVxuICAgICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoMTc5LjFkZWcsIHJnYig0MywgMTcwLCA5NikgMi4zJSwgcmdiKDEyOSwgMjA0LCAxMDQpIDk4LjMlKVwiO1xuICAgICAgICBtYXRlcmlhbFN5bWJvbHNPdXRsaW5lZC5pbm5lckhUTUwgPSBcImRvbmVcIjtcbiAgICAgICAgdG9hc3REaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKDE3MCUpXCI7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0b2FzdERpdi5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMClcIjtcbiAgICB9LCAzMDAwKTtcbn07XG5leHBvcnQgY29uc3QgdGFibGVDcmVhdGUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgbGV0IGRlcCA9IGFjdHVhbERhdGEuZGVwYXJ0bWVudFtvYmplbGVtLmRlcGFydG1lbnQgLSAxXS5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCArPSBgXG4gICAgPHRyIGNsYXNzPVwiZGF0YS1yb3dcIj5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5pZH08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmZ1bGxOYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZW1haWx9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGVwfTwvdGQ+XG4gICAgICAgIDx0ZCBpZD1cImFjdGlvbi1idXR0b24tY2VsbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0+PGltZyBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfSBjbGFzcz1cInZpZXctaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvdmlldy1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwidmlldyBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2VkaXQtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkVkaXQgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZGVsLWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICBgO1xuICAgIH0pO1xufTtcbi8vIGZldGNoaW5nIGRhdGEgZnJvbSBmaXJlYmFzZSBhbmQgZGlzcGxheSBpdCBpbnRvIHRoZSB0YWJsZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IGZpbGxlbnRyeSA9IChvYmopID0+IHtcbiAgICB0YWJsZUNyZWF0ZShvYmouZW1wbG95ZWUpO1xuICAgIC8vIGZpbHRlciBza2lsbCBidXR0b24gc2NyaXB0XG4gICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIik7XG4gICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgIH0pO1xuICAgIC8vZmlsbCBkZXBhcnRtZW50IGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBkZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgIG9iai5kZXBhcnRtZW50LmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9XCI+JHtvYmplbGVtLmRlcGFydG1lbnROYW1lfTwvb3B0aW9uPmA7XG4gICAgfSk7XG4gICAgLy8gZmlsbCByb2xlIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICByb2xlRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgcm9sZUVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0ucm9sZX1cIj4ke29iamVsZW0ucm9sZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPmNob29zZSBza2lsbDwvb3B0aW9uPmA7XG4gICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gY2xhc3M9XCJza2lsbC1vcHRpb25zXCIgaWQ9XCIke29iamVsZW0uc2tpbGx9XCIgdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgfSk7XG59O1xuLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhID0gZnVuY3Rpb24gKGZpbGxlbnRyeSkge1xuICAgIGZldGNoKGNvbnN0T2JqLmFwaSArIFwiLy5qc29uXCIpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIC8vIGZpcmViYXNlRGF0YSA9IGRhdGE7XG4gICAgICAgIGZpcmViYXNlRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgICAgICAgZGF0YS5lbXBsb3llZSA9IGRhdGEuZW1wbG95ZWUuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICBvcmlnaW5hbERhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUoZGF0YSk7XG4gICAgICAgIGFjdHVhbERhdGEgPSBkYXRhO1xuICAgICAgICBmaWxsZW50cnkoZGF0YSk7XG4gICAgICAgIHNvcnRGdW4oKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyLCBcImVycm9yXCIpKTtcbn07XG5mZXRjaERhdGEoZmlsbGVudHJ5KTtcbnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUYWJsZUNsaWNrKTtcbi8vY2xvc2UgZGF0YS12aWV3LW1vZGFsXG5kYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vY2xvc2UgZGF0YS1kZWwtbW9kYWxcbmNhbmNlbERlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbi8vQWRkIGVtcGxveWVlIGZ1bmN0aW9uXG5hZGRFbXBsb3llZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRhdGFFbnRyeUZvcm0ucmVzZXQoKTtcbiAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGRhdGFFbnRyeVN1Ym1pdC52YWx1ZSA9IFwiQWRkXCI7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59KTtcbmRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9maWx0ZXJBbmRTZWFyY2ggZnVuY3Rpb25hbGl0eVxuZXhwb3J0IGxldCBGaWx0ZXJBcnIgPSBbXTtcbmV4cG9ydCBjb25zdCBmaWx0ZXJUYWJsZSA9ICgpID0+IHtcbiAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50XCIpO1xuICAgIGxldCBjaGVja2VkRmlsdGVyQXJyID0gW107XG4gICAgaW5wdXRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW07XG4gICAgICAgIGNvbnN0IHRyaWFsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtlbGVtZW50LmRhdGFzZXQuc2tpbGxJZH1gKTtcbiAgICAgICAgaWYgKHRyaWFsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBlbGVtZW50LmRhdGFzZXQuc2tpbGxOdW07XG4gICAgICAgICAgICBjaGVja2VkRmlsdGVyQXJyLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzZWFyY2h2YWx1ZSA9IHNlYXJjaEJhci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIEZpbHRlckFyciA9IGFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgaWYgKHNlYXJjaEJhci52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtLmZ1bGxOYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaHZhbHVlKSk7XG4gICAgfVxuICAgIGlmIChjaGVja2VkRmlsdGVyQXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBjaGVja2VkRmlsdGVyQXJyLmV2ZXJ5KChjaGVja0VsZW0pID0+IGVsZW0uc2tpbGxzLmluY2x1ZGVzKE51bWJlcihjaGVja0VsZW0pKSkpO1xuICAgIH1cbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShGaWx0ZXJBcnIpO1xufTtcbmNvbnN0IGNoYW5nZVNraWxsU3RhdGUgPSAoc2tpbGxJZCkgPT4ge1xuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtza2lsbElkfWApO1xuICAgIHRlbXAuY2xpY2soKTtcbiAgICBmaWx0ZXJUYWJsZSgpO1xufTtcbnNraWxsTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLWVsZW1lbnRcIikgJiZcbiAgICAgICAgdGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIikge1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIklOUFVUXCIgfHwgdGFyZ2V0LnRhZ05hbWUgPT09IFwiTEFCRUxcIikge1xuICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXRDbG9zZXN0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG59KTtcbnNvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNvcnRGdW4pO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmaWx0ZXJUYWJsZSk7XG4vL3NldHRpbmcgbGltaXQgdG8gZGF0ZSBvZiBiaXJ0aFxubGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0pTT04oKS5zbGljZSgwLCAxMCk7XG5jb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgdG9kYXkpO1xuIiwiY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmNvbnN0IGRhdGFWaWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1tb2RhbFwiKTtcbmNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5jb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5pbXBvcnQgeyB1cGRhdGVFbXAgfSBmcm9tIFwiLi91cGRhdGVFbXBsb3llZVwiO1xuaW1wb3J0IHsgdmlld01vZGFsIH0gZnJvbSBcIi4vdmlld0VtcGxveWVlXCI7XG5pbXBvcnQgeyBkZWxFbXAgfSBmcm9tIFwiLi9kZWxldGVFbXBsb3llZVwiO1xuZXhwb3J0IGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlldy1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB2aWV3TW9kYWwoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsLWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGVsRW1wKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbiAgICAvLy8gdXBkYXRlIHVzZXIgZGV0YWlscyBmdW5jdGlvbmFsaXR5XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRW50cnlTdWJtaXQudmFsdWUgPSBcIlVwZGF0ZVwiO1xuICAgICAgICB1cGRhdGVFbXAoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmVtcElkKSk7XG4gICAgfVxufTtcbiIsImV4cG9ydCB7fTtcbiIsImltcG9ydCB7IGFjdHVhbERhdGEsIGNoYW5nZVNraWxsTmFtZSwgc2tpbGxOYW1lLCBmaXJlYmFzZURhdGEsIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG4vLyBleHBvcnQgbGV0IHNraWxsTmFtZTogc3RyaW5nW107XG5jb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lXCIpO1xuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpO1xuY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuY29uc3QgZGF0YU9mQmlydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmNvbnN0IGRlcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBsb2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jXCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmxldCB1cGRhdGVJbmRleCA9IDA7XG5sZXQgaWRPZkVtcCA9IDEwMDE7XG5leHBvcnQgY29uc3QgdXBkYXRlRW1wID0gKGlkKSA9PiB7XG4gICAgaWRPZkVtcCA9IGlkO1xuICAgIGxldCBjdXJyT2JqO1xuICAgIGxldCBkZXBhcnRtZW50O1xuICAgIGZpcmViYXNlRGF0YS5lbXBsb3llZS5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlbHNlIGlmIChvYmouaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIGN1cnJPYmogPSBvYmo7XG4gICAgICAgICAgICBmaXJlYmFzZURhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JqID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJPYmouZGVwYXJ0bWVudCA9PSBvYmouZGVwYXJ0bWVudElEKVxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50ID0gb2JqLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IGZpcmViYXNlRGF0YS5lbXBsb3llZS5sZW5ndGg7IHN0ZXArKykge1xuICAgICAgICAgICAgICAgIGlmIChmaXJlYmFzZURhdGEuZW1wbG95ZWVbc3RlcF0gPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdLmlkID09IGN1cnJPYmouaWQpXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUluZGV4ID0gc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWUudmFsdWUgPSBgJHtjdXJyT2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbC52YWx1ZSA9IGAke2N1cnJPYmouZW1haWx9YDtcbiAgICAgICAgICAgIGRhdGVPZkpvaW4udmFsdWUgPSBgJHtjdXJyT2JqLmRhdGVPZkJpcnRofWA7XG4gICAgICAgICAgICBkYXRhT2ZCaXJ0aC52YWx1ZSA9IGAke2N1cnJPYmouZGF0ZU9mSm9pbn1gO1xuICAgICAgICAgICAgbG9jSW5wdXQudmFsdWUgPSBgJHtjdXJyT2JqLndvcmtMb2NhdGlvbn1gO1xuICAgICAgICAgICAgcm9sZUlucHV0LnZhbHVlID0gYCR7Y3Vyck9iai5yb2xlfWA7XG4gICAgICAgICAgICBkZXBJbnB1dC52YWx1ZSA9IGAke2RlcGFydG1lbnR9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBza2lsbE5hbWVDb3B5ID0gYWN0dWFsRGF0YS5za2lsbC5yZWR1Y2UoKGFjYywgZWxlbSkgPT4ge1xuICAgICAgICBpZiAoY3Vyck9iai5za2lsbHMuaW5jbHVkZXMoZWxlbS5za2lsbElEKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGVsZW0uc2tpbGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjXTtcbiAgICB9LCBbXSk7XG4gICAgY2hhbmdlU2tpbGxOYW1lKHNraWxsTmFtZUNvcHkpO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2tpbGxOYW1lLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgYWRkZWRTa2lsbHMuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBkYXRhLXJlbS1pZD0ke2VsZW19IGNsYXNzPVwiZWFjaC1za2lsbC1hZGRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2VsZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG4gICAgLy8gZmlyZWJhc2VEYXRhLmVtcGxveWVlLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgLy8gICBpZiAoZWxlbSA9PSBudWxsKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwibnVsbCBpcyBmb3VuZFwiKTtcbiAgICAvLyAgICAgcmV0dXJuO1xuICAgIC8vICAgfSBlbHNlIGlmIChlbGVtLmlkID09IGN1cnJPYmouaWQpIHVwZGF0ZUluZGV4ID0gaW5kZXg7XG4gICAgLy8gICBlbHNlIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZmlyZWJhc2VEYXRhLCBcImZpcmViYXNlRGF0YSB3aGVuIGZpbmRpbmcgdXBkYXRlIEluZGV4XCIpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGdldHRpbmcgdXBkYXRlSW5kZXhcIik7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHVwZGF0ZUluZGV4LCBcInVwZGF0ZUluZGV4IHdoZW4gZmFpbGVkXCIpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICAgIC8vIGZvcihsZXQgc3RlcD0wO3N0ZXA8ZmlyZWJhc2VEYXRhLmVtcGxveWVlLmxlbmd0aDtzdGVwKyspe1xuICAgIC8vICAgaWYgKGZpcmViYXNlRGF0YS5lbXBsb3llZVtzdGVwXSA9PSBudWxsKSBjb250aW51ZTtcbiAgICAvLyAgIGVsc2UgaWYoZmlyZWJhc2VEYXRhLmVtcGxveWVlW3N0ZXBdLmlkID09IGN1cnJPYmouaWQpIHVwZGF0ZUluZGV4PXN0ZXA7XG4gICAgLy8gfVxufTtcbmV4cG9ydCB7IHVwZGF0ZUluZGV4LCBpZE9mRW1wIH07XG4iLCJpbXBvcnQgeyBhY3R1YWxEYXRhIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5jb25zdCBuYW1lVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVZpZXdcIik7XG5jb25zdCBlbWFpbFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsVmlld1wiKTtcbmNvbnN0IGVtcElkVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1wSWRWaWV3XCIpO1xuY29uc3QgZG9qVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qVmlld1wiKTtcbmNvbnN0IGRvYlZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlZpZXdcIik7XG5jb25zdCBkZXBWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBWaWV3XCIpO1xuY29uc3Qgcm9sZVZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVWaWV3XCIpO1xuY29uc3QgbG9jVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jVmlld1wiKTtcbmNvbnN0IGltZ1ZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltZ1wiKTtcbmNvbnN0IHZpZXdTa2lsbEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmlldy1za2lsbC1ib3hcIik7XG5leHBvcnQgY29uc3Qgdmlld01vZGFsID0gKGlkKSA9PiB7XG4gICAgbGV0IHZpZXdPYmo7XG4gICAgbGV0IGRlcGFydG1lbnQ7XG4gICAgYWN0dWFsRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGlmIChlbGVtLmlkID09IGlkKSB7XG4gICAgICAgICAgICB2aWV3T2JqID0gZWxlbTtcbiAgICAgICAgICAgIGFjdHVhbERhdGEuZGVwYXJ0bWVudC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmlld09iai5kZXBhcnRtZW50ID09IG9iai5kZXBhcnRtZW50SUQpXG4gICAgICAgICAgICAgICAgICAgIGRlcGFydG1lbnQgPSBvYmouZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5hbWVWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZnVsbE5hbWV9YDtcbiAgICAgICAgICAgIGVtYWlsVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmVtYWlsfWA7XG4gICAgICAgICAgICBlbXBJZFZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5pZH1gO1xuICAgICAgICAgICAgZG9qVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmRhdGVPZkpvaW59YDtcbiAgICAgICAgICAgIGRvYlZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5kYXRlT2ZCaXJ0aH1gO1xuICAgICAgICAgICAgZGVwVmlldy5pbm5lckhUTUwgPSBgJHtkZXBhcnRtZW50fWA7XG4gICAgICAgICAgICByb2xlVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLnJvbGV9YDtcbiAgICAgICAgICAgIGxvY1ZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai53b3JrTG9jYXRpb259YDtcbiAgICAgICAgICAgIC8vIGlmICh2aWV3T2JqLmltYWdlU3JjKSB7XG4gICAgICAgICAgICAvLyAgIGltZ1ZpZXcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke3ZpZXdPYmouaW1hZ2VTcmN9YCk7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIGxvYWRpbmcgaW1hZ2VcIik7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBpbWdWaWV3LnNyYyA9IGAke3ZpZXdPYmouaW1hZ2VTcmN9YDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBlYWNoU2tpbGwgPSBhY3R1YWxEYXRhLnNraWxsLnJlZHVjZSgoYWNjLCBlbGVtKSA9PiB7XG4gICAgICAgIGlmICh2aWV3T2JqLnNraWxscy5pbmNsdWRlcyhlbGVtLnNraWxsSUQpKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgZWxlbS5za2lsbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2NdO1xuICAgIH0sIFtdKTtcbiAgICB2aWV3U2tpbGxCb3guaW5uZXJIVE1MID0gXCJcIjtcbiAgICBlYWNoU2tpbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICB2aWV3U2tpbGxCb3guaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVhY2gtc2tpbGwtdmlld1wiPiR7ZWxlbX08L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0LnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL1NvcnRGdW4udHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY29uc3RhbnRzLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3R5cGUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYWRkVXBkYXRlRW1wbG95ZWUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZGVsZXRlRW1wbG95ZWUudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdXBkYXRlRW1wbG95ZWUudHNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy92aWV3RW1wbG95ZWUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=