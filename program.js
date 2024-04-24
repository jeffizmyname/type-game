let filed = document.getElementById('words')
cursor = document.getElementById('cursor')

wordArr = ["test1", "test2"]
wordSting = wordArr.join(" ")
letterCounter = 0;

async function getWords(size, language) {
    try {
        const response = await fetch(`https://random-word-api.herokuapp.com/word?lang=${language}&number=${size}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Network response not ok');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function createWords() {
    const words = await getWords(1, "en")
    console.log(words)
    for(let i = 0; i < words.length; i++) {
        let letterSpan = document.createElement("span")
        letterSpan.innerHTML = words[i]
        letterSpan.id = i
        filed.appendChild(letterSpan)
    }
    return words;   
}

wordArr = createWords()

document.addEventListener("keypress", (e) => {
    //console.log(e.key)
    if(e.key == wordSting[letterCounter]) {
        console.log(true)
        document.getElementById(letterCounter).id = "correct"
    } else {
        console.log(false + " user: " + e.key + " valid: " + wordSting[letterCounter])
        document.getElementById(letterCounter).id = "false"
    }
    cursor.style.left = `${(letterCounter+1)*30}px`
    letterCounter++;
})

