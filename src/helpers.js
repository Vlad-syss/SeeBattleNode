export const parseUserInput = input => {
	const letters = 'ABCDEFGHIJ'

	if (input.length !== 2) return null
	let y = letters.indexOf(input[0].toUpperCase())
	let x = parseInt(input[1])

	return x >= 1 && x < 10 && y != -1 ? { x, y } : null
}

export const checkWin = board => {
	return board.flat().every(cell => cell !== '■')
}
