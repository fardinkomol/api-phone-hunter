const loadPhones = async(searchText, dataLimit) =>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';    
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0,10);
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none');
    }

    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
      noPhone.classList.remove('d-none')
    }
    else{
      noPhone.classList.add('d-none')
    }
    // display all phones
    
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spiner or loader
    toggleSpiner(false);
}

const processSearch = (dataLimit) =>{
  toggleSpiner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', function(){

  //start loader
  processSearch(10);
})

const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
      loaderSection.classList.remove('d-none')
    }
    else{
      loaderSection.classList.add('d-none')
    }
}

// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch();
});

// loadPhones();