// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/appRuntime/ui5/AppRuntimeService"],function(A){"use strict";function R(){sap.ushell=sap.ushell||{};sap.ushell.renderers=sap.ushell.renderers||{};sap.ushell.renderers.fiori2=sap.ushell.renderers.fiori2||{};sap.ushell.renderers.fiori2.Renderer=this;};R.prototype.showHeaderItem=function(i,c,s){A.sendMessageToOuterShell("sap.ushell.services.renderer.showHeaderItem",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.showToolAreaItem=function(i,c,s){A.sendMessageToOuterShell("sap.ushell.services.renderer.showHeaderItem",{"sId":i,"bCurrentState":c,"aStates":s});};R.prototype.showActionButton=function(i,c,s,I){A.sendMessageToOuterShell("sap.ushell.services.renderer.showActionButton",{"aIds":i,"bCurrentState":c,"aStates":s,"bIsFirst":I});};R.prototype.showFloatingActionButton=function(i,c,s){A.sendMessageToOuterShell("sap.ushell.services.renderer.showFloatingActionButton",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.showHeaderEndItem=function(i,c,s){A.sendMessageToOuterShell("sap.ushell.services.renderer.showHeaderEndItem",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.setHeaderVisibility=function(v,c,s){A.sendMessageToOuterShell("sap.ushell.services.renderer.setHeaderVisibility",{"bVisible":v,"bCurrentState":c,"aStates":s});};R.prototype.showSubHeader=function(i,c,s){A.sendMessageToOuterShell("sap.ushell.services.renderer.showSubHeader",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.setFooter=function(f){};R.prototype.setShellFooter=function(p){jQuery.sap.log.warning("Renderer.js - function setShellFooter(...) is not supported to run via iFrame");var c,a=p.controlType,d=new jQuery.Deferred();if(a){var C=a.replace(/\./g,"/");sap.ui.require([C],function(b){c=new b(p.oControlProperties);d.resolve(c);});}return d.promise();};R.prototype.setFooterControl=function(c,C){jQuery.sap.log.warning("Renderer.js - function setFooterControl(...) is not supported to run via iFrame");var s=c.replace(/\./g,"/"),a=sap.ui.require(s);return new a(C);};R.prototype.hideHeaderItem=function(i,c,s){jQuery.sap.log.warning("Renderer.js - function hideHeaderItem(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.hideHeaderItem",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.removeToolAreaItem=function(i,c,s){jQuery.sap.log.warning("Renderer.js - function removeToolAreaItem(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.hideHeaderItem",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.hideActionButton=function(i,c,s){jQuery.sap.log.warning("Renderer.js - function hideActionButton(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.hideActionButton",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.hideLeftPaneContent=function(i,c,s){jQuery.sap.log.warning("Renderer.js - function hideLeftPaneContent(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.hideLeftPaneContent",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.hideFloatingActionButton=function(i,c,s){jQuery.sap.log.warning("Renderer.js - function hideFloatingActionButton(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.hideLeftPaneContent",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.hideHeaderEndItem=function(i,c,s){jQuery.sap.log.warning("Renderer.js - function hideHeaderEndItem(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.hideHeaderEndItem",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.hideSubHeader=function(i,c,s){jQuery.sap.log.warning("Renderer.js - function hideSubHeader(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.hideSubHeader",{"aIds":i,"bCurrentState":c,"aStates":s});};R.prototype.removeFooter=function(){jQuery.sap.log.warning("Renderer.js - function removeFooter() is not supported to run via iFrame");};R.prototype.getCurrentViewportState=function(){jQuery.sap.log.warning("Renderer.js - function getCurrentViewportState() is not supported to run via iFrame");return"";};R.prototype.addShellSubHeader=function(p){jQuery.sap.log.warning("Renderer.js - function addShellSubHeader(...) is not supported to run via iFrame");var d=new jQuery.Deferred(),c,C,a=p.controlType,o=p.oControlProperties;if(a){c=a.replace(/\./g,"/");sap.ui.require([c],function(b){C=new b(o);d.resolve(C);});}else{jQuery.sap.log.warning("You must specify control type in order to create it");}return d.promise();};R.prototype.addSubHeader=function(c,C,i,b,s){jQuery.sap.log.warning("Renderer.js - function addSubHeader(...) is not supported to run via iFrame");var a=c.replace(/\./g,"/"),d=sap.ui.require(a);if(c){return new d(C);}};R.prototype.addUserAction=function(p){jQuery.sap.log.warning("Renderer.js - function addUserAction(...) is not supported to run via iFrame");var d=new jQuery.Deferred(),c,C,a=p.controlType,o=p.oControlProperties,n;if(a){if(a==="sap.m.Button"){a="sap.ushell.ui.launchpad.ActionItem";}c=a.replace(/\./g,"/");sap.ui.require([c],function(b){C=new b(o);d.resolve(C);});}else{n="You must specify control type in order to create it";jQuery.sap.log.warning(n);d.reject(n);}return d.promise();};R.prototype.addActionButton=function(c,C,i,b,s,I){jQuery.sap.log.warning("Renderer.js - function addActionButton(...) is not supported to run via iFrame");var a,d;if(c==="sap.m.Button"){c="sap.ushell.ui.launchpad.ActionItem";}a=c.replace(/\./g,"/");d=sap.ui.require(a);return new d(C);};R.prototype.addFloatingButton=function(p){jQuery.sap.log.warning("Renderer.js - function addFloatingButton(...) is not supported to run via iFrame");var d=new jQuery.Deferred(),c,C,a=p.controlType,o=p.oControlProperties;if(a){c=a.replace(/\./g,"/");}else{c="sap/m/Button";}sap.ui.require([c],function(b){C=new b(o);d.resolve(C);});return d.promise();};R.prototype.addFloatingActionButton=function(c,C,i,b,s){jQuery.sap.log.warning("Renderer.js - function addFloatingActionButton(...) is not supported to run via iFrame");var a,d;if(!c){c="sap.m.Button";}a=c.replace(/\./g,"/");d=sap.ui.require(a);return new d(C);};R.prototype.addSidePaneContent=function(p){jQuery.sap.log.warning("Renderer.js - function addSidePaneContent(...) is not supported to run via iFrame");var d=new jQuery.Deferred(),c,C,a=p.controlType,o=p.oControlProperties;if(a){c=a.replace(/\./g,"/");sap.ui.require([c],function(b){C=new b(o);d.resolve(C);});}else{jQuery.sap.log.warning("You must specify control type in order to create it");}return d.promise();};R.prototype.addLeftPaneContent=function(c,C,i,b,s){jQuery.sap.log.warning("Renderer.js - function addLeftPaneContent(...) is not supported to run via iFrame");var a=c.replace(/\./g,"/"),d=sap.ui.require(a);return new d(C);};R.prototype.addHeaderItem=function(c,C,i,b,s){jQuery.sap.log.warning("Renderer.js - function addHeaderItem(...) is not supported to run via iFrame");};R.prototype.addToolAreaItem=function(c,i,C,s){jQuery.sap.log.warning("Renderer.js - function addToolAreaItem(...) is not supported to run via iFrame");};R.prototype.addHeaderEndItem=function(c,C,i,b,s){jQuery.sap.log.warning("Renderer.js - function addHeaderEndItem(...) is not supported to run via iFrame");};R.prototype.addEndUserFeedbackCustomUI=function(c,s){jQuery.sap.log.warning("Renderer.js - function addEndUserFeedbackCustomUI(...) is not supported to run via iFrame");};R.prototype.addUserPreferencesEntry=function(e){jQuery.sap.log.warning("Renderer.js - function addUserPreferencesEntry(...) is not supported to run via iFrame");};R.prototype.setHeaderTitle=function(t,c,C){jQuery.sap.log.warning("Renderer.js - function setHeaderTitle(...) is not supported to run via iFrame");};R.prototype.setLeftPaneVisibility=function(l,v){jQuery.sap.log.warning("Renderer.js - function setLeftPaneVisibility(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.setLeftPaneVisibility",{"sLaunchpadState":l,"bVisible":v});};R.prototype.showToolArea=function(l,v){jQuery.sap.log.warning("Renderer.js - function showToolArea(...) is not supported to run via iFrame");A.sendMessageToOuterShell("sap.ushell.services.renderer.showToolArea",{"sLaunchpadState":l,"bVisible":v});};R.prototype.LaunchpadState={App:"app",Home:"home"};return new R();},false);
