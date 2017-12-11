//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Add events
loadeventListeners();

function loadeventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)

    //Add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask);

    //remove all tasks event
    clearBtn.addEventListener('click', clearTasks)

    // filter tasks
    filter.addEventListener('keyup', filterTasks);
}
// Get Tasks from the Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';

        //create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create delete link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';

        //append link to li
        li.appendChild(link);

        //append li to ul
        // console.log(li);
        taskList.appendChild(li);
    })
}

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === '') {
        alert('Add task')
    }

    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create delete link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append li to ul
    // console.log(li);
    taskList.appendChild(li);

    //store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';



}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//remove task
function removeTask(e) {
    e.preventDefault();
    // console.log(e.target);
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();

            //remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }

    }

}
//Remove item from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    // console.log(taskItem);

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function clearTasks() {
    //1st way to clear 
    // taskList.innerHTML = '';

    //2nd way (faster)
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // taskList.remove();

    //Clear all tasks from Local Storage
    clearTasksFromLocalStorage();
}

//Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    // e.preventDefault();
    const textFilterInput = e.target.value.toLowerCase();
    // console.log(textFilterInput);
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(textFilterInput) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    })
}