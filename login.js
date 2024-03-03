let storageVisitors = getFromLocalStorage("visitors");

//create the card in HTML for each visitor
function createVisitorCard(visitor) {
  //set the container.
  const visitorContainer = document.createElement("div");
  visitorContainer.classList.add("visitor");

  //set the html.
  visitorContainer.innerHTML = `
    <h3>${visitor.name}</h3>
    <img src="image.jps/man.jpg" alt=${visitor.name}"/>
    <p>Coins: ${visitor.coins}</p>
    <button>Log In</button>
  `;
  //adding event listener for the "Log In" button. (login and move to zoo.)
  visitorContainer.addEventListener("click", function (event) {
    event.preventDefault();
    loginAsVisitor(visitor);
    window.location.href = "zoo.html";
  });

  //return the container.
  return visitorContainer;
}

//creates the visitor dynamically
function displayVisitors(visitors) {
  const card = document.querySelector("#visitors-container");
  //reset the HTML.
  card.innerHTML = "";

  //for each visitor - create a card.
  visitors.forEach((visitor) => {
    card.appendChild(createVisitorCard(visitor));
  });
}

//creating dialog if a user is connected.
function createDialogBox() {
  //create dialogBox
  const dialogBox = document.createElement("div");
  dialogBox.classList.add("dialog-box");

  //create the message
  const message = document.createElement("h3");
  message.textContent = "A user already logged in. Do you want to log him out?";

  //create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog-buttons");

  //create yes button
  const yesButton = document.createElement("button");
  yesButton.classList.add("yes-button");
  yesButton.textContent = "Yes";

  //create no button
  const noButton = document.createElement("button");
  noButton.classList.add("no-button");
  noButton.textContent = "No";

  //create div to disable any other click on the screen.
  const denyDiv = document.createElement("div");
  denyDiv.classList.add("overlay");
  document.body.appendChild(denyDiv);

  //set parent
  dialogBox.appendChild(message);
  dialogBox.appendChild(buttonContainer);
  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  denyDiv.appendChild(dialogBox);

  //adding events for buttons
  yesButton.addEventListener("click", () => {
    logout();
    closeDialog(denyDiv);
  });
  noButton.addEventListener("click", (event) => {
    closeDialog(denyDiv);
    window.location.href = "zoo.html";
  });
}

function closeDialog(denyDiv) {
  denyDiv.remove();
}

//login when click on "choose animals."
function loginAsVisitor(visitor) {
  const loggedVisitor = getLoggedVisitor();
  if (!loggedVisitor) {
    alert("Visitor " + visitor.name + " is logged in!");
    saveToLocalStorage("loggedVisitor", visitor);
  }
}

function init() {
  //getting the logged visitor from local storage if exist.
  const loggedVisitor = getFromLocalStorage("loggedVisitor");

  //if there is - pop the dialog.
  if (loggedVisitor) {
    createDialogBox();
  }

  // display the visitors as card.
  displayVisitors(storageVisitors);
  //adding event listener for an input change
  const nameInput = document.getElementById("name-filter");
  nameInput.addEventListener("input", (event) => {
    //filter the visitor by given string(result in array)
    filteredVisitors = storageVisitors.filter((visitor) => {
      const lowerCaseName = visitor.name.toLowerCase();
      return lowerCaseName.startsWith(event.target.value.toLowerCase());
    });
    //display the visitors for filtered array.
    displayVisitors(filteredVisitors);
  });
}

init();
