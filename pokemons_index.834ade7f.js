const t=document.querySelector("div[class=pokemon-card]"),e=document.querySelector(".pokemon-list"),n=document.querySelector("button[data-back]"),r=document.querySelector("button[data-forward]");let o=0;function c(){(function(t){const e=new URLSearchParams({offset:o,limit:10});return fetch(`${t}?${e}`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()}))})("https://pokeapi.co/api/v2/pokemon").then((t=>{!function(t){const n=t.results.map((({name:t,url:e})=>`\n                <li class="pokemon-data">\n                    <h2>${t}</h2>\n                    <p><a class='card-link' href="${e}">Show Pokemon card</a></p>\n                </li>\n            `)).join("");e.innerHTML=n}(t)})).catch((t=>console.error(`${t}:: Wrong link to serwer!!! `)))}c(),n.addEventListener("click",(()=>{o<=0?console.log("It`s first group."):(o-=10,c())})),r.addEventListener("click",(()=>{o+=10,c()})),e.addEventListener("click",(e=>{var n;e.preventDefault(),console.log(e.target.href),n=e.target.href,fetch(n).then((t=>{if(!t.ok)throw Error(":: Pokemon does not exist!!");return t.json()})).then((e=>{t.innerHTML=function(t){const{name:e,sprites:n,weight:r,height:o,abilities:[...c]}=t,a=c.map((({ability:t})=>` <li class="list-group-item">${t.name}</li> `)).join("");return`\n        <div class="card">\n\n            <div class="card-img-top">\n                <img src="${n.front_default}" width='150px' height='150px' alt="${e}" />\n            </div>\n            <div class="card-body">\n\n                <h2 class="card-title">Name: ${e}</h2>\n                <p class="card-text">Weight: ${r} kg.</p>\n                <p class="card-text">Height: ${o}'</p>\n                <p class="card-text"><b>Skills</b></p>\n                <ul class="list-group"></ul>\n                    ${a}\n                </ul>\n            </div>\n        </div>\n    `}(e)})).catch((t=>console.error(t)))}));
//# sourceMappingURL=pokemons_index.834ade7f.js.map