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

// Author: Liang Gong (gongliang@cs.berkeley.edu)
//         Michael Pradel (michael@binaervarianz.de)
//         Koushik Sen (ksen@cs.berkeley.edu)
// Ported to Jalangi2 by Liang Gong

(function(sandbox) {
    function PostAnalysis() {
        var Constants = sandbox.Constants;
        var HOP = Constants.HOP;

        function showWarningOnWebPage(allWarnings) {
            for (var i = 0; i < allWarnings.length; i++) {
                sandbox.log(formatWarning(allWarnings[i]));
            }
        }

        function formatWarning(warning) {
            var source = '';
            // create the a <ul> list
            for (var prop in warning) {
                if (!warning.hasOwnProperty(prop)) continue;
                if (prop === 'iid') continue;
                if (prop === 'count') continue;
                if (prop === 'details') continue;
                if (prop === 'locationString') continue;
                var content = warning[prop];
                if (typeof content === 'object') {
                    content = JSON.stringify(content);
                } else if (typeof content === 'function') {
                    content = content.toString();
                }
                source += createLi(content, prop, prop + 'Class');
            }
            source = createUl(source, 'properties', 'propertiesClass');
            var detailDiv = createDiv(warning.details, 'details', 'detailsClass');
            source = createDiv(detailDiv + source, 'warning', 'warningClass');
            return source;
        }

        // class is a reserved word
        function createDiv(content, name, klass) {
            return '<div name="' + name + '" class="' + klass + '">' + content + '</div>';
        }

        function createLi(content, name, klass) {
            return '<li name="' + name + '" class="' + klass + '">' + createDiv(name, 'listName', 'listNameClass') + createDiv(content, 'listContent', 'listContentClass') + '</li>';
        }

        function createUl(content, name, klass) {
            return '<ul name="' + name + '" class="' + klass + '">' + content + '</ul>';
        }

        this.endExecution = function() {
            var allWarnings = summarizeWarnings();

            // 1) write warnings to file
            if (sandbox.Constants.isBrowser) {
                // sandbox.Results.execute()
                showWarningOnWebPage(allWarnings);
            } else {
                var fs = require("fs");
                var outFile = process.cwd() + "/analysisResults.json";
                console.log("Writing analysis results to " + outFile);
                fs.writeFileSync(outFile, JSON.stringify(allWarnings, 0, 2));
            }

            // 2) print warnings to console
            allWarnings.forEach(function(w) {
                console.log("DLint warning: " + w.details);
            });
        };

        function summarizeWarnings() {
            if(!(sandbox.DLint) || !(sandbox.DLint.allWarnings)) return [];
            var warnings = sandbox.DLint.allWarnings;
            warnings.sort(function(a, b) {
                return b.count - a.count;
            });
            return warnings;
        }
    }

    sandbox.analysis = new PostAnalysis();

}(J$));