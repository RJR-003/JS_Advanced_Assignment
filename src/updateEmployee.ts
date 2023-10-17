import { actualData, originalData, changeSkillName, skillName } from "./script";
import { employee } from "./type";
import { skill } from "./type";
// export let skillName: string[];
const name = document.querySelector("#name")! as HTMLInputElement;
const email = document.querySelector("#email")! as HTMLInputElement;
const dateOfJoin = document.querySelector("#doj")! as HTMLInputElement;
const dataOfBirth = document.querySelector("#dob")! as HTMLInputElement;
const depInput = document.querySelector("#dep")! as HTMLSelectElement;
const roleInput = document.querySelector("#role")! as HTMLSelectElement;
const locInput = document.querySelector("#loc")! as HTMLSelectElement;
const addedSkills = document.querySelector(".added-skills")! as HTMLDivElement;

let updateIndex = 0;
let idOfEmp = 1001;
export const updateEmp = (id: number) => {
  idOfEmp = id;
  let currObj: employee;
  let department: string;

  actualData.employee.forEach((obj: employee) => {
    if (obj.id == id) {
      currObj = obj;
      actualData.department.forEach((obj) => {
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

  let skillNameCopy = actualData.skill.reduce((acc: string[], elem: skill) => {
    if (currObj.skills.includes(elem.skillID)) {
      return [...acc, elem.skill];
    } else return [...acc];
  }, []);
  changeSkillName(skillNameCopy);

  addedSkills.innerHTML = "";
  skillName.forEach((elem) => {
    addedSkills.innerHTML += `
        <div data-rem-id=${elem} class="each-skill-added">
                                ${elem}
                            </div>
        `;
  });

  originalData.employee.forEach((elem, index) => {
    if (elem.id == currObj.id) updateIndex = index;
  });
};

export { updateIndex, idOfEmp };
