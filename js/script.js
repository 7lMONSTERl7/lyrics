const forms = document.querySelector('.forms')
const search = document.querySelector('.forms input')
const container = document.querySelector('.container')
const olyrics = document.querySelector('.lyrics')
const toggleButton = document.querySelector('.menu')
const toggleMenu = document.querySelector('.toggle-menu')

function makeOutput(data) {
    const el = `
        <div class="output">
            <div class="o-header">
                <span class="artist">${data.Artist}</span>
                <span class="song-title">${data.Title}</span>
                <span class="creation-Date">${data.CreationDate}</span>
            </div>
            <div class="o-content">
                <p class="o-result">
                    ${convertLyrics(data.Lyrics)}
                </P>
            </div>
        </div>
    `;
    if (document.querySelector('.output')){
        document.querySelector('.output').innerHTML = ""
        document.querySelector('.output').remove()
    }
    olyrics.textContent = `--------Lyrics For | ${data.Title} | --------`;
    container.innerHTML += el;
}

function convertLyrics(APIlyrics) {
    return APIlyrics.replace(/\\n/g, "\\n").replace(/\n/g, "<br>");
}

async function getLyrics(song){
    if (song.length > 1){
        const request = await fetch(`https://sloth-possible-reindeer.ngrok-free.app/?song=${decodeURIComponent(song)}`)
        const data = await request.json()
        if (data.error){
            alert('No lyrics found')
        }
        else{
            makeOutput(data)
        }
    }
}

function searchBorder(){
    search.addEventListener('blur',() => {forms.classList.remove('foc')})
    search.addEventListener('focus',() => {forms.classList.add('foc')})
}

window.addEventListener('DOMContentLoaded', () => {
    searchBorder();
    document.querySelector('.container').addEventListener('click', (event) => {
        if (event.target && event.target.tagName === 'BUTTON') {
            getLyrics(document.querySelector('.forms input').value);
        }
    });
    toggleButton.addEventListener('click', () => {
        if (toggleMenu.classList.contains('active')) {
            toggleMenu.classList.remove('active');
            toggleMenu.classList.add('inactive');
        }
        else if (toggleMenu.classList.contains('inactive')) {
            toggleMenu.classList.remove('inactive');
            toggleMenu.classList.add('active');
        }
        else {
            toggleMenu.classList.remove('inactive');
            toggleMenu.classList.add('active');
        }
        
    })
});
