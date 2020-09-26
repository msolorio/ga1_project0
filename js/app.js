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
const $body = $('body');
const $switchLights = $('#switch-lights');

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

  renderAllPetsStats() {
    $(`#pet-hunger-${this.petId}`).text(this.hunger);
    $(`#pet-sleepiness-${this.petId}`).text(this.sleepiness);
    $(`#pet-boredom-${this.petId}`).text(this.boredom);
  }

  resetPetStat(stat) {
    this[stat] = 0;
    this.renderAllPetsStats();
  }

  handleSleepiness(lightIsOn) {
    if (lightIsOn) this.sleepiness += 1;
    else if (!lightIsOn && this.sleepiness > 0) {
      this.sleepiness -= 1;
    }
  }

  incrementPetStats(lightIsOn) {
    this.hunger += 1;
    this.boredom += 1;
    this.handleSleepiness(lightIsOn);
  }

  getPetMarkup() {
    return (`
      <div class="pet" id="${this.petId}">
        <h3 class="pet-name">${this.petName}</h3>
        <img class="pet-img" src="./images/snail1.jpg" alt="pet" />
        <div class="pet-status-group">
          <span class="pet-status">
            <p>Hunger:</p>
            <p id="pet-hunger-${this.petId}">${this.hunger}</p>
          </span>
          <span class="pet-status">
            <p>Sleepiness:</p>
            <p id="pet-sleepiness-${this.petId}">${this.sleepiness}</p>
          </span>
          <span class="pet-status">
            <p>Boredom:</p>
            <p id="pet-boredom-${this.petId}">${this.boredom}<p/>
          </span>
        </div>
        <div class="pet-interactions">
          <button
            class="pet-interact-button pet-feed"
            data-petid=${this.petId}>
            Feed
          </button>
          <button
            class="pet-interact-button pet-play"
            data-petid=${this.petId}>
            Play
          </button>
        </div>
      </div>
    `);
  }

  renderPet() {
    $pets.append(this.getPetMarkup());
  }
}

class Game {
  constructor() {
    this.score = 0;
    this.totalTime = 0;
    this.pets = [];
    this.indexCount = 0;
    this.lightIsOn = true;
  }

  showHideButtons(lightIsOn) {
    $('.pet-interact-button').css('opacity', lightIsOn ? 1 : 0);
  }

  switchBackground(lightIsOn) {
    const backgroundColor = lightIsOn ? '#f5f5f5' : '#6a0000';
    $body.css('background', backgroundColor);
  }

  switchLights(lightIsOn) {
    this.switchBackground(lightIsOn);
    this.showHideButtons(lightIsOn);
  }

  incrementAllPetsStats(allPets, lightIsOn) {
    allPets.forEach((pet) => pet.incrementPetStats(lightIsOn));
  }

  setTimer() {
    const gameTimer = window.setInterval(() => {
      this.incrementAllPetsStats(this.pets, this.lightIsOn);
      this.pets.forEach((pet) => pet.renderAllPetsStats());
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
      const petToUpdate = this.pets.find((pet) => pet.petId === petId);
      petToUpdate.resetPetStat('hunger');
    });

    $pets.on('click', '.pet-play', (event) => {
      const petId = $(event.target).data('petid');
      const petToUpdate = this.pets.find((pet) => pet.petId === petId);
      petToUpdate.resetPetStat('boredom');
    });

    $switchLights.on('click', () => {
      this.lightIsOn = !this.lightIsOn;
      this.switchLights(this.lightIsOn);
    });
  }

  createPet(petName) {
    const newPet = new Pet(petName, this.indexCount);
    this.pets.push(newPet);
    this.pets.length === 1 && $pets.html('');
    newPet.renderPet();
    
    this.indexCount += 1;
  }
}

const game = new Game();
game.startGame();
