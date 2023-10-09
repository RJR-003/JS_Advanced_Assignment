// fetch skill form firebase and display it on the filter skill section 
///////////////////////////////////////////////////////
const changeSkillState = (skillId) => {
    console.log(skillId);
    const temp = document.querySelector(`#${skillId}`);
    temp.click();
}
document.querySelector(".skill-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("skill-element")) {
        changeSkillState(e.target.dataset.skillId)
    }
})
