
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransation;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


if (!window.indexedDB) {
    alert('Browser is not supported Indexed DB');
}

var db;

var request = window.indexedDB.open('UserRegistration', 1)

request.onerror = function (event) {
    console.log('error', event.target, re);
}

request.onsuccess = function (event) {
    db = request.result;
    console.log('success' + db);
}

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore('UserRegistrationdb');
}