//fun colors
const arr_colors = ['yellow', 'pink', 'lightgreen', 'lightyellow', 'lightpink', 'lightcoral', 'lightgoldenrodyellow', 'lightseagreen', 'lightsalmon', 'lightcyan', 'lightblue', 'lightsteelblue']
const arr_emojis = ['🐱', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀']

// Lists all breeds of cats
function GetCatBreed() {
    const breedList = document.getElementById('breed-list')
    const breedMessage = document.getElementById('breed-message')

    let numOfBreeds = 0

    breedList.innerText = ""

    breedMessage.textContent = "Loading..."

    const url = "https://api.thecatapi.com/v1/breeds"
    fetch(url)
        .then(response => response.json())
        .then(data => {

            const message = document.createElement('h2')
            breedMessage.textContent = "" //clears loading
            breedMessage.appendChild(message)

            //forEach loop to add new <p> for all cat breedds
            data.forEach(breed => {
                console.log(breed.name);
                numOfBreeds++
                const ele = document.createElement('p');
                const link = document.createElement('a')

                const randomEmoji = arr_emojis[Math.floor(Math.random() * arr_emojis.length)]
                link.textContent = randomEmoji + " " + breed.name + " " + randomEmoji;

                link.href = `${breed.vcahospitals_url}`

                const randomColor = arr_colors[Math.floor(Math.random() * arr_colors.length)]
                link.style.color = randomColor


                ele.appendChild(link)
                breedList.appendChild(ele)

                //displays message outside of the container
                message.textContent = `We found ${numOfBreeds} breeds of cats! Click on a breed to learn more.`

            })
                .catch(error => console.error("Error: " + error))
        })
}

function GetCatsHealthIssuesFilter() {
    const breedList = document.getElementById('breed-list')
    const breedMessage = document.getElementById('breed-message')
    let numOfBreeds = 0;

    const filterInput = document.getElementById('filter-input').value
    const filterValue = Number(filterInput);
    const resultArray = []

    breedList.innerText = ""
    breedMessage.innerText = ""

    const message = document.createElement('h2')
    breedMessage.textContent = "" //clears loading
    breedMessage.appendChild(message)

    fetch("https://api.thecatapi.com/v1/breeds")
        .then(response => response.json())
        .then(data => {
            data.forEach(breed => {
                if (breed.health_issues == filterValue) {
                    numOfBreeds++
                    resultArray.push(breed.name);

                    //generating element with fancy stuff
                    const ele = document.createElement('p');
                    const link = document.createElement('a')
                    const randomEmoji = arr_emojis[Math.floor(Math.random() * arr_emojis.length)]
                    link.textContent = randomEmoji + " " + breed.name + " " + randomEmoji;
                    const randomColor = arr_colors[Math.floor(Math.random() * arr_colors.length)]
                    link.style.color = randomColor

                    ele.appendChild(link)
                    breedList.appendChild(ele)

                    //displays message outside of the container
                    message.textContent = `We found ${numOfBreeds} breeds of cats! Click on a breed to learn more.`

                }


            });
        })
        .catch(error => console.error("Error: " + error));



}
function SearchCatApi() {
    const url = "https://api.thecatapi.com/v1/breeds";
    const searchName = document.getElementById('input-cat').value;

    let cat_data = {};
    let catInfo = {}
    // console.log(searchName);

    // Call API to store the info
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log("All data: " + JSON.stringify(data, null, 2));
            // Store data in variable
            cat_data = data;

            // Check for input name and database
            const breed = cat_data.find(breed => breed.name.toLowerCase() === searchName.toLowerCase());
            if (breed) {
                console.log("Breed found: " + JSON.stringify(breed, null, 2));

                catInfo = {
                    name: breed.name,
                    weight: breed.weight.imperial,
                    temperament: breed.temperament,
                    description: breed.description,
                    lifeSpan: breed.life_span,
                }

                console.log(catInfo);

                const search_container = document.getElementById('search-results');

                //search cat info results
                const resultName = document.getElementById('search-name');
                const resultWeight = document.getElementById('search-weight')
                const resultTemperament = document.getElementById('search-temperament')
                const resultLifeSpan = document.getElementById('search-lifespan')
                const resultDescription = document.getElementById('search-description')


                const randomEmoji = arr_emojis[Math.floor(Math.random() * arr_emojis.length)]
                const randomColor = arr_colors[Math.floor(Math.random() * arr_colors.length)]


                resultName.innerHTML = randomEmoji + catInfo.name + randomEmoji
                resultWeight.innerHTML = `Weight: ${catInfo.weight} lbs`;
                resultTemperament.innerHTML = `Temperament: ${catInfo.temperament}`;
                resultLifeSpan.innerHTML = `Life Span: ${catInfo.lifeSpan} years`;
                resultDescription.innerHTML = `${catInfo.description}`;

                search_container.style.border = "2px solid white"
                search_container.style.boxShadow = "10px 10px white"

            } else {
                console.log("Breed not found");
            }
        })
        .catch(error => console.error("Error: " + error));





}