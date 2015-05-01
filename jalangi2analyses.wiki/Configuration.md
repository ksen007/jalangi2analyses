### How to Configure DLint and JITProf?

The current version of DLint consists of around 30 checkers, JITProf consists of 7 checkers. But you can choose which checker to deploy when analyzing a web page or a local JS file. 
 * To add/remove a checker in DLint, add/remove the line corresponding to the checker in ```config/dlint/analyses```.  
 * To add/remove a checker in JITProf, add/remove the line corresponding to the checker in ```config/jitprof/analyses```.

**Note:** Make sure the following rules are satisifed:
 * Do not remove ```ChainedAnalysesNoCheck.js```
 * Do not put any user-defined analysis before ```PreAnalysis.js``` or after ```PostAnalysis.js```. 
 * If analysis A depends on analysis B, A should be listed after B in the configuration file.

A configuration of ```config/jitprof/analyses``` (including all the JITProf analyses):

```
--analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js 
--analysis src/js/analyses/jitprof/utils/Utils.js 
--analysis src/js/analyses/jitprof/utils/RuntimeDB.js 
--analysis src/js/analyses/jitprof/TrackHiddenClass.js  
--analysis src/js/analyses/jitprof/AccessUndefArrayElem.js 
--analysis src/js/analyses/jitprof/SwitchArrayType.js
--analysis src/js/analyses/jitprof/BinaryOpOnUndef.js
--analysis src/js/analyses/jitprof/NonContiguousArray.js
--analysis src/js/analyses/jitprof/PolymorphicFunCall.js
--analysis src/js/analyses/jitprof/TypedArray.js
```


A configuration of ```config/dlint/analyses``` (including all the DLint analyses):

```
--analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js
--analysis src/js/analyses/utils/PreAnalysis.js
--analysis src/js/analyses/dlint/utils/Utils.js
--analysis src/js/analyses/dlint/utils/document.js
--analysis src/js/analyses/dlint/utils/RuntimeDB.js
--analysis src/js/analyses/dlint/utils/levenshtein.js
--analysis src/js/analyses/dlint/CheckNaN.js
--analysis src/js/analyses/dlint/ConcatUndefinedToString.js
--analysis src/js/analyses/dlint/NonObjectPrototype.js
--analysis src/js/analyses/dlint/SetFieldOfPrimitive.js
--analysis src/js/analyses/dlint/OverFlowUnderFlow.js
--analysis src/js/analyses/dlint/StyleMisuse.js
--analysis src/js/analyses/dlint/ToStringGivesNonString.js
--analysis src/js/analyses/dlint/UndefinedOffset.js
--analysis src/js/analyses/dlint/NoEffectOperation.js
--analysis src/js/analyses/dlint/AddEnumerablePropertyToObject.js
--analysis src/js/analyses/dlint/ConstructWrappedPrimitive2.js
--analysis src/js/analyses/dlint/FunctionToString.js
--analysis src/js/analyses/dlint/ShadowProtoProperty.js
--analysis src/js/analyses/dlint/NonNumericArrayProperty.js
--analysis src/js/analyses/dlint/OverwrittenPrototype.js
--analysis src/js/analyses/dlint/DelayedCodeString.js
--analysis src/js/analyses/dlint/GlobalThis.js
--analysis src/js/analyses/dlint/CompareFunctionWithPrimitives.js
--analysis src/js/analyses/dlint/InconsistentConstructor.js
--analysis src/js/analyses/dlint/FunctionCalledWithMoreArguments.js
--analysis src/js/analyses/dlint/IllegalUseOfArgumentsVariable.js
--analysis src/js/analyses/dlint/ForInArray.js
--analysis src/js/analyses/dlint/DoubleEvaluation.js
--analysis src/js/analyses/dlint/InconsistentNewCallPrefix.js
--analysis src/js/analyses/dlint/UncountableSpaceInRegexp.js
--analysis src/js/analyses/dlint/EmptyClassInRegexp.js
--analysis src/js/analyses/dlint/UseArrObjConstrWithoutArg.js
--analysis src/js/analyses/dlint/MissRadixArgInParseNum.js
--analysis src/js/analyses/dlint/FloatNumberEqualityComparison.js
--analysis src/js/analyses/dlint/jsBuiltinFunctionChecker/DocumentFunctionsMisuse.js
--analysis src/js/analyses/dlint/jsBuiltinFunctionChecker/StringFunctionsMisuse.js
--analysis src/js/analyses/dlint/jsBuiltinFunctionChecker/RegExpFunctionsMisuse.js
--analysis src/js/analyses/dlint/jsBuiltinFunctionChecker/NumberFunctionsMisuse.js
--analysis src/js/analyses/dlint/jsBuiltinFunctionChecker/ObjectFunctionsMisuse.js
--analysis src/js/analyses/dlint/jsBuiltinFunctionChecker/GlobalFunctionsMisuse.js
--analysis src/js/analyses/dlint/jsBuiltinFunctionChecker/ArrayFunctionsMisuse.js
--analysis src/js/analyses/dlint/jsBuiltinFunctionChecker/DateFunctionsMisuse.js
--analysis src/js/analyses/utils/PostAnalysis.js
```