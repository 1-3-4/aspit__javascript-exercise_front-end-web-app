var ajaxRequest = new XMLHttpRequest();
var url = 'list-books.html';
var data = ajaxRequest.responseText;
var container = document.getElementById('ajax-container');
    // console.log(container);
ajaxRequest.open('GET', url);
ajaxRequest.onload = function () {
    // console.log(ajaxRequest.responseText);
    // container.innerHTML = ajaxRequest.responseText;
}
ajaxRequest.send();

// --- Det ovenover virker ---
// --- Det nedenunder forsøger at inkoperere det i model view controller... ---

// * Få url fra den knap der bliver klikket.

//     const ajaxData;

// CONSTRUCTOR
// function Ajax ( url ) {
//     const ajaxRequest = new XMLHttpRequest();
//     ajaxRequest.open( 'GET', url);
//     ajaxRequest.onload = function () {
//         ajaxData = ajaxRequest.responseText;
//     }
//     ajaxRequest.send();
// }
