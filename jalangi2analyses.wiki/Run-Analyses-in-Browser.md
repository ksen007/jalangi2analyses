This tutorial shows how to run dynamic analyses in Browser.

#### Step-1: Setup Environment
To Run DLint in a browser, open a terminal under ```jalangi2/tmp directory``` and type the following command
```
node src/js/command/run.js dlint
```
Similarly, to run JITProf in browser, use the following command:
```
node src/js/command/run.js jitprof
```

#### Step-2: Use Browser
This command sets a web proxy, open a web page with your browser (e.g., Chrome or Safari).   
![](https://github.com/ksen007/jalangi2analyses/blob/master/doc/instrumented_page.png)

#### Step-3: View Result
To view the analysis result, click the Jalangi button on your web page.  
![](https://github.com/ksen007/jalangi2analyses/blob/master/doc/jalangi_button.png)

You will be able to see the following page which shows all warnings. Click on the link in the left panel to view corresponding code locations in the file editor on the right panel.  
![](https://github.com/ksen007/jalangi2analyses/blob/master/doc/view_warnings.png)

#### Step-4: Close Proxy
To close the web proxy, simply rerun the command:
```
node src/js/command/run.js
```