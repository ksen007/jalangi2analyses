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
    }
    // --- end loading pseudo DOM ---
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
    // create an empty element node
    // without an ID, any attributes, or any content
    var sp1 = document.createElement("span");
    
    // give it an id attribute called 'newSpan'
    sp1.setAttribute("id", "newSpan");
    
    // create some content for the new element.
    var sp1_content = document.createTextNode("new replacement span element.");
    
    // apply that content to the new element
    sp1.appendChild(sp1_content);
    
    // build a reference to the existing node to be replaced
    var sp2 = document.getElementById("para1");
    var parentDiv = sp2.parentNode;
    
    // replace existing node sp2 with the new span element sp1
    // there should be only two arguments
    parentDiv.replaceChild(sp1, sp2, true);
})();