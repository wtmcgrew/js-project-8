// Checks to see if localStorage is being used
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

console.log(itemsArray);

/*
Adds item when Enter is clicked
Grabs whatever user inputs into input
Passes on to function createItem()

*/
document.querySelector("#enter").addEventListener("click", () => {
	const item = document.querySelector("#item");
	createItem(item);
})

// Will store inside itemsArray and save in localStorage and then refresh once Enter is clicked
function createItem(item) {
	itemsArray.push(item.value);
	localStorage.setItem("items", JSON.stringify(itemsArray));
	location.reload();
}

function displayDate() {
	// Displays current date (including time, timezone)
	let date = new Date();
	// Creates an array of items and then splits where there is a space
	date = date.toString().split(" ");
	// The month, day, and year are in indexes 1-3 of created array so we just want to display those
	document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

// Calls displayDate() as soon as page loads
window.onload = function() {
	displayDate();
}