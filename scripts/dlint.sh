#!/bin/bash
# run dlint in browser
# read the raw parameter
param=`cat ../../../config/dlint/analyses`
replaceStr=' '
param="${param//\\n/$replaceStr}"

# --analysis src/js/analyses/dlint/utils/document.js
# ->
# empty string
oldStr='--analysis src/js/analyses/dlint/utils/document.js'
replaceStr=''
param="${param//$oldStr/$replaceStr}"

# --analysis src/js/analyses/jitprof/utils/RuntimeDB.js
# ->
# ../../../src/js/analyses/jitprof/utils/RuntimeDB.js
oldStr='--analysis src'
replaceStr='../../../src'
param="${param//$oldStr/$replaceStr}"

# --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js
# ->
# ../src/js/sample_analyses/ChainedAnalysesNoCheck.js
oldStr='--analysis node_modules/jalangi2/src'
replaceStr='../src'
param="${param//$oldStr/$replaceStr}"


echo "running dlint in browser..."
# print the command
echo "command:"
echo '../scripts/mitmproxywrapper.py -t -q --anticache -s "../scripts/proxy.py '$param'"'
echo ''
echo ''
# execute the command
../scripts/mitmproxywrapper.py -t -q --anticache -s "../scripts/proxy.py $param"