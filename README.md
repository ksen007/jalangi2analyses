# Dynamic Analyses 


[Wiki](https://github.com/JacksonGL/dynamicAnalyses/wiki/Wiki-Home) | [Configuring](https://github.com/JacksonGL/dynamicAnalyses/wiki/Configuration) | [Checkers](https://github.com/Berkeley-Correctness-Group/DLint/wiki/DLint-Checkers) | [Develop](https://github.com/JacksonGL/dynamicAnalyses/wiki/Developer-Guide) | [Mailing List](https://groups.google.com/forum/#!forum/dlint)

This repository contains dynamic analyses for JavaScript code based on [Jalangi2](https://github.com/Samsung/jalangi2). It mainly consists of analyses ported from [JITProf](https://github.com/Berkeley-Correctness-Group/JITProf) and [DLint](https://github.com/Berkeley-Correctness-Group/DLint).

What is DLint?
--------------

DLint is a tool for dynamically checking JavaScript coding practices.

Briefly speaking, [JSHint](http://jshint.com/), [JSLint](http://www.jslint.com/) and [ESLint](http://eslint.org/) uses static analysis (scan the code) to find bad coding practices, while DLint uses dynamic analysis (by analysing runtime behavior) to do the detection.

By analyzing runtime information, DLint is capable of capturing violations of coding practices missed by those static analysis tools.
(See an [online demo](https://www.eecs.berkeley.edu/~gongliang13/jalangi_ff/demo_integrated.htm) of dynamic analysis.)

For more details, a [Wiki page](https://github.com/Berkeley-Correctness-Group/DLint/wiki) and a [technical report](http://www.eecs.berkeley.edu/Pubs/TechRpts/2015/EECS-2015-5.pdf) is available (to appear in [ISSTA'15](http://issta2015.cs.uoregon.edu/) soon).

What is JITProf?
----------------
JITProf is a tool that tells you which part of your JavaScript code may be slow on JIT-engine. We call those slow code **JIT-unfriendly code**.  

For more details, see this [GitHub repository](https://github.com/Berkeley-Correctness-Group/JITProf) and this [technical report](http://www.eecs.berkeley.edu/Pubs/TechRpts/2014/EECS-2014-144.pdf).


Install
--------------

Make sure that your computer meets these [requirements](https://github.com/JacksonGL/dynamicAnalyses/wiki/Requirements-for-Running).  

To install, copy and Paste the following command in your console:
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

Usage
--------------

### Run DLint in Browser
Under ```jalangi2/tmp``` directory:
```
../../dynamicAnalyses/scripts/dlint.sh
```
This command sets a web proxy, open a web page with your browser (e.g., Chrome or Safari).
Click the (![```Jalangi``` button](https://github.com/JacksonGL/dynamicAnalyses/blob/master/doc/jalangi_button.png)) on your web page to view the analysis result.  
To close the web proxy, simply rerun the above command.

### Run DLint on a Single File
Suppose you want to run DLint on file: ```tests/dlint/buggy_NoEffectOperation.js```.  
Under ```dynamicAnalyses``` directory:
```
./scripts/dlint_unit.sh tests/dlint/buggy_NoEffectOperation
```

### Run Unit Tests for DLint
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
Suppose you want to run JITProf on file: ```tests/jitprof/JITAwareTest.js```.  
Under ```dynamicAnalyses``` directory:
```
./scripts/jitprof_unit.sh tests/jitprof/JITAwareTest
```
