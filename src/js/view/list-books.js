publicLibrary.view.listBooks = {
    setupUserInterface: function () {
        // Select and store the table body, in a variable:
        var tableBodyElem = document.querySelector("table#books>tbody");
        console.log(tableBodyElem);
        // var i = 0; // Udkommenteret, fordi den ikke er nødvendig!
        var keys = [];
        var key = "";
        var row = {};
        // Load all book objects:
        Book.loadAll();
        keys = Object.keys( Book.instances );
        // For each book, create a table row with a cell for each attribute:
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            row = tableBodyElem.insertRow();
            row.insertCell(-1).textContent = Book.instances[key].isbn; // The argument -1 makes sure that the new elements are appended to the list of rows and cells.
            row.insertCell(-1).textContent = Book.instances[key].title;
            row.insertCell(-1).textContent = Book.instances[key].year;
        }
    }
}
