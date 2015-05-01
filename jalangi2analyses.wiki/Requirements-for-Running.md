### Requirements

We tested this repository on Mac OS X 10.10 with Chromium browser. This repository mainly depends on [Jalangi2](https://github.com/Samsung/jalangi2), which should work on Mac OS 10.7, and Ubuntu 11.0 and higher. Jalangi2 will NOT work with IE.

  * Latest version of Node.js available at http://nodejs.org/.  We have tested Jalangi with Node v0.10.33.
  * Chrome browser if you need to test web apps.
  * Python (http://python.org) version 2.7 or higher and less than 3.0.
  
If you have a fresh installation of Ubuntu, you can install all the requirements by invoking the following commands from a terminal.

    sudo apt-get update
    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs
    sudo apt-get update
    sudo apt-get install chromium-browser