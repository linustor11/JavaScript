// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection'); // ul
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event Listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
   //DOM Load Event
   document.addEventListener('DOMContentLoaded', getTasks);
   //Add Task Event
   form.addEventListener('submit', addTask);
   // Remove Task event
   taskList.addEventListener('click', removeTask);
   // Clear Tasks event
   clearBtn.addEventListener('click', clearTasks);
   // Filter Task events
   filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LS
function getTasks() {
   let tasks;
   if(localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task) {
      const li = document.createElement('li');
      //Add className
      li.className = "collection-item"
      // create textnode and append to li
      const textNode = document.createTextNode(task);
      li.appendChild(textNode);
   
      //Create link Element
      const link = document.createElement('a');
      // Add Class
      link.className = 'delete-item secondary-content';
      //Add icon HTML
      link.innerHTML = '<i class="fa fa-remove"></i>';
      //Append link to li
      li.appendChild(link);
      // console.log(li);
      //Append li to ul
      taskList.appendChild(li);

   });
}

// ADD TASK
function addTask(e) {
   if(taskInput.value === '') {
      alert('Add a task');
   }

   //Create li element
   const li = document.createElement('li');
   //Add className
   li.className = "collection-item"
   // create textnode and append to li
   const textNode = document.createTextNode(taskInput.value);
   li.appendChild(textNode);

   //Create link Element
   const link = document.createElement('a');
   // Add Class
   link.className = 'delete-item secondary-content';
   //Add icon HTML
   link.innerHTML = '<i class="fa fa-remove"></i>';
   //Append link to li
   li.appendChild(link);
   // console.log(li);
   //Append li to ul
   taskList.appendChild(li);

   storeTaskInLocalStorage(taskInput.value);

   //clear Input
   taskInput.value = '';

   // console.log(li);

   e.preventDefault();
}


// Store in LOCAL STORAGE
function storeTaskInLocalStorage(task) {
   let tasks;
   if(localStorage.getItem('tasks') === null ) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}





// Remove Task
function removeTask(e) {
   if(e.target.parentElement.classList.contains('delete-item')) {
      // console.log(e.target.parentElement.parentElement);
      if(confirm('Are you sure?')) {
         e.target.parentElement.parentElement.remove();

         //Remove from LS
         removeFromLocalStorage(e.target.parentElement.parentElement);
      }
      
   }
   
}

//Remove from LS
function removeFromLocalStorage(taskItem) {
   let tasks;
   if(localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task, index) {
      if(taskItem.textContent === task) {
         tasks.splice(index, 1);
      }

   });

   localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Clear Tasks
// Two ways
// 1. innerHTML = '';
// 2. loop through and remove child
function clearTasks(e) {
   // taskList.innerHTML = '';

   // let tasks = taskList.children;
   
   while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
   }

   //Clear Task from LS
   clearTaskFromLocalStorage();
}

//Clear Task from LS
function clearTaskFromLocalStorage() {
   localStorage.clear();
}


// Filter Tasks
function filterTasks(e) {
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach
   (function(task){
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1){
         task.style.display = 'block';
      } else {
         task.style.display = 'none';
      }
   });
   // console.log(text);

}