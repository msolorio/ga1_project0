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

// - CREATE 1 TOMAGOTCHI CLASS
class Pet {
  constructor(petName, hunger=10, sleepiness=10, boredom=10) {
    this.petName = petName;
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
    this.pets = []
  }

  // FORM
  startGame() {
    const that = this;
    
    $createNewPetButton.on('click', function() {
      // if this is first pet start timer

      // calls createPet passing in name from input field

      that.createPet('testName');
    });
  }

  createPet(petName) {
    const newPet = new Pet(petName);

    this.pets.push(newPet);

    console.log('this:', this);
  }

  // RENDER
  renderTomagotchi(petName, petId) {
    const tomagotchiMarkup = (`
    <div class="pet" id="${petId}">
      <h3 class="pet-name">${petName}</h3>
      <img class="pet-img" src="./images/snail1.jpg" alt="pet" />
      </div>
    `);

    $pets.html(tomagotchiMarkup);  
  }
}

const game = new Game();
game.startGame();