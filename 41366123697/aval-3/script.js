onclick class="btn btn-primary" id="myButton">Click Me</button>{
    alert('Button clicked!');
}

prompt('Hello! Please enter your name:');{
    if (name) {
        alert('Hello, ' + name + '!');
    }else {
        alert('Hello, stranger!');
    }
}

console.log('This is a message in the console.');{
    for (let i = 0; i < 5; i++) {
        console.log('Iteration: ' + i);
    }
}

if (confirm('Do you want to proceed?')) {
    alert('You chose to proceed.');
}if else {
    alert('You chose not to proceed.');
}else {
    alert('You canceled the action.');
}
