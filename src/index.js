import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const contentBlock = document.querySelector('.country-info')
// console.log('contentBlock ', contentBlock)

const header = document.createElement('h2')
const body = document.createElement('div')

// #################################################################

const params = new URLSearchParams({
    offset: 1,
    limit: 5
});

const link = fetch(`https://pokeapi.co/api/v2/ability?${params}`)
// #################################################################

link
    .then((response) => {
        return response.json()
    })
    .then((pokemon) => { 
        console.log('pokemon: ', pokemon)
        console.log(pokemon.results[0].name)
        console.log(pokemon.pokemon)

        const blockList = pokemon.results.map(
            (block, index) =>
                `<p><span>ID: ${index + 1}; Pokemon name:</span>  <span>${block.name.toUpperCase()}</span></p>`
        ).join('')
        body.innerHTML = blockList;
        
    })
    .catch((err) => { console.log(err) })


// #################################################################

contentBlock.style.backgroundColor = '#d4858e';
contentBlock.style.color = 'white';
contentBlock.append(header, body);