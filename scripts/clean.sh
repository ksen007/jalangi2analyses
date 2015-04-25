#!/bin/bash

# find . -regex '.*.jar' | xargs rm
find . -regex '.*.class' | xargs rm
find . -regex '.*._jalangi_.json' | xargs rm
find . -regex '.*._jalangi_.js' | xargs rm
find . -regex '.*.js_jalangi_sourcemap.json' | xargs rm
find . -regex '.*.js_jalangi_sourcemap.js' | xargs rm
rm *.json
rm *.tex