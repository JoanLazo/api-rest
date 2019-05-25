
const privateKey = '02ec1db99f659bc2185dd6b5c3aee2fe1e052829',
    publicKey = '3349d5d682ea90858e342c9ae01a771a',
    content = document.getElementById('content'),
    search = document.getElementById('search');

const getConnection = () => {
    const ts = Date.now(),
    hash = MD5(ts + privateKey + publicKey),
    URL = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(URL)
    .then( res => res.json())
    .then( res => {
        res.data.results.forEach(e => {
         return drawHero(e)
        })
    })
    .catch(err => console.log(err));
}
const drawHero = e => {
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `
    <div class="ed-item l-1-3">
      <h3>${e.name}</h3>
      <img src="${image}">
      <p>${e.description}</p>
      </div>
    `;
    content.insertAdjacentHTML('beforeEnd',hero);
};

const searchHero = name => {
    const ts = Date.now(),
    hash = MD5(ts + privateKey + publicKey),
    hero = encodeURIComponent(name),
    URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(URL)
    .then( res => res.json())
    .then( res => {
        res.data.results.forEach(e => {
         return drawHero(e)
        })
    })
    .catch(err => console.log(err));
};
search.addEventListener('keyup' , e => {
    if(e.keyCode === 13) {
        content.innerHTML = '';
        searchHero(e.target.value.trim());
    }
})

getConnection();


