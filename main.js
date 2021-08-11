const meals=document.querySelector('.meals');
const search= document.querySelector(".search");
const favouriteContainer=document.querySelector(".fav-meals")
const input = document.querySelector(".input");
const random=document.getElementById("random");
const mealPopup=document.getElementById("meal-popup");
const popupCloseBtn=document.getElementById("close-popup");
const mealInfo=document.getElementById("meal-info");
getRandomMeal();

fetchfavMeals();
async function getRandomMeal()
{
const resp= await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
const respData= await resp.json();
const randomMeal= respData.meals[0];
addMeal(randomMeal);
console.log(randomMeal);
}

function addMeal(mealData)
{
    console.log('meal data is',mealData)
const meal= document.createElement('div');
meal.classList.add('meal');
meal.innerHTML=`
    <div class="meal">
    <div class="meal-header">
    
    <span class="random">Recipe</span>
    <img src="${mealData.strMealThumb}"/>
    </div>
         <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn far fa-heart"></button>    
        </div>
    </div>                
`;

const btn=meal.querySelector(".meal-body .fav-btn");
console.log(btn);
btn.addEventListener("click",function()
{
    if(btn.classList.contains("active"))
    {
        removeMealsFromLS(mealData.idMeal)
        btn.classList.remove("active")
    }
    else
    {
        favouriteContainer.innerHTML="";
        btn.classList.add("active")
        addMealToLS(mealData.idMeal);
    }
 //cleaning the container
 //favouriteContainer.innerHTML=" ";
 //fetchfavMeals();   
});

meal.addEventListener("click", function () {
    showMealInfo(mealData);
  });


meals.appendChild(meal);
//random.classList.add(".hide");
}

async function getMealById(id)
{
    const meal1=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const respData=await meal1.json();
    const meal=respData.meals[0];

    return meal;
}

async function getMealBySearch(mealName)
{
    const meal1=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    const respData=await meal1.json();
    const meal=respData.meals[0];
    console.log(meal);

    return meal;
}


//search.addEventListener("click", async function()
//{
  //  const searchValue=input.value;
    //console.log(searchValue);
    //const mealData=await getMealBySearch(searchValue);
    ///console.log(mealData);
    //meals.innerHTML="";
    //addMeal(mealData);
//const mealName=document.querySelector(".input").value;
//getMealBySearch(mealName);
//});


function addMealToLS(mealId)
{
    const mealIds=getMealsfromLS();
    console.log(mealId);

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
    fetchfavMeals();
}

function getMealsfromLS()
{
    const mealIds=JSON.parse(localStorage.getItem('mealIds'));
    return mealIds == null ? [] : mealIds;
}

function removeMealsFromLS(mealId)
{
    const mealIds=getMealsfromLS(); 
    localStorage.setItem(mealIds,
        JSON.stringify(mealIds.filter(function(id) {
    if(id!=mealId)
        {
            return id;
        }       
    })
    )
    );
}

async function fetchfavMeals()
{
    const mealIds=getMealsfromLS();
    ///const meals=[];
    let meal;
    favouriteContainer.innerHTML="";
    
    for(let i=0;i<mealIds.length;i++)
    {
        const mealId=mealIds[i];
        console.log("Meal...." + mealId[i]);

        meal=await getMealById(mealId);

        //meals.push(meal);
        addMealFav(meal,mealId);
    }
        //console.log(meals);
        //Adding this meal to page    
}
function removeMealsFromUI(mealId){
    var element = document.getElementById(`meal_${mealId}`);
    element.parentNode.removeChild(element);  var element = document.getElementById(`${mealId}}`);
    element.parentNode.removeChild(element);

}
 
function addMealFav(mealData,mealId)
{
    const meal=document.createElement("li");
    
    meal.classList.add("meal");
    meal.setAttribute('id',`meal_${mealId}`)
    meal.innerHTML=`
        <img src=${mealData.strMealThumb} /><span>${mealData.strMeal}</span>
        <button class="clear" >   <i class="fas fa-window-close" id=${mealId}></i>  </button>
    `;

   // favouriteContainer.appendChild(meal);
    
    const btn=meal.querySelector(".clear");
    btn.addEventListener("click",function(event)
    {   console.log(event.target.id)
        removeMealsFromLS(mealData.idMeal);
        removeMealsFromUI(event.target.id)
        
        fetchfavMeals();
    }) 

    favouriteContainer.appendChild(meal);
}




search.addEventListener("click", async function () {
    const searchValue = input.value;
    console.log(searchValue);
  
    const mealData = await getMealBySearch(searchValue);
    console.log(mealData);
  
    meals.innerHTML = "";
  
    addMeal(mealData, false);
  });
  
  popupCloseBtn.addEventListener("click", function () {
    mealPopup.classList.add("hidden");
  });
  
  function showMealInfo(mealData) {
    //update the meal info
    const mealEl = document.createElement("div");
  
    mealEl.innerHTML = `
    <h4>${mealData.strMeal}</h4>
    <img src = "${mealData.strMealThumb}" />
    <p>
    ${mealData.strInstructions}
    
    </p>
    
    `;
  
    mealInfo.appendChild(mealEl);
  
    //show the popup
    mealPopup.classList.remove("hidden");
  }
  