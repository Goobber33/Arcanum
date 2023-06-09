const cardData =[{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26c7"
  },
  "cardName": "Celestial Scalebearer",
  "offence": "20",
  "defence": "30",
  "health": "30",
  "image": "./src/images/CelestialScalebearer.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26c8"
  },
  "cardName": "Dreadmaw Ravager",
  "offence": "40",
  "defence": "40",
  "health": "20",
  "image": "./src/images/DreadmawRavager.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26c9"
  },
  "cardName": "Spectral Tidewarden",
  "offence": "80",
  "defence": "10",
  "health": "10",
  "image": "./src/images/SpectralTidewarden.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26ca"
  },
  "cardName": "Towering Earthshaker",
  "offence": "0",
  "defence": "50",
  "health": "50",
  "image": "./src/images/ToweringEarthshaker.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26cb"
  },
  "cardName": "Wasteland Devourer",
  "offence": "0",
  "defence": "50",
  "health": "50",
  "image": "./src/images/WastelandDevourer.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26cc"
  },
  "cardName": "Abyssal Spellweaver",
  "offence": "60",
  "defence": "20",
  "health": "20",
  "image": "./src/images/AbyssalSpellweaver.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26cd"
  },
  "cardName": "Forestbane Berserker",
  "offence": "40",
  "defence": "30",
  "health": "30",
  "image": "./src/images/ForestbaneBerserker.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26ce"
  },
  "cardName": "Fungal Axemaster",
  "offence": "30",
  "defence": "30",
  "health": "40",
  "image": "./src/images/FungalAxemaster.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26cf"
  },
  "cardName": "Mountainstride Warbringer",
  "offence": "40",
  "defence": "20",
  "health": "40",
  "image": "./src/images/MountainstrideWarbringer.png"
},{
  "_id": {
    "$oid": "647fbddef6f5bca74c4f26d0"
  },
  "cardName": "Scorchfang",
  "offence": "30",
  "defence": "10",
  "health": "60",
  "image": "./src/images/Scorchfang.png"
}]

const addCardToHand = () => {
  const randomCard = cardData[Math.floor(Math.random() * cardData.length)];
  setPlayerHand((prevHand) => [...prevHand, randomCard]);
};