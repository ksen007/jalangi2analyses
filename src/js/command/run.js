/*
 * Copyright (c) 2015, University of California, Berkeley
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// Author: Liang Gong (gongliang13@cs.berkeley.edu)

(function() {
	var fs = require('fs');
	var path = require('path');
	var child = require('child_process');
	var cwd = process.cwd();
	var commandTemplate = '../scripts/mitmproxywrapper.py -t -q --anticache -s "../scripts/proxy.py $param"';
	var tmpDir = path.resolve(cwd + '/../jalangi2/tmp');
	start();

	function start() {
		// clean file in the tmp directory
		clearDir(tmpDir)
		var command = getCommand();
		printConfiguration(command);
		// execute the command
		var options = {
			cwd: tmpDir
		};
		var child_process = child.exec(command, options, handleOutput);
		// pipe the stdio of the child process to its parent process
		pipeOutput(child_process);
		console.log('\nSetup complete.');
	}

	function clearDir(dirPath) {
		try {
			var files = fs.readdirSync(dirPath);
		} catch (e) {
			return;
		}
		if (files.length > 0)
			for (var i = 0; i < files.length; i++) {
				var filePath = dirPath + '/' + files[i];
				if (fs.statSync(filePath).isFile())
					fs.unlinkSync(filePath);
				else
					rmDir(filePath);
			}
	};

	function getCommand() {
		var param = readConfiguration();
		var command = commandTemplate.replace('$param', param);
		return command;
	}

	function readConfiguration() {
		var analysisType = 'dlint', runningMode = 'browser';
		if(process.argv[2]) {
			var argv = process.argv[2];
			if(argv === 'dlint' || argv === 'jitprof') {
				analysisType = argv;
			} else {
				commandError();
			}
		}
		// read parameter and preprocess it
		var param = '' + fs.readFileSync(cwd + '/config/' + analysisType + '/analyses');
		param = replaceAll(param, '\n', ' ');
		param = replaceAll(param, '--analysis src/js/analyses/dlint/utils/document.js', '');
		param = replaceAll(param, '--analysis src', '../../jalangi2analyses/src');
		param = replaceAll(param, '--analysis ../jalangi2/src', '../src');
		return param;
	}

	function handleOutput(error, stdout, stderr) {
		if (error !== null) {
			console.log(error);
		}
		console.log(stdout);
	}

	function replaceAll(str, find, replace) {
		return str.replace(new RegExp(find, 'g'), replace);
	}

	function printConfiguration(command) {
		console.log('cwd: ' + path.resolve(cwd + '/../jalangi2/tmp'));
		console.log('command:')
		console.log(command);
		console.log();
	}

	function pipeOutput(child_process) {
		child_process.stdout.on('data', function(data) {
			console.log('> ' + data);
		});

		child_process.stderr.on('data', function(data) {
			console.log('err > ' + data);
		});

		child_process.on('close', function(code) {
			console.log('child process exited with code ' + code);
		});
	}

	function commandError() {
		console.log('wrong parameter, command line usage:')
		console.log('\trun.js [ dlint | jitprof ]');
		process.exit();
	}
})();