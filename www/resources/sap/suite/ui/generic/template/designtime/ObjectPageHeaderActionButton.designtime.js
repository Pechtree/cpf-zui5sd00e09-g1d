sap.ui.define(["sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils","sap/suite/ui/generic/template/designtime/utils/DesigntimeUtils","./library.designtime"],function(U,D){"use strict";var a=function(t,p){var A=t.getParent().getActions();var c="addHeaderActionButton";return D.addSettingsHandler(t,p,A,c);};var o={getDesigntime:function(e){var r=sap.ui.getCore().getModel("i18nDesigntime").getResourceBundle();var A={name:{singular:function(){return r.getText("FE_OBJECT_PAGE_HEADER_ACTION_BUTTON");}},properties:function(e){return D.getButtonProperties(e);},actions:null};var b=/.+(sap.suite.ui.generic.template.ObjectPage.view.Details::).+(?:--edit|--delete|--relatedApps|--template::Share|--template::NavigationUp|--template::NavigationDown|--fullScreen|--exitFullScreen|--closeColumn)$/;var t=U.getTemplatingInfo(e);if(b.test(e.getId())||!t){return A;}var E={getCommonInstanceData:function(e){var t=U.getTemplatingInfo(e);if(t&&t.path){var T=t.target+'/'+t.path.substr(t.path.indexOf("com.sap.vocabularies.UI.v1.Identification"));return{target:T,annotation:t.annotation,qualifier:null};}},actions:{rename:null,reveal:null,remove:{changeType:"removeHeaderAndFooterActionButton",changeOnRelevantContainer:true},settings:{name:"Add Action Button",handler:a,icon:"sap-icon://add"}},links:{developer:[{href:"/topic/5fe439613f9c4e259015951594c423dc",text:function(){return r.getText("FE_SDK_GUIDE_HEADER_ACTIONS");}}]},annotations:{dataFieldForAction:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataFieldForAction",whiteList:{properties:["Action","Label","Criticality","InvocationGrouping"]},ignore:function(){var T=U.getTemplatingInfo(e);var R=T&&T.annotationContext;return!R||R.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForAction";},links:{developer:[{href:"/topic/5fe439613f9c4e259015951594c423dc",text:function(){return r.getText("FE_SDK_GUIDE_HEADER_ACTIONS");}}]}},importance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",defaultValue:null,target:["Record"],links:{developer:[{href:"/topic/5fe439613f9c4e259015951594c423dc",text:function(){return r.getText("FE_SDK_GUIDE_HEADER_ACTIONS");}}]}}}};return jQuery.extend(true,A,E);}};return o;});
