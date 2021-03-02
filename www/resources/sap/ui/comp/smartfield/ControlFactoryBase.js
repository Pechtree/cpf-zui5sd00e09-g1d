/*
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/library","sap/ui/comp/library","sap/ui/comp/util/FormatUtil","sap/ui/comp/providers/ValueHelpProvider","sap/ui/comp/providers/ValueListProvider","sap/ui/comp/smartfield/BindingUtil","sap/m/HBox","sap/base/Log","sap/base/strings/capitalize"],function(B,c,l,F,V,a,b,H,L,d){"use strict";var C=l.smartfield.ControlContextType;var e=c.ValueState;var f=B.extend("sap.ui.comp.smartfield.ControlFactoryBase",{constructor:function(m,p){B.apply(this,arguments);this.sName="ControlFactoryBase";this._oModel=m;this._oParent=p;this._oBinding=new b();this._aProviders=[];this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");}});f.prototype.createControl=function(g){var m,o;m=this._getCreator(g);if(m){o=this[m]();this._addAriaLabelledBy(o);if(o&&o.onCreate){this[o.onCreate](o.control,o.params);}}return o;};f.prototype._addAriaLabelledBy=function(o){var t;if((this._oParent.getControlContext()===C.None)||(this._oParent.getControlContext()===C.Form)||(this._oParent.getControlContext()===C.SmartFormGrid)){if(o){t=o.control;if(t instanceof H){if(t.getItems().length>0){t=t.getItems()[0];}}}if(t&&t.addAriaLabelledBy&&this._oParent.getAriaLabelledBy().length>0){t.removeAllAriaLabelledBy();this._oParent.getAriaLabelledBy().forEach(function(A){t.addAriaLabelledBy(A);});}}};f.prototype.addValidations=function(o,m){var s,E,t=this;s=function(S,g){var M,h,i=g.getSource();if(i){if(i.setValueState){i.setValueState(S);}h=g.getParameter("exception");if(h){M=h.message;}if(!M){M=g.getParameter("message");}if(i.setValueStateText){i.setValueStateText(M);}}if(m){t._oParent[m](S===e.Error);}};E=function(g){s(e.Error,g);};o.attachFormatError(E);o.attachParseError(E);o.attachValidationError(E);o.attachValidationSuccess(function(g){s(e.None,g);});};f.prototype._getDisplayBehaviourConfiguration=function(D){var s=null;var o=this._oParent.getConfiguration();if(o){s=o.getDisplayBehaviour();}if(!s&&this._oMetaData&&this._oMetaData.entityType){s=this._oHelper.oAnnotation.getTextArrangement(this._oMetaData.property.property,this._oMetaData.entityType);}if(!s){s=this._oParent.data(D);}return s;};f.prototype._getPreventInitialDataFetchInVHDialog=function(){var o=this._oParent.getConfiguration();return o?o.getPreventInitialDataFetchInValueHelpDialog():true;};f.prototype._formatDisplayBehaviour=function(D,k,s){var g=this._getDisplayBehaviourConfiguration(D);if(D==="defaultCheckBoxDisplayBehaviour"){return this._getFormattedExpressionFromDisplayBehaviour(g,k);}if(D==="defaultComboBoxReadOnlyDisplayBehaviour"&&!g){g="descriptionAndId";}return F.getFormattedExpressionFromDisplayBehaviour(g||"idOnly",k,s);};f.prototype._getFormattedExpressionFromDisplayBehaviour=function(D,v){var k="";switch(D){case"OnOff":k=v?"SMARTFIELD_CB_ON":"SMARTFIELD_CB_OFF";break;case"TrueFalse":k=v?"SMARTFIELD_CB_TRUE":"SMARTFIELD_CB_FALSE";break;default:k=v?"SMARTFIELD_CB_YES":"SMARTFIELD_CB_NO";break;}return this._oRb.getText(k);};f.prototype.shouldCreateValueHelpForControl=function(o){if(!o){return false;}var p=this._oParent;return p&&((p.getMode()==="edit")||(o.getMetadata().getName()==="sap.ui.comp.smartfield.DisplayComboBox"));};f.prototype.getDropdownItemKeyType=function(){};f.prototype.getValueStateBindingInfoForRecommendationStateAnnotation=function(){};f.prototype.createValueHelp=function(s){var E=s.edmProperty,v=s.valueHelp;if(v.annotation&&(E["sap:value-list"]||E["com.sap.vocabularies.Common.v1.ValueList"])){var D=v.displayBehaviour||this._getDisplayBehaviourConfiguration("defaultDropDownDisplayBehaviour"),o=this._oParent.data("dateFormatSettings"),p=this._getPreventInitialDataFetchInVHDialog();if(typeof o==="string"){try{o=JSON.parse(o);}catch(g){}}var A,h;if(typeof v.annotation==="string"){h=v.annotation;}else if(v&&typeof v.annotation==="object"){A=v.analyser.getValueListAnnotationForFunctionImport({"":v.annotation},E.name).primaryValueListAnnotation;}var i=s.control,m=s.model,O=s.onValueListChange;if(!v.noDialog){if(i.setFilterSuggests){i.setFilterSuggests(false);}var j=new V({loadAnnotation:true,fullyQualifiedFieldName:h,annotation:A,metadataAnalyser:v.analyser,control:i,model:m,preventInitialDataFetchInValueHelpDialog:p,dateFormatSettings:o,takeOverInputValue:false,supportMultiSelect:!!v.supportMultiSelect,supportRanges:!!v.supportRanges,fieldName:E.name,title:v.dialogtitle,displayBehaviour:D,type:v.type});if(O){j.attachValueListChanged(O);}this._aProviders.push(j);if(i.setShowValueHelp){i.setShowValueHelp(true);}}if(!v.noTypeAhead||!i.isA("sap.m.Input")){var k=new a({control:i,dropdownItemKeyType:this.getDropdownItemKeyType(i),typeAheadEnabled:!v.noTypeAhead,aggregation:v.aggregation,loadAnnotation:true,fullyQualifiedFieldName:h,annotation:A,metadataAnalyser:v.analyser,model:m,dateFormatSettings:o,displayBehaviour:D});if(!v.noTypeAhead){if(i.setShowSuggestion){i.setShowSuggestion(true);}}if(O){k.attachValueListChanged(O);}this._aProviders.push(k);}}};f.prototype.getAttribute=function(n){var i=this._oParent.getBindingInfo(n);if(i){return this._oBinding.toBindingPath(i);}return this._oParent["get"+n.substring(0,1).toUpperCase()+n.substring(1)]();};f.prototype.createAttributes=function(A,t,n,E){var g=this,m={};for(var p in n){if(n.hasOwnProperty(p)){var o=this._oParent.getBindingInfo(p);if(o){m[p]=this._oBinding.toBinding(o);}else if((p==="valueState")&&this._oParent.isPropertyInitial("valueState")){o=this.getValueStateBindingInfoForRecommendationStateAnnotation();if(o){m[p]=o;}else{m[p]=this._oParent["get"+d(p)]();}}else{m[p]=this._oParent["get"+d(p)]();}}}if(A){m[A]={model:this._oMetaData.model,path:this._oMetaData.path,type:t?this._oTypes.getType(t):null};}if(E){m[E.event]=function(h){try{var P=h.getParameters();var i={value:P[E.parameter],newValue:P[E.parameter]};g._oParent.fireChange(i);}catch(j){L.warning(j);}};}this.addObjectBinding(m);return m;};f.prototype.mapBindings=function(A,N){var n,i;for(n in N){i=this._oParent.getBindingInfo(n);if(i){A[N[n]]=this._oBinding.toBinding(i);}else{A[N[n]]=this._oParent["get"+n.substring(0,1).toUpperCase()+n.substring(1)]();}}};f.prototype.addObjectBinding=function(A,o){if(!o){o=this._oParent.getObjectBinding(this._oMetaData.model);}if(A&&o){A.objectBindings={};A.objectBindings[this._oMetaData.model]=o.sPath;}};f.prototype.getFormatSettings=function(s){var m=null,g,o,h;if(s){m=this._oParent.data(s);if(!m){g=this._oParent.getCustomData();if(g){h=g.length;while(h--){o=g[h];if(o.getKey()===s){m=o.getValue();break;}}}}if(m&&typeof(m)==="string"){try{m=JSON.parse(m);}catch(i){return null;}}}return m;};f.prototype.destroyValueHelp=function(){this._aProviders.forEach(function(p){p.destroy();});this._aProviders=[];};f.prototype.destroy=function(){this.destroyValueHelp();if(this._oBinding){this._oBinding.destroy();}this._oBinding=null;this._oParent=null;this._oModel=null;this._oRb=null;};return f;},true);
