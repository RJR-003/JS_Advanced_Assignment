// fetch skill form firebase and display it on the filter skill section
///////////////////////////////////////////////////////
import { actualData, filterTable } from "./script";
const skillList = document.querySelector(".skill-list")! as HTMLDivElement;
const filterSearchBox = document.querySelector(
  ".filter-search-box"
)! as HTMLInputElement;
const clearFilterButton = document.querySelector(
  ".clear-filter-button"
)! as HTMLImageElement;

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

clearFilterButton.addEventListener("click", clearFilter);
