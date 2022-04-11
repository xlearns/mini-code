import miniPromise from './index.js'
// test 1

// console.log(4)
// setTimeout(()=>{
//   console.log(2)
// })
// let prom = new miniPromise((resolve,reject)=>{
//   console.log(1)
//   resolve(123)
// })
// prom.then((res)=>{
//   console.log(res)
// })
// console.log(5)

// test 2

// let prom = new miniPromise((resolve,reject)=>{
//   resolve(123)
// })
// prom.then((res)=>{
// console.log(res)
// })

// test 3
// miniPromise.resolve(66).then((res)=>{
//   console.log(res)
// })

// test 4
// miniPromise.resolve(()=>{
//   console.log(123)
// }).then((res)=>{
//   res()
// })


//test 5

miniPromise.all([miniPromise.resolve(1),miniPromise.resolve(2),miniPromise.resolve(3)]).then((res)=>{
  console.log('all',res)
})

//test 6

miniPromise.race([miniPromise.resolve(1),miniPromise.resolve(2),miniPromise.resolve(3)]).then((res)=>{
  console.log('race',res)
})