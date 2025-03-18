const table = document.querySelector("table");
const numRows = 11;
const numCols = 11;

const mountains = [
  [2, 2],
  [4, 9],
  [6, 4],
  [9, 10],
  [10, 6],
];

for (let i = 0; i < numRows; i++) {
  const row = table.insertRow(i);

  for (let j = 0; j < numCols; j++) {
    const cell = row.insertCell(j);
    cell.className = "square";
    cell.id = 0;
    cell.addEventListener("click", place);

    if (
      mountains.some(
        ([rowIndex, colIndex]) => rowIndex === i + 1 && colIndex === j + 1
      )
    ) {
      cell.style.backgroundImage = 'url("img/hegy.png")';
      cell.style.backgroundSize = "cover";
      cell.style.backgroundRepeat = "no-repeat";
      cell.id = 6;
    }
  }
}

const grid = Array.from({ length: numRows }, () => Array(numCols).fill(0));

let remainingTime = 28;

const elements = [
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledArray = shuffleArray([...elements]);
let shuffledIndex = 0;
console.log(shuffledArray);

let currentElementIndex = 0;
console.log(shuffledArray[currentElementIndex]);

const currentSeasonElement = document.getElementById("currentS");

function currentSeason() {
  if (remainingTime <= 28 && remainingTime > 21) {
    return "Tavasz";
  } else if (remainingTime <= 21 && remainingTime > 14) {
    return "Nyár";
  } else if (remainingTime <= 14 && remainingTime > 7) {
    return "Ősz";
  } else if (remainingTime <= 7 && remainingTime >= 0) {
    return "Tél";
  } else {
    return "Invalid Season";
  }
}

function assignLettersToSeasons(currentSeason) {
  switch (currentSeason) {
    case "Tavasz":
      return ["A", "B"];
    case "Nyár":
      return ["B", "C"];
    case "Ősz":
      return ["C", "D"];
    case "Tél":
      return ["D", "A"];
    default:
      return [];
  }
}

const remainingTimeElement = document.getElementById("remaining-time");

let score = 0;
let hatarVidekScore = 0;
let almosVolgyScore = 0;
let krumpliOntozesScore = 0;
let erdoSzeleScore = 0;

const missions = {
  basic: [
    {
      title: "Az erdő széle",
      description:
        "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
    },
    {
      title: "Álmos-völgy",
      description:
        "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
    },
    {
      title: "Krumpliöntözés",
      description:
        "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
    },
    {
      title: "Határvidék",
      description: "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
    },
  ],
  extra: [
    {
      title: "Fasor",
      description:
        "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
    },
    {
      title: "Gazdag város",
      description:
        "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
    },
    {
      title: "Öntözőcsatorna",
      description:
        "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
    },
    {
      title: "Mágusok völgye",
      description:
        "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
    },
    {
      title: "Üres telek",
      description:
        "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
    },
    {
      title: "Sorház",
      description:
        "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
    },
    {
      title: "Páratlan silók",
      description:
        "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
    },
    {
      title: "Gazdag vidék",
      description:
        "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
    },
  ],
};

const tasks = document.querySelectorAll(".task");
const selectedMissions = new Set();

function getRandomMission() {
  const missionCategory = "basic";
  const availableMissions = missions[missionCategory].filter(
    (mission) => !selectedMissions.has(mission.title)
  );

  if (availableMissions.length === 0) {
    selectedMissions.clear();
    return getRandomMission();
  }

  const randomIndex = Math.floor(Math.random() * availableMissions.length);
  const selectedMission = availableMissions[randomIndex];
  selectedMissions.add(selectedMission.title);
  return selectedMission;
}

const letters = ["A", "B", "C", "D"];

tasks.forEach((task, index) => {
  const mission = getRandomMission();

  const titleElement = document.createElement("h3");
  titleElement.textContent = mission.title;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = mission.description;

  const imageElement = document.createElement("img");
  imageElement.src = `/img/${mission.title}.png`;

  const letterElement = document.createElement("div");
  letterElement.className = "letter";
  letterElement.textContent = letters[index];

  const taskScoreElement = document.createElement("p");
  taskScoreElement.textContent = 0;
  if (mission.title === "Határvidék") {
    taskScoreElement.className = "hatarVidek";
    taskScoreElement.textContent = "0 pont";
  }
  if (mission.title === "Álmos-völgy") {
    taskScoreElement.className = "almosVolgy";
    taskScoreElement.textContent = "0 pont";
  }
  if (mission.title === "Krumpliöntözés") {
    taskScoreElement.className = "kOntozes";
    taskScoreElement.textContent = "0 pont";
  }
  if (mission.title === "Az erdő széle") {
    taskScoreElement.className = "erdoSzele";
    taskScoreElement.textContent = "0 pont";
  }

  const descElement = document.createElement("div");
  descElement.className = "desc";
  descElement.appendChild(titleElement);
  descElement.appendChild(descriptionElement);
  descElement.appendChild(taskScoreElement);

  task.appendChild(imageElement);
  task.appendChild(descElement);
  task.appendChild(letterElement);
});

const scoreElement = document.querySelector(".score");
const hvScoreElement = document.querySelector(".hatarVidek");
const avScoreElement = document.querySelector(".almosVolgy");
const kOScoreElement = document.querySelector(".kOntozes");
const eSzScoreElement = document.querySelector(".erdoSzele");

/*///////////////////////////////// HATÁRVIDÉK /////////////////////////////////*/

const scoredRows = new Set();
const scoredCols = new Set();

function hatarVidek() {
  checkRows();
  checkCols();
}

function checkRows() {
  for (let i = 0; i < numRows; i++) {
    if (!scoredRows.has(i)) {
      let rowIsFull = true;

      for (let j = 0; j < numCols; j++) {
        const cell = table.rows[i].cells[j];

        if (cell.id === "0") {
          rowIsFull = false;
          break;
        }
      }

      if (rowIsFull) {
        score += 6;
        hatarVidekScore += 6;
        scoredRows.add(i);
      }
    }
  }
}

function checkCols() {
  for (let j = 0; j < numCols; j++) {
    if (!scoredCols.has(j)) {
      let colIsFull = true;

      for (let i = 0; i < numRows; i++) {
        const cell = table.rows[i].cells[j];

        if (cell.id === "0") {
          colIsFull = false;
          break;
        }
      }

      if (colIsFull) {
        score += 6;
        hatarVidekScore += 6;
        scoredCols.add(j);
      }
    }
  }
}

/*///////////////////////////////// HATÁRVIDÉK /////////////////////////////////*/

/*///////////////////////////////// ÁLMOS-VÖLGY /////////////////////////////////*/
const scoredRowsSet = new Set();

function almosVolgy() {
  for (let i = 0; i < numRows; i++) {
    if (!scoredRowsSet.has(i)) {
      let forestCount = 0;

      for (let j = 0; j < numCols; j++) {
        const cell = table.rows[i].cells[j];

        if (cell.id === "2") {
          forestCount++;
        }
      }

      if (forestCount === 3) {
        score += 4;
        almosVolgyScore += 4;

        scoredRowsSet.add(i);
      }
    }
  }
}
/*///////////////////////////////// ÁLMOS-VÖLGY /////////////////////////////////*/

/*///////////////////////////////// AZ ERDŐ SZÉLE /////////////////////////////////*/

const countedEdgeCells = new Set();

function erdoSzele() {
  for (let i = 0; i < numCols; i++) {
    checkEdgeCell(0, i);
    checkEdgeCell(numRows - 1, i);
  }

  for (let i = 1; i < numRows - 1; i++) {
    checkEdgeCell(i, 0);
    checkEdgeCell(i, numCols - 1);
  }
}

function checkEdgeCell(row, col) {
  const cell = table.rows[row].cells[col];

  const cellCoordinates = `${row},${col}`;

  if (cell.id === "2" && !countedEdgeCells.has(cellCoordinates)) {
    erdoSzeleScore++;
    score += 1;
    countedEdgeCells.add(cellCoordinates);
  }
}

/*///////////////////////////////// AZ ERDŐ SZÉLE /////////////////////////////////*/
/*///////////////////////////////// KRUMPLIÖNTÖZÉS /////////////////////////////////*/

let krumpliOntozesCheckedCells = new Set();

function krumpliOntozes() {
  let cellsToAddScore = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = table.rows[i].cells[j];

      if (cell.id === "1" && !krumpliOntozesCheckedCells.has(`${i},${j}`)) {
        let foundNeighbor = false;

        if (
          !foundNeighbor &&
          j + 1 < numCols &&
          table.rows[i].cells[j + 1].id === "4"
        ) {
          foundNeighbor = true;
        }
        if (
          !foundNeighbor &&
          j - 1 >= 0 &&
          table.rows[i].cells[j - 1].id === "4"
        ) {
          foundNeighbor = true;
        }
        if (
          !foundNeighbor &&
          i + 1 < numRows &&
          table.rows[i + 1].cells[j].id === "4"
        ) {
          foundNeighbor = true;
        }
        if (
          !foundNeighbor &&
          i - 1 >= 0 &&
          table.rows[i - 1].cells[j].id === "4"
        ) {
          foundNeighbor = true;
        }

        if (foundNeighbor) {
          cellsToAddScore.push({ row: i, col: j });
          krumpliOntozesCheckedCells.add(`${i},${j}`);
        }
      }
    }
  }

  cellsToAddScore.forEach(({ row, col }) => {
    krumpliOntozesScore += 2;
    score += 2;
  });
}

/*///////////////////////////////// KRUMPLIÖNTÖZÉS /////////////////////////////////*/

function updateSeason() {
  const season = currentSeason();
  const missionLetters = assignLettersToSeasons(season);

  currentSeasonElement.textContent = `Jelenlegi évszak: ${season} -  ${missionLetters.join(
    ", "
  )}`;
}

updateSeason();

function updateScore() {
  scoreElement.textContent = `Összesen: ${score} pont`;
  hvScoreElement.textContent = `${hatarVidekScore} pont`;
  avScoreElement.textContent = `${almosVolgyScore} pont`;
  kOScoreElement.textContent = `${krumpliOntozesScore} pont`;
  eSzScoreElement.textContent = `${erdoSzeleScore} pont`;
}

const pieceTable = document.querySelector(".piece");

const rotateBTN = document.getElementById("rotate");
rotateBTN.addEventListener("click", rotate);
const mirrorBTN = document.getElementById("mirror");
mirrorBTN.addEventListener("click", mirror);

draw();

function draw() {
  if (
    shuffledArray &&
    shuffledArray[currentElementIndex] &&
    shuffledArray[currentElementIndex].time !== undefined
  ) {
    pieceTable.innerHTML = "";

    const timeRow = pieceTable.insertRow(0);
    timeRow.textContent = `Idő: ${shuffledArray[currentElementIndex].time}`;
    timeRow.classList.add("time-row");
    for (let i = 0; i < 3; i++) {
      const row = pieceTable.insertRow(i);
      for (let j = 0; j < 3; j++) {
        const cell = row.insertCell(j);
        if (shuffledArray[currentElementIndex].shape[i][j] === 1) {
          cell.className = "piece-square";
          cell.style.backgroundImage = `url('img/${shuffledArray[currentElementIndex].type}.png')`;
          cell.style.backgroundSize = "cover";
          cell.style.backgroundRepeat = "no-repeat";
        } else {
          cell.className = "piece-square";
        }
      }
    }
  }
}

function rotate() {
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      [
        shuffledArray[currentElementIndex].shape[i][j],
        shuffledArray[currentElementIndex].shape[j][i],
      ] = [
        shuffledArray[currentElementIndex].shape[j][i],
        shuffledArray[currentElementIndex].shape[i][j],
      ];
    }
  }

  shuffledArray[currentElementIndex].shape.forEach((row) => row.reverse());

  draw();
}

function mirror() {
  shuffledArray[currentElementIndex].shape.forEach((row) => row.reverse());
  draw();
}

function place(event) {
  const clickedCell = event.target;
  const rowIndex = clickedCell.parentNode.rowIndex;
  const colIndex = clickedCell.cellIndex;

  if (canPlace(rowIndex, colIndex)) {
    for (let i = 0; i < shuffledArray[currentElementIndex].shape.length; i++) {
      for (
        let j = 0;
        j < shuffledArray[currentElementIndex].shape[i].length;
        j++
      ) {
        const targetRow = rowIndex + i;
        const targetCol = colIndex + j;

        if (
          targetRow >= 0 &&
          targetRow < numRows &&
          targetCol >= 0 &&
          targetCol < numCols
        ) {
          const tableRow = table.rows[targetRow];
          const tableCell = tableRow.cells[targetCol];

          if (shuffledArray[currentElementIndex].shape[i][j] === 1) {
            const cellType = getElementTypeId(
              shuffledArray[currentElementIndex].type
            );
            if (
              mountains.some(
                ([mRow, mCol]) =>
                  mRow === targetRow + 1 && mCol === targetCol + 1
              )
            )
              tableCell.id = cellType;
            grid[targetRow][targetCol] = cellType;
            tableCell.id = cellType;
            tableCell.style.backgroundImage = `url('img/${shuffledArray[currentElementIndex].type}.png')`;
            tableCell.style.backgroundSize = "cover";
            tableCell.style.backgroundRepeat = "no-repeat";
          }
        }
      }
    }
    if (remainingTime - shuffledArray[currentElementIndex].time < 0) {
      remainingTime = 0;
    } else {
      remainingTime -= shuffledArray[currentElementIndex].time;
      remainingTimeElement.textContent = `${remainingTime}`;
      currentElementIndex++;
    }

    updateSeason();
    draw();

    console.log(remainingTime);
    console.log(shuffledArray);
    console.log(shuffledArray[currentElementIndex]);
    if (remainingTime == 0) {
      erdoSzele();
      krumpliOntozes();
      almosVolgy();
      hatarVidek();
      updateScore();
      /* console.log(hatarVidekScore); */
      /* console.log(remainingTime); */
    }
  }
}
function canPlace(rowIndex, colIndex) {
  for (let i = 0; i < shuffledArray[currentElementIndex].shape.length; i++) {
    for (
      let j = 0;
      j < shuffledArray[currentElementIndex].shape[i].length;
      j++
    ) {
      const targetRow = rowIndex + i;
      const targetCol = colIndex + j;

      if (
        shuffledArray[currentElementIndex].shape[i][j] === 1 &&
        (targetRow >= numRows ||
          targetCol >= numCols ||
          grid[targetRow][targetCol] !== 0)
      ) {
        return false;
      }
    }
  }

  if (collidesWithMountain(rowIndex, colIndex)) {
    return false;
  }

  return true;
}

function getElementTypeId(elementType) {
  switch (elementType) {
    case "water":
      return 4;
    case "town":
      return 3;
    case "forest":
      return 2;
    case "farm":
      return 1;
    default:
      return 0;
  }
}

function collidesWithMountain(rowIndex, colIndex) {
  for (let i = 0; i < shuffledArray[currentElementIndex].shape.length; i++) {
    for (
      let j = 0;
      j < shuffledArray[currentElementIndex].shape[i].length;
      j++
    ) {
      const mountainRowIndex = rowIndex + i + 1;
      const mountainColIndex = colIndex + j + 1;

      if (
        shuffledArray[currentElementIndex].shape[i][j] === 1 &&
        mountains.some(
          ([mRow, mCol]) =>
            mRow === mountainRowIndex && mCol === mountainColIndex
        )
      ) {
        return true;
      }
    }
  }
  return false;
}
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    const cell = table.rows[i].cells[j];

    cell.addEventListener("mouseover", function () {
      const rowIndex = this.parentNode.rowIndex;
      const colIndex = this.cellIndex;

      if (canPlace(rowIndex, colIndex)) {
        highlightValidPlacement(rowIndex, colIndex);
      } else {
        highlightInvalidPlacement(rowIndex, colIndex);
      }
      /* console.log(cell.id); */
    });

    cell.addEventListener("mouseout", function () {
      const rowIndex = this.parentNode.rowIndex;
      const colIndex = this.cellIndex;
      resetCellColor(rowIndex, colIndex);
    });

    cell.addEventListener("click", place);
  }
}

function highlightValidPlacement(rowIndex, colIndex) {
  for (let i = 0; i < shuffledArray[currentElementIndex].shape.length; i++) {
    for (
      let j = 0;
      j < shuffledArray[currentElementIndex].shape[i].length;
      j++
    ) {
      const targetRow = rowIndex + i;
      const targetCol = colIndex + j;

      if (
        targetRow >= 0 &&
        targetRow < numRows &&
        targetCol >= 0 &&
        targetCol < numCols
      ) {
        const tableRow = table.rows[targetRow];

        if (tableRow) {
          const tableCell = tableRow.cells[targetCol];

          if (
            tableCell &&
            shuffledArray[currentElementIndex].shape[i][j] === 1
          ) {
            tableCell.style.backgroundColor = "green";
          }
        }
      }
    }
  }
}

function highlightInvalidPlacement(rowIndex, colIndex) {
  for (let i = 0; i < shuffledArray[currentElementIndex].shape.length; i++) {
    for (
      let j = 0;
      j < shuffledArray[currentElementIndex].shape[i].length;
      j++
    ) {
      const targetRow = rowIndex + i;
      const targetCol = colIndex + j;

      if (
        targetRow >= 0 &&
        targetRow < numRows &&
        targetCol >= 0 &&
        targetCol < numCols
      ) {
        const tableRow = table.rows[targetRow];
        const tableCell = tableRow.cells[targetCol];

        if (shuffledArray[currentElementIndex].shape[i][j] === 1) {
          tableCell.style.backgroundColor = "red";
        }
      }
    }
  }
}

function resetCellColor(rowIndex, colIndex) {
  for (let i = 0; i < shuffledArray[currentElementIndex].shape.length; i++) {
    for (
      let j = 0;
      j < shuffledArray[currentElementIndex].shape[i].length;
      j++
    ) {
      const targetRow = rowIndex + i;
      const targetCol = colIndex + j;

      if (
        targetRow >= 0 &&
        targetRow < numRows &&
        targetCol >= 0 &&
        targetCol < numCols
      ) {
        const tableRow = table.rows[targetRow];
        const tableCell = tableRow.cells[targetCol];

        if (tableCell) {
          tableCell.style.backgroundColor = "";
        }
      }
    }
  }
}
