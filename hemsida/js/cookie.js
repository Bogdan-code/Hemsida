
var cookies = 0;
var auto_amount = 0;

let upgrades=[
  {level: 1, cost: 5, increment: 1.05}, //upgrade 1
  {level: 1, cost: 100, increment: 1.05}, //upgrade 2
  {level: 1, cost: 250, increment: 1.05} // ... 
];//normal upgrades

let auto_upgrades=[
  {level: 0, cost: 20,increment: 1.05, amount: 0.5}, // auto-upgrade 1
  {level: 0, cost: 150,increment: 1.05, amount: 5}, // auto-upgrade 2
  {level: 0, cost: 500,increment: 1.05, amount: 10} // ...
];//auto_upgrades

var click_text = document.getElementById('clicks'); //Get click text

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
  if (cookies < upgrades[num-1].cost){notEnoughMoney("upgrade", num); return};
  var upgrade_button = document.getElementById('upgrade'+ num);
  cookies -= upgrades[num-1].cost;
  upgrades[num-1].level += 1;
  upgrades[num-1].cost = Math.round(upgrades[num-1].cost * (upgrades[num-1].increment**upgrades[num-1].level));
  upgrade_button.innerText = ("Upgrade:"+num +" Cost:" + upgrades[num-1].cost+ " Level:"+ upgrades[num-1].level);
  updatecookie()

}


//When inputted with num(upgrade number) automatically increases auto_upgrade(num) level and increases the cost according to the increment
function autoupgrade_function(num){
  if (cookies < auto_upgrades[num-1].cost){notEnoughMoney("auto", num); return};
  var upgrade_button = document.getElementById('upgrade'+ num);
  cookies -= auto_upgrades[num-1].cost;
  auto_upgrades[num-1].level += 1;
  auto_upgrades[num-1].cost = Math.round(auto_upgrades[num-1].cost * (auto_upgrades[num-1].increment**auto_upgrades[num-1].level));
  updatecookie()
  updateautoamount()

}

//Updates the cookie counter
function updatecookie(){
  click_text.textContent = cookies + ' Cookies'
}
 
//Updates the auto_upgrades and 
function updateautoamount(){
  var sum = 0;
  for (let i = 0; i < auto_upgrades.length; i++) {  
    sum += auto_upgrades[i].amount * auto_upgrades[i].level;
    var auto_upgrade_button = document.getElementById('auto-upgrade'+ (i+1));
    auto_upgrade_button.textContent = "Auto Upgrade:"+(i+1) + " Cost:" + auto_upgrades[i].cost+ " Level:"+ auto_upgrades[i].level+ " c/s:"+ auto_upgrades[i].amount + " total:" + (auto_upgrades[i].level * auto_upgrades[i].amount) +"Cookies/Second";
  }
  auto_amount = sum;
}

//updates the upgrade buttons
function updateUpgrade(){
  for(let i = 0; i  != upgrades.length; i++){
  var upgrade_button = document.getElementById('upgrade'+ (i+1));
  upgrade_button.textContent = "Upgrade:"+(i+1) +" Cost:" + upgrades[i].cost+ " Level:"+ upgrades[i].level
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


//function used for auto_upgrades, called everysecond
function addCookies(){
  cookies += auto_amount;
  updatecookie()
}


//Function where cookies are added
function incrementCookies() {
  cookies += (0 + (upgrades[0].level*upgrades[1].level)) * upgrades[2].level ;
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
updateUpgrade()
updateautoamount()
