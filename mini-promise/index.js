/*
1.当 pending 时， thenable 函数由一个队列维护
2.当状态变为 resolved(fulfilled) 时，队列中所有 thenable 函数执行
3.当 resolved 时， thenable 函数直接执行
*/

/*
  let prom = new Promise((resolve,reject)=>{
      resolve(123)
  })
  prom.then((res)=>{
    console.log(res)
  })
*/


// 微任务
const nextTick = (fn)=>{
  // nodejs 可以利用 process.nextTick 实现异步
  if(typeof window=='undefined'&&process&&typeof process.nextTick =='function'){
    // node环境
      return process.nextTick(fn)
  }else{
    //浏览器环境 可以利用MutationObserver实现浏览器的nextTick 
    let counter = 1;
    const observer = new MutationObserver(fn);
    let textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true,
    });
    counter += 1;
    textNode.data = String(counter);
  }
}


class miniPromise{
  constructor(executor){
    // 状态单向所以每一步操作都需要查看当前状态
    this.status = 'pending';
    this.value = undefined;
    // 执行器 在resolve或reject执行,在then中push
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    try{
      executor(resolve.bind(this), reject.bind(this));
    }catch(e){
      miniPromise.reject(e);
    }


    function resolve(value){
      // 改变状态
      // 改变value
      // 执行reolveCallbacks
      if(this.status === 'pending'){
        this.status = 'resolved';
        this.value = value;
        this.resolveCallbacks.forEach(cb=>{
          cb(value);
        })
      }
    }

    function reject(reason){
       // 改变状态
        // 改变value
        // 执行reolveCallbacks
        if(this.status === 'pending'){
          this.status = 'rejected';
          this.value = reason;
          this.rejectCallbacks.forEach(cb=>{
            cb(reason);
          })
        }
    }
  }

  then(onFulfilled, onRejected){
    // 返回一个新的promise
    // 状态如果是Pennding，则push
    // 如果是resolved，则直接执行第一个参数
    // 如果是rejected，则直接执行第一个参数
    let self = this
  
    return new miniPromise((resolve,reject)=>{
     // 调用指定的回调函数处理，根据执行结果，改变return的promise状态
      function handle(callback){
        try{
          let result = callback(self.value);
          // 如果是promise
          if(result instanceof miniPromise){
            result.then(resolve,reject)
          }else{
            // 不是promise
            resolve(result);
          }
        }catch(error){
          reject(error);
        }
      }
      switch (self.status) {
        case 'pending':
          self.resolveCallbacks.push(()=>{
            handle(onFulfilled)
          })
          self.rejectCallbacks.push(()=>{
            handle(onRejected)
          });
          break;
        case 'resolved':
          nextTick(()=>{
            handle(onFulfilled)
          })
          break;
        case 'rejected':
          nextTick(()=>{
            handle(onRejected);
          })
          break;
      }
    })
  }
  catch(promises){
    return this.then(undefine,promises)
  }
  finally(promises){
    // todo
  }
  // promise方法
  static resolve = function(value){
    // 返回一个成功的promise
    return new miniPromise((resolve,reject)=>{
      // value 可能是一个promise
      if(value instanceof miniPromise){
        value.then(resolve,reject)
      }else{
       // value不是promise => promise变为成功，数据是value
        resolve(value);
      }
    })
  }

  static reject = function(reason){
     // 返回一个失败的promise
     return new miniPromise((resolve,reject)=>{
        reject(reason);
      })
  }

  static all = function(promises){  
    // 返沪一个新的promise
    let result = Array.from({length:promises.length})
    // promise完成个数
    let count = 0
    return new miniPromise((resolve,reject)=>{
      promises.forEach((p,index)=>{
          miniPromise.resolve(p).then((value)=>{
            // 完成一个promise的时候count自增
            count++
            // 将结果添加到result
            result[index] = value;
            if(count=== promises.length){
              resolve(result);
            }
          },(err)=>{
            reject(err);
          })
      })
    })
  }

  static race = function(promises){
    // 返回一个新的promise
    return new miniPromise((resolve,reject)=>{
      promises.forEach((p,index)=>{
        miniPromise.resolve(p).then((res)=>{
          // 有一个执行完毕就resolve
          resolve(res)
        },err=>{
          reject(err);
        })
      })
    })
  }
  static allsettled = function(promises){
    // todo
  }

  static any = function(promises){
    // todo
  }
 
}


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