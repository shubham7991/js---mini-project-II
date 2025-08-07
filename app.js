// const BASE_URL= "https://api.frankfurter.app/latest?from=USD&to=INR";

// const dropdowns= document.querySelectorAll(".dropdown select");
// const btn=document.querySelector("form button");

// const fromCur=document.querySelector(".from select");
// const toCurr=document.querySelector(".to select");

// // for(code in countryList){
// //     console.log(code,countryList[code]);
    
// // }

// for(let select of dropdowns){
//     for(currCode in countryList){
//         let newOption=document.createElement("option");
//         newOption.innerText=currCode;
//         newOption.value=currCode;
//         select.append(newOption);
//         if(select.name==="from"&&currCode==="USD"){
//             newOption.selected="selected";
//         } else if(select.name==="to"&&currCode==="INR"){
//             newOption.selected="selected";
//         }
//     }
//     select.addEventListener("change",(evt)=>{
//         updateFlag(evt.target);
//     })
// }

// const updateFlag=(element)=>{
//  let currCode=element.value;
// let countryCode=countryList[currCode];
// let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
// let img= element.parentElement.querySelector("img");
// img.src=newSrc;

// }

// btn.addEventListener("click",(evt)=>{
//   evt.preventDefault();
//   let amount =document.querySelector(".amount input");
//   let amtVal=amount.value;
//   if(amtVal===""||amtVal<1){
//     amtVal=1;
//     amount.value="1";
//   }

//   console.log(fromCur.value,toCurr.value);
  
// //   const URL =`${BASE_URL}/${fromCurr}/${toCurr}.json`

// })


// Select all dropdowns and img tags
const dropList = document.querySelectorAll(".dropdown select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");

// Function to update the flag
const updateFlag = (element) => {
  const currencyCode = element.value;
  const imgTag = element.parentElement.querySelector("img");
  imgTag.src = `https://flagsapi.com/${currencyCode}/flat/64.png`;
};

// Populate dropdowns
for (let select of dropList) {
  for (let currencyCode in countryList) {
    let selected =
      (select.name === "from" && currencyCode === "USD") ||
      (select.name === "to" && currencyCode === "INR")
        ? "selected"
        : "";
    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    select.insertAdjacentHTML("beforeend", optionTag);
  }

  // Change flag when dropdown changes
  select.addEventListener("change", function () {
    updateFlag(this);
  });
}

// Convert button logic
getButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input").value;
  if (amount === "" || amount <= 0) amount = 1;

  const exchangeText = document.querySelector(".msg");
  const URL = `https://api.exchangerate.host/latest?base=${fromCurrency.value}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurrency.value];
    let total = (amount * rate).toFixed(2);
    exchangeText.innerText = `${amount} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
  } catch (error) {
    exchangeText.innerText = "Something went wrong.";
  }
});
