function GetCatBreed() {
    const breedList = document.getElementById('breed-list')
    const breedMessage = document.getElementById('breed-message')

    breedList.innerText = ""

    breedMessage.textContent = "Loading..."

    //fun colors
    const arr_colors = ['yellow', 'pink', 'lightgreen', 'lightyellow', 'lightpink', 'lightcoral', 'lightgoldenrodyellow', 'lightseagreen', 'lightsalmon', 'lightcyan', 'lightblue', 'lightsteelblue']
    const arr_emojis = ['🐱', '😸', '😹', '😺', '😻', '😼', '😽', '😾', '😿', '🙀']

    const url = "https://api.thecatapi.com/v1/breeds"
    fetch(url)
        .then(response => response.json())
        .then(data => {

            const message = document.createElement('h2')

            breedMessage.textContent = "" //clears loading

            //displays message outside of the container
            message.textContent = "Here's a list of all your breeds! Click on a breed to learn more."
            breedMessage.appendChild(message)

            //forEach loop to add new <p> for all cat breedds
            data.forEach(breed => {
                console.log(breed.name);
                const ele = document.createElement('p');
                const link = document.createElement('a')

                const randomEmoji = arr_emojis[Math.floor(Math.random() * arr_emojis.length)]
                link.textContent = randomEmoji + " " + breed.name + " " + randomEmoji;

                link.href = `${breed.vcahospitals_url}`

                const randomColor = arr_colors[Math.floor(Math.random() * arr_colors.length)]
                link.style.color = randomColor


                ele.appendChild(link)
                breedList.appendChild(ele)
            })
                .catch(error => console.error("Error: " + error))
        })
}

function SearchCatApi(){

}