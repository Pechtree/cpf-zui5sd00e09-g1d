// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/Device","sap/ushell/Config","sap/ushell/UserActivityLog","sap/ushell/components/homepage/ComponentKeysHandler","sap/ushell/renderers/fiori2/AccessKeysHandler","sap/ushell/bootstrap/common/common.load.model","sap/base/Log"],function(D,C,U,a,A,m,L){"use strict";var s={PERS_KEY:"flp.settings.FlpSettings",bFlpSettingsAdded:false,toggleUserActivityLog:function(){C.on("/core/extension/SupportTicket").do(function(c){if(c){U.activate();}else{U.deactivate();}});},initializeAccessKeys:function(){if(D.system.phone){return;}a.init(m.getModel());A.registerAppKeysHandler(a.handleFocusOnMe);},getEffectiveHomepageSetting:function(c,b){var p,d=new jQuery.Deferred(),e=C.last(b)!==false,i=c.split("/").reverse()[0];if(e){p=this._getPersonalization(i);}else{p=jQuery.Deferred().resolve();}p.done(function(v){v=v||C.last(c);if(v!==undefined){C.emit(c,v);}d.resolve(v);});p.fail(function(){var v=C.last(c);d.resolve(v);});return d;},_getPersonalization:function(i){var p=s.getPersonalizer(i,sap.ushell.Container.getRenderer("fiori2"));var P=p.getPersData();P.fail(function(e){L.error("Failed to load "+i+" from the personalization",e,"sap.ushell.components.flp.settings.FlpSettings");});return P;},getPersonalizer:function(i,c){var p=sap.ushell.Container.getService("Personalization");var o=sap.ui.core.Component.getOwnerComponentFor(c);var S={keyCategory:p.constants.keyCategory.FIXED_KEY,writeFrequency:p.constants.writeFrequency.LOW,clientStorageAllowed:true};var P={container:this.PERS_KEY,item:i};return p.getPersonalizer(P,S,o);}};return s;});
