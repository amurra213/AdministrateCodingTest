var text = document.getElementById('textOutput');
var name = document.getElementById('nameInput');
var company = document.getElementById('companyInput');
var address = document.getElementById('addressInput');
var phone = document.getElementById('phoneInput');
var email = document.getElementById('emailInput');
var addBtn = document.getElementById('addNewBtn')
function init() {
 retrieveData(function(response) {
  // Parse JSON string into object
    if (localStorage['addressBook'] == null){
      var jsonArray = JSON.parse(response);
      localStorage.setItem('addressBook', JSON.stringify(jsonArray));
    }else{
      var jsonArray = JSON.parse(localStorage.getItem('addressBook'));
    }
    printAddressBook(JSON.parse(localStorage['addressBook']));
    addBtn.addEventListener('click', function(){
      newRecord = {
        name: nameInput.value,
        company: company.value,
        address: address.value,
        phone: phone.value,
        email: email.value
      }
      jsonArray.push(newRecord);
      printAddressBook(jsonArray);
      localStorage.setItem('addressBook', JSON.stringify(jsonArray));
    })
    console.log(jsonArray);
 });
}

//obtains JSON data from file through use of an XMLHttpRequest, and a callback function
function retrieveData(callback){
  var peopleJson = new XMLHttpRequest();
  peopleJson.overrideMimeType("application/json");
  peopleJson.open('GET', './json/addressBook.json', true);
  peopleJson.onreadystatechange = function(){
    if (peopleJson.readyState == 4 && peopleJson.status == "200"){
      callback(peopleJson.responseText);
    }
  };
  peopleJson.send();
}

function addNewRecord(jsonArray){
  var newRecord = {
    name: name.value,
    company: company.value,
    address: address.value,
    phone: phone.value,
    email: email.value
  }
  jsonArray.push(newRecord);
}


function updateRecord(){
  var jsonArray = JSON.parse(localStorage['addressBook']);
  var nameSearch = document.getElementById('nameSearchInput');
  var companySearch = document.getElementById('companySearchInput');
  var nameButton = document.getElementById('nameBtn');
  var companyButton = document.getElementById('companyBtn');

  if(nameButton.checked){
    for(i=0; i<jsonArray.length; i++){
      console.log(jsonArray[i].name);
      if (jsonArray[i].name == nameSearch.value){
        editExistingRecordByName(i, nameSearch.value, jsonArray);
        printAddressBook(JSON.parse(localStorage['addressBook']))
      }
    }
  }else if(companyButton.checked){
    for(i=0; i<jsonArray.length; i++){
      console.log(jsonArray[i].company);
      if (jsonArray[i].company == companySearch.value){
        editExistingRecordByCompany(i, companySearchInput.value, jsonArray);
        printAddressBook(JSON.parse(localStorage['addressBook']))
      }
    }
  }else{
    alert("Please select whether you wish to update by name or company");
  }
}


function editExistingRecordByName(i, name, jsonArray){
  var updatedRecord = {
    name: name,
    company: companySearchInput.value,
    address: newAddressInput.value,
    phone: newPhoneInput.value,
    email: newEmailInput.value
  }
  jsonArray[i] = updatedRecord;
  localStorage.setItem('addressBook', JSON.stringify(jsonArray));
}

function editExistingRecordByCompany(i, company, jsonArray){
  console.log(company);
  var updatedRecord = {
    name: nameSearchInput.value,
    company: company,
    address: newAddressInput.value,
    phone: newPhoneInput.value,
    email: newEmailInput.value
  }
  jsonArray[i] = updatedRecord;
  localStorage.setItem('addressBook', JSON.stringify(jsonArray));
}

function deleteRecord(){
  var jsonArray = JSON.parse(localStorage['addressBook']);
  var nameSearch = document.getElementById('nameSearchInput');
  var companySearch = document.getElementById('companySearchInput');
  var nameButton = document.getElementById('nameBtn');
  var companyButton = document.getElementById('companyBtn');
  if(nameButton.checked){
    for(i=0; i<jsonArray.length; i++){
      if (jsonArray[i].name == nameSearch.value){
        deleteFromName(i, jsonArray);
        printAddressBook(JSON.parse(localStorage['addressBook']))
      }
    }
  }else if(companyButton.checked){
    for(i=0; i<jsonArray.length; i++){
      console.log(jsonArray[i].company);
      if (jsonArray[i].company == companySearch.value){
        deleteFromCompany(i, jsonArray);
        printAddressBook(JSON.parse(localStorage['addressBook']))
      }
    }
  }else{
    alert("Please select whether you wish to update by name or company");
  }
}
function deleteFromName(i, jsonArray){
  console.log(jsonArray);
  jsonArray.splice(i, 1);
  console.log(jsonArray);
  localStorage.setItem('addressBook', JSON.stringify(jsonArray));
}
function deleteFromCompany(i, jsonArray){
  jsonArray.splice(i, 1);
  localStorage.setItem('addressBook', JSON.stringify(jsonArray));
}

function printAddressBook(jsonArray){
  text.innerHTML +="<ul>";
  for (i=0; i<jsonArray.length; i++){
    text.innerHTML += "<li>" + jsonArray[i].name + "<br>" + jsonArray[i].company +
    "<br>" + jsonArray[i].address + "<br>" + jsonArray[i].phone + "<br>" +
    jsonArray[i].email + "</li> <br> <br>";
  }
  text.innerHTML += "</ul";
}
