export const parseUserInput = input => {
	const letters = 'ABCDEFGHIJ'
	input = input.trim().toUpperCase()

	if (input.length < 2 || input.length > 3) return null

	let y = letters.indexOf(input[0])
	let x = parseInt(input.slice(1))

	return x >= 0 && x < 10 && y !== -1 ? { x, y } : null
}

export const checkWin = board => {
	return board.flat().every(cell => cell !== '■')
}
