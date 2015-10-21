#!/bin/bash

# read the raw parameter
param=`cat ./config/dlint/analyses`
replaceStr=' '
param="${param//\\n/$replaceStr}"
# echo $param

if [ ! -d "node_modules/jalangi2/tmp" ]; then
  mkdir "node_modules/jalangi2/tmp"
fi

echo "running unit test: "$1
echo "command:"
echo 'node node_modules/jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource '$param' '$1
# script for running jalangi2 analyses on a single JS file
node node_modules/jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource $param $1