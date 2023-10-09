export const handleTableClick = (e) => {
    console.log(e.target.tagName);
    if (e.target.classList.contains("view-image-icon")) {
        console.log("hi");
        document.querySelector(".overlay").style.display = "block";
        document.querySelector(".data-view-modal").style.display = "block";
    }
    if (e.target.classList.contains("del-image-icon")) {
        console.log("del button clicked");
        document.querySelector(".overlay").style.display = "block";
        document.querySelector(".data-del-modal").style.display = "block"
    }
}
