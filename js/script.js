const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=> res.json())
    .then( (json) => displayLesson(json.data))
}

const loadLevelWord = (id) =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayLevelWord(data.data))
}

// "id": 6,
// "level": 5,
// "word": "Fascinate",
// "meaning": "মুগ্ধ করা",
// "pronunciation": "ফ্যাসিনেট"

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
        <h2 class="text-3xl font-bold">${word.word}</h2>
        <p class="text-xl mt-2 mb-3">Meaning /Pronounciation</p>
        <div class="font-semibold text-3xl font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
        <div class="flex justify-between mt-6">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></i></button>
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
                <button onClick=loadLevelWord(${lesson.level_no}) class="btn btn-soft btn-primary">
                    <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
                </button>
        `
        lessonContainer.append(btnDiv)
    }

}

loadLesson();