/**
 * 
 * @param {number} total 
 * @param {number} num
 * @return {number[]} 
 */
// function hongbao(total,num){
//     // 公平性 
//     // 随机的时候在 平均金额附近随机
//     const arr = [];
//     let restAmount = total;
//     let restNum = num;
//     for(let i = 0;i<num-1;i++){
//         let x = Math.floor(Math.random()*restAmount/restNum*2)/2;
//         restAmount -= x;
//         restNum -= 1;
//         arr.push(x);
//     }
//     arr.push(restAmount);
//     return arr;
// }

function hongbao(total, num) {
    const arr = [];
    let restAmount = total; 
    let restNum = num; 
    for (let i = 0; i < num - 1; i++) {
        // 计算当前最大可分配金额，确保后续每个红包至少有 0.01 元
        const maxAmount = (restAmount / restNum)*2 ;
        let amount = Math.random() * (maxAmount - 0.01) + 0.01;
        amount = parseFloat(amount.toFixed(2));
        arr.push(amount);
        restAmount -= amount;
        restNum--;
    }
    arr.push(parseFloat(restAmount.toFixed(2)));
    return arr;
  }
  
console.log(hongbao(10,3));