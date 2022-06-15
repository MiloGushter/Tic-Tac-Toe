const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const playerCreator = function (name, role) {
  return { name, role };
};

const displayController = (() => {
  // Information input controll
  let firstPlayerRadioX = document.querySelector("#player1x");
  let firstPlayerRadioO = document.querySelector("#player1o");
  let secondPlayerRadioX = document.querySelector("#player2x");
  let secondPlayerRadioO = document.querySelector("#player2o");

  firstPlayerRadioX.addEventListener("click", () => {
    secondPlayerRadioO.checked = true;
  });

  secondPlayerRadioO.addEventListener("click", () => {
    firstPlayerRadioX.checked = true;
  });

  firstPlayerRadioO.addEventListener("click", () => {
    secondPlayerRadioX.checked = true;
  });

  secondPlayerRadioX.addEventListener("click", () => {
    firstPlayerRadioO.checked = true;
  });

  const btn1 = document.querySelector(".submit-info1");
  btn1.addEventListener("click", () => {
    const input = document.querySelector("#player1");
    let playerName = input.value;
    if (playerName === "") {
      alert("Enter the name!");
      return;
    }
    if (
      firstPlayerRadioO.checked !== true &&
      firstPlayerRadioX.checked !== true
    ) {
      alert("You must choose the role!");
    }
    if (firstPlayerRadioX.checked)
      firstPlayer = playerCreator(playerName, firstPlayerRadioX.value);
    else if (firstPlayerRadioO.checked)
      firstPlayer = playerCreator(playerName, firstPlayerRadioO.value);
    input.value = "";
  });

  const btn2 = document.querySelector(".submit-info2");
  btn2.addEventListener("click", () => {
    const input = document.querySelector("#player2");
    let playerName = input.value;
    if (playerName === "") {
      alert("Enter the name!");
      return;
    }
    if (
      secondPlayerRadioO.checked !== true &&
      secondPlayerRadioX.checked !== true
    ) {
      alert("You must choose the role!");
    }
    if (secondPlayerRadioX.checked)
      secondPlayer = playerCreator(playerName, secondPlayerRadioX.value);
    else if (secondPlayerRadioO.checked)
      secondPlayer = playerCreator(playerName, secondPlayerRadioO.value);
    input.value = "";
  });

  //X is always first to be played
  let playerX = true;
  let playerO = false;

  fields = document.querySelectorAll(".field");
  fields.forEach((field) => {
    field.addEventListener("click", () => {
      let fieldIndex = Array.from(fields).indexOf(field);
      if (
        (field.textContent === "x" && playerO === true) ||
        (field.textContent === "o" && playerX === true)
      ) {
        alert("That's is illegal!");
      }
      // TODO: This should be turned into erase of the field
      else if (
        (field.textContent === "x" && playerX === true) ||
        (field.textContent === "o" && playerO === true)
      ) {
        alert("You have already played here!");
      }
      if (playerX === true && field.textContent === "") {
        field.textContent = "x";
        playerX = false;
        playerO = true;
        gameBoard.board.splice(fieldIndex, 0, "x");
      } else if (playerO === true && field.textContent === "") {
        field.textContent = "o";
        playerX = true;
        playerO = false;
        gameBoard.board.splice(fieldIndex, 0, "o");
      }
    });
  });
})();

let firstPlayer;
let secondPlayer;
