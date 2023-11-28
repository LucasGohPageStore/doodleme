export function isValidURL(str: string): boolean {
	try {
		new URL(str);
		return true;
	} catch (e) {
		return false;
	}
}

const titles: string[] = [
	"Bird in a tree",
	"Yellow car",
	"Sun with a smile",
	"Cat and yarn",
	"Happy dog",
	"Red apple",
	"Fish in a bowl",
	"Butterfly on flower",
	"Bear with honey",
	"Penguin on ice",
	"Squirrel with nut",
	"Train on tracks",
	"Rainbow and mountain",
	"Kite in the sky",
	"Flying balloons",
	"Elephant with water",
	"Frog on leaf",
	"House in a tree",
	"Boat on water",
	"Rocket in space",
];

const styles: string[] = [
	"No style",
	"Photographic",
	"Fantasy Art",
	"Origami",
	"Isometric",
	"Digital Art",
	"Comic Book",
	"Anime",
	"Cinematic",
	"Analog Film",
	"Neon Punk",
	"Pixel Art",
	"Low Poly",
	"3D Model",
	"Line Art",
];

// Function to pick a random title from the list
export function getRandomTitle(): string {
	const randomIndex = Math.floor(Math.random() * titles.length);
	return titles[randomIndex];
}

// Function to pick a random style from the list
export function getRandomStyle(): string {
	const randomIndex = Math.floor(Math.random() * styles.length);
	return styles[randomIndex];
}
