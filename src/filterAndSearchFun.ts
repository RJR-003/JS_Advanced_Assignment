// fetch skill form firebase and display it on the filter skill section
///////////////////////////////////////////////////////
import { tableCreate, actualData } from "./script";
import {
  overlay,
  dataViewModal,
  dataDelModal,
  tableBody,
  sortButton,
  searchBar,
  skillList,
  filterSearchBox,
  departmentEntry,
  roleEntry,
  skillSelecEntry,
  dataViewClose,
  cancelDelButton,
  addEmployeeButton,
  dataEntryClose,
  dataEntryModal,
} from "./constants";

export let FilterArr = [];

export const filterTable = () => {
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

export const changeSkillState = (skillId: string) => {
  console.log(skillId);
  const temp = document.querySelector(`#${skillId}`)! as HTMLInputElement;
  temp.click();
  filterTable();
};
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

export const RenderFilterBox = () => {
  let value = filterSearchBox.value;

  value = value.split(" ").join("").toLowerCase();

  skillList.innerHTML = "";
  actualData.skill.forEach((objelem) => {
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

export const clearFilter = () => {
  const skill = document.querySelectorAll(".skill-element input");
  skill.forEach((elem) => {
    const elemChecked = elem as HTMLInputElement;
    if (elemChecked.checked) {
      elemChecked.checked = false;
    }
  });
  filterTable();
};

filterSearchBox.addEventListener("input", RenderFilterBox);
const clearFilterButton = document.querySelector(
  ".clear-filter-button"
)! as HTMLImageElement;

clearFilterButton.addEventListener("click", clearFilter);

searchBar.addEventListener("input", filterTable);
