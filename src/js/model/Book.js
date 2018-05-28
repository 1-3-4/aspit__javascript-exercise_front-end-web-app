function Book( slots ) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
}
// console.log("Connection to js file!");

// Define and initialize the class-level property Book.instances:
Book.instances = {};

Book.convertRow2Obj = function ( bookRow ) {
    const book = new Book( bookRow ); // Added 'const'.
    return book;
}

// Function to take books in Local Storage into main memory.
Book.loadAll = function () {
    // Divided variables unto multiple lines. Changed 'var' to 'let'.
    // let bookNum = 0; // Changed varbookNumable name from 'i' to bookNum to avoid conflicts. Outcommented, because it isn't needed.
    let keys = [];
    let bookTableString = "";
    let bookTable = {};
    try {
        if ( localStorage["bookTable"]) {
            // Store book table from Local Storage as a string:
            // - Only store the table which key is 'bookTable'.
            bookTableString = localStorage["bookTable"];
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if ( bookTableString ) {
        // Deserialization: Convert the book table string into a map:
        bookTable = JSON.parse( bookTableString );
        keys = Object.keys( bookTable );
        console.log( keys.length + " books loaded.");
        // Convert each row in the map into a Book object and store the object in 'Book.instances':
        for ( var bookNum = 0; bookNum < keys.length; bookNum++ ) {
            const key = keys[bookNum]; // Added 'const'.
            Book.instances[key] = Book.convertRow2Obj( bookTable[key] );
        }
    }
}

// Function to save all Book objects in 'Book.instances' (main memory) to Local Storage.
Book.saveAll = function () {
    let bookTableString = ""; // Divided variable declaration into multiple lines. Changed 'var' to 'let' or 'const'.
    let error = false;
    const numberOfBooks = Object.keys( Book.instances ).length;
    try {
        // Serialization: Convert the map 'Book.instances' into a string:
        bookTableString = JSON.stringify( Book.instances );
        // Write the string to Local Storage where the key is 'bookTable':
        localStorage[ "bookTable" ] = bookTableString;
    } catch (e) {
        alert( "Error when writing to local storage\n" + e );
        error = true;
    }
    // If no error has been encountered, write in the console, how many books has been added to Local Storage:
    if (!error) {
        console.log( numberOfBooks + " books saved.");
    }
}

// Function to create a new Book instance, and add it to 'Book.instances'.
Book.add = function ( slots ) {
    // Declare a variable, and nitialize it to store the new Book object:
    const book = new Book( slots ); // Changed 'var' to 'const'.
    // Add the new Book object to 'Book.instances' and make the ky in the map identical to the Book object's isbn value:
    Book.instances[ slots.isbn ] = book;
    console.log( "Book " + slots.isbn + " created!");
}

// Function to update values of an existing Book object.
Book.update = function ( slots ) {
    // Find the 'Book' with the corresponding 'isbn' in 'Book.instances' and store it in a variable:
    let book = Book.instances[ slots.isbn ]; // Changed 'var' to 'let'.
    // Convert the 'year' value to an integer and save as a variable:
    const year = parseInt( slots.year ); // Changed 'var' to 'const'.
    // Check if the provided title value is different from the stored value:
    if ( book.title !== slots.title ) {
        // Set stored value, to provided value:
        book.title = slots.title;
    }
    // Check if the provided year value is different from the stored value:
    if ( book.year !== year ) {
        // Set stored value, to provided value:
        book.year = year;
    }
    console.log( "Book " + slots.isbn + " updated!");
}

// Function to dele an excisting Book instance.
Book.destroy = function ( isbn ) {
    // Check 'Book.instances' for a key value matching the provided ISBN:
    if ( Book.instances[ isbn ] ) {
        console.log( "Book " + isbn + " deleted.");
        // Delete the row in the map, with a key value corresponding to the provided ISBN value:
        delete Book.instances[ isbn ];
    }
    else {
        console.log( "There is no book with ISBN " + isbn + " in the database!" );
    }
}

// Function to create test data.
Book.createTestData = function () {
  Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
  Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999});
  Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
  Book.saveAll();
};

// Function to clear all data from Local Storage.
Book.clearData = function () {
  if ( confirm( "Do you really want to delete all book data?" ) ) {
    localStorage[ "bookTable" ] = "{}";
  }
};
