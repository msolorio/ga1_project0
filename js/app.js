class Tomagotchi {
  constructor(hunger=10, sleepiness=10, boredom=10) {
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

const fido = new Tomagotchi();

console.log('fido:', fido);
