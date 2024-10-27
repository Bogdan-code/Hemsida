
var gameState = {
  cookies: 0,
  auto_amount: 0,
  savedSession: false,
  upgrades: [
    {level: 1, cost: 5, increment: 1.05}, //upgrade 1
    {level: 1, cost: 100, increment: 1.05}, //upgrade 2
    {level: 1, cost: 250, increment: 1.05} // ... 
  ],
  auto_upgrades: [
    {level: 0, cost: 20,increment: 1.05, amount: 0.5}, // auto-upgrade 1
    {level: 0, cost: 150,increment: 1.05, amount: 5}, // auto-upgrade 2
    {level: 0, cost: 500,increment: 1.05, amount: 10} // ...
  ]
}



var click_text = document.getElementById('clicks'); //Get click text


// Check for local storage support and load saved game if available
if (typeof Storage !== "undefined") {
  if (localStorage.getItem(gameState.savedSession)) {
    load();
  } else {
    alert("No saved session");
  }
} else {
  alert("Sorry, your browser does not support Web Storage...");
}

// Save function to store game state in local storage
function save() {
  localStorage.setItem(gameState.savedSession, true)
  console.log("Saved Game!");
  
  localStorage.setItem("gameState", JSON.stringify(gameState));
}


function load(){
  if (localStorage.getItem("gameState") !== null) {
    try {
      gameState = JSON.parse(localStorage.getItem("gameState"));
    } catch (e) {
      console.error("Error parsing gameState from localStorage:", e);
      // Re-initialize gameState or handle error
    }
  }
  cookies = gameState.cookies;
  auto_amount = gameState.auto_amount;
  upgrades = gameState.upgrades;
  auto_upgrades = gameState.auto_upgrades;
  savedSession = gameState.savedSession;
  updatecookie();
  updateautoamount();
  updateUpgrade();
}



//function to open side-nav
function menu_drop() {
  var menu_buttons_element = document.getElementById('menu-buttons');
  if (menu_buttons_element.style.display === 'flex') {
    menu_buttons_element.style.display = 'none';
  } else {
    menu_buttons_element.style.display = 'flex';
  };
}


//When inputted with num(upgrade number) automatically increases upgrade(num) level and increases the cost according to the increment
function upgrade_function(num){
  var upgrade = gameState.upgrades[num-1]

  if (gameState.cookies < upgrade.cost){notEnoughMoney("upgrade", num); return};
  var upgrade_button = document.getElementById('upgrade'+ num);
  gameState.cookies -= upgrade.cost;
  upgrade.level += 1;
  upgrade.cost = Math.round(upgrade.cost * (upgrade.increment**upgrade.level));
  upgrade_button.innerText = ("Upgrade:"+num +" Cost:" + upgrade.cost+ " Level:"+ upgrade.level);
  updatecookie()

}


//When inputted with num(upgrade number) automatically increases auto_upgrade(num) level and increases the cost according to the increment
function autoupgrade_function(num){
  var upgrade = gameState.auto_upgrades[num-1]

  if (gameState.cookies < upgrade.cost){notEnoughMoney("auto", num); return};
  var upgrade_button = document.getElementById('upgrade'+ num);
  gameState.cookies -= upgrade.cost;
  upgrade.level += 1;
  upgrade.cost = Math.round(upgrade.cost * (upgrade.increment**upgrade.level));
  updatecookie()
  updateautoamount()

}

//Updates the cookie counter
function updatecookie(){
  click_text.textContent = gameState.cookies + ' Cookies'
}
 
//Updates the auto_upgrades and 
function updateautoamount(){
  var sum = 0;
  for (let i = 0; i < gameState.auto_upgrades.length; i++) { 
    var upgrade = gameState.auto_upgrades[i]
    
    sum += upgrade.amount * upgrade.level;
    var auto_upgrade_button = document.getElementById('auto-upgrade'+ (i+1));
    auto_upgrade_button.textContent = "Auto Upgrade:"+(i+1) + " Cost:" + upgrade.cost+ " Level:"+ upgrade.level+ " c/s:"+ upgrade.amount + " total:" + (upgrade.level * upgrade.amount) +"Cookies/Second";
  }
  gameState.auto_amount = sum;
}

//updates the upgrade buttons
function updateUpgrade(){
  for(let i = 0; i  != gameState.upgrades.length; i++){
  var upgrade_button = document.getElementById('upgrade'+ (i+1));
  upgrade_button.textContent = "Upgrade:"+(i+1) +" Cost:" + gameState.upgrades[i].cost+ " Level:"+ gameState.upgrades[i].level
  }
}

// Called "notEnoughMoney", Chagnes the button pressed to "NOT ENOUGH MONEY"
function notEnoughMoney(up, num){
  if(up == "upgrade"){

    var upgrade_button = document.getElementById('upgrade'+ num);
    setTimeout(() => {
      updateUpgrade()
      upgrade_button.style.color = "black";
    }, 250);
    upgrade_button.textContent = "NOT ENOUGH MONEY";
    upgrade_button.style.color = "red";

    return
  }
  if (up == "auto") {
    var upgrade_button = document.getElementById('auto-upgrade'+ num);
    setTimeout(() => {
      updateautoamount()
      upgrade_button.style.color = "black";
    }, 250);
    upgrade_button.textContent = "NOT ENOUGH MONEY";
    upgrade_button.style.color = "red";
    
  } else {
    alert("ERROR, inputed with wrong upgrade")
    return
  }

}

//Runs automatically ever second(used for the autoupgrades)
setInterval(() => {
  addCookies();
}, 1000);


setInterval(() => {
  save();
}, 30000);


//function used for auto_upgrades, called everysecond
function addCookies(){
  gameState.cookies += gameState.auto_amount;
  updatecookie();
}


//Function where cookies are added
function incrementCookies() {
  gameState.cookies += (0 + (gameState.upgrades[0].level*gameState.upgrades[1].level)) * gameState.upgrades[2].level ;
  updatecookie()
}

//change cookie on mouse down and mouse up
function mouseDown(){
  var button = document.getElementById("cookie-button");
  button.style.width= "59%";
  button.style.height= "99%";  
}
function mouseUp(){
  var button = document.getElementById("cookie-button");
  button.style.width= "60%";  
  button.style.height= "100%";  

}


function resetGame() {
  localStorage.clear();
  location.reload();
}

updateUpgrade();
updateautoamount();
updatecookie();