const title = document.querySelector("#title");
const description = document.querySelector("#description");
const noteForm = document.querySelector("#noteform");

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(saveId) {
        changeNote(saveId, title.value, description.value);
        saveId ="";
    }
    else {
        saveNote(title.value, description.value);
    }
    title.value = "";
    description.value = "";
})