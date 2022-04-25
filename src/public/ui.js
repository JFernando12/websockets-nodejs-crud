const notesList = document.querySelector("#notes");
let saveId;
const NoteUi = note => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-body rounded-0 mb-2 animate__animated animate__bounceInLeft">
        <div class="d-flex justify-content-between">
            <h1>${note.title}</h1>
            <div>
                <button class="btn btn-danger delete" data-id=${note.id}>Delete</button>
                <button class="btn btn-secondary update" data-id=${note.id}>Update</button>
            </div>
        </div>
        <p>${note.description}</p>
    </div>
    `
    const btnDelete = div.querySelector(".delete"); //selecciono la clase dentro del div.
    btnDelete.addEventListener("click", () => {
        deleteNote(btnDelete.dataset.id);
    })

    const btnUpdate = div.querySelector(".update"); //selecciono la clase dentro del div.
    btnUpdate.addEventListener("click", () => {
        updateNote(btnUpdate.dataset.id);
    })

    return div;
}

const renderNotes = notes => {
    notesList.innerHTML = "";
    notes.forEach(note => {
        notesList.append(NoteUi(note)); //Agregamos el nuevo div creado al div que ya existe en el index.html
    });
}

const appendNote = (note) => {
    notesList.append(NoteUi(note)); //Agregamos el nuevo div creado al div que ya existe en el index.html.
}

const showNote = (note) => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");

    title.value = note.title;
    description.value = note.description;

    saveId = note.id
}