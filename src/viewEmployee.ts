import { actualData } from "./script";
import { employee } from "./type";
const nameView = document.querySelector("#nameView")! as HTMLParagraphElement;
const emailView = document.querySelector("#emailView")! as HTMLParagraphElement;
const empIdView = document.querySelector("#empIdView")! as HTMLParagraphElement;
const dojView = document.querySelector("#dojView")! as HTMLParagraphElement;
const dobView = document.querySelector("#dobView")! as HTMLParagraphElement;
const depView = document.querySelector("#depView")! as HTMLParagraphElement;
const roleView = document.querySelector("#roleView")! as HTMLParagraphElement;
const locView = document.querySelector("#locView")! as HTMLParagraphElement;
const imgView = document.querySelector(".img")! as HTMLImageElement;
const viewSkillBox = document.querySelector(
  ".view-skill-box"
)! as HTMLDivElement;

export const viewModal = (id: number) => {
  let viewObj: employee;
  let department: string;
  actualData.employee.forEach((elem) => {
    if (elem.id == id) {
      viewObj = elem;
      actualData.department.forEach((obj) => {
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

  let eachSkill = actualData.skill.reduce((acc: string[], elem) => {
    if (viewObj.skills.includes(elem.skillID)) {
      return [...acc, elem.skill];
    } else return [...acc];
  }, []);

  viewSkillBox.innerHTML = "";
  eachSkill.forEach((elem) => {
    viewSkillBox.innerHTML += `
        <div class="each-skill-view">${elem}</div>
        `;
  });
};
