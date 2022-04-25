import express from "express";
import http, { Server } from "http";
import {Server as WebSocketServer} from "socket.io";
const path = require("path");
import { v4 as uuid } from "uuid"

let notes = [];
const app = express();
const server = http.createServer(app); //Creamos un servidor y le pasamos las propiedades de la app de express.
const io = new WebSocketServer(server); //Creamos nuestro websocket y le pasamos el servidor inicializado.

app.set("port", 3000);

app.use(express.static(path.resolve(__dirname, "public")))

io.on("connection", (socket) => {
    console.log("New Connection", socket.id);
    io.emit("server:loadNotes", notes); //Envío las notas ya guardadas para que se muestren en pantalla.
    socket.on("client:newnote", (newNote) => {
        const note = {...newNote, id: uuid()} //..newNorte significa que quiero todos los datos dentro del array
        notes.push(note);
        io.emit("server:newnote", note);
    })
    socket.on("client:deleteNote", (id) => {
        notes = notes.filter(note => note.id != id);
        io.emit("server:loadNotes", notes);
    })
    socket.on("client:updateNote", (id) => {
        const note = notes.find(note => note.id == id);
        socket.emit("server:updateNote", note);
    })
    socket.on("client:changeNote", (updateNote) => {
        notes = notes.map((note) => {
            if(note.id === updateNote.id) {
                note.title = updateNote.title;
                note.description = updateNote.description;
            }
            return note;
        })
        io.emit("server:loadNotes", notes);
        })
})

server.listen(app.get("port"), () => {
    console.log("Server on port: ", app.get("port"))
})