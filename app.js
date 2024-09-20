//Define UI VARS
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");
//Load all event listeners
loadEventListeners();
//load all the content at initial render
document.addEventListener("DOMContentLoaded", getTasks);
//load all event listeners
function loadEventListeners() {
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //Filter tasks
  filter.addEventListener("input", filterTasks);
}
//Get tasks from the local storage
function getTasks() {
  let tasks;
  if (!localStorage.getItem("tasks")) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task) => {
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //   li.innerHTML = taskInput.value;
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

//Add task
function addTask(event) {
  if (!taskInput.value) alert("Add A Task");
  // Create li element
  else {
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //   li.innerHTML = taskInput.value;
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    //store data to the local storage
    storeTaskInLocalStorage(taskInput.value);
  }

  // Clear input
  taskInput.value = "";
  event.preventDefault();
}
//Store task to local storage
function storeTaskInLocalStorage(task) {
  // console.log(task);
  let tasks;
  //checking the key tasks
  //everything in the local storage will be storage in the form of json.
  if (!localStorage.getItem("tasks")) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.push(task);
  //here the key well be pointing to an array
  //data must be stored in the JSON FORMAT
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(event) {
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?"))
      event.target.parentElement.parentElement.remove();
    //remove task from the local storage
    removeTaskFromLocalStorage(event.target.parentElement.parentElement);
  }
}
//remove task from the local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (!localStorage.getItem("tasks")) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task, idx) => {
    if (taskItem.textContent === task) {
      tasks.splice(idx, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear all tasks
function clearTasks() {
  //slower
  // taskList.innerHTML= "";
  //faster
  while (taskList.firstChild) taskList.removeChild(taskList.firstChild);
  //clear all the content from local storage
  clearTasksFromLocalStorage();
}
//remove tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
//filter the require task
function filterTasks(event) {
  const text = event.target.value.toLowerCase();
  //selecting all li's
  document.querySelectorAll(".collection-item").forEach((task) => {
    //taking the text content
    const item = task.firstChild.textContent;
    //"MOHSIN".indexOf("m") === -1; //m doesn't exist
    if (item.toLowerCase().indexOf(text) !== -1) task.style.display = "block";
    else task.style.display = "none";
  });
}
