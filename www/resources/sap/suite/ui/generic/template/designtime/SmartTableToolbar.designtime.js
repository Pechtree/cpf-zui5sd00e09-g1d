sap.ui.define(["sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils","sap/suite/ui/generic/template/designtime/utils/DesigntimeUtils","sap/suite/ui/generic/template/designtime/virtualProperties/ColumnType","sap/suite/ui/generic/template/designtime/library.designtime"],function(U,D,C){"use strict";var L="com.sap.vocabularies.UI.v1.LineItem";var r=sap.ui.getCore().getModel("i18nDesigntime").getResourceBundle();var g=function(b){var R=U.getLineItemRecordIndexForButton(b),t;if(R>-1){var m=b.getModel().getMetaModel();var e=U.getEntityType(b);var E=e&&m.getODataEntityType(e);if(E){t=E.namespace+"."+E.name+"/"+L+"/"+R;}}return{target:t,annotation:L,qualifier:null};};var a=function(s,p){var A=[];if(s.getParent().getId().indexOf("--template::ListReport::TableToolbar")>-1){A=s.getParent().getContent();}else{A=s.getContent();}var c="addToolbarActionButton";return D.addSettingsHandler(s,p,A,c);};return{'default':{},'strict':{name:{singular:function(){return r.getText("FE_TOOLBAR");}},properties:function(e){return D.ignoreAllProperties(e);},links:{developer:[{href:"/topic/8ba009d7b8434dc1a4948c9211e30c40.html",text:function(){return r.getText("FE_SDK_LRP_ACTION");}}],guidelines:[{href:"/table-bar/",text:function(){return r.getText("FE_TOOLBAR_GUIDE");}}]},actions:{settings:{name:"Add Action Button",handler:a,icon:"sap-icon://add"}},aggregations:{content:{propagateRelevantContainer:true,name:{singular:function(){return r.getText("FE_TOOLBAR");}},propagateMetadata:function(e){switch(e.getMetadata().getElementName()){case"sap.m.ToolbarSeparator":case"sap.m.ToolbarSpacer":case"sap.m.Title":case"sap.ui.comp.smartvariants.SmartVariantManagement":return{actions:null,properties:function(e){return D.ignoreAllProperties(e);}};case"sap.m.MenuButton":case"sap.m.OverflowToolbarButton":return{name:{singular:function(){return r.getText("FE_BUTTON");}},actions:null,properties:function(e){return D.ignoreAllProperties(e);},annotations:{importance:{ignore:true}}};case"sap.m.Button":var b=/.+(sap.suite.ui.generic.template.ListReport.view.ListReport::).+(--deleteEntry)$/;if(b.test(e.getId())){return{actions:null,properties:function(e){return D.getButtonProperties(e);}};}return{getCommonInstanceData:function(e){return g(e);},getLabel:function(e){return e.getText();},properties:function(e){return D.ignoreAllProperties(e);},actions:{rename:null,remove:{changeType:"removeToolbarActionButton",changeOnRelevantContainer:true},reveal:{changeType:"revealToolbarActionButton",changeOnRelevantContainer:true},settings:{name:"Add Action Button",handler:a,icon:"sap-icon://add"}},annotations:{dataFieldForAction:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataFieldForAction",whiteList:{properties:["Action","Label","Criticality","InvocationGrouping"]},ignore:function(){var R=U.getLineItemRecordForButton(e);return!R||R.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForAction";},appliesTo:["Button"],links:{developer:[{href:"/topic/b623e0bbbb2b4147b2d0516c463921a0",text:function(){return r.getText("FE_SDK_GUIDE_TABLE_ACTION");}}]}},dataFieldForIBN:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataFieldForIntentBasedNavigation",whiteList:{properties:["Action","Label","Criticality","SemanticObject"]},ignore:function(){var R=U.getLineItemRecordForButton(e);return!R||R.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";},appliesTo:["Button"]},importance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",defaultValue:null,target:["Record"],ignore:function(){var c=C.getColumnType(e);return c===undefined;},links:{developer:[{href:"/topic/69efbe747fc44c0fa445b24ed369cb1e",text:function(){return r.getText("FE_SDK_GUIDE_RESPONSIVENESS");}},{href:"/api/sap.ui.comp.smarttable.SmartTable/annotations/Importance",text:function(){return r.getText("FE_API_SMART_TABLE_ANNOTATIONS");}}]}}}};default:return{actions:null};}},actions:{move:function(e){switch(e.getMetadata().getElementName()){case"sap.m.ToolbarSeparator":case"sap.m.ToolbarSpacer":case"sap.m.Title":case"sap.m.OverflowToolbarButton":case"sap.m.MenuButton":case"sap.ui.comp.smartvariants.SmartVariantManagement":return null;case"sap.m.Button":var b=/.+(sap.suite.ui.generic.template.ListReport.view.ListReport::).+(--deleteEntry)$/;if(b.test(e.getId())){return null;}return"moveToolbarActionButtons";}}}}}}};});
