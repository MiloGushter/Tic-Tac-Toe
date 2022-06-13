const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const displayController = (() => {
  //X is always first to be played
  let playerX = true;
  let playerO = false;

  fields = document.querySelectorAll(".field");
  fields.forEach((field) => {
    field.addEventListener("click", () => {
      let fieldIndex = Array.from(fields).indexOf(field);
      if (field.textContent !== "") {
        alert("That's is illegal!");
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
