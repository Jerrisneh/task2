
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


addTaskBtn.addEventListener("click", function (){
    // getting input value
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    // creating new task element
    let taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskElement.innerHTML = 
    `<span>${taskText}</span> 
    <div class="controls">
        <button class="complete">Complete</button>
        <button class="delete">Delete</button>
    </div>
    <div class="status">Status: Pending</div>
    `;
    taskList.appendChild(taskElement);
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

    if(button.classList.contains("complete")){
        taskElement.classList.toggle("completed");
        let statusElement = taskElement.querySelector(".status");
        statusElement.innerHTML = taskElement.classList.contains("completed") 
        ? "Status: Completed" 
        : "Status: Pending";

        updateCompletedCount();
    }
    if(button.classList.contains("delete")){
        taskElement.remove();
        updateCompletedCount();
    }
});

// Bonus Task: Update completed tasks counter
// - Use querySelectorAll to count completed tasks
// - Update completedCount element's innerHTML


let completedCount = document.querySelector("#completedCount");
function updateCompletedCount(){
    let completedTasks = document.querySelectorAll(".task.completed").length;
    completedCount.innerHTML = completedTasks;
}




