export class ToDoList {
    constructor() {
        this.tdList = [];
    }

    addTodo(todo) {
        this.tdList.push(todo);
    }

    removeTodo(index) {
        this.tdList.splice(index, 1);
    }

    rederTodo() {
        let content = "";
        content = this.tdList.reduceRight((tdContent, todo, index) => {
            tdContent += `
            <li>
                <span>${todo.txtTodo}</span>
                <div class = "buttons">
                    <button class = "remove" data-index = "${index}" data-status = "${todo.status}" onclick = "removeTodo(event)">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class = "complete" data-index = "${index}" data-status = "${todo.status}" onclick = "completeTodo(event)" >
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
            `;
            return tdContent;
        }, ''); // declare default for tdContent
        return content;
    }

    sortTodo(isDes){
        this.tdList.sort((todo, nextTodo) => {
            const textTF_1 = todo.txtTodo.toLowerCase();
            const textTF_2 = nextTodo.txtTodo.toLowerCase();

            // default is ascending
            return textTF_1.localeCompare(textTF_2);
        });
        if (isDes) this.tdList.reverse();
    }
}