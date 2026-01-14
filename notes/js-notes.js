// js is execution :
// in execution context (global) = memory + code == variable env + thread of execution.
// here in this thread of execution subsequent execution context are created aka nesting happens
// now these nested context are beautifully managed by Callstack which stroes these execution 
// contexts and maintains the order of executon (global context is at the bottom).
// A new exe context is created in case of a function call only.

// hoisting in js : navie -> declerations are hoisted to the top 
// so during compilation memory is alloted first to variables and functions in variable env. 
// for variables the value is undefined (it will be not defined for variables which are
// not in the code) and for functions the inner code is stored as it is.
// that's why if we call the function before its definition in code it will still work, and if we
// access variable than it will be undefined as its value is alloted during execution of code (thread)

// js is losely type aka no strict data types , java is strictly typed

// scope : a variable / memory location available for a execution context is from its own local
// memory and its parents memories (lexcial scope a.k.a hierarchy) , simple words a variable only
// limited till its nearest {..}

// variable types : const and let are also hoisted but in a different space than var 
// these two go to temporal dead zone i.e time between decleration and initialization , so you cannot 
// access these two like var , they are more stricter than var 
// const (fixed value) > let (avoid undefine issue) > var 

// block scope means {..}
// let and const are defined in block scope and var is in function scoped:

// shadowing : local gets more priority than parent/global 
// i.e js always checks the nearest (innermost) scope first, and only goes outward if the variable
// does not exist there.

let a = 1; // script scope
var b = 2; // global scope

{
    let a = 3; // block scope
    console.log(a); // prints 3 -> shadowing
    var b = 4; // global scope
    console.log(b); // prints 4 -> shadowing , new exe context will be created and it will have new b

    const c = 5; // block scope
}

console.log(a); // prints 1 , no shadowing here , taken from script scope
console.log(b); // prints 4 , as b was stored in global scope , the value got overwritten

// another eg :
var text = 'outside';
function logIt(){
    console.log(text); // will print undefine 
    var text = 'inside';
};
logIt()
console.log(text) // -> outside

// this happens because var is function scoped it will be available only for its function
// here var text is hoisted inside the function scope and this shadows the global var text and that
// is why we get undefined
// and shadowing won't happen in case of an function because it has its own exe context

// closure : function + its lexical scope (local + parent's memory)

function x() {
    var a = 1;
    function y() { console.log(a) }
    return y;
}

var fun = x(); 
console.log(fun());
// now here after x() is completed its execution context get removed from callstack and than
// when we will do fun() we should get not defined logically, but i reality we didn't just 
// recevied a func we recevied a cloure i.e function with its lexical scope

// function statement aka declaratiom
function a(){ // this will be stored in memory with its code since the start
    console.log("...")
}

// function expression 
var b = function () { // this would be treated as a variable and b = undefined at first
    console.log("b called");
}

// anonymous function are functions with no name , they are used as a value to asign to a vairble
// as seen above an anoynm fnc is assign to var b.
// you pass arguments to a func and when you use them in fnc they are parameters

// first class functions/ citizens : this is the ability to use functions as values i.e pass as 
// arguments , recive as params , and also return the functions.

// high order functions : the function that take functions as params and can return functions as value
// eg : map() , filter() , reduce()

//callbacks :
// functions passesd as params that can be called later.. eg : setTimeOut(fnc , timeout); , eventListners
// problems :
// - callback hell -> callback inside a callback...
// - inversion of control -> after giving a callback to a function we will never know if that
//   function will ever execute that callback.

// event listeners use callbacks and these function will have their own closures to maintain the variables
// now this closures will stay in the memory as long as event listeners are attached , this makes them
// heavy and that is why we remove this evnt listnrs for optimization.

// web api's / window object -> browser's abilities
// - setTimeout() , console.log() -> no need of window. cause it is global object
// - DOM api's (document , addEventListner)
// - fetch
// - local storage , location (https://..)


// event loop :

// - callstack aka the main thread -> part of js engine (this stack does only one thing at a time)
// - callback queue / task queue -> all the task that need to be performed after some time goes here
// - microtask queue -> this has more priority than callback queue , it is for promises (fetch)
// - event loop : this keep a watch on the above tree and once the callstack is empty it pushes
// task from the queues , the queues and loop are part of browser's js env.
// callback queue can suffer starvation if microtask queue has more tasks.


// js engine : eg : v8 (node , chrome) , spidermonkey(firefox) , this engine is also a part of
// js enviroment.
// - what it does : code -> parsing (abstract syntax tree) -> compilation -> execution
//   and it has its memory heap and call stack.
// - It uses Just In Time compliation i.e it uses both compiler (compile full code first) 
//   + interpreter (line by line)
// - Memory heap has Garbage Collection (GC) that uses Mark & Sweep algo for clearing garbage.


// promises : 

// we get this in 3 states pending - (async task is going on), fullfiled and rejected
// now once our promise is fullfiled we will add .then() and pass or callbacl fnc i.e do the 
// further tasks , this is used to avoid callback hell;
// eg :

// promise object takes a function that takes 2 callbacks resolve and reject that will be use after
// the async task is done to notify about success/faiure

const prom = new Promise(function(res , rej) {
    if(1 > 2){
        res("Ok");
    }else{
        rej("failed");
    }
})

// by using .then() we attach the 2 res/rej callbacks to our promise
prom.then(
    (success) => console.log(success) , // the errors here will be handled by catch
    (err) => console.log(err)
)
.catch(err => console.log(err)); // this handles all the error thrown above it , this will 
// any error that may appear after the promise is resolved


// now in promise chaining what happens is we return a new promise in the .then() part and to
// handle that we again add .then to it like 
prom
.then((succ) => {
    console.log("first promise returned");
    return new Promise(function(res , rej) { res(true)});
})
.then(() => console.log("second promise resolved"))
.catch(err => console.log(err))

// - promise.all([array of promises]) -> throws error if any promise fails else we get array of values
// - promise.allSetteled([..]) -> return final state of result after all the promises are 
//   settled (resolve / rejected)
// - promise.race([...]) -> returns the result of first settled promise it can be either succ of fail
// - promise.any -> same as race but will only return the result of first success promise if everyone
//   failed then we will get an array of errors (aggregate errors).



// async & await : syntactical sugar for .then() , we won't have to do promise chaining

// async is a keyword which we use to make functions asynchronous , an async fnc always returns a promise
// even if the fnc return a singular vakue it will wrap it in a promise and then return it.

// await kewword is only to use in async function , it is use to resolve promises , i.e noramlly we do
// promise.then(..) , here we do let res = await promise;
// these fetch , axios are promises

// we use await over then because await makes the main thread appear paused (main thread never stops) i.e the code
// after await will run after sometime , this is because await is the part of language syntax
// and .then() is just a function call that registers a callback.

// what happens is when a async func is in callstack and it encounters any promises (await keyword)
// it suspends the function  (removes from callstack and stores it exe context , state , lexical env) 
// then it passess over the promises to Web Api's for processing, once the promises are resolved
// they register a task in microtask queue saying 'resume this async fnc with this result value'
// and when callstack is empty again the fnc comes back to callstack and resume from where it stopped
// so this doesn't stop the other function from running only the current one stops.

// why await has to be only used in a async func ?
//- because async tells the js engine to treat this function as a suspendable state machine
//  break points are added at 'await', stores execution state. await changes how the execution
//  proceeds , it needs a place to suspend , promise to resume execution from.

// call : we can use another class's function with another object or 
// use same function for multiple object , the function will be written using this keyword 
// and the object will be passed as a reference for that this.
// eg : obj1.function.call(obj2 , arg1 , arg2 ...)

// apply : same as call the only diff is that we pass the arguments as a list
// eg : obj1.function.call(obj2 , [arg1 , arg2 ...])

// bind() : instead of calling the function it returns the new function with modified context
// eg : let newFunc = obj1.function.bind(obj2 , arg1);
// newFunc();

// currying : a function with multiple arguments is transformed into a sequence of nested functions,
//  each taking a single argument. This allows you to call the function in steps, 
// receiving a new function after each argument is provided, until all arguments are fulfilled 
// and the final value is returned. it can be done with closures and bind()
// eg :
function a(x){
    function b(y){
        console.log(x*y);
    }
}
let multiplyByTwo = a(2);
multiplyByTwo(3) // will do 2*3 -> 6

// ?? is uses to compare null or undefined values , nulll ?? 0 -> will give 0
// || is use to compare falsy values , 0 ?? 1 -> will give 1
// falsy values in js : false ,0 , "" , null , undefined ,
// null -> set by developer 
// undefined -> set by js engine



// js is single threaded , synchronous language , its env is asynchronous , js engine only has call stack
// refer namaste js dig
// ┌─────────────────────────────┐
// │        Browser / JS Env     │
// │                             │
// │  Web APIs                   │
// │  - setTimeout               │
// │  - DOM APIs                 │
// │  - fetch                    │
// │                             │
// │  Queues                     │
// │  - Callback / Task Queue    │
// │  - Microtask Queue          │
// │                             │
// │  Event Loop                 │
// │                             │
// │  JS Engine (V8)             │
// │  - Call Stack               │
// │  - Heap                     │
// └─────────────────────────────┘
