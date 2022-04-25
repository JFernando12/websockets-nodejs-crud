const socket = io();

const saveNote = (title, description) => {
    socket.emit("client:newnote", {
        title,
        description
    })
}

const changeNote = (id, title, description) => {
    socket.emit("client:changeNote", {
        id,
        title,
        description
    })
}

const deleteNote = (id) => {
    socket.emit("client:deleteNote", id);
}

const updateNote = (id) => {
    socket.emit("client:updateNote", id)
}

socket.on("server:newnote", appendNote);
socket.on("server:loadNotes", renderNotes);
socket.on("server:updateNote", showNote);