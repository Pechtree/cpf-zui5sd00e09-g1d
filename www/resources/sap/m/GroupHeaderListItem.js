/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","./library","./ListItemBase","./GroupHeaderListItemRenderer"],function(c,l,L,G){"use strict";var a=l.ListMode;var T=c.TextDirection;var b=L.extend("sap.m.GroupHeaderListItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data",defaultValue:null},count:{type:"string",group:"Data",defaultValue:null},upperCase:{type:"boolean",group:"Appearance",defaultValue:false},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit}}}});b.prototype.getMode=function(){return a.None;};b.prototype.shouldClearLastValue=function(){return true;};b.prototype.getTable=function(){var p=this.getParent();if(p&&p.isA("sap.m.Table")){return p;}};b.prototype.onBeforeRendering=function(){var t=this.getTable();if(t){t.getColumns().forEach(function(C){C.clearLastValue();});this.TagName="tr";}};b.prototype.getAccessibilityType=function(B){var t=this.getTable()?"ROW":"OPTION";return B.getText("LIST_ITEM_GROUP_HEADER")+" "+B.getText("ACC_CTR_TYPE_"+t);};b.prototype.getContentAnnouncement=function(){return this.getTitle();};b.prototype.getGroupAnnouncement=function(){};return b;});
