// ***************************** ARROW FUNCTIONS  **********************************************************
//ex.1
var fn1 = function(){return 2;};
var fn2 = () => 2;  // same return as function above.  Implicit Return. If 2 was wrapped in braces {2} there would be no implicit return.

//ex.2
var x;  // always use parens and then you don't have to worry about this
x = () => {};     //No parameters, MUST HAVE PARENS
x = (val) => {};  //One parameter w/ parens, OPTIONAL
x = val => {};    //One parameter w/o parens, OPTIONAL
x = (y, z) => {}; //Two or more parameters, MUST HAVE PARENS
x = y, z => {};   //Syntax Error: must wrap with parens when using multiple params

//ex.3
let nums = [1, 2, 3];
let res = nums.map( n => n * n );
console.log(res); //Logs [1, 4, 9]

//ex.4
let key_maker = val => ({key:value}) // in order to return an object literal, must be wrapped in parens
console.log(key_maker(100)); //logs {key: 100}

//ex.5
var Foo = function(){};
var Bar = () => {};
new Foo();
new Bar(); //Bar is not a contructor


//ex.6 - Real benifit of Arrow functions is the lexical binding of 'this'
var Widget = {
  init: function() { 
    document.addEventListener("click", function(event) {
      this.doSomething(event.type); // This will Error bc 'this' is the document 
    }, false);
  },

  doSomething: function(type) {
    console.log("Handling " + type  + " event");
  }
};
Widget.init();
//the widget above could be fixed using a .bind() call at the end or var self = this before the init function.  Whenever you would use these methods for a object scoped 'this', you can use an anon arrow function.
var Widget = {
  init: function(){  // init: () => // would cause 'this' to be window, because it moves one level up.
    document.addEventListener("click", (event) => { // 'this' is now scoped to the Widget Object, when you use the arrow function.
    	console.log(this)
      this.doSomething(event.type);
    }, false);
  },

  doSomething: function(type){
    console.log("Handling " + type  + " event");
  }
};
Widget.init();

// ***************************** DEFAULT VALUES  **********************************************************
// - BEFORE - could be done one of two ways Short-Circuit Expression & Ternary Expressions
function test(a) {
  a = a || getSomeDefaultValue();
}
function test(a) {
  a = a ? a : getSomeDefaultValue(); 
}
// - NOW - set the agruemnt = to default value.  
function sayHello(name = "World"){
  console.log("Hello " + name + "!");
}
sayHello("Dt Dew"); //Hello Dt Dew!
sayHello(""); //Hello !
sayHello(); //Hello World!
sayHello(undefined);//Hello World!

// - Can assign default value though method call
function getRand(){
  return Math.ceil(Math.random() * 10000000) + new Date().getTime();
}
function myFunction(id=getRand()){
  console.log("My ID: "+id);
}
myFunction(); //Logs random number
myFunction(1); //Logs 1



// ***************************** DESTRUCTURING  **********************************************************
// OBJECTS -----------------------------------------------------------------------
//ex.1
function getAddress(){ // funtion returns an object
  return {
    city: "Salt Lake City",
    state: "UT",
    zip: 84115
  };
}
let{city, state, zip} = getAddress(); //braces on the left of the equation, seperate variables by commas
console.log(city);  //logs "Salt Lake City"
console.log(state); //logs "UT"
console.log(zip);   //logs 84115
let {city: c, state: s, zip: z} = getAddress(); // c,s,z - are Alias Names
console.log(c, s, z); // 'Salt Lake City', 'UT', 84115

//ex.2
var person = {name: "Adrian", age: 28};
displayPerson(person);

function displayPerson({name = "No Name Provided", age = 0}){ // ({name, age}) is like doing ('objectInstance'.name, 'objectInstance'.age).  All done in the method structure with default value in case object does not have those values.
  console.log(name + " is " + age)
}

//ex.3 - Refutable Patterns
var person = {name: "Adrian", age: 28}
let {name, age, ?address} = person; // forgives 'address' for not being there. Refutable property. One, many or all.
let ?{name, age, address} = person; // makes all refutable properties.

// ARRAYS -----------------------------------------------------------------------
//ex.1
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var [first, second,,,,,,,,tenth] = nums;
console.log(first, second, tenth); //logs 1, 2, 10

doSomething(nums);
function doSomething([first, second, ...others]){
  console.log(first);  //logs 1
  console.log(second); //logs 2
  console.log(others); //logs [3, 4]
}

//ex.2
let [x] = [2, 3]        // x = 2 - takes first value because there is only one variable on the left side
let [x] = {'0': 4}      // x = 4 - takes four because '0' is being used as the index in this case
let [x, y, z] = [1, 2]  // throw


//ex.3 - swapping variables 
var a = 1, b = 2;
var temp = a, a = b, b = temp; //The Old Way
[b, a] = [a, b]; //The New Way


// ***************************** REST PARAMETERS  **********************************************************
// - Allow you to prefix the parameter w/ '...', and catches all params that come before '...' and puts them into a workable array.  Must only be one per function, and must be the last parameter.  There are no default values.  Can no longer use arguements call.
//ex.1
function foo(...bar){
  console.log(bar.join(' ')); //Logs 'I can haz teh arguments'
}
foo('I', 'can', 'haz', 'teh', 'arguments');

//ex.2
let nums = [1,2,3,4];
let abcs = ['a','b','c'];
console.log(nums) //logs [1, 2, 3, 4]
console.log(...nums) //logs 1 2 3 4  - each one individually
let alphanum = [...nums, ...abcs]
console.log(alphanum) //logs [1, 2, 3, 4, "a", "b", "c"]




// ***************************** COLLECTIONS  **********************************************************

// SET - is a unique collection of things and will make sure it is unique - set has a .iterator and you can get things out of the set, why you would want a set over an array.  No typecasting for 'uniqueness': 1 != '1'.
var set = new Set()
set.add(1);
set.add(2);
set.add(3);
set.add(1); // will not be added because it is not unique to the set
console.log(set.size) //logs 3 
console.log(set.has(1)) //logs true
set.clear()
console.log(set.size) //logs 0
set.add(1);
set.add(2);
set.delete(2)
console.log(set.size) //logs 1

var items = new Set([1,2,3,4,5])
for(let num of items){  // new type of FOR 'of' LOOP; but must used with something that has an iterator property
   console.log(num) //logs 1,2,3,4,5

}

// MAP - no typecasting here. Primitives/Objects/Functions can all be Keys.  Do not put DOM elements in MAP, if that element is deleted from the DOM, a Map pointer will not all the element to be garbage collected.   
var map = new Map();
map.set(1, true)
map.has(1) //true
map.delete(1) 
map.set(1, true)
console.log(map.size) //logs 1
map.entries() //creates an MapIterator that can be used to iterate through entries 

var user = {name: "A", id: 10};  //Objects can be used as Keys
var userHobbyMap = new Map();
userHobbyMap.set(user, ['Ice Climbing', 'Hiking'])
console.log(userHobbyMap.get(user)) // logs ["Ice Climbing", "Hiking"]


// WEAKMAP - like a MAP but it can avoid memory leaks from setting keys as DOM elements; because if a WEAKMAP sees that it is the only thing holding an elements memory (element has been deleted from the DOM), the WEAKMAP will get rid of that element- does not use primitive Keys - has no size
// "A weakmap holds only a weak reference to a key, which means the reference inside of the weakmap doesn't prevent gargabe collection of the object"
var weak = new WeakMap();
weak.set("a", {stuff: "blah", things: 2}) // Invalid Key Type
weak.size // undefined





// ***************************** CLASSES **************************************************************

(function(){ //wrapping in a function makes the monsterHealth/Speed var unaccessable
  var monsterHealth = Symbol();// Symbol() creates a unique value, that is like a unique ID.  But will not get new value if new Symbol is called
  var monsterSpeed = Symbol();

  class Monster {
	constructor(name, health, speed){
		this.name = name;
		this[monsterHealth] = health; // the unique value of monsterHealth symbol makes it so that only the instance of monster know's the key
		this[monsterSpeed] = speed; // when symbol is used these properties will not show in Object.getOwnPropertyNames(obj)
		Monster.allMonsters.push(this); // everytime a monster is created, it is pushed into the allMonsters array
	}

	get speed(){ // getter function, allows you to read the property by doing 'monsterInstance'.speed 
		return this[monsterSpeed];
	}

	get health(){ 
		return this[monsterHealth];
	}

	get isAlive(){ // written like a function but accessed like a property
		return this[monsterHealth] > 0;
	}

	set isAlive(alive){ // setter function, again written like a funciton but accessed like a property 'monsterInstance'.isAlive = false
		if(!alive) this[monsterHealth] = 0;
	}
    
    set health(val){
    	if(val > 0){ throw new Error("Monsters must have > 0 health!")}
    	this[monsterHealth] = val;
    }

    attack(target){ // regular methods still work 'monsterInstance'.attack(target)
    	console.log(this.name + " attacks " + target.name)
    }

  }
  Monster.allMonsters = []; // static class property added onto the class
  window.Monster = Monster; // window is an object, just like document. 
})()


class Godzilla extends Monster{  // You can extend classes   
	constructor(){
		super("Godzilla", 10000, 10)
	}
}

var g = new Godzilla()
console.log(g)
var a = new Monster("A", 100, 2)
var b = new Monster("B", 100, 2)
a.attack(b)
console.log(a.health = 5) 
console.log(a.health) 


// ***************************** GENERATORS ***********************************************************
//Generators enable JavaScript to be more cooperative by allowing a function to “pause” while another function or operation completes. They use a yield keyword to indicate where a function is paused. The next() method will resume the function from that position. Aaron walks through an example where values are passed both in and out of a generator through yield statements.

//ex.1
function *three(){
  yield 1;
  yield 2;
  return 2;
}
var geni = three(); // this will not execute the method.  It will return a generator iterator
console.log(geni.next()) // Object {value: 1, done: false}
console.log(geni.next()) // Object {value: 2, done: false}
console.log(geni.next()) // Object {value: 3, done: true}
console.log(geni.next()) // Object {value: undefined, done: true}

for(var v of three()){
  console.log(v) //logs 1, 2  // Only will show the yeilds bc the iterator will only return something if done: false **** ANY ITERATOR 
}

//ex.2
function *foo(x) { //means x = 5
  var y = 2 * (yield (x + 1)); // first .next() call; yeild (5 + 1)
  var z = yield (y / 3); // second .next( 12 ) call; makes entire previous yeild = 12, therefor, var y = 2 * (12); yeild (24/3) 
  return (x + y + z); // third .next( 13 ) call; makes yeild = 12, therefor, var z = 13; x + y + z = 5 + 24 + 13 = 42
}

var genit = foo( 5 );  //this will set x=5 before anything happens, but does not actually call foo
console.log( genit.next() );       // { value:6, done:false }
console.log( genit.next( 12 ) );   // { value:8, done:false }
console.log( genit.next( 13 ) );   // { value:42, done:true }

// ***************************** PROMISES ***********************************************************
//Promises make asynchronous code cleaner and more maintainable. They are created using the Promise() constructor. A promise is typically in one of four possible states. It can be fulfilled, rejected, pending, or settled. Code needing to wait until the promise returns can be wrapped in a then() method.








