const api =
  "https://hrm-app-39bd9-default-rtdb.asia-southeast1.firebasedatabase.app";

const fillentry = function (arr) {
  const temp = document.querySelector(".table");
  arr.forEach((obj) => {
    temp.innerHTML += `<tr class="data-row">
    <td>${obj.id}</td>
    <td>${obj.fullname}</td>
    <td>${obj.email}</td>
    <td>${obj.department}</td>
    <td id="action-button-cell">
        <button class="view-image-icon"><img src="assets/images/view-img.svg"
                alt="view button image"></button>
        <button class="edit-image-icon"><img src="assets/images/edit-img.svg"
                alt="Edit button image"></button>
        <button class="del-image-icon"><img src="assets/images/del-img.svg"
                alt="Delete button image"></button>
    </td>
</tr>`
  });
};

const trial = function (fillentry) {
  fetch(api + "/employee.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "data");
      fillentry(data);
    })
    .catch((err) => console.log(err, "error"));
};

trial(fillentry);
