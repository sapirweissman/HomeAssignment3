let storageVisitors = getFromLocalStorage("visitors");
let storageAnimals = getFromLocalStorage("animals");

//create an animal card.
function createAnimalCard(animal) {
  const card = document.createElement("div");
  card.classList.add("animal");

  card.innerHTML = `
  <h2>${animal.name}</h2>
  <img src="image.jps/${animal.name}.jpg" alt=${animal.name}">
  <p><b>Is Predator:</b> ${animal.isPredator ? "Yes" : "No"}</p>
  <p><b>Weight:</b> ${animal.weight} kg</p>
  <p><b>Height:</b> ${animal.height} cm</p>
  <p><b>Color:</b> ${animal.color}</p>
  <p><b>Habitat:</b> ${animal.habitat}</p>
  <button>Choose Animal</button>
  `;
  const button = card.querySelector("button");
  button.addEventListener("click", (event) => {
    visitAnimal(animal.name);
  });

  return card;
}

//creates the Animals dynamically
function displayAnimals(animals) {
  const card = document.querySelector("#animal-cards");
  card.innerHTML = "";
  animals.forEach((animal) => {
    card.appendChild(createAnimalCard(animal));
  });
}

//render the animal into a card
function renderAvailableAnimals() {
  displayAnimals(storageAnimals);
}

//saving the chosen animal and passing it into the animal page.
function visitAnimal(animalName) {
  //for the dashboard
  const visited = { name: animalName, visitor: getLoggedVisitor().name };
  let visitedLocal = getFromLocalStorage("visited");

  if (!visitedLocal) {
    visitedLocal = [];
  }
  visitedLocal.push(visited);
  saveToLocalStorage("visited", visitedLocal);

  //for login
  saveToLocalStorage("chosenAnimal", animalName);
  window.location.href = "animal.html";
}

//applying the filter on the array.
function setFilter(filterKey, filterValue, filteredAnimals) {
  //const filteredAnimals = storageAnimals;

  //if no value - return all animals.
  if (!filterValue) {
    return filteredAnimals;
  }

  //name filter(starting with..)
  if (filterKey === "name-filter") {
    return filteredAnimals.filter((animal) => {
      const lowerCaseName = animal.name.toLowerCase();
      return lowerCaseName.startsWith(filterValue.toLowerCase());
    });
  }

  //predator filter
  if (filterKey === "predator-filter") {
    //for predator animals
    if (filterValue === "Yes") {
      return filteredAnimals.filter((animal) => {
        return animal.isPredator;
      });
      //for non-predator animals.
    } else if (filterValue === "No") {
      return filteredAnimals.filter((animal) => {
        return !animal.isPredator;
      });
    }
  }

  if (filterKey === "habitat-filter") {
    return filteredAnimals.filter((animal) => {
      return animal.habitat == filterValue;
    });
  }

  //taking all the animals that their weight is greater than the inserted value.
  if (filterKey === "weight-filter") {
    return filteredAnimals.filter((animal) => {
      return animal.weight > filterValue;
    });
  }

  if (filterKey === "height-filter") {
    return filteredAnimals.filter((animal) => {
      return animal.height > filterValue;
    });
  }

  if (filterKey === "color-filter") {
    return filteredAnimals.filter((animal) => {
      return animal.color === filterValue;
    });
  }
}

function saveFiltersToLocalStorage(filters) {
  const filterList = [];
  filters.forEach((filter) => {
    filterList.push({ id: filter.id, value: filter.value });
  });
  saveToLocalStorage("filters", filterList);
}

//set the filtersLisntest.
function setFiltersListeners() {
  //get the filters.
  let filters = document.querySelectorAll(
    "#filters-container select, #filters-container input"
  );

  //set listner to set filter for each value.
  filters.forEach((f) => {
    f.addEventListener("input", (event) => {
      //array of the filtered animals
      event.preventDefault();
      let filteredArray = storageAnimals;
      filters.forEach((filter) => {
        filteredArray = setFilter(filter.id, filter.value, filteredArray);
      });

      //save the filters to local storage/
      saveFiltersToLocalStorage(filters);

      //display the animals rom the filtered array.
      displayAnimals(filteredArray);
    });
  });

  //if we have filters saved in storage - we are loading them(wont disapper on a referesh)
  const storageFilters = getFromLocalStorage("filters");
  if (storageFilters) {
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].value != storageFilters[i].value) {
        filters[i].value = storageFilters[i].value;
      }
    }
  }

  //activate an event to trigger the load from local storage.
  filters[0].dispatchEvent(new Event("input"));
}

//create the habitat dynamcally.
function setHabitatFilter() {
  //get the habitat for each animal, into an array.
  const habitats = storageAnimals.map((animal) => animal.habitat);

  //get the unique habitats.
  const uniqueHabitats = getUniqueElementsFromArray(habitats);

  //create an option for each habitat value.
  uniqueHabitats.forEach((habitat) => {
    let option = document.createElement("option");
    option.value = habitat;
    option.textContent = habitat;

    //set the options into habitat filter.
    document.getElementById("habitat-filter").appendChild(option);
  });
}

//setting the available color dynamcally for the color filter.
function setColorFilter() {
  //get the unique possible colors
  const colors = new Set(storageAnimals.map((animal) => animal.color));

  //creating the options dynamcally.
  colors.forEach((color) => {
    let option = document.createElement("option");
    option.value = color;
    option.textContent = color;

    document.getElementById("color-filter").appendChild(option);
  });
}

renderAvailableAnimals();
setColorFilter();
setHabitatFilter();
setFiltersListeners();
setNav(document, storageVisitors);
