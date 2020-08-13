//Create variables here
var dog, happyDog, database,  foodStock;
var feed,add;
var lastfed;
var foodobj;
function preload(){
  //load images here
 happydogimg=loadImage("images/dog.png");
  dogimg=loadImage("images/doghappy.png");
}

function setup() {
  database = firebase.database();
  //console.log(database);
  createCanvas(500, 500);
  foodobj = new Food();
  foodStock = database.ref('food');
  foodStock.on("value",readstock);
  dog=createSprite(300,400,150,150);
  dog.addImage(happydogimg);
  dog.scale=0.15;
  feed  = createButton("FEED THE DOG");
  feed.position(700,70);
  feed.mousePressed(feeddog);
  add  =  createButton("ADD FOOD");
  add.position(600,70);
  add.mousePressed(addfoods);
}


function draw() {  
  background(46, 139, 87);
  //fill("black");
  foodobj.display();
  fedtime=database.ref('feedtime');
  fedtime.on("value",function(data){
   lastfed=data.val();
  })
  textSize(16);
  stroke(0);
  //text("food Remaing :"+foodStock,100,40);
  fill(255,255,254);
  textSize(15);
  if(lastfed>=12){
    text("LAST_FED_TIME  : "+lastfed%12+"PM",50,100);
  }else if(lastfed===0){
    text("LAST_FED_TIME : 12AM",50,100)
  }else{
    text("LAST_FED_TIME"+lastfed+"AM",50,100);
  }
  drawSprites();
  //add styles here

}

function readstock(data){
  foodStock = data.val();
  foodobj.updatefoodstock(foodStock);
}
function addfoods(){
  foodStock++
  database.ref('/').update({
    food:foodStock
  })
}
function feeddog(){
  dog.addImage(dogimg);
 
  foodobj.updatefoodstock(foodobj.getfoodstock()-1);
  //foodobj.detuctfood();
  database.ref('/').update({
    food:foodobj.getfoodstock(),
    feedtime:hour()
  
  })

}



