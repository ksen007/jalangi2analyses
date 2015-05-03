#!/bin/bash

for f in tests/dlint/buggy_*.js
do
	echo $f
	node --use_strict $f
done