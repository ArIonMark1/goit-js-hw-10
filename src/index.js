import './css/styles.css';
import Notiflix from 'notiflix';
import 'lodash/debounce'; 
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash/debounce';


const DEBOUNCE_DELAY = 300;
// #################################################################

const inputField = document.getElementById('search-box');
const dataListBlock = document.querySelector('.country-list');
const dataBlock = document.querySelector('.country-info');
// #################################################################

// 1 Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, а розмітка списку країн або інформації про країну зникає.
// 2 Якщо у відповіді бекенд повернув більше ніж 10 країн, в інтерфейсі з'являється повідомлення про те,
//  що назва повинна бути специфічнішою.
//  Для повідомлень використовуй бібліотеку notiflix і виводь такий рядок "Too many matches found.
//  Please enter a more specific name.".

// 3 Якщо бекенд повернув від 2-х до 10-и країн, під тестовим полем відображається список знайдених країн.
//  Кожен елемент списку складається з прапора та назви країни.
// 4 Якщо користувач ввів назву країни, якої не існує, бекенд поверне не порожній масив,
//  а помилку зі статус кодом 404 - не знайдено
//  Додай повідомлення "Oops, there is no country with that name" у разі помилки, використовуючи бібліотеку notiflix.
// **************************************************************************
inputField.addEventListener('input', debounce(activeSearch, DEBOUNCE_DELAY));
// **************************************************************************

function activeSearch(evt) { 

    const requestName = evt.target.value.trim();

    renderMarkup(requestName);

    fetchCountries(requestName).then(generationConditMarkup).catch(showError);
};

function generationConditMarkup(countries) { 
    if (countries.length > 10) {
        // console.log('Too many matches found. Please enter a more specific name.')
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')

    } else if (countries.length > 2 && countries.length < 10) {
        const listCountries = countries.map(
            ({ flags, name }) => `
                <li>
                    <img width="50px" src="${flags.svg}" alt="${name.official}"> 
                    <span>${name.official}</span>
                </li>`).join('');
        renderMarkup(listCountries);

    } else { 
        const countryMarkup = countries.map(({ flags, name, capital, population, languages }) => {
            const countryLanguages = Object.values(languages);

            return `
                    <span class='country-header'><img width="30px" src="${flags.svg}" alt="${name.official}" /> <h2>${name.official}</h2></span>
                    <p><b>Capital: </b>${capital}</p>
                    <p><b>Population: </b>${population}</p>
                    <p><b>Languages: </b>${countryLanguages}</p>
                `
        }).join('');
        renderMarkup(countryMarkup);
    };

};

function renderMarkup(data) { 

    if (typeof data === 'object') {
        dataListBlock.innerHTML = data;
    } else if (data === '') { 
        dataListBlock.innerHTML = '';
        dataBlock.innerHTML = '';
    }
    dataBlock.innerHTML = data;
};

function showError(error) {
  Notiflix.Notify.failure(` Oops, there is no country with that name`);
  dataListBlock.innerHTML = '';
  dataBlock.innerHTML = '';
};
