var taskCompletedIcons = document.getElementsByClassName('task-completed-icon');
var taskEditIcons = document.getElementsByClassName('task-edit-icon');
var taskDeleteIcons = document.getElementsByClassName('task-delete-icon');

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

for(var i = 0; i < taskEditIcons.length; i++) {
  taskEditIcons[i].addEventListener('mouseover', function(){
    this.classList.add('text-info');
  });
  taskEditIcons[i].addEventListener('mouseout', function(){
    this.classList.remove('text-info');
  });
}

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

