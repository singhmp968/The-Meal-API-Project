
//console.log(localStorage.getItem('resValue'))
let mealIds = localStorage.getItem('resValue')
let MealAPiByID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="


function displayTheDetailSec(responseJSON){
let displayImageAndDetails = '';
for( let i in responseJSON.meals){
	//console.log(responseJSON.meals[i])

	displayImageAndDetails += `
	<div class="Image_And_Detail">
			<h1 class="meal_Name">${responseJSON.meals[i].strMeal}</h1>
            <div class="imgAndDesc">
				<div class="imageDem1">
					<img src = "${responseJSON.meals[i].strMealThumb}">
				</div>
				<div class="description">
					<p>${responseJSON.meals[i].strInstructions}</p>
					<a href = "${responseJSON.meals[i].strYoutube}">click for youtube</a>
				</div>
			<div>
        </div>

	
	`


}
document.querySelector('.main_details_Page_Section').innerHTML = displayImageAndDetails;


}

function callingMealDetailById(){
    // alling Ajax 
	let xhrRequest1 =new XMLHttpRequest(); // for making request
	
	xhrRequest1.onload= function(){
		//console.log('dasd=>',xhrRequest1.response) // response from the server
		var responseJSON = JSON.parse(xhrRequest1.response)
		console.log(responseJSON)
		displayTheDetailSec(responseJSON);
		};
	xhrRequest1.onerror = function(){
	console.log('Request Failed @ without Jquery method');
	};
	xhrRequest1.open('get',MealAPiByID+mealIds,true) 
	xhrRequest1.send()


}
callingMealDetailById();
