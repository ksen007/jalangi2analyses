Adding New Analyses
--------------------

**Note:** The framework in this repository uses [Jalangi2 analysis API](https://github.com/Samsung/jalangi2/blob/master/docs/analysis.md) from [Jalangi2](https://github.com/Samsung/jalangi2).  
(Do not use APIs from the first version of [Jalangi](https://github.com/SRA-SiliconValley/jalangi).)

### Adding New Analyses to DLint
To add a new analysis:  
 1. Add a .js file that implements the analysis to ```src/js/analyses/dlint```. At the end of the execution, each analysis passes DLintWarnings to the DLint object (see existing analyses).  
 2. Add the analysis to ```config/dlint/analyses```.  
 3. Add tests for the analysis (see below).  

#### How to Configure Existing DLint Checkers?
See this [Wiki page](./Configuration#how-to-configure-dlint).

#### Unit Testing

Each analysis should have two kinds of tests:

  * Example programs that should trigger a warning. For node.js tests, add such programs to ```tests/dlint``` and name the file so that it starts with ```buggy_TheAnalysisName```, For browser tests, add such programs to ```tests/html/dlint``` in a directory that starts with ```buggy_TheAnalysisName```.  
  * Example programs that should **not** trigger a warning. For node.js tests, add such programs to ```tests/dlint``` and name the file so that it starts with ```okay_TheAnalysisName```. For browser tests, add such programs to ```tests/html/dlint``` in a directory that starts with ```okay_TheAnalysisName```.

To run all node.js tests (```verbose``` and ```debug``` are optional):
```
node tests/dlint/runAllTests.js [ verbose | debug ]
```

### Adding New Analyses to JITProf
To add a new analysis:  
 1. Add a .js file that implements the analysis to ```src/js/analyses/jitprof```. At the end of the execution, each print the warnings (see existing analyses).  
 2. Add the analysis to ```config/jitprof/analyses```.  

#### How to Configure Existing JITProf Checkers?
See this [Wiki page](./wiki/Configuration#how-to-configure-jitprof).