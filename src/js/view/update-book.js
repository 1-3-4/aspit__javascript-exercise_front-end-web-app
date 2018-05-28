publicLibrary.view.updateBook = {
    // Set up a selection field by retrieving a list of all book objects from the persistent data storage, and populating the select-tag's option list.
  setupUserInterface: function () {
    var formElem = document.forms['Book'],
        saveButton = formElem.commit,
        selectBookElem = formElem.selectBook;
    var i=0, key="", keys=[], book=null, optionElem=null;
    // load all book objects
    Book.loadAll();
    // populate the selection list with books
    keys = Object.keys( Book.instances );
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      book = Book.instances[key];
      optionElem = document.createElement("option");
      optionElem.text = book.title;
      optionElem.value = book.isbn;
      selectBookElem.add( optionElem, null);
    }
    // when a book is selected, populate the form with the book data
    selectBookElem.addEventListener("change", function () {
        var book=null, key = selectBookElem.value;
        if (key) {
          book = Book.instances[key];
          formElem.isbn.value = book.isbn;
          formElem.title.value = book.title;
          formElem.year.value = book.year;
        } else {
          formElem.isbn.value = "";
          formElem.title.value = "";
          formElem.year.value = "";
        }
    });
    saveButton.addEventListener("click",
        publicLibrary.view.updateBook.handleUpdateButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Book.saveAll();
    });
  },
  // save updated data
  handleUpdateButtonClickEvent: function () {
    var formElem = document.forms['Book'];
    var slots = { isbn: formElem.isbn.value,
        title: formElem.title.value,
        year: formElem.year.value
    };
    Book.update( slots);
    formElem.reset();
  }
};
