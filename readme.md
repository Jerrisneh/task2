**Instructions:**

1. **Implement the "Add Task" functionality:**
   - Select the Add Task button using `querySelector`
   - When clicked, create a new task element with the same structure as existing tasks
   - Use `innerHTML` to create the new task's content
   - Add the new task to the task list
   - Clear the input field after adding

2. **Handle Complete/Delete buttons with event delegation:**
   - Add a single event listener to the task list container
   - Use `closest()` to find the parent task element when a button is clicked
   - For Complete buttons:
     - Toggle the 'completed' class on the task element
     - Update the status text to "Completed" or "Pending" using `querySelector` on the task element and `innerHTML`
   - For Delete buttons:
     - Remove the entire task element from the DOM

3. **Other tasks:**
   - Update the completed tasks counter whenever tasks change
   - Use `querySelectorAll` to count completed tasks
   - Update the `completedCount` element's `innerHTML`

**Key Methods to Use:**
- `querySelector` / `querySelectorAll`
- `closest()`
- `innerHTML`
- `classList.toggle()`
- `addEventListener`
- `createElement` / `appendChild` or `insertAdjacentHTML`


**Update your work by adding**
1. an option to show/hide deleted tasks. Deleted tasks should be hidden by default. And then a checkbox should be available on the page. Checking/unchecking the checkbox should show/hide deleted tasks
2. a button that lets you restore a deleted task when the deleted tasks are visible on the page 
3. a search bar at the top that lets you filter through tasks in the list
4. an option to export/download/backup all the tasks(including deleted ones) as a json file.
5. an option to import backed up json files. when a file is imported, your code should look though the data in the json file and use that to reconstruct the task list on the page. So if you created five tasks, download a backup of the 5 tasks, then refresh the page so that the 5 tasks you created have disappeared, you should be able to read those five tasks to the page just by importing the downloaded backup file for the tasks.