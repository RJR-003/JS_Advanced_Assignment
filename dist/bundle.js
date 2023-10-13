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
/* harmony export */   addEmployeeButton: () => (/* binding */ addEmployeeButton),
/* harmony export */   api: () => (/* binding */ api),
/* harmony export */   cancelDelButton: () => (/* binding */ cancelDelButton),
/* harmony export */   clearFilterButton: () => (/* binding */ clearFilterButton),
/* harmony export */   dataDelModal: () => (/* binding */ dataDelModal),
/* harmony export */   dataEntryClose: () => (/* binding */ dataEntryClose),
/* harmony export */   dataEntryModal: () => (/* binding */ dataEntryModal),
/* harmony export */   dataViewClose: () => (/* binding */ dataViewClose),
/* harmony export */   dataViewModal: () => (/* binding */ dataViewModal),
/* harmony export */   departmentEntry: () => (/* binding */ departmentEntry),
/* harmony export */   filterSearchBox: () => (/* binding */ filterSearchBox),
/* harmony export */   overlay: () => (/* binding */ overlay),
/* harmony export */   roleEntry: () => (/* binding */ roleEntry),
/* harmony export */   searchBar: () => (/* binding */ searchBar),
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
/* harmony export */   filterTable: () => (/* binding */ filterTable),
/* harmony export */   tableCreate: () => (/* binding */ tableCreate)
/* harmony export */ });
/* harmony import */ var _tableActionButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableActionButton */ "./src/tableActionButton.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _SortFun__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SortFun */ "./src/SortFun.ts");



let actualData;
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
            <button  data-emp-id= ${objelem.id}><img class="view-image-icon" src="assets/images/view-img.svg"
                    alt="view button image"></button>
            <button class="edit-image-icon" data-emp-id=${objelem.id}><img class="edit-image-icon" src="assets/images/edit-img.svg"
                    alt="Edit button image"></button>
            <button class="del-image-icon" data-emp-id=${objelem.id}><img class="del-image-icon" src="assets/images/del-img.svg"
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
        _constants__WEBPACK_IMPORTED_MODULE_1__.skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
    });
};
//fetching data whole data from firebase
////////////////////////////////////////////////
const fetchData = function (fillentry) {
    fetch(_constants__WEBPACK_IMPORTED_MODULE_1__.api + "/.json")
        .then((res) => res.json())
        .then((data) => {
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
    _constants__WEBPACK_IMPORTED_MODULE_1__.overlay.style.display = "block";
    _constants__WEBPACK_IMPORTED_MODULE_1__.dataEntryModal.style.display = "block";
});
_constants__WEBPACK_IMPORTED_MODULE_1__.dataEntryClose.addEventListener("click", () => {
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

const handleTableClick = (e) => {
    const target = e.target;
    if (target.classList.contains("view-image-icon")) {
        _constants__WEBPACK_IMPORTED_MODULE_0__.overlay.style.display = "block";
        _constants__WEBPACK_IMPORTED_MODULE_0__.dataViewModal.style.display = "block";
    }
    if (target.classList.contains("del-image-icon")) {
        console.log("del button clicked");
        _constants__WEBPACK_IMPORTED_MODULE_0__.overlay.style.display = "block";
        _constants__WEBPACK_IMPORTED_MODULE_0__.dataDelModal.style.display = "block";
    }
};


/***/ }),

/***/ "./src/type.ts":
/*!*********************!*\
  !*** ./src/type.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCx3QkFBd0I7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsd0JBQXdCLGlEQUFTO0FBQ2pDO0FBQ0EsUUFBUSxpREFBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLGlEQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0RBQVUsMkJBQTJCLDZDQUFPO0FBQzVDLGlEQUFTOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkkwRDtBQUM1RDtBQUNQO0FBQ0E7QUFDQSxRQUFRLCtDQUFPO0FBQ2YsUUFBUSxxREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtDQUFPO0FBQ2YsUUFBUSxvREFBWTtBQUNwQjtBQUNBOzs7Ozs7Ozs7Ozs7QUNaVTs7Ozs7OztVQ0FWO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9Tb3J0RnVuLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvc2NyaXB0LnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy90YWJsZUFjdGlvbkJ1dHRvbi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvdHlwZS50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWN0dWFsRGF0YSwgdGFibGVDcmVhdGUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IEZpbHRlckFyciB9IGZyb20gXCIuL3NjcmlwdFwiO1xuaW1wb3J0IHsgdGFibGVCb2R5LCBzb3J0QnV0dG9uIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5sZXQgZGlyRmxhZyA9IDE7XG4vLyBzb3J0IGZ1bmN0aW9uYWxpdHlcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3Qgc29ydEZ1biA9ICgpID0+IHtcbiAgICBsZXQgYXJyYXlUb1NvcnQgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgIGlmIChGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKVxuICAgICAgICBhcnJheVRvU29ydCA9IEZpbHRlckFycjtcbiAgICBsZXQgYXJyVG9SZW5kZXIgPSBhcnJheVRvU29ydC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUxID0gYS5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBuYW1lMiA9IGIuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IGNvbXBhcmlzb24gPSAwO1xuICAgICAgICBpZiAobmFtZTEgPiBuYW1lMikge1xuICAgICAgICAgICAgY29tcGFyaXNvbiA9IDEgKiBkaXJGbGFnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUxIDwgbmFtZTIpIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb24gPSAtMSAqIGRpckZsYWc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBhcmlzb247XG4gICAgfSk7XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGFibGVDcmVhdGUoYXJyVG9SZW5kZXIpO1xuICAgIGlmIChkaXJGbGFnID09IDEpIHtcbiAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvZG93bi1hcnJvdy5zdmdcIjtcbiAgICAgICAgZGlyRmxhZyA9IC0xO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGlyRmxhZyA9IDE7XG4gICAgICAgIHNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL3VwLWFycm93LnN2Z1wiO1xuICAgIH1cbn07XG4iLCJleHBvcnQgY29uc3QgYXBpID0gXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiO1xuZXhwb3J0IGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5leHBvcnQgY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuZXhwb3J0IGNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG5leHBvcnQgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuZXhwb3J0IGNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuZXhwb3J0IGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWlucHV0LWJveFwiKTtcbmV4cG9ydCBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG5leHBvcnQgY29uc3QgZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbmV4cG9ydCBjb25zdCBkZXBhcnRtZW50RW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbmV4cG9ydCBjb25zdCByb2xlRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG5leHBvcnQgY29uc3Qgc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbmV4cG9ydCBjb25zdCBkYXRhVmlld0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctY2xvc2VcIik7XG5leHBvcnQgY29uc3QgY2FuY2VsRGVsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtZGVsLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBhZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1jbG9zZVwiKTtcbmV4cG9ydCBjb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbmV4cG9ydCBjb25zdCB0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG5leHBvcnQgY29uc3QgY2xlYXJGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsZWFyLWZpbHRlci1idXR0b25cIik7XG4iLCIvLyBmZXRjaCBza2lsbCBmb3JtIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IG9uIHRoZSBmaWx0ZXIgc2tpbGwgc2VjdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaW1wb3J0IHsgYWN0dWFsRGF0YSwgZmlsdGVyVGFibGUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcbmltcG9ydCB7IHNraWxsTGlzdCwgZmlsdGVyU2VhcmNoQm94LCBjbGVhckZpbHRlckJ1dHRvbiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuZXhwb3J0IGNvbnN0IFJlbmRlckZpbHRlckJveCA9ICgpID0+IHtcbiAgICBsZXQgdmFsdWUgPSBmaWx0ZXJTZWFyY2hCb3gudmFsdWU7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFjdHVhbERhdGEuc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbElkID0gb2JqZWxlbS5za2lsbC5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgaWYgKHNraWxsSWQuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICAgICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGNsZWFyRmlsdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50IGlucHV0XCIpO1xuICAgIHNraWxsLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbUNoZWNrZWQgPSBlbGVtO1xuICAgICAgICBpZiAoZWxlbUNoZWNrZWQuY2hlY2tlZCkge1xuICAgICAgICAgICAgZWxlbUNoZWNrZWQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZmlsdGVyVGFibGUoKTtcbn07XG5maWx0ZXJTZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIFJlbmRlckZpbHRlckJveCk7XG5jbGVhckZpbHRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xlYXJGaWx0ZXIpO1xuIiwiaW1wb3J0IHsgaGFuZGxlVGFibGVDbGljayB9IGZyb20gXCIuL3RhYmxlQWN0aW9uQnV0dG9uXCI7XG5pbXBvcnQgeyBhcGksIG92ZXJsYXksIHRhYmxlLCBkYXRhVmlld01vZGFsLCBkYXRhRGVsTW9kYWwsIHRhYmxlQm9keSwgc2tpbGxMaXN0LCBkZXBhcnRtZW50RW50cnksIHJvbGVFbnRyeSwgc2tpbGxTZWxlY0VudHJ5LCBkYXRhVmlld0Nsb3NlLCBjYW5jZWxEZWxCdXR0b24sIGFkZEVtcGxveWVlQnV0dG9uLCBkYXRhRW50cnlDbG9zZSwgZGF0YUVudHJ5TW9kYWwsIHNlYXJjaEJhciwgc29ydEJ1dHRvbiwgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHNvcnRGdW4gfSBmcm9tIFwiLi9Tb3J0RnVuXCI7XG5leHBvcnQgbGV0IGFjdHVhbERhdGE7XG4vL2dlbmVyYWwgdGFibGUgcmVuZGVyaW5nIGZ1bmN0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZXhwb3J0IGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgIGxldCBkZXAgPSBhY3R1YWxEYXRhLmRlcGFydG1lbnRbb2JqZWxlbS5kZXBhcnRtZW50IC0gMV0uZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgKz0gYFxuICAgIDx0ciBjbGFzcz1cImRhdGEtcm93XCI+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uaWR9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5mdWxsTmFtZX08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmVtYWlsfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2RlcH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJhY3Rpb24tYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJ2aWV3LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL3ZpZXctaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInZpZXcgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9lZGl0LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJFZGl0IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2RlbC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICAgYDtcbiAgICB9KTtcbn07XG4vLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNvbnN0IGZpbGxlbnRyeSA9IChvYmopID0+IHtcbiAgICB0YWJsZUNyZWF0ZShvYmouZW1wbG95ZWUpO1xuICAgIC8vIGZpbHRlciBza2lsbCBidXR0b24gc2NyaXB0XG4gICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIik7XG4gICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgIH0pO1xuICAgIC8vZmlsbCBkZXBhcnRtZW50IGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICBkZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgIG9iai5kZXBhcnRtZW50LmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9XCI+JHtvYmplbGVtLmRlcGFydG1lbnROYW1lfTwvb3B0aW9uPmA7XG4gICAgfSk7XG4gICAgLy8gZmlsbCByb2xlIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICByb2xlRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgcm9sZUVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0ucm9sZX1cIj4ke29iamVsZW0ucm9sZX08L29wdGlvbj5gO1xuICAgIH0pO1xuICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPmNob29zZSBza2lsbDwvb3B0aW9uPmA7XG4gICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgfSk7XG59O1xuLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBmZXRjaERhdGEgPSBmdW5jdGlvbiAoZmlsbGVudHJ5KSB7XG4gICAgZmV0Y2goYXBpICsgXCIvLmpzb25cIilcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgYWN0dWFsRGF0YSA9IGRhdGE7XG4gICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgc29ydEZ1bigpO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xufTtcbmZldGNoRGF0YShmaWxsZW50cnkpO1xudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRhYmxlQ2xpY2spO1xuLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbmRhdGFWaWV3Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9jbG9zZSBkYXRhLWRlbC1tb2RhbFxuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuLy9BZGQgZW1wbG95ZWUgZnVuY3Rpb25cbmFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59KTtcbmRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG4vL2ZpbHRlckFuZFNlYXJjaCBmdW5jdGlvbmFsaXR5XG5leHBvcnQgbGV0IEZpbHRlckFyciA9IFtdO1xuZXhwb3J0IGNvbnN0IGZpbHRlclRhYmxlID0gKCkgPT4ge1xuICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnRcIik7XG4gICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbTtcbiAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICBpZiAodHJpYWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGVsZW1lbnQuZGF0YXNldC5za2lsbE51bTtcbiAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgRmlsdGVyQXJyID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICBpZiAoc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0uZnVsbE5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNodmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrZWRGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgfVxuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRhYmxlQ3JlYXRlKEZpbHRlckFycik7XG59O1xuY29uc3QgY2hhbmdlU2tpbGxTdGF0ZSA9IChza2lsbElkKSA9PiB7XG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgdGVtcC5jbGljaygpO1xuICAgIGZpbHRlclRhYmxlKCk7XG59O1xuc2tpbGxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSkge1xuICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIklOUFVUXCIgfHwgdGFyZ2V0LnRhZ05hbWUgPT09IFwiTEFCRUxcIikge1xuICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXRDbG9zZXN0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgY2hhbmdlU2tpbGxTdGF0ZShkYXRhc2V0KTtcbiAgICB9XG59KTtcbnNvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNvcnRGdW4pO1xuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmaWx0ZXJUYWJsZSk7XG4iLCJpbXBvcnQgeyBvdmVybGF5LCBkYXRhVmlld01vZGFsLCBkYXRhRGVsTW9kYWwgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmV4cG9ydCBjb25zdCBoYW5kbGVUYWJsZUNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInZpZXctaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWwtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRlbCBidXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG59O1xuIiwiZXhwb3J0IHt9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9maWx0ZXJBbmRTZWFyY2hGdW4udHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdC50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Tb3J0RnVuLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2NvbnN0YW50cy50c1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3R5cGUudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=