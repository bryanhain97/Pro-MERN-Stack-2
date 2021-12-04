"use strict";

var element = function element() {
  var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
  var helloContinents = continents.map(function (c) {
    return "Hello ".concat(c);
  });
  var message = helloContinents.join(' ');
  return /*#__PURE__*/React.createElement("div", {
    title: "Outer div"
  }, /*#__PURE__*/React.createElement("h1", null, message));
};

ReactDOM.render(element, document.querySelector('#root'));