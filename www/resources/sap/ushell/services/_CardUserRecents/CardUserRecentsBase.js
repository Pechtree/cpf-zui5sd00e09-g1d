// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/integration/services/Data"],function(D){"use strict";var C=D.extend(function(){this.oUserRecents=sap.ushell.Container.getService("UserRecents");this.oURLParsing=sap.ushell.Container.getService("URLParsing");});C.prototype._getActivitiesAsCardItems=function(a){var c=[];var s={};for(var i=0;i<a.length;i++){s=this.oURLParsing.parseShellHash(a[i].url);if(s){c.push({Name:a[i].title,Description:a[i].appType,Icon:a[i].icon,Intent:{SemanticObject:s.semanticObject,Action:s.action,Parameters:s.params}});}else if(a[i].url&&a[i].url!==""){c.push({Name:a[i].title,Description:a[i].url,Icon:a[i].icon,Url:a[i].url});}}return c;};return C;},true);