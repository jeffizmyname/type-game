let filed = document.getElementById('words')
cursor = document.getElementById('cursor')
errors = 0;
corrects = 0;
startDate = new Date();
endDate = new Date();

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
        wordArr = data;
        wordSting = wordArr.join(" ")
        wordArr = createWords(wordSting)
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
    return words;   
}

function reset() {
    getWords(2, "en")
    letterCounter = 0
    errors = 0;
    corrects = 0;
    startDate = new Date();
    endDate = new Date();
    filed.innerHTML = "";
    cursor.style.left = `0px`
}


document.addEventListener("keypress", (e) => {
    //console.log(letterCounter)
    if(letterCounter == 0) {
        startDate = new Date();
    } 
    if(letterCounter == wordSting.length - 1) {
        endDate = new Date();
        let time = new Date(endDate - startDate)
        console.log(time.getSeconds(), time.getMilliseconds())
        console.log("lpm: ", )
    }
    if(letterCounter < wordSting.length) {
        if(e.key == wordSting[letterCounter]) {
            console.log(true)
            document.getElementById(letterCounter).id = "correct"
        } else {
            console.log(false + " user: " + e.key + " valid: " + wordSting[letterCounter])
            document.getElementById(letterCounter).id = "false"
        }
        cursor.style.left = `${(letterCounter+1)*30}px`
        letterCounter++;
    }

})

