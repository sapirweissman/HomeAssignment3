let visitors = [
  {
    name: "John Smith",
    coins: 50,
  },
  {
    name: "Emily Johnson",
    coins: 50,
  },
  {
    name: "Michael Williams",
    coins: 50,
  },
  {
    name: "Jessica Brown",
    coins: 50,
  },
  {
    name: "Christopher Jones",
    coins: 50,
  },
  {
    name: "Ashley Davis",
    coins: 50,
  },
  {
    name: "Matthew Miller",
    coins: 50,
  },
  {
    name: "Amanda Wilson",
    coins: 50,
  },
  {
    name: "David Moore",
    coins: 50,
  },
  {
    name: "Sarah Taylor",
    coins: 50,
  },
  {
    name: "James Anderson",
    coins: 50,
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
  },
  {
    name: "Robert Jackson",
    coins: 50,
  },
  {
    name: "Elizabeth White",
    coins: 50,
  },
  {
    name: "Daniel Harris",
    coins: 50,
  },
  {
    name: "Melissa Martin",
    coins: 50,
  },
  {
    name: "William Thompson",
    coins: 50,
  },
  {
    name: "Linda Garcia",
    coins: 50,
  },
  {
    name: "Joseph Martinez",
    coins: 50,
  },
  {
    name: "Karen Robinson",
    coins: 50,
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
];

// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }
}
generateDataset();

//******** */
function logout() {
  localStorage.removeItem("loggedVisitor");
}

//getting a value from local storage
function getFromLocalStorage(key) {
  let localString = localStorage.getItem(key);
  if (localString) {
    return JSON.parse(localString);
  } else {
    return localString;
  }
}

//insert value from local storge
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLoggedVisitor() {
  return getFromLocalStorage("loggedVisitor");
}

function resetApp() {
  localStorage.clear();
  window.location.href = "signup.html";
}

function setNav(document, storagedVisitors) {
  //getting all the nav containers into variables.
  const name = document.getElementById("visitor-name");
  const coins = document.getElementById("visitor-coins");
  const selectVisitors = document.getElementById("visitor-select");

  //reseting their HTML
  name.innerHTML = "";
  selectVisitors.innerHTML = "";

  //displaying the logged in visitor.
  const loggedVisitor = getLoggedVisitor();
  name.textContent = loggedVisitor.name;
  coins.textContent = loggedVisitor.coins + " coins";

  //dropdown setup
  storageVisitors.forEach((visitor) => {
    let option = document.createElement("option");
    option.textContent = visitor.name;

    selectVisitors.appendChild(option);
  });
  selectVisitors.value = getLoggedVisitor().name || "";

  //creating the dashboard button.
  const dashboardButton = document.getElementById("dashboard-button");
  //adding event listener for going to the dashboard.
  if (dashboardButton) {
    dashboardButton.addEventListener("click", (event) => {
      event.preventDefault();
      saveToLocalStorage("visitorForDashboard", selectVisitors.value);
      saveToLocalStorage("prevWindow", window.location.href);
      window.location.href = "dashboard.html";
    });
  }
}

function getUniqueElementsFromArray(array) {
  const uniqueElementsArray = [];

  array.forEach((element) => {
    if (!uniqueElementsArray.includes(element)) {
      uniqueElementsArray.push(element);
    }
  });
  return uniqueElementsArray;
}
