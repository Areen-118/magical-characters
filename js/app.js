"use strict";

const loadMoreBtn = document.getElementById("loadMoreBtn");
const cardContainer = document.getElementById("cardContainer");
const houseSelector = document.getElementById("houseSelector");

let allCharacters = [];
let filteredCharacters = [];
let currentIndex = 0;
const batchSize = 16;

function fetchData() {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => {
      if (!response.ok) throw new Error("the response status is not ok");
      return response.json();
    })
    .then((characters) => {
      allCharacters = characters;
      filteredCharacters = characters;
      currentIndex = 0;
      cardContainer.innerHTML = "";
      renderData(filteredCharacters.slice(currentIndex, currentIndex + batchSize));
      currentIndex += batchSize;
      toggleLoadMore();
    })
    .catch((error) => {
      console.log(" Error caught here:", error);
    });
}

function renderData(charactersX) {
  charactersX.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${element.image || 'images/not-found.png'}">
      <p>${element.name}</p>
      <p>${element.house}</p>
      <p>${element.dateOfBirth || "Unknown"}</p>
    `;

    cardContainer.appendChild(card);
  });
}

function toggleLoadMore() {
  loadMoreBtn.style.display = currentIndex >= filteredCharacters.length ? "none" : "block";
}

houseSelector.addEventListener("change", () => {
  const selectedHouse = houseSelector.value;

  if (selectedHouse === "All-houses") {
    filteredCharacters = allCharacters;
  } else {
    filteredCharacters = allCharacters.filter(char => char.house === selectedHouse);
  }

  currentIndex = 0;
  cardContainer.innerHTML = "";
  renderData(filteredCharacters.slice(currentIndex, currentIndex + batchSize));
  currentIndex += batchSize;
  toggleLoadMore();
});

loadMoreBtn.addEventListener("click", () => {
  renderData(filteredCharacters.slice(currentIndex, currentIndex + batchSize));
  currentIndex += batchSize;
  toggleLoadMore();
});

fetchData();
