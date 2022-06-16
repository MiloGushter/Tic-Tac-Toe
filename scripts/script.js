const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const checkBoard = (board) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i] === firstPlayer.role &&
        board[i + 3] === firstPlayer.role &&
        board[i + 6] === firstPlayer.role
      )
        return `${firstPlayer.name} won playing as a "${firstPlayer.role}"`;
      else if (
        board[i] === secondPlayer.role &&
        board[i + 3] === secondPlayer.role &&
        board[i + 6] === secondPlayer.role
      )
        return `${secondPlayer.name} won playing as a "${secondPlayer.role}"`;
    }
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] === firstPlayer.role &&
        board[i + 1] === firstPlayer.role &&
        board[i + 2] === firstPlayer.role
      )
        return `${firstPlayer.name} won playing as a "${firstPlayer.role}"`;
      else if (
        board[i] === secondPlayer.role &&
        board[i + 1] === secondPlayer.role &&
        board[i + 2] === secondPlayer.role
      )
        return `${secondPlayer.name} won playing as a "${secondPlayer.role}"`;
    }
    for (let i = 0; i < 1; i++) {
      if (
        (board[i] === firstPlayer.role &&
          board[i + 4] === firstPlayer.role &&
          board[board.length - 1] === firstPlayer.role) ||
        (board[i + 2] === firstPlayer.role &&
          board[i + 4] === firstPlayer.role &&
          board[board.length - 3] === firstPlayer.role)
      )
        return `${firstPlayer.name} won playing as a "${firstPlayer.role}"`;
      else if (
        (board[0] === secondPlayer.role &&
          board[i + 4] === secondPlayer.role &&
          board[board.length - 1] === secondPlayer.role) ||
        (board[i + 2] === secondPlayer.role &&
          board[i + 4] === secondPlayer.role &&
          board[board.length - 3] === secondPlayer.role)
      )
        return `${secondPlayer.name} won playing as a "${secondPlayer.role}"`;
    }
    if (board.includes("") !== true) return "It's a draw!";
    return false;
  };
  return { board, checkBoard };
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
      const messageBox = document.querySelector(".message");
      if (
        (field.textContent === "x" && playerO === true) ||
        (field.textContent === "o" && playerX === true)
      ) {
        messageBox.style.display = "block";
        messageBox.innerText = "That's illegal!";
        setTimeout(function () {
          messageBox.style.display = "none";
        }, 2000);
      }
      // TODO: This should be turned into erase of the field
      else if (
        (field.textContent === "x" && playerX === true) ||
        (field.textContent === "o" && playerO === true)
      ) {
        messageBox.style.display = "block";
        messageBox.innerText = "You have already played here!";
        setTimeout(function () {
          messageBox.style.display = "none";
        }, 2000);
      }
      if (playerX === true && field.textContent === "") {
        field.textContent = "x";
        playerX = false;
        playerO = true;
        gameBoard.board[fieldIndex] = "x";
        if (gameBoard.checkBoard(gameBoard.board) === false) return;
        else messageBox.innerText = gameBoard.checkBoard(gameBoard.board);
      } else if (playerO === true && field.textContent === "") {
        field.textContent = "o";
        playerX = true;
        playerO = false;
        gameBoard.board[fieldIndex] = "o";
        if (gameBoard.checkBoard(gameBoard.board) === false) return;
        else messageBox.innerText = gameBoard.checkBoard(gameBoard.board);
      }
    });
  });
})();

let firstPlayer;
let secondPlayer;
