// getting inputs
const skinToneInput = document.querySelectorAll(".input-radio-skin-tone");
const nationalityInput = document.querySelectorAll(".input-radio-nationality");

// getting modal
const modal = document.querySelector("#modal");
const closeModalButton = document.querySelector("#close-modal");

// getting result
const result = document.querySelector("#result");

// getting submit button
const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click", (e)=> {
  e.preventDefault();
  let personSkinTone, personNationality;

  for(input of skinToneInput){
    if(input.checked){
      // getting skintone
      if(input.value === 'black'){
        personSkinTone = true;
      }else{
        personSkinTone = false;
      }
    }
  }

  for(input of nationalityInput){
    // getting nationality
    if(input.checked){
      personNationality = input.value;
    }
  }

  let personData = { isBlack: personSkinTone, isFrom: personNationality };
  
  // spoiler alert: kinda hard to read i didn't find an easier way
  // we checking both skintone and nationality checks to prevent errors
  if((personData.isBlack === true || personData.isBlack === false) && typeof(personData.isFrom) === 'string'){
    modal.style.display = "flex";
    chanceOfBeingASinger(personData);
  }else{
    modal.style.display = "flex";
    result.innerHTML = `Por favor completa el formulario.`;
  }
})

closeModalButton.addEventListener("click", ()=> {
  modal.style.display = "none";
})

// creating an array with fake data to create fake statistics
const array = [
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: false, isSinger: true, isFrom: "UK" },
  { isBlack: true, isSinger: false, isFrom: "FR" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "UK" },
  { isBlack: true, isSinger: true, isFrom: "FR" },
  { isBlack: false, isSinger: false, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "UK" },
  { isBlack: false, isSinger: true, isFrom: "FR" },
  { isBlack: true, isSinger: false, isFrom: "UK" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: false, isFrom: "UK" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "UK" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: false, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: false, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: false, isFrom: "US" },
  { isBlack: false, isSinger: true, isFrom: "UK" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "FR" },
  { isBlack: false, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: false, isSinger: false, isFrom: "FR" },
  { isBlack: true, isSinger: true, isFrom: "US" },
  { isBlack: false, isSinger: true, isFrom: "US" },
  { isBlack: true, isSinger: true, isFrom: "US" },
];

const chanceOfBeingASinger = ({ isBlack, isFrom }) => {
  // looking for all black singers
  const allBlackPeople = array.filter((e) => e.isBlack);
  const allBlackSingers = array.filter((e) => e.isBlack && e.isSinger);
  const allBlackSingersUS = allBlackSingers.filter((e) => e.isFrom === "US");
  const allBlackSingersFR = allBlackSingers.filter((e) => e.isFrom === "FR");
  const allBlackSingersUK = allBlackSingers.filter((e) => e.isFrom === "UK");

  // looking for all white singers
  const allWhitePeople = array.filter((e) => !e.isBlack);
  const allWhiteSingers = array.filter((e) => !e.isBlack && e.isSinger);
  const allWhiteSingersUS = allWhiteSingers.filter((e) => e.isFrom === "US");
  const allWhiteSingersUK = allWhiteSingers.filter((e) => e.isFrom === "UK");
  const allWhiteSingersFR = allWhiteSingers.filter((e) => e.isFrom === "FR");

  if (isBlack) {
    switch (isFrom) {
      case "us":
        return result.innerHTML = `Cuentas con un ${((allBlackSingersUS.length / allBlackSingers.length) * 100).toFixed(2)}% de posibilidades de ser rapero.`;
      case "uk":
        return result.innerHTML = `Cuentas con un ${((allBlackSingersUK.length / allBlackSingers.length) * 100).toFixed(2)}% de posibilidades de ser rapero.`;
      case "fr":
        return result.innerHTML = `Cuentas con un ${((allBlackSingersFR.length / allBlackSingers.length) * 100).toFixed(2)}% de posibilidades de ser rapero.`;
    }
  } else if (!isBlack) {
    switch (isFrom) {
      case "us":
        return result.innerHTML = `Cuentas con un ${((allWhiteSingersUS.length / allWhiteSingers.length) * 100).toFixed(2)}% de posibilidades de ser rapero.`;
      case "uk":
        return result.innerHTML = `Cuentas con un ${((allWhiteSingersUK.length / allWhiteSingers.length) * 100).toFixed(2)}% de posibilidades de ser rapero.`;
      case "fr":
        return result.innerHTML = `Cuentas con un ${((allWhiteSingersFR.length / allWhiteSingers.length) * 100).toFixed(2)}% de posibilidades de ser rapero.`;
    }
  }
};