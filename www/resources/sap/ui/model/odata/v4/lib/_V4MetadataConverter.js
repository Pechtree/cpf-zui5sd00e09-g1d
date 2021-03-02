/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","./_MetadataConverter"],function(_,a){"use strict";function V(){this.enumType=null;this.enumTypeMemberCounter=0;this.navigationProperty=null;a.call(this);}V.prototype=Object.create(a.prototype);V.prototype.finalize=function(){if(this.result.$Version!=="4.0"){throw new Error(this.url+": Unsupported OData version "+this.result.$Version);}};V.prototype.processActionOrFunction=function(e){var k=e.localName,q=this.namespace+e.getAttribute("Name"),A={$kind:k};this.processAttributes(e,A,{"IsBound":this.setIfTrue,"EntitySetPath":this.setValue,"IsComposable":this.setIfTrue});this.getOrCreateArray(this.result,q).push(A);this.oOperation=A;this.annotatable(A);};V.prototype.processComplexType=function(e){this.processType(e,{"$kind":"ComplexType"});};V.prototype.processEdmx=function(e){this.processAttributes(e,this.result,{"Version":this.setValue});};V.prototype.processElement=function(e,p){if(p){p.call(this,e);}};V.prototype.processEntityContainer=function(e){var q=this.namespace+e.getAttribute("Name");this.result[q]=this.entityContainer={"$kind":"EntityContainer"};this.result.$EntityContainer=q;this.annotatable(q);};V.prototype.processEntitySet=function(e){var n=e.getAttribute("Name");this.entityContainer[n]=this.entitySet={$kind:"EntitySet",$Type:this.resolveAlias(e.getAttribute("EntityType"))};this.processAttributes(e,this.entitySet,{"IncludeInServiceDocument":this.setIfFalse});this.annotatable(n);};V.prototype.processEntityType=function(e){this.processType(e,{$kind:"EntityType"});};V.prototype.processEntityTypeKeyPropertyRef=function(e){var A=e.getAttribute("Alias"),k,n=e.getAttribute("Name");if(A){k={};k[A]=n;}else{k=n;}this.getOrCreateArray(this.type,"$Key").push(k);};V.prototype.processEnumType=function(e){var q=this.namespace+e.getAttribute("Name"),E={"$kind":"EnumType"};this.processAttributes(e,E,{"IsFlags":this.setIfTrue,"UnderlyingType":function(v){return v!=="Edm.Int32"?v:undefined;}});this.result[q]=this.enumType=E;this.enumTypeMemberCounter=0;this.annotatable(q);};V.prototype.processEnumTypeMember=function(e){var n=e.getAttribute("Name"),v=e.getAttribute("Value"),b;if(v){b=parseInt(v);if(!_.isSafeInteger(b)){b=v;}}else{b=this.enumTypeMemberCounter;this.enumTypeMemberCounter+=1;}this.enumType[n]=b;this.annotatable(n);};V.prototype.processFacetAttributes=function(e,r){var t=this;this.processAttributes(e,r,{"MaxLength":function(v){return v==="max"?undefined:t.setNumber(v);},"Precision":this.setNumber,"Scale":function(v){return v==="variable"?v:t.setNumber(v);},"SRID":this.setValue,"Unicode":this.setIfFalse});};V.prototype.processImport=function(e){var k=e.localName,i={$kind:k},n=e.getAttribute("Name"),t=this;k=k.replace("Import","");i["$"+k]=this.resolveAlias(e.getAttribute(k));this.processAttributes(e,i,{"EntitySet":function(v){return t.resolveTargetPath(v);},"IncludeInServiceDocument":this.setIfTrue});this.entityContainer[n]=i;this.annotatable(n);};V.prototype.processNavigationPropertyBinding=function(e){var n=this.getOrCreateObject(this.entitySet,"$NavigationPropertyBinding");n[e.getAttribute("Path")]=this.resolveTargetPath(e.getAttribute("Target"));};V.prototype.processParameter=function(e){var A=this.oOperation,p={};this.processTypedCollection(e.getAttribute("Type"),p);this.processAttributes(e,p,{"Name":this.setValue,"Nullable":this.setIfFalse});this.processFacetAttributes(e,p);this.getOrCreateArray(A,"$Parameter").push(p);this.annotatable(p);};V.prototype.processReturnType=function(e){var A=this.oOperation,r={};this.processTypedCollection(e.getAttribute("Type"),r);this.processAttributes(e,r,{"Nullable":this.setIfFalse});this.processFacetAttributes(e,r);A.$ReturnType=r;this.annotatable(r);};V.prototype.processSchema=function(e){this.namespace=e.getAttribute("Namespace")+".";this.result[this.namespace]=this.schema={"$kind":"Schema"};this.annotatable(this.schema);};V.prototype.processSingleton=function(e){var n=e.getAttribute("Name");this.entityContainer[n]=this.entitySet={$kind:"Singleton",$Type:this.resolveAlias(e.getAttribute("Type"))};this.annotatable(n);};V.prototype.processTerm=function(e){var q=this.namespace+e.getAttribute("Name"),t={$kind:"Term"},b=this;this.processTypedCollection(e.getAttribute("Type"),t);this.processAttributes(e,t,{"Nullable":this.setIfFalse,"BaseTerm":function(v){return v?b.resolveAlias(v):undefined;}});this.processFacetAttributes(e,t);this.result[q]=t;this.annotatable(q);};V.prototype.processType=function(e,t){var q=this.namespace+e.getAttribute("Name"),b=this;this.processAttributes(e,t,{"OpenType":b.setIfTrue,"HasStream":b.setIfTrue,"Abstract":b.setIfTrue,"BaseType":function(T){return T?b.resolveAlias(T):undefined;}});this.result[q]=this.type=t;this.annotatable(q);};V.prototype.processTypedCollection=function(t,p){var m=this.rCollection.exec(t);if(m){p.$isCollection=true;t=m[1];}p.$Type=this.resolveAlias(t);};V.prototype.processTypeDefinition=function(e){var q=this.namespace+e.getAttribute("Name"),t={"$kind":"TypeDefinition","$UnderlyingType":e.getAttribute("UnderlyingType")};this.result[q]=t;this.processFacetAttributes(e,t);this.annotatable(q);};V.prototype.processTypeNavigationProperty=function(e){var n=e.getAttribute("Name"),p={$kind:"NavigationProperty"};this.processTypedCollection(e.getAttribute("Type"),p);this.processAttributes(e,p,{"Nullable":this.setIfFalse,"Partner":this.setValue,"ContainsTarget":this.setIfTrue});this.type[n]=this.navigationProperty=p;this.annotatable(n);};V.prototype.processTypeNavigationPropertyOnDelete=function(e){this.navigationProperty.$OnDelete=e.getAttribute("Action");this.annotatable(this.navigationProperty,"$OnDelete");};V.prototype.processTypeNavigationPropertyReferentialConstraint=function(e){var p=e.getAttribute("Property"),r=this.getOrCreateObject(this.navigationProperty,"$ReferentialConstraint");r[p]=e.getAttribute("ReferencedProperty");this.annotatable(r,p);};V.prototype.processTypeProperty=function(e){var n=e.getAttribute("Name"),p={"$kind":"Property"};this.processTypedCollection(e.getAttribute("Type"),p);this.processAttributes(e,p,{"Nullable":this.setIfFalse,"DefaultValue":this.setValue});this.processFacetAttributes(e,p);this.type[n]=p;this.annotatable(n);};V.prototype.resolveTargetPath=function(p){var s;if(!p){return p;}p=this.resolveAliasInPath(p);s=p.indexOf("/");if(s>=0&&p.indexOf("/",s+1)<0){if(p.slice(0,s)===this.result.$EntityContainer){return p.slice(s+1);}}return p;};(function($){var A,e,s;$.sRootNamespace=$.sEdmxNamespace;$.oAliasConfig={__xmlns:$.sEdmxNamespace,"Reference":{"Include":{__processor:$.processAlias}},"DataServices":{"Schema":{__xmlns:$.sEdmNamespace,__processor:$.processAlias}}};s={"Property":{__processor:$.processTypeProperty,__include:[$.oAnnotationConfig]},"NavigationProperty":{__processor:$.processTypeNavigationProperty,__include:[$.oAnnotationConfig],"OnDelete":{__processor:$.processTypeNavigationPropertyOnDelete,__include:[$.oAnnotationConfig]},"ReferentialConstraint":{__processor:$.processTypeNavigationPropertyReferentialConstraint,__include:[$.oAnnotationConfig]}}};e={"NavigationPropertyBinding":{__processor:$.processNavigationPropertyBinding}};A={"Parameter":{__processor:$.processParameter,__include:[$.oAnnotationConfig]},"ReturnType":{__processor:$.processReturnType,__include:[$.oAnnotationConfig]}};$.oFullConfig={__xmlns:$.sEdmxNamespace,__processor:$.processEdmx,__include:[$.oReferenceInclude],"DataServices":{"Schema":{__xmlns:$.sEdmNamespace,__processor:$.processSchema,__include:[$.oAnnotationsConfig,$.oAnnotationConfig],"Action":{__processor:$.processActionOrFunction,__include:[A,$.oAnnotationConfig]},"Function":{__processor:$.processActionOrFunction,__include:[A,$.oAnnotationConfig]},"EntityType":{__processor:$.processEntityType,__include:[s,$.oAnnotationConfig],"Key":{"PropertyRef":{__processor:$.processEntityTypeKeyPropertyRef}}},"ComplexType":{__processor:$.processComplexType,__include:[s,$.oAnnotationConfig]},"EntityContainer":{__processor:$.processEntityContainer,__include:[$.oAnnotationConfig],"ActionImport":{__processor:$.processImport,__include:[$.oAnnotationConfig]},"EntitySet":{__processor:$.processEntitySet,__include:[e,$.oAnnotationConfig]},"FunctionImport":{__processor:$.processImport,__include:[$.oAnnotationConfig]},"Singleton":{__processor:$.processSingleton,__include:[e,$.oAnnotationConfig]}},"EnumType":{__processor:$.processEnumType,__include:[$.oAnnotationConfig],"Member":{__processor:$.processEnumTypeMember,__include:[$.oAnnotationConfig]}},"Term":{__processor:$.processTerm,__include:[$.oAnnotationConfig]},"TypeDefinition":{__processor:$.processTypeDefinition,__include:[$.oAnnotationConfig]}}}};})(V.prototype);return V;},false);
