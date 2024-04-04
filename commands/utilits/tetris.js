const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('tetris').setDescription('Play a game of Tetris'),
    async execute(interaction) {
        const bE = ':white_large_square:';
        const aBe = ':orange_square:';
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
                [aBe, aBe, aBe, aBe],
                [eSE, eSE, eSE, eSE],
                [eSE, eSE, eSE, eSE],
            ],

            'L' : [
                [eSE, eSE, aBe],
                [aBe, aBe, aBe],
                [eSE, eSE, eSE],
            ],

            'J' : [
                [aBe, eSE, eSE],
                [aBe, aBe, aBe],
                [eSE, eSE, eSE],
            ],
            'O': [
                [aBe,aBe],
                [aBe,aBe],
              ],

            'S' : [
                [eSE, aBe, aBe],
                [aBe, aBe, eSE],
                [eSE, eSE, eSE],
            ],

            'Z' : [
                [aBe, aBe, eSE],
                [eSE, aBe, aBe],
                [eSE, eSE, eSE],
            ],

            'T' : [
                [eSE, aBe, eSE],
                [aBe, aBe, aBe],
                [eSE, eSE, eSE],
            ]
        };

        const tetrominoKeys = Object.keys(tetrominos);
        const randomTetrominoKey = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
        const randomTetromino = tetrominos[randomTetrominoKey];

        const initialPosition = [0, 3];
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

        function isCollision(tetromino) {
            for (let i = 0; i < tetromino.shape.length; i++) {
                for (let j = 0; j < tetromino.shape[i].length; j++) {
                    if (tetromino.shape[i][j]!== 0) {
                        if (gameBoard[tetromino.position.y + i][tetromino.position.x + j]!== 0) {
                            return true; // Обнаружено пересечение
                        }
                    }
                }
            }
            return false; // Нет пересечений
        }


        function endGame(tetromino) {
            // Остановка игрового цикла или других процессов, связанных с игрой
            clearInterval(gameLoop); // Пример остановки игрового цикла
        
            // Отображение сообщения об окончании игры
            displayGameOverMessage(); // Пример отображения сообщения о поражении
        }

        function createNextTetromino(tetromino) {
            const nextTetromino = randomTetromino;
        
            nextTetromino.position.x = Math.floor(gameBoard[0].length / 2 - nextTetromino.shape[0].length / 2);
            nextTetromino.position.y = 0;
        
            if (isCollision(nextTetromino)) {
                endGame(tetromino);
            } else {
                tetromino = nextTetromino;
            }
        }

        function placeTetrominoAtCurrentPosition(tetromino) {
            for (let i = 0; i < tetromino.shape.length; i++) {
                for (let j = 0; j < tetromino.shape[i].length; j++) {
                    if (tetromino.shape[i][j]!== 0) {
                        gameBoard[tetromino.position.y + i][tetromino.position.x + j] = tetromino.shape[i][j];
                    }
                }
            }
        }

        function eraseTetrominoFromCurrentPosition(tetromino) {
            for (let i = 0; i < tetromino.shape.length; i++) {
                for (let j = 0; j < tetromino.shape[i].length; j++) {
                    if (tetromino.shape[i][j]!== 0) {
                        gameBoard[tetromino.position.y + i][tetromino.position.x + j] = 0;
                    }
                }
            }
        }

        function canMoveTetrominoDown(tetromino, position) {
            const bottomRow = tetromino.position.y + tetromino.shape.length;
            if (bottomRow >= gameBoard.height) {
                return false; 
            }
            for (let i = 0; i < tetromino.shape.length; i++) {
                for (let j = 0; j < tetromino.shape[i].length; j++) {
                    if (tetromino.shape[i][j]!== 0) {
                        if (gameBoard.cells[tetromino.position.y + i + 1][tetromino.position.x + j]!== 0) {
                            return false; 
                        }
                    }
                }
            }
        
            return true;
        }
                
        function updateGameBoardWithTetromino(tetromino) {
            for (let i = 0; i < tetromino.shape.length; i++) {
                for (let j = 0; j < tetromino.shape[i].length; j++) {
                    if (tetromino.shape[i][j]!== 0) {
                        gameBoard[tetromino.position.y + i][tetromino.position.x + j] = tetromino.shape[i][j];
                    }
                }
            }
        }
        
        function removeCompletedLines(tetromino) {
            for (let i = gameBoard.length - 1; i >= 0; i--) {
                if (gameBoard[i].every(cell => cell!== 0)) {
                    gameBoard.splice(i, 1);
                    gameBoard.unshift(Array(gameBoard[0].length).fill(0));
                }
            }
        }
        
        function fixateTetrominoOnGameBoard() {
            updateGameBoardWithTetromino();
            removeCompletedLines();
            createNextTetromino();
        }
        


        function moveTetrominoDown(tetromino) {
            if (canMoveTetrominoDown()) {
                eraseTetrominoFromCurrentPosition();
                tetrominoPosition.y++;
                placeTetrominoAtCurrentPosition();
            } else {
                fixateTetrominoOnGameBoard();
            }
        }
        
        function updateTetrominoPosition() {
            moveTetrominoDown();
        }
        
        setInterval(updateTetrominoPosition, 5000);

        const embedDescription = createGameBoardWithTetromino(gameBoard, randomTetromino, initialPosition, interval);

        await interaction.reply({embeds: [{ description: embedDescription, color: 0x0099FF }] });
    },
};
