// About MDN by Mozilla Contributors is licensed under CC-BY-SA 2.5.
// Code copied from MDN wiki page:
(function() {
    // --- start loading pseudo DOM ---
    if (typeof window === 'undefined' && typeof document === 'undefined') {
    	var jsdom = require('jsdom');
    	var docStr = 
    "\
    <!DOCTYPE html>\
    <html>\
    <head>\
      <title>getElementById example</title>\
      <script>\
      function changeColor(newColor) {\
        var elem = document.getElementById(\"para1\");\
        elem.style.color = newColor;\
      }\
      </script>\
    </head>\
    <body>\
      <h1>Form  example</h1>\
      <form name=\"formA\" id=\"formA\" action=\"/cgi-bin/test\" method=\"POST\">\
        <p>Click \"Info\" to see information about the form.\
        Click set to change settings, then info again\
        to see their effect</p>\
        <p>\
        <input type=\"button\" value=\"info\" onclick=\"getFormInfo();\"/>\
        <input type=\"button\" value=\"set\" onclick=\"setFormInfo(this.form);\"/>\
        <input type=\"reset\" value=\"reset\"/>\
        <br/>\
        <textarea id=\"tex\" style=\"height:15em; width:20em\">\
        </textarea>\
        </p>\
      </form>\
      <iframe src=\"https://www.eecs.berkeley.edu/\"><html><body><div id='innerDiv1'></div></body></html></iframe>\
      <p id=\"para1\">Some text here</p>\
      <button onclick=\"changeColor('blue');\">blue</button>\
      <button onclick=\"changeColor('red');\">red</button>\
    </body>\
    </html>\
    ";
    	//Create the document
    	document = jsdom.jsdom(docStr);
    	window = document.defaultView;
    	DOMParser = require('xmldom').DOMParser;
    	alert = function(msg) {}
    	document.adoptNode = function(node) {return node;};
    	document.createCDATASection = function(str) {return {};};
    	document.createNodeIterator = function(a, b, c) {return {};};
    	document.enableStyleSheetsForSet = function (name) {};
    	document.createRange = function() {};
    	document.hasFocus = function() {};
    	document.getSelection = function () {};
    	document.queryCommandSupported = function (str) {return true;};
    	document.releaseCapture = function () {};
    
    	Node = window.Node;
    	Node.prototype.isDefaultNamespace = function (namespace) {};
    	Node.prototype.lookupNamespaceURI = function (prefix) {};
    	Node.prototype.lookupPrefix = function (namespaceURI) {};
    	HTMLFormElement = window.HTMLFormElement;
    	HTMLFormElement.prototype.reportValidity = function () {};
    }
    // --- end loading pseudo DOM ---
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
    // there should be no argument
    document.getElementById("formA").reset(true);
})();