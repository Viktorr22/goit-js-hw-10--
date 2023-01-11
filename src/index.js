// https://restcountries.com/v3.1/name/
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
const DEBOUNCE_DELAY = 300;


const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');

input.addEventListener("input", debounce(onInputText, 700)); 

function onInputText(evt) {
    const inputValue = evt.target.value;
    fetchCountries(inputValue)
        .then(data => createMarkup(data))
        .catch(err => console.log(err));

}

function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1'
    return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (resp.status === 404) {
                Notiflix.Notify.failure("Oops, there is no country with that name");               
            }   
           
            return resp.json();
        });   
    
}

function createMarkup(e) {
    if (e.length > 10) {
         Notiflix.Notify.info("Too many matches found. Please enter a more specific name."); 
         return;
    }
    else if (e.length === 1) {
        console.log("good");
    }
   
    else if (e.length > 2) {
        e.forEach((e) => {
        console.log(e.name.official);
        // console.log(e.capital.join(''));
        // console.log(e.population);
    });
    }

    
    
      
    

    
    
}

// then(resp => resp.json()).then(data => console.log(data));







