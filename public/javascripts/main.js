// TASKS INDEX PAGE FUNCTIONS
var taskCompletedIcons = document.getElementsByClassName('task-completed-icon');
var taskEditIcons = document.getElementsByClassName('task-edit-icon');
var taskDeleteIcons = document.getElementsByClassName('task-delete-icon');
var taskItems = document.getElementsByClassName('task-item');


// Add/remove Bootstrap 'text-success' class on the check icon.
for(var i = 0; i < taskCompletedIcons.length; i++) {
  taskCompletedIcons[i].addEventListener('mouseover', function(){
    this.classList.add('text-success');
  });
  taskCompletedIcons[i].addEventListener('mouseout', function(){
    this.classList.remove('text-success');
  });

  // On click, this submits the parent form——setting completed to true.
  taskCompletedIcons[i].addEventListener('click', function(){
    this.parentNode.submit();
  });
}

// Add/remove Bootstrap 'text-warning' class on the edit icon.
for(var i = 0; i < taskEditIcons.length; i++) {
  taskEditIcons[i].addEventListener('mouseover', function(){
    this.classList.add('text-warning');
  });
  taskEditIcons[i].addEventListener('mouseout', function(){
    this.classList.remove('text-warning');
  });
}

// Add/remove Bootstrap 'text-danger' class on the delete icon.
for(var i = 0; i < taskDeleteIcons.length; i++) {
  taskDeleteIcons[i].addEventListener('mouseover', function(){
    this.classList.add('text-danger');
  });
  taskDeleteIcons[i].addEventListener('mouseout', function(){
    this.classList.remove('text-danger');
  });

  // On click, this submits the parent form——deleting the task.
  taskDeleteIcons[i].addEventListener('click', function(){
    this.parentNode.submit();
  });
}

// Add/remove class that highlights a task item on the list when hovered over.
for(var i = 0; i < taskItems.length; i++) {
  taskItems[i].addEventListener('mouseover', function(){
    this.classList.add('task-item-highlight');
  });
  taskItems[i].addEventListener('mouseout', function(){
    this.classList.remove('task-item-highlight');
  });
}

// SHOW PAGE JS
var taskCompleteButton = document.getElementById('taskCompleteButton');
var taskDeleteButton = document.getElementById('taskDeleteButton');

// The next two functions submit forms on click.
// Sets a task's 'completed' property to true.
if(taskCompleteButton) {
  taskCompleteButton.addEventListener('click', function(){
    this.parentNode.submit();
  });
}

// Removes a task from the database.
if(taskCompleteButton) {
  taskDeleteButton.addEventListener('click', function(){
    this.parentNode.submit();
  });
}

// Go back to previous page in browser history.
function goBack() {
  window.history.back();
}
