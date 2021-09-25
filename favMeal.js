let mealIdsval = JSON.parse(localStorage.getItem('mealid'))
// console.log(mealIdsval.length)
let newMealsArray =[]
let Mealdetils = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
let chckdata = []
 function displayfavValue() {
     let promise = new Promise((resolve,reject)=>{

        for(i in mealIdsval){
            let mid = '';
            mid = mealIdsval[i];
            let newurl=Mealdetils+mid.mealIds;

            fetch(newurl).then((response)=>{
                return response.json();
            }).then((data)=>{
    //            console.log(data)
                displayfavbookmarks(data);
            //     chckdata.push(data)
            //    return chckdata; 
            })    
            
            resolve("data is being resolved")
        }
     })
     return promise;
    }
 displayfavValue().then((seccess)=>{
    console.log(seccess)
    
 }).catch(()=>{
     console.log('failed')
 });
 
 function displayfavbookmarks(data){
    
    newMealsArray.push(data);
    if(mealIdsval.length == newMealsArray.length){
        displaytheDatas(newMealsArray)
    }
 }

 function displaytheDatas(newMealsArray){
    // console.log('@#$',newMealsArray)
 
    let displayImahes = '';
    for(let i in newMealsArray){
        //console.log(newMealsArray[i].meals[0])
        let newData = newMealsArray[i].meals[0]
      //  console.log(newData)
        
        displayImahes+=`
        <div id="mealbox_${newData.idMeal}" class="newMain">
            <div  class="image_and_Details">
                <div class="imageDem">
                    <img src="${newData.strMealThumb}">
                </div>
                <div style="text-align: center;">
                    <p style=" color:white">${newData.strMeal}</p>
                    <div>
                        <button class="RemoveButton" onClick = "removeClickd(${newData.idMeal},'mealbox_${newData.idMeal}')" >
                         Remove
                         </button>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    document.querySelector('.main_ImageANdDet_Sec').innerHTML =displayImahes;
}


function removeClickd(val,newMain){
   let removableeme = document.getElementById(newMain);
   removableeme.remove(); 
    console.log('clicked',newMealsArray)
    console.log(mealIdsval)
   let Idmeals = '';
    for(let i in newMealsArray){
        Idmeals = newMealsArray[i].meals[0].idMeal;
        // console.log(newMealsArray[i])
        if(Idmeals == val){
            // console.log(val)
             console.log(Idmeals)
            // newMealsArray.splice(i,1); // @@ Imp @ pos i remove only one element**** 
            // mealIdsval.splice(i,1)
           handleDeleteAction(Idmeals)
           
            return;
        }
    }

}


function handleDeleteAction(Idmeals){
   // console.log(localStorage.getItem('mealId'))    
    for(let i of JSON.parse(localStorage.getItem('mealid'))){
        if(i.mealIds == Idmeals)
        {
            JSON.parse(localStorage.getItem('mealid')).splice(i,1);
            //console.log(Idmeals)
          //  localStorage.removeItem('mealid')
        }
    }
    console.log(JSON.parse(localStorage.getItem('mealid')))

    // let k = Object.keys(localStorage);
    // console.log(k)
}
/* promise 2nd way
 
*/
// async function getJSONData() {

//     for(i in mealIdsval){
//         let mid = '';
//         mid = mealIdsval[i];
        
//         let newurl=Mealdetils+mid.mealIds;
//         console.log(newurl)
        
//         //console.log(ft)
    

//     const response = await fetch(newurl)
//     var data = await response.json()
//     console.log(data)

// }
//  }
//  getJSONData();
 
