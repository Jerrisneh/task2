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