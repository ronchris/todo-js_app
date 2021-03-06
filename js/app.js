//Add TODO date for user
var addTimeStamp = function () {
  var timeStampBox = document.getElementsByTagName("div")[1];
  var myTodoDate = document.createElement("span");
  var d = new Date ();

  timeStampBox.appendChild(myTodoDate);
  myTodoDate.innerText = d;
  console.log(d);
}

addTimeStamp();

//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks                                              
var addItemBox = document.getElementsByTagName("p")[0]; //first p tag and add item box

//New Task List Item
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");

  //Each element needs modifiying
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Add a new task
var addTask = function() {
  console.log("Add task...");
  //When the button is pressed
  addButton.onclick

  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  var requireMsg = document.createElement("p");
  var hasRequireMsg = document.getElementsByTagName("p")[1];

  //Append listItem to incompleteTasksHolder 
  if (taskInput.value !== "" && hasRequireMsg == null){
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  } else if (taskInput.value !== "" && hasRequireMsg) {
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
    addItemBox.removeChild(hasRequireMsg);
    console.log("Removing require message...");
  } else if (taskInput.value == "" && hasRequireMsg) {
    console.log("Item still not added and require message already exists...");
  } else {
    addItemBox.appendChild(requireMsg);
    requireMsg.innerText = "Please add item";
    requireMsg.style.color = "red";
    console.log("Please add item...");
  }
}

//Edit an existing task
var editTask = function() {
  console.log("Edit task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode")
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text becomes the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }

  //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

//Mark a Task as complete
var taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task incomplete...");
  //Append the task list item to the #incompleted-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler; 
}

var ajaxRequest = function() {
  console.log("AJAX request...");
}

//Set the click handler to the addTask function
// addButton.onclick = addTask;

//Set multiple click handlers to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//Set press ENTER handler to the taskInput field
taskInput.addEventListener('keyup', function (event) {
  //check to see if the ENTER key was pressed
  if (event.which === 13) {
    //if so, run the addTask function
    addTask();
  } 
});

// //Set press ENTER handler to the editInput field
// editInput.addEventListener('keyup', function (event) {
//   //check to see if the ENTER key was pressed
//   if (event.which === 13) {
//     //if so, run the editTask function
//     editTask();
//   } 
// });

//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completeTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
