// If items key exists in localStorage, parse and store in itemsArray variable
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

// Loops through the itemsArray to display items on screen
function displayItems() {
	let items = "";
	for(let counter = 0; counter < itemsArray.length; counter++) {
		items += `	<div class="item">
		<div class="input-controller">
		<textarea disabled>${itemsArray[counter]}</textarea>
		<div class="edit-controller">
		<i class="fa-solid fa-check delete-btn"></i>
		<i class="fa-solid fa-pen-to-square edit-btn"></i>
		</div>
		</div>
		<div class="update-controller">
		<button class="save-btn">Save</button>
		<button class="cancel-btn">Cancel</button>
		</div>
		</div>`
	}
	document.querySelector(".to-do-list").innerHTML = items;
	// Want to activate these listeners as soon as the item/button is populated on HTML
	activateDeleteListeners();
	activateEditListeners();
	activateSaveListeners();
	activateCancelListeners();
}


function activateDeleteListeners() {
	let deleteBtn = document.querySelectorAll(".delete-btn");
	deleteBtn.forEach((del, counter) => {
		del.addEventListener("click", () => {deleteItem(counter)});
	})
}

function activateEditListeners() {
	const editBtn = document.querySelectorAll(".edit-btn");
	const editUpdateController = document.querySelectorAll(".update-controller");
	const editInputs = document.querySelectorAll(".input-controller textarea");
	editBtn.forEach((edit, counter) => {
		edit.addEventListener("click", () => {
			editUpdateController[counter].style.display = "block";
			editInputs[counter].disabled = false;
		})
	})
}

function updateItem(text, counter) {
	itemsArray[counter] = text;
	localStorage.setItem("items", JSON.stringify(itemsArray));
	location.reload();
}

function activateSaveListeners() {
	const saveBtn = document.querySelectorAll(".save-btn");
	const saveInputs = document.querySelectorAll(".input-controller textarea");
	saveBtn.forEach((save, counter) => {
		save.addEventListener("click", () => {
			updateItem(saveInputs[counter].value, counter)
		})
	})
}

function activateCancelListeners() {
	const cancelBtn = document.querySelectorAll(".cancel-btn");
	const cancelUpdateController = document.querySelectorAll(".update-controller");
	const cancelInputs = document.querySelectorAll(".input-controller textarea");
	cancelBtn.forEach((cancel, counter) => {
		cancel.addEventListener("click", () => {
			cancelUpdateController[counter].style.display = "none";
			cancelInputs[counter].disabled = true;
		})
	})
}


// Removes item from UI and localStorage; then it will reset the items array and convert to string
function deleteItem(counter) {
	itemsArray.splice(counter, 1);
	localStorage.removeItem("items");
	localStorage.setItem("items", JSON.stringify(itemsArray));
	window.location.reload(true);
}

// Will store inside itemsArray and save in localStorage and then refresh once Enter is clicked
function createItem(item) {
	itemsArray.push(item.value);
	localStorage.setItem("items", JSON.stringify(itemsArray));
	window.location.reload(true);
}

function displayDate() {
	// Displays current date (including time, timezone)
	let date = new Date();
	// Creates an array of items and then splits where there is a space
	date = date.toString().split(" ");
	// The month, day, and year are in indexes 1-3 of created array so we just want to display those
	document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

// Calls these functions as soon as page loads
window.onload = function() {
	displayDate();
	displayItems();
}