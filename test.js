const Promise = require('./index');


// Promise resolve a Obejct.then
new Promise((resolve) => {
  resolve(
    {
      then: (onFulled) => {
        onFulled('onFulled')
      }
    }
  )
}).then(res => {
  console.log(res);
  console.assert(res === 'onFulled', "Promise resolve a Obejct.then")
});

// Promise.resolve
Promise.resolve(1).then(val => {
  console.assert(val === 1, 'Promise.resolve => 1');
  console.log(val);
})

// Promise.reject
Promise.reject(2).then((val) => {}, (reason) => {
  console.log(reason);
  console.assert(reason === 2, 'Promise.reject(2)')
});

Promise.reject(2).catch(reason => {
  console.log(reason);
  console.assert(reason === 2, 'Promise.reject(2)')
});

Promise.reject(2).then(e => {
  return null
}).catch(reason => {
  console.log(reason);
  console.assert(reason === 2, 'Promise.reject(2)')
});

// Promise.race
Promise.race([
  new Promise(resolve => { setTimeout(() => { resolve(100) }, 1000) }),
  new Promise(resolve => { setTimeout(() => { resolve(200) }, 2000) }),
  new Promise(resolve => { setTimeout(() => { resolve(300) }, 3000) }),
]).then(value => {
  console.log(value);
  console.assert(value === 100, 'Promise.race(100)')
});

// Prmise.all
Promise.all([
  new Promise(resolve => { setTimeout(() => { resolve(100) }, 1000) }),
  new Promise(resolve => { setTimeout(() => { resolve(200) }, 2000) }),
  new Promise(resolve => { setTimeout(() => { resolve(300) }, 3000) })
]).then(value => {
  console.log(value);
  console.assert(
    value[0] === 100 && 
    value[1] === 200 &&
    value[2] === 300, 'Promise.all')
});

// Prmise.allSettled
Promise.allSettled([
  123,
  new Promise(resolve => { setTimeout(() => { resolve(100) }, 1000) }),
  new Promise(resolve => { setTimeout(() => { resolve(200) }, 2000) }),
  new Promise(resolve => { setTimeout(() => { resolve(300) }, 3000) }),
  Promise.reject(400)
]).then(result => {
  console.log(result)
  console.assert(
    result[3].reason === 400,
  'Promise.allSettled(100)')
});

// Promise.prototype.finally
Promise.resolve(1).then(e => {
  console.log(e)
}).finally(() => {
  console.log('Finally');
});