### What is JITProf?

JITProf is a tool that tells you which part of your JavaScript code may be slow on JIT-engine. We call those slow code **JIT-unfriendly code**.

#### What is JIT-unfriendly code?

JIT-unfriendly code is a piece of JavaScript that is hard for the JIT-engine to do profitable optimization.

**Example:** Suppose you want to create an array containing 10k numbers with number i at index i:

```javascript
var array = [];
for(var i=10000-1;i>=0;i--) {
	array[i] = i; // JIT-unfriendly code
}
```

The first half of iterations create a non-contiguous array.
In order to save memory, JIT-engine will use a hash-table-like representation to store the array
in memory instead of a contiguous memory space (like in C/C++). Consequently, accessing ```array``` is quite slow.

A more efficient and JIT-friendly code should initialize the array elements in asending order:

```javascript
var array = [];
for(var i=0;i<10000;i++) {
	array[i] = i;
}
```

This time, the JIT-engine will always use contiguous memory space for array and array accessing is much faster.
This simple change leads to 10X-20X speedup on Firefox and Chrome.

Note that there are different JIT-unfriendly code patterns, those patterns relate to memory model, polymorphic operations, hidden classes and inline caching. More details are in our [technical report](http://www.eecs.berkeley.edu/Pubs/TechRpts/2014/EECS-2014-144.pdf).

#### How does JITProf work?

JITProf monitors the execution of a JavaScript program and analyses its runtime behavior to pinpoint the JIT-unfriendly code location.

For the previous example, JITProf will pinpoint to ```array[i] = i;``` and tells you the code is accessing a non-contiguous array
frequently. Note that this is only one of those JIT-unfriendly code patterns detected by JITProf. 
For more details, please [read this document](./JITProf-Wiki-Page).

#### Overall how much speedup after removing JIT-unfriendly code?

The speedup ranges from 1% ~ 20% on SunSpider and Google Octane benchmark.
