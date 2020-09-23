/*
- CREATE 1 TOMAGOTCHI CLASS
- HAVE PET PROPERTIES INCREASE OVER TIME
- ADD BUTTONS FOR TURNING OUT THE LIGHTS
- ADD BUTTONS FOR FEEDING AND PLAYING WITH PETS
- TURNING OUT LIGHTS, FEEDING AND PLAYING SHOULD AFFECT
PROPERTIES OF THAT PET
- PET AGES OVER TIME
- KEEP A TIMER OF HOW LONG THE GAME HAS BEEN PLAYING
- KEEP A CURRENT SCORE BASED ON THE AGE OF ALL THE PETS
CURRENTLY ALIVE AND HOW LONG THEY HAVE BEEN ALIVE
*/
const $pets = $('#pets');
const $createNewPetButton = $('#create-new-pet');
const $createPetInput = $('#pet-input');

// - CREATE 1 TOMAGOTCHI CLASS
class Pet {
  constructor(petName, petId, hunger=0, sleepiness=0, boredom=0) {
    this.petName = petName;
    this.petId = petId;
    this.hunger = hunger;
    this.sleepiness = sleepiness;
    this.boredom = boredom;
  }

  getStats() {
    return {
      hunger: this.hunger,
      sleepiness: this.sleepiness,
      boredom: this.boredom
    }
  }
}

class Game {
  constructor() {
    this.score = 0,
    this.totalTime = 0
    this.pets = [],
    this.indexCount = 0
  }

  // DATA
  // TODO: move to Pet class
  resetPetStat(petId, stat) {
    const petToUpdate = this.pets.find((pet) => pet.petId === petId);
    petToUpdate[stat] = 0;
    this.renderAllPetsStats(this.pets);
  }

  // TODO: move to Pet class
  decrementPetStats(pet) {
    pet.hunger += 1;
    pet.sleepiness += 1;
    pet.boredom += 1;
  }

  decrementAllPetsStats(allPets) {
    allPets.forEach((pet) => {
      this.decrementPetStats(pet);
    })
  }

  renderAllPetsStats(allPets) {
    allPets.forEach((pet) => {
      $(`#pet-hunger-${pet.petId}`).text(pet.hunger);
      $(`#pet-sleepiness-${pet.petId}`).text(pet.sleepiness);
      $(`#pet-boredom-${pet.petId}`).text(pet.boredom);
    });
  }

  setTimer() {
    const gameTimer = window.setInterval(() => {
      this.decrementAllPetsStats(this.pets);
      this.renderAllPetsStats(this.pets);
    }, 3000);
  }

  startGame() {
    $createNewPetButton.on('click', () => {
      // if this is first pet start timer
      !this.pets.length && this.setTimer();

      // calls createPet passing in name from input field
      const petName = $createPetInput.val().trim();
      petName && this.createPet(petName);
    });

    $pets.on('click', '.pet-feed', (event) => {
      const petId = $(event.target).data('petid');
      this.resetPetStat(petId, 'hunger');
    });

    $pets.on('click', '.pet-play', (event) => {
      const petId = $(event.target).data('petid');
      this.resetPetStat(petId, 'boredom');
    });
  }

  createPet(petName) {
    const newPet = new Pet(petName, this.indexCount);

    this.pets.push(newPet);

    this.indexCount += 1;

    console.log('this.pets:', this.pets);

    this.renderPet(newPet);
  }

  // RENDER
  // TODO: move to Pet class
  getPetMarkup(petData) {
    return (`
      <div class="pet" id="${petData.petId}">
        <h3 class="pet-name">${petData.petName}</h3>
        <img class="pet-img" src="./images/snail1.jpg" alt="pet" />
        <div class="pet-status-group">
          <span class="pet-status">
            <p>Hunger:</p>
            <p id="pet-hunger-${petData.petId}">${petData.hunger}</p>
          </span>
          <span class="pet-status">
            <p>Sleepiness:</p>
            <p id="pet-sleepiness-${petData.petId}">${petData.sleepiness}</p>
          </span>
          <span class="pet-status">
            <p>Boredom:</p>
            <p id="pet-boredom-${petData.petId}">${petData.boredom}<p/>
          </span>
        </div>
        <div class="pet-interactions">
          <button
            class="pet-interact-button pet-feed"
            data-petid=${petData.petId}>
            Feed
          </button>
          <button
            class="pet-interact-button pet-play"
            data-petid=${petData.petId}>
            Play
          </button>
        </div>
      </div>
    `);
  }

  // TODO: move to Pet class
  renderPet(petData) {
    this.pets.length === 1 && $pets.html('');

    $pets.append(this.getPetMarkup(petData));
  }

}

const game = new Game();
game.startGame();

