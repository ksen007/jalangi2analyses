
Copy and Paste the following command in your console to install [Jalangi2](https://github.com/Samsung/jalangi2) and dynamic analyses
```
mkdir dymAnalysis
cd dymAnalysis
git clone https://github.com/Samsung/jalangi2.git
cd jalangi2
npm install
cd ..
git clone https://github.com/JacksonGL/dynamicAnalyses.git
cd jalangi2
rm -rf tmp
mkdir tmp
cd ..
```

### Run DLint in Browser
Under ```jalangi2/tmp``` directory:
```
../../dynamicAnalyses/scripts/dlint.sh
```
This command sets a web proxy, open a web page with your browser (e.g., Chrome or Safari).
Click the ```Jalangi``` button on your web page to view the analysis result.  
To close the web proxy, simply rerun the above command.

### Unit Test for DLint
Under ```dynamicAnalyses``` directory:
```
node tests/dlint/runAllTests.js 
```

### Run JITProf in Browser
Under ```jalangi2/tmp``` directory:
```
../../dynamicAnalyses/scripts/jitprof.sh
```
This command sets a web proxy, open a web page with your browser (e.g., Chrome or Safari).
Click the ```Jalangi``` button on your web page to view the analysis result.  
To close the web proxy, simply rerun the above command.

### Run JITProf on a Single File
Under ```dynamicAnalyses``` directory:
```
node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/jitprof/utils/Utils.js --analysis src/js/analyses/jitprof/utils/RuntimeDB.js --analysis src/js/analyses/jitprof/TrackHiddenClass.js  --analysis src/js/analyses/jitprof/AccessUndefArrayElem.js --analysis src/js/analyses/jitprof/SwitchArrayType.js tests/jitprof/JITAwareTest
```
