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
// Ported to Jalangi2 by Liang Gong

// check for the correct use of HTML Node (built-in) functions in JavaScript

(function(sandbox) {
    function MyAnalysis() {
        var iidToLocation = sandbox.iidToLocation;
        var DLintWarning = sandbox.DLint.DLintWarning;
        var Utils = sandbox.Utils;

        var iidToCount = {}; // iid: number --> count: number
        var iidToInfo = {}; // iid: number --> info: object
        var additionalInfo = {
            hasInfo: false,
            addMsg: function(msg) {
                this.hasInfo = true;
                this[msg] = this[msg] | 0 + 1;
            }
        };

        function addDebugInfo(iid, msg) {
            if (!iidToInfo[iid]) {
                iidToInfo[iid] = {};
            }
            iidToInfo[iid][msg] = (iidToInfo[iid][msg] | 0) + 1;
        }

        // ---- function DB and check API starts ----
        var functionDB = {};

        function addEntry(name, targetFunction, checkerFunction) {
            functionDB[name] = {
                target: targetFunction,
                checker: checkerFunction
            };
        }

        function checkFunction(f, args) {
            for (var prop in functionDB) {
                if (!functionDB.hasOwnProperty(prop)) continue;
                var item = functionDB[prop];
                if (item.target === f) {
                    item.checker.apply({}, args);
                }
            }
        }

        // ---- function DB and check API ends ----

        var STRING = String;
        var REGEXP = RegExp;
        var ARRAY = Array;
        var NODE_PROTOTYPE = Node.prototype;
        var FORM_PROTOTYPE = HTMLFormElement.prototype;

        function argsToString(args) {
            var ret = '[';
            var i = 0;
            for (i = 0; i < args.length - 1; i++) {
                ret += (typeof args[i]) + ',';
            }
            if (i < args.length) {
                ret += (typeof args[i]);
            }
            ret += ']';
            return ret;
        }

        // The following functions are robust enough
        // in js engine and therefore runtime checks
        // seems unnecessary:

        // Node.appendChild
        // Syntax: var aChild = element.appendChild(aChild);
        addEntry('NODE_PROTOTYPE.appendChild', NODE_PROTOTYPE.appendChild,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 1) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.appendChild should take only one argument. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isNode(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.appendChild should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.cloneNode
        // Syntax: var dupNode = node.cloneNode(deep);
        addEntry('NODE_PROTOTYPE.cloneNode', NODE_PROTOTYPE.cloneNode,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 1) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.cloneNode should take only one argument. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isBoolean(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.cloneNode should be a boolean value. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.compareDocumentPosition
        // Syntax: node.compareDocumentPosition(otherNode) 
        addEntry('NODE_PROTOTYPE.compareDocumentPosition', NODE_PROTOTYPE.compareDocumentPosition,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 1) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.compareDocumentPosition should take only one argument. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isNode(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.compareDocumentPosition should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.contains
        // Syntax: node.contains(otherNode) 
        addEntry('NODE_PROTOTYPE.contains', NODE_PROTOTYPE.contains,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 1) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.contains should take only one argument. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isNode(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.contains should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.hasChildNodes
        // Syntax: node.hasChildNodes()
        addEntry('NODE_PROTOTYPE.hasChildNodes', NODE_PROTOTYPE.hasChildNodes,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 0) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.hasChildNodes should take no argument. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.insertBefore
        // var insertedElement = parentElement.insertBefore(newElement, referenceElement);
        addEntry('NODE_PROTOTYPE.insertBefore', NODE_PROTOTYPE.insertBefore,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 2) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.insertBefore should take only two arguments. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isNode(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.insertBefore should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 2 && !Utils.isNode(args[1])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the second argument of Node.prototype.insertBefore should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.isDefaultNamespace
        // Syntax: result = node.isDefaultNamespace(namespaceURI)
        addEntry('NODE_PROTOTYPE.isDefaultNamespace', NODE_PROTOTYPE.isDefaultNamespace,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 1) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.isDefaultNamespace should take only one argument. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isString(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.isDefaultNamespace should be a string. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.isEqualNode
        // Syntax: var isEqualNode = node.isEqualNode(arg);
        addEntry('NODE_PROTOTYPE.isEqualNode', NODE_PROTOTYPE.isEqualNode,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 1) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.isEqualNode should take only one argument. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isNode(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.isEqualNode should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.lookupNamespaceURI
        // Syntax: node.lookupNamespaceURI(URL_prefix)
        if(NODE_PROTOTYPE.lookupNamespaceURI) {
            addEntry('NODE_PROTOTYPE.lookupNamespaceURI', NODE_PROTOTYPE.lookupNamespaceURI,
                function(iid, f, base, args, result, isConstructor, isMethod) {
                    if (args.length !== 1) {
                        iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                        addDebugInfo(iid, 'function Node.prototype.lookupNamespaceURI should take only one argument. \n Runtime Args: ' + argsToString(args));
                    } else if (args.length >= 1 && !Utils.isString(args[0])) {
                        iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                        addDebugInfo(iid, 'the first argument of Node.prototype.lookupNamespaceURI should be a string. \n Runtime Args: ' + argsToString(args));
                    }
                }
            );
        }

        // Node.lookupPrefix
        // Syntax: Node.lookupPrefix(namespaceURI)
        if(NODE_PROTOTYPE.lookupPrefix) {
            addEntry('NODE_PROTOTYPE.lookupPrefix', NODE_PROTOTYPE.lookupPrefix,
                function(iid, f, base, args, result, isConstructor, isMethod) {
                    if (args.length !== 1) {
                        iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                        addDebugInfo(iid, 'function Node.prototype.lookupPrefix should take only one argument. \n Runtime Args: ' + argsToString(args));
                    } else if (args.length >= 1 && !Utils.isString(args[0])) {
                        iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                        addDebugInfo(iid, 'the first argument of Node.prototype.lookupPrefix should be a string. \n Runtime Args: ' + argsToString(args));
                    }
                }
            );
        }

        // Node.normalize
        // Syntax: element.normalize();
        addEntry('NODE_PROTOTYPE.normalize', NODE_PROTOTYPE.normalize,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 0) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.normalize should take no argument. \n Runtime Args: ' + argsToString(args));
                }
            }
        );


        // Node.removeChild
        // Syntax: var oldChild = element.removeChild(child);
        //         element.removeChild(child);
        addEntry('NODE_PROTOTYPE.removeChild', NODE_PROTOTYPE.removeChild,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 1) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.removeChild should take only one argument. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isNode(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.removeChild should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // Node.replaceChild
        // Syntax: replacedNode = parentNode.replaceChild(newChild, oldChild);
        addEntry('NODE_PROTOTYPE.replaceChild', NODE_PROTOTYPE.replaceChild,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 2) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function Node.prototype.replaceChild should take only two arguments. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 1 && !Utils.isNode(args[0])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the first argument of Node.prototype.replaceChild should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                } else if (args.length >= 2 && !Utils.isNode(args[1])) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'the second argument of Node.prototype.replaceChild should be a HTML Node. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // HTMLFormElement.reportValidity
        // Syntax: HTMLFormElement.reportValidity
        addEntry('FORM_PROTOTYPE.reportValidity', FORM_PROTOTYPE.reportValidity,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 0) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function HTMLFormElement.prototype.reportValidity should take no argument. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // HTMLFormElement.reset
        // Syntax: HTMLFormElement.reset()
        addEntry('FORM_PROTOTYPE.reset', FORM_PROTOTYPE.reset,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 0) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function HTMLFormElement.prototype.reset should take no argument. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        // HTMLFormElement.submit
        // Syntax: HTMLFormElement.submit()
        addEntry('FORM_PROTOTYPE.submit', FORM_PROTOTYPE.submit,
            function(iid, f, base, args, result, isConstructor, isMethod) {
                if (args.length !== 0) {
                    iidToCount[iid] = (iidToCount[iid] | 0) + 1;
                    addDebugInfo(iid, 'function HTMLFormElement.prototype.submit should take no argument. \n Runtime Args: ' + argsToString(args));
                }
            }
        );

        this.invokeFun = function(iid, f, base, args, result, isConstructor, isMethod) {
            arguments[0] = sandbox.getGlobalIID(iid);
            checkFunction(f, arguments);
        };

        this.endExecution = function() {
            iidToInfo = Utils.reorganizeDebugInfo(iidToInfo);
            var warnings = Object.keys(iidToCount).map(function(iid) {
                var location = iidToLocation(iid);
                var ret = new DLintWarning("HTMLNodeFunctionsMisuse", iid, location,
                    "Incorrect use of HTML Node built-in funcitons at " +
                    location + " " + iidToCount[iid] + " time(s).", iidToCount[iid]);
                ret.debugInfo = iidToInfo[iid];
                ret.addInfo = JSON.stringify(additionalInfo);
                return ret;
            });
            sandbox.DLint.addWarnings(warnings);
        };
    }
    sandbox.analysis = new MyAnalysis();
})(J$);