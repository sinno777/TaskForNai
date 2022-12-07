// Import oj
import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";
// New list
let todoList = new ToDoList();
let completeList = new ToDoList();

// Helpers function
function getEle(id) {
    return document.getElementById(id);
}

// Handler addTodo
const addTodo = () => {
    let contentTodo = getEle("newTask").value;
    let ulTodo = getEle("todo");

    if (contentTodo != "") {
        let td = new ToDo(contentTodo, "todo");
        todoList.addTodo(td);
    }
    // console.log(todoList.tdList);
    showListTodo(ulTodo);
    getEle("newTask").value = "";
}

getEle("addItem").addEventListener("click", () => {
    addTodo();
});

// Handler show List Todo
const showListTodo = (ulTodo) => {
    ulTodo.innerHTML = todoList.rederTodo();
}

const showCompleteList = (ulComplete) => {
    ulComplete.innerHTML = completeList.rederTodo();
}

// Handler delete todo
const removeTodo = (event) => {
    // Get index so that remove todo
    let tdIndex = event.currentTarget.getAttribute("data-index");
    let status = event.currentTarget.getAttribute("data-status");
    let ulComplete = getEle("completed");
    let ulTodo = getEle("todo");

    // ReShow todo list
    if (status == "todo") {
        todoList.removeTodo(tdIndex);
        showListTodo(ulTodo);
    } else if (status == "completed") {
        completeList.removeTodo(tdIndex);
        showCompleteList(ulComplete);
    } else alert("Non removeTodo");

}
window.removeTodo = removeTodo;

// Handler complete todo
const completeTodo = (event) => {
    let tdIndex = event.currentTarget.getAttribute("data-index");
    let status = event.currentTarget.getAttribute("data-status");
    let ulTodo = getEle("todo");
    let ulComplete = getEle("completed");


    if (status == "todo") {
        // Just get one item
        let completeItem = todoList.tdList.slice(tdIndex, tdIndex + 1);
        // console.log(completeItem);
        let ojTodo = new ToDo(completeItem[0].txtTodo, "completed");
        moveTodo(todoList, completeList, ojTodo, tdIndex);
        showListTodo(ulTodo);
        showCompleteList(ulComplete);
    } else if (status == "completed") {
        // Just get one item
        let undoItem = completeList.tdList.slice(tdIndex, tdIndex + 1);
        // console.log(completeItem);
        let ojTodo = new ToDo(undoItem[0].txtTodo, "todo");
        moveTodo(completeList, todoList, ojTodo, tdIndex);
        showListTodo(ulTodo);
        showCompleteList(ulComplete);
    } else {
        alert("Unknown");
    }
}

window.completeTodo = completeTodo;

// Move todo
const moveTodo = (depart, arrival, oj, index) => {
    // B1: removeTodo from depart
    depart.removeTodo(index);

    // B2: addTodo to arrival
    arrival.addTodo(oj);
}

// Sort
const sortASC = ()=> {
    let ulTodo = getEle("todo");
    todoList.sortTodo(true);
    showListTodo(ulTodo);
}
const sortDES = ()=> {
    let ulTodo = getEle("todo");
    todoList.sortTodo(false);
    showListTodo(ulTodo);
}

window.sortASC = sortASC;
window.sortDES = sortDES;