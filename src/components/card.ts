// export default function initTabs(){
//     const tabsArr = document.querySelectorAll('.main-under1');
//     const priseArr = document.querySelectorAll('.main-under2');
//     for (let i = 0; i<tabsArr.length;i++)
//     {
//         const buttons = tabsArr[i].children
//         const prices = priseArr[i].children
//
//         for (let j = 0; j<buttons.length;j++)
//         {
//             buttons[j].addEventListener('click',()=>{
//                 for (let k=0;k<prices.length;k++){
//                     prices[k].classList.add('hidden')
//                     buttons[k].classList.remove('active')
//
//                 }
//                 prices[j].classList.remove('hidden')
//                 buttons[j].classList.add('active')
//
//             })
//         }
//
//
//     }
// }
export default function initTabs(){
    const tabs1Arr = document.querySelectorAll('.main-under1');
    const tabs2Arr = document.querySelectorAll('.main-under2');
    const price1Arr = document.querySelectorAll('.main-price');
    const price2Arr = document.querySelectorAll('.main-price5');
    console.log(price1Arr)
    console.log(price2Arr)
    
    for (let i = 0; i<tabs1Arr.length;i++)
        tabs1Arr[i].addEventListener('click',()=>{
            console.log("1")
            tabs1Arr[i].classList.remove('hidden-card')
            tabs1Arr[i].classList.add('active-card')
            tabs2Arr[i].classList.remove('active-card')
            tabs2Arr[i].classList.add('hidden-card')
            price1Arr[i].classList.remove('hidden-price')
            price1Arr[i].classList.add('active-price')
            price2Arr[i].classList.add('hidden-price')
            price2Arr[i].classList.remove('active-price')
            
        })
    for (let i = 0; i<tabs2Arr.length;i++)
        tabs2Arr[i].addEventListener('click',()=>{
            console.log("1")
            tabs1Arr[i].classList.add('hidden-card')
            tabs1Arr[i].classList.remove('active-card')
            tabs2Arr[i].classList.add('active-card')
            tabs2Arr[i].classList.remove('hidden-card')
            price1Arr[i].classList.add('hidden-price')
            price1Arr[i].classList.remove('active-price')
            price2Arr[i].classList.add('active-price')
            price2Arr[i].classList.remove('hidden-price')
        })
            
            
    
}

