// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils"],function(u){"use strict";var a={"sap.ushell.appRuntime":{oInboundActions:{"hashChange":{executeServiceCallFn:function(s){var h=s.oMessageData.body.sHash;if(h&&h.length>0){window.hasher.replaceHash(h);}return new jQuery.Deferred().resolve().promise();}},"setDirtyFlag":{executeServiceCallFn:function(s){var i=s.oMessageData.body.bIsDirty;if(i!==sap.ushell.Container.getDirtyFlag()){sap.ushell.Container.setDirtyFlag(i);}return new jQuery.Deferred().resolve().promise();}},"themeChange":{executeServiceCallFn:function(s){var c=s.oMessageData.body.currentThemeId;sap.ui.getCore().applyTheme(c);return new jQuery.Deferred().resolve().promise();}}}}};function A(){this.getHandlers=function(){return a;};this.registerCommunicationHandler=function(k,c){var C=a[k];if(!C){C=a[k]={oInboundActions:{}};}if(c.oInboundActions){Object.keys(c.oInboundActions).forEach(function(b){C.oInboundActions[b]=c.oInboundActions[b];});}};this._getPostMesageInterface=function(s,i){var c=a[s],I=undefined;if(c&&c.oRequestCalls&&c.oRequestCalls[i]){I=c.oRequestCalls[i];}return I;};}return new A();},false);
