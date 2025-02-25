
// Task 1: Add click handler to Add Task button
// - Use querySelector to find the button
// - When clicked:
//   - Get input value
//   - Create new task element with same structure as existing tasks
//   - Add to taskList
//   - Clear input


let addTaskBtn =  document.querySelector("#addTask");
let taskInput =  document.querySelector("#newTask");
let taskList =  document.querySelector("#taskList");

let completedCount = document.querySelector("#completedCount");

let taskManager = document.querySelector("#taskManager");


let dynamic = document.querySelector("#dynamicElement");
const searchInput = document.createElement("input");
searchInput.innerHTML = `<input type="text" placeholder="Search tasks" id="searchTask">`;
dynamic.appendChild(searchInput);

// backup button
const exportBtn = document.createElement("button");
exportBtn.id = "exportBtn";
exportBtn.innerHTML = "Backup Tasks";
dynamic.appendChild(exportBtn);

// import button
const importBtn = document.createElement("button");
importBtn.id = "importBtn";
importBtn.innerText = "Import Tasks"
dynamic.appendChild(importBtn);

// imported file input

const fileInput = document.createElement("input");
fileInput.type="file";
fileInput.accept=".json"
fileInput.style.display = "none"; //hidden until needed
dynamic.appendChild(fileInput);

let tasks = [];

function renderTasks(){
    taskList.innerHTML = "";
    let searchQuery = searchInput.value.toLowerCase();
    tasks.forEach((task, index) => {
        if(!task.text.toLowerCase().includes(searchQuery)) return; //filter based on search input
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if(task.completed) taskElement.classList.add("completed");
        if(task.deleted) taskElement.classList.add("deleted");
        
        const li = document.createElement("li");
        li.textContent = task.name;
        const deleteButton = document.createElement("button");
        deleteButton.textContent ="Delete";
        deleteButton.addEventListener("click", ()=>{
            tasks.splice(index, 1);
            renderTasks();
        })
        

// 2. a button that lets you restore a deleted task when the deleted tasks are visible on the page 

        taskElement.innerHTML = `
        <span>${task.text}</span>
        <div class="controls">
            <button class="complete">${task.completed ? "Undo" : "Complete"}</button>
            <button class="delete">Delete</button>
            ${task.deleted ? '<button class="restore">Restore</button>' : ''}
        </div>
        <div class="status">Status: ${task.completed ? "Completed" : "Pending"}</div> 
        `;

        taskElement.dataset.index = index;
        taskList.appendChild(taskElement);
    });
    updateCompletedCount();
    toggleDeletedVisibility();
}

addTaskBtn.addEventListener("click", function (){
    // getting input value
    let taskText = taskInput.value.trim();

    // if(taskText){
    //     tasks.push({name: taskText});
    //     taskInput.value="";
    //     renderTasks();
    // }

    if (!taskText) return;

    tasks.push({ text: taskText, completed: false, deleted: false});
    renderTasks();

    taskInput.value = "";

});



// Task 2: Add event delegation for Complete/Delete buttons
// - Use closest() to find parent task element
// - For Complete button:
//   - Toggle 'completed' class on task
//   - Update status text using querySelector on the task element
// - For Delete button:
//   - Remove the task element



taskList.addEventListener("click", function (event){
    let button = event.target;
    let taskElement = button.closest(".task");

    if(!taskElement) return;

    index = taskElement.dataset.index;
    if(button.classList.contains("complete")){
       tasks[index].completed = !tasks[index].completed;
    }
    if(button.classList.contains("delete")){
        tasks[index].deleted = true;
    }
    if(button.classList.contains("restore")){
        tasks[index].deleted = false;
    }
    renderTasks();
});

    function updateCompletedCount(){
        completedCount.innerHTML = tasks.filter(task => task.completed).length;
    }
    let  checkboxLabel = document.createElement("label");
    checkboxLabel.innerHTML = `<input type="checkbox" id="toggleDeleted"> Show Deleted Tasks`;
    taskManager.insertBefore(checkboxLabel, taskList);
    
    let toggleDeletedCheckbox = document.querySelector("#toggleDeleted");
    function toggleDeletedVisibility(){
        document.querySelectorAll(".task.deleted").forEach(task => {
            task.style.display = toggleDeletedCheckbox.checked ? "block" : "none";
        });
    }

    toggleDeletedCheckbox.addEventListener("change", toggleDeletedVisibility);
    searchInput.addEventListener("input", renderTasks); // filters tasks as the user types

// Export function (backup)
    function backupTasks(){
        const jsonData = JSON.stringify(tasks, null, 4);
        const blob = new Blob([jsonData], {type: "application/json"});
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "tasks_backup.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    exportBtn.addEventListener("click", backupTasks);
// import function (restore file input)








    importBtn.addEventListener("click", function (){
        fileInput.click()//opens the file selection dialogue
    });

    fileInput.addEventListener("change", function (){
        if(!fileInput.files || fileInput.files.length === 0){
            alert("No file selected");
            return;
        }



        const file = fileInput.files[0];
        const fileURL = URL.createObjectURL(file);

        fetch(fileURL)
        .then(response => response.json())
        .then(importedTasks => {
            if(Array.isArray(importedTasks)){
                
            }
            const validTasks =  importedTasks.every(task =>
                typeof task.text === "string" &&
                typeof task.completed === "boolean" &&
                typeof task.deleted === "boolean" 
            );

            if(!validTasks){
                throw new Error("Invalid tasks data format");
            }

                tasks = importedTasks;
                renderTasks();
                alert("Tasks successfully restored!");
                URL.revokeObjectURL(fileURL);
        })
        .catch(error => {
                alert("Invalid tasks data format");
            });
     
    });

    


// Bonus Task: Update completed tasks counter
// - Use querySelectorAll to count completed tasks
// - Update completedCount element's innerHTML



// updating...
// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/*
1. an option to show/hide deleted tasks. Deleted tasks should be hidden by default. And then a checkbox should be available on the page. Checking/unchecking the checkbox should show/hide deleted tasks
2. a button that lets you restore a deleted task when the deleted tasks are visible on the page 
3. a search bar at the top that lets you filter through tasks in the list
4. an option to export/download/backup all the tasks(including deleted ones) as a json file.
5. an option to import backed up json files. when a file is imported, your code should look though the data in the json file and use that to reconstruct the task list on the page. So if you created five tasks, download a backup of the 5 tasks, then refresh the page so that the 5 tasks you created have disappeared, you should be able to read those five tasks to the page just by importing the downloaded backup file for the tasks.
*/