// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/integration/services/Navigation","sap/ushell/EventHub","sap/ushell/Config","sap/base/Log"],function(N,E,C,U){"use strict";var a=N.extend(function(){this.oCrossAppNav=sap.ushell.Container.getService("CrossApplicationNavigation");});a.prototype.navigate=function(c){var p=c.parameters;if(p.openDialog){if(p.openDialog==="RecentActivities"||p.openDialog==="FrequentActivities"){sap.ui.require(["sap/ushell/ui/fiori3/QuickAccess"],function(Q){var t=p.openDialog==="RecentActivities"?"recentActivityFilter":"frequentlyUsedFilter";Q.openQuickAccessDialog(t);});}else{U.error("Request to open unknown dialog: '"+p.openDialog+"'");}}else if(p.url&&p.url!==""){var l=C.last("/core/shell/enableRecentActivity")&&C.last("/core/shell/enableRecentActivityLogging");if(l){var r={title:p.title,url:p.url,appType:"App",appId:p.url};sap.ushell.Container.getRenderer("fiori2").logRecentActivity(r);}window.open(p.url,"_blank");}else{this.oCrossAppNav.toExternal({target:{semanticObject:p.intentSemanticObject,action:p.intentAction},params:p.intentParameters});}};a.prototype.enabled=function(c){var p=c.parameters;if(p.openDialog){if(C.last("/core/shell/enableFiori3")&&["RecentActivities","FrequentActivities"].indexOf(p.openDialog)>-1){return Promise.resolve(true);}return Promise.resolve(false);}var n={target:{semanticObject:p.intentSemanticObject,action:p.intentAction},params:p.intentParameters};return new Promise(function(r){this.oCrossAppNav.isNavigationSupported([n]).done(function(R){r(R[0].supported);}).fail(function(){r(false);});}.bind(this));};a.hasNoAdapter=true;return a;},true);