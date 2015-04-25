
### Run DLint in Browser
```
./scripts/dlint.sh
```

### Unit Test for DLint

```
node tests/dlint/runAllTests.js 
```

Assume that Jalangi 2 is installed at ../jalangi2

    cd ../jalangi2
    rm -rf tmp
    mkdir tmp
    cd tmp
    ../scripts/mitmproxywrapper.py -t -q --anticache -s "../scripts/proxy.py ../src/js/sample_analyses/ChainedAnalysesNoCheck.js ../../jalangi2analyses/src/js/analyses/jitprof/utils/Utils.js ../../jalangi2analyses/src/js/analyses/jitprof/utils/RuntimeDB.js ../../jalangi2analyses/src/js/analyses/jitprof/TrackHiddenClass.js  ../../jalangi2analyses/src/js/analyses/jitprof/AccessUndefArrayElem.js ../../jalangi2analyses/src/js/analyses/jitprof/SwitchArrayType.js"

Command line

    node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/jitprof/utils/Utils.js --analysis src/js/analyses/jitprof/utils/RuntimeDB.js --analysis src/js/analyses/jitprof/TrackHiddenClass.js  --analysis src/js/analyses/jitprof/AccessUndefArrayElem.js --analysis src/js/analyses/jitprof/SwitchArrayType.js tests/jitprof/JITAwareTest

