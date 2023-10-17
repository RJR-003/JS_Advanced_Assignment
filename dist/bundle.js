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
    _script__WEBPACK_IMPORTED_MODULE_0__.originalData.employee.forEach((elem, index) => {
        if (elem.id == id)
            delIndex = index;
    });
    confirmButton.onclick = () => {
        delData(delIndex);
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
    if (target.classList.contains("skill-element")) {
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
            imgView.setAttribute("src", `${viewObj.imageSrc}`);
            //   .src = `${viewObj.imageSrc}`;
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/type.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDdEI7QUFDQTtBQUNBLGFBQWE7QUFDYixvQ0FBb0MsaUJBQWlCO0FBQ3JELHFDQUFxQyxjQUFjO0FBQ25ELHFDQUFxQyxXQUFXO0FBQ2hELG1DQUFtQyxtQkFBbUI7QUFDdEQsbUNBQW1DLG9CQUFvQjtBQUN2RCxtQ0FBbUMsV0FBVztBQUM5QyxvQ0FBb0MsYUFBYTtBQUNqRCxtQ0FBbUMscUJBQXFCO0FBQ3hELDJDQUEyQyxpQkFBaUI7QUFDNUQsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBLEtBQUs7QUFDTCxvQkFBb0IsK0NBQVU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBLEtBQUs7QUFDTDs7Ozs7OztVQzlDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvU29ydEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9kZWxldGVFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvZmlsdGVyQW5kU2VhcmNoRnVuLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy90eXBlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy91cGRhdGVFbXBsb3llZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdmlld0VtcGxveWVlLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3R1YWxEYXRhLCB0YWJsZUNyZWF0ZSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgRmlsdGVyQXJyIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG5pbXBvcnQgeyB0YWJsZUJvZHksIHNvcnRCdXR0b24gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmxldCBkaXJGbGFnID0gMTtcbi8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBzb3J0RnVuID0gKCkgPT4ge1xuICAgIGxldCBhcnJheVRvU29ydCA9IGFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgaWYgKEZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgIGFycmF5VG9Tb3J0ID0gRmlsdGVyQXJyO1xuICAgIGxldCBhcnJUb1JlbmRlciA9IGFycmF5VG9Tb3J0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IG5hbWUyID0gYi5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgY29tcGFyaXNvbiA9IDA7XG4gICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICBjb21wYXJpc29uID0gMSAqIGRpckZsYWc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgY29tcGFyaXNvbiA9IC0xICogZGlyRmxhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICB9KTtcbiAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0YWJsZUNyZWF0ZShhcnJUb1JlbmRlcik7XG4gICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy9kb3duLWFycm93LnN2Z1wiO1xuICAgICAgICBkaXJGbGFnID0gLTE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkaXJGbGFnID0gMTtcbiAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvdXAtYXJyb3cuc3ZnXCI7XG4gICAgfVxufTtcbiIsImV4cG9ydCBjb25zdCBhcGkgPSBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCI7XG5leHBvcnQgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbmV4cG9ydCBjb25zdCBkYXRhVmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctbW9kYWxcIik7XG5leHBvcnQgY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbmV4cG9ydCBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG5leHBvcnQgY29uc3Qgc29ydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydC1idXR0b25cIik7XG5leHBvcnQgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuZXhwb3J0IGNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbmV4cG9ydCBjb25zdCBmaWx0ZXJTZWFyY2hCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlci1zZWFyY2gtYm94XCIpO1xuZXhwb3J0IGNvbnN0IGRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuZXhwb3J0IGNvbnN0IHJvbGVFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbmV4cG9ydCBjb25zdCBza2lsbFNlbGVjRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbmV4cG9ydCBjb25zdCBjYW5jZWxEZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC1kZWwtYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IGFkZEVtcGxveWVlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtZW1wbG95ZWUtYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuZXhwb3J0IGNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItZmlsdGVyLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lXCIpO1xuZXhwb3J0IGNvbnN0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKTtcbmV4cG9ydCBjb25zdCBkYXRlT2ZKb2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2pcIik7XG5leHBvcnQgY29uc3QgZGF0YU9mQmlydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmV4cG9ydCBjb25zdCBkZXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuZXhwb3J0IGNvbnN0IHJvbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbmV4cG9ydCBjb25zdCBsb2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jXCIpO1xuZXhwb3J0IGNvbnN0IHNraWxsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuZXhwb3J0IGNvbnN0IEZ1bGx0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5leHBvcnQgY29uc3QgZm9ybVNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLXNraWxsXCIpO1xuZXhwb3J0IGNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5TmFtZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW5hbWUtYWxlcnRcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5RG9qQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZG9qLWFsZXJ0IFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlEb2JBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1kb2ItYWxlcnRcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5Um9sZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LXJvbGUtYWxlcnRcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5RGVwQWxlcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktZGVwLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeUxvY0FsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWxvYy1hbGVydFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlTa2lsbEFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LXNraWxsLWFsZXJ0XCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFFbnRyeVN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0YS1lbnRyeS1zdWJtaXRcIik7XG5leHBvcnQgY29uc3QgZGF0YUVudHJ5Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1mb3JtXCIpO1xuIiwiaW1wb3J0IHsgb3JpZ2luYWxEYXRhLCBmZXRjaERhdGEsIGZpbGxlbnRyeSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgYXBpLCBza2lsbExpc3QsIG92ZXJsYXksIGRhdGFEZWxNb2RhbCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS1idXR0b25cIik7XG5jb25zdCBkZWxEYXRhID0gKGluZGV4KSA9PiB7XG4gICAgZmV0Y2goYXBpICsgXCIvZW1wbG95ZWUvXCIgKyBpbmRleCArIFwiLmpzb25cIiwge1xuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMsIFwic3VjY2Vzc2Z1bGx5IGRlbGV0ZWQhISFcIik7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIC8vIHRhYmxlQ3JlYXRlKGRhdGEpO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEsIFwiZGF0YVwiKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyLCBcImVycm9yIHdoaWxlIGRlbGV0aW5nIGVtcGxveWVlXCIpKTtcbn07XG5leHBvcnQgY29uc3QgZGVsRW1wID0gKGlkKSA9PiB7XG4gICAgbGV0IGRlbEluZGV4O1xuICAgIG9yaWdpbmFsRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoZWxlbS5pZCA9PSBpZClcbiAgICAgICAgICAgIGRlbEluZGV4ID0gaW5kZXg7XG4gICAgfSk7XG4gICAgY29uZmlybUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBkZWxEYXRhKGRlbEluZGV4KTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfTtcbn07XG4iLCIvLyBmZXRjaCBza2lsbCBmb3JtIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IG9uIHRoZSBmaWx0ZXIgc2tpbGwgc2VjdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaW1wb3J0IHsgYWN0dWFsRGF0YSwgZmlsdGVyVGFibGUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IHNraWxsTGlzdCwgZmlsdGVyU2VhcmNoQm94LCBjbGVhckZpbHRlckJ1dHRvbiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuZXhwb3J0IGNvbnN0IFJlbmRlckZpbHRlckJveCA9ICgpID0+IHtcbiAgICBsZXQgdmFsdWUgPSBmaWx0ZXJTZWFyY2hCb3gudmFsdWU7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFjdHVhbERhdGEuc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbElkID0gb2JqZWxlbS5za2lsbC5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgaWYgKHNraWxsSWQuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICAgICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGNsZWFyRmlsdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50IGlucHV0XCIpO1xuICAgIHNraWxsLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbUNoZWNrZWQgPSBlbGVtO1xuICAgICAgICBpZiAoZWxlbUNoZWNrZWQuY2hlY2tlZCkge1xuICAgICAgICAgICAgZWxlbUNoZWNrZWQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZmlsdGVyVGFibGUoKTtcbn07XG5maWx0ZXJTZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIFJlbmRlckZpbHRlckJveCk7XG5jbGVhckZpbHRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xlYXJGaWx0ZXIpO1xuIiwiaW1wb3J0IHsgaGFuZGxlVGFibGVDbGljayB9IGZyb20gXCIuL3RhYmxlQWN0aW9uQnV0dG9uXCI7XG5pbXBvcnQgeyBhcGksIG92ZXJsYXksIHRhYmxlLCBkYXRhVmlld01vZGFsLCBkYXRhRGVsTW9kYWwsIHRhYmxlQm9keSwgc2tpbGxMaXN0LCBkZXBhcnRtZW50RW50cnksIHJvbGVFbnRyeSwgc2tpbGxTZWxlY0VudHJ5LCBkYXRhVmlld0Nsb3NlLCBjYW5jZWxEZWxCdXR0b24sIGFkZEVtcGxveWVlQnV0dG9uLCBkYXRhRW50cnlDbG9zZSwgZGF0YUVudHJ5TW9kYWwsIHNlYXJjaEJhciwgc29ydEJ1dHRvbiwgZGF0YUVudHJ5Rm9ybSwgZGF0YUVudHJ5U3VibWl0LCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgc29ydEZ1biB9IGZyb20gXCIuL1NvcnRGdW5cIjtcbmV4cG9ydCBsZXQgYWN0dWFsRGF0YTtcbmV4cG9ydCBsZXQgb3JpZ2luYWxEYXRhO1xuZXhwb3J0IGxldCBza2lsbE5hbWVBcnIgPSBbXTsgLy9zdHJpbmcgYXJyYXlcbmV4cG9ydCBsZXQgc2tpbGxOYW1lO1xuZXhwb3J0IGNvbnN0IGNoYW5nZVNraWxsTmFtZUFyciA9IChlbGVtKSA9PiB7XG4gICAgc2tpbGxOYW1lQXJyID0gZWxlbTtcbn07XG5leHBvcnQgY29uc3QgY2hhbmdlU2tpbGxOYW1lID0gKGVsZW0pID0+IHtcbiAgICBza2lsbE5hbWUgPSBlbGVtO1xufTtcbmNvbnN0IHNraWxsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuY29uc3QgRnVsbHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbmNvbnN0IGZvcm1Ta2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1za2lsbFwiKTtcbmNvbnN0IGFkZGVkU2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRlZC1za2lsbHNcIik7XG4vL2dlbmVyYWwgdGFibGUgcmVuZGVyaW5nIGZ1bmN0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGxldCBkZXAgPSBhY3R1YWxEYXRhLmRlcGFydG1lbnRbb2JqZWxlbS5kZXBhcnRtZW50IC0gMV0uZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgKz0gYFxuICAgIDx0ciBjbGFzcz1cImRhdGEtcm93XCI+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uaWR9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5mdWxsTmFtZX08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmVtYWlsfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2RlcH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJhY3Rpb24tYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9PjxpbWcgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0gY2xhc3M9XCJ2aWV3LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL3ZpZXctaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInZpZXcgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9lZGl0LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJFZGl0IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9IGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2RlbC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICAgYDtcbiAgICB9KTtcbn07XG4vLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjb25zdCBmaWxsZW50cnkgPSAob2JqKSA9PiB7XG4gICAgdGFibGVDcmVhdGUob2JqLmVtcGxveWVlKTtcbiAgICAvLyBmaWx0ZXIgc2tpbGwgYnV0dG9uIHNjcmlwdFxuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuPC9kaXY+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgZGVwYXJ0bWVudCBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLmRlcGFydG1lbnROYW1lfVwiPiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgcm9sZUVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICBvYmoucm9sZS5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICB9KTtcbiAgICAvL2ZpbGwgc2tpbGwgaW4gc2tpbGwgc2VsZWN0aW9uIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIGNsYXNzPVwic2tpbGwtb3B0aW9uc1wiIGlkPVwiJHtvYmplbGVtLnNraWxsfVwiIHZhbHVlPVwiJHtvYmplbGVtLnNraWxsfVwiPiR7b2JqZWxlbS5za2lsbH08L29wdGlvbj5gO1xuICAgIH0pO1xufTtcbi8vZmV0Y2hpbmcgZGF0YSB3aG9sZSBkYXRhIGZyb20gZmlyZWJhc2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IGZ1bmN0aW9uIChmaWxsZW50cnkpIHtcbiAgICBmZXRjaChhcGkgKyBcIi8uanNvblwiKVxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBkYXRhLmVtcGxveWVlID0gZGF0YS5lbXBsb3llZS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgIG9yaWdpbmFsRGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgICAgICAgYWN0dWFsRGF0YSA9IGRhdGE7XG4gICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgc29ydEZ1bigpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xufTtcbmZldGNoRGF0YShmaWxsZW50cnkpO1xudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRhYmxlQ2xpY2spO1xuLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbmRhdGFWaWV3Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9jbG9zZSBkYXRhLWRlbC1tb2RhbFxuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9BZGQgZW1wbG95ZWUgZnVuY3Rpb25cbmFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGF0YUVudHJ5Rm9ybS5yZXNldCgpO1xuICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZGF0YUVudHJ5U3VibWl0LnZhbHVlID0gXCJBZGRcIjtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn0pO1xuZGF0YUVudHJ5Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkYXRhRW50cnlGb3JtLnJlc2V0KCk7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL2ZpbHRlckFuZFNlYXJjaCBmdW5jdGlvbmFsaXR5XG5leHBvcnQgbGV0IEZpbHRlckFyciA9IFtdO1xuZXhwb3J0IGNvbnN0IGZpbHRlclRhYmxlID0gKCkgPT4ge1xuICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnRcIik7XG4gICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbTtcbiAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICBpZiAodHJpYWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGVsZW1lbnQuZGF0YXNldC5za2lsbE51bTtcbiAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgRmlsdGVyQXJyID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0uZnVsbE5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNodmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrZWRGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgfVxuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKEZpbHRlckFycik7XG59O1xuY29uc3QgY2hhbmdlU2tpbGxTdGF0ZSA9IChza2lsbElkKSA9PiB7XG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgdGVtcC5jbGljaygpO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuc2tpbGxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSkge1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIklOUFVUXCIgfHwgdGFyZ2V0LnRhZ05hbWUgPT09IFwiTEFCRUxcIikge1xuICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXRDbG9zZXN0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG59KTtcbnNvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNvcnRGdW4pO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmaWx0ZXJUYWJsZSk7XG4vL3NldHRpbmcgbGltaXQgdG8gZGF0ZSBvZiBiaXJ0aFxubGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0pTT04oKS5zbGljZSgwLCAxMCk7XG5jb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgdG9kYXkpO1xuIiwiaW1wb3J0IHsgb3ZlcmxheSwgZGF0YVZpZXdNb2RhbCwgZGF0YURlbE1vZGFsLCBkYXRhRW50cnlNb2RhbCwgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHVwZGF0ZUVtcCB9IGZyb20gXCIuL3VwZGF0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyB2aWV3TW9kYWwgfSBmcm9tIFwiLi92aWV3RW1wbG95ZWVcIjtcbmltcG9ydCB7IGRlbEVtcCB9IGZyb20gXCIuL2RlbGV0ZUVtcGxveWVlXCI7XG5pbXBvcnQgeyBkYXRhRW50cnlTdWJtaXQgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmV4cG9ydCBjb25zdCBoYW5kbGVUYWJsZUNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInZpZXctaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdmlld01vZGFsKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRlbEVtcChOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZW1wSWQpKTtcbiAgICB9XG4gICAgLy8vIHVwZGF0ZSB1c2VyIGRldGFpbHMgZnVuY3Rpb25hbGl0eVxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZGF0YUVudHJ5U3VibWl0LnZhbHVlID0gXCJVcGRhdGVcIjtcbiAgICAgICAgdXBkYXRlRW1wKE51bWJlcih0YXJnZXQuZGF0YXNldC5lbXBJZCkpO1xuICAgIH1cbn07XG4iLCJleHBvcnQge307XG4iLCJpbXBvcnQgeyBhY3R1YWxEYXRhLCBvcmlnaW5hbERhdGEsIGNoYW5nZVNraWxsTmFtZSwgc2tpbGxOYW1lIH0gZnJvbSBcIi4vc2NyaXB0XCI7XG4vLyBleHBvcnQgbGV0IHNraWxsTmFtZTogc3RyaW5nW107XG5jb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lXCIpO1xuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpO1xuY29uc3QgZGF0ZU9mSm9pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZG9qXCIpO1xuY29uc3QgZGF0YU9mQmlydGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvYlwiKTtcbmNvbnN0IGRlcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG5jb25zdCByb2xlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5jb25zdCBsb2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jXCIpO1xuY29uc3QgYWRkZWRTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZGVkLXNraWxsc1wiKTtcbmxldCB1cGRhdGVJbmRleCA9IDA7XG5sZXQgaWRPZkVtcCA9IDEwMDE7XG5leHBvcnQgY29uc3QgdXBkYXRlRW1wID0gKGlkKSA9PiB7XG4gICAgaWRPZkVtcCA9IGlkO1xuICAgIGxldCBjdXJyT2JqO1xuICAgIGxldCBkZXBhcnRtZW50O1xuICAgIGFjdHVhbERhdGEuZW1wbG95ZWUuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGlmIChvYmouaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIGN1cnJPYmogPSBvYmo7XG4gICAgICAgICAgICBhY3R1YWxEYXRhLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJPYmouZGVwYXJ0bWVudCA9PSBvYmouZGVwYXJ0bWVudElEKVxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50ID0gb2JqLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuYW1lLnZhbHVlID0gYCR7Y3Vyck9iai5mdWxsTmFtZX1gO1xuICAgICAgICAgICAgZW1haWwudmFsdWUgPSBgJHtjdXJyT2JqLmVtYWlsfWA7XG4gICAgICAgICAgICBkYXRlT2ZKb2luLnZhbHVlID0gYCR7Y3Vyck9iai5kYXRlT2ZCaXJ0aH1gO1xuICAgICAgICAgICAgZGF0YU9mQmlydGgudmFsdWUgPSBgJHtjdXJyT2JqLmRhdGVPZkpvaW59YDtcbiAgICAgICAgICAgIGxvY0lucHV0LnZhbHVlID0gYCR7Y3Vyck9iai53b3JrTG9jYXRpb259YDtcbiAgICAgICAgICAgIHJvbGVJbnB1dC52YWx1ZSA9IGAke2N1cnJPYmoucm9sZX1gO1xuICAgICAgICAgICAgZGVwSW5wdXQudmFsdWUgPSBgJHtkZXBhcnRtZW50fWA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgc2tpbGxOYW1lQ29weSA9IGFjdHVhbERhdGEuc2tpbGwucmVkdWNlKChhY2MsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKGN1cnJPYmouc2tpbGxzLmluY2x1ZGVzKGVsZW0uc2tpbGxJRCkpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgfSwgW10pO1xuICAgIGNoYW5nZVNraWxsTmFtZShza2lsbE5hbWVDb3B5KTtcbiAgICBhZGRlZFNraWxscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHNraWxsTmFtZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGFkZGVkU2tpbGxzLmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgZGF0YS1yZW0taWQ9JHtlbGVtfSBjbGFzcz1cImVhY2gtc2tpbGwtYWRkZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtlbGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xuICAgIG9yaWdpbmFsRGF0YS5lbXBsb3llZS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoZWxlbS5pZCA9PSBjdXJyT2JqLmlkKVxuICAgICAgICAgICAgdXBkYXRlSW5kZXggPSBpbmRleDtcbiAgICB9KTtcbn07XG5leHBvcnQgeyB1cGRhdGVJbmRleCwgaWRPZkVtcCB9O1xuIiwiaW1wb3J0IHsgYWN0dWFsRGF0YSB9IGZyb20gXCIuL3NjcmlwdFwiO1xuY29uc3QgbmFtZVZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVWaWV3XCIpO1xuY29uc3QgZW1haWxWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFZpZXdcIik7XG5jb25zdCBlbXBJZFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtcElkVmlld1wiKTtcbmNvbnN0IGRvalZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RvalZpZXdcIik7XG5jb25zdCBkb2JWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkb2JWaWV3XCIpO1xuY29uc3QgZGVwVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwVmlld1wiKTtcbmNvbnN0IHJvbGVWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlVmlld1wiKTtcbmNvbnN0IGxvY1ZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY1ZpZXdcIik7XG5jb25zdCBpbWdWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWdcIik7XG5jb25zdCB2aWV3U2tpbGxCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpZXctc2tpbGwtYm94XCIpO1xuZXhwb3J0IGNvbnN0IHZpZXdNb2RhbCA9IChpZCkgPT4ge1xuICAgIGxldCB2aWV3T2JqO1xuICAgIGxldCBkZXBhcnRtZW50O1xuICAgIGFjdHVhbERhdGEuZW1wbG95ZWUuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBpZiAoZWxlbS5pZCA9PSBpZCkge1xuICAgICAgICAgICAgdmlld09iaiA9IGVsZW07XG4gICAgICAgICAgICBhY3R1YWxEYXRhLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdPYmouZGVwYXJ0bWVudCA9PSBvYmouZGVwYXJ0bWVudElEKVxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50ID0gb2JqLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuYW1lVmlldy5pbm5lckhUTUwgPSBgJHt2aWV3T2JqLmZ1bGxOYW1lfWA7XG4gICAgICAgICAgICBlbWFpbFZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5lbWFpbH1gO1xuICAgICAgICAgICAgZW1wSWRWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouaWR9YDtcbiAgICAgICAgICAgIGRvalZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5kYXRlT2ZKb2lufWA7XG4gICAgICAgICAgICBkb2JWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmouZGF0ZU9mQmlydGh9YDtcbiAgICAgICAgICAgIGRlcFZpZXcuaW5uZXJIVE1MID0gYCR7ZGVwYXJ0bWVudH1gO1xuICAgICAgICAgICAgcm9sZVZpZXcuaW5uZXJIVE1MID0gYCR7dmlld09iai5yb2xlfWA7XG4gICAgICAgICAgICBsb2NWaWV3LmlubmVySFRNTCA9IGAke3ZpZXdPYmoud29ya0xvY2F0aW9ufWA7XG4gICAgICAgICAgICBpbWdWaWV3LnNldEF0dHJpYnV0ZShcInNyY1wiLCBgJHt2aWV3T2JqLmltYWdlU3JjfWApO1xuICAgICAgICAgICAgLy8gICAuc3JjID0gYCR7dmlld09iai5pbWFnZVNyY31gO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGV0IGVhY2hTa2lsbCA9IGFjdHVhbERhdGEuc2tpbGwucmVkdWNlKChhY2MsIGVsZW0pID0+IHtcbiAgICAgICAgaWYgKHZpZXdPYmouc2tpbGxzLmluY2x1ZGVzKGVsZW0uc2tpbGxJRCkpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCBlbGVtLnNraWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjY107XG4gICAgfSwgW10pO1xuICAgIHZpZXdTa2lsbEJveC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGVhY2hTa2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIHZpZXdTa2lsbEJveC5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFjaC1za2lsbC12aWV3XCI+JHtlbGVtfTwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZmlsdGVyQW5kU2VhcmNoRnVuLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHQudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvU29ydEZ1bi50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90YWJsZUFjdGlvbkJ1dHRvbi50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb25zdGFudHMudHNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy90eXBlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9