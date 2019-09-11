async function asyncExample() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  
    let result = await promise;
    console.log('async await done');
}
  
asyncExample();

//console.log(promise);   // it will say promise not defined.

const testVar = 14;
//testVar = 15;   // This will say an error, trying to assign to a const variable.
