const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('tetris').setDescription('Play a game of Tetris'),
    async execute(interaction) {
        // Описание эмодзи для тетрамино
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

        // Выбор и начальные координаты тетрамино
        const selectedTetromino = [
            [eSE, eSE, eSE, eSE],
            [aBe, aBe, aBe, aBe],
            [eSE, eSE, eSE, eSE],
            [eSE, eSE, eSE, eSE]
        ];


        const initialPosition = [0, 3]; // Начальные координаты тетрамино на игровом поле

        // Функция для создания строки с игровым полем и тетрамино
        function createGameBoardWithTetromino(gameBoard, tetromino, position) {
            let result = '';
            for (let i = 0; i < gameBoard.length; i++) {
                for (let j = 0; j < gameBoard[i].length; j++) {
                    // Проверяем, содержит ли текущая ячейка тетрамино
                    if (i >= position[0] && i < position[0] + tetromino.length &&
                        j >= position[1] && j < position[1] + tetromino[0].length) {
                        result += tetromino[i - position[0]][j - position[1]]; // Используем символ для тетрамино
                    } else {
                        result += gameBoard[i][j]; // Используем символ для игрового поля
                    }
                }
                result += '\n'; // Переход на новую строку
            }
            return result;
        }

        function moveTetrominoDown(gameBoard, tetromino, position) {
            if (canMoveDown(gameBoard, tetromino, position)) {
                eraseTetromino(gameBoard, tetromino, position);
                position[0]++;
                placeTetromino(gameBoard, tetromino, position);
                return true; // Тетромино успешно опущено
            } else {
                return false; // Тетромино не может быть опущено

            }
        }   

        function canMoveDown(gameBoard, tetromino, position) {
            if (moveTetrominoDown(gameBoard, tetromino, position)) {
                const embedDescription = createGameBoardWithTetromino(gameBoard, randomTetromino, initialPosition);
            }
        }
        const embedDescription = createGameBoardWithTetromino(gameBoard, randomTetromino, initialPosition);

        await interaction.reply({embeds: [{ description: embedDescription, color: 0x0099FF }] });
    },
};