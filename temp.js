
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaylevelWord(data.data));
};

const displaylevelWord = (words) => {
  const WordContainer = document.getElementById("word-container");
  WordContainer.innerHTML = "";

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
        
                    <div class="rounded-2xl bg-white p-8 flex gap-3 flex-col items-center hover:shadow-lg transform transition duration-300 hover:scale-105">
                <h2 class="font-semibold text-[32px]">Eager</h2>
                <p class="text-[18px] md:text-[20px] text-center">Meaning /Pronounciation</p>
                <p class="text-[28px]">"আগ্রহী / ইগার"</p>
                <div class=" w-full flex justify-between">
                    <button class="w-12 h-12 bg-[#EDF0F0] text-2xl rounded-full"><i class="text-[#345C54] fa-solid fa-circle-info"></i></button>
                    <button class="w-12 h-12 bg-[#EDF0F0] text-xl rounded-full"><i class="text-[#345C54] fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        
        `;

  });
};