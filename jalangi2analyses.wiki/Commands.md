Usage
--------------

### Run DLint in Browser
Under ```jalangi2analyses/``` directory:
```
node src/js/command/run.js dlint
```
As an alternative, under ```jalangi2/tmp``` directory:
```
../../jalangi2analyses/scripts/dlint.sh
```
This command sets a web proxy, open a web page with your browser (e.g., Chrome or Safari).
Click the ```Jalangi``` button on your web page to view the analysis result.  
To close the web proxy, simply rerun the above command ([See Step-by-Step Guide](./Run-Analyses-in-Browser)).

### Run DLint on a Single File
Suppose you want to run DLint on file: ```tests/dlint/buggy_NoEffectOperation.js```.  
Under ```jalangi2analyses``` directory:
```
./scripts/dlint_unit.sh tests/dlint/buggy_NoEffectOperation
```

### Run Unit Tests for DLint
Under ```jalangi2analyses``` directory:
```
node tests/dlint/runAllTests.js 
```

### Run JITProf in Browser
Under ```jalangi2analyses/``` directory:
```
node src/js/command/run.js jitprof
```
As an alternative, under ```jalangi2/tmp``` directory:
```
../../dynamicAnalyses/scripts/jitprof.sh
```
This command sets a web proxy, open a web page with your browser (e.g., Chrome or Safari).
Click the ```Jalangi``` button on your web page to view the analysis result.  
To close the web proxy, simply rerun the above command ([See Step-by-Step Guide](./Run-Analyses-in-Browser)).

### Run JITProf on a Single File
Suppose you want to run JITProf on file: ```tests/jitprof/JITAwareTest.js```.  
Under ```jalangi2analyses``` directory:
```
./scripts/jitprof_unit.sh tests/jitprof/JITAwareTest
```