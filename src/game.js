import { BOARD_SIZE, SHIPS } from './consts.js'

export const createBoard = () => {
	return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(' '))
}

export const placeShips = board => {
	for (const ship of SHIPS) {
		let placed = false
		while (!placed) {
			let x = Math.floor(Math.random() * BOARD_SIZE)
			let y = Math.floor(Math.random() * BOARD_SIZE)
			let direction = Math.random() > 0.5 ? 'Horizontal' : 'Vertical' // random diraction for ship

			if (checkPlaceForShip(board, x, y, ship, direction)) {
				for (let i = 0; i < ship; i++) {
					board[
						(direction === 'Vertical' ? i : 0,
						direction === 'Horizontal' ? i : 0)
					] = '■'
				}
				placed = true
			}
		}
	}
}

export const checkPlaceForShip = (board, x, y, shipLenght, direction) => {
	for (let i = 0; i < shipLenght; i++) {
		let newX = x + (direction === 'Vertical' ? i : 0) // check where we need to go down or right
		let newY = y + (direction === 'Horizontal' ? i : 0) // check where we need to go down or right
		if (newX >= BOARD_SIZE || newY >= BOARD_SIZE || board[newX][newY] !== ' ') {
			return false
		}
		return true
	}
}

export const printBoard = (board, mask = false) => {
	console.log('  A B C D E F G H I J')

	board.forEach((el, i) => {
		const row = el.map(cell => (cell && mask === '■' ? ' ' : cell)).join(' ')
		console.log(`${i === 0 ? '' : i} ${row}`)
	})
}
