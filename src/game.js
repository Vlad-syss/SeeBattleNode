import { BOARD_SIZE, SHIPS } from './consts.js'

export const createBoard = () => {
	return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(' '))
}

export const placeShips = board => {
	for (const shipLength of SHIPS) {
		let placed = false

		while (!placed) {
			let x = Math.floor(Math.random() * BOARD_SIZE)
			let y = Math.floor(Math.random() * BOARD_SIZE)
			let direction = Math.random() > 0.5 ? 'Horizontal' : 'Vertical'

			if (checkPlaceForShip(board, x, y, shipLength, direction)) {
				for (let i = 0; i < shipLength; i++) {
					let newX = x + (direction === 'Vertical' ? i : 0)
					let newY = y + (direction === 'Horizontal' ? i : 0)
					board[newX][newY] = '■'
				}

				markSurroundingArea(board, x, y, shipLength, direction)
				placed = true
			}
		}
	}

	// console.log('\n=== Дошка з розміщеними кораблями ===')
	// printBoard(board, false) cheats
}

export const checkPlaceForShip = (board, x, y, shipLength, direction) => {
	for (let i = 0; i < shipLength; i++) {
		let newX = x + (direction === 'Vertical' ? i : 0)
		let newY = y + (direction === 'Horizontal' ? i : 0)

		if (
			newX >= BOARD_SIZE ||
			newY >= BOARD_SIZE ||
			board[newX][newY] !== ' ' ||
			!isAreaFree(board, newX, newY)
		) {
			return false
		}
	}
	return true
}

export const isAreaFree = (board, x, y) => {
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			let newX = x + dx
			let newY = y + dy

			if (
				newX >= 0 &&
				newX < BOARD_SIZE &&
				newY >= 0 &&
				newY < BOARD_SIZE &&
				board[newX][newY] === '■'
			) {
				return false
			}
		}
	}
	return true
}

export const markSurroundingArea = (board, x, y, shipLength, direction) => {
	for (let i = -1; i <= shipLength; i++) {
		let newX = x + (direction === 'Vertical' ? i : 0)
		let newY = y + (direction === 'Horizontal' ? i : 0)

		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				let areaX = newX + dx
				let areaY = newY + dy

				if (
					areaX >= 0 &&
					areaX < BOARD_SIZE &&
					areaY >= 0 &&
					areaY < BOARD_SIZE &&
					board[areaX][areaY] === ' '
				) {
					board[areaX][areaY] = '.'
				}
			}
		}
	}
}

export const printBoard = (board, mask = false) => {
	console.log('  A B C D E F G H I J')
	board.forEach((row, i) => {
		let rowDisplay = row
			.map(cell => (mask && cell === '■' ? ' ' : cell))
			.join(' ')
		console.log(`${i} ${rowDisplay}`)
	})
}
