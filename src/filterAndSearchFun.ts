// fetch skill form firebase and display it on the filter skill section
///////////////////////////////////////////////////////
import { tableCreate, actualData } from "./script.ts";

export let FilterArr = [];

const tableBody = document.querySelector(".table-body")! as HTMLTableElement;
const searchBar = document.querySelector(
  ".search-input-box"
)! as HTMLInputElement;

const filterTable = () => {
  let inputs = document.querySelectorAll(".skill-element")! as NodeList;
  let checkedFilterArr: string[] = [];
  inputs.forEach((elem) => {
    const element = elem as HTMLInputElement;
    const trial = element.querySelector(
      `#${element.dataset.skillId}`
    )! as HTMLInputElement;
    if (trial.checked) {
      const dataset = element.dataset.skillNum as string;
      checkedFilterArr.push(dataset);
    }
  });

  const searchvalue = searchBar.value.toLowerCase();

  let FilterArr = actualData.employee;

  if (searchBar.value !== "") {
    FilterArr = FilterArr.filter(
      (elem: {
        id: number;
        fullName: string;
        email: string;
        dateOfJoining: string;
        dateOfBirth: string;
        department: number;
        role: number;
        skills: number[];
        workLocation: string;
        ContactNum: string;
      }) => elem.fullName.trim().toLowerCase().includes(searchvalue)
    );
  }

  if (checkedFilterArr.length !== 0) {
    FilterArr = FilterArr.filter(
      (elem: {
        id: number;
        fullName: string;
        email: string;
        dateOfJoining: string;
        dateOfBirth: string;
        department: number;
        role: number;
        skills: number[];
        workLocation: string;
        ContactNum: string;
      }) =>
        checkedFilterArr.every((checkElem) =>
          elem.skills.includes(Number(checkElem))
        )
    );
  }
  tableBody.innerHTML = "";
  tableCreate(FilterArr);
};

searchBar.addEventListener("input", filterTable);

const changeSkillState = (skillId: string) => {
  console.log(skillId);
  const temp = document.querySelector(`#${skillId}`)! as HTMLInputElement;
  temp.click();
  filterTable();
};
const skillList = document.querySelector(".skill-list")! as HTMLDivElement;
skillList.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("skill-element")) {
    const dataset = target.dataset.skillId as string;
    changeSkillState(dataset);
  }

  if (target.tagName === "INPUT" || target.tagName === "LABEL") {
    const targetClosest = target.closest("div")! as HTMLDivElement;
    const dataset = targetClosest.dataset.skillId as string;
    changeSkillState(dataset);
  }
});

const RenderFilterBox = () => {
  const filterSearchBox = document.querySelector(
    ".filter-search-box"
  )! as HTMLInputElement;
  let value = filterSearchBox.value;

  value = value.split(" ").join("").toLowerCase();
  // console.log(value, "skill serach box value");

  const skill = document.querySelector(".skill-list")! as HTMLDivElement;
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
};

const clearFilter = () => {
  const skill = document.querySelectorAll(".skill-element input");
  // console.log(skill);
  skill.forEach((elem) => {
    const elemChecked = elem as HTMLInputElement;
    if (elemChecked.checked) {
      elemChecked.checked = false;
    }
  });
  filterTable();
};

const filterSearchBox = document.querySelector(
  ".filter-search-box"
)! as HTMLInputElement;

filterSearchBox.addEventListener("input", RenderFilterBox);
const clearFilterButton = document.querySelector(
  ".clear-filter-button"
)! as HTMLImageElement;

clearFilterButton.addEventListener("click", clearFilter);
