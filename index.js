const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displaylesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const WordContainer = document.getElementById("word-container");
  WordContainer.innerHTML = "";

  words.forEach((word) => {

    const card = document.createElement("div");
    card.innerHTML = `
        
                <div class="rounded-2xl bg-white p-8 flex gap-3 flex-col items-center hover:shadow-lg transform transition duration-300 hover:scale-105">
                <h2 class="font-semibold text-[32px]">${word.word}</h2>
                <p class="text-[18px] md:text-[20px] text-center">Meaning /Pronounciation</p>
                <p class="text-[28px]">${word.meaning} / ${word.pronunciation}</p>
                <div class=" w-full flex justify-between">
                    <button class="w-12 h-12 bg-[#EDF0F0] text-2xl rounded-full"><i class="text-[#345C54] fa-solid fa-circle-info"></i></button>
                    <button class="w-12 h-12 bg-[#EDF0F0] text-xl rounded-full"><i class="text-[#345C54] fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        
        `;

        WordContainer.append(card);
  });
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
    
    <button onclick="loadLevelWord(${lesson.level_no})" class="active:bg-[#345C54] text-[#345C54] hover:text-[#345C54] active:text-white border-1 border-[#345C54] rounded-full px-6 p-3 "><i class="pr-5 fa-solid fa-bookmark"></i>Lesson - ${lesson.level_no}</button>
    
    `;

    // 4. Append into container
    levelContainer.append(btnDiv);
  }
};
loadlessons();
