/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/resource/ResourceModel","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery"],function(R,J,q){"use strict";var d=[],m=[],b={},l;function h(k,B){return B.hasText(k)||B.getText(k,[],true)!==undefined;}var L=function(t){return new Promise(function(r){sap.ui.getCore().loadLibraries([t]).then(function(){var c=sap.ui.getCore().getLoadedLibraries()[t],E=c.controls.concat(c.elements);l=t;sap.ui.require(E.map(function(s){return q.sap.getResourceName(s,"");}),function(){var f=sap.ui.getCore().getLoadedLibraries();try{var g=new R({bundleUrl:sap.ui.resource(t,"messagebundle.properties"),bundleLocale:"en"}),D=new R({bundleUrl:sap.ui.resource(t+".designtime","messagebundle.properties"),bundleLocale:"en"});b.runtime=g.getResourceBundle();b.designtime=D.getResourceBundle();Object.keys(f).forEach(function(s){if(t!==s){g.enhance({bundleUrl:sap.ui.resource(s,"messagebundle.properties"),bundleLocale:"en"});D.enhance({bundleUrl:sap.ui.resource(s+".designtime","messagebundle.properties"),bundleLocale:"en"});}});}catch(e){}var j=[],C=[];for(var i=0;i<arguments.length;i++){if(arguments[i].getMetadata()._oDesignTime){j.push(arguments[i].getMetadata().loadDesignTime());C.push(arguments[i].getMetadata());}}Promise.all(j).then(function(E){var i=0;d=E;m=d.map(function(o){var k=new J(o);k._oControlMetadata=C[i];i++;return k;});a();r();});});});});};L.version=2.0;var M={"/":{optional:false,check:function(c,o,C){c.strictEqual(typeof o,"object",C+" is an object");}},"/designtimeModule":{optional:false,check:function(c,s,C){c.strictEqual(typeof s,"string",C+" defines /designtimeModule : "+s);}},"/actions":{optional:true,check:function(c,A,C){Object.keys(A).forEach(function(s){if(A[s].changeType){c.strictEqual(typeof A[s].changeType,"string",C+" defines "+s+" with changetype:"+A[s].changeType);}else if(typeof A[s]==="string"){c.strictEqual(typeof A[s],"string",C+" defines "+s+" as string");}else{c.strictEqual(typeof A[s],"function",C+" defines "+s+" as function");}});}},"/name":{optional:true,check:function(c,e,C){if(typeof e==="string"&&e.indexOf("{")===0&&e.indexOf("}")===e.length-1){return true;}var k=["singular","plural"];k.forEach(function(K){if(typeof e[K]==="function"){c.strictEqual(typeof e[K],"function",C+" defines mandatory entry /name/"+K);}else{c.strictEqual(typeof e[K],"string",C+" defines mandatory entry /name/"+K);}});k.forEach(function(K){var D=false;if(typeof e[K]==="function"){c.strictEqual(typeof e[K],"function",C+" defines function for translation of entry /name/"+K);c.strictEqual(typeof e[K](),"string","Assuming that "+K+" with "+e[K].toString()+" returns a translation at runtime");return;}if(e[K].toUpperCase()!==e[K]){c.ok(true,"Assuming that "+K+" with "+e[K]+" needs currently no translation");return;}if(b.designtime){D=h(e[K],b.designtime);c.strictEqual(D,true,e[K]+" found in designtime message bundle");}if(b.runtime){if(D){c.strictEqual(h(e[K],b.runtime),false,e[K]+" found in runtime message bundle and designtime message bundle, please delete the entry from the runtime message bundle (messagebundle.properties + messagebundle_en.properties)");}else{c.strictEqual(h(e[K],b.runtime),true,e[K]+" found in runtime message bundle only, consider to move this text to the designtime message bundle");}}});}},"/palette":{optional:true,check:function(c,e,C){var v=["ACTION","DISPLAY","LAYOUT","LIST","INPUT","CONTAINER","CHART","TILE","DIALOG"];c.strictEqual(typeof e,"object",C+" defines optional entry /palette/");c.strictEqual(v.indexOf(e.group)>-1,true,"palette entry defines valid group "+e.group);if(e.icons){Object.keys(e.icons).forEach(function(k){var i=e.icons[k];c.strictEqual(typeof i,"string","palette/icons/"+k+" entry defines icon path "+i);var r=q.sap.sjax({url:sap.ui.require.toUrl(i)+""});c.ok(r.status==="success","File "+i+" does exist. Check entry palette/icons/"+k);if(i.indexOf(".svg")===i.length-4){c.ok(r.data.documentElement&&r.data.documentElement.tagName==="svg","File "+i+" starts with a svg node");}});}}},"/templates":{optional:true,check:function(c,e){if(e.create){var C=e.create;c.strictEqual(typeof C,"string","templates/create entry defines fragment path to "+C);var D=q.sap.sjax({url:sap.ui.require.toUrl(C)+""});c.ok(D.data.documentElement&&D.data.documentElement.localName==="FragmentDefinition","File "+C+" exists and starts with a FragmentDefinition node");}}}};function a(){QUnit.test("Checking library.designtime.js",function(c){var e=sap.ui.getCore().getLoadedLibraries()[l];if(e.designtime){var f=c.async();sap.ui.require([e.designtime],function(o){c.ok(o!==null,e.designtime+" loaded successfully");f();});}else{c.ok(true,"No library.designtime.js "+l);}});QUnit.test("Checking loaded designtime data",function(c){d.forEach(function(D){c.strictEqual(D!==null,true,"Designtime data found and loaded successful");c.strictEqual(typeof D,"object","Designtime data returned an object");});});m.forEach(function(o){var c=o._oControlMetadata,C=c.getName();QUnit.test(C+": Checking entries in designtime data",function(e){Object.keys(M).forEach(function(p){var f=M[p];var v=o.getProperty(p);if(v===undefined&&!f.optional){e.equal(false,true,C+" does not define mandatory entry "+p);}else if(v!==undefined&&f.optional){e.equal(true,true,C+" does define optional entry "+p);f.check(e,v,C);}else if(v!==undefined&&!f.optional){e.equal(true,true,C+" does define mandatory entry "+p);f.check(e,v,C);}});});});}return L;},true);
