/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SortFun.ts":
/*!************************!*\
  !*** ./src/SortFun.ts ***!
  \************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.handleTableClick = void 0;
    const overlay = document.querySelector(".overlay");
    const dataViewModal = document.querySelector(".data-view-modal");
    const dataDelModal = document.querySelector(".data-del-modal");
    const handleTableClick = (e) => {
        const target = e.target;
        if (target.classList.contains("view-image-icon")) {
            overlay.style.display = "block";
            dataViewModal.style.display = "block";
        }
        if (target.classList.contains("del-image-icon")) {
            console.log("del button clicked");
            overlay.style.display = "block";
            dataDelModal.style.display = "block";
        }
    };
    exports.handleTableClick = handleTableClick;
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (require, exports, tableActionButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.tableCreate = exports.actualData = void 0;
    const api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    const tableBody = document.querySelector(".table-body");
    const skillList = document.querySelector(".skill-list");
    const departmentEntry = document.querySelector("#dep");
    const roleEntry = document.querySelector("#role");
    const skillSelecEntry = document.querySelector("#skill");
    //general table rendering function
    ///////////////////////////////////////////////
    const tableCreate = (arr) => {
        arr.forEach((objelem) => {
            let dep = exports.actualData.department[objelem.department - 1].departmentName;
            tableBody.innerHTML += `
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
            skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
        });
    };
    //fetching data whole data from firebase
    ////////////////////////////////////////////////
    const fetchData = function (fillentry) {
        fetch(api + "/.json")
            .then((res) => res.json())
            .then((data) => {
            exports.actualData = data;
            fillentry(data);
        })
            .catch((err) => console.log(err, "error"));
    };
    fetchData(fillentry);
    const table = document.querySelector(".table");
    table.addEventListener("click", tableActionButton_1.handleTableClick);
    //close data-view-modal
    const dataViewClose = document.querySelector(".data-view-close");
    dataViewClose.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataViewModal = document.querySelector(".data-view-modal");
        dataViewModal.style.display = "none";
    });
    //close data-del-modal
    const cancelDelButton = document.querySelector(".cancel-del-button");
    cancelDelButton.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataDelModal = document.querySelector(".data-del-modal");
        dataDelModal.style.display = "none";
    });
    //Add employee function
    const addEmployeeButton = document.querySelector(".add-employee-button");
    addEmployeeButton.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataEntryModal = document.querySelector(".data-entry-modal");
        dataEntryModal.style.display = "block";
    });
    const dataEntryClose = document.querySelector(".data-entry-close");
    dataEntryClose.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataEntryModal = document.querySelector(".data-entry-modal");
        dataEntryModal.style.display = "none";
    });
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__], __WEBPACK_LOCAL_MODULE_2__ = (function (require, exports, script_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.clearFilter = exports.RenderFilterBox = exports.changeSkillState = exports.filterTable = exports.FilterArr = void 0;
    exports.FilterArr = [];
    const tableBody = document.querySelector(".table-body");
    const searchBar = document.querySelector(".search-input-box");
    const skillList = document.querySelector(".skill-list");
    const filterSearchBox = document.querySelector(".filter-search-box");
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
        let FilterArr = script_1.actualData.employee;
        if (searchBar.value !== "") {
            FilterArr = FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
        }
        if (checkedFilterArr.length !== 0) {
            FilterArr = FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
        }
        tableBody.innerHTML = "";
        (0, script_1.tableCreate)(FilterArr);
    };
    exports.filterTable = filterTable;
    const changeSkillState = (skillId) => {
        console.log(skillId);
        const temp = document.querySelector(`#${skillId}`);
        temp.click();
        (0, exports.filterTable)();
    };
    exports.changeSkillState = changeSkillState;
    skillList.addEventListener("click", (e) => {
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
        let value = filterSearchBox.value;
        value = value.split(" ").join("").toLowerCase();
        skillList.innerHTML = "";
        script_1.actualData.skill.forEach((objelem) => {
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
    filterSearchBox.addEventListener("input", exports.RenderFilterBox);
    const clearFilterButton = document.querySelector(".clear-filter-button");
    clearFilterButton.addEventListener("click", exports.clearFilter);
    searchBar.addEventListener("input", exports.filterTable);
}).apply(__WEBPACK_LOCAL_MODULE_2__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_2__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, script_2, filterAndSearchFun_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.sortFun = void 0;
    const tableBody = document.querySelector(".table-body");
    const sortButton = document.querySelector(".sort-button");
    let dirFlag = 1;
    // sort functionality
    //////////////////////////////////////
    const sortFun = () => {
        let arrayToSort = script_2.actualData.employee;
        if (filterAndSearchFun_1.FilterArr.length !== 0)
            arrayToSort = filterAndSearchFun_1.FilterArr;
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
        (0, script_2.tableCreate)(arrToRender);
        if (dirFlag == 1) {
            sortButton.src = "../assets/images/down-arrow.svg";
            dirFlag = -1;
        }
        else {
            dirFlag = 1;
            sortButton.src = "../assets/images/up-arrow.svg";
        }
    };
    exports.sortFun = sortFun;
    sortButton.addEventListener("click", exports.sortFun);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/filterAndSearchFun.ts":
/*!***********************************!*\
  !*** ./src/filterAndSearchFun.ts ***!
  \***********************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.handleTableClick = void 0;
    const overlay = document.querySelector(".overlay");
    const dataViewModal = document.querySelector(".data-view-modal");
    const dataDelModal = document.querySelector(".data-del-modal");
    const handleTableClick = (e) => {
        const target = e.target;
        if (target.classList.contains("view-image-icon")) {
            overlay.style.display = "block";
            dataViewModal.style.display = "block";
        }
        if (target.classList.contains("del-image-icon")) {
            console.log("del button clicked");
            overlay.style.display = "block";
            dataDelModal.style.display = "block";
        }
    };
    exports.handleTableClick = handleTableClick;
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (require, exports, tableActionButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.tableCreate = exports.actualData = void 0;
    const api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    const tableBody = document.querySelector(".table-body");
    const skillList = document.querySelector(".skill-list");
    const departmentEntry = document.querySelector("#dep");
    const roleEntry = document.querySelector("#role");
    const skillSelecEntry = document.querySelector("#skill");
    //general table rendering function
    ///////////////////////////////////////////////
    const tableCreate = (arr) => {
        arr.forEach((objelem) => {
            let dep = exports.actualData.department[objelem.department - 1].departmentName;
            tableBody.innerHTML += `
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
            skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
        });
    };
    //fetching data whole data from firebase
    ////////////////////////////////////////////////
    const fetchData = function (fillentry) {
        fetch(api + "/.json")
            .then((res) => res.json())
            .then((data) => {
            exports.actualData = data;
            fillentry(data);
        })
            .catch((err) => console.log(err, "error"));
    };
    fetchData(fillentry);
    const table = document.querySelector(".table");
    table.addEventListener("click", tableActionButton_1.handleTableClick);
    //close data-view-modal
    const dataViewClose = document.querySelector(".data-view-close");
    dataViewClose.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataViewModal = document.querySelector(".data-view-modal");
        dataViewModal.style.display = "none";
    });
    //close data-del-modal
    const cancelDelButton = document.querySelector(".cancel-del-button");
    cancelDelButton.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataDelModal = document.querySelector(".data-del-modal");
        dataDelModal.style.display = "none";
    });
    //Add employee function
    const addEmployeeButton = document.querySelector(".add-employee-button");
    addEmployeeButton.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataEntryModal = document.querySelector(".data-entry-modal");
        dataEntryModal.style.display = "block";
    });
    const dataEntryClose = document.querySelector(".data-entry-close");
    dataEntryClose.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataEntryModal = document.querySelector(".data-entry-modal");
        dataEntryModal.style.display = "none";
    });
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__], __WEBPACK_LOCAL_MODULE_2__ = (function (require, exports, script_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.clearFilter = exports.RenderFilterBox = exports.changeSkillState = exports.filterTable = exports.FilterArr = void 0;
    exports.FilterArr = [];
    const tableBody = document.querySelector(".table-body");
    const searchBar = document.querySelector(".search-input-box");
    const skillList = document.querySelector(".skill-list");
    const filterSearchBox = document.querySelector(".filter-search-box");
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
        let FilterArr = script_1.actualData.employee;
        if (searchBar.value !== "") {
            FilterArr = FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
        }
        if (checkedFilterArr.length !== 0) {
            FilterArr = FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
        }
        tableBody.innerHTML = "";
        (0, script_1.tableCreate)(FilterArr);
    };
    exports.filterTable = filterTable;
    const changeSkillState = (skillId) => {
        console.log(skillId);
        const temp = document.querySelector(`#${skillId}`);
        temp.click();
        (0, exports.filterTable)();
    };
    exports.changeSkillState = changeSkillState;
    skillList.addEventListener("click", (e) => {
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
        let value = filterSearchBox.value;
        value = value.split(" ").join("").toLowerCase();
        skillList.innerHTML = "";
        script_1.actualData.skill.forEach((objelem) => {
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
    filterSearchBox.addEventListener("input", exports.RenderFilterBox);
    const clearFilterButton = document.querySelector(".clear-filter-button");
    clearFilterButton.addEventListener("click", exports.clearFilter);
    searchBar.addEventListener("input", exports.filterTable);
}).apply(__WEBPACK_LOCAL_MODULE_2__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_2__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, script_2, filterAndSearchFun_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.sortFun = void 0;
    const tableBody = document.querySelector(".table-body");
    const sortButton = document.querySelector(".sort-button");
    let dirFlag = 1;
    // sort functionality
    //////////////////////////////////////
    const sortFun = () => {
        let arrayToSort = script_2.actualData.employee;
        if (filterAndSearchFun_1.FilterArr.length !== 0)
            arrayToSort = filterAndSearchFun_1.FilterArr;
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
        (0, script_2.tableCreate)(arrToRender);
        if (dirFlag == 1) {
            sortButton.src = "../assets/images/down-arrow.svg";
            dirFlag = -1;
        }
        else {
            dirFlag = 1;
            sortButton.src = "../assets/images/up-arrow.svg";
        }
    };
    exports.sortFun = sortFun;
    sortButton.addEventListener("click", exports.sortFun);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.handleTableClick = void 0;
    const overlay = document.querySelector(".overlay");
    const dataViewModal = document.querySelector(".data-view-modal");
    const dataDelModal = document.querySelector(".data-del-modal");
    const handleTableClick = (e) => {
        const target = e.target;
        if (target.classList.contains("view-image-icon")) {
            overlay.style.display = "block";
            dataViewModal.style.display = "block";
        }
        if (target.classList.contains("del-image-icon")) {
            console.log("del button clicked");
            overlay.style.display = "block";
            dataDelModal.style.display = "block";
        }
    };
    exports.handleTableClick = handleTableClick;
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (require, exports, tableActionButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.tableCreate = exports.actualData = void 0;
    const api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    const tableBody = document.querySelector(".table-body");
    const skillList = document.querySelector(".skill-list");
    const departmentEntry = document.querySelector("#dep");
    const roleEntry = document.querySelector("#role");
    const skillSelecEntry = document.querySelector("#skill");
    //general table rendering function
    ///////////////////////////////////////////////
    const tableCreate = (arr) => {
        arr.forEach((objelem) => {
            let dep = exports.actualData.department[objelem.department - 1].departmentName;
            tableBody.innerHTML += `
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
            skillSelecEntry.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
        });
    };
    //fetching data whole data from firebase
    ////////////////////////////////////////////////
    const fetchData = function (fillentry) {
        fetch(api + "/.json")
            .then((res) => res.json())
            .then((data) => {
            exports.actualData = data;
            fillentry(data);
        })
            .catch((err) => console.log(err, "error"));
    };
    fetchData(fillentry);
    const table = document.querySelector(".table");
    table.addEventListener("click", tableActionButton_1.handleTableClick);
    //close data-view-modal
    const dataViewClose = document.querySelector(".data-view-close");
    dataViewClose.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataViewModal = document.querySelector(".data-view-modal");
        dataViewModal.style.display = "none";
    });
    //close data-del-modal
    const cancelDelButton = document.querySelector(".cancel-del-button");
    cancelDelButton.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataDelModal = document.querySelector(".data-del-modal");
        dataDelModal.style.display = "none";
    });
    //Add employee function
    const addEmployeeButton = document.querySelector(".add-employee-button");
    addEmployeeButton.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataEntryModal = document.querySelector(".data-entry-modal");
        dataEntryModal.style.display = "block";
    });
    const dataEntryClose = document.querySelector(".data-entry-close");
    dataEntryClose.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataEntryModal = document.querySelector(".data-entry-modal");
        dataEntryModal.style.display = "none";
    });
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__], __WEBPACK_LOCAL_MODULE_2__ = (function (require, exports, script_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.clearFilter = exports.RenderFilterBox = exports.changeSkillState = exports.filterTable = exports.FilterArr = void 0;
    exports.FilterArr = [];
    const tableBody = document.querySelector(".table-body");
    const searchBar = document.querySelector(".search-input-box");
    const skillList = document.querySelector(".skill-list");
    const filterSearchBox = document.querySelector(".filter-search-box");
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
        let FilterArr = script_1.actualData.employee;
        if (searchBar.value !== "") {
            FilterArr = FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
        }
        if (checkedFilterArr.length !== 0) {
            FilterArr = FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
        }
        tableBody.innerHTML = "";
        (0, script_1.tableCreate)(FilterArr);
    };
    exports.filterTable = filterTable;
    const changeSkillState = (skillId) => {
        console.log(skillId);
        const temp = document.querySelector(`#${skillId}`);
        temp.click();
        (0, exports.filterTable)();
    };
    exports.changeSkillState = changeSkillState;
    skillList.addEventListener("click", (e) => {
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
        let value = filterSearchBox.value;
        value = value.split(" ").join("").toLowerCase();
        skillList.innerHTML = "";
        script_1.actualData.skill.forEach((objelem) => {
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
    filterSearchBox.addEventListener("input", exports.RenderFilterBox);
    const clearFilterButton = document.querySelector(".clear-filter-button");
    clearFilterButton.addEventListener("click", exports.clearFilter);
    searchBar.addEventListener("input", exports.filterTable);
}).apply(__WEBPACK_LOCAL_MODULE_2__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_2__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, script_2, filterAndSearchFun_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.sortFun = void 0;
    const tableBody = document.querySelector(".table-body");
    const sortButton = document.querySelector(".sort-button");
    let dirFlag = 1;
    // sort functionality
    //////////////////////////////////////
    const sortFun = () => {
        let arrayToSort = script_2.actualData.employee;
        if (filterAndSearchFun_1.FilterArr.length !== 0)
            arrayToSort = filterAndSearchFun_1.FilterArr;
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
        (0, script_2.tableCreate)(arrToRender);
        if (dirFlag == 1) {
            sortButton.src = "../assets/images/down-arrow.svg";
            dirFlag = -1;
        }
        else {
            dirFlag = 1;
            sortButton.src = "../assets/images/up-arrow.svg";
        }
    };
    exports.sortFun = sortFun;
    sortButton.addEventListener("click", exports.sortFun);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/tableActionButton.ts":
/*!**********************************!*\
  !*** ./src/tableActionButton.ts ***!
  \**********************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_LOCAL_MODULE_0__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.handleTableClick = void 0;
    const overlay = document.querySelector(".overlay");
    const dataViewModal = document.querySelector(".data-view-modal");
    const dataDelModal = document.querySelector(".data-del-modal");
    const handleTableClick = (e) => {
        const target = e.target;
        if (target.classList.contains("view-image-icon")) {
            overlay.style.display = "block";
            dataViewModal.style.display = "block";
        }
        if (target.classList.contains("del-image-icon")) {
            console.log("del button clicked");
            overlay.style.display = "block";
            dataDelModal.style.display = "block";
        }
    };
    exports.handleTableClick = handleTableClick;
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_LOCAL_MODULE_1__ = (function (require, exports, tableActionButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.tableCreate = exports.actualData = void 0;
    const api = "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";
    const tableBody = document.querySelector(".table-body");
    //general table rendering function
    ///////////////////////////////////////////////
    const tableCreate = (arr) => {
        arr.forEach((objelem) => {
            let dep = exports.actualData.department[objelem.department - 1].departmentName;
            tableBody.innerHTML += `
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
        const skill = document.querySelector(".skill-list");
        (0, exports.tableCreate)(obj.employee);
        // filter skill button script
        obj.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("");
            const skillNum = objelem.skillID;
            skill.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
    <input  type="checkbox" id="${skillId}" >
    <label for="${skillId}"> ${objelem.skill}</label><br>
</div>`;
        });
        //fill department in data entry modal
        const department = document.querySelector("#dep");
        department.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.department.forEach((objelem) => {
            department.innerHTML += ` <option value="${objelem.departmentName}">${objelem.departmentName}</option>`;
        });
        // fill role in data entry modal
        const role = document.querySelector("#role");
        role.innerHTML = `<option value="none" selected disabled hidden >select</option>`;
        obj.role.forEach((objelem) => {
            role.innerHTML += ` <option value="${objelem.role}">${objelem.role}</option>`;
        });
        //fill skill in skill selection in data entry modal
        const skillSelec = document.querySelector("#skill");
        skillSelec.innerHTML = `<option value="none" selected disabled hidden >choose skill</option>`;
        obj.skill.forEach((objelem) => {
            skillSelec.innerHTML += ` <option value="${objelem.skill}">${objelem.skill}</option>`;
        });
    };
    //fetching data whole data from firebase
    ////////////////////////////////////////////////
    const fetchData = function (fillentry) {
        fetch(api + "/.json")
            .then((res) => res.json())
            .then((data) => {
            exports.actualData = data;
            console.log(data, "data");
            fillentry(data);
        })
            .catch((err) => console.log(err, "error"));
    };
    fetchData(fillentry);
    const table = document.querySelector(".table");
    table.addEventListener("click", tableActionButton_1.handleTableClick);
    //close data-view-modal
    const dataViewClose = document.querySelector(".data-view-close");
    dataViewClose.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataViewModal = document.querySelector(".data-view-modal");
        dataViewModal.style.display = "none";
    });
    //close data-del-modal
    const cancelDelButton = document.querySelector(".cancel-del-button");
    cancelDelButton.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataDelModal = document.querySelector(".data-del-modal");
        dataDelModal.style.display = "none";
    });
    //Add employee function
    const addEmployeeButton = document.querySelector(".add-employee-button");
    addEmployeeButton.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataEntryModal = document.querySelector(".data-entry-modal");
        dataEntryModal.style.display = "block";
    });
    const dataEntryClose = document.querySelector(".data-entry-close");
    dataEntryClose.addEventListener("click", () => {
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";
        const dataEntryModal = document.querySelector(".data-entry-modal");
        dataEntryModal.style.display = "none";
    });
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__], __WEBPACK_LOCAL_MODULE_2__ = (function (require, exports, script_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.clearFilter = exports.RenderFilterBox = exports.changeSkillState = exports.filterTable = exports.FilterArr = void 0;
    exports.FilterArr = [];
    const tableBody = document.querySelector(".table-body");
    const searchBar = document.querySelector(".search-input-box");
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
        let FilterArr = script_1.actualData.employee;
        if (searchBar.value !== "") {
            FilterArr = FilterArr.filter((elem) => elem.fullName.trim().toLowerCase().includes(searchvalue));
        }
        if (checkedFilterArr.length !== 0) {
            FilterArr = FilterArr.filter((elem) => checkedFilterArr.every((checkElem) => elem.skills.includes(Number(checkElem))));
        }
        tableBody.innerHTML = "";
        (0, script_1.tableCreate)(FilterArr);
    };
    exports.filterTable = filterTable;
    searchBar.addEventListener("input", exports.filterTable);
    const changeSkillState = (skillId) => {
        console.log(skillId);
        const temp = document.querySelector(`#${skillId}`);
        temp.click();
        (0, exports.filterTable)();
    };
    exports.changeSkillState = changeSkillState;
    const skillList = document.querySelector(".skill-list");
    skillList.addEventListener("click", (e) => {
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
        const filterSearchBox = document.querySelector(".filter-search-box");
        let value = filterSearchBox.value;
        value = value.split(" ").join("").toLowerCase();
        // console.log(value, "skill serach box value");
        const skill = document.querySelector(".skill-list");
        // console.log(skill.innerHTML, "skill-list")
        skill.innerHTML = "";
        script_1.actualData.skill.forEach((objelem) => {
            const skillId = objelem.skill.split(" ").join("").toLowerCase();
            const skillNum = objelem.skillID;
            if (skillId.includes(value)) {
                skill.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
        <input  type="checkbox" id="${skillId}" >
        <label for="${skillId}"> ${objelem.skill}</label><br>
    </div>`;
            }
        });
    };
    exports.RenderFilterBox = RenderFilterBox;
    const clearFilter = () => {
        const skill = document.querySelectorAll(".skill-element input");
        // console.log(skill);
        skill.forEach((elem) => {
            const elemChecked = elem;
            if (elemChecked.checked) {
                elemChecked.checked = false;
            }
        });
        (0, exports.filterTable)();
    };
    exports.clearFilter = clearFilter;
    const filterSearchBox = document.querySelector(".filter-search-box");
    filterSearchBox.addEventListener("input", exports.RenderFilterBox);
    const clearFilterButton = document.querySelector(".clear-filter-button");
    clearFilterButton.addEventListener("click", exports.clearFilter);
}).apply(__WEBPACK_LOCAL_MODULE_2__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__exports));
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_2__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, script_2, filterAndSearchFun_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.sortFun = void 0;
    const tableBody = document.querySelector(".table-body");
    let dirFlag = 1;
    const sortButton = document.querySelector(".sort-button");
    // sort functionality
    //////////////////////////////////////
    const sortFun = () => {
        console.log(filterAndSearchFun_1.FilterArr);
        let arrayToSort = script_2.actualData.employee;
        if (filterAndSearchFun_1.FilterArr.length !== 0)
            arrayToSort = filterAndSearchFun_1.FilterArr;
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
        (0, script_2.tableCreate)(arrToRender);
        if (dirFlag == 1) {
            // const sortButton=document.querySelector(".sort-button")! as HTMLImageElement;
            sortButton.src = "../assets/images/down-arrow.svg";
            dirFlag = -1;
        }
        else {
            dirFlag = 1;
            // const sortButton=document.querySelector(".sort-button")! as HTMLImageElement;
            sortButton.src = "../assets/images/up-arrow.svg";
        }
    };
    exports.sortFun = sortFun;
    sortButton.onclick = exports.sortFun;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksZUFBZTtBQUNuQjtBQUNBLENBQUM7QUFBQSxrR0FBQzs7Ozs7OztVQ3BRRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL1NvcnRGdW4udHMiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50Ly4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvLi9zcmMvc2NyaXB0LnRzIiwid2VicGFjazovL2hybV9hcHBfYXNzaWdubWVudC8uL3NyYy90YWJsZUFjdGlvbkJ1dHRvbi50cyIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHJtX2FwcF9hc3NpZ25tZW50L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9ocm1fYXBwX2Fzc2lnbm1lbnQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImRlZmluZShcInRhYmxlQWN0aW9uQnV0dG9uXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmhhbmRsZVRhYmxlQ2xpY2sgPSB2b2lkIDA7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbiAgICBjb25zdCBkYXRhVmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctbW9kYWxcIik7XG4gICAgY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbiAgICBjb25zdCBoYW5kbGVUYWJsZUNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlldy1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWwtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWwgYnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXhwb3J0cy5oYW5kbGVUYWJsZUNsaWNrID0gaGFuZGxlVGFibGVDbGljaztcbn0pO1xuZGVmaW5lKFwic2NyaXB0XCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwidGFibGVBY3Rpb25CdXR0b25cIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCB0YWJsZUFjdGlvbkJ1dHRvbl8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMudGFibGVDcmVhdGUgPSBleHBvcnRzLmFjdHVhbERhdGEgPSB2b2lkIDA7XG4gICAgY29uc3QgYXBpID0gXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiO1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbiAgICBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG4gICAgY29uc3QgZGVwYXJ0bWVudEVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXBcIik7XG4gICAgY29uc3Qgcm9sZUVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb2xlXCIpO1xuICAgIGNvbnN0IHNraWxsU2VsZWNFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2tpbGxcIik7XG4gICAgLy9nZW5lcmFsIHRhYmxlIHJlbmRlcmluZyBmdW5jdGlvblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgdGFibGVDcmVhdGUgPSAoYXJyKSA9PiB7XG4gICAgICAgIGFyci5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVwID0gZXhwb3J0cy5hY3R1YWxEYXRhLmRlcGFydG1lbnRbb2JqZWxlbS5kZXBhcnRtZW50IC0gMV0uZGVwYXJ0bWVudE5hbWU7XG4gICAgICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MICs9IGBcbiAgICA8dHIgY2xhc3M9XCJkYXRhLXJvd1wiPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmlkfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZnVsbE5hbWV9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5lbWFpbH08L3RkPlxuICAgICAgICA8dGQ+JHtkZXB9PC90ZD5cbiAgICAgICAgPHRkIGlkPVwiYWN0aW9uLWJ1dHRvbi1jZWxsXCI+XG4gICAgICAgICAgICA8YnV0dG9uICBkYXRhLWVtcC1pZD0gJHtvYmplbGVtLmlkfT48aW1nIGNsYXNzPVwidmlldy1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy92aWV3LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJ2aWV3IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtaW1hZ2UtaWNvblwiIGRhdGEtZW1wLWlkPSR7b2JqZWxlbS5pZH0+PGltZyBjbGFzcz1cImVkaXQtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZWRpdC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRWRpdCBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIGRhdGEtZW1wLWlkPSR7b2JqZWxlbS5pZH0+PGltZyBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9kZWwtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkRlbGV0ZSBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIGA7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgZXhwb3J0cy50YWJsZUNyZWF0ZSA9IHRhYmxlQ3JlYXRlO1xuICAgIC8vIGZldGNoaW5nIGRhdGEgZnJvbSBmaXJlYmFzZSBhbmQgZGlzcGxheSBpdCBpbnRvIHRoZSB0YWJsZVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zdCBmaWxsZW50cnkgPSAob2JqKSA9PiB7XG4gICAgICAgICgwLCBleHBvcnRzLnRhYmxlQ3JlYXRlKShvYmouZW1wbG95ZWUpO1xuICAgICAgICAvLyBmaWx0ZXIgc2tpbGwgYnV0dG9uIHNjcmlwdFxuICAgICAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbjwvZGl2PmA7XG4gICAgICAgIH0pO1xuICAgICAgICAvL2ZpbGwgZGVwYXJ0bWVudCBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgICAgIG9iai5kZXBhcnRtZW50LmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGRlcGFydG1lbnRFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLmRlcGFydG1lbnROYW1lfVwiPiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX08L29wdGlvbj5gO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gZmlsbCByb2xlIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICAgICAgcm9sZUVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICAgICAgb2JqLnJvbGUuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgcm9sZUVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0ucm9sZX1cIj4ke29iamVsZW0ucm9sZX08L29wdGlvbj5gO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9maWxsIHNraWxsIGluIHNraWxsIHNlbGVjdGlvbiBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPmNob29zZSBza2lsbDwvb3B0aW9uPmA7XG4gICAgICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5za2lsbH1cIj4ke29iamVsZW0uc2tpbGx9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvL2ZldGNoaW5nIGRhdGEgd2hvbGUgZGF0YSBmcm9tIGZpcmViYXNlXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgZmV0Y2hEYXRhID0gZnVuY3Rpb24gKGZpbGxlbnRyeSkge1xuICAgICAgICBmZXRjaChhcGkgKyBcIi8uanNvblwiKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBleHBvcnRzLmFjdHVhbERhdGEgPSBkYXRhO1xuICAgICAgICAgICAgZmlsbGVudHJ5KGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVyciwgXCJlcnJvclwiKSk7XG4gICAgfTtcbiAgICBmZXRjaERhdGEoZmlsbGVudHJ5KTtcbiAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVcIik7XG4gICAgdGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhYmxlQWN0aW9uQnV0dG9uXzEuaGFuZGxlVGFibGVDbGljayk7XG4gICAgLy9jbG9zZSBkYXRhLXZpZXctbW9kYWxcbiAgICBjb25zdCBkYXRhVmlld0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctY2xvc2VcIik7XG4gICAgZGF0YVZpZXdDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuICAgICAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbiAgICAvL2Nsb3NlIGRhdGEtZGVsLW1vZGFsXG4gICAgY29uc3QgY2FuY2VsRGVsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtZGVsLWJ1dHRvblwiKTtcbiAgICBjYW5jZWxEZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG4gICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG4gICAgLy9BZGQgZW1wbG95ZWUgZnVuY3Rpb25cbiAgICBjb25zdCBhZGRFbXBsb3llZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLWVtcGxveWVlLWJ1dHRvblwiKTtcbiAgICBhZGRFbXBsb3llZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG4gICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSk7XG4gICAgY29uc3QgZGF0YUVudHJ5Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktY2xvc2VcIik7XG4gICAgZGF0YUVudHJ5Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG59KTtcbmRlZmluZShcImZpbHRlckFuZFNlYXJjaEZ1blwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInNjcmlwdFwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHNjcmlwdF8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuY2xlYXJGaWx0ZXIgPSBleHBvcnRzLlJlbmRlckZpbHRlckJveCA9IGV4cG9ydHMuY2hhbmdlU2tpbGxTdGF0ZSA9IGV4cG9ydHMuZmlsdGVyVGFibGUgPSBleHBvcnRzLkZpbHRlckFyciA9IHZvaWQgMDtcbiAgICBleHBvcnRzLkZpbHRlckFyciA9IFtdO1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbiAgICBjb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1pbnB1dC1ib3hcIik7XG4gICAgY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgIGNvbnN0IGZpbHRlclNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyLXNlYXJjaC1ib3hcIik7XG4gICAgY29uc3QgZmlsdGVyVGFibGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnRcIik7XG4gICAgICAgIGxldCBjaGVja2VkRmlsdGVyQXJyID0gW107XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbTtcbiAgICAgICAgICAgIGNvbnN0IHRyaWFsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtlbGVtZW50LmRhdGFzZXQuc2tpbGxJZH1gKTtcbiAgICAgICAgICAgIGlmICh0cmlhbC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGVsZW1lbnQuZGF0YXNldC5za2lsbE51bTtcbiAgICAgICAgICAgICAgICBjaGVja2VkRmlsdGVyQXJyLnB1c2goZGF0YXNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzZWFyY2h2YWx1ZSA9IHNlYXJjaEJhci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgRmlsdGVyQXJyID0gc2NyaXB0XzEuYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICAgICAgaWYgKHNlYXJjaEJhci52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgRmlsdGVyQXJyID0gRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gZWxlbS5mdWxsTmFtZS50cmltKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2h2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja2VkRmlsdGVyQXJyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgRmlsdGVyQXJyID0gRmlsdGVyQXJyLmZpbHRlcigoZWxlbSkgPT4gY2hlY2tlZEZpbHRlckFyci5ldmVyeSgoY2hlY2tFbGVtKSA9PiBlbGVtLnNraWxscy5pbmNsdWRlcyhOdW1iZXIoY2hlY2tFbGVtKSkpKTtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgKDAsIHNjcmlwdF8xLnRhYmxlQ3JlYXRlKShGaWx0ZXJBcnIpO1xuICAgIH07XG4gICAgZXhwb3J0cy5maWx0ZXJUYWJsZSA9IGZpbHRlclRhYmxlO1xuICAgIGNvbnN0IGNoYW5nZVNraWxsU3RhdGUgPSAoc2tpbGxJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhza2lsbElkKTtcbiAgICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NraWxsSWR9YCk7XG4gICAgICAgIHRlbXAuY2xpY2soKTtcbiAgICAgICAgKDAsIGV4cG9ydHMuZmlsdGVyVGFibGUpKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBjaGFuZ2VTa2lsbFN0YXRlO1xuICAgIHNraWxsTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtZWxlbWVudFwiKSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlKShkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09IFwiSU5QVVRcIiB8fCB0YXJnZXQudGFnTmFtZSA9PT0gXCJMQUJFTFwiKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDbG9zZXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0Q2xvc2VzdC5kYXRhc2V0LnNraWxsSWQ7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlKShkYXRhc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFJlbmRlckZpbHRlckJveCA9ICgpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZmlsdGVyU2VhcmNoQm94LnZhbHVlO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBzY3JpcHRfMS5hY3R1YWxEYXRhLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgICAgIGlmIChza2lsbElkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHNraWxsTGlzdC5pbm5lckhUTUwgKz0gYCA8ZGl2IGNsYXNzPVwic2tpbGwtZWxlbWVudFwiIGRhdGEtc2tpbGwtaWQ9XCIke3NraWxsSWR9XCIgZGF0YS1za2lsbC1udW09XCIke3NraWxsTnVtfVwiPlxuICAgICAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuICAgIDwvZGl2PmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBSZW5kZXJGaWx0ZXJCb3g7XG4gICAgY29uc3QgY2xlYXJGaWx0ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNraWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50IGlucHV0XCIpO1xuICAgICAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtQ2hlY2tlZCA9IGVsZW07XG4gICAgICAgICAgICBpZiAoZWxlbUNoZWNrZWQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICgwLCBleHBvcnRzLmZpbHRlclRhYmxlKSgpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jbGVhckZpbHRlciA9IGNsZWFyRmlsdGVyO1xuICAgIGZpbHRlclNlYXJjaEJveC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3gpO1xuICAgIGNvbnN0IGNsZWFyRmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGVhci1maWx0ZXItYnV0dG9uXCIpO1xuICAgIGNsZWFyRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBvcnRzLmNsZWFyRmlsdGVyKTtcbiAgICBzZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGV4cG9ydHMuZmlsdGVyVGFibGUpO1xufSk7XG5kZWZpbmUoXCJTb3J0RnVuXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwic2NyaXB0XCIsIFwiZmlsdGVyQW5kU2VhcmNoRnVuXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgc2NyaXB0XzIsIGZpbHRlckFuZFNlYXJjaEZ1bl8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuc29ydEZ1biA9IHZvaWQgMDtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG4gICAgY29uc3Qgc29ydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydC1idXR0b25cIik7XG4gICAgbGV0IGRpckZsYWcgPSAxO1xuICAgIC8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3Qgc29ydEZ1biA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFycmF5VG9Tb3J0ID0gc2NyaXB0XzIuYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICAgICAgaWYgKGZpbHRlckFuZFNlYXJjaEZ1bl8xLkZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgICAgICBhcnJheVRvU29ydCA9IGZpbHRlckFuZFNlYXJjaEZ1bl8xLkZpbHRlckFycjtcbiAgICAgICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lMiA9IGIuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICAgICAgY29tcGFyaXNvbiA9IDEgKiBkaXJGbGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgICAgIGNvbXBhcmlzb24gPSAtMSAqIGRpckZsYWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAoMCwgc2NyaXB0XzIudGFibGVDcmVhdGUpKGFyclRvUmVuZGVyKTtcbiAgICAgICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvZG93bi1hcnJvdy5zdmdcIjtcbiAgICAgICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvdXAtYXJyb3cuc3ZnXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydHMuc29ydEZ1biA9IHNvcnRGdW47XG4gICAgc29ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXhwb3J0cy5zb3J0RnVuKTtcbn0pO1xuIiwiZGVmaW5lKFwidGFibGVBY3Rpb25CdXR0b25cIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuaGFuZGxlVGFibGVDbGljayA9IHZvaWQgMDtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgIGNvbnN0IGRhdGFWaWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1tb2RhbFwiKTtcbiAgICBjb25zdCBkYXRhRGVsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZGVsLW1vZGFsXCIpO1xuICAgIGNvbnN0IGhhbmRsZVRhYmxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aWV3LWltYWdlLWljb25cIikpIHtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbC1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbCBidXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIGRhdGFEZWxNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLmhhbmRsZVRhYmxlQ2xpY2sgPSBoYW5kbGVUYWJsZUNsaWNrO1xufSk7XG5kZWZpbmUoXCJzY3JpcHRcIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJ0YWJsZUFjdGlvbkJ1dHRvblwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHRhYmxlQWN0aW9uQnV0dG9uXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy50YWJsZUNyZWF0ZSA9IGV4cG9ydHMuYWN0dWFsRGF0YSA9IHZvaWQgMDtcbiAgICBjb25zdCBhcGkgPSBcImh0dHBzOi8vaHJtLWFwcC0zOWJkOS1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCI7XG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuICAgIGNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbiAgICBjb25zdCBkZXBhcnRtZW50RW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlcFwiKTtcbiAgICBjb25zdCByb2xlRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JvbGVcIik7XG4gICAgY29uc3Qgc2tpbGxTZWxlY0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNza2lsbFwiKTtcbiAgICAvL2dlbmVyYWwgdGFibGUgcmVuZGVyaW5nIGZ1bmN0aW9uXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zdCB0YWJsZUNyZWF0ZSA9IChhcnIpID0+IHtcbiAgICAgICAgYXJyLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGxldCBkZXAgPSBleHBvcnRzLmFjdHVhbERhdGEuZGVwYXJ0bWVudFtvYmplbGVtLmRlcGFydG1lbnQgLSAxXS5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgKz0gYFxuICAgIDx0ciBjbGFzcz1cImRhdGEtcm93XCI+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uaWR9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5mdWxsTmFtZX08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmVtYWlsfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2RlcH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJhY3Rpb24tYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJ2aWV3LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL3ZpZXctaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInZpZXcgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9lZGl0LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJFZGl0IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2RlbC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICAgYDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBleHBvcnRzLnRhYmxlQ3JlYXRlID0gdGFibGVDcmVhdGU7XG4gICAgLy8gZmV0Y2hpbmcgZGF0YSBmcm9tIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IGludG8gdGhlIHRhYmxlXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IGZpbGxlbnRyeSA9IChvYmopID0+IHtcbiAgICAgICAgKDAsIGV4cG9ydHMudGFibGVDcmVhdGUpKG9iai5lbXBsb3llZSk7XG4gICAgICAgIC8vIGZpbHRlciBza2lsbCBidXR0b24gc2NyaXB0XG4gICAgICAgIG9iai5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBza2lsbElkID0gb2JqZWxlbS5za2lsbC5zcGxpdChcIiBcIikuam9pbihcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuPC9kaXY+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vZmlsbCBkZXBhcnRtZW50IGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICAgICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICAgICAgb2JqLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgZGVwYXJ0bWVudEVudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9XCI+JHtvYmplbGVtLmRlcGFydG1lbnROYW1lfTwvb3B0aW9uPmA7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBmaWxsIHJvbGUgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICByb2xlRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgICAgICBvYmoucm9sZS5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICByb2xlRW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5yb2xlfVwiPiR7b2JqZWxlbS5yb2xlfTwvb3B0aW9uPmA7XG4gICAgICAgIH0pO1xuICAgICAgICAvL2ZpbGwgc2tpbGwgaW4gc2tpbGwgc2VsZWN0aW9uIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICAgICAgc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+Y2hvb3NlIHNraWxsPC9vcHRpb24+YDtcbiAgICAgICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIHNraWxsU2VsZWNFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnNraWxsfVwiPiR7b2JqZWxlbS5za2lsbH08L29wdGlvbj5gO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vZmV0Y2hpbmcgZGF0YSB3aG9sZSBkYXRhIGZyb20gZmlyZWJhc2VcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zdCBmZXRjaERhdGEgPSBmdW5jdGlvbiAoZmlsbGVudHJ5KSB7XG4gICAgICAgIGZldGNoKGFwaSArIFwiLy5qc29uXCIpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGV4cG9ydHMuYWN0dWFsRGF0YSA9IGRhdGE7XG4gICAgICAgICAgICBmaWxsZW50cnkoZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyLCBcImVycm9yXCIpKTtcbiAgICB9O1xuICAgIGZldGNoRGF0YShmaWxsZW50cnkpO1xuICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFibGVBY3Rpb25CdXR0b25fMS5oYW5kbGVUYWJsZUNsaWNrKTtcbiAgICAvL2Nsb3NlIGRhdGEtdmlldy1tb2RhbFxuICAgIGNvbnN0IGRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbiAgICBkYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdCBkYXRhVmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctbW9kYWxcIik7XG4gICAgICAgIGRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICAgIC8vY2xvc2UgZGF0YS1kZWwtbW9kYWxcbiAgICBjb25zdCBjYW5jZWxEZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC1kZWwtYnV0dG9uXCIpO1xuICAgIGNhbmNlbERlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbiAgICAgICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbiAgICAvL0FkZCBlbXBsb3llZSBmdW5jdGlvblxuICAgIGNvbnN0IGFkZEVtcGxveWVlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtZW1wbG95ZWUtYnV0dG9uXCIpO1xuICAgIGFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbiAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhRW50cnlDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1jbG9zZVwiKTtcbiAgICBkYXRhRW50cnlDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG4gICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbn0pO1xuZGVmaW5lKFwiZmlsdGVyQW5kU2VhcmNoRnVuXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwic2NyaXB0XCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgc2NyaXB0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5jbGVhckZpbHRlciA9IGV4cG9ydHMuUmVuZGVyRmlsdGVyQm94ID0gZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlID0gZXhwb3J0cy5maWx0ZXJUYWJsZSA9IGV4cG9ydHMuRmlsdGVyQXJyID0gdm9pZCAwO1xuICAgIGV4cG9ydHMuRmlsdGVyQXJyID0gW107XG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuICAgIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWlucHV0LWJveFwiKTtcbiAgICBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG4gICAgY29uc3QgZmlsdGVyU2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXItc2VhcmNoLWJveFwiKTtcbiAgICBjb25zdCBmaWx0ZXJUYWJsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudFwiKTtcbiAgICAgICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtO1xuICAgICAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICAgICAgaWYgKHRyaWFsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZWxlbWVudC5kYXRhc2V0LnNraWxsTnVtO1xuICAgICAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBGaWx0ZXJBcnIgPSBzY3JpcHRfMS5hY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgICAgICBpZiAoc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtLmZ1bGxOYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrZWRGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBjaGVja2VkRmlsdGVyQXJyLmV2ZXJ5KChjaGVja0VsZW0pID0+IGVsZW0uc2tpbGxzLmluY2x1ZGVzKE51bWJlcihjaGVja0VsZW0pKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAoMCwgc2NyaXB0XzEudGFibGVDcmVhdGUpKEZpbHRlckFycik7XG4gICAgfTtcbiAgICBleHBvcnRzLmZpbHRlclRhYmxlID0gZmlsdGVyVGFibGU7XG4gICAgY29uc3QgY2hhbmdlU2tpbGxTdGF0ZSA9IChza2lsbElkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNraWxsSWQpO1xuICAgICAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2tpbGxJZH1gKTtcbiAgICAgICAgdGVtcC5jbGljaygpO1xuICAgICAgICAoMCwgZXhwb3J0cy5maWx0ZXJUYWJsZSkoKTtcbiAgICB9O1xuICAgIGV4cG9ydHMuY2hhbmdlU2tpbGxTdGF0ZSA9IGNoYW5nZVNraWxsU3RhdGU7XG4gICAgc2tpbGxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbC1lbGVtZW50XCIpKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgICAgICgwLCBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUpKGRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gXCJJTlBVVFwiIHx8IHRhcmdldC50YWdOYW1lID09PSBcIkxBQkVMXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldENsb3Nlc3QgPSB0YXJnZXQuY2xvc2VzdChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXRDbG9zZXN0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgICAgICgwLCBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUpKGRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgUmVuZGVyRmlsdGVyQm94ID0gKCkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBmaWx0ZXJTZWFyY2hCb3gudmFsdWU7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHNjcmlwdF8xLmFjdHVhbERhdGEuc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICAgICAgaWYgKHNraWxsSWQuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgc2tpbGxMaXN0LmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgICAgIDxpbnB1dCAgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3NraWxsSWR9XCIgPlxuICAgICAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG4gICAgPC9kaXY+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBleHBvcnRzLlJlbmRlckZpbHRlckJveCA9IFJlbmRlckZpbHRlckJveDtcbiAgICBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsLWVsZW1lbnQgaW5wdXRcIik7XG4gICAgICAgIHNraWxsLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1DaGVja2VkID0gZWxlbTtcbiAgICAgICAgICAgIGlmIChlbGVtQ2hlY2tlZC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgZWxlbUNoZWNrZWQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgKDAsIGV4cG9ydHMuZmlsdGVyVGFibGUpKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLmNsZWFyRmlsdGVyID0gY2xlYXJGaWx0ZXI7XG4gICAgZmlsdGVyU2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBleHBvcnRzLlJlbmRlckZpbHRlckJveCk7XG4gICAgY29uc3QgY2xlYXJGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsZWFyLWZpbHRlci1idXR0b25cIik7XG4gICAgY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV4cG9ydHMuY2xlYXJGaWx0ZXIpO1xuICAgIHNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZXhwb3J0cy5maWx0ZXJUYWJsZSk7XG59KTtcbmRlZmluZShcIlNvcnRGdW5cIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJzY3JpcHRcIiwgXCJmaWx0ZXJBbmRTZWFyY2hGdW5cIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBzY3JpcHRfMiwgZmlsdGVyQW5kU2VhcmNoRnVuXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5zb3J0RnVuID0gdm9pZCAwO1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbiAgICBjb25zdCBzb3J0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0LWJ1dHRvblwiKTtcbiAgICBsZXQgZGlyRmxhZyA9IDE7XG4gICAgLy8gc29ydCBmdW5jdGlvbmFsaXR5XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zdCBzb3J0RnVuID0gKCkgPT4ge1xuICAgICAgICBsZXQgYXJyYXlUb1NvcnQgPSBzY3JpcHRfMi5hY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgICAgICBpZiAoZmlsdGVyQW5kU2VhcmNoRnVuXzEuRmlsdGVyQXJyLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgIGFycmF5VG9Tb3J0ID0gZmlsdGVyQW5kU2VhcmNoRnVuXzEuRmlsdGVyQXJyO1xuICAgICAgICBsZXQgYXJyVG9SZW5kZXIgPSBhcnJheVRvU29ydC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lMSA9IGEuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUyID0gYi5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgbGV0IGNvbXBhcmlzb24gPSAwO1xuICAgICAgICAgICAgaWYgKG5hbWUxID4gbmFtZTIpIHtcbiAgICAgICAgICAgICAgICBjb21wYXJpc29uID0gMSAqIGRpckZsYWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuYW1lMSA8IG5hbWUyKSB7XG4gICAgICAgICAgICAgICAgY29tcGFyaXNvbiA9IC0xICogZGlyRmxhZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wYXJpc29uO1xuICAgICAgICB9KTtcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICgwLCBzY3JpcHRfMi50YWJsZUNyZWF0ZSkoYXJyVG9SZW5kZXIpO1xuICAgICAgICBpZiAoZGlyRmxhZyA9PSAxKSB7XG4gICAgICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy9kb3duLWFycm93LnN2Z1wiO1xuICAgICAgICAgICAgZGlyRmxhZyA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGlyRmxhZyA9IDE7XG4gICAgICAgICAgICBzb3J0QnV0dG9uLnNyYyA9IFwiLi4vYXNzZXRzL2ltYWdlcy91cC1hcnJvdy5zdmdcIjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXhwb3J0cy5zb3J0RnVuID0gc29ydEZ1bjtcbiAgICBzb3J0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHBvcnRzLnNvcnRGdW4pO1xufSk7XG4iLCJkZWZpbmUoXCJ0YWJsZUFjdGlvbkJ1dHRvblwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5oYW5kbGVUYWJsZUNsaWNrID0gdm9pZCAwO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgY29uc3QgZGF0YVZpZXdNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LW1vZGFsXCIpO1xuICAgIGNvbnN0IGRhdGFEZWxNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1kZWwtbW9kYWxcIik7XG4gICAgY29uc3QgaGFuZGxlVGFibGVDbGljayA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInZpZXctaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsLWltYWdlLWljb25cIikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVsIGJ1dHRvbiBjbGlja2VkXCIpO1xuICAgICAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydHMuaGFuZGxlVGFibGVDbGljayA9IGhhbmRsZVRhYmxlQ2xpY2s7XG59KTtcbmRlZmluZShcInNjcmlwdFwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInRhYmxlQWN0aW9uQnV0dG9uXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgdGFibGVBY3Rpb25CdXR0b25fMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnRhYmxlQ3JlYXRlID0gZXhwb3J0cy5hY3R1YWxEYXRhID0gdm9pZCAwO1xuICAgIGNvbnN0IGFwaSA9IFwiaHR0cHM6Ly9ocm0tYXBwLTM5YmQ5LWRlZmF1bHQtcnRkYi5hc2lhLXNvdXRoZWFzdDEuZmlyZWJhc2VkYXRhYmFzZS5hcHBcIjtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG4gICAgY29uc3Qgc2tpbGxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5za2lsbC1saXN0XCIpO1xuICAgIGNvbnN0IGRlcGFydG1lbnRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuICAgIGNvbnN0IHJvbGVFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbiAgICBjb25zdCBza2lsbFNlbGVjRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NraWxsXCIpO1xuICAgIC8vZ2VuZXJhbCB0YWJsZSByZW5kZXJpbmcgZnVuY3Rpb25cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHRhYmxlQ3JlYXRlID0gKGFycikgPT4ge1xuICAgICAgICBhcnIuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlcCA9IGV4cG9ydHMuYWN0dWFsRGF0YS5kZXBhcnRtZW50W29iamVsZW0uZGVwYXJ0bWVudCAtIDFdLmRlcGFydG1lbnROYW1lO1xuICAgICAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCArPSBgXG4gICAgPHRyIGNsYXNzPVwiZGF0YS1yb3dcIj5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5pZH08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmZ1bGxOYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uZW1haWx9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGVwfTwvdGQ+XG4gICAgICAgIDx0ZCBpZD1cImFjdGlvbi1idXR0b24tY2VsbFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAgZGF0YS1lbXAtaWQ9ICR7b2JqZWxlbS5pZH0+PGltZyBjbGFzcz1cInZpZXctaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvdmlldy1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwidmlldyBidXR0b24gaW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJlZGl0LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2VkaXQtaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkVkaXQgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBkYXRhLWVtcC1pZD0ke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJkZWwtaW1hZ2UtaWNvblwiIHNyYz1cImFzc2V0cy9pbWFnZXMvZGVsLWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJEZWxldGUgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICBgO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGV4cG9ydHMudGFibGVDcmVhdGUgPSB0YWJsZUNyZWF0ZTtcbiAgICAvLyBmZXRjaGluZyBkYXRhIGZyb20gZmlyZWJhc2UgYW5kIGRpc3BsYXkgaXQgaW50byB0aGUgdGFibGVcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgZmlsbGVudHJ5ID0gKG9iaikgPT4ge1xuICAgICAgICAoMCwgZXhwb3J0cy50YWJsZUNyZWF0ZSkob2JqLmVtcGxveWVlKTtcbiAgICAgICAgLy8gZmlsdGVyIHNraWxsIGJ1dHRvbiBzY3JpcHRcbiAgICAgICAgb2JqLnNraWxsLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsSWQgPSBvYmplbGVtLnNraWxsLnNwbGl0KFwiIFwiKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICA8aW5wdXQgIHR5cGU9XCJjaGVja2JveFwiIGlkPVwiJHtza2lsbElkfVwiID5cbiAgICA8bGFiZWwgZm9yPVwiJHtza2lsbElkfVwiPiAke29iamVsZW0uc2tpbGx9PC9sYWJlbD48YnI+XG48L2Rpdj5gO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9maWxsIGRlcGFydG1lbnQgaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBkZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5zZWxlY3Q8L29wdGlvbj5gO1xuICAgICAgICBvYmouZGVwYXJ0bWVudC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBkZXBhcnRtZW50RW50cnkuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX1cIj4ke29iamVsZW0uZGVwYXJ0bWVudE5hbWV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGZpbGwgcm9sZSBpbiBkYXRhIGVudHJ5IG1vZGFsXG4gICAgICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIHJvbGVFbnRyeS5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnJvbGV9XCI+JHtvYmplbGVtLnJvbGV9PC9vcHRpb24+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vZmlsbCBza2lsbCBpbiBza2lsbCBzZWxlY3Rpb24gaW4gZGF0YSBlbnRyeSBtb2RhbFxuICAgICAgICBza2lsbFNlbGVjRW50cnkuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgICAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgc2tpbGxTZWxlY0VudHJ5LmlubmVySFRNTCArPSBgIDxvcHRpb24gdmFsdWU9XCIke29iamVsZW0uc2tpbGx9XCI+JHtvYmplbGVtLnNraWxsfTwvb3B0aW9uPmA7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy9mZXRjaGluZyBkYXRhIHdob2xlIGRhdGEgZnJvbSBmaXJlYmFzZVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGZ1bmN0aW9uIChmaWxsZW50cnkpIHtcbiAgICAgICAgZmV0Y2goYXBpICsgXCIvLmpzb25cIilcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZXhwb3J0cy5hY3R1YWxEYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGZpbGxlbnRyeShkYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIsIFwiZXJyb3JcIikpO1xuICAgIH07XG4gICAgZmV0Y2hEYXRhKGZpbGxlbnRyeSk7XG4gICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlXCIpO1xuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YWJsZUFjdGlvbkJ1dHRvbl8xLmhhbmRsZVRhYmxlQ2xpY2spO1xuICAgIC8vY2xvc2UgZGF0YS12aWV3LW1vZGFsXG4gICAgY29uc3QgZGF0YVZpZXdDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS12aWV3LWNsb3NlXCIpO1xuICAgIGRhdGFWaWV3Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGNvbnN0IGRhdGFWaWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1tb2RhbFwiKTtcbiAgICAgICAgZGF0YVZpZXdNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG4gICAgLy9jbG9zZSBkYXRhLWRlbC1tb2RhbFxuICAgIGNvbnN0IGNhbmNlbERlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsLWRlbC1idXR0b25cIik7XG4gICAgY2FuY2VsRGVsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdCBkYXRhRGVsTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZGVsLW1vZGFsXCIpO1xuICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICAgIC8vQWRkIGVtcGxveWVlIGZ1bmN0aW9uXG4gICAgY29uc3QgYWRkRW1wbG95ZWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1lbXBsb3llZS1idXR0b25cIik7XG4gICAgYWRkRW1wbG95ZWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGNvbnN0IGRhdGFFbnRyeU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LW1vZGFsXCIpO1xuICAgICAgICBkYXRhRW50cnlNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuICAgIGNvbnN0IGRhdGFFbnRyeUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWVudHJ5LWNsb3NlXCIpO1xuICAgIGRhdGFFbnRyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbiAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xufSk7XG5kZWZpbmUoXCJmaWx0ZXJBbmRTZWFyY2hGdW5cIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJzY3JpcHRcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBzY3JpcHRfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmNsZWFyRmlsdGVyID0gZXhwb3J0cy5SZW5kZXJGaWx0ZXJCb3ggPSBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUgPSBleHBvcnRzLmZpbHRlclRhYmxlID0gZXhwb3J0cy5GaWx0ZXJBcnIgPSB2b2lkIDA7XG4gICAgZXhwb3J0cy5GaWx0ZXJBcnIgPSBbXTtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG4gICAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtaW5wdXQtYm94XCIpO1xuICAgIGNvbnN0IHNraWxsTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGwtbGlzdFwiKTtcbiAgICBjb25zdCBmaWx0ZXJTZWFyY2hCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlci1zZWFyY2gtYm94XCIpO1xuICAgIGNvbnN0IGZpbHRlclRhYmxlID0gKCkgPT4ge1xuICAgICAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5za2lsbC1lbGVtZW50XCIpO1xuICAgICAgICBsZXQgY2hlY2tlZEZpbHRlckFyciA9IFtdO1xuICAgICAgICBpbnB1dHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW07XG4gICAgICAgICAgICBjb25zdCB0cmlhbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZWxlbWVudC5kYXRhc2V0LnNraWxsSWR9YCk7XG4gICAgICAgICAgICBpZiAodHJpYWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBlbGVtZW50LmRhdGFzZXQuc2tpbGxOdW07XG4gICAgICAgICAgICAgICAgY2hlY2tlZEZpbHRlckFyci5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc2VhcmNodmFsdWUgPSBzZWFyY2hCYXIudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IEZpbHRlckFyciA9IHNjcmlwdF8xLmFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgICAgIGlmIChzZWFyY2hCYXIudmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGVsZW0uZnVsbE5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hlY2tlZEZpbHRlckFyci5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIEZpbHRlckFyciA9IEZpbHRlckFyci5maWx0ZXIoKGVsZW0pID0+IGNoZWNrZWRGaWx0ZXJBcnIuZXZlcnkoKGNoZWNrRWxlbSkgPT4gZWxlbS5za2lsbHMuaW5jbHVkZXMoTnVtYmVyKGNoZWNrRWxlbSkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICgwLCBzY3JpcHRfMS50YWJsZUNyZWF0ZSkoRmlsdGVyQXJyKTtcbiAgICB9O1xuICAgIGV4cG9ydHMuZmlsdGVyVGFibGUgPSBmaWx0ZXJUYWJsZTtcbiAgICBjb25zdCBjaGFuZ2VTa2lsbFN0YXRlID0gKHNraWxsSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coc2tpbGxJZCk7XG4gICAgICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtza2lsbElkfWApO1xuICAgICAgICB0ZW1wLmNsaWNrKCk7XG4gICAgICAgICgwLCBleHBvcnRzLmZpbHRlclRhYmxlKSgpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlID0gY2hhbmdlU2tpbGxTdGF0ZTtcbiAgICBza2lsbExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLWVsZW1lbnRcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXQuZGF0YXNldC5za2lsbElkO1xuICAgICAgICAgICAgKDAsIGV4cG9ydHMuY2hhbmdlU2tpbGxTdGF0ZSkoZGF0YXNldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09PSBcIklOUFVUXCIgfHwgdGFyZ2V0LnRhZ05hbWUgPT09IFwiTEFCRUxcIikge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2xvc2VzdCA9IHRhcmdldC5jbG9zZXN0KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IHRhcmdldENsb3Nlc3QuZGF0YXNldC5za2lsbElkO1xuICAgICAgICAgICAgKDAsIGV4cG9ydHMuY2hhbmdlU2tpbGxTdGF0ZSkoZGF0YXNldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBSZW5kZXJGaWx0ZXJCb3ggPSAoKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGZpbHRlclNlYXJjaEJveC52YWx1ZTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgc2NyaXB0XzEuYWN0dWFsRGF0YS5za2lsbC5mb3JFYWNoKChvYmplbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBza2lsbElkID0gb2JqZWxlbS5za2lsbC5zcGxpdChcIiBcIikuam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxOdW0gPSBvYmplbGVtLnNraWxsSUQ7XG4gICAgICAgICAgICBpZiAoc2tpbGxJZC5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBza2lsbExpc3QuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICAgICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGV4cG9ydHMuUmVuZGVyRmlsdGVyQm94ID0gUmVuZGVyRmlsdGVyQm94O1xuICAgIGNvbnN0IGNsZWFyRmlsdGVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICAgICAgc2tpbGwuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbUNoZWNrZWQgPSBlbGVtO1xuICAgICAgICAgICAgaWYgKGVsZW1DaGVja2VkLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtQ2hlY2tlZC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAoMCwgZXhwb3J0cy5maWx0ZXJUYWJsZSkoKTtcbiAgICB9O1xuICAgIGV4cG9ydHMuY2xlYXJGaWx0ZXIgPSBjbGVhckZpbHRlcjtcbiAgICBmaWx0ZXJTZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGV4cG9ydHMuUmVuZGVyRmlsdGVyQm94KTtcbiAgICBjb25zdCBjbGVhckZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItZmlsdGVyLWJ1dHRvblwiKTtcbiAgICBjbGVhckZpbHRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXhwb3J0cy5jbGVhckZpbHRlcik7XG4gICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBleHBvcnRzLmZpbHRlclRhYmxlKTtcbn0pO1xuZGVmaW5lKFwiU29ydEZ1blwiLCBbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCBcInNjcmlwdFwiLCBcImZpbHRlckFuZFNlYXJjaEZ1blwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIHNjcmlwdF8yLCBmaWx0ZXJBbmRTZWFyY2hGdW5fMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLnNvcnRGdW4gPSB2b2lkIDA7XG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuICAgIGNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuICAgIGxldCBkaXJGbGFnID0gMTtcbiAgICAvLyBzb3J0IGZ1bmN0aW9uYWxpdHlcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHNvcnRGdW4gPSAoKSA9PiB7XG4gICAgICAgIGxldCBhcnJheVRvU29ydCA9IHNjcmlwdF8yLmFjdHVhbERhdGEuZW1wbG95ZWU7XG4gICAgICAgIGlmIChmaWx0ZXJBbmRTZWFyY2hGdW5fMS5GaWx0ZXJBcnIubGVuZ3RoICE9PSAwKVxuICAgICAgICAgICAgYXJyYXlUb1NvcnQgPSBmaWx0ZXJBbmRTZWFyY2hGdW5fMS5GaWx0ZXJBcnI7XG4gICAgICAgIGxldCBhcnJUb1JlbmRlciA9IGFycmF5VG9Tb3J0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUxID0gYS5mdWxsTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgbmFtZTIgPSBiLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBsZXQgY29tcGFyaXNvbiA9IDA7XG4gICAgICAgICAgICBpZiAobmFtZTEgPiBuYW1lMikge1xuICAgICAgICAgICAgICAgIGNvbXBhcmlzb24gPSAxICogZGlyRmxhZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5hbWUxIDwgbmFtZTIpIHtcbiAgICAgICAgICAgICAgICBjb21wYXJpc29uID0gLTEgKiBkaXJGbGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmlzb247XG4gICAgICAgIH0pO1xuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgKDAsIHNjcmlwdF8yLnRhYmxlQ3JlYXRlKShhcnJUb1JlbmRlcik7XG4gICAgICAgIGlmIChkaXJGbGFnID09IDEpIHtcbiAgICAgICAgICAgIHNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL2Rvd24tYXJyb3cuc3ZnXCI7XG4gICAgICAgICAgICBkaXJGbGFnID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkaXJGbGFnID0gMTtcbiAgICAgICAgICAgIHNvcnRCdXR0b24uc3JjID0gXCIuLi9hc3NldHMvaW1hZ2VzL3VwLWFycm93LnN2Z1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLnNvcnRGdW4gPSBzb3J0RnVuO1xuICAgIHNvcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV4cG9ydHMuc29ydEZ1bik7XG59KTtcbiIsImRlZmluZShcInRhYmxlQWN0aW9uQnV0dG9uXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmhhbmRsZVRhYmxlQ2xpY2sgPSB2b2lkIDA7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbiAgICBjb25zdCBkYXRhVmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctbW9kYWxcIik7XG4gICAgY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbiAgICBjb25zdCBoYW5kbGVUYWJsZUNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlldy1pbWFnZS1pY29uXCIpKSB7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkYXRhVmlld01vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWwtaW1hZ2UtaWNvblwiKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWwgYnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkYXRhRGVsTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXhwb3J0cy5oYW5kbGVUYWJsZUNsaWNrID0gaGFuZGxlVGFibGVDbGljaztcbn0pO1xuZGVmaW5lKFwic2NyaXB0XCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwidGFibGVBY3Rpb25CdXR0b25cIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCB0YWJsZUFjdGlvbkJ1dHRvbl8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMudGFibGVDcmVhdGUgPSBleHBvcnRzLmFjdHVhbERhdGEgPSB2b2lkIDA7XG4gICAgY29uc3QgYXBpID0gXCJodHRwczovL2hybS1hcHAtMzliZDktZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiO1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGUtYm9keVwiKTtcbiAgICAvL2dlbmVyYWwgdGFibGUgcmVuZGVyaW5nIGZ1bmN0aW9uXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zdCB0YWJsZUNyZWF0ZSA9IChhcnIpID0+IHtcbiAgICAgICAgYXJyLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIGxldCBkZXAgPSBleHBvcnRzLmFjdHVhbERhdGEuZGVwYXJ0bWVudFtvYmplbGVtLmRlcGFydG1lbnQgLSAxXS5kZXBhcnRtZW50TmFtZTtcbiAgICAgICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgKz0gYFxuICAgIDx0ciBjbGFzcz1cImRhdGEtcm93XCI+XG4gICAgICAgIDx0ZD4ke29iamVsZW0uaWR9PC90ZD5cbiAgICAgICAgPHRkPiR7b2JqZWxlbS5mdWxsTmFtZX08L3RkPlxuICAgICAgICA8dGQ+JHtvYmplbGVtLmVtYWlsfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2RlcH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJhY3Rpb24tYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgICAgIDxidXR0b24gIGRhdGEtZW1wLWlkPSAke29iamVsZW0uaWR9PjxpbWcgY2xhc3M9XCJ2aWV3LWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL3ZpZXctaW1nLnN2Z1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInZpZXcgYnV0dG9uIGltYWdlXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGNsYXNzPVwiZWRpdC1pbWFnZS1pY29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9lZGl0LWltZy5zdmdcIlxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJFZGl0IGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbC1pbWFnZS1pY29uXCIgZGF0YS1lbXAtaWQ9JHtvYmplbGVtLmlkfT48aW1nIGNsYXNzPVwiZGVsLWltYWdlLWljb25cIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2RlbC1pbWcuc3ZnXCJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiRGVsZXRlIGJ1dHRvbiBpbWFnZVwiPjwvYnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICAgYDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBleHBvcnRzLnRhYmxlQ3JlYXRlID0gdGFibGVDcmVhdGU7XG4gICAgLy8gZmV0Y2hpbmcgZGF0YSBmcm9tIGZpcmViYXNlIGFuZCBkaXNwbGF5IGl0IGludG8gdGhlIHRhYmxlXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IGZpbGxlbnRyeSA9IChvYmopID0+IHtcbiAgICAgICAgY29uc3Qgc2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG4gICAgICAgICgwLCBleHBvcnRzLnRhYmxlQ3JlYXRlKShvYmouZW1wbG95ZWUpO1xuICAgICAgICAvLyBmaWx0ZXIgc2tpbGwgYnV0dG9uIHNjcmlwdFxuICAgICAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICBjb25zdCBza2lsbE51bSA9IG9iamVsZW0uc2tpbGxJRDtcbiAgICAgICAgICAgIHNraWxsLmlubmVySFRNTCArPSBgIDxkaXYgY2xhc3M9XCJza2lsbC1lbGVtZW50XCIgZGF0YS1za2lsbC1pZD1cIiR7c2tpbGxJZH1cIiBkYXRhLXNraWxsLW51bT1cIiR7c2tpbGxOdW19XCI+XG4gICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgPGxhYmVsIGZvcj1cIiR7c2tpbGxJZH1cIj4gJHtvYmplbGVtLnNraWxsfTwvbGFiZWw+PGJyPlxuPC9kaXY+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vZmlsbCBkZXBhcnRtZW50IGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICAgICAgY29uc3QgZGVwYXJ0bWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVwXCIpO1xuICAgICAgICBkZXBhcnRtZW50LmlubmVySFRNTCA9IGA8b3B0aW9uIHZhbHVlPVwibm9uZVwiIHNlbGVjdGVkIGRpc2FibGVkIGhpZGRlbiA+c2VsZWN0PC9vcHRpb24+YDtcbiAgICAgICAgb2JqLmRlcGFydG1lbnQuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgZGVwYXJ0bWVudC5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLmRlcGFydG1lbnROYW1lfVwiPiR7b2JqZWxlbS5kZXBhcnRtZW50TmFtZX08L29wdGlvbj5gO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gZmlsbCByb2xlIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICAgICAgY29uc3Qgcm9sZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm9sZVwiKTtcbiAgICAgICAgcm9sZS5pbm5lckhUTUwgPSBgPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIiBzZWxlY3RlZCBkaXNhYmxlZCBoaWRkZW4gPnNlbGVjdDwvb3B0aW9uPmA7XG4gICAgICAgIG9iai5yb2xlLmZvckVhY2goKG9iamVsZW0pID0+IHtcbiAgICAgICAgICAgIHJvbGUuaW5uZXJIVE1MICs9IGAgPG9wdGlvbiB2YWx1ZT1cIiR7b2JqZWxlbS5yb2xlfVwiPiR7b2JqZWxlbS5yb2xlfTwvb3B0aW9uPmA7XG4gICAgICAgIH0pO1xuICAgICAgICAvL2ZpbGwgc2tpbGwgaW4gc2tpbGwgc2VsZWN0aW9uIGluIGRhdGEgZW50cnkgbW9kYWxcbiAgICAgICAgY29uc3Qgc2tpbGxTZWxlYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2tpbGxcIik7XG4gICAgICAgIHNraWxsU2VsZWMuaW5uZXJIVE1MID0gYDxvcHRpb24gdmFsdWU9XCJub25lXCIgc2VsZWN0ZWQgZGlzYWJsZWQgaGlkZGVuID5jaG9vc2Ugc2tpbGw8L29wdGlvbj5gO1xuICAgICAgICBvYmouc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgc2tpbGxTZWxlYy5pbm5lckhUTUwgKz0gYCA8b3B0aW9uIHZhbHVlPVwiJHtvYmplbGVtLnNraWxsfVwiPiR7b2JqZWxlbS5za2lsbH08L29wdGlvbj5gO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vZmV0Y2hpbmcgZGF0YSB3aG9sZSBkYXRhIGZyb20gZmlyZWJhc2VcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBjb25zdCBmZXRjaERhdGEgPSBmdW5jdGlvbiAoZmlsbGVudHJ5KSB7XG4gICAgICAgIGZldGNoKGFwaSArIFwiLy5qc29uXCIpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGV4cG9ydHMuYWN0dWFsRGF0YSA9IGRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCBcImRhdGFcIik7XG4gICAgICAgICAgICBmaWxsZW50cnkoZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyLCBcImVycm9yXCIpKTtcbiAgICB9O1xuICAgIGZldGNoRGF0YShmaWxsZW50cnkpO1xuICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZVwiKTtcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFibGVBY3Rpb25CdXR0b25fMS5oYW5kbGVUYWJsZUNsaWNrKTtcbiAgICAvL2Nsb3NlIGRhdGEtdmlldy1tb2RhbFxuICAgIGNvbnN0IGRhdGFWaWV3Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtdmlldy1jbG9zZVwiKTtcbiAgICBkYXRhVmlld0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdCBkYXRhVmlld01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLXZpZXctbW9kYWxcIik7XG4gICAgICAgIGRhdGFWaWV3TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICAgIC8vY2xvc2UgZGF0YS1kZWwtbW9kYWxcbiAgICBjb25zdCBjYW5jZWxEZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbC1kZWwtYnV0dG9uXCIpO1xuICAgIGNhbmNlbERlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29uc3QgZGF0YURlbE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRhLWRlbC1tb2RhbFwiKTtcbiAgICAgICAgZGF0YURlbE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbiAgICAvL0FkZCBlbXBsb3llZSBmdW5jdGlvblxuICAgIGNvbnN0IGFkZEVtcGxveWVlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtZW1wbG95ZWUtYnV0dG9uXCIpO1xuICAgIGFkZEVtcGxveWVlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb25zdCBkYXRhRW50cnlNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1tb2RhbFwiKTtcbiAgICAgICAgZGF0YUVudHJ5TW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhRW50cnlDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0YS1lbnRyeS1jbG9zZVwiKTtcbiAgICBkYXRhRW50cnlDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vdmVybGF5XCIpO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29uc3QgZGF0YUVudHJ5TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGEtZW50cnktbW9kYWxcIik7XG4gICAgICAgIGRhdGFFbnRyeU1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbn0pO1xuZGVmaW5lKFwiZmlsdGVyQW5kU2VhcmNoRnVuXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwic2NyaXB0XCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgc2NyaXB0XzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5jbGVhckZpbHRlciA9IGV4cG9ydHMuUmVuZGVyRmlsdGVyQm94ID0gZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlID0gZXhwb3J0cy5maWx0ZXJUYWJsZSA9IGV4cG9ydHMuRmlsdGVyQXJyID0gdm9pZCAwO1xuICAgIGV4cG9ydHMuRmlsdGVyQXJyID0gW107XG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZS1ib2R5XCIpO1xuICAgIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWlucHV0LWJveFwiKTtcbiAgICBjb25zdCBmaWx0ZXJUYWJsZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudFwiKTtcbiAgICAgICAgbGV0IGNoZWNrZWRGaWx0ZXJBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtO1xuICAgICAgICAgICAgY29uc3QgdHJpYWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW1lbnQuZGF0YXNldC5za2lsbElkfWApO1xuICAgICAgICAgICAgaWYgKHRyaWFsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gZWxlbWVudC5kYXRhc2V0LnNraWxsTnVtO1xuICAgICAgICAgICAgICAgIGNoZWNrZWRGaWx0ZXJBcnIucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNlYXJjaHZhbHVlID0gc2VhcmNoQmFyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBGaWx0ZXJBcnIgPSBzY3JpcHRfMS5hY3R1YWxEYXRhLmVtcGxveWVlO1xuICAgICAgICBpZiAoc2VhcmNoQmFyLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBlbGVtLmZ1bGxOYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrZWRGaWx0ZXJBcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBGaWx0ZXJBcnIgPSBGaWx0ZXJBcnIuZmlsdGVyKChlbGVtKSA9PiBjaGVja2VkRmlsdGVyQXJyLmV2ZXJ5KChjaGVja0VsZW0pID0+IGVsZW0uc2tpbGxzLmluY2x1ZGVzKE51bWJlcihjaGVja0VsZW0pKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAoMCwgc2NyaXB0XzEudGFibGVDcmVhdGUpKEZpbHRlckFycik7XG4gICAgfTtcbiAgICBleHBvcnRzLmZpbHRlclRhYmxlID0gZmlsdGVyVGFibGU7XG4gICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBleHBvcnRzLmZpbHRlclRhYmxlKTtcbiAgICBjb25zdCBjaGFuZ2VTa2lsbFN0YXRlID0gKHNraWxsSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coc2tpbGxJZCk7XG4gICAgICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtza2lsbElkfWApO1xuICAgICAgICB0ZW1wLmNsaWNrKCk7XG4gICAgICAgICgwLCBleHBvcnRzLmZpbHRlclRhYmxlKSgpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jaGFuZ2VTa2lsbFN0YXRlID0gY2hhbmdlU2tpbGxTdGF0ZTtcbiAgICBjb25zdCBza2lsbExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG4gICAgc2tpbGxMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbC1lbGVtZW50XCIpKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gdGFyZ2V0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgICAgICgwLCBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUpKGRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gXCJJTlBVVFwiIHx8IHRhcmdldC50YWdOYW1lID09PSBcIkxBQkVMXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldENsb3Nlc3QgPSB0YXJnZXQuY2xvc2VzdChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0YXJnZXRDbG9zZXN0LmRhdGFzZXQuc2tpbGxJZDtcbiAgICAgICAgICAgICgwLCBleHBvcnRzLmNoYW5nZVNraWxsU3RhdGUpKGRhdGFzZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgUmVuZGVyRmlsdGVyQm94ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBmaWx0ZXJTZWFyY2hCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlci1zZWFyY2gtYm94XCIpO1xuICAgICAgICBsZXQgdmFsdWUgPSBmaWx0ZXJTZWFyY2hCb3gudmFsdWU7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUsIFwic2tpbGwgc2VyYWNoIGJveCB2YWx1ZVwiKTtcbiAgICAgICAgY29uc3Qgc2tpbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNraWxsLWxpc3RcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNraWxsLmlubmVySFRNTCwgXCJza2lsbC1saXN0XCIpXG4gICAgICAgIHNraWxsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHNjcmlwdF8xLmFjdHVhbERhdGEuc2tpbGwuZm9yRWFjaCgob2JqZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2tpbGxJZCA9IG9iamVsZW0uc2tpbGwuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHNraWxsTnVtID0gb2JqZWxlbS5za2lsbElEO1xuICAgICAgICAgICAgaWYgKHNraWxsSWQuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgc2tpbGwuaW5uZXJIVE1MICs9IGAgPGRpdiBjbGFzcz1cInNraWxsLWVsZW1lbnRcIiBkYXRhLXNraWxsLWlkPVwiJHtza2lsbElkfVwiIGRhdGEtc2tpbGwtbnVtPVwiJHtza2lsbE51bX1cIj5cbiAgICAgICAgPGlucHV0ICB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7c2tpbGxJZH1cIiA+XG4gICAgICAgIDxsYWJlbCBmb3I9XCIke3NraWxsSWR9XCI+ICR7b2JqZWxlbS5za2lsbH08L2xhYmVsPjxicj5cbiAgICA8L2Rpdj5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGV4cG9ydHMuUmVuZGVyRmlsdGVyQm94ID0gUmVuZGVyRmlsdGVyQm94O1xuICAgIGNvbnN0IGNsZWFyRmlsdGVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBza2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGwtZWxlbWVudCBpbnB1dFwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2tpbGwpO1xuICAgICAgICBza2lsbC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtQ2hlY2tlZCA9IGVsZW07XG4gICAgICAgICAgICBpZiAoZWxlbUNoZWNrZWQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGVsZW1DaGVja2VkLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICgwLCBleHBvcnRzLmZpbHRlclRhYmxlKSgpO1xuICAgIH07XG4gICAgZXhwb3J0cy5jbGVhckZpbHRlciA9IGNsZWFyRmlsdGVyO1xuICAgIGNvbnN0IGZpbHRlclNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyLXNlYXJjaC1ib3hcIik7XG4gICAgZmlsdGVyU2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBleHBvcnRzLlJlbmRlckZpbHRlckJveCk7XG4gICAgY29uc3QgY2xlYXJGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsZWFyLWZpbHRlci1idXR0b25cIik7XG4gICAgY2xlYXJGaWx0ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV4cG9ydHMuY2xlYXJGaWx0ZXIpO1xufSk7XG5kZWZpbmUoXCJTb3J0RnVuXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwic2NyaXB0XCIsIFwiZmlsdGVyQW5kU2VhcmNoRnVuXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgc2NyaXB0XzIsIGZpbHRlckFuZFNlYXJjaEZ1bl8xKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuc29ydEZ1biA9IHZvaWQgMDtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlLWJvZHlcIik7XG4gICAgbGV0IGRpckZsYWcgPSAxO1xuICAgIGNvbnN0IHNvcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpO1xuICAgIC8vIHNvcnQgZnVuY3Rpb25hbGl0eVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3Qgc29ydEZ1biA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZmlsdGVyQW5kU2VhcmNoRnVuXzEuRmlsdGVyQXJyKTtcbiAgICAgICAgbGV0IGFycmF5VG9Tb3J0ID0gc2NyaXB0XzIuYWN0dWFsRGF0YS5lbXBsb3llZTtcbiAgICAgICAgaWYgKGZpbHRlckFuZFNlYXJjaEZ1bl8xLkZpbHRlckFyci5sZW5ndGggIT09IDApXG4gICAgICAgICAgICBhcnJheVRvU29ydCA9IGZpbHRlckFuZFNlYXJjaEZ1bl8xLkZpbHRlckFycjtcbiAgICAgICAgbGV0IGFyclRvUmVuZGVyID0gYXJyYXlUb1NvcnQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZTEgPSBhLmZ1bGxOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lMiA9IGIuZnVsbE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGxldCBjb21wYXJpc29uID0gMDtcbiAgICAgICAgICAgIGlmIChuYW1lMSA+IG5hbWUyKSB7XG4gICAgICAgICAgICAgICAgY29tcGFyaXNvbiA9IDEgKiBkaXJGbGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmFtZTEgPCBuYW1lMikge1xuICAgICAgICAgICAgICAgIGNvbXBhcmlzb24gPSAtMSAqIGRpckZsYWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAoMCwgc2NyaXB0XzIudGFibGVDcmVhdGUpKGFyclRvUmVuZGVyKTtcbiAgICAgICAgaWYgKGRpckZsYWcgPT0gMSkge1xuICAgICAgICAgICAgLy8gY29uc3Qgc29ydEJ1dHRvbj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpISBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvZG93bi1hcnJvdy5zdmdcIjtcbiAgICAgICAgICAgIGRpckZsYWcgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpckZsYWcgPSAxO1xuICAgICAgICAgICAgLy8gY29uc3Qgc29ydEJ1dHRvbj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnQtYnV0dG9uXCIpISBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICAgICAgc29ydEJ1dHRvbi5zcmMgPSBcIi4uL2Fzc2V0cy9pbWFnZXMvdXAtYXJyb3cuc3ZnXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydHMuc29ydEZ1biA9IHNvcnRGdW47XG4gICAgc29ydEJ1dHRvbi5vbmNsaWNrID0gZXhwb3J0cy5zb3J0RnVuO1xufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2ZpbHRlckFuZFNlYXJjaEZ1bi50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHQudHNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvU29ydEZ1bi50c1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3RhYmxlQWN0aW9uQnV0dG9uLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9