
let MealApiByAlphabet = "https://www.themealdb.com/api/json/v1/1/search.php?f="
let MealApiByName = "https://www.themealdb.com/api/json/v1/1/search.php?s="
let suggestionBut = document.getElementById('search_input_Id')
let bodyTag = document.querySelector('.main_body')
let main_ImageANdDet_Sec = document.querySelector('.main_ImageANdDet_Sec')
let circleTah = document.getElementById('circleNum');
let numoffvlis = 0;
// setting
let arrval=[];
function getDetails(IdValue){
	let mealIds = document.getElementById(IdValue);
	let mIds= mealIds.getAttribute('value')
	getMealDetailsById(mIds)
}
function showImages(resJson){
	let newDivss = document.querySelector('.newMain')
	let inc = 0;
	let newMain
	if(newDivss!=null){
	 	document.querySelector('.newMain').remove();
	}
	newMain =document.createElement('DIV')
	newMain.classList.add('newMain')
	main_ImageANdDet_Sec.appendChild(newMain)		 
	let newImageDetSec;
	let ImgDem;
	let newImgTag;
	let textCont = ''
	if(resJson.meals=='null'){
		return
	}
	else{
	for(i in resJson.meals){
		let moreDet;
		inc=inc+1;
		textCont=''
		newImageDetSec = document.createElement('DIV')	
		newImageDetSec.classList.add('image_and_Details')
		newMain.appendChild(newImageDetSec)
		ImgDem = document.createElement('DIV')
		ImgDem.classList.add('imageDem')
		newImageDetSec.appendChild(ImgDem)
		newImgTag = document.createElement('img')
		newImgTag.setAttribute("src", resJson.meals[i].strMealThumb)
		ImgDem.appendChild(newImgTag)
		textCont = resJson.meals[i].strInstructions.slice(0,95)
		let newParaInst = document.createElement("p")
		newParaInst.classList.add('InstClass')
		newParaInst.textContent = textCont+'...';
		newImageDetSec.appendChild(newParaInst);		
		let favButton = document.createElement('BUTTON');
		favButton.textContent = 'Add to Favourite';
		favButton.style.backgroundColor='red'
		newImageDetSec.appendChild(favButton)
		let favIdButtvalue = '';
		favIdButtvalue = resJson.meals[i].idMeal;
		favButton.setAttribute('value',favIdButtvalue);
		moreDet = document.createElement('BUTTON');
		moreDet.textContent = 'get more details';
		let idsval = ''
		idsval='butt'+inc
		moreDet.setAttribute('id',idsval)
		moreDet.setAttribute('value',resJson.meals[i].idMeal)
		newImageDetSec.appendChild(moreDet)
		moreDet.addEventListener('click',function() {			
			getDetails(idsval);
						//		
			
		})
		favButton.addEventListener('click',function(){
			
			//console.log(numoffvlis)
			setBookmarks(favIdButtvalue);
			abc();
		})		
	}
}		
}
function fetchMealApiRequest(e){   
	var xhrRequest =new XMLHttpRequest(); // for making request
	// onload is the function which is called once the request is recived
	xhrRequest.onload= function(){
		var responseJSON = JSON.parse(xhrRequest.response)
		showImages(responseJSON)
	};
	xhrRequest.onerror = function(){
	
	};
		xhrRequest.open('get',MealApiByName+e,true) 
		
	//}
	xhrRequest.send()


}

function getMealDetailsById(mealIds)
{
	window.location.href = "mealsDetails.html";
	localStorage.setItem('resValue',mealIds)
}

function setBookmarks(favIdButtvalue){
	let newObs = {}
	newObs.mealIds = favIdButtvalue
	arrval.push(newObs)
	localStorage.setItem("mealid",JSON.stringify(arrval));
}

function abc() {
	let listOfextistingFav = JSON.parse(localStorage.getItem('mealid'))
	circleTah.classList.add('circlefornum');

			if(listOfextistingFav!=null){
				circleTah.textContent = listOfextistingFav.length;
			}else{
				circleTah.textContent ='0';
			}

}
abc();

let kp =''


let newkp = ''
suggestionBut.addEventListener('keydown',function(e){
	console.log(e)
let ip1=document.getElementById('search_input_Id').value
if(e.key>='a' && e.key<='z' || e.key>='A' && e.key<='Z'){
fetchMealApiRequest(ip1)	
}
})
