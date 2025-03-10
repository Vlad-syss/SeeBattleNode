import chalk from 'chalk'
import inquirer from 'inquirer'
//--
import { createBoard, placeShips, printBoard } from './src/game.js'
import { checkWin, parseUserInput } from './src/helpers.js'

let board = createBoard()
let mask = createBoard() // the field to show to user without ships
placeShips(board)

async function playGame() {
	console.log(chalk.cyan('🎯 Ласкаво просимо в Морський бій!'))
	printBoard(mask, true)
	// printBoard(board, false)

	while (!checkWin(board)) {
		let { shot } = await inquirer.prompt([
			{
				type: 'input',
				name: 'shot',
				message: 'Введіть координати (наприклад, A5):',
			},
		])

		let coords = parseUserInput(shot)
		if (!coords) {
			console.log(chalk.red('❌ Невірний формат! Використовуйте A-J + 0-9.'))
			continue
		}

		let { x, y } = coords
		if (mask[x][y] !== ' ') {
			console.log(chalk.yellow('⚠️ Ви вже стріляли сюди!'))
			continue
		}

		if (board[x][y] === '■') {
			console.log(chalk.green('🎯 Влучили!'))
			mask[x][y] = 'X'
			board[x] = board[x].slice(0, y) + 'X' + board[x].slice(y + 1)
		} else {
			console.log(chalk.blue('🌊 Мимо!'))
			mask[x][y] = 'O'
			board[x] = board[x].slice(0, y) + 'O' + board[x].slice(y + 1)
		}

		printBoard(mask, true)
	}
	console.log(chalk.bgGreen.white('🎉 Вітаю! Ви потопили всі кораблі!'))
}

playGame()
