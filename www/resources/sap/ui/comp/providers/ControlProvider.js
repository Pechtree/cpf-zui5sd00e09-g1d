/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/m/CheckBox','sap/m/DatePicker','sap/m/TimePicker','sap/m/HBox','sap/m/Input','sap/m/Text','sap/m/ObjectIdentifier','sap/m/ObjectStatus','sap/m/Image','sap/m/Link','sap/m/VBox','sap/m/FlexItemData','sap/m/library','sap/ui/comp/navpopover/SmartLink','sap/ui/comp/odata/MetadataAnalyser','sap/ui/comp/smartfield/ODataHelper','sap/ui/comp/smartfield/SmartField','sap/ui/comp/odata/ODataType','sap/ui/comp/odata/CriticalityMetadata','sap/ui/comp/util/FormatUtil','sap/ui/comp/util/MultiCurrencyUtil','sap/ui/core/Control','sap/ui/comp/navpopover/SemanticObjectController','sap/ui/comp/navpopover/NavigationPopoverHandler','./ValueHelpProvider','./ValueListProvider'],function(C,D,T,H,I,a,O,b,c,L,V,F,M,S,d,e,f,g,h,j,k,l,m,N,n,o){"use strict";var p;var q=function(P){if(P){this._oParentODataModel=P.model;this._oMetadataAnalyser=P.metadataAnalyser;this._aODataFieldMetadata=P.fieldsMetadata;this._oLineItemAnnotation=P.lineItemAnnotation;this._oSemanticKeyAnnotation=P.semanticKeyAnnotation;this._smartTableId=P.smartTableId;this._bProcessDataFieldDefault=P.processDataFieldDefault;this._isAnalyticalTable=P.isAnalyticalTable;this._isMobileTable=P.isMobileTable;this._oDateFormatSettings=P.dateFormatSettings;this._bEnableDescriptions=P.enableDescriptions;this._oCurrencyFormatSettings=P.currencyFormatSettings;this._oDefaultDropDownDisplayBehaviour=P.defaultDropDownDisplayBehaviour||"descriptionAndId";this.useSmartField=P.useSmartField==="true";this.useSmartToggle=P.useSmartToggle==="true";this._sEntitySet=P.entitySet;this._oSemanticKeyAdditionalControl=P._semanticKeyAdditionalControl;this._oSemanticObjectController=P.semanticObjectController;}if(!this._oMetadataAnalyser&&this._oParentODataModel){this._oMetadataAnalyser=new d(this._oParentODataModel);this._intialiseMetadata();}this._mSmartField={};this._oHelper=new e(this._oMetadataAnalyser.oModel);this._aValueListProvider=[];this._aValueHelpProvider=[];this._aLinkHandlers=[];};q.prototype._intialiseMetadata=function(){if(!this._aODataFieldMetadata){this._aODataFieldMetadata=this._oMetadataAnalyser.getFieldsByEntitySetName(this.sEntity);}};q.prototype.getFieldViewMetadata=function(i,r){var s=this._createFieldMetadata(i);this._createFieldTemplate(s,r);return s;};q.prototype._createFieldTemplate=function(v,i){if(this.useSmartField){v.template=new f({value:{path:v.name},entitySet:this._sEntitySet,contextEditable:{path:"sm4rtM0d3l>/editable",mode:"OneWay"},controlContext:this._isMobileTable?"responsiveTable":"table",wrapping:this._isMobileTable});if(g.isNumeric(v.type)||g.isDateOrTime(v.type)||v.isCalendarDate){v.template.setTextAlign("Right");v.template.setWidth("100%");}this._completeSmartField(v);v.template._setPendingEditState(i);}if(this.useSmartToggle){v.template=new p({editable:{path:"sm4rtM0d3l>/editable",mode:"OneWay"},edit:this.useSmartField?v.template:this._createEditableTemplate(v),display:this._createDisplayOnlyTemplate(v)});}else if(!this.useSmartField){v.template=i?this._createEditableTemplate(v):this._createDisplayOnlyTemplate(v);}};q.prototype._completeSmartField=function(v){var i={annotations:{},path:v.name};if(!this._mSmartField.entitySetObject){this._mSmartField.entitySetObject=this._oHelper.oMeta.getODataEntitySet(this._sEntitySet);this._mSmartField.entityType=this._oHelper.oMeta.getODataEntityType(this._mSmartField.entitySetObject.entityType);}i.modelObject=this._oParentODataModel;i.entitySetObject=this._mSmartField.entitySetObject;i.entitySet=this._mSmartField.entitySetObject;i.entityType=this._mSmartField.entityType;this._oHelper.getProperty(i);v.fieldControlProperty=this._oHelper.oAnnotation.getFieldControlPath(i.property.property);if(v.fieldControlProperty&&v.parentPropertyName){v.fieldControlProperty=v.parentPropertyName+"/"+v.fieldControlProperty;}i.annotations.uom=this._oHelper.getUnitOfMeasure2(i);i.annotations.text=this._oHelper.getTextProperty2(i);i.annotations.lineitem=this._oLineItemAnnotation;i.annotations.semantic=d.getSemanticObjectsFromProperty(i.property.property);this._oHelper.getUOMTextAnnotation(i);if(i.property.property["sap:value-list"]||i.property.property["com.sap.vocabularies.Common.v1.ValueList"]){i.annotations.valuelist=this._oHelper.getValueListAnnotationPath(i);if(i.property.property["sap:value-list"]){i.annotations.valuelistType=i.property.property["sap:value-list"];}else{i.annotations.valuelistType=this._oMetadataAnalyser.getValueListSemantics(i.property.property["com.sap.vocabularies.Common.v1.ValueList"]);}}this._oHelper.getUOMValueListAnnotationPath(i);delete i.entitySet;v.template.data("configdata",{"configdata":i});v.template.data("dateFormatSettings",this._oDateFormatSettings);v.template.data("currencyFormatSettings",this._oCurrencyFormatSettings);v.template.data("defaultDropDownDisplayBehaviour",this._oDefaultDropDownDisplayBehaviour);if(i.annotations.uom||g.isNumeric(v.type)||g.isDateOrTime(v.type)||v.isCalendarDate){var A=v.template.getTextAlign();if(A==="Initial"){A="Right";}v.align=A;}q._createModelTypeInstance(v,this._oDateFormatSettings);};q.prototype._createEditableTemplate=function(v,B){var t=null,i;var r=v.type==="Edm.DateTime"&&v.displayFormat==="Date";if(r||v.isCalendarDate){t=new D({dateValue:{path:v.name}});}else if(v.type==="Edm.Boolean"){t=new C({selected:{path:v.name}});}i=q._createModelTypeInstance(v,this._oDateFormatSettings);if(v.semanticObjects&&(!B)){t=this._createSmartLinkFieldTemplate(v,i,function(){return this._createEditableTemplate(v,true);}.bind(this));}if(!t){if(v.type==="Edm.Time"){t=new T({value:{path:v.name,type:i}});}else{t=new I({value:{path:v.name,type:i}});if(v.unit){t.bindProperty("description",{path:v.unit});t.setTextAlign("Right");t.setTextDirection("LTR");t.setFieldWidth("80%");}else if(this._bEnableDescriptions&&v.description){t.bindProperty("description",{path:v.description});}else if(g.isNumeric(v.type)||g.isDateOrTime(v.type)||v.isCalendarDate){t.setTextAlign("Right");t.setTextDirection("LTR");}if(v.hasValueListAnnotation){this._associateValueHelpAndSuggest(t,v);}}}return t;};q.prototype._associateValueHelpAndSuggest=function(i,r){i.setShowValueHelp(true);this._aValueHelpProvider.push(new n({loadAnnotation:true,fullyQualifiedFieldName:r.fullName,metadataAnalyser:this._oMetadataAnalyser,control:i,model:this._oParentODataModel,preventInitialDataFetchInValueHelpDialog:true,dateFormatSettings:this._oDateFormatSettings,takeOverInputValue:false,fieldName:r.fieldName,type:r.type,maxLength:r.maxLength,displayFormat:r.displayFormat,displayBehaviour:r.displayBehaviour,title:r.label}));i.setShowSuggestion(true);i.setFilterSuggests(false);this._aValueListProvider.push(new o({loadAnnotation:true,fullyQualifiedFieldName:r.fullName,metadataAnalyser:this._oMetadataAnalyser,control:i,model:this._oParentODataModel,dateFormatSettings:this._oDateFormatSettings,typeAheadEnabled:true,aggregation:"suggestionRows",displayFormat:r.displayFormat,displayBehaviour:r.displayBehaviour}));};q.prototype._createDisplayOnlyTemplate=function(v,B){var t=null,i=null,A,r;i=q._createModelTypeInstance(v,this._oDateFormatSettings);if(g.isNumeric(v.type)||g.isDateOrTime(v.type)||v.isCalendarDate){A="Right";}if(this._isMobileTable){if(v.isImageURL){t=new c({src:{path:v.name},width:"3em",height:"3em"});}else if(this._oSemanticKeyAnnotation&&this._oSemanticKeyAnnotation.semanticKeyFields&&this._oSemanticKeyAnnotation.semanticKeyFields.indexOf(v.name)>-1){t=this._createObjectIdentifierTemplate(v,i,this._oSemanticKeyAnnotation.semanticKeyFields.indexOf(v.name)===0);}}if(v.urlInfo){t=this._createLink(v,i,v.urlInfo);}else if(v.criticalityInfo){t=this._createObjectStatusTemplate(v,i,v.criticalityInfo);}if(!t){if(v.semanticObjects&&(!B)){t=this._createSmartLinkFieldTemplate(v,i,function(){return this._createDisplayOnlyTemplate(v,true);}.bind(this));}else if(v.unit){t=this._createMeasureFieldTemplate(v,i);}else if(v.isEmailAddress||v.isPhoneNumber){t=this._createEmailOrPhoneLink(v,i);}else{r=this._getDefaultBindingInfo(v,i);t=new a({wrapping:this._isMobileTable,textAlign:A,text:r});}}v.align=A;return t;};q._createModelTypeInstance=function(v,i){var r,s;var t=v.type==="Edm.DateTime"&&v.displayFormat==="Date";if(t||v.isCalendarDate){r=i;s={displayFormat:"Date"};}else if(v.type==="Edm.Decimal"){s={precision:v.precision,scale:v.scale};}else if(v.type==="Edm.String"){s={isDigitSequence:v.isDigitSequence};}s=Object.assign({},s,{maxLength:v.maxLength});if(v.type=="Edm.DateTime"){v.modelType=g.getType(v.type,r,s,v.isCalendarDate);v.modelType.formatValue(new Date(),"string");v.modelType.oFormat.oFormatOptions.UTC=false;return g.getType(v.type,r,s,v.isCalendarDate);}v.modelType=g.getType(v.type,r,s,v.isCalendarDate);return v.modelType;};q.prototype._createEmailOrPhoneLink=function(v,t){var i=new L({text:this._getDefaultBindingInfo(v,t),wrapping:this._isMobileTable,press:function(E){var s=E.getSource().getText();if(v.isEmailAddress){M.URLHelper.triggerEmail(s);}else if(v.isPhoneNumber){M.URLHelper.triggerTel(s);}}});return i;};q.prototype._getDefaultBindingInfo=function(v,t){var B={path:v.name,type:t};if(this._bEnableDescriptions&&v.description){B={parts:[{path:v.name,type:t},{path:v.description}],formatter:function(i,s){return j.getFormattedExpressionFromDisplayBehaviour(v.displayBehaviour,i,s);}};}return B;};q.prototype._createLink=function(v,t,i){var r=null;v.linkProperties=i.parameters||i.urlPath;if(i.urlPath){r={path:i.urlPath};}else if(i.urlTarget){r=i.urlTarget;}return new L({text:this._getDefaultBindingInfo(v,t),wrapping:this._isMobileTable,href:r});};q.prototype._createObjectIdentifierTemplate=function(v,t,i){var r,s,u,w,x,y;var z=this;var A=function(B){if(z._oSemanticObjectController&&z._oSemanticObjectController.getForceLinkRendering()&&z._oSemanticObjectController.getForceLinkRendering()[v.name]){return true;}var E=v.semanticObjects.additionalSemanticObjects.concat(v.semanticObjects.defaultSemanticObject);return m.hasDistinctSemanticObject(E,B);};if(v.semanticObjects){m.getDistinctSemanticObjects().then(function(B){if(A(B)){y=new N({semanticObject:v.semanticObjects.defaultSemanticObject,additionalSemanticObjects:v.semanticObjects.additionalSemanticObjects,semanticObjectLabel:v.label,fieldName:v.name,semanticObjectController:z._oSemanticObjectController,navigationTargetsObtained:function(E){var r=sap.ui.getCore().byId(E.getSource().getControl());var G=E.getParameters().mainNavigation;if(G){G.setDescription(r.getText());}E.getParameters().show(r.getTitle(),G,undefined,undefined);}});z._aLinkHandlers.push(y);}});}if(v.description){switch(v.displayBehaviour){case"descriptionAndId":s=v.description;u=v.name;w=t;break;case"idAndDescription":s=v.name;u=v.description;x=t;break;case"idOnly":s=v.name;w=t;break;default:s=v.description;break;}}else{s=v.name;x=t;}r=new O({title:s?{path:s,type:x}:undefined,text:u?{path:u,type:w}:undefined,titleActive:v.semanticObjects?{path:"$sapuicompcontrolprovider_distinctSO>/distinctSemanticObjects",formatter:function(B){return A(B);}}:false,titlePress:function(E){if(y){y.setControl(E.getSource());y.openPopover(E.getParameter("domRef"));}}});r.attachEvent("ObjectIdentifier.designtime",function(E){if(y){y.setControl(E.getSource());E.getParameters().registerNavigationPopoverHandler(y);}});r.setModel(m.getJSONModel(),"$sapuicompcontrolprovider_distinctSO");if(this._oSemanticKeyAdditionalControl&&i){this._bSemanticKeyAdditionalControlUsed=true;return new V({renderType:"Bare",items:[r,this._oSemanticKeyAdditionalControl]}).addStyleClass("sapMTableContentMargin");}return r;};q.prototype._createObjectStatusTemplate=function(v,t,i){var s,r,u,B;u=h.getShowCriticalityIcon(i.criticalityRepresentationType);if(i.path){v.criticality=i.path;s={path:i.path,formatter:h.getCriticalityState};if(i.criticalityRepresentationPath){v.criticalityRepresentation=i.criticalityRepresentationPath;r={parts:[{path:i.path},{path:i.criticalityRepresentationPath}],formatter:function(w,x){return h.getShowCriticalityIcon(x)?h.getCriticalityIcon(w):undefined;}};}else if(u){r={path:i.path,formatter:h.getCriticalityIcon};}}else{s=h.getCriticalityState(i.criticalityType);if(i.criticalityRepresentationPath){v.criticalityRepresentation=i.criticalityRepresentationPath;r={path:i.criticalityRepresentationPath,formatter:function(w){return h.getShowCriticalityIcon(w)?h.getCriticalityIcon(i.criticalityType):undefined;}};}else if(u){r=h.getCriticalityIcon(i.criticalityType);}}if(v.unit){B={parts:[{path:v.name,type:t},{path:v.unit}],formatter:v.isCurrencyField?j.getInlineAmountFormatter():j.getInlineMeasureUnitFormatter(),useRawValues:v.isCurrencyField};}else{B=this._getDefaultBindingInfo(v,t);}return new b({text:B,state:s,icon:r});};q.prototype._createSmartLinkFieldTemplate=function(v,t,i){var B=v.unit?{parts:[{path:v.name,type:t},{path:v.unit}],formatter:v.isCurrencyField?j.getAmountCurrencyFormatter():j.getMeasureUnitFormatter(),useRawValues:true}:this._getDefaultBindingInfo(v,t);var r=new S({semanticObject:v.semanticObjects.defaultSemanticObject,additionalSemanticObjects:v.semanticObjects.additionalSemanticObjects,semanticObjectLabel:v.label,fieldName:v.name,text:B,uom:v.unit?{path:v.unit}:undefined,wrapping:this._isMobileTable,semanticObjectController:this._oSemanticObjectController,navigationTargetsObtained:function(E){var s=this.getBinding("text");if(!s||!Array.isArray(s.getValue())||v.unit){E.getParameters().show();return;}var u=s.getValue();var w=j.getTextsFromDisplayBehaviour(v.displayBehaviour,u[0],u[1]);var x=E.getParameters().mainNavigation;if(x){x.setDescription(w.secondText);}E.getParameters().show(w.firstText,x,undefined,undefined);}});r.setCreateControlCallback(i);return r;};q.prototype._createMeasureFieldTemplate=function(v,t){var i,A,r,s,u,E=false;E=!!(v.isCurrencyField&&this._oCurrencyFormatSettings&&this._oCurrencyFormatSettings.showCurrencySymbol);s=new a({layoutData:new F({growFactor:1,baseSize:"0%"}),textDirection:"LTR",wrapping:false,textAlign:"End",text:{parts:[{path:v.name,type:t},{path:v.unit}],formatter:v.isCurrencyField?j.getAmountCurrencyFormatter():j.getMeasureUnitFormatter(),useRawValues:v.isCurrencyField}});u=new a({layoutData:new F({shrinkFactor:0}),textDirection:"LTR",wrapping:false,textAlign:"Begin",width:"2.5em",text:{path:v.unit,formatter:E?j.getCurrencySymbolFormatter():undefined}}).addStyleClass("sapUiCompUoMPart");i=new H({renderType:"Bare",justifyContent:"End",items:[s,u]});i.addStyleClass("sapUiCompDirectionLTR");if(v.isCurrencyField&&this._isAnalyticalTable){A=new L({text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTTABLE_MULTI_LINK_TEXT")||"Show Details",visible:{path:v.unit,formatter:k.isMultiCurrency},press:function(w){k.openMultiCurrencyPopover(w,{currency:v.name,unit:v.unit,additionalParent:this.useSmartToggle,smartTableId:this._smartTableId,template:r});}.bind(this)});r=i;r.bindProperty("visible",{path:v.unit,formatter:function(w){return!k.isMultiCurrency(w);}});i=new V({renderType:"Bare",items:[A,r]});}return i;};q.prototype._createFieldMetadata=function(i){var r=Object.assign({},i);r.label=i.fieldLabel||i.name;r.quickInfo=i.quickInfo||r.label;r.displayBehaviour=r.displayBehaviour||this._oDefaultDropDownDisplayBehaviour;r.filterType=this._getFilterType(i);this._updateValueListMetadata(r);this._setAnnotationMetadata(r);if(this._oLineItemAnnotation&&this._oLineItemAnnotation.fields&&this._oLineItemAnnotation.fields.indexOf(i.name)>-1){r.urlInfo=this._oLineItemAnnotation.urlInfo&&this._oLineItemAnnotation.urlInfo[i.name];r.criticalityInfo=this._oLineItemAnnotation.criticality&&this._oLineItemAnnotation.criticality[i.name];}else if(this._bProcessDataFieldDefault){this._oMetadataAnalyser.updateDataFieldDefault(r);}return r;};q.prototype._updateValueListMetadata=function(i){i.hasValueListAnnotation=i["sap:value-list"]!==undefined;if(i.hasValueListAnnotation){i.hasFixedValues=i["sap:value-list"]==="fixed-values";}else if(i["com.sap.vocabularies.Common.v1.ValueList"]){i.hasValueListAnnotation=true;i.hasFixedValues=this._oMetadataAnalyser.getValueListSemantics(i["com.sap.vocabularies.Common.v1.ValueList"])==="fixed-values";}};q.prototype._setAnnotationMetadata=function(i){if(i&&i.fullName){i.semanticObjects=this._oMetadataAnalyser.getSemanticObjectsFromAnnotation(i.fullName);}};q.prototype._getFilterType=function(i){return j._getFilterType(i);};q.prototype.destroy=function(){var r=function(A){var i;if(A){i=A.length;while(i--){A[i].destroy();}}};if(this._oMetadataAnalyser&&this._oMetadataAnalyser.destroy){this._oMetadataAnalyser.destroy();}this._oMetadataAnalyser=null;if(!this._bSemanticKeyAdditionalControlUsed&&this._oSemanticKeyAdditionalControl&&this._oSemanticKeyAdditionalControl.destroy){this._oSemanticKeyAdditionalControl.destroy();}r(this._aValueHelpProvider);this._aValueHelpProvider=null;r(this._aValueListProvider);this._aValueListProvider=null;r(this._aLinkHandlers);this._aLinkHandlers=null;if(this._oHelper){this._oHelper.destroy();}this._oHelper=null;this._mSmartField=null;this._aODataFieldMetadata=null;this._oDateFormatSettings=null;this._oCurrencyFormatSettings=null;this._oDefaultDropDownDisplayBehaviour=null;this._oLineItemAnnotation=null;this._oSemanticKeyAnnotation=null;this._oParentODataModel=null;this.bIsDestroyed=true;};p=l.extend("sap.ui.comp.SmartToggle",{metadata:{library:"sap.ui.comp",properties:{editable:{type:"boolean",defaultValue:false}},aggregations:{edit:{type:"sap.ui.core.Control",multiple:false},display:{type:"sap.ui.core.Control",multiple:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}},renderer:function(r,i){r.write("<span ");r.writeControlData(i);r.addClass("sapUiCompSmartToggle");r.writeClasses();r.write(">");r.renderControl(i.getEditable()?i.getEdit():i.getDisplay());r.write("</span>");}});p.prototype.getFocusDomRef=function(){var i=this.getEditable()?this.getEdit():this.getDisplay();if(i){return i.getFocusDomRef();}return l.prototype.getFocusDomRef.call(this);};p.prototype.getAccessibilityInfo=function(){var i=this.getEditable()?this.getEdit():this.getDisplay();if(i&&i.getAccessibilityInfo){return i.getAccessibilityInfo();}return null;};p.prototype.addAssociation=function(A,i,s){if(A==="ariaLabelledBy"){var E=this.getEdit(),r=this.getDisplay();E&&E.addAssociation(A,i,s);r&&r.addAssociation(A,i,s);}return l.prototype.addAssociation.apply(this,arguments);};p.prototype.removeAssociation=function(A,v,s){if(A==="ariaLabelledBy"){var E=this.getEdit(),i=this.getDisplay();E&&E.removeAssociation(A,v,s);i&&i.removeAssociation(A,v,s);}return l.prototype.removeAssociation.apply(this,arguments);};p.prototype.removeAllAssociation=function(A,s){if(A==="ariaLabelledBy"){var E=this.getEdit(),i=this.getDisplay();E&&E.removeAllAssociation(A,s);i&&i.removeAllAssociation(A,s);}return l.prototype.removeAllAssociation.apply(this,arguments);};return q;},true);
