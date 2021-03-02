/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dt/Util","sap/base/util/merge"],function(q,U,m){"use strict";var M={};M._getParentPropagationInfo=function(a){if(!a||!a["propagationInfos"]){return false;}return Object.assign([],a["propagationInfos"]);};M._getCurrentRelevantContainerPropagation=function(e,E){var n={};if(!e.propagateRelevantContainer){return n;}else if(typeof e.propagateRelevantContainer==="function"){n.relevantContainerFunction=e.propagateRelevantContainer;n.relevantContainerElement=E;}else if(typeof e.propagateRelevantContainer==="boolean"&&e.propagateRelevantContainer){n.relevantContainerFunction=function(){return true;};n.relevantContainerElement=E;}else{var o=U.wrapError("Wrong type: it should be either a function or a boolean value and it is:"+typeof e.propagateRelevantContainer);var l='sap.ui.dt.MetadataPropagationUtil#_getCurrentRelevantContainerPropagation';o.name='Error in '+l;o.message=U.printf("{0} / {1}",l,o.message);throw o;}return n;};M._getCurrentDesigntimePropagation=function(e,E){var n={};if(!e.propagateMetadata){return n;}else if(typeof e.propagateMetadata==="function"){n.relevantContainerElement=E;n.metadataFunction=e.propagateMetadata;}else{var o=U.wrapError("Wrong type: it should be a function and it is:"+typeof e.propagateRelevantContainer);var l='sap.ui.dt.MetadataPropagationUtil#_getCurrentDesigntimePropagation';o.name='Error in '+l;o.message=U.printf("{0} / {1}",l,o.message);throw o;}return n;};M._setPropagationInfo=function(a,n,p){if(!p&&q.isEmptyObject(n)){return false;}a.propagationInfos=p||[];if(!q.isEmptyObject(n)){a.propagationInfos.push(n);}return a;};M.propagateMetadataToAggregationOverlay=function(o,e,p){var n,a,r,b=Object.assign({},o);var P=M._getParentPropagationInfo(p);if(b&&!q.isEmptyObject(b)){r=M._getCurrentRelevantContainerPropagation(b,e);a=M._getCurrentDesigntimePropagation(b,e);}if(P||!q.isEmptyObject(r)||!q.isEmptyObject(a)){n=Object.assign({},r,a);return M._setPropagationInfo(b,n,P);}return b;};M.getRelevantContainerForPropagation=function(p,e){var P=false;if(!p||!p.propagationInfos){return false;}p.propagationInfos.some(function(o){if(o.relevantContainerFunction&&o.relevantContainerFunction(e)){P=o.relevantContainerElement;return true;}});return P||false;};M.getMetadataForPropagation=function(p,e){var r={};if(!p||!p.propagationInfos){return false;}var R=p.propagationInfos.slice().reverse();r=R.reduce(function(r,P){if(P.metadataFunction){var c=P.metadataFunction(e,P.relevantContainerElement);return m(r,c);}return r;},r);return q.isEmptyObject(r)?false:r;};M.propagateMetadataToElementOverlay=function(t,p,e){var P=M.getRelevantContainerForPropagation(p,e);var v=M.getMetadataForPropagation(p,e);if(!P&&!v){return t;}var r=m({},t);if(P){r.relevantContainer=P;}if(v){if(v.actions===null||v.actions==="not-adaptable"){var a=e.getMetadata().getAllAggregations();var A=Object.keys(a);if(r.aggregations){A=A.concat(Object.keys(r.aggregations).filter(function(s){return A.indexOf(s)<0;}));}else{r.aggregations={};}A.forEach(function(s){if(r.aggregations[s]&&r.aggregations[s].actions){r.aggregations[s].actions=v.actions;}});}return m(r,v);}return r;};return M;},true);
