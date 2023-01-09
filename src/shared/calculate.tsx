import { Ref } from "vue";

export const calculate = (refAmount: Ref<string>, n:number | string, operator?: { (x: number, y: number): number; (arg0: number, arg1: number): number; }) => {
  
  const appendText = (n: string | number) => { 
    const nString = n.toString()
    const dotIndex = refAmount.value.indexOf('.')
    if(refAmount.value.length >= 13) { return }
    if(dotIndex >= 0 && refAmount.value.length - dotIndex > 2){ return }
    if (nString === '.') {
      if (dotIndex >= 0) { // 已经有小数点了
        return
      }
    } else if (nString === '0') {
      if (dotIndex === -1) { // 没有小数点
        if (refAmount.value === '0') { // 没小数点，但是有0
          return
        }
      }
    } else {
      if (refAmount.value === '0') {
        refAmount.value = ''
      }
    }
    refAmount.value += nString
  }
  appendText(n)
  
  
  // add
  // Subtract

  let lastNumber = null
  let firstNumber = null
  const addSubIndex = refAmount.value.indexOf('+') || refAmount.value.indexOf('-')
  
  const lastOperator = refAmount.value.split('').reverse().find(c => c === '+' || c === '-')
  if(!lastOperator) { return }
    console.log('lastOperator=>',lastOperator);

    firstNumber = refAmount.value.split(lastOperator).shift()
    lastNumber = refAmount.value.split(lastOperator)[1]


  if(n === '+' || n === '-') {
    if(firstNumber && lastNumber && operator){
      const result = operator!(parseFloat(firstNumber), parseFloat(lastNumber))
      console.log('result', result);
      refAmount.value = result.toString()
    }
    
  }
  // // 5. 将运算结果放入 refAmount.value 中
  // console.log('refAmount.value', refAmount.value);
  




  // let firstOperand = null;
  // let secondOperand = null;

  // const addIndex = refAmount.value.indexOf('+')
  // const subIndex = refAmount.value.indexOf('-')

  
  // let lastAddSub = addSub;

  // const arr = refAmount.value.split(addSub)
  // console.log('arr=>',arr);

  // firstOperand = Number(arr[0])
  // console.log('fisrt=>',firstOperand);

  // secondOperand = Number(arr[1])
  // // console.log('second=>', secondOperand);
  
  // if(arr.length > 2 ) {
  //   refAmount.value = operator(firstOperand,secondOperand) + lastAddSub
    
  //   // 如果有连着的加减号，就用addSub 代替 连续的加减号
  // }
  //   if(addIndex > 0 && subIndex > 0) {
  //     console.log('add && sub');
      
  //     refAmount.value.replace('+-', '-' )
  //   }
    

  // if(addSubIndex >= 0) {
  //   lastAddSub = refAmount.value[addSubIndex - 1]
  //   console.log(refAmount.value.slice(addSubIndex - 1, 1))
  //   console.log('lastAddSub=>',lastAddSub);
  // }
  // console.log(refAmount.value);

  // console.log('repeat=>',refAmount.value.slice(addSubIndex - 1, 2));
  
  
  
  
}


