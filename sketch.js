var dog, happydog, database, foodS, foodStock;
var Dog;
var fedTime, lastFed, feed, addFood, food;

function preload()
{
  dog = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  food = new Food();
  Dog = createSprite(800,200,150,150);
  Dog.addImage(dog);
  Dog.scale = 0.15;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  //textSize(20);
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  food.display();
  fedTime = database.ref('feedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12)
  {
    text("Last fed" + lastFed%12+"pm", 350,30);
  }
  else if(lastFed == 0)
  {
    text("Last fed: 12am", 350,30);
  }
  else
  {
    text("Last fed" + lastFed+"am", 350,30);
  }
  /*if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    Dog.addImage(happydog);
  }*/
  drawSprites();
}

function readStock(data)
{
  foodS = data.val();
  food.updateFoodStock(foodS);
}

/*function writeStock(x){
  if(x <= 0)
  {
    x = 0  
  }
  else
  {
    x = x-1;
  }
  database.ref('/').update({Food:x});
}*/

function feedDog()
{
  Dog.addImage(happydog);
  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),fedTime:hour()
  })
}

function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}