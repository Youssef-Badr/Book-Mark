var siteName = document.querySelector("#bookmarkName");
var siteURL = document.querySelector("#bookmarkURL");
var tableContent = document.querySelector("#tableContent");
var submitBtn = document.querySelector("#submitBtn");
var updateBtn = document.querySelector("#updateBtn");
var search = document.querySelector("#searchName");
var boxInfo = document.querySelector(".box-info");
var closeBtn = document.querySelector("#closeBtn");
var globalIndex;




var siteList;
if (localStorage.getItem("siteList")) {
    siteList = JSON.parse(localStorage.getItem("siteList"));
    displaySite(siteList);
}else {
    siteList= [];
}



function addBookmark() {
  // console.log("added");
if(siteNameValidation() === true && siteURLValidation() === true) {
    var site = {
        name: siteName.value,
        URL: siteURL.value,
      };
   
    
    
      siteList.push(site);
      displaySite(siteList);
      clearInputs()
      saveToLocalStorage();
}else {
    // boxInfo.classList.replace("d-none","d-block");
    showBox();
}



  
}

function displaySite(sList,term=0) {
//   console.log(sList);
console.log(term);

if(sList.length > 0 ) {
    var cartoona = "";
    for (var i = 0; i < sList.length; i++) {
      cartoona += `
                      <tr> 
                      <td class="text-capitalize">${i+1}</td>
                    <td class="text-capitalize">${term?sList[i].name.toLowerCase().replace(term,`<span class="text-success fs-1 fw-bold">${term}</span>`):sList[i].name}</td>
                    <td class="text-capitalize">
                      <button class="btn btn-visit" data-index="${i}" fdprocessedid="huypqw">
                      <i class="fa-solid fa-eye pe-0"></i>
                      <a target="_blank" href="${sList[i].URL}">Visit</a>
                    </button></td>
                    <td class="text-capitalize">
                      <button onclick="deletInputs(${i})" class="btn btn-delete pe-2" data-index="${i}" fdprocessedid="hca35s">
                          <i class="fa-solid fa-trash-can"></i>
                          Delete
                        </button>
                    </td>
                    <td class="text-capitalize">
                      <button onclick="setFormToUpdate(${i})" class="btn btn-primary pe-2" data-index="0" fdprocessedid="hca35s">
                      <i class="fa-solid fa-pen-nib"></i>
                      Update
                    </button></td>
  
                      
                      </tr>
  `;
      
    }
    tableContent.innerHTML = cartoona;
}else {
    tableContent.innerHTML = `<tr >
    <td></td>
    <td class="text-danger text-center py-2">No Match Found</td>
    </tr>`
}


}
// functiojn to clear inputs
 function clearInputs() {
    siteName.value = null;
    siteURL.value = null;

 }
// function to delet inputs

function deletInputs(index) {
    
    console.log(index);
    siteList.splice(index,1);
    // console.log(siteList);
    displaySite(siteList);
    saveToLocalStorage();
}

//function to save local storage

function saveToLocalStorage() {
    localStorage.setItem("siteList", JSON.stringify(siteList));
}

// function set form  to update
function setFormToUpdate(index) {
    console.log(index);
    // from local to global
    globalIndex = index
    siteName.value = siteList[index].name;
    siteURL.value = siteList[index].URL;
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none")
}

// function to update
function updateBookmark() {
    // console.log(globalIndex);
    
    siteList[globalIndex].name = siteName.value;
    siteList[globalIndex].URL =  siteURL.value;
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none")
    displaySite(siteList);
    saveToLocalStorage(); 

}

function searchLists() {
    // console.log(bookmarkName.value);
    var term = search.value;
    // console.log(term);
    var list=[];
    for(var i =0;i<siteList.length;i++) {
        if (siteList[i].name.toLowerCase().includes(term.toLowerCase())) {
            // console.log("match" , siteList[i],i);
            list.push(siteList[i]);
         
            // saveToLocalStorage();
            
        }
        else {
            console.log("not match");
    }
    displaySite(list,term);
    }
    
}

function siteNameValidation() {
    var regex = /^[a-zA-Z0-9]{3,9}$/;
    if (regex.test(siteName.value)){
        console.log("tmam");
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid");

        
        return true;
    }else {
        console.log("mosh tmam");
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid")
        return false

    }

}
function siteURLValidation() {
    var URLRegex =  /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (URLRegex.test(siteURL.value)){
        // console.log("tmam");
        siteURL.classList.add("is-valid")
        siteURL.classList.remove("is-invalid");

        
        return true;
    }else {
        // console.log("mosh tmam");
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid")
        return false

    }
}
function showBox() {
    if (siteNameValidation() === false || siteURLValidation() === false || siteName.value===null || siteURL.value===null){
        boxInfo.classList.replace("d-none","d-block");
        // document.body.style.overflow = "auto";
    }
}


// function to close box
function closeBox() {
boxInfo.classList.replace("d-block","d-none");

// document.body.style.overflow = "auto";
}


closeBtn.addEventListener("click" , closeBox );

document.addEventListener("click" , function(e) {
// console.log(e.target);

if (e.target.id === "box") {
    closeBox();
}


})
 