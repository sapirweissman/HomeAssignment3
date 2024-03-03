let storageVisitors = getFromLocalStorage("visitors");

function validName(name) {
  for (let i = 0; i < name.length; i++) {
    const charCode = name.charCodeAt(i);
    //illegal string(a-z or space)
    if (
      !(
        (charCode >= 97 && charCode <= 122) ||
        (charCode >= 65 && charCode <= 90) ||
        charCode === 32
      )
    ) {
      return false;
    }
  }
  //legal
  return true;
}

function validateFormInputs(name) {
  //if empty or illegal name
  if (!name || !validName(name)) {
    alert("Please enter a valid name");
    return false;
  }
  return true;
}

function visitorExist(name) {
  let flag = true;
  storageVisitors.forEach((visitor) => {
    //if a visitor with this name exist
    if (visitor.name === name) {
      alert("Visitor with this name already exists");
      flag = false;
    }
  });
  return flag;
}

function makeVisitor(name) {
  //create visitor
  const visitor = {
    name: name.trim(),
    coins: 50,
  };

  //update in local storage
  const localVisitors = getFromLocalStorage("visitors");
  localVisitors.push(visitor);
  saveToLocalStorage("visitors", localVisitors);
}

function createNewVisitor(event) {
  event.preventDefault();
  const name = document.getElementById("user-name").value;
  if (validateFormInputs(name) && visitorExist(name)) {
    makeVisitor(name);
    //reset the text input bar.
    document.getElementById("user-name").value = "";

    //move to login.html page.
    window.location.href = "login.html";
  }
}

const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
