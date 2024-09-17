//fun colors
const arr_colors = ['yellow', 'pink', 'lightgreen', 'lightyellow', 'lightpink', 'lightcoral', 'lightgoldenrodyellow', 'lightseagreen', 'lightsalmon', 'lightcyan', 'lightblue', 'lightsteelblue']
const arr_emojis = ['🐱', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀']
const url = "https://api.thecatapi.com/v1/breeds"

// Lists all breeds of cats
function GetCatBreed() {
    const breedList = document.getElementById('breed-list')
    const breedMessage = document.getElementById('breed-message')

    let numOfBreeds = 0

    breedList.innerText = ""

    breedMessage.textContent = "Loading..."

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

function GetWeightListFilter() {
    let weight_arr = []

    const breedList = document.getElementById('breed-list')
    const breedMessage = document.getElementById('breed-message')
    let numOfBreeds = 0;

    //weight variables
    const weightType = document.querySelector('input[name="weight-type"]:checked').value;
    const weightList = document.getElementById('weight-type')

    breedList.innerText = ""
    breedMessage.innerText = ""

    const message = document.createElement('h2')
    breedMessage.textContent = "" //clears loading
    breedMessage.appendChild(message)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(breed => {

                const weight = breed.weight[weightType]; //ex. breed.weight.imperial searching JSON
                const breedName = breed.name;

                if (!weight_arr.includes(weight.trim().replace(/\s+/g, ''))) {
                    // I keep getting duplicate ranges, this should solve it
                    weight_arr.push(weight.trim().replace(/\s+/g, '')); 

                    //generating element with fancy stuff
                    const ele = document.createElement('p');
                    const randomEmoji = arr_emojis[Math.floor(Math.random() * arr_emojis.length)]
                    ele.textContent = randomEmoji + " " + weight + " " + randomEmoji;
                    const randomColor = arr_colors[Math.floor(Math.random() * arr_colors.length)]
                    ele.style.color = randomColor

                    breedList.appendChild(ele)
                } else {
                }
                //displays message outside of the container
                message.textContent = `We found ${weight_arr.length} weight ranges from various breeds!`
            })
        })
}    const breedList = document.getElementById('breed-list')


function GetCatsHealthIssuesFilter() {
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

                    link.href = `${breed.vcahospitals_url}`


                    ele.appendChild(link)
                    breedList.appendChild(ele)

                    //displays message outside of the container
                    message.textContent = `We found ${numOfBreeds} breeds of cats with that health issue level ${filterInput}! Click on a breed to learn more.`
                }
            });
        })
        .catch(error => console.error("Error: " + error));
}
function SearchCatApi() {
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

function GetAverageIntelligence() {
    const breedList = document.getElementById('breed-list')
    const avgInt = document.getElementById("average-intelligence").value
    let intArr = []

    const breedMessage = document.getElementById('breed-message')

    const message = document.createElement('h2')
    breedMessage.textContent = "" //clears loading
    breedMessage.appendChild(message)
    
    breedList.innerHTML = ""

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(breed => {
                let dataInt = breed.intelligence
                dataInt = Number(dataInt)
                intArr.push(dataInt)
                console.log(intArr);

                //getting the average
                let sum = 0
                for (let i = 0; i < intArr.length; i++) {
                    sum += intArr[i]
                }

                const average = sum / intArr.length

                message.textContent = `The average intelligence of all cat breeds in the database is: ${average.toFixed(2)}`
            })
        })
}

function GetAverageIntelligenceFriendly4() {
    const breedList = document.getElementById('breed-list')
    const avgInt = document.getElementById("average-intelligence-childInt4").value
    let intArr = []

    const breedMessage = document.getElementById('breed-message')

    const message = document.createElement('h2')
    breedMessage.textContent = "" //clears loading
    breedList.innerHTML = ""
    breedMessage.appendChild(message)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(breed => {
                if (breed.child_friendly == 4) {
                    let dataInt = breed.intelligence
                    dataInt = Number(dataInt)


                    intArr.push(dataInt)

                    //getting the average
                    let sum = 0
                    for (let i = 0; i < intArr.length; i++) {
                        sum += intArr[i]
                    }
                    const average = sum / intArr.length
                    message.textContent = `The average intelligence of  cat breeds with Child Friendly (4) is: ${average.toFixed(2)}`
                }
            })
        })
}

function GetChildFriendly(){
    const breedList = document.getElementById('breed-list')
    const breedMessage = document.getElementById('breed-message')

    let numOfBreeds = 0

    breedList.innerText = ""

    breedMessage.textContent = "Loading..."

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const message = document.createElement('h2')
            breedMessage.textContent = "" //clears loading
            breedMessage.appendChild(message)

            data.forEach(breed => {
                console.log(breed.name);
                numOfBreeds++

                const int = breed.intelligence
                const friendly = breed.child_friendly

                const ele = document.createElement('p');
                const link = document.createElement('a')

                const randomEmoji = arr_emojis[Math.floor(Math.random() * arr_emojis.length)]

                link.textContent = `${randomEmoji} ${breed.name} | ${int} | ${friendly} ${randomEmoji}`
                link.href = `${breed.vcahospitals_url}`

                const randomColor = arr_colors[Math.floor(Math.random() * arr_colors.length)]
                link.style.color = randomColor

                link.style.display = "block"
                link.style.width = "100vw"

                ele.appendChild(link)
                breedList.appendChild(ele)

                //displays message outside of the container
                message.textContent = `[Name] | [Intelligence] | [Child Friendliness]`

            })
                .catch(error => console.error("Error: " + error))
        })
}