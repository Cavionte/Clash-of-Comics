import { getIndividualCharacter } from "./fetchFunctions";

export const renderCharacters = (charList, fighters) => {
  charList.innerHTML = ""; // Clear existing list
  fighters.forEach((char) => {
    const listItem = document.createElement("li"); // Correctly create "li" element
    listItem.classList.add("character-card");
    listItem.dataset.id = char.id;

    const img = document.createElement("img");

    img.src = char.smallImg;
    img.alt = char.name;
    listItem.appendChild(img);

    const statsButton = document.createElement("button");
    statsButton.textContent = "Stats";
    listItem.appendChild(statsButton);

    const statsList = document.createElement("dialog");
    statsList.innerHTML = `
        <h3>${char.name}</h3>
        <ul>
          <li>Intelligence: ${char.stats.intelligence}</li>
          <li>Strength: ${char.stats.strength}</li>
          <li>Speed: ${char.stats.speed}</li>
          <li>Durability: ${char.stats.durability}</li>
          <li>Power: ${char.stats.power}</li>
          <li>Combat: ${char.stats.combat}</li>
        </ul>
        <button class="close-dialog">Close</button>
      `;
    listItem.appendChild(statsList);

    statsButton.addEventListener("click", () => {
      statsList.showModal();
    });

    statsList.querySelector(".close-dialog").addEventListener("click", () => {
      statsList.close();
    });

    const playerOneButton = document.createElement("button");
    playerOneButton.classList.add("player-one");
    playerOneButton.textContent = "Select Player 1";
    playerOneButton.dataset.id = char.id;
    // playerOneButton.addEventListener("click", () => {
    //   getIndividualCharacter(char.id).then(
    //     renderPlayerOne(playerOneDiv, fighter)
    //   );
    // });

    listItem.appendChild(playerOneButton);
    const playerTwoButton = document.createElement("button");
    playerTwoButton.classList.add("player-two");
    playerTwoButton.textContent = "Select Player 2";
    playerTwoButton.dataset.id = char.id;
    listItem.appendChild(playerTwoButton);

    charList.appendChild(listItem);
  });
};

export const renderPlayerOne = (playerOneDiv, fighter) => {
  playerOneDiv.innerHTML = "";
  let fighterImg = document.createElement("img");
  fighterImg.src = fighter.stats.img;
  fighterImg.alt = fighter.name;
  playerOneDiv.appendChild(fighterImg);

  let fightersName = document.createElement("h2");
  fightersName.textContent = fighter.name;
  playerOneDiv.appendChild(fightersName);
};

export const renderPlayerTwo = (playerTwoDiv, fighter) => {
  playerTwoDiv.innerHTML = "";
  let fighterImg = document.createElement("img");
  fighterImg.src = fighter.stats.img;
  fighterImg.alt = fighter.name;
  playerTwoDiv.appendChild(fighterImg);

  let fightersName = document.createElement("h2");
  fightersName.textContent = fighter.name;
  playerTwoDiv.appendChild(fightersName);
};
