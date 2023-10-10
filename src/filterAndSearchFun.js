// fetch skill form firebase and display it on the filter skill section 
///////////////////////////////////////////////////////
import { tableCreate, actualData } from "./script.js";

export let FilterArr = [];

const tableBody = document.querySelector(".table-body");
const searchBar = document.querySelector(".search-input-box");

const filterTable = () => {
    let inputs = document.querySelectorAll('.skill-element');
    let checkedFilterArr = [];
    inputs.forEach((elem) => {
        if (elem.querySelector(`#${elem.dataset.skillId}`).checked) {
            checkedFilterArr.push(elem.dataset.skillNum);
        }
    })

    const searchvalue = searchBar.value.toLowerCase()

    FilterArr = actualData.employee

    if (searchBar.value !== "") {
        FilterArr = FilterArr.filter(elem => elem.fullName.trim().toLowerCase().includes(searchvalue))
    }

    if (checkedFilterArr.length !== 0) {
        FilterArr = FilterArr.filter(elem =>
            checkedFilterArr.every(checkElem =>
                elem.skills.includes(Number(checkElem))
            )
        )
    }
    tableBody.innerHTML = "";
    tableCreate(FilterArr);
}

searchBar.addEventListener("input", filterTable)


const changeSkillState = (skillId) => {
    console.log(skillId);
    const temp = document.querySelector(`#${skillId}`);
    temp.click();
    filterTable();
}

document.querySelector(".skill-list").addEventListener("click", (e) => {

    if (e.target.classList.contains("skill-element")) {
        changeSkillState(e.target.dataset.skillId)
    }

    if (e.target.tagName === "INPUT" || e.target.tagName === "LABEL") {
        changeSkillState(e.target.closest("div").dataset.skillId)
    }

})


const RenderFilterBox = () => {
    let value = document.querySelector(".filter-search-box").value;

    value = value.split(" ").join("").toLowerCase();
    // console.log(value, "skill serach box value");

    const skill = document.querySelector(".skill-list");
    // console.log(skill.innerHTML, "skill-list")
    skill.innerHTML = "";
    actualData.skill.forEach((objelem) => {
        const skillId = objelem.skill.split(" ").join("").toLowerCase();
        const skillNum = objelem.skillID;
        if (skillId.includes(value)) {
            skill.innerHTML += ` <div class="skill-element" data-skill-id="${skillId}" data-skill-num="${skillNum}">
        <input  type="checkbox" id="${skillId}" >
        <label for="${skillId}"> ${objelem.skill}</label><br>
    </div>`;
        }
    });

}

const clearFilter = () => {
    const skill = document.querySelectorAll(".skill-element input");
    // console.log(skill);
    skill.forEach(elem => elem.checked = false)
    filterTable();
}

document.querySelector(".filter-search-box").addEventListener("input", RenderFilterBox);
document.querySelector(".clear-filter-button").addEventListener("click", clearFilter);