import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryListField: document.querySelector('.country-list'),
  countryInfoField: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();
  const inputValue = event.target.value.trim();
  if (inputValue === '') {
    refs.countryListField.innerHTML = '';
    refs.countryInfoField.innerHTML = '';
    return;  
  }

  fetchCountries(inputValue).then(data => {
    if (data.length >= 10 && inputValue !== '') {
      refs.countryListField.innerHTML = '';
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    }
    
    else if (data.length >= 2 && data.length < 10) {
      refs.countryInfoField.innerHTML = '';
      const manyCountryMarkup = onManyCountryMarkup(data);
      refs.countryListField.innerHTML = manyCountryMarkup;
      return;
    }
      
    else if (data.length < 2) {
      refs.countryListField.innerHTML = '';
      onOneCoutryMarkup(data);
      const oneCountryMarkup = onOneCoutryMarkup(data);
      refs.countryInfoField.innerHTML = oneCountryMarkup;
      return;
    }
  }).catch(error => {
    Notiflix.Notify.failure('Oops, there is no country with that name')
    refs.countryListField.innerHTML = '';
    refs.countryInfoField.innerHTML = '';      
  });

  

function onManyCountryMarkup(data) {
    return data.map(({ name, flags }) => {
    return `
      <li class='country-item'>
      <img src="${flags.svg}" alt="${flags.alt}" width="100" height="60">
      <h1> ${name.official} </h1>
      </li>    
    `;
  }).join('');
  
};


function onOneCoutryMarkup(data) {
  return data.map(({ name, capital, population, flags, languages }) => {
    return `
    <div class="container">
      <img src="${flags.svg}" alt="${flags.alt}" width="100" height="60">
      <h1>${name.official}</h1>
    </div>
      <h3>Capital: ${capital} </h3>
      <h3>Population: ${population} </h3>
      <h3>Languages: ${Object.values(languages)} </h3>
  `;
  }).join('');  
  };
