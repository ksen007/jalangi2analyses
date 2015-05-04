/*
 * Copyright (c) 2015, University of California, Berkeley
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// Author: Liang Gong (gongliang13@cs.berkeley.edu)
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
    var targetEl = document.getElementById("para1");
    // there should be only one argument
    console.log(targetEl.lookupPrefix("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", true));
})();