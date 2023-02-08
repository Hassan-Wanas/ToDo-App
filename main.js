let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//empty array to store the tasks
let arrayOfTasks = [];

// check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
};

// Trigger get data fromt local storage
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
}

// click on task element
tasksDiv.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  };
  // task done
  if (e.target.classList.contains("task")) {
    //toggle completed task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // toggle done class
    e.target.classList.toggle("done");
  };
});


function  addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElemtentsToPageFrom(arrayOfTasks);
  // Add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
  // For Testing

};

function addElemtentsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  //Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task"
    // check if task is done
    if (task.completed) {
      div.className = "task done"
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"))
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div to tasks container
    tasksDiv.appendChild(div)
  });
}

function  addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let arrayOfTasks = JSON.parse(data)
    addElemtentsToPageFrom(arrayOfTasks)
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function  toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}