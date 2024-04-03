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
        
        let currentPosition = initialPosition;

        function checkCollision(gameBoard, tetromino, position) {
            for (let y = 0; y < tetromino.length; y++) {
                for (let x = 0; x < tetromino[y].length; x++) {
                    if (tetromino[y][x] && (gameBoard[position[1] + y] && gameBoard[position[1] + y][position[0] + x]) !== 0) {
                        // Если позиция тетромино пересекается с занятыми ячейками на игровом поле, есть коллизия.
                        return true;
                    }
                }
            }
            return false;
        }
        

        function updateTetrominoPosition() {
            currentPosition[0]++; // Увеличиваем позицию по вертикали
        
            // Проверяем не достигло ли тетромино нижней границы
            if (!checkCollision(gameBoard, randomTetromino, currentPosition)) {
                // Если нет коллизии, обновляем описание встроенного сообщения и отправляем его
                const embedDescription = createGameBoardWithTetromino(gameBoard, randomTetromino, currentPosition);
                interaction.editReply({ embeds: [{ description: embedDescription, color: 0x0099FF }] });
            } else {
                // В противном случае останавливаем функцию, так как тетромино достигло нижней границы
                clearInterval(interval); 
            }
        }
        
        // Устанавливаем интервал для обновления позиции каждые, например, 1 секунду
        const interval = setInterval(updateTetrominoPosition, 1000);


        const embedDescription = createGameBoardWithTetromino(gameBoard, randomTetromino, initialPosition, interval);

        await interaction.reply({embeds: [{ description: embedDescription, color: 0x0099FF }] });
    },
};
