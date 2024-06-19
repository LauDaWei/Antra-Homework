// Exercise 1: Basic Closures
// Create a function createGreeting(greeting) that takes a string greeting and returns a function.
// The returned function should take a name as an argument and return a string that
// combines the greeting and the name.


// const sayHi = createGreeting("Hi");
// console.log(sayHi("Bob"));  // Outputs: "Hi Bob"
function createGreeting(greeting) {
    return (name) => {
        return `${greeting} ${name}`;
      };
    }
const sayHello = createGreeting("Hello");
console.log("Exercise 1");
console.log(sayHello("Alice"));  // Outputs: "Hello Alice"

// Exercise 2: Counter
// Write a function createCounter() that initializes a counter to 0 and returns an object with two methods:
// increment() which increments the counter and returns the new value,
// and getValue() which returns the current value of the counter.


function createCounter() {
    let count =0;
    return{
        increment(){
            return count +=1;
        },
        getValue(){
            return count;
        }
    }
}
let counter = createCounter();
console.log("Exercise 2");
console.log(counter.getValue());  // Outputs: 0
console.log(counter.increment());  // Outputs: 1
console.log(counter.increment());  // Outputs: 2
console.log(counter.getValue());  // Outputs: 2

// Exercise 3: Function Store
// Create a function functionStore() that allows you to store and retrieve functions by a key.
// It should return an object with two methods: store(key, fn) which stores the function fn
// under the string key, and run(key, ...args) that runs the function stored under key with
// the provided arguments.

// Example;

function functionStore() {
    const storeFn = new Map();
    function store(key,fn){
        //store the function name and function in a map
        storeFn.set(key,fn);
    }
    function run(key,...args){
        //get the function from the map
        const fn = storeFn.get(key);
        return fn(...args);
    }
    return{
        store,
        run
    }
}
let store = functionStore();
store.store("add", (a, b) => a + b);
console.log("Exercise 3");
console.log(store.run("add", 5, 7)); // Outputs: 12

// Exercise 4: Private Variables
// Write a function createPerson(name) that creates private variables and provides methods
// to access and modify them. This function should return an object with methods getName()
// to return the current name, and setName(newName) to set a new name.


function createPerson(name) {
    //create private variable name
    let _name = name;
    function getName(){
        return _name;
    }
    function setName(newName){
        _name = newName;
    }
    
    return{
        getName,
        setName
    }
}
let person = createPerson("Alice");
console.log("Exercise 4");
console.log(person.getName());  // Outputs: "Alice"
person.setName("Bob");
console.log(person.getName());  // Outputs: "Bob"


// Exercise 5: Limited Call Function
// Description: Write a function createLimitedCallFunction(fn, limit) that
// takes a function fn and a number limit as arguments. This returned function can only be
// called up to limit times. After the limit is reached, every subsequent call to this function
// should be ignored.



function createLimitedCallFunction(fn, limit) {
    let count = 0;

    return function(){
        if(count< limit){
        count +=1;
        fn();
        }
    }

}
function sayHelloEx5() {
    console.log("Hello!");
  }
  
  let limitedHello = createLimitedCallFunction(sayHelloEx5, 3);
  console.log("Exercise 5");
  limitedHello(); // Outputs: "Hello!"
  limitedHello(); // Outputs: "Hello!"
  limitedHello(); // Outputs: "Hello!"
  limitedHello(); // No output, subsequent calls are ignored

// Exercise 6: Rate Limiter
// Implement a function createRateLimiter(limit, interval) that limits how often a
// given function can be called. The function should return a new function that, when called,
// will invoke the original function only if a certain amount of time (interval in milliseconds)
// has passed since the last invocation. The limit parameter should specify how many times the function
// can be triggered within the given interval.

function createRateLimiter(fn, limit, interval) {
    let count = 0;
    let start = 0;
    let end = 0;
    return function(...args){
        if(count < limit){
            count++;
            //start counting time
            start = Date.now();
            fn(...args);
            end = Date.now();
            //reset count if time is bigger than interval
            if(end-start > interval){
                start = 0;
                end = 0;
                count = 0;
            }
        }
    }
}
console.log("Exercise 6");
function logMessage(message) {
    console.log(message);
  }
  
  let limitedLog = createRateLimiter(logMessage, 2, 10000); // Allow 2 calls every 10 seconds
  limitedLog("Hello"); // "Hello" is logged
  limitedLog("World"); // "World" is logged
  limitedLog("Again"); // This call is ignored