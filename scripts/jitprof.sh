#!/bin/bash
# run dlint in browser
# read the raw parameter
param=`cat ../../../config/jitprof/analyses`
replaceStr=' '
param="${param//\\n/$replaceStr}"

# --analysis src/js/analyses/jitprof/utils/RuntimeDB.js
# ->
# ../../../src/js/analyses/jitprof/utils/RuntimeDB.js
oldStr='--analysis src'
replaceStr='../../../src'
param="${param//$oldStr/$replaceStr}"

# --analysis node_modules/jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js
# ->
# ../src/js/sample_analyses/ChainedAnalysesNoCheck.js
oldStr='--analysis node_modules/jalangi2/src'
replaceStr='../src'
param="${param//$oldStr/$replaceStr}"


echo "running jitprof in browser..."
# print the command
echo "command:"
echo '../scripts/mitmproxywrapper.py -t -q --anticache -s "../scripts/proxy.py '$param'"'
echo ''
echo ''
# execute the command
../scripts/mitmproxywrapper.py -t -q --anticache -s "../scripts/proxy.py $param"