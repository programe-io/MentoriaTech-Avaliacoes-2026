// Function to show a message
function showMessage() {
  alert("Hello! You clicked the button.");
}

// Change background color
function changeBackground() {
  document.body.style.backgroundColor = "#dbeafe";
}

// Add text to page
function addText() {
  const paragraph = document.createElement("p");
  paragraph.textContent = "New text added with JavaScript!";
  document.body.appendChild(paragraph);
}

// Example button events
document.getElementById("btnMessage").addEventListener("click", showMessage);
document.getElementById("btnColor").addEventListener("click", changeBackground);
document.getElementById("btnAdd").addEventListener("click", addText);