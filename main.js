const btn=document.querySelector(".btn");
const body=document.querySelector(".body");
let a= "a variable";


btn.addEventListener("click",function()
{
    console.log("javascript code is running");
    btn.textContent="JS code is running";
    body.style.backgroundColor="red";
})
console.log(a);
console.log("secon change");
console.log("third change");
console.log("fourth change");