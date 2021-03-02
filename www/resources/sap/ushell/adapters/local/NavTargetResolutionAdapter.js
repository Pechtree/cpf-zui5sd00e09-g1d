// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/datajs","sap/ushell/services/_ClientSideTargetResolution/VirtualInbounds"],function(d,v){"use strict";var N=function(u,p,a){var A=jQuery.sap.getObject("config.applications",0,a);var V=v.getInbounds();b(V,A);function b(V,A){V.forEach(function(i){var I=i.semanticObject+"-"+i.action;A[I]=i.resolutionResult;});}this.resolveHashFragment=function(h){var D=new jQuery.Deferred(),i,r,R,P;if(h&&h.charAt(0)!=="#"){throw new sap.ushell.utils.Error("Hash fragment expected","sap.ushell.renderers.minimal.Shell");}h=h.substring(1);if(!h&&!A[h]){D.resolve(undefined);}else{jQuery.sap.log.info("Hash Fragment: "+h);i=h.indexOf("?");if(i>=0){P=h.slice(i+1);h=h.slice(0,i);}r=A[h];if(r){R={additionalInformation:r.additionalInformation,applicationType:r.applicationType,url:r.url,text:r.text,fullWidth:r.fullWidth};if(P){R.url+=(R.url.indexOf("?")<0)?"?":"&";R.url+=P;}if(r.navigationMode!==undefined){R.navigationMode=r.navigationMode;}D.resolve(R);}else{D.reject("Could not resolve link '"+h+"'");}}return D.promise();};this.getSemanticObjectLinks=function(s,P){var I,r=[],i=0,D=new jQuery.Deferred(),c;if(!s){setTimeout(function(){D.resolve([]);},0);}else{c=sap.ushell.Container.getService("URLParsing").paramsToString(P);jQuery.sap.log.info("getSemanticObjectLinks: "+s);for(I in A){if(A.hasOwnProperty(I)&&I.substring(0,I.indexOf('-'))===s){r[i]=A[I];r[i].id=I;r[i].text=r[i].text||r[i].description||"no text";r[i].intent="#"+I;if(c!==""){if(r[i].intent.indexOf("?")!==-1){r[i].intent+="&"+c;}else{r[i].intent+="?"+c;}}i+=1;}}if(r){setTimeout(function(){D.resolve(r);},0);}else{setTimeout(function(){D.reject("Could not get links for  '"+s+"'");},0);}}return D.promise();};this.isIntentSupported=function(I){var D=new jQuery.Deferred(),s={},c=[],t=this;function e(i,S){s[i]={supported:S};}I.forEach(function(f,i){var o=new jQuery.Deferred();c.push(o.promise());t.resolveHashFragment(f).fail(function(E){e(f,false);o.resolve();}).done(function(g){e(f,true);o.resolve();});});if(I.length>0){jQuery.when.apply(jQuery,c).always(function(){D.resolve(s);});}else{D.resolve(s);}return D.promise();};};return N;},true);