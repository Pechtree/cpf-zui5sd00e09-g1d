/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/model/BindingMode','sap/ui/base/BindingParser','sap/ui/model/Context','sap/ui/base/ManagedObject','sap/ui/model/ClientContextBinding','sap/ui/model/FilterProcessor','sap/ui/model/json/JSONModel','sap/ui/model/json/JSONListBinding','sap/ui/model/json/JSONPropertyBinding','sap/ui/model/json/JSONTreeBinding','sap/ui/model/MetaModel','./_ODataMetaModelUtils',"sap/ui/performance/Measurement","sap/base/Log","sap/ui/thirdparty/jquery"],function(B,a,C,M,b,F,J,c,d,e,f,U,g,L,q){"use strict";var o="sap.ui.model.odata.ODataMetaModel",p=[o],P=o+"/load",r=/^((\/dataServices\/schema\/\d+)\/(?:complexType|entityType)\/\d+)\/property\/\d+$/;var O=c.extend("sap.ui.model.odata.ODataMetaListBinding"),R=M.extend("sap.ui.model.odata._resolver",{metadata:{properties:{any:"any"}}});O.prototype.applyFilter=function(){var t=this,i=F.combineFilters(this.aFilters,this.aApplicationFilters);this.aIndices=F.apply(this.aIndices,i,function(v,s){return s==="@sapui.name"?v:t.oModel.getProperty(s,t.oList[v]);});this.iLength=this.aIndices.length;};var h=f.extend("sap.ui.model.odata.ODataMetaModel",{constructor:function(m,A,i){var t=this;function l(){var D;if(t.bDestroyed){throw new Error("Meta model already destroyed");}g.average(P,"",p);D=JSON.parse(JSON.stringify(m.getServiceMetadata()));t.oModel=new J(D);t.oModel.setDefaultBindingMode(t.sDefaultBindingMode);U.merge(A?A.getAnnotationsData():{},D,t);g.end(P);}i=i||{};f.apply(this);this.oModel=null;this.mContext2Promise={};this.sDefaultBindingMode=B.OneTime;this.oLoadedPromise=i.annotationsLoadedPromise?i.annotationsLoadedPromise.then(l):new Promise(function(j,k){l();j();});this.oMetadata=m;this.oODataModelInterface=i;this.mQueryCache={};this.mQName2PendingRequest={};this.oResolver=undefined;this.mSupportedBindingModes={"OneTime":true};}});h.prototype._getObject=function(s,j){var k=j,l,m,i,E,n,v,t,u=s||"",w;if(!j||j instanceof C){u=this.resolve(s||"",j);if(!u){L.error("Invalid relative path w/o context",s,o);return null;}}if(u.charAt(0)==="/"){k=this.oModel._getObject("/");u=u.slice(1);}t="/";n=k;while(u){v=undefined;l=undefined;if(u.charAt(0)==='['){try{w=a.parseExpression(u,1);E=w.at;if(u.length===E+1||u.charAt(E+1)==='/'){l=w.result;v=u.slice(0,E+1);u=u.slice(E+2);}}catch(x){if(!(x instanceof SyntaxError)){throw x;}}}if(v===undefined){E=u.indexOf("/");if(E<0){v=u;u="";}else{v=u.slice(0,E);u=u.slice(E+1);}}if(!n){if(L.isLoggable(L.Level.WARNING,o)){L.warning("Invalid part: "+v,"path: "+s+", context: "+(j instanceof C?j.getPath():j),o);}break;}if(l){if(k===j){L.error("A query is not allowed when an object context has been given",s,o);return null;}if(!Array.isArray(n)){L.error("Invalid query: '"+t+"' does not point to an array",s,o);return null;}m=t+v;v=this.mQueryCache[m];if(v===undefined){this.oResolver=this.oResolver||new R({models:this.oModel});for(i=0;i<n.length;i+=1){this.oResolver.bindObject(t+i);this.oResolver.bindProperty("any",l);try{if(this.oResolver.getAny()){this.mQueryCache[m]=v=i;break;}}finally{this.oResolver.unbindProperty("any");this.oResolver.unbindObject();}}}}n=n[v];t=t+v+"/";}return n;};h.prototype._mergeMetadata=function(i){var E=this.getODataEntityContainer(),m=U.getChildAnnotations(i.annotations,E.namespace+"."+E.name,true),j=E.entitySet.length,s=this.oModel.getObject("/dataServices/schema"),t=this;i.entitySets.forEach(function(k){var l,S,T=k.entityType,n=T.slice(0,T.lastIndexOf("."));if(!t.getODataEntitySet(k.name)){E.entitySet.push(JSON.parse(JSON.stringify(k)));if(!t.getODataEntityType(T)){l=t.oMetadata._getEntityTypeByName(T);S=U.getSchema(s,n);S.entityType.push(JSON.parse(JSON.stringify(l)));U.visitParents(S,i.annotations,"entityType",U.visitEntityType,S.entityType.length-1);}}});U.visitChildren(E.entitySet,m,"EntitySet",s,null,j);};h.prototype._sendBundledRequest=function(){var Q=this.mQName2PendingRequest,j=Object.keys(Q),t=this;if(!j.length){return;}this.mQName2PendingRequest={};j=j.sort();j.forEach(function(s,i){j[i]=encodeURIComponent(s);});this.oODataModelInterface.addAnnotationUrl("$metadata?sap-value-list="+j.join(",")).then(function(i){var s;t._mergeMetadata(i);for(s in Q){try{Q[s].resolve(i);}catch(E){Q[s].reject(E);}}},function(E){var s;for(s in Q){Q[s].reject(E);}});};h.prototype.bindContext=function(s,i,m){return new b(this,s,i,m);};h.prototype.bindList=function(s,i,S,j,m){return new O(this,s,i,S,j,m);};h.prototype.bindProperty=function(s,i,m){return new d(this,s,i,m);};h.prototype.bindTree=function(s,i,j,m){return new e(this,s,i,j,m);};h.prototype.destroy=function(){f.prototype.destroy.apply(this,arguments);return this.oModel&&this.oModel.destroy.apply(this.oModel,arguments);};h.prototype.getAdapterFactoryModulePath=function(){return"sap/ui/mdc/experimental/adapter/odata/v2/ODataAdapterFactory";};h.prototype.getMetaContext=function(s){var A,E,i,j,m,n,k,l,Q;function t(S){var u=S.indexOf("(");return u>=0?S.slice(0,u):S;}if(!s){return null;}l=s.split("/");if(l[0]!==""){throw new Error("Not an absolute path: "+s);}l.shift();k=t(l[0]);E=this.getODataEntitySet(k);if(E){Q=E.entityType;}else{j=this.getODataFunctionImport(k);if(j){if(l.length===1){m=this.getODataFunctionImport(k,true);}Q=j.returnType;if(Q.lastIndexOf("Collection(",0)===0){Q=Q.slice(11,-1);}}else{throw new Error("Entity set or function import not found: "+k);}}l.shift();while(l.length){i=this.getODataEntityType(Q);if(i){n=t(l[0]);A=this.getODataAssociationEnd(i,n);}else{i=this.getODataComplexType(Q);}if(A){Q=A.type;if(A.multiplicity==="1"&&n!==l[0]){throw new Error("Multiplicity is 1: "+l[0]);}l.shift();}else{m=this.getODataProperty(i,l,true);if(l.length){throw new Error("Property not found: "+l.join("/"));}break;}}m=m||this.getODataEntityType(Q,true);return this.createBindingContext(m);};h.prototype.getODataAssociationEnd=function(E,n){var N=E?U.findObject(E.navigationProperty,n):null,A=N?U.getObject(this.oModel,"association",N.relationship):null,i=A?U.findObject(A.end,N.toRole,"role"):null;return i;};h.prototype.getODataAssociationSetEnd=function(E,n){var A,i=null,j=this.getODataEntityContainer(),N=E?U.findObject(E.navigationProperty,n):null;if(j&&N){A=U.findObject(j.associationSet,N.relationship,"association");i=A?U.findObject(A.end,N.toRole,"role"):null;}return i;};h.prototype.getODataComplexType=function(Q,A){return U.getObject(this.oModel,"complexType",Q,A);};h.prototype.getODataEntityContainer=function(A){var v=A?undefined:null,s=this.oModel.getObject("/dataServices/schema");if(s){s.forEach(function(S,i){var j=U.findIndex(S.entityContainer,"true","isDefaultEntityContainer");if(j>=0){v=A?"/dataServices/schema/"+i+"/entityContainer/"+j:S.entityContainer[j];return false;}});if(!v&&s.length===1&&s[0].entityContainer&&s[0].entityContainer.length===1){v=A?"/dataServices/schema/0/entityContainer/0":s[0].entityContainer[0];}}return v;};h.prototype.getODataEntitySet=function(n,A){return U.getFromContainer(this.getODataEntityContainer(),"entitySet",n,A);};h.prototype.getODataEntityType=function(Q,A){return U.getObject(this.oModel,"entityType",Q,A);};h.prototype.getODataFunctionImport=function(n,A){var i=n&&n.indexOf('/')>=0?n.split('/'):undefined,E=i?U.getObject(this.oModel,"entityContainer",i[0]):this.getODataEntityContainer();return U.getFromContainer(E,"functionImport",i?i[1]:n,A);};h.prototype.getODataProperty=function(t,n,A){var i,j=Array.isArray(n)?n:[n],k=null,s;while(t&&j.length){i=U.findIndex(t.property,j[0]);if(i<0){break;}j.shift();k=t.property[i];s=t.$path+"/property/"+i;if(j.length){t=this.getODataComplexType(k.type);}}return A?s:k;};h.prototype.getODataValueLists=function(i){var j=false,m,s=i.getPath(),k=this.mContext2Promise[s],t=this;if(k){return k;}m=r.exec(s);if(!m){throw new Error("Unsupported property context with path "+s);}k=new Promise(function(l,n){var u=i.getObject(),Q,v=U.getValueLists(u);if(!(""in v)&&u["sap:value-list"]&&t.oODataModelInterface.addAnnotationUrl){j=true;Q=t.oModel.getObject(m[2]).namespace+"."+t.oModel.getObject(m[1]).name;t.mQName2PendingRequest[Q+"/"+u.name]={resolve:function(w){q.extend(u,(w.annotations.propertyAnnotations[Q]||{})[u.name]);v=U.getValueLists(u);if(q.isEmptyObject(v)){n(new Error("No value lists returned for "+s));}else{delete t.mContext2Promise[s];l(v);}},reject:n};setTimeout(t._sendBundledRequest.bind(t),0);}else{l(v);}});if(j){this.mContext2Promise[s]=k;}return k;};h.prototype.getProperty=function(){return this._getObject.apply(this,arguments);};h.prototype.isList=function(){return this.oModel.isList.apply(this.oModel,arguments);};h.prototype.loaded=function(){return this.oLoadedPromise;};h.prototype.refresh=function(){throw new Error("Unsupported operation: ODataMetaModel#refresh");};h.prototype.setLegacySyntax=function(l){if(l){throw new Error("Legacy syntax not supported by ODataMetaModel");}};h.prototype.setProperty=function(){throw new Error("Unsupported operation: ODataMetaModel#setProperty");};return h;});
