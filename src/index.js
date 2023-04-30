import './css/styles.css';
import 'lodash/debounce'; 
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash/debounce';

const DEBOUNCE_DELAY = 500;

console.log('debounce: ', debounce);
// #################################################################

const inputField = document.getElementById('search-box');
const dataListBlock = document.querySelector('.country-list');
const dataBlock = document.querySelector('.country-info');
dataBlock.innerHTML = '<p>Hello from JavaScript!!!</p>'
// #################################################################
// !!! Створи фронтенд частину програми пошуку даних про країну за її частковою або повною назвою.

// 1 Використовуй публічний API " https://restcountries.com/ 2 ", а саме ресурс name, який повертає масив об'єктів країн,
// що задовольнили критерій пошуку.Додай мінімальне оформлення елементів інтерфейсу.

// 2 Напиши функцію fetchCountries(name), яка робить HTTP-запит на ресурс name і повертає проміс з масивом країн - результатом запиту.
// Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.

// 3 Тобі потрібні тільки наступні властивості:
/*
** name.official - повна назва країни
** capital - столиця
** population - населення
** flags.svg - посилання на зображення прапора
** languages - масив мов
*/
// **************************************************************************
inputField.addEventListener('input', debounce(activeSearch, DEBOUNCE_DELAY));
// **************************************************************************

function activeSearch(evt) { 

    const requestName = evt.target.value.trim();
    searchCountry(requestName);
}

function searchCountry(countriesName) { 

    fetchCountries(countriesName)
        .then((countries) => {

            if (countries.length > 1) {

                const listCountries = countries.map(
                    ({ flags, name }) => `
                        <li>
                            <img width="100px" src="${flags.svg}" alt="${name.official}"> 
                            <span>${name.official}</span>
                        </li>`).join('');
                
                console.log(listCountries);
                renderMarkup(listCountries);
            }
            else { 
                console.log('Dig')

                const countryMarkup = countries.map(({ flags, name, capital, population, languages }) => {
                const countryLanguages = Object.values(languages);

                return `
                    <img width="100px" src="${flags.svg}" alt="${name.official}" /> <span><h2>${name.official}</h2></span>
                    <p><b>Capital: </b>${capital}</p>
                    <p><b>Population: </b>${population}</p>
                    <p><b>Languages: </b>${countryLanguages}</p>
                `
            }).join('');

            renderMarkup(countryMarkup);
            }
            
        }).catch((err) => console.error(err));
}
function renderMarkup(data) { 

    if (typeof data === 'object') {
        dataListBlock.innerHTML = data;
    }
    dataBlock.innerHTML = data;
}





// **********************
// **********************