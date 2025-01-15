export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('sv-SE', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
}
