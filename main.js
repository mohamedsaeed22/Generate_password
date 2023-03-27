let spanPassword = document.querySelector(".pass");
let inputRange = document.querySelector("#range");
let labelRange = document.querySelector(".range-label");
let checkedNum = document.querySelector(".num");
let checkedUpper = document.querySelector(".upper");
let checkedLower = document.querySelector(".lower");
let checkedSymb = document.querySelector(".symb");
let btnGenerate = document.querySelector(".generate");
let btnCopy = document.querySelector(".copy-btn");

let boolNum = true,
  boolUpper = true,
  boolLower = true,
  boolSymbol = true;
let finalPassword = "";
const letters = "abcdefghijklmnopqrstuvwxyz";
const upperCase = Array.from(letters.toUpperCase());
const lowerCase = Array.from(letters);
const numbers = Array.from("0123456789");
const symbols = Array.from(`@#$%^&*()-_+={}[]|:;"'<>,.?/`);

labelRange.innerHTML = inputRange.value;
let range = inputRange.value;
inputRange.oninput = function () {
  labelRange.innerHTML = inputRange.value;
  range = inputRange.value;
};

checkedNum.oninput = function (e) {
  boolNum = e.currentTarget.checked;
};
checkedUpper.oninput = function (e) {
  boolUpper = e.currentTarget.checked;
};
checkedLower.oninput = function (e) {
  boolLower = e.currentTarget.checked;
};
checkedSymb.oninput = function (e) {
  boolSymbol = e.currentTarget.checked;
};

btnCopy.addEventListener("click", function (e) {
  if (!finalPassword.length <= 0) {
    copyToClipboard(finalPassword);
    btnCopy.innerHTML = "copied";
    setTimeout(() => {
      btnCopy.innerHTML = "copy";
    }, 2000);
  }
});

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    btnCopy.innerHTML = "error";
  }
}

btnGenerate.onclick = function () {
  generatePassword(range, boolNum, boolUpper, boolLower, boolSymbol);
};

function generatePassword(range, boolNum, boolUpper, boolLower, boolSymbol) {
  spanPassword.innerHTML = "";
  finalPassword = "";
  if (boolNum || boolUpper || boolLower || boolSymbol) {
    if (boolNum) {
      finalPassword += generateRandomWithNoRepeat([...numbers]);
    }
    if (boolUpper) {
      finalPassword += generateRandomWithNoRepeat([...upperCase]);
    }
    if (boolLower) {
      finalPassword += generateRandomWithNoRepeat([...lowerCase]);
    }
    if (boolSymbol) {
      finalPassword += generateRandomWithNoRepeat([...symbols]);
    }
    let mixedArray = generateRandomWithNoRepeat([...finalPassword]);
    finalPassword = "";
    for (var i = 0; i < range; i++) {
      finalPassword += mixedArray[i];
    }
  } else {
    spanPassword.innerHTML = "Check At least One Label";
  }
  spanPassword.appendChild(document.createTextNode(finalPassword));
}

function generateRandomWithNoRepeat(array) {
  var Pass = array,
    ranPass = [],
    i = array.length,
    j = 0;
  if (array.length === 10) {
    ranPass = numbers;
  }
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    ranPass.push(Pass[j]);
    Pass.splice(j, 1);
  }
  return ranPass.join("");
}
