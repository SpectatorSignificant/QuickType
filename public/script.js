const wordsBox = document.querySelector(".words");

let spanObject;
let charArray = [];
let originalIndex = 0;
let index = 0;
let userIndex = 0;
let wrongChars = 0;
let currentWord = 0;
let badEntry = false;
let spaceWasPressed = false;

function indexBuffer(index){
    for (var i = index; i < originalString.length; i++){
        if (originalString[i] == " ") return i - index + 1;
    }
}

function updateWordClass(index){
    for (var i = 0; i < charArray.length; i++){
        charArray[i].classList.remove("current-word");
    }
    for (var j = index; originalString[j] != " "; j++){
        charArray[j].classList.add("current-word");
    }
}

originalString = randomWords.replace(/,/g, " ");

randomWords = randomWords.split(",");
console.log(randomWords, randomWords.length);

function displayChars(){
    wordsBox.innerHTML = "";
    for (var i = 0; i < charArray.length; i++){
        wordsBox.appendChild(charArray[i]);
    }
}

for (var i = 0; i < randomWords.length; i++){
    for (var j = 0; j < randomWords[i].length; j++){
        spanObject = document.createElement("span");
        spanObject.textContent = randomWords[i][j];
        charArray.push(spanObject);
    }
    spanObject = document.createElement("span");
    spanObject.textContent = " ";
    charArray.push(spanObject);
}

displayChars();

document.addEventListener("keydown", (e) => {
    if (e.key == originalString[userIndex].toLocaleLowerCase()){
        charArray[userIndex].classList.add("correct");
        userIndex += 1;
        spaceWasPressed = false;
    }
    else {
        if (e.key == "Backspace"){
            charArray.splice(userIndex - 1, 1);
            userIndex -= 1;
            wrongChars -= 1;
            if (wrongChars == 0){
                spaceWasPressed = true;
            }
        }
        else if (e.key == " "){
            userIndex += indexBuffer(userIndex);
            wrongChars = 0;
            spaceWasPressed = true;
        }
        else{
            spaceWasPressed = false;
            spanObject = document.createElement("span");
            spanObject.textContent = e.key;
            spanObject.classList.add("wrong");
            charArray.splice(userIndex, 0, spanObject);
            userIndex += 1;
            wrongChars += 1;
        }
    }
    console.log(userIndex, originalString[userIndex]);
    displayChars();
})