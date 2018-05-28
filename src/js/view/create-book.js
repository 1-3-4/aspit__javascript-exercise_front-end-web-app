publicLibrary.view.createBook = {
    // Retrieve all objects (books) from persistent data storage.
    setupUserInterface: function () {
        // var saveButton = document.forms['Book'].commit; // Changed to:
        let saveButton = document.getElementsByName('commit');
        // load all book objects
        Book.loadAll();
        // Set an event handler for the save/submit button
        // Set an event handler for the commit button (the first btn in stored array w. name 'commit'):
        saveButton[0].addEventListener("click", publicLibrary.view.createBook.handleSaveButtonClickEvent );
        window.addEventListener("beforeunload", function () {
            Book.saveAll();
        });
    },
    // Read data input from form fields and saves data to local storage.
    handleSaveButtonClickEvent: function () {
        var formElem = document.forms['book'];
        var slots = { isbn: formElem.isbn.value,
            title: formElem.title.value,
            year: formElem.year.value};
        Book.add( slots );
        formElem.reset();
    }
};
