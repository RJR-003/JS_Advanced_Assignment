import { actualData, tableCreate } from "./script.js"

const tableBody = document.querySelector(".table-body");


let dirFlag = 1;
let FilterArr = [];



///search bar functionality
//////////////////////////
const searchBar = document.querySelector(".search-input-box");
searchBar.addEventListener("input", (e) => {
    let searchVal = e.target.value.trim().toLowerCase();
    console.log(searchVal, "searchval")
    const filteredData = actualData.employee.filter(elem => elem.fullName.trim().toLowerCase().includes(searchVal))
    console.log(filteredData, "filteredData");
    FilterArr = filteredData;
    tableBody.innerHTML = "";
    tableCreate(filteredData);

})



// sort functionality
//////////////////////////////////////
const sortFun = () => {
    console.log(FilterArr);
    let arrayToSort = actualData.employee;
    if (FilterArr.length !== 0) arrayToSort = FilterArr

    let arrToRender = arrayToSort.sort((a, b) => {
        const name1 = a.fullName.toLowerCase();
        const name2 = b.fullName.toLowerCase();

        let comparison = 0;

        if (name1 > name2) {
            comparison = 1 * dirFlag;
        } else if (name1 < name2) {
            comparison = -1 * dirFlag;
        }
        return comparison;
    });
    tableBody.innerHTML = "";
    tableCreate(arrToRender);
    if (dirFlag == 1) {
        document.querySelector(".sort-button").src = "../assets/images/down-arrow.svg";
        dirFlag = -1;
    }
    else {
        dirFlag = 1;
        document.querySelector(".sort-button").src = "../assets/images/up-arrow.svg";
    }
}

document.querySelector(".sort-button").onclick = sortFun;
