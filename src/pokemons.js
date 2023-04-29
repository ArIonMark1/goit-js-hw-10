import './css/styles.css'

// #################################################################
const pokemonBlock = document.querySelector('div[class=pokemon-card]')
const pokemonList = document.querySelector('.pokemon-list');
const pagBack = document.querySelector('button[data-back]')
const pagForward = document.querySelector('button[data-forward]')
// #################################################################

const POKEMONURL = 'https://pokeapi.co/api/v2/pokemon';

let page = 0;
let limit = 10; 

// **************
loader();
// **************

pagBack.addEventListener('click', () => {
    if (page <= 0) { 
        console.log('It`s first group.')
        return;
    }
    page -= 10;
    loader();
});
pagForward.addEventListener('click', () => {
    page += 10;
    loader();
});
// *****************************************************************
function fetchLoad(url) { 
    const params = new URLSearchParams({
    offset: page,
    limit: limit
    });
    
    return fetch(`${url}?${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        });
};

function loader() { 
    fetchLoad(POKEMONURL).then(pokemons => {
        renderPosts(pokemons);
    })
        .catch(error => console.error(`${error}:: Wrong link to serwer!!! `))
};

function renderPosts(posts) { 
    // console.log('pokemon: ', pokemon.results)

    //****************************
    const pokemonName = posts.results.map(({ name, url }) => {
        return `
                <li class="pokemon-data">
                    <h2>${name}</h2>
                    <p><a class='card-link' href="${url}">Show Pokemon card</a></p>
                </li>
            `
    }).join('');
    pokemonList.innerHTML = pokemonName;
        // pokemonList.insertAdjacentHTML('beforeend', pokemonName)
        //****************************
};

// #################################################################

pokemonList.addEventListener('click', (event) => { 
    event.preventDefault();
    console.log(event.target.href);

    pokemonCardMarkup(event.target.href);
})

function pokemonCardMarkup(link) { 
    
    fetch(link)
        .then((response) => { 
            if (!response.ok) { 
                throw Error(':: Pokemon does not exist!!')
            }
            return response.json();
        })
        .then((data) => { 
            pokemonBlock.innerHTML = markupOne(data);
        })
        .catch((err) => console.error(err))
}

function markupOne(pokemon) { 

    const { name, sprites, weight, height, abilities: [...args] } = pokemon;

        const pokemonAbil = args.map(({ability}) => {
            return ` <li class="list-group-item">${ability.name}</li> `
        }).join('');
    
    return `
        <div class="card">

            <div class="card-img-top">
                <img src="${sprites.front_default}" width='150px' height='150px' alt="${name}" />
            </div>
            <div class="card-body">

                <h2 class="card-title">Name: ${name}</h2>
                <p class="card-text">Weight: ${weight} kg.</p>
                <p class="card-text">Height: ${height}'</p>
                <p class="card-text"><b>Skills</b></p>
                <ul class="list-group"></ul>
                    ${pokemonAbil}
                </ul>
            </div>
        </div>
    `
};