let storageVisitors = JSON.parse(localStorage.getItem("visitors")) || [];
let selectedVisitor = getFromLocalStorage("visitorForDashboard");
let visitedLocal = getFromLocalStorage("visited");
let fedLocal = getFromLocalStorage("fed");

//getting unique elements.
function getUniqueElements(array) {
  if (!array) {
    return false;
  }
  //Array for the visits of specific user.
  const visitorAnimalVisits = array.filter((visit) => {
    return visit.visitor === selectedVisitor;
  });
  if (!visitorAnimalVisits) {
    return false;
  }
  //getting the unique animals visited.
  const uniqueAnimalNames = [];
  visitorAnimalVisits.forEach((animal) => {
    if (!uniqueAnimalNames.includes(animal.name)) {
      uniqueAnimalNames.push(animal.name);
    }
  });
  return uniqueAnimalNames;
}

//shows the visited animals.
function showVisitedAnimals() {
  //create the div.
  const visitedAnimalsDiv = document.getElementById("visited-animals");
  visitedAnimalsDiv.innerHTML = "";
  // Create a header element
  const header = document.createElement("h2");
  header.textContent = "Visited Animals";
  visitedAnimalsDiv.appendChild(header);

  //get the unique animals visited.
  const uniqueAnimalNames = getUniqueElements(visitedLocal);

  //if animal no visited yet - create a message.
  if (!visitedLocal || !uniqueAnimalNames) {
    const p = document.createElement("p");
    visitedAnimalsDiv.appendChild(p);
    p.textContent = "No animal visited yet";
    return;
  }

  //creating a list
  const list = document.createElement("ul");
  visitedAnimalsDiv.appendChild(list);

  if (uniqueAnimalNames) {
    //displaying the animals visited in the HTML.
    uniqueAnimalNames.forEach((animal) => {
      const item = document.createElement("li");
      item.textContent = animal;
      list.appendChild(item);
    });
  } else {
    const item = document.createElement("li");
    item.textContent = "No animal visited yet";
    list.appendChild(item);
  }
}

//shows the feeded animals.
function showFeededAnimals() {
  const fedAnimalsDiv = document.getElementById("fed-animals");
  fedAnimalsDiv.innerHTML = "";
  // Create a header element
  const header = document.createElement("h2");
  header.textContent = "Fed Animals";
  fedAnimalsDiv.appendChild(header);
  //Array for the visits of specific user.
  const uniqueAnimalNames = getUniqueElements(fedLocal);

  if (!fedLocal || !uniqueAnimalNames) {
    const p = document.createElement("p");
    fedAnimalsDiv.appendChild(p);
    p.textContent = "No animal fed yet";
    return;
  }
  //creating a list
  const list = document.createElement("ul");
  fedAnimalsDiv.appendChild(list);

  //displaying the animals visited in the HTML.
  uniqueAnimalNames.forEach((animal) => {
    const item = document.createElement("li");
    item.textContent = animal;
    list.appendChild(item);
  });
}

function showFavoriteAnimal() {
  favoriteAnimalDiv = document.getElementById("favorite-animal");
  favoriteAnimalDiv.innerHTML = "";
  // Create a header element
  const header = document.createElement("h2");
  header.textContent = "Favorite Animals";

  const p = document.createElement("p");
  favoriteAnimalDiv.appendChild(header);
  favoriteAnimalDiv.appendChild(p);
  if (!visitedLocal) {
    p.textContent = "No animal visited yet";
    return;
  }

  //Array for the visits of specific user.
  const visitorAnimalVisits = visitedLocal.filter((visit) => {
    return visit.visitor === selectedVisitor;
  });

  if (visitorAnimalVisits.length == 0) {
    p.textContent = "No animal visited yet";
    return;
  }
  //getting the unique animals visited.
  const dictVisits = {};
  visitorAnimalVisits.forEach((visit) => {
    const name = visit.name;
    if (dictVisits[name]) {
      dictVisits[name]++;
    } else {
      dictVisits[name] = 1;
    }
  });

  let maxCount = 0;
  let maxAnimal = NaN;

  //find the most common one(object.keys is the animal names array)
  Object.keys(dictVisits).forEach((animalName) => {
    if (dictVisits[animalName] > maxCount) {
      maxCount = dictVisits[animalName];
      maxAnimal = animalName;
    }
  });

  //applying to HTML
  p.textContent = maxAnimal;
}

//setting the dashboard NAV
function setDashBoardNav() {
  setNav(document, storageVisitors);
  const selectVisitors = document.getElementById("visitor-select");

  //when the input changes, showing the dashboard for the selected user.
  selectVisitors.addEventListener("input", (event) => {
    event.preventDefault();

    //saving the new user selected for local storage.
    saveToLocalStorage("visitorForDashboard", event.target.value);

    //reloading the dashboard.
    selectedVisitor = getFromLocalStorage("visitorForDashboard");
    initDashboard();
  });
}

function setBackButton() {
  //back button to the prev window.
  const backButton = document.createElement("button");
  backButton.className = "Back";
  backButton.textContent = "Back";
  document.body.appendChild(backButton);

  //adding back button to retiurn to the previous page.
  backButton.addEventListener("click", (event) => {
    const prevWindow = getFromLocalStorage("prevWindow");
    if (prevWindow) {
      window.location.href = prevWindow;
      //removing the dashboard values from local storage.
      localStorage.removeItem("prevWindow");
      localStorage.removeItem("visitorForDashboard");
    }
  });
}

//init
function initDashboard() {
  showVisitedAnimals();
  showFeededAnimals();
  showFavoriteAnimal();
}

initDashboard();
setBackButton();
setDashBoardNav();
