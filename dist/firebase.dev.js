"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocuments = getDocuments;
exports.storage = exports.app = void 0;

var _app = require("firebase/app");

var _firestore = require("firebase/firestore");

var _storage = require("firebase/storage");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firebaseConfig = {
  apiKey: 'AIzaSyDZniacPrvRnLsC2EskwbL5uquXD7xMto4',
  authDomain: 'todo-app-f2649.firebaseapp.com',
  databaseURL: 'https://todo-app-f2649-default-rtdb.firebaseio.com',
  projectId: 'todo-app-f2649',
  storageBucket: 'todo-app-f2649.appspot.com',
  messagingSenderId: '969130949775',
  appId: '1:969130949775:web:e4e7bdcf146fc8b59884fa'
};
var app = (0, _app.initializeApp)(firebaseConfig);
exports.app = app;
var storage = (0, _storage.getStorage)(app);
exports.storage = storage;
var db = (0, _firestore.getFirestore)();
var collectionRef = (0, _firestore.collection)(db, 'tasks');

function getDocuments() {
  return (0, _firestore.getDocs)(collectionRef).then(function (snapshot) {
    var tasks = [];
    snapshot.docs.forEach(function (doc) {
      tasks.push(_objectSpread({}, doc.data(), {
        id: doc.id
      }));
    });
    return tasks;
  })["catch"](function (err) {
    return console.log(err);
  });
}