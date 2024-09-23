const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});


const getWordInfo = async(word) =>{

        try{
            resultDiv.innerHTML = "<p>Fetching data...<p>";
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();
            console.log(data);
            
            let def = data[0].meanings[0].definitions[0];
            resultDiv.innerHTML =   `<h2><strong>Word: </strong>${data[0].word}</h2>
            <p class="pSpeech">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Definition: </strong>${def.definition === undefined?"Not found":def.definition}</p>
            <p><strong>Example: </strong>${def.example === undefined? "Not found": def.example}</p>
            <p><strong>Synonms: </strong></p>`;
            
            if(data[0].meanings[0].synonyms[0] == null){
                resultDiv.innerHTML += `Not Found`;
            }else{
                for(let i=0; i<data[0].meanings[0].synonyms.length; i++){
                    resultDiv.innerHTML += `<li>${data[0].meanings[0].synonyms[i]}</li>`;
                }
            }

            resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls[0]}" target="_blank">Read More</a></div>`;
        }
        catch(error){
            resultDiv.innerHTML = `<p>Sorry, word is not found</p>`
        }
};