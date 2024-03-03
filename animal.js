const storageAnimals = JSON.parse(localStorage.getItem("animals"));
const chosenAnimal = storageAnimals.filter((animal) => {
  return animal.name == getFromLocalStorage("chosenAnimal");
})[0];
let storageVisitors = JSON.parse(localStorage.getItem("visitors")) || [];

//create an animal card.
function createAnimalCard(animal) {
  const card = document.createElement("div");
  card.classList.add("animal");

  card.innerHTML = `
  <h2>${animal.name}</h2>
  <img src="image.jps/${animal.name}.jpg" alt=${animal.name}"/>
  <p><strong>Is Predator:</strong> ${animal.isPredator ? "Yes" : "No"}</p>
  <p><strong>Weight:</strong> ${animal.weight} kg</p>
  <p><strong>Height:</strong> ${animal.height} cm</p>
  <p><strong>Color:</strong> ${animal.color}</p>
  <p><strong>Habitat:</strong> ${animal.habitat}</p>
  `;
  return card;
}

//creates the Animals dynamically
function displayAnimals(animals) {
  const card = document.querySelector("#related-animals");
  card.innerHTML = "";
  animals.forEach((animal) => {
    card.appendChild(createAnimalCard(animal));
  });
}

//sets the array without object.
function ArrayWithoutObject(arr, object) {
  //an array
  return (updatedArray = arr.filter((obj) => {
    return obj.name != object.name;
  }));
}

function renderAnimal() {
  //initialize the values from the chosenAnimal
  document.getElementById("name").textContent = chosenAnimal.name;
  document.getElementById("weight").textContent =
    "Weight: " + chosenAnimal.weight;
  document.getElementById("height").textContent =
    "Height: " + chosenAnimal.height;
  document.getElementById("color").textContent = "Color: " + chosenAnimal.color;
  document.getElementById("habitat").textContent =
    "Habitat: " + chosenAnimal.habitat;
  document.getElementById("isPredator").textContent =
    "Predator: " + chosenAnimal.isPredator;

  //set the image
  if (chosenAnimal.image) {
    const imageDiv = document.getElementById("image");
    const image = document.createElement("img");
    //the link to the image.
    image.src = chosenAnimal.image;
    image.width = 200;
    imageDiv.appendChild(image);
  }
}

//render the related animals.
function renderRelatedAnimals() {
  //related is an array filtered by habitat.
  const relatedArray = animals.filter((animal) => {
    return (
      animal.habitat === chosenAnimal.habitat &&
      animal.name != chosenAnimal.name
    );
  });
  displayAnimals(relatedArray);
}

function feedAnimal() {
  let visitor = getFromLocalStorage("loggedVisitor");

  //if enough coins.
  if (visitor.coins >= 2) {
    alert("Thanks for feeding!");

    visitor.coins -= 2;
    let tempArr = ArrayWithoutObject(storageVisitors, visitor);
    tempArr.push({ name: visitor.name, coins: visitor.coins });
    saveToLocalStorage("loggedVisitor", visitor);
    saveToLocalStorage("visitors", tempArr);

    let fedArr = getFromLocalStorage("fed");
    if (!fedArr) {
      fedArr = [];
    }
    fedArr.push({ name: chosenAnimal.name, visitor: visitor.name });
    saveToLocalStorage("fed", fedArr);
    setNav(document, storageVisitors);
  } else if (chosenAnimal.isPredator) {
    visitorGotEaten(visitor);
  } else {
    animalEscaped();
  }
}

//if the visitor got eaten.
function visitorGotEaten(visitor) {
  alert("You got eaten!");
  //return visitors array with the eaten one deleted.
  saveToLocalStorage("visitors", ArrayWithoutObject(storageVisitors, visitor));

  //moving to login page.
  localStorage.removeItem("loggedVisitor");
  window.location.href = "login.html";
}

//if the animal escaped.
function animalEscaped() {
  alert("The animal escaped!");

  //save the animals array without the chosenAnimal.
  saveToLocalStorage(
    "animals",
    ArrayWithoutObject(storageAnimals, chosenAnimal)
  );

  localStorage.removeItem("chosenAnimal");
  window.location.href = "zoo.html";
}

renderAnimal();
renderRelatedAnimals();
setNav(document, storageVisitors);
