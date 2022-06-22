const section = document.querySelector('#section')
const paginationBlock = document.getElementById('pagination__block')
const cardTemplate = document.getElementById('template').content
const searchInput = document.querySelector('.search__Input')

let page = 1
let data =[]


renderMovies()


// var searchYears = document.createElement('select')
// searchYears.className = 'select'

// var optionAllYears = document.createElement('option')
// optionAllYears.className = 'option'

async function getApi(){
        data =  await fetch(`https://www.omdbapi.com/?s=${searchInput.value}&page=${page}&apikey=ba6f707d`)
        data = await data.json()
        data = data.Search
}

async function renderMovies(){
        section.innerHTML = `
        <div class="my-slider">
        <div class="cssload-loader">
        <div class="cssload-inner cssload-one"></div>
        <div class="cssload-inner cssload-two"></div>
        <div class="cssload-inner cssload-three"></div>
        </div>    
        </div> 
        `
        paginationBlock.style.display="none"

        await getApi()

        let fragment = document.createDocumentFragment()

        if(data){
                data.forEach((elem) => {
                        let cloneTemplate = document.importNode(cardTemplate, true) 
                        
                        let movieImg = cloneTemplate.querySelector('img')
                        movieImg.setAttribute('src', elem.Poster)
                        
                        let movieTitle = cloneTemplate.querySelector('.card__title')
                        movieTitle.textContent = elem.Title
                        
                        let movieId = cloneTemplate.querySelector('.card__description__id')
                        movieId.innerHTML = `Id: ${elem.imdbID}`
                        
                        let movieYear = cloneTemplate.querySelector('#year')
                        movieYear.innerHTML = `<span>Year:</span> ${elem.Year}`
                        
                        let movieType = cloneTemplate.querySelector('#type')
                        movieType.innerHTML = `<span>Type:</span> ${elem.Type}`
                        
                        fragment.appendChild(cloneTemplate)
                })

                section.innerHTML = ''
                section.appendChild(fragment)
                if(data.length === 10) paginationBlock.style.display="flex"
        }
        else{
                section.innerHTML = 'Movie not found'
                paginationBlock.style.display="none"
        }
}

window.addEventListener('click', (event)=>{
        let element = event.target
        
        if(element.dataset.remove === 'remove'){
                element.closest('.card').remove()
        }
        
        if(element.dataset.search === 'search'){
                page = 1
                renderMovies()
        }
        if(element.dataset.page === 'next'){
                page += 1
                renderMovies()
        }
        if(element.dataset.page === 'prev'){
                if(page > 1){
                     page -= 1
                     renderMovies()
                }
        }
})