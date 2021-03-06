let firstPlayer;
let secondPlayer;

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
  const restartGame = function () {
    fields.forEach((fieldalt) => {
      fieldalt.textContent = "";
    });
    const reset = document.querySelector(".restart");
    const message = document.querySelector(".message");
    reset.classList.add("hide");
    message.textContent = "";
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
  };

  const createPlayer = function (radioX, radioO, playerNum) {
    const input = document.querySelector(`#player${playerNum}`);
    let playerName = input.value;
    if (playerName === "") {
      alert("Enter the name!");
      return;
    }
    if (radioO.checked !== true && radioX.checked !== true) {
      alert("You must choose the role!");
    }
    input.value = "";
    if (radioX.checked && playerNum === 1) {
      firstPlayer = playerCreator(playerName, radioX.value);
    } else if (radioO.checked && playerNum === 1) {
      firstPlayer = playerCreator(playerName, radioO.value);
    }
    if (radioX.checked && playerNum === 2) {
      secondPlayer = playerCreator(playerName, radioX.value);
    } else if (radioO.checked && playerNum === 2) {
      secondPlayer = playerCreator(playerName, radioO.value);
    }
  };

  const gameFinish = (message) => {
    message.classList.remove("hide");
    message.textContent = gameBoard.checkBoard(gameBoard.board);
    const resetBtn = document.querySelector(".restart");
    resetBtn.textContent = "Restart the game";
    resetBtn.classList.remove("hide");
    resetBtn.addEventListener("click", restartGame);
  };

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
  btn1.addEventListener("click", function () {
    createPlayer(firstPlayerRadioX, firstPlayerRadioO, 1, firstPlayer);
  });

  const btn2 = document.querySelector(".submit-info2");
  btn2.addEventListener("click", function () {
    createPlayer(secondPlayerRadioX, secondPlayerRadioO, 2, secondPlayer);
  });

  //X is always first to be played
  let playerX = true;
  let playerO = false;
  const turnInfo = document.querySelector(".turn-info");

  fields = document.querySelectorAll(".field");
  fields.forEach((field) => {
    field.addEventListener("click", () => {
      let fieldIndex = Array.from(fields).indexOf(field);
      const messageBox = document.querySelector(".message");
      if (firstPlayer === undefined || secondPlayer === undefined) {
        messageBox.textContent =
          "Please enter information for both players in order to play a game";
        return;
      } else {
        messageBox.textContent = "";
      }
      if (
        (field.textContent === "x" && playerO === true) ||
        (field.textContent === "o" && playerX === true)
      ) {
        messageBox.textContent = "That's illegal!";
        setTimeout(function () {
          messageBox.classList.add("hide");
        }, 2000);
      } else if (
        (field.textContent === "x" && playerX === true) ||
        (field.textContent === "o" && playerO === true)
      ) {
        messageBox.textContent = "You have already played here!";
        setTimeout(function () {
          messageBox.classList.add("hide");
        }, 2000);
      }
      if (playerX === true && field.textContent === "") {
        field.textContent = "x";
        playerX = false;
        playerO = true;
        turnInfo.textContent = "O's turn";
        gameBoard.board[fieldIndex] = "x";
        if (gameBoard.checkBoard(gameBoard.board) === false) return;
        else {
          gameFinish(messageBox);
        }
      } else if (playerO === true && field.textContent === "") {
        field.textContent = "o";
        playerX = true;
        playerO = false;
        turnInfo.textContent = "X's turn";
        gameBoard.board[fieldIndex] = "o";
        if (gameBoard.checkBoard(gameBoard.board) === false) return;
        else {
          gameFinish(messageBox);
        }
      }
    });
  });
})();
