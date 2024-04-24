let filed = document.getElementById('words')
cursor = document.getElementById('cursor')
word = getWords(1, "en")
wordArr = ["test1", "test2"]
wordSting = wordArr.join(" ")
letterCounter = 0;

function getWords(size, language) {
    fetch(`https://random-word-api.herokuapp.com/word?lang=${language}&number=${size}`, {
        method: 'GET'
    }).then (response => {

        if(!response.ok) {
            throw new Error('network response not ok')
        }
        return response.json()
    }).then (data => {
        console.log(data)
    }).catch(error => {
        console.error('Error ' + error);
    })
}


function createWords(words) {
    console.log(words)
    for(let i = 0; i < words.length; i++) {
        let letterSpan = document.createElement("span")
        letterSpan.innerHTML = words[i]
        letterSpan.id = i
        filed.appendChild(letterSpan)
    }   
}

createWords(wordSting)

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

