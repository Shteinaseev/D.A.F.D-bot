const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, Client, GatewayIntentBits, Message} = require('discord.js');

module.exports = {
data: new SlashCommandBuilder().setName('tetris').setDescription('Play a game of Tetris'),
async execute(interaction) {

const left = new ButtonBuilder()
.setCustomId('left')
.setEmoji('<:arrow4:1211025846609911890>')
.setStyle(ButtonStyle.Primary);

const rotate = new ButtonBuilder()
.setCustomId('rotate')
.setEmoji('<:arrow1:1226967622499700858>')
.setStyle(ButtonStyle.Primary);

const right = new ButtonBuilder()
.setCustomId('right')
.setEmoji('<:arrow3:1211020585799516180>')
.setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder()
.addComponents(left, rotate, right);

const message = await interaction.reply({ content: 'Начинаем игру в тетрис', components: [row] });


const filter = (button) => button.user.id === interaction.user.id;
const collector = message.createMessageComponentCollector({ filter, time: 15000 });
collector.on('collect', async (button) => {
    if (button.customId === 'right') {
      moveRight(initialPosition, tetromino, gameBoard, button);
    }
    else if (button.customId === 'left') {
      moveLeft(initialPosition, tetromino, gameBoard, button);
    }
    else if (button.customId === 'rotate') {
      let tetromino = await rotateTetromino(tetromino, gameBoard, button);
  }
});

collector.on('end', (collected) => console.log(`Collected ${collected.size} interactions.`));

const aBe = ':blue_square:';
const eSE = ':black_large_square:';

const gameBoard = [
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE],
    [eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE, eSE]
];
const tetrominos = {
    'I' : [
        [eSE, eSE, eSE, eSE],
        [eSE, eSE, eSE, eSE],
        [eSE, eSE, eSE, eSE],
        [aBe, aBe, aBe, aBe],
    ],
    'L' : [
        [eSE, eSE, eSE],
        [eSE, eSE, aBe],
        [aBe, aBe, aBe],
    ],
    'J' : [
        [eSE, eSE, eSE],
        [aBe, eSE, eSE],
        [aBe, aBe, aBe],
    ],
    'O': [
        [aBe,aBe],
        [aBe,aBe],
      ],

    'S' : [
        [eSE, eSE, eSE],
        [eSE, aBe, aBe],
        [aBe, aBe, eSE],
    ],

    'Z' : [
        [eSE, eSE, eSE],
        [aBe, aBe, eSE],
        [eSE, aBe, aBe],
    ],

    'T' : [
        [eSE, eSE, eSE],
        [eSE, aBe, eSE],
        [aBe, aBe, aBe],
    ]

};

async function moveRight(currentPosition, tetromino, gameBoard, button) {
  currentPosition[1]++; // Увеличиваем индекс столбца на 1
  const embedDescription = createGameBoardWithTetromino(gameBoard, tetromino, currentPosition);
  await button.update({embeds: [{ description: embedDescription, color: 0x0099FF }] });
} 


async function moveLeft(currentPosition, tetromino, gameBoard, button) {
  currentPosition[1]--;
  const embedDescription = createGameBoardWithTetromino(gameBoard, tetromino, currentPosition);
  await button.update({embeds: [{ description: embedDescription, color: 0x0099FF }] });
} 

async function rotateTetromino(tetromino, gameBoard, button) {
  const rotatedTetromino = rotateMatrix(tetromino);
  const embedDescription = createGameBoardWithTetromino(gameBoard, rotatedTetromino, initialPosition);
  await button.update({ embeds: [{ description: embedDescription, color: 0x0099FF }] });
  return rotatedTetromino; 
}
function rotateMatrix(matrix) {
const rows = matrix.length;
const cols = matrix[0].length;
const rotatedMatrix = [];

for (let i = 0; i < cols; i++) {
    const newRow = [];
    for (let j = rows - 1; j >= 0; j--) {
        newRow.push(matrix[j][i]);
    }
    rotatedMatrix.push(newRow);
}

return rotatedMatrix;
}

function canMoveDown(currentPosition, tetromino, gameBoard) {
  const tetrominoHeight = tetromino.length;
  const tetrominoWidth = tetromino[0].length;

  if (currentPosition[0] + tetrominoHeight >= gameBoard.length) {
    return false; // Тетромино не может двигаться вниз
  }

  // Проверяем, есть ли препятствия под тетромино
  for (let i = 0; i < tetrominoHeight; i++) {
    for (let j = 0; j < tetrominoWidth; j++) {    
      if (tetromino[i][j]!== eSE &&
        gameBoard[currentPosition[0] + i + 1][currentPosition[1] + j]!== eSE) {
        return false; // Тетромино не может двигаться вниз
      }
    }
  }

  return true; // Тетромино может двигаться вниз
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


// Функция для падения тетромино вниз
async function moveTetrominoDown(currentPosition, tetromino, gameBoard, interaction) {
  while (canMoveDown(currentPosition, tetromino, gameBoard)) {
    currentPosition[0]++; // Смещаем тетромино вниз
    const embedDescription = createGameBoardWithTetromino(gameBoard, tetromino, currentPosition);
    await interaction.editReply({embeds: [{ description: embedDescription, color: 0x0099FF }] });
    await delay(800); // Задержка в 1 се кунду 
  }
  // Если тетромино больше не может двигаться вниз, фиксируем его позицию на игровом поле
  placeTetrominoOnBoard(currentPosition, tetromino, gameBoard);
}


function createGameBoardWithTetromino(gameBoard, tetromino, position) {
    let result = '';
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (i >= position[0] && i < position[0] + tetromino.length &&
                j >= position[1] && j < position[1] + tetromino[0].length) {
                result += tetromino[i - position[0]][j - position[1]]; 
            } else {
                result += gameBoard[i][j]; 
            }
        }
        result += '\n'; 
    }
    return result;
}


function placeTetrominoOnBoard(position, tetromino, gameBoard) {
    const tetrominoHeight = tetromino.length;
    const tetrominoWidth = tetromino[0].length;
  
    for (let i = 0; i < tetrominoHeight; i++) {
      for (let j = 0; j < tetrominoWidth; j++) {
        if (tetromino[i][j]!== eSE) {
          gameBoard[position[0] + i][position[1] + j] = tetromino[i][j];
        }
      }
    }
  }

function getRandomTetrominoKey(tetrominos) {
    const tetrominoKeys = Object.keys(tetrominos);
    const randomIndex = Math.floor(Math.random() * tetrominoKeys.length);
    return tetrominoKeys[randomIndex];  
}

const tetrominoKey = getRandomTetrominoKey(tetrominos);
const tetromino = tetrominos[tetrominoKey];
const initialPosition = [-2, 3];
moveTetrominoDown(initialPosition, tetromino, gameBoard, interaction);
},
};
