<!DOCTYPE html>
<html>
<body>

<h1 id="title">Hello</h1>

<button onclick="changeText()">Click me</button>

<script>
function changeText() {
    document.getElementById("title").innerHTML = "Hello, JavaScript!";
}
</script>

</body>
</html>