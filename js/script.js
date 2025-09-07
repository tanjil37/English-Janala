const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=> res.json())
    .then( (json) => displayLesson(json.data))
}
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons)
    lessonButtons.forEach((btn)=>btn.classList.remove("active"))

}

const loadLevelWord = (id) =>{
  
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        removeActive();
        const clickBtn =document.getElementById(`lesson-btn-${id}`)
        //console.log(clickBtn)
        clickBtn.classList.add("active")
        displayLevelWord(data.data)
    })
}
const loadWordDetail = async(id) =>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    const res =await fetch(url);
    const details = await res.json();
   displayWordDetails(details.data)

}
// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
const displayWordDetails = (word) =>{
    console.log(word)
    const detailsBox = document.getElementById("details-container");
    //console.log(detailsBox)
    detailsBox.innerHTML= `<div class="">
            <h2 class="text-3xl font-semibold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
          </div>
                        
          <div class="">
            <h2 class="text-2xl font-semibold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="text-2xl font-semibold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bangla font-semibold">সমার্থক শব্দ গুলো
            </h2>
            <span class="btn">${word.synonyms[0]}</span>
            <span class="btn">${word.synonyms[1]}</span>
            <span class="btn">${word.synonyms[2]}</span>
           
          </div>`
    document.getElementById("word_modal").showModal();
    

}

const displayLevelWord = (words) => {
   const wordContainer = document.getElementById("word-container")
   wordContainer.innerHTML = " ";
    if(words.length==0){
        wordContainer.innerHTML= `
        <div class="space-y-4 col-span-full text-center font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <h2 class="font-normal text-sm text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
            <p class="font-medium text-3xl text-[#292524]">নেক্সট Lesson এ যান</p>
        </div>  
        `;
    }
   words.forEach((word)=> {
    const card = document.createElement('div');
    card.innerHTML = `
       <div class="bg-white text-center p-10 rounded-xl">
        <h2 class="text-3xl font-bold">${word.word ? word.word : "কোন শব্দ পাওয়া যাই নি"}</h2>
        <p class="text-xl mt-2 mb-3">Meaning /Pronounciation</p>
        <div class="font-semibold text-3xl font-bangla">"${word.meaning ? word.meaning : "কোন অর্থ পাওয়া যাই নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যাই নি"}"</div>
        <div class="flex justify-between mt-6">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
    wordContainer.append(card)
   })
}
const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container")
    lessonContainer.innerHTML = " ";
    for(let lesson of lessons){ 
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onClick=loadLevelWord(${lesson.level_no}) class="btn btn-soft btn-primary lesson-btn">
                    <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
                </button>`
        lessonContainer.append(btnDiv)
    }
}
loadLesson();