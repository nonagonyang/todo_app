// Part 2
// Now that you have a functioning todo app,
// save your todos in localStorage!
// Make sure that when the page refreshes,
// the todos on the page remain there.
const ul = document.querySelector("ul");
const form = document.querySelector("form");
let toDos = loadFromLocalStorage();


//create an array object that can be saved to localStorage
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const newToDoInput = document.querySelector("#newToDo");
  //if localStorage has content, push the new input into the array
  if (toDos){
    toDos.push({task: newToDoInput.value,
                done: false,
            });
  }
  // if localstorage is empty, create the first object in this array
  else{
    toDos = [{
          task: newToDoInput.value,
          done: false,
        },];
  }
  saveToLocalStorage(toDos);
  renderToDos();
  form.reset();
});


//here todos is the key to access all the todos saved to localstorage
//newToDo is an array, within the array there are objects in the formate of [key(task); status(done)]
function saveToLocalStorage(newToDo) {
  localStorage.setItem("todos", JSON.stringify(newToDo));
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem("todos"));
}



//take input and append each input and its status within the <ul></ul>
function renderToDos() {
//   let toDos = loadFromLocalStorage();
  ul.innerHTML = "";
  for(todo of toDos){
    // Checkbox (when clicked will cross out the text)
    const newCheckBox = document.createElement("input");
    newCheckBox.setAttribute("type", "checkbox");
    // task
    const newLi = document.createElement("li");
    // Remove Button (when clicked will remove entire todo)
    const newRemoveBtn = document.createElement("button");

    // todo is the object within the array toDos, todo has a key(task) and status set to false
    newLi.innerText = todo.task;
    newRemoveBtn.innerText = "x";
    newRemoveBtn.setAttribute("id","removeBtn");

    newLi.prepend(newCheckBox);
    newLi.append(newRemoveBtn);
    ul.append(newLi);

    // monitor the status of each todo
    if (todo.done) {
        newCheckBox.checked = todo.done;
        newCheckBox.classList.add("crossOut");
      }
  }
}
renderToDos();



ul.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    event.target.parentElement.classList.toggle("crossOut");
  }

  //remove todo from localStorage
  if (event.target.tagName === "BUTTON") {
    event.target.parentElement.classList.add("removed")
    let toBeRemoved=event.target.parentElement
    let removeKey=toBeRemoved.innerText.slice(0,-1)
    for(todo of toDos){
        if (Object.values(todo).indexOf(removeKey)===0){
           toDos.splice(toDos.indexOf(todo),1);
        }
    }
    saveToLocalStorage(toDos);
    renderToDos();
  } 
});
