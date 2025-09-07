// Add Sound

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// Add Leson Level

const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displaylesson(json.data));
};

const displaylesson = (lessons) => {
  // 1.Get the container & Empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. Get into every lessons
  for (let lesson of lessons) {
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline lesson-btn rounded-full text-[#345C54] font-normal text-[18px]"><i class="pr-5 fa-solid fa-bookmark"></i>Lesson - ${lesson.level_no}</button>
    
    `;

    // 4. Append into container
    levelContainer.append(btnDiv);
  }
};

// Remove Active Button

const reomoveActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};

// Add Word's Content

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      reomoveActive(); //Remove All active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); //Add only in the acive
      displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
  const WordContainer = document.getElementById("word-container");
  WordContainer.innerHTML = "";

  if (words.length == 0) {
    WordContainer.innerHTML = `            
    
                <img class="w-30 mx-auto" src="./assets/favicon.png" alt="">
                <div class="text-center m-10 mx-a">
                <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-[32px] mt-5">নেক্সট Lesson এ যান</h2>
            </div>`;

    manageSpinner(false);

    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        
                <div class="rounded-2xl bg-white p-8 flex gap-3 flex-col items-center hover:shadow-lg transform transition duration-300 hover:scale-105">
                <h2 class="font-semibold text-[32px]">${
                  word.word ? word.word : "শব্দ পাওয়া যাইনি"
                }</h2>
                <p class="text-[18px] md:text-[20px] text-center">Meaning /Pronounciation</p>
                <p class="text-[28px]">${
                  word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"
                } / ${
      word.pronunciation ? word.pronunciation : "Pawa Jaini"
    }</p>

                <div class=" w-full flex justify-between">
                    <button onclick="loadWordDetail(${
                      word.id
                    })" class="w-12 h-12 bg-[#EDF0F0] text-2xl rounded-full"><i class="text-[#345C54] fa-solid fa-circle-info"></i></button>

                    <button onclick="pronounceWord('${
                      word.word
                    }')" class="w-12 h-12 bg-[#EDF0F0] text-xl rounded-full"><i class="text-[#345C54] fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        
        `;

    WordContainer.append(card);
  });

  manageSpinner(false);
};

// Make Span

const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join("");
};

// Loader
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// Make Modal Content

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetail(details.data);
};

const displayWordDetail = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `



    <div class="">
    <h2 class="text-2xl font-bold">${
      word.word
    } (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation}) 
    </h2>
    </div>

    <div class="">
    <h2 class="font-bold">${word.meaning}</h2>
    <p>আগ্রহী</p>
    </div>

    <div class="">
    <h2 class="font-bold">Example</h2>
    <p>${word.sentence}</p>
    </div>

    <div class="">
    <h2 class="font-bold">Synonym</h2>
    <div class="">${createElements(word.synonyms)}</div>
    </div>
    

    </div>
    


  `;

  document.getElementById("word_modal").showModal();
};

loadlessons();

document.getElementById("btn-search").addEventListener("click", () => {
  reomoveActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      // console.log(filterWords)
      displayLevelWord(filterWords);
    });
});
