/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SortFun.ts":
/*!************************!*\
  !*** ./src/SortFun.ts ***!
  \************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_3__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_4__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.table = exports.dataEntryModal = exports.dataEntryClose = exports.addEmployeeButton = exports.cancelDelButton = exports.dataViewClose = exports.skillSelecEntry = exports.roleEntry = exports.departmentEntry = exports.filterSearchBox = exports.skillList = exports.searchBar = exports.sortButton = exports.tableBody = exports.dataDelModal = exports.dataViewModal = exports.overlay = exports.api = void 0;
    exports.api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    exports.overlay = document.querySelector(".overlay");
    exports.dataViewModal = document.querySelector(".data-view-modal");
    exports.dataDelModal = document.querySelector(".data-del-modal");
    exports.tableBody = document.querySelector(".table-body");
    exports.sortButton = document.querySelector(".sort-button");
    exports.searchBar = document.querySelector(".search-input-box");
    exports.skillList = document.querySelector(".skill-list");
    exports.filterSearchBox = document.querySelector(".filter-search-box");
    exports.departmentEntry = document.querySelector("#dep");
    exports.roleEntry = document.querySelector("#role");
    exports.skillSelecEntry = document.querySelector("#skill");
    exports.dataViewClose = document.querySelector(".data-view-close");
    exports.cancelDelButton = document.querySelector(".cancel-del-button");
    exports.addEmployeeButton = document.querySelector(".add-employee-button");
    exports.dataEntryClose = document.querySelector(".data-entry-close");
    exports.dataEntryModal = document.querySelector(".data-entry-modal");
    exports.table = document.querySelector(".table");
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (require, exports, constants_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.handleTableClick = void 0;
    const handleTableClick = (e) => {
        const target = e.target;
        if (target.classList.contains("view-image-icon")) {
            constants_js_1.overlay.style.display = "block";
            constants_js_1.dataViewModal.style.display = "block";
        }
        if (target.classList.contains("del-image-icon")) {
            console.log("del button clicked");
            constants_js_1.overlay.style.display = "block";
            constants_js_1.dataDelModal.style.display = "block";
        }
    };
    exports.handleTableClick = handleTableClick;
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_3__ = (function (require, exports, tableActionButton_js_1, constants_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.tableCreate = exports.actualData = void 0;
    //general table rendering function
    ///////////////////////////////////////////////
    const tableCreate = (arr) => {
        arr.forEach((objelem) => {
            let dep = exports.actualData.department[objelem.department - 1].departmentName;
            constants_js_2.tableBody.innerHTML += `
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
    exports.tableCreate = tableCreate;
    // fetching data from firebase and display it into the table
    ///////////////////////////////////////////
    const fillentry = (obj) => {
        (0, exports.tableCreate)(obj.employee);
        // filter skill button script
        obj.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("");
            const skillNum = objelem.skillID;
            constants_js_2.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
        });
        //fill department in data entry modal
        constants_js_2.departmentEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.department.forEach((objelem) => {
            constants_js_2.departmentEntry.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
        });
        // fill role in data entry modal
        constants_js_2.roleEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.role.forEach((objelem) => {
            constants_js_2.roleEntry.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
        });
        //fill skill in skill selection in data entry modal
        constants_js_2.skillSelecEntry.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
        obj.skill.forEach((objelem) => {
            constants_js_2.skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
        });
    };
    //fetching data whole data from firebase
    ////////////////////////////////////////////////
    const fetchData = function (fillentry) {
        fetch(constants_js_2.api + "/.json")
            .then((res) => res.json())
            .then((data) => {
            exports.actualData = data;
            fillentry(data);
        })
            .catch((err) => console.log(err, "error"));
    };
    fetchData(fillentry);
    constants_js_2.table.addEventListener("click", tableActionButton_js_1.handleTableClick);
    //close data-view-modal
    constants_js_2.dataViewClose.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataViewModal.style.display = "none";
    });
    //close data-del-modal
    constants_js_2.cancelDelButton.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataDelModal.style.display = "none";
    });
    //Add employee function
    constants_js_2.addEmployeeButton.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "block";
        constants_js_2.dataEntryModal.style.display = "block";
    });
    constants_js_2.dataEntryClose.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataEntryModal.style.display = "none";
    });
}).apply(__WEBPACK_LOCAL_MODULE_3__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_3__ === undefined && (__WEBPACK_LOCAL_MODULE_3__ = __WEBPACK_LOCAL_MODULE_3__exports));
//filterAndSearch functionality
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_4__ = (function (require, exports, script_js_1, constants_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.clearFilter = exports.RenderFilterBox = exports.changeSkillState = exports.filterTable = exports.FilterArr = void 0;
    exports.FilterArr = [];
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
        const searchvalue = constants_js_3.searchBar.value.toLowerCase();
        // let FilterArr = actualData.employee;
        if (constants_js_3.searchBar.value !== "") {
            exports.FilterArr = exports.FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
        }
        if (checkedFilterArr.length !== 0) {
            exports.FilterArr = exports.FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
        }
        constants_js_3.tableBody.innerHTML = "";
        (0, script_js_1.tableCreate)(exports.FilterArr);
    };
    exports.filterTable = filterTable;
    const changeSkillState = (skillId) => {
        console.log(skillId);
        const temp = document.querySelector(`#${skillId}`);
        temp.click();
        (0, exports.filterTable)();
    };
    exports.changeSkillState = changeSkillState;
    constants_js_3.skillList.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("skill-element")) {
            const dataset = target.dataset.skillId;
            (0, exports.changeSkillState)(dataset);
        }
        if (target.tagName === "INPUT" || target.tagName === "LABEL") {
            const targetClosest = target.closest("div");
            const dataset = targetClosest.dataset.skillId;
            (0, exports.changeSkillState)(dataset);
        }
    });
    const RenderFilterBox = () => {
        let value = constants_js_3.filterSearchBox.value;
        value = value.split(" ").join("").toLowerCase();
        constants_js_3.skillList.innerHTML = "";
        script_js_1.actualData.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("").toLowerCase();
            const skillNum = objelem.skillID;
            if (skillId.includes(value)) {
                constants_js_3.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
        <input  type="checkbox" id="${skillId}" >
        <label for="${skillId}"> ${objelem.skill}</label><br>
    </div>`;
            }
        });
    };
    exports.RenderFilterBox = RenderFilterBox;
    const clearFilter = () => {
        const skill = document.querySelectorAll(".skill-element input");
        skill.forEach((elem) => {
            const elemChecked = elem;
            if (elemChecked.checked) {
                elemChecked.checked = false;
            }
        });
        (0, exports.filterTable)();
    };
    exports.clearFilter = clearFilter;
    constants_js_3.filterSearchBox.addEventListener("input", exports.RenderFilterBox);
    const clearFilterButton = document.querySelector(".clear-filter-button");
    clearFilterButton.addEventListener("click", exports.clearFilter);
    constants_js_3.searchBar.addEventListener("input", exports.filterTable);
}).apply(__WEBPACK_LOCAL_MODULE_4__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_4__ === undefined && (__WEBPACK_LOCAL_MODULE_4__ = __WEBPACK_LOCAL_MODULE_4__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, script_js_2, filterAndSearchFun_js_1, constants_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.sortFun = void 0;
    let dirFlag = 1;
    // sort functionality
    //////////////////////////////////////
    const sortFun = () => {
        let arrayToSort = script_js_2.actualData.employee;
        if (filterAndSearchFun_js_1.FilterArr.length !== 0)
            arrayToSort = filterAndSearchFun_js_1.FilterArr;
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
        constants_js_4.tableBody.innerHTML = "";
        (0, script_js_2.tableCreate)(arrToRender);
        if (dirFlag == 1) {
            constants_js_4.sortButton.src = "../assets/images/down-arrow.svg";
            dirFlag = -1;
        }
        else {
            dirFlag = 1;
            constants_js_4.sortButton.src = "../assets/images/up-arrow.svg";
        }
    };
    exports.sortFun = sortFun;
    constants_js_4.sortButton.addEventListener("click", exports.sortFun);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/filterAndSearchFun.ts":
/*!***********************************!*\
  !*** ./src/filterAndSearchFun.ts ***!
  \***********************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_3__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_4__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.table = exports.dataEntryModal = exports.dataEntryClose = exports.addEmployeeButton = exports.cancelDelButton = exports.dataViewClose = exports.skillSelecEntry = exports.roleEntry = exports.departmentEntry = exports.filterSearchBox = exports.skillList = exports.searchBar = exports.sortButton = exports.tableBody = exports.dataDelModal = exports.dataViewModal = exports.overlay = exports.api = void 0;
    exports.api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    exports.overlay = document.querySelector(".overlay");
    exports.dataViewModal = document.querySelector(".data-view-modal");
    exports.dataDelModal = document.querySelector(".data-del-modal");
    exports.tableBody = document.querySelector(".table-body");
    exports.sortButton = document.querySelector(".sort-button");
    exports.searchBar = document.querySelector(".search-input-box");
    exports.skillList = document.querySelector(".skill-list");
    exports.filterSearchBox = document.querySelector(".filter-search-box");
    exports.departmentEntry = document.querySelector("#dep");
    exports.roleEntry = document.querySelector("#role");
    exports.skillSelecEntry = document.querySelector("#skill");
    exports.dataViewClose = document.querySelector(".data-view-close");
    exports.cancelDelButton = document.querySelector(".cancel-del-button");
    exports.addEmployeeButton = document.querySelector(".add-employee-button");
    exports.dataEntryClose = document.querySelector(".data-entry-close");
    exports.dataEntryModal = document.querySelector(".data-entry-modal");
    exports.table = document.querySelector(".table");
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (require, exports, constants_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.handleTableClick = void 0;
    const handleTableClick = (e) => {
        const target = e.target;
        if (target.classList.contains("view-image-icon")) {
            constants_js_1.overlay.style.display = "block";
            constants_js_1.dataViewModal.style.display = "block";
        }
        if (target.classList.contains("del-image-icon")) {
            console.log("del button clicked");
            constants_js_1.overlay.style.display = "block";
            constants_js_1.dataDelModal.style.display = "block";
        }
    };
    exports.handleTableClick = handleTableClick;
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_3__ = (function (require, exports, tableActionButton_js_1, constants_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.tableCreate = exports.actualData = void 0;
    //general table rendering function
    ///////////////////////////////////////////////
    const tableCreate = (arr) => {
        arr.forEach((objelem) => {
            let dep = exports.actualData.department[objelem.department - 1].departmentName;
            constants_js_2.tableBody.innerHTML += `
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
    exports.tableCreate = tableCreate;
    // fetching data from firebase and display it into the table
    ///////////////////////////////////////////
    const fillentry = (obj) => {
        (0, exports.tableCreate)(obj.employee);
        // filter skill button script
        obj.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("");
            const skillNum = objelem.skillID;
            constants_js_2.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
        });
        //fill department in data entry modal
        constants_js_2.departmentEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.department.forEach((objelem) => {
            constants_js_2.departmentEntry.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
        });
        // fill role in data entry modal
        constants_js_2.roleEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.role.forEach((objelem) => {
            constants_js_2.roleEntry.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
        });
        //fill skill in skill selection in data entry modal
        constants_js_2.skillSelecEntry.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
        obj.skill.forEach((objelem) => {
            constants_js_2.skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
        });
    };
    //fetching data whole data from firebase
    ////////////////////////////////////////////////
    const fetchData = function (fillentry) {
        fetch(constants_js_2.api + "/.json")
            .then((res) => res.json())
            .then((data) => {
            exports.actualData = data;
            fillentry(data);
        })
            .catch((err) => console.log(err, "error"));
    };
    fetchData(fillentry);
    constants_js_2.table.addEventListener("click", tableActionButton_js_1.handleTableClick);
    //close data-view-modal
    constants_js_2.dataViewClose.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataViewModal.style.display = "none";
    });
    //close data-del-modal
    constants_js_2.cancelDelButton.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataDelModal.style.display = "none";
    });
    //Add employee function
    constants_js_2.addEmployeeButton.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "block";
        constants_js_2.dataEntryModal.style.display = "block";
    });
    constants_js_2.dataEntryClose.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataEntryModal.style.display = "none";
    });
}).apply(__WEBPACK_LOCAL_MODULE_3__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_3__ === undefined && (__WEBPACK_LOCAL_MODULE_3__ = __WEBPACK_LOCAL_MODULE_3__exports));
//filterAndSearch functionality
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_4__ = (function (require, exports, script_js_1, constants_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.clearFilter = exports.RenderFilterBox = exports.changeSkillState = exports.filterTable = exports.FilterArr = void 0;
    exports.FilterArr = [];
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
        const searchvalue = constants_js_3.searchBar.value.toLowerCase();
        // let FilterArr = actualData.employee;
        if (constants_js_3.searchBar.value !== "") {
            exports.FilterArr = exports.FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
        }
        if (checkedFilterArr.length !== 0) {
            exports.FilterArr = exports.FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
        }
        constants_js_3.tableBody.innerHTML = "";
        (0, script_js_1.tableCreate)(exports.FilterArr);
    };
    exports.filterTable = filterTable;
    const changeSkillState = (skillId) => {
        console.log(skillId);
        const temp = document.querySelector(`#${skillId}`);
        temp.click();
        (0, exports.filterTable)();
    };
    exports.changeSkillState = changeSkillState;
    constants_js_3.skillList.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("skill-element")) {
            const dataset = target.dataset.skillId;
            (0, exports.changeSkillState)(dataset);
        }
        if (target.tagName === "INPUT" || target.tagName === "LABEL") {
            const targetClosest = target.closest("div");
            const dataset = targetClosest.dataset.skillId;
            (0, exports.changeSkillState)(dataset);
        }
    });
    const RenderFilterBox = () => {
        let value = constants_js_3.filterSearchBox.value;
        value = value.split(" ").join("").toLowerCase();
        constants_js_3.skillList.innerHTML = "";
        script_js_1.actualData.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("").toLowerCase();
            const skillNum = objelem.skillID;
            if (skillId.includes(value)) {
                constants_js_3.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
        <input  type="checkbox" id="${skillId}" >
        <label for="${skillId}"> ${objelem.skill}</label><br>
    </div>`;
            }
        });
    };
    exports.RenderFilterBox = RenderFilterBox;
    const clearFilter = () => {
        const skill = document.querySelectorAll(".skill-element input");
        skill.forEach((elem) => {
            const elemChecked = elem;
            if (elemChecked.checked) {
                elemChecked.checked = false;
            }
        });
        (0, exports.filterTable)();
    };
    exports.clearFilter = clearFilter;
    constants_js_3.filterSearchBox.addEventListener("input", exports.RenderFilterBox);
    const clearFilterButton = document.querySelector(".clear-filter-button");
    clearFilterButton.addEventListener("click", exports.clearFilter);
    constants_js_3.searchBar.addEventListener("input", exports.filterTable);
}).apply(__WEBPACK_LOCAL_MODULE_4__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_4__ === undefined && (__WEBPACK_LOCAL_MODULE_4__ = __WEBPACK_LOCAL_MODULE_4__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, script_js_2, filterAndSearchFun_js_1, constants_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.sortFun = void 0;
    let dirFlag = 1;
    // sort functionality
    //////////////////////////////////////
    const sortFun = () => {
        let arrayToSort = script_js_2.actualData.employee;
        if (filterAndSearchFun_js_1.FilterArr.length !== 0)
            arrayToSort = filterAndSearchFun_js_1.FilterArr;
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
        constants_js_4.tableBody.innerHTML = "";
        (0, script_js_2.tableCreate)(arrToRender);
        if (dirFlag == 1) {
            constants_js_4.sortButton.src = "../assets/images/down-arrow.svg";
            dirFlag = -1;
        }
        else {
            dirFlag = 1;
            constants_js_4.sortButton.src = "../assets/images/up-arrow.svg";
        }
    };
    exports.sortFun = sortFun;
    constants_js_4.sortButton.addEventListener("click", exports.sortFun);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_3__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_4__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.table = exports.dataEntryModal = exports.dataEntryClose = exports.addEmployeeButton = exports.cancelDelButton = exports.dataViewClose = exports.skillSelecEntry = exports.roleEntry = exports.departmentEntry = exports.filterSearchBox = exports.skillList = exports.searchBar = exports.sortButton = exports.tableBody = exports.dataDelModal = exports.dataViewModal = exports.overlay = exports.api = void 0;
    exports.api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    exports.overlay = document.querySelector(".overlay");
    exports.dataViewModal = document.querySelector(".data-view-modal");
    exports.dataDelModal = document.querySelector(".data-del-modal");
    exports.tableBody = document.querySelector(".table-body");
    exports.sortButton = document.querySelector(".sort-button");
    exports.searchBar = document.querySelector(".search-input-box");
    exports.skillList = document.querySelector(".skill-list");
    exports.filterSearchBox = document.querySelector(".filter-search-box");
    exports.departmentEntry = document.querySelector("#dep");
    exports.roleEntry = document.querySelector("#role");
    exports.skillSelecEntry = document.querySelector("#skill");
    exports.dataViewClose = document.querySelector(".data-view-close");
    exports.cancelDelButton = document.querySelector(".cancel-del-button");
    exports.addEmployeeButton = document.querySelector(".add-employee-button");
    exports.dataEntryClose = document.querySelector(".data-entry-close");
    exports.dataEntryModal = document.querySelector(".data-entry-modal");
    exports.table = document.querySelector(".table");
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (require, exports, constants_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.handleTableClick = void 0;
    const handleTableClick = (e) => {
        const target = e.target;
        if (target.classList.contains("view-image-icon")) {
            constants_js_1.overlay.style.display = "block";
            constants_js_1.dataViewModal.style.display = "block";
        }
        if (target.classList.contains("del-image-icon")) {
            console.log("del button clicked");
            constants_js_1.overlay.style.display = "block";
            constants_js_1.dataDelModal.style.display = "block";
        }
    };
    exports.handleTableClick = handleTableClick;
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_3__ = (function (require, exports, tableActionButton_js_1, constants_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.tableCreate = exports.actualData = void 0;
    //general table rendering function
    ///////////////////////////////////////////////
    const tableCreate = (arr) => {
        arr.forEach((objelem) => {
            let dep = exports.actualData.department[objelem.department - 1].departmentName;
            constants_js_2.tableBody.innerHTML += `
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
    exports.tableCreate = tableCreate;
    // fetching data from firebase and display it into the table
    ///////////////////////////////////////////
    const fillentry = (obj) => {
        (0, exports.tableCreate)(obj.employee);
        // filter skill button script
        obj.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("");
            const skillNum = objelem.skillID;
            constants_js_2.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
        });
        //fill department in data entry modal
        constants_js_2.departmentEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.department.forEach((objelem) => {
            constants_js_2.departmentEntry.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
        });
        // fill role in data entry modal
        constants_js_2.roleEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.role.forEach((objelem) => {
            constants_js_2.roleEntry.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
        });
        //fill skill in skill selection in data entry modal
        constants_js_2.skillSelecEntry.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
        obj.skill.forEach((objelem) => {
            constants_js_2.skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
        });
    };
    //fetching data whole data from firebase
    ////////////////////////////////////////////////
    const fetchData = function (fillentry) {
        fetch(constants_js_2.api + "/.json")
            .then((res) => res.json())
            .then((data) => {
            exports.actualData = data;
            fillentry(data);
        })
            .catch((err) => console.log(err, "error"));
    };
    fetchData(fillentry);
    constants_js_2.table.addEventListener("click", tableActionButton_js_1.handleTableClick);
    //close data-view-modal
    constants_js_2.dataViewClose.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataViewModal.style.display = "none";
    });
    //close data-del-modal
    constants_js_2.cancelDelButton.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataDelModal.style.display = "none";
    });
    //Add employee function
    constants_js_2.addEmployeeButton.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "block";
        constants_js_2.dataEntryModal.style.display = "block";
    });
    constants_js_2.dataEntryClose.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataEntryModal.style.display = "none";
    });
}).apply(__WEBPACK_LOCAL_MODULE_3__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_3__ === undefined && (__WEBPACK_LOCAL_MODULE_3__ = __WEBPACK_LOCAL_MODULE_3__exports));
//filterAndSearch functionality
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_4__ = (function (require, exports, script_js_1, constants_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.clearFilter = exports.RenderFilterBox = exports.changeSkillState = exports.filterTable = exports.FilterArr = void 0;
    exports.FilterArr = [];
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
        const searchvalue = constants_js_3.searchBar.value.toLowerCase();
        // let FilterArr = actualData.employee;
        if (constants_js_3.searchBar.value !== "") {
            exports.FilterArr = exports.FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
        }
        if (checkedFilterArr.length !== 0) {
            exports.FilterArr = exports.FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
        }
        constants_js_3.tableBody.innerHTML = "";
        (0, script_js_1.tableCreate)(exports.FilterArr);
    };
    exports.filterTable = filterTable;
    const changeSkillState = (skillId) => {
        console.log(skillId);
        const temp = document.querySelector(`#${skillId}`);
        temp.click();
        (0, exports.filterTable)();
    };
    exports.changeSkillState = changeSkillState;
    constants_js_3.skillList.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("skill-element")) {
            const dataset = target.dataset.skillId;
            (0, exports.changeSkillState)(dataset);
        }
        if (target.tagName === "INPUT" || target.tagName === "LABEL") {
            const targetClosest = target.closest("div");
            const dataset = targetClosest.dataset.skillId;
            (0, exports.changeSkillState)(dataset);
        }
    });
    const RenderFilterBox = () => {
        let value = constants_js_3.filterSearchBox.value;
        value = value.split(" ").join("").toLowerCase();
        constants_js_3.skillList.innerHTML = "";
        script_js_1.actualData.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("").toLowerCase();
            const skillNum = objelem.skillID;
            if (skillId.includes(value)) {
                constants_js_3.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
        <input  type="checkbox" id="${skillId}" >
        <label for="${skillId}"> ${objelem.skill}</label><br>
    </div>`;
            }
        });
    };
    exports.RenderFilterBox = RenderFilterBox;
    const clearFilter = () => {
        const skill = document.querySelectorAll(".skill-element input");
        skill.forEach((elem) => {
            const elemChecked = elem;
            if (elemChecked.checked) {
                elemChecked.checked = false;
            }
        });
        (0, exports.filterTable)();
    };
    exports.clearFilter = clearFilter;
    constants_js_3.filterSearchBox.addEventListener("input", exports.RenderFilterBox);
    const clearFilterButton = document.querySelector(".clear-filter-button");
    clearFilterButton.addEventListener("click", exports.clearFilter);
    constants_js_3.searchBar.addEventListener("input", exports.filterTable);
}).apply(__WEBPACK_LOCAL_MODULE_4__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_4__ === undefined && (__WEBPACK_LOCAL_MODULE_4__ = __WEBPACK_LOCAL_MODULE_4__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, script_js_2, filterAndSearchFun_js_1, constants_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.sortFun = void 0;
    let dirFlag = 1;
    // sort functionality
    //////////////////////////////////////
    const sortFun = () => {
        let arrayToSort = script_js_2.actualData.employee;
        if (filterAndSearchFun_js_1.FilterArr.length !== 0)
            arrayToSort = filterAndSearchFun_js_1.FilterArr;
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
        constants_js_4.tableBody.innerHTML = "";
        (0, script_js_2.tableCreate)(arrToRender);
        if (dirFlag == 1) {
            constants_js_4.sortButton.src = "../assets/images/down-arrow.svg";
            dirFlag = -1;
        }
        else {
            dirFlag = 1;
            constants_js_4.sortButton.src = "../assets/images/up-arrow.svg";
        }
    };
    exports.sortFun = sortFun;
    constants_js_4.sortButton.addEventListener("click", exports.sortFun);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/tableActionButton.ts":
/*!**********************************!*\
  !*** ./src/tableActionButton.ts ***!
  \**********************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_3__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_4__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.table = exports.dataEntryModal = exports.dataEntryClose = exports.addEmployeeButton = exports.cancelDelButton = exports.dataViewClose = exports.skillSelecEntry = exports.roleEntry = exports.departmentEntry = exports.filterSearchBox = exports.skillList = exports.searchBar = exports.sortButton = exports.tableBody = exports.dataDelModal = exports.dataViewModal = exports.overlay = exports.api = void 0;
    exports.api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    exports.overlay = document.querySelector(".overlay");
    exports.dataViewModal = document.querySelector(".data-view-modal");
    exports.dataDelModal = document.querySelector(".data-del-modal");
    exports.tableBody = document.querySelector(".table-body");
    exports.sortButton = document.querySelector(".sort-button");
    exports.searchBar = document.querySelector(".search-input-box");
    exports.skillList = document.querySelector(".skill-list");
    exports.filterSearchBox = document.querySelector(".filter-search-box");
    exports.departmentEntry = document.querySelector("#dep");
    exports.roleEntry = document.querySelector("#role");
    exports.skillSelecEntry = document.querySelector("#skill");
    exports.dataViewClose = document.querySelector(".data-view-close");
    exports.cancelDelButton = document.querySelector(".cancel-del-button");
    exports.addEmployeeButton = document.querySelector(".add-employee-button");
    exports.dataEntryClose = document.querySelector(".data-entry-close");
    exports.dataEntryModal = document.querySelector(".data-entry-modal");
    exports.table = document.querySelector(".table");
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (require, exports, constants_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.handleTableClick = void 0;
    const handleTableClick = (e) => {
        const target = e.target;
        if (target.classList.contains("view-image-icon")) {
            constants_js_1.overlay.style.display = "block";
            constants_js_1.dataViewModal.style.display = "block";
        }
        if (target.classList.contains("del-image-icon")) {
            console.log("del button clicked");
            constants_js_1.overlay.style.display = "block";
            constants_js_1.dataDelModal.style.display = "block";
        }
    };
    exports.handleTableClick = handleTableClick;
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_3__ = (function (require, exports, tableActionButton_js_1, constants_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.tableCreate = exports.actualData = void 0;
    //general table rendering function
    ///////////////////////////////////////////////
    const tableCreate = (arr) => {
        arr.forEach((objelem) => {
            let dep = exports.actualData.department[objelem.department - 1].departmentName;
            constants_js_2.tableBody.innerHTML += `
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
    exports.tableCreate = tableCreate;
    // fetching data from firebase and display it into the table
    ///////////////////////////////////////////
    const fillentry = (obj) => {
        (0, exports.tableCreate)(obj.employee);
        // filter skill button script
        obj.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("");
            const skillNum = objelem.skillID;
            constants_js_2.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
        });
        //fill department in data entry modal
        constants_js_2.departmentEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.department.forEach((objelem) => {
            constants_js_2.departmentEntry.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
        });
        // fill role in data entry modal
        constants_js_2.roleEntry.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.role.forEach((objelem) => {
            constants_js_2.roleEntry.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
        });
        //fill skill in skill selection in data entry modal
        constants_js_2.skillSelecEntry.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
        obj.skill.forEach((objelem) => {
            constants_js_2.skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
        });
    };
    //fetching data whole data from firebase
    ////////////////////////////////////////////////
    const fetchData = function (fillentry) {
        fetch(constants_js_2.api + "/.json")
            .then((res) => res.json())
            .then((data) => {
            exports.actualData = data;
            fillentry(data);
        })
            .catch((err) => console.log(err, "error"));
    };
    fetchData(fillentry);
    constants_js_2.table.addEventListener("click", tableActionButton_js_1.handleTableClick);
    //close data-view-modal
    constants_js_2.dataViewClose.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataViewModal.style.display = "none";
    });
    //close data-del-modal
    constants_js_2.cancelDelButton.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataDelModal.style.display = "none";
    });
    //Add employee function
    constants_js_2.addEmployeeButton.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "block";
        constants_js_2.dataEntryModal.style.display = "block";
    });
    constants_js_2.dataEntryClose.addEventListener("click", () => {
        constants_js_2.overlay.style.display = "none";
        constants_js_2.dataEntryModal.style.display = "none";
    });
}).apply(__WEBPACK_LOCAL_MODULE_3__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_3__ === undefined && (__WEBPACK_LOCAL_MODULE_3__ = __WEBPACK_LOCAL_MODULE_3__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_4__ = (function (require, exports, script_js_1, constants_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.clearFilter = exports.RenderFilterBox = exports.changeSkillState = exports.filterTable = exports.FilterArr = void 0;
    exports.FilterArr = script_js_1.actualData.employee;
    // export let FilterArr = [];
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
        const searchvalue = constants_js_3.searchBar.value.toLowerCase();
        // let FilterArr = actualData.employee;
        if (constants_js_3.searchBar.value !== "") {
            exports.FilterArr = exports.FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
        }
        if (checkedFilterArr.length !== 0) {
            exports.FilterArr = exports.FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
        }
        constants_js_3.tableBody.innerHTML = "";
        (0, script_js_1.tableCreate)(exports.FilterArr);
    };
    exports.filterTable = filterTable;
    const changeSkillState = (skillId) => {
        console.log(skillId);
        const temp = document.querySelector(`#${skillId}`);
        temp.click();
        (0, exports.filterTable)();
    };
    exports.changeSkillState = changeSkillState;
    constants_js_3.skillList.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("skill-element")) {
            const dataset = target.dataset.skillId;
            (0, exports.changeSkillState)(dataset);
        }
        if (target.tagName === "INPUT" || target.tagName === "LABEL") {
            const targetClosest = target.closest("div");
            const dataset = targetClosest.dataset.skillId;
            (0, exports.changeSkillState)(dataset);
        }
    });
    const RenderFilterBox = () => {
        let value = constants_js_3.filterSearchBox.value;
        value = value.split(" ").join("").toLowerCase();
        constants_js_3.skillList.innerHTML = "";
        script_js_1.actualData.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("").toLowerCase();
            const skillNum = objelem.skillID;
            if (skillId.includes(value)) {
                constants_js_3.skillList.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
        <input  type="checkbox" id="${skillId}" >
        <label for="${skillId}"> ${objelem.skill}</label><br>
    </div>`;
            }
        });
    };
    exports.RenderFilterBox = RenderFilterBox;
    const clearFilter = () => {
        const skill = document.querySelectorAll(".skill-element input");
        skill.forEach((elem) => {
            const elemChecked = elem;
            if (elemChecked.checked) {
                elemChecked.checked = false;
            }
        });
        (0, exports.filterTable)();
    };
    exports.clearFilter = clearFilter;
    constants_js_3.filterSearchBox.addEventListener("input", exports.RenderFilterBox);
    const clearFilterButton = document.querySelector(".clear-filter-button");
    clearFilterButton.addEventListener("click", exports.clearFilter);
    constants_js_3.searchBar.addEventListener("input", exports.filterTable);
}).apply(__WEBPACK_LOCAL_MODULE_4__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_4__ === undefined && (__WEBPACK_LOCAL_MODULE_4__ = __WEBPACK_LOCAL_MODULE_4__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, script_js_2, filterAndSearchFun_js_1, constants_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.sortFun = void 0;
    let dirFlag = 1;
    // sort functionality
    //////////////////////////////////////
    const sortFun = () => {
        let arrayToSort = script_js_2.actualData.employee;
        if (filterAndSearchFun_js_1.FilterArr.length !== 0)
            arrayToSort = filterAndSearchFun_js_1.FilterArr;
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
        constants_js_4.tableBody.innerHTML = "";
        (0, script_js_2.tableCreate)(arrToRender);
        if (dirFlag == 1) {
            constants_js_4.sortButton.src = "../assets/images/down-arrow.svg";
            dirFlag = -1;
        }
        else {
            dirFlag = 1;
            constants_js_4.sortButton.src = "../assets/images/up-arrow.svg";
        }
    };
    exports.sortFun = sortFun;
    constants_js_4.sortButton.addEventListener("click", exports.sortFun);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/filterAndSearchFun.ts");
/******/ 	__webpack_require__("./src/script.ts");
/******/ 	__webpack_require__("./src/SortFun.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/tableActionButton.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBLGtHQUFDOzs7Ozs7O1VDM1BGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvU29ydEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvZmlsdGVyQW5kU2VhcmNoRnVuLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy9zY3JpcHQudHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFwiY29uc3RhbnRzXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlID0gZXhwb3J0cy5kYXRhRW50cnlNb2RhbCA9IGV4cG9ydHMuZGF0YUVudHJ5Q2xvc2UgPSBleHBvcnRzLmFkZEVtcGxveWVlQnV0dG9uID0gZXhwb3J0cy5jYW5jZWxEZWxCdXR0b24gPSBleHBvcnRzLmRhdGFWaWV3Q2xvc2UgPSBleHBvcnRzLnNraWxsU2VsZWNFbnRyeSA9IGV4cG9ydHMucm9sZUVudHJ5ID0gZXhwb3J0cy5kZXBhcnRtZW50RW50cnkgPSBleHBvcnRzLmZpbHRlclNlYXJjaEJveCA9IGV4cG9ydHMuc2tpbGxMaXN0ID0gZXhwb3J0cy5zZWFyY2hCYXIgPSBleHBvcnRzLnNvcnRCdXR0b24gPSBleHBvcnRzLnRhYmxlQm9keSA9IGV4cG9ydHMuZGF0YURlbE1vZGFsID0gZXhwb3J0cy5kYXRhVmlld01vZGFsID0gZXhwb3J0cy5vdmVybGF5ID0gZXhwb3J0cy5hcGkgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5hcGkgPSBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCI7XG4gICAgZXhwb3J0cy5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgIGV4cG9ydHMuZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuICAgIGV4cG9ydHMuZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbiAgICBleHBvcnRzLnRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbiAgICBleHBvcnRzLnNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuICAgIGV4cG9ydHMuc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuICAgIGV4cG9ydHMuc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgIGV4cG9ydHMuZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbiAgICBleHBvcnRzLmRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuICAgIGV4cG9ydHMucm9sZUVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuICAgIGV4cG9ydHMuc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbiAgICBleHBvcnRzLmRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbiAgICBleHBvcnRzLmNhbmNlbERlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLWRlbC1idXR0b25cIik7XG4gICAgZXhwb3J0cy5hZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbiAgICBleHBvcnRzLmRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuICAgIGV4cG9ydHMuZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG4gICAgZXhwb3J0cy50YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG59KTtcbmRlZmluZShcInRhYmxlQWN0aW9uQnV0dG9uXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiY29uc3RhbnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgY29uc3RhbnRzX2pzXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5oYW5kbGVUYWJsZUNsaWNrID0gdm9pZCAwO1xuICAgIGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aWV3LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLmRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbCBidXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLmRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLmhhbmRsZVRhYmxlQ2xpY2sgPSBoYW5kbGVUYWJsZUNsaWNrO1xufSk7XG5kZWZpbmUoXCJ0eXBlXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbn0pO1xuZGVmaW5lKFwic2NyaXB0XCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwidGFibGVBY3Rpb25CdXR0b25cIiwgXCJjb25zdGFudHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCB0YWJsZUFjdGlvbkJ1dHRvbl9qc18xLCBjb25zdGFudHNfanNfMikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlQ3JlYXRlID0gZXhwb3J0cy5hY3R1YWxEYXRhID0gdm9pZCAwO1xuICAgIC8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgICAgICBhcnIuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlcCA9IGV4cG9ydHMuYWN0dWFsRGF0YS5kZXBhcnRtZW50W29iamVsZW0uZGVwYXJ0bWVudCAtIDFdLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzIudGFibGVCb2R5LmlubmVySFRNTCArPSBgXG4gICAgPHRyIGNsYXNzPVwiZGF0YS1yb3dcIj5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5pZH08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmZ1bGxOYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZW1haWx9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGVwfTwvdGQ+XG4gICAgICAgIDx0ZCBpZD1cImFjdGlvbi1idXR0b24tY2VsbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0+PGltZyBjbGFzcz1cInZpZXctaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvdmlldy1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwidmlldyBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2VkaXQtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkVkaXQgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZGVsLWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICBgO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGV4cG9ydHMudGFibGVDcmVhdGUgPSB0YWJsZUNyZWF0ZTtcbiAgICAvLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgZmlsbGVudHJ5ID0gKG9iaikgPT4ge1xuICAgICAgICAoMCwgZXhwb3J0cy50YWJsZUNyZWF0ZSkob2JqLmVtcGxveWVlKTtcbiAgICAgICAgLy8gZmlsdGVyIHNraWxsIGJ1dHRvbiBzY3JpcHRcbiAgICAgICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgICAgICBjb25zdGFudHNfanNfMi5za2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9maWxsIGRlcGFydG1lbnQgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBjb25zdGFudHNfanNfMi5kZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgICAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdGFudHNfanNfMi5kZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX1cIj4ke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgICAgIGNvbnN0YW50c19qc18yLnJvbGVFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18yLnJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBjb25zdGFudHNfanNfMi5za2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgICAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzIuc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGZ1bmN0aW9uIChmaWxsZW50cnkpIHtcbiAgICAgICAgZmV0Y2goY29uc3RhbnRzX2pzXzIuYXBpICsgXCIvLmpzb25cIilcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZXhwb3J0cy5hY3R1YWxEYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xuICAgIH07XG4gICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgY29uc3RhbnRzX2pzXzIudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhYmxlQWN0aW9uQnV0dG9uX2pzXzEuaGFuZGxlVGFibGVDbGljayk7XG4gICAgLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbiAgICBjb25zdGFudHNfanNfMi5kYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbiAgICAvL2Nsb3NlIGRhdGEtZGVsLW1vZGFsXG4gICAgY29uc3RhbnRzX2pzXzIuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICAgIC8vQWRkIGVtcGxveWVlIGZ1bmN0aW9uXG4gICAgY29uc3RhbnRzX2pzXzIuYWRkRW1wbG95ZWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3RhbnRzX2pzXzIub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuICAgIGNvbnN0YW50c19qc18yLmRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG59KTtcbi8vZmlsdGVyQW5kU2VhcmNoIGZ1bmN0aW9uYWxpdHlcbmRlZmluZShcImZpbHRlckFuZFNlYXJjaEZ1blwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInNjcmlwdFwiLCBcImNvbnN0YW50c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHNjcmlwdF9qc18xLCBjb25zdGFudHNfanNfMykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmNsZWFyRmlsdGVyID0gZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBleHBvcnRzLmZpbHRlclRhYmxlID0gZXhwb3J0cy5GaWx0ZXJBcnIgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBbXTtcbiAgICBjb25zdCBmaWx0ZXJUYWJsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudFwiKTtcbiAgICAgICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtO1xuICAgICAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICAgICAgaWYgKHRyaWFsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZWxlbWVudC5kYXRhc2V0LnNraWxsTnVtO1xuICAgICAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gY29uc3RhbnRzX2pzXzMuc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIC8vIGxldCBGaWx0ZXJBcnIgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgICAgICBpZiAoY29uc3RhbnRzX2pzXzMuc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBleHBvcnRzLkZpbHRlckFyciA9IGV4cG9ydHMuRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5mdWxsTmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2h2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja2VkRmlsdGVyQXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBleHBvcnRzLkZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3RhbnRzX2pzXzMudGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICgwLCBzY3JpcHRfanNfMS50YWJsZUNyZWF0ZSkoZXhwb3J0cy5GaWx0ZXJBcnIpO1xuICAgIH07XG4gICAgZXhwb3J0cy5maWx0ZXJUYWJsZSA9IGZpbHRlclRhYmxlO1xuICAgIGNvbnN0IGNoYW5nZVNraWxsU3RhdGUgPSAoc2tpbGxJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhza2lsbElkKTtcbiAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgICAgIHRlbXAuY2xpY2soKTtcbiAgICAgICAgKDAsIGV4cG9ydHMuZmlsdGVyVGFibGUpKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBjaGFuZ2VTa2lsbFN0YXRlO1xuICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlKShkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IFwiSU5QVVRcIiB8fCB0YXJnZXQudGFnTmFtZSA9PT0gXCJMQUJFTFwiKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0Q2xvc2VzdC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlKShkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFJlbmRlckZpbHRlckJveCA9ICgpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gY29uc3RhbnRzX2pzXzMuZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBzY3JpcHRfanNfMS5hY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgICAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuICAgIDwvZGl2PmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBSZW5kZXJGaWx0ZXJCb3g7XG4gICAgY29uc3QgY2xlYXJGaWx0ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50IGlucHV0XCIpO1xuICAgICAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtQ2hlY2tlZCA9IGVsZW07XG4gICAgICAgICAgICBpZiAoZWxlbUNoZWNrZWQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICgwLCBleHBvcnRzLmZpbHRlclRhYmxlKSgpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jbGVhckZpbHRlciA9IGNsZWFyRmlsdGVyO1xuICAgIGNvbnN0YW50c19qc18zLmZpbHRlclNlYXJjaEJveC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3gpO1xuICAgIGNvbnN0IGNsZWFyRmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGVhci1maWx0ZXItYnV0dG9uXCIpO1xuICAgIGNsZWFyRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBvcnRzLmNsZWFyRmlsdGVyKTtcbiAgICBjb25zdGFudHNfanNfMy5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGV4cG9ydHMuZmlsdGVyVGFibGUpO1xufSk7XG5kZWZpbmUoXCJTb3J0RnVuXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwic2NyaXB0XCIsIFwiZmlsdGVyQW5kU2VhcmNoRnVuXCIsIFwiY29uc3RhbnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgc2NyaXB0X2pzXzIsIGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLCBjb25zdGFudHNfanNfNCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnNvcnRGdW4gPSB2b2lkIDA7XG4gICAgbGV0IGRpckZsYWcgPSAxO1xuICAgIC8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3Qgc29ydEZ1biA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFycmF5VG9Tb3J0ID0gc2NyaXB0X2pzXzIuYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICAgICAgaWYgKGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLkZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgICAgICBhcnJheVRvU29ydCA9IGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLkZpbHRlckFycjtcbiAgICAgICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lMiA9IGIuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICAgICAgY29tcGFyaXNvbiA9IDEgKiBkaXJGbGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgICAgIGNvbXBhcmlzb24gPSAtMSAqIGRpckZsYWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0YW50c19qc180LnRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAoMCwgc2NyaXB0X2pzXzIudGFibGVDcmVhdGUpKGFyclRvUmVuZGVyKTtcbiAgICAgICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvZG93bi1hcnJvdy5zdmdcIjtcbiAgICAgICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvdXAtYXJyb3cuc3ZnXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydHMuc29ydEZ1biA9IHNvcnRGdW47XG4gICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXhwb3J0cy5zb3J0RnVuKTtcbn0pO1xuIiwiZGVmaW5lKFwiY29uc3RhbnRzXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlID0gZXhwb3J0cy5kYXRhRW50cnlNb2RhbCA9IGV4cG9ydHMuZGF0YUVudHJ5Q2xvc2UgPSBleHBvcnRzLmFkZEVtcGxveWVlQnV0dG9uID0gZXhwb3J0cy5jYW5jZWxEZWxCdXR0b24gPSBleHBvcnRzLmRhdGFWaWV3Q2xvc2UgPSBleHBvcnRzLnNraWxsU2VsZWNFbnRyeSA9IGV4cG9ydHMucm9sZUVudHJ5ID0gZXhwb3J0cy5kZXBhcnRtZW50RW50cnkgPSBleHBvcnRzLmZpbHRlclNlYXJjaEJveCA9IGV4cG9ydHMuc2tpbGxMaXN0ID0gZXhwb3J0cy5zZWFyY2hCYXIgPSBleHBvcnRzLnNvcnRCdXR0b24gPSBleHBvcnRzLnRhYmxlQm9keSA9IGV4cG9ydHMuZGF0YURlbE1vZGFsID0gZXhwb3J0cy5kYXRhVmlld01vZGFsID0gZXhwb3J0cy5vdmVybGF5ID0gZXhwb3J0cy5hcGkgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5hcGkgPSBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCI7XG4gICAgZXhwb3J0cy5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgIGV4cG9ydHMuZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuICAgIGV4cG9ydHMuZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbiAgICBleHBvcnRzLnRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbiAgICBleHBvcnRzLnNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuICAgIGV4cG9ydHMuc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuICAgIGV4cG9ydHMuc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgIGV4cG9ydHMuZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbiAgICBleHBvcnRzLmRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuICAgIGV4cG9ydHMucm9sZUVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuICAgIGV4cG9ydHMuc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbiAgICBleHBvcnRzLmRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbiAgICBleHBvcnRzLmNhbmNlbERlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLWRlbC1idXR0b25cIik7XG4gICAgZXhwb3J0cy5hZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbiAgICBleHBvcnRzLmRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuICAgIGV4cG9ydHMuZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG4gICAgZXhwb3J0cy50YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG59KTtcbmRlZmluZShcInRhYmxlQWN0aW9uQnV0dG9uXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiY29uc3RhbnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgY29uc3RhbnRzX2pzXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5oYW5kbGVUYWJsZUNsaWNrID0gdm9pZCAwO1xuICAgIGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aWV3LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLmRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbCBidXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLmRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLmhhbmRsZVRhYmxlQ2xpY2sgPSBoYW5kbGVUYWJsZUNsaWNrO1xufSk7XG5kZWZpbmUoXCJ0eXBlXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbn0pO1xuZGVmaW5lKFwic2NyaXB0XCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwidGFibGVBY3Rpb25CdXR0b25cIiwgXCJjb25zdGFudHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCB0YWJsZUFjdGlvbkJ1dHRvbl9qc18xLCBjb25zdGFudHNfanNfMikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlQ3JlYXRlID0gZXhwb3J0cy5hY3R1YWxEYXRhID0gdm9pZCAwO1xuICAgIC8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgICAgICBhcnIuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlcCA9IGV4cG9ydHMuYWN0dWFsRGF0YS5kZXBhcnRtZW50W29iamVsZW0uZGVwYXJ0bWVudCAtIDFdLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzIudGFibGVCb2R5LmlubmVySFRNTCArPSBgXG4gICAgPHRyIGNsYXNzPVwiZGF0YS1yb3dcIj5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5pZH08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmZ1bGxOYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZW1haWx9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGVwfTwvdGQ+XG4gICAgICAgIDx0ZCBpZD1cImFjdGlvbi1idXR0b24tY2VsbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0+PGltZyBjbGFzcz1cInZpZXctaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvdmlldy1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwidmlldyBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2VkaXQtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkVkaXQgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZGVsLWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICBgO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGV4cG9ydHMudGFibGVDcmVhdGUgPSB0YWJsZUNyZWF0ZTtcbiAgICAvLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgZmlsbGVudHJ5ID0gKG9iaikgPT4ge1xuICAgICAgICAoMCwgZXhwb3J0cy50YWJsZUNyZWF0ZSkob2JqLmVtcGxveWVlKTtcbiAgICAgICAgLy8gZmlsdGVyIHNraWxsIGJ1dHRvbiBzY3JpcHRcbiAgICAgICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgICAgICBjb25zdGFudHNfanNfMi5za2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9maWxsIGRlcGFydG1lbnQgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBjb25zdGFudHNfanNfMi5kZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgICAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdGFudHNfanNfMi5kZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX1cIj4ke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgICAgIGNvbnN0YW50c19qc18yLnJvbGVFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18yLnJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBjb25zdGFudHNfanNfMi5za2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgICAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzIuc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGZ1bmN0aW9uIChmaWxsZW50cnkpIHtcbiAgICAgICAgZmV0Y2goY29uc3RhbnRzX2pzXzIuYXBpICsgXCIvLmpzb25cIilcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZXhwb3J0cy5hY3R1YWxEYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xuICAgIH07XG4gICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgY29uc3RhbnRzX2pzXzIudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhYmxlQWN0aW9uQnV0dG9uX2pzXzEuaGFuZGxlVGFibGVDbGljayk7XG4gICAgLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbiAgICBjb25zdGFudHNfanNfMi5kYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbiAgICAvL2Nsb3NlIGRhdGEtZGVsLW1vZGFsXG4gICAgY29uc3RhbnRzX2pzXzIuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICAgIC8vQWRkIGVtcGxveWVlIGZ1bmN0aW9uXG4gICAgY29uc3RhbnRzX2pzXzIuYWRkRW1wbG95ZWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3RhbnRzX2pzXzIub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuICAgIGNvbnN0YW50c19qc18yLmRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG59KTtcbi8vZmlsdGVyQW5kU2VhcmNoIGZ1bmN0aW9uYWxpdHlcbmRlZmluZShcImZpbHRlckFuZFNlYXJjaEZ1blwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInNjcmlwdFwiLCBcImNvbnN0YW50c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHNjcmlwdF9qc18xLCBjb25zdGFudHNfanNfMykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmNsZWFyRmlsdGVyID0gZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBleHBvcnRzLmZpbHRlclRhYmxlID0gZXhwb3J0cy5GaWx0ZXJBcnIgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBbXTtcbiAgICBjb25zdCBmaWx0ZXJUYWJsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudFwiKTtcbiAgICAgICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtO1xuICAgICAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICAgICAgaWYgKHRyaWFsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZWxlbWVudC5kYXRhc2V0LnNraWxsTnVtO1xuICAgICAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gY29uc3RhbnRzX2pzXzMuc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIC8vIGxldCBGaWx0ZXJBcnIgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgICAgICBpZiAoY29uc3RhbnRzX2pzXzMuc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBleHBvcnRzLkZpbHRlckFyciA9IGV4cG9ydHMuRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5mdWxsTmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2h2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja2VkRmlsdGVyQXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBleHBvcnRzLkZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3RhbnRzX2pzXzMudGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICgwLCBzY3JpcHRfanNfMS50YWJsZUNyZWF0ZSkoZXhwb3J0cy5GaWx0ZXJBcnIpO1xuICAgIH07XG4gICAgZXhwb3J0cy5maWx0ZXJUYWJsZSA9IGZpbHRlclRhYmxlO1xuICAgIGNvbnN0IGNoYW5nZVNraWxsU3RhdGUgPSAoc2tpbGxJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhza2lsbElkKTtcbiAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgICAgIHRlbXAuY2xpY2soKTtcbiAgICAgICAgKDAsIGV4cG9ydHMuZmlsdGVyVGFibGUpKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBjaGFuZ2VTa2lsbFN0YXRlO1xuICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlKShkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IFwiSU5QVVRcIiB8fCB0YXJnZXQudGFnTmFtZSA9PT0gXCJMQUJFTFwiKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0Q2xvc2VzdC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlKShkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFJlbmRlckZpbHRlckJveCA9ICgpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gY29uc3RhbnRzX2pzXzMuZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBzY3JpcHRfanNfMS5hY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgICAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuICAgIDwvZGl2PmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBSZW5kZXJGaWx0ZXJCb3g7XG4gICAgY29uc3QgY2xlYXJGaWx0ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50IGlucHV0XCIpO1xuICAgICAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtQ2hlY2tlZCA9IGVsZW07XG4gICAgICAgICAgICBpZiAoZWxlbUNoZWNrZWQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICgwLCBleHBvcnRzLmZpbHRlclRhYmxlKSgpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jbGVhckZpbHRlciA9IGNsZWFyRmlsdGVyO1xuICAgIGNvbnN0YW50c19qc18zLmZpbHRlclNlYXJjaEJveC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3gpO1xuICAgIGNvbnN0IGNsZWFyRmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGVhci1maWx0ZXItYnV0dG9uXCIpO1xuICAgIGNsZWFyRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBvcnRzLmNsZWFyRmlsdGVyKTtcbiAgICBjb25zdGFudHNfanNfMy5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGV4cG9ydHMuZmlsdGVyVGFibGUpO1xufSk7XG5kZWZpbmUoXCJTb3J0RnVuXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwic2NyaXB0XCIsIFwiZmlsdGVyQW5kU2VhcmNoRnVuXCIsIFwiY29uc3RhbnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgc2NyaXB0X2pzXzIsIGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLCBjb25zdGFudHNfanNfNCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnNvcnRGdW4gPSB2b2lkIDA7XG4gICAgbGV0IGRpckZsYWcgPSAxO1xuICAgIC8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3Qgc29ydEZ1biA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFycmF5VG9Tb3J0ID0gc2NyaXB0X2pzXzIuYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICAgICAgaWYgKGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLkZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgICAgICBhcnJheVRvU29ydCA9IGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLkZpbHRlckFycjtcbiAgICAgICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lMiA9IGIuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICAgICAgY29tcGFyaXNvbiA9IDEgKiBkaXJGbGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgICAgIGNvbXBhcmlzb24gPSAtMSAqIGRpckZsYWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0YW50c19qc180LnRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAoMCwgc2NyaXB0X2pzXzIudGFibGVDcmVhdGUpKGFyclRvUmVuZGVyKTtcbiAgICAgICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvZG93bi1hcnJvdy5zdmdcIjtcbiAgICAgICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvdXAtYXJyb3cuc3ZnXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydHMuc29ydEZ1biA9IHNvcnRGdW47XG4gICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXhwb3J0cy5zb3J0RnVuKTtcbn0pO1xuIiwiZGVmaW5lKFwiY29uc3RhbnRzXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlID0gZXhwb3J0cy5kYXRhRW50cnlNb2RhbCA9IGV4cG9ydHMuZGF0YUVudHJ5Q2xvc2UgPSBleHBvcnRzLmFkZEVtcGxveWVlQnV0dG9uID0gZXhwb3J0cy5jYW5jZWxEZWxCdXR0b24gPSBleHBvcnRzLmRhdGFWaWV3Q2xvc2UgPSBleHBvcnRzLnNraWxsU2VsZWNFbnRyeSA9IGV4cG9ydHMucm9sZUVudHJ5ID0gZXhwb3J0cy5kZXBhcnRtZW50RW50cnkgPSBleHBvcnRzLmZpbHRlclNlYXJjaEJveCA9IGV4cG9ydHMuc2tpbGxMaXN0ID0gZXhwb3J0cy5zZWFyY2hCYXIgPSBleHBvcnRzLnNvcnRCdXR0b24gPSBleHBvcnRzLnRhYmxlQm9keSA9IGV4cG9ydHMuZGF0YURlbE1vZGFsID0gZXhwb3J0cy5kYXRhVmlld01vZGFsID0gZXhwb3J0cy5vdmVybGF5ID0gZXhwb3J0cy5hcGkgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5hcGkgPSBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCI7XG4gICAgZXhwb3J0cy5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgIGV4cG9ydHMuZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuICAgIGV4cG9ydHMuZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbiAgICBleHBvcnRzLnRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbiAgICBleHBvcnRzLnNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuICAgIGV4cG9ydHMuc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuICAgIGV4cG9ydHMuc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgIGV4cG9ydHMuZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbiAgICBleHBvcnRzLmRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuICAgIGV4cG9ydHMucm9sZUVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuICAgIGV4cG9ydHMuc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbiAgICBleHBvcnRzLmRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbiAgICBleHBvcnRzLmNhbmNlbERlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLWRlbC1idXR0b25cIik7XG4gICAgZXhwb3J0cy5hZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbiAgICBleHBvcnRzLmRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuICAgIGV4cG9ydHMuZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG4gICAgZXhwb3J0cy50YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG59KTtcbmRlZmluZShcInRhYmxlQWN0aW9uQnV0dG9uXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiY29uc3RhbnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgY29uc3RhbnRzX2pzXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5oYW5kbGVUYWJsZUNsaWNrID0gdm9pZCAwO1xuICAgIGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aWV3LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLmRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbCBidXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLmRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLmhhbmRsZVRhYmxlQ2xpY2sgPSBoYW5kbGVUYWJsZUNsaWNrO1xufSk7XG5kZWZpbmUoXCJ0eXBlXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbn0pO1xuZGVmaW5lKFwic2NyaXB0XCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwidGFibGVBY3Rpb25CdXR0b25cIiwgXCJjb25zdGFudHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCB0YWJsZUFjdGlvbkJ1dHRvbl9qc18xLCBjb25zdGFudHNfanNfMikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlQ3JlYXRlID0gZXhwb3J0cy5hY3R1YWxEYXRhID0gdm9pZCAwO1xuICAgIC8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgICAgICBhcnIuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlcCA9IGV4cG9ydHMuYWN0dWFsRGF0YS5kZXBhcnRtZW50W29iamVsZW0uZGVwYXJ0bWVudCAtIDFdLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzIudGFibGVCb2R5LmlubmVySFRNTCArPSBgXG4gICAgPHRyIGNsYXNzPVwiZGF0YS1yb3dcIj5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5pZH08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmZ1bGxOYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZW1haWx9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGVwfTwvdGQ+XG4gICAgICAgIDx0ZCBpZD1cImFjdGlvbi1idXR0b24tY2VsbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0+PGltZyBjbGFzcz1cInZpZXctaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvdmlldy1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwidmlldyBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2VkaXQtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkVkaXQgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZGVsLWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICBgO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGV4cG9ydHMudGFibGVDcmVhdGUgPSB0YWJsZUNyZWF0ZTtcbiAgICAvLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgZmlsbGVudHJ5ID0gKG9iaikgPT4ge1xuICAgICAgICAoMCwgZXhwb3J0cy50YWJsZUNyZWF0ZSkob2JqLmVtcGxveWVlKTtcbiAgICAgICAgLy8gZmlsdGVyIHNraWxsIGJ1dHRvbiBzY3JpcHRcbiAgICAgICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgICAgICBjb25zdGFudHNfanNfMi5za2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9maWxsIGRlcGFydG1lbnQgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBjb25zdGFudHNfanNfMi5kZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgICAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdGFudHNfanNfMi5kZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX1cIj4ke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgICAgIGNvbnN0YW50c19qc18yLnJvbGVFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18yLnJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBjb25zdGFudHNfanNfMi5za2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgICAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzIuc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGZ1bmN0aW9uIChmaWxsZW50cnkpIHtcbiAgICAgICAgZmV0Y2goY29uc3RhbnRzX2pzXzIuYXBpICsgXCIvLmpzb25cIilcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZXhwb3J0cy5hY3R1YWxEYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xuICAgIH07XG4gICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgY29uc3RhbnRzX2pzXzIudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhYmxlQWN0aW9uQnV0dG9uX2pzXzEuaGFuZGxlVGFibGVDbGljayk7XG4gICAgLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbiAgICBjb25zdGFudHNfanNfMi5kYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbiAgICAvL2Nsb3NlIGRhdGEtZGVsLW1vZGFsXG4gICAgY29uc3RhbnRzX2pzXzIuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICAgIC8vQWRkIGVtcGxveWVlIGZ1bmN0aW9uXG4gICAgY29uc3RhbnRzX2pzXzIuYWRkRW1wbG95ZWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3RhbnRzX2pzXzIub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuICAgIGNvbnN0YW50c19qc18yLmRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG59KTtcbi8vZmlsdGVyQW5kU2VhcmNoIGZ1bmN0aW9uYWxpdHlcbmRlZmluZShcImZpbHRlckFuZFNlYXJjaEZ1blwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInNjcmlwdFwiLCBcImNvbnN0YW50c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHNjcmlwdF9qc18xLCBjb25zdGFudHNfanNfMykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmNsZWFyRmlsdGVyID0gZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBleHBvcnRzLmZpbHRlclRhYmxlID0gZXhwb3J0cy5GaWx0ZXJBcnIgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBbXTtcbiAgICBjb25zdCBmaWx0ZXJUYWJsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudFwiKTtcbiAgICAgICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtO1xuICAgICAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICAgICAgaWYgKHRyaWFsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZWxlbWVudC5kYXRhc2V0LnNraWxsTnVtO1xuICAgICAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gY29uc3RhbnRzX2pzXzMuc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIC8vIGxldCBGaWx0ZXJBcnIgPSBhY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgICAgICBpZiAoY29uc3RhbnRzX2pzXzMuc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBleHBvcnRzLkZpbHRlckFyciA9IGV4cG9ydHMuRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5mdWxsTmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2h2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja2VkRmlsdGVyQXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBleHBvcnRzLkZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3RhbnRzX2pzXzMudGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICgwLCBzY3JpcHRfanNfMS50YWJsZUNyZWF0ZSkoZXhwb3J0cy5GaWx0ZXJBcnIpO1xuICAgIH07XG4gICAgZXhwb3J0cy5maWx0ZXJUYWJsZSA9IGZpbHRlclRhYmxlO1xuICAgIGNvbnN0IGNoYW5nZVNraWxsU3RhdGUgPSAoc2tpbGxJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhza2lsbElkKTtcbiAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgICAgIHRlbXAuY2xpY2soKTtcbiAgICAgICAgKDAsIGV4cG9ydHMuZmlsdGVyVGFibGUpKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBjaGFuZ2VTa2lsbFN0YXRlO1xuICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlKShkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IFwiSU5QVVRcIiB8fCB0YXJnZXQudGFnTmFtZSA9PT0gXCJMQUJFTFwiKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0Q2xvc2VzdC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlKShkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFJlbmRlckZpbHRlckJveCA9ICgpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gY29uc3RhbnRzX2pzXzMuZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBzY3JpcHRfanNfMS5hY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0YW50c19qc18zLnNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgICAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuICAgIDwvZGl2PmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBSZW5kZXJGaWx0ZXJCb3g7XG4gICAgY29uc3QgY2xlYXJGaWx0ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50IGlucHV0XCIpO1xuICAgICAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtQ2hlY2tlZCA9IGVsZW07XG4gICAgICAgICAgICBpZiAoZWxlbUNoZWNrZWQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICgwLCBleHBvcnRzLmZpbHRlclRhYmxlKSgpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jbGVhckZpbHRlciA9IGNsZWFyRmlsdGVyO1xuICAgIGNvbnN0YW50c19qc18zLmZpbHRlclNlYXJjaEJveC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3gpO1xuICAgIGNvbnN0IGNsZWFyRmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGVhci1maWx0ZXItYnV0dG9uXCIpO1xuICAgIGNsZWFyRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBvcnRzLmNsZWFyRmlsdGVyKTtcbiAgICBjb25zdGFudHNfanNfMy5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGV4cG9ydHMuZmlsdGVyVGFibGUpO1xufSk7XG5kZWZpbmUoXCJTb3J0RnVuXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwic2NyaXB0XCIsIFwiZmlsdGVyQW5kU2VhcmNoRnVuXCIsIFwiY29uc3RhbnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgc2NyaXB0X2pzXzIsIGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLCBjb25zdGFudHNfanNfNCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnNvcnRGdW4gPSB2b2lkIDA7XG4gICAgbGV0IGRpckZsYWcgPSAxO1xuICAgIC8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3Qgc29ydEZ1biA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFycmF5VG9Tb3J0ID0gc2NyaXB0X2pzXzIuYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICAgICAgaWYgKGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLkZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgICAgICBhcnJheVRvU29ydCA9IGZpbHRlckFuZFNlYXJjaEZ1bl9qc18xLkZpbHRlckFycjtcbiAgICAgICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lMiA9IGIuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICAgICAgY29tcGFyaXNvbiA9IDEgKiBkaXJGbGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgICAgIGNvbXBhcmlzb24gPSAtMSAqIGRpckZsYWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0YW50c19qc180LnRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAoMCwgc2NyaXB0X2pzXzIudGFibGVDcmVhdGUpKGFyclRvUmVuZGVyKTtcbiAgICAgICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvZG93bi1hcnJvdy5zdmdcIjtcbiAgICAgICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvdXAtYXJyb3cuc3ZnXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydHMuc29ydEZ1biA9IHNvcnRGdW47XG4gICAgY29uc3RhbnRzX2pzXzQuc29ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXhwb3J0cy5zb3J0RnVuKTtcbn0pO1xuIiwiZGVmaW5lKFwiY29uc3RhbnRzXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlID0gZXhwb3J0cy5kYXRhRW50cnlNb2RhbCA9IGV4cG9ydHMuZGF0YUVudHJ5Q2xvc2UgPSBleHBvcnRzLmFkZEVtcGxveWVlQnV0dG9uID0gZXhwb3J0cy5jYW5jZWxEZWxCdXR0b24gPSBleHBvcnRzLmRhdGFWaWV3Q2xvc2UgPSBleHBvcnRzLnNraWxsU2VsZWNFbnRyeSA9IGV4cG9ydHMucm9sZUVudHJ5ID0gZXhwb3J0cy5kZXBhcnRtZW50RW50cnkgPSBleHBvcnRzLmZpbHRlclNlYXJjaEJveCA9IGV4cG9ydHMuc2tpbGxMaXN0ID0gZXhwb3J0cy5zZWFyY2hCYXIgPSBleHBvcnRzLnNvcnRCdXR0b24gPSBleHBvcnRzLnRhYmxlQm9keSA9IGV4cG9ydHMuZGF0YURlbE1vZGFsID0gZXhwb3J0cy5kYXRhVmlld01vZGFsID0gZXhwb3J0cy5vdmVybGF5ID0gZXhwb3J0cy5hcGkgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5hcGkgPSBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCI7XG4gICAgZXhwb3J0cy5vdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgIGV4cG9ydHMuZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuICAgIGV4cG9ydHMuZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbiAgICBleHBvcnRzLnRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbiAgICBleHBvcnRzLnNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuICAgIGV4cG9ydHMuc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuICAgIGV4cG9ydHMuc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgIGV4cG9ydHMuZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbiAgICBleHBvcnRzLmRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuICAgIGV4cG9ydHMucm9sZUVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuICAgIGV4cG9ydHMuc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbiAgICBleHBvcnRzLmRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbiAgICBleHBvcnRzLmNhbmNlbERlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLWRlbC1idXR0b25cIik7XG4gICAgZXhwb3J0cy5hZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbiAgICBleHBvcnRzLmRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuICAgIGV4cG9ydHMuZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG4gICAgZXhwb3J0cy50YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG59KTtcbmRlZmluZShcInRhYmxlQWN0aW9uQnV0dG9uXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiY29uc3RhbnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgY29uc3RhbnRzX2pzXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5oYW5kbGVUYWJsZUNsaWNrID0gdm9pZCAwO1xuICAgIGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aWV3LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLmRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbCBidXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18xLmRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLmhhbmRsZVRhYmxlQ2xpY2sgPSBoYW5kbGVUYWJsZUNsaWNrO1xufSk7XG5kZWZpbmUoXCJ0eXBlXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbn0pO1xuZGVmaW5lKFwic2NyaXB0XCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwidGFibGVBY3Rpb25CdXR0b25cIiwgXCJjb25zdGFudHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCB0YWJsZUFjdGlvbkJ1dHRvbl9qc18xLCBjb25zdGFudHNfanNfMikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlQ3JlYXRlID0gZXhwb3J0cy5hY3R1YWxEYXRhID0gdm9pZCAwO1xuICAgIC8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgICAgICBhcnIuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlcCA9IGV4cG9ydHMuYWN0dWFsRGF0YS5kZXBhcnRtZW50W29iamVsZW0uZGVwYXJ0bWVudCAtIDFdLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzIudGFibGVCb2R5LmlubmVySFRNTCArPSBgXG4gICAgPHRyIGNsYXNzPVwiZGF0YS1yb3dcIj5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5pZH08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmZ1bGxOYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZW1haWx9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGVwfTwvdGQ+XG4gICAgICAgIDx0ZCBpZD1cImFjdGlvbi1idXR0b24tY2VsbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0+PGltZyBjbGFzcz1cInZpZXctaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvdmlldy1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwidmlldyBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2VkaXQtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkVkaXQgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZGVsLWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICBgO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGV4cG9ydHMudGFibGVDcmVhdGUgPSB0YWJsZUNyZWF0ZTtcbiAgICAvLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgZmlsbGVudHJ5ID0gKG9iaikgPT4ge1xuICAgICAgICAoMCwgZXhwb3J0cy50YWJsZUNyZWF0ZSkob2JqLmVtcGxveWVlKTtcbiAgICAgICAgLy8gZmlsdGVyIHNraWxsIGJ1dHRvbiBzY3JpcHRcbiAgICAgICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgICAgICBjb25zdGFudHNfanNfMi5za2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9maWxsIGRlcGFydG1lbnQgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBjb25zdGFudHNfanNfMi5kZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgICAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdGFudHNfanNfMi5kZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX1cIj4ke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgICAgIGNvbnN0YW50c19qc18yLnJvbGVFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc18yLnJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBjb25zdGFudHNfanNfMi5za2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgICAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3RhbnRzX2pzXzIuc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGZ1bmN0aW9uIChmaWxsZW50cnkpIHtcbiAgICAgICAgZmV0Y2goY29uc3RhbnRzX2pzXzIuYXBpICsgXCIvLmpzb25cIilcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZXhwb3J0cy5hY3R1YWxEYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xuICAgIH07XG4gICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgY29uc3RhbnRzX2pzXzIudGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhYmxlQWN0aW9uQnV0dG9uX2pzXzEuaGFuZGxlVGFibGVDbGljayk7XG4gICAgLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbiAgICBjb25zdGFudHNfanNfMi5kYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbiAgICAvL2Nsb3NlIGRhdGEtZGVsLW1vZGFsXG4gICAgY29uc3RhbnRzX2pzXzIuY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICAgIC8vQWRkIGVtcGxveWVlIGZ1bmN0aW9uXG4gICAgY29uc3RhbnRzX2pzXzIuYWRkRW1wbG95ZWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3RhbnRzX2pzXzIub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuICAgIGNvbnN0YW50c19qc18yLmRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0YW50c19qc18yLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdGFudHNfanNfMi5kYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG59KTtcbmRlZmluZShcImZpbHRlckFuZFNlYXJjaEZ1blwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInNjcmlwdFwiLCBcImNvbnN0YW50c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHNjcmlwdF9qc18xLCBjb25zdGFudHNfanNfMykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmNsZWFyRmlsdGVyID0gZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBleHBvcnRzLmZpbHRlclRhYmxlID0gZXhwb3J0cy5GaWx0ZXJBcnIgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBzY3JpcHRfanNfMS5hY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgIC8vIGV4cG9ydCBsZXQgRmlsdGVyQXJyID0gW107XG4gICAgY29uc3QgZmlsdGVyVGFibGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnRcIik7XG4gICAgICAgIGxldCBjaGVja2VkRmlsdGVyQXJyID0gW107XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWFsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtlbGVtZW50LmRhdGFzZXQuc2tpbGxJZH1gKTtcbiAgICAgICAgICAgIGlmICh0cmlhbC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGVsZW1lbnQuZGF0YXNldC5za2lsbE51bTtcbiAgICAgICAgICAgICAgICBjaGVja2VkRmlsdGVyQXJyLnB1c2goZGF0YXNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzZWFyY2h2YWx1ZSA9IGNvbnN0YW50c19qc18zLnNlYXJjaEJhci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAvLyBsZXQgRmlsdGVyQXJyID0gYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICAgICAgaWYgKGNvbnN0YW50c19qc18zLnNlYXJjaEJhci52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBleHBvcnRzLkZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0uZnVsbE5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hlY2tlZEZpbHRlckFyci5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGV4cG9ydHMuRmlsdGVyQXJyID0gZXhwb3J0cy5GaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBjaGVja2VkRmlsdGVyQXJyLmV2ZXJ5KChjaGVja0VsZW0pID0+IGVsZW0uc2tpbGxzLmluY2x1ZGVzKE51bWJlcihjaGVja0VsZW0pKSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0YW50c19qc18zLnRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAoMCwgc2NyaXB0X2pzXzEudGFibGVDcmVhdGUpKGV4cG9ydHMuRmlsdGVyQXJyKTtcbiAgICB9O1xuICAgIGV4cG9ydHMuZmlsdGVyVGFibGUgPSBmaWx0ZXJUYWJsZTtcbiAgICBjb25zdCBjaGFuZ2VTa2lsbFN0YXRlID0gKHNraWxsSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coc2tpbGxJZCk7XG4gICAgICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtza2lsbElkfWApO1xuICAgICAgICB0ZW1wLmNsaWNrKCk7XG4gICAgICAgICgwLCBleHBvcnRzLmZpbHRlclRhYmxlKSgpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlID0gY2hhbmdlU2tpbGxTdGF0ZTtcbiAgICBjb25zdGFudHNfanNfMy5za2lsbExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLWVsZW1lbnRcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXQuZGF0YXNldC5za2lsbElkO1xuICAgICAgICAgICAgKDAsIGV4cG9ydHMuY2hhbmdlU2tpbGxTdGF0ZSkoZGF0YXNldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIklOUFVUXCIgfHwgdGFyZ2V0LnRhZ05hbWUgPT09IFwiTEFCRUxcIikge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2xvc2VzdCA9IHRhcmdldC5jbG9zZXN0KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldENsb3Nlc3QuZGF0YXNldC5za2lsbElkO1xuICAgICAgICAgICAgKDAsIGV4cG9ydHMuY2hhbmdlU2tpbGxTdGF0ZSkoZGF0YXNldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBSZW5kZXJGaWx0ZXJCb3ggPSAoKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGNvbnN0YW50c19qc18zLmZpbHRlclNlYXJjaEJveC52YWx1ZTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdGFudHNfanNfMy5za2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgc2NyaXB0X2pzXzEuYWN0dWFsRGF0YS5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBza2lsbElkID0gb2JqZWxlbS5za2lsbC5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgICAgICBpZiAoc2tpbGxJZC5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdGFudHNfanNfMy5za2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICAgICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGV4cG9ydHMuUmVuZGVyRmlsdGVyQm94ID0gUmVuZGVyRmlsdGVyQm94O1xuICAgIGNvbnN0IGNsZWFyRmlsdGVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICAgICAgc2tpbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbUNoZWNrZWQgPSBlbGVtO1xuICAgICAgICAgICAgaWYgKGVsZW1DaGVja2VkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtQ2hlY2tlZC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAoMCwgZXhwb3J0cy5maWx0ZXJUYWJsZSkoKTtcbiAgICB9O1xuICAgIGV4cG9ydHMuY2xlYXJGaWx0ZXIgPSBjbGVhckZpbHRlcjtcbiAgICBjb25zdGFudHNfanNfMy5maWx0ZXJTZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGV4cG9ydHMuUmVuZGVyRmlsdGVyQm94KTtcbiAgICBjb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItZmlsdGVyLWJ1dHRvblwiKTtcbiAgICBjbGVhckZpbHRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXhwb3J0cy5jbGVhckZpbHRlcik7XG4gICAgY29uc3RhbnRzX2pzXzMuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBleHBvcnRzLmZpbHRlclRhYmxlKTtcbn0pO1xuZGVmaW5lKFwiU29ydEZ1blwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInNjcmlwdFwiLCBcImZpbHRlckFuZFNlYXJjaEZ1blwiLCBcImNvbnN0YW50c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHNjcmlwdF9qc18yLCBmaWx0ZXJBbmRTZWFyY2hGdW5fanNfMSwgY29uc3RhbnRzX2pzXzQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5zb3J0RnVuID0gdm9pZCAwO1xuICAgIGxldCBkaXJGbGFnID0gMTtcbiAgICAvLyBzb3J0IGZ1bmN0aW9uYWxpdHlcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHNvcnRGdW4gPSAoKSA9PiB7XG4gICAgICAgIGxldCBhcnJheVRvU29ydCA9IHNjcmlwdF9qc18yLmFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgICAgIGlmIChmaWx0ZXJBbmRTZWFyY2hGdW5fanNfMS5GaWx0ZXJBcnIubGVuZ3RoICE9PSAwKVxuICAgICAgICAgICAgYXJyYXlUb1NvcnQgPSBmaWx0ZXJBbmRTZWFyY2hGdW5fanNfMS5GaWx0ZXJBcnI7XG4gICAgICAgIGxldCBhcnJUb1JlbmRlciA9IGFycmF5VG9Tb3J0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUxID0gYS5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZTIgPSBiLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBsZXQgY29tcGFyaXNvbiA9IDA7XG4gICAgICAgICAgICBpZiAobmFtZTEgPiBuYW1lMikge1xuICAgICAgICAgICAgICAgIGNvbXBhcmlzb24gPSAxICogZGlyRmxhZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5hbWUxIDwgbmFtZTIpIHtcbiAgICAgICAgICAgICAgICBjb21wYXJpc29uID0gLTEgKiBkaXJGbGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmlzb247XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdGFudHNfanNfNC50YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgKDAsIHNjcmlwdF9qc18yLnRhYmxlQ3JlYXRlKShhcnJUb1JlbmRlcik7XG4gICAgICAgIGlmIChkaXJGbGFnID09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc180LnNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL2Rvd24tYXJyb3cuc3ZnXCI7XG4gICAgICAgICAgICBkaXJGbGFnID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkaXJGbGFnID0gMTtcbiAgICAgICAgICAgIGNvbnN0YW50c19qc180LnNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL3VwLWFycm93LnN2Z1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLnNvcnRGdW4gPSBzb3J0RnVuO1xuICAgIGNvbnN0YW50c19qc180LnNvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV4cG9ydHMuc29ydEZ1bik7XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZmlsdGVyQW5kU2VhcmNoRnVuLnRzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdC50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Tb3J0RnVuLnRzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdGFibGVBY3Rpb25CdXR0b24udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=