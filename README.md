# Dynamic Analyses 


[Wiki](https://github.com/ksen007/jalangi2analyses/wiki) | [Configuring](https://github.com/ksen007/jalangi2analyses/wiki/Configuration) | [Checkers](https://github.com/Berkeley-Correctness-Group/DLint/wiki/DLint-Checkers) | [Develop](https://github.com/ksen007/jalangi2analyses/wiki/Developer-Guide) | [Mailing List](https://groups.google.com/forum/#!forum/dlint)

This repository contains dynamic analyses for JavaScript code based on [Jalangi2](https://github.com/Samsung/jalangi2). It mainly consists of analyses ported from [JITProf](https://github.com/Berkeley-Correctness-Group/JITProf) and [DLint](https://github.com/Berkeley-Correctness-Group/DLint).

What is DLint?
--------------

DLint is a tool for dynamically checking JavaScript coding practices.

Briefly speaking, [JSHint](http://jshint.com/), [JSLint](http://www.jslint.com/) and [ESLint](http://eslint.org/) uses static analysis (scan the code) to find bad coding practices, while DLint uses dynamic analysis (by analysing runtime behavior) to do the detection.

By analyzing runtime information, DLint is capable of capturing violations of coding practices missed by those static analysis tools.
<!---
(See an [online demo](https://www.eecs.berkeley.edu/~gongliang13/jalangi_ff/demo_integrated.htm) of dynamic analysis.)
-->

For more details, a [Wiki page](https://github.com/Berkeley-Correctness-Group/DLint/wiki) is available.

**Academic Resources:** [Preprint](http://mp.binaervarianz.de/issta2015.pdf) in [ISSTA'15](http://issta2015.cs.uoregon.edu/) | [Presentation Slides](http://jacksongl.github.io/files/dlint_slides.pdf) | [Technical Report](http://www.eecs.berkeley.edu/Pubs/TechRpts/2015/EECS-2015-5.pdf) | [Bibtex](http://mp.binaervarianz.de/issta2015.html)

What is JITProf?
----------------
JITProf is a tool that tells you which part of your JavaScript code may be slow on JIT-engine. We call those slow code **JIT-unfriendly code**.  

For more details, see this [GitHub repository](https://github.com/Berkeley-Correctness-Group/JITProf).

**Academic Resources:** [Preprint](http://www.cs.berkeley.edu/~ksen/papers/jitprof.pdf) in [ESEC/FSE'15](http://esec-fse15.dei.polimi.it/) | [Presentation Slides](http://mp.binaervarianz.de/fse2015_slides.pdf) | [Technical Report](http://www.eecs.berkeley.edu/Pubs/TechRpts/2014/EECS-2014-144.pdf) | [Bibtex](http://mp.binaervarianz.de/fse2015.html)

**Visualizing JIT-unfriendly Code:** For more details, see [here](https://github.com/JacksonGL/jitprof-visualization).

Install
--------------

Make sure that your computer meets these [requirements](https://github.com/ksen007/jalangi2analyses/wiki/Requirements-for-Running).  

To run analyses with Jalangi2 on real-world websites, you need to install:

 * **mitmproxy** For more details, please read [this document](https://github.com/ksen007/jalangi2analyses/wiki/Install-mitmproxy-and-Certificates).

To install, type the following commands in your console:
```
git clone https://github.com/ksen007/jalangi2analyses.git
cd jalangi2analyses
npm install
```

Usage
--------------
All the following commands should be executed under directory ```jalangi2analyses/```.

### Run DLint in Browser
```
node src/js/command/run.js dlint
```
This command sets a web proxy, open a web page with your browser (e.g., Chrome or Safari).
Click the ```Jalangi``` button on your web page to view the analysis result.  
To close the web proxy, simply rerun the above command ([See Step-by-Step Guide](https://github.com/ksen007/jalangi2analyses/wiki/Run-Analyses-in-Browser)).

### Run Unit Tests for DLint
```
node tests/dlint/runAllTests.js 
```

### Run JITProf in Browser
```
node src/js/command/run.js jitprof
```
This command sets a web proxy, open a web page with your browser (e.g., Chrome or Safari).
Click the ```Jalangi``` button on your web page to view the analysis result.  
To close the web proxy, simply rerun the above command ([See Step-by-Step Guide](https://github.com/ksen007/jalangi2analyses/wiki/Run-Analyses-in-Browser)).

**Note:** To run JITProf and DLint on node.js, see this [Wiki page](https://github.com/ksen007/jalangi2analyses/wiki/Commands).

Configuration
----------------
To configure which analysis module to be used, see this [Wiki page](https://github.com/ksen007/jalangi2analyses/wiki/Configuration).


Directory Structure
----------------

The directory structure and purpose is listed as follows:

```
jalangi2analyses
    |
    + -- doc                  # documentation files and resources
    |
    + -- tests                # all test cases for DLint and JITProf
    |
    + -- config
    |       |
    |  (1)  + -- dlint        # configuration file for DLint
    |       |
    |  (2)  + -- JITProf      # configuration file for JITProf
    |
    + -- scripts              # some bash scripts ussed in this project
    |
    + -- src/js
    	  |
    	  + -- command        # command script used in the terminal (or console)
          |
          + -- analyses
                |
       (3)      + -- dlint    # runtime checkers (Jalangi2 analyses) for DLint
                |
       (4)      + -- jitprof  # runtime checkers (jalangi2 analyses) for JITProf
                |
                + -- utils    # built-in analyses of DLint and JITProf
```
To add a new analysis for DLint, first add a few analysis file that overides the Jalangi2 callbacks in directory ```(3)```; then add add the file name of the new analysis to the configuration file in directory ```(1)```. Likewise, to add a new analysis for JITProf, first add a few analysis file that overides the Jalangi2 callbacks in directory ```(4)```; then add add the file name of the new analysis to the configuration file in directory ```(2)```.

License
-------
DLint and JITProf is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0.html).
