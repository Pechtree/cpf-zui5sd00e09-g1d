/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Item','sap/ui/core/IconPool'],function(l,I,a){"use strict";var S=I.extend("sap.m.SuggestionItem",{metadata:{library:"sap.m",properties:{icon:{type:"string",group:"Appearance",defaultValue:""},description:{type:"string",group:"Data",defaultValue:""}}}});a.insertFontFaceStyle();function r(R,t,s){var i;if(t){i=t.toUpperCase().indexOf(s.toUpperCase());if(i>-1){R.writeEscaped(t.slice(0,i));R.write("<b>");R.writeEscaped(t.slice(i,i+s.length));R.write("</b>");t=t.substring(i+s.length);}R.writeEscaped(t);}}S.prototype.render=function(R,i,s,b){var c=R;var t=i.getText();var d=i.getIcon();var e="";var f=i.getDescription();var p=i.getParent();var g=p&&p.getSuggestionItems&&p.getSuggestionItems()||[];var h=g.indexOf(i);s=s||"";c.write("<li");c.writeElementData(i);c.addClass("sapMSuLI");c.addClass("sapMSelectListItem");c.addClass("sapMSelectListItemBase");c.addClass("sapMSelectListItemBaseHoverable");c.writeAttribute("role","option");c.writeAttribute("aria-posinset",h+1);c.writeAttribute("aria-setsize",g.length);if(b){c.addClass("sapMSelectListItemBaseSelected");c.writeAttribute("aria-selected","true");if(p){p.$("I").attr("aria-activedecendant",i.getId());}}c.writeClasses();c.write(">");if(d){c.writeIcon(d,"sapMSuggestionItemIcon",{});}if(t){r(c,t,s);e=" ";}if(f){c.write(e+"<i>");r(c,f,s);c.write("</i>");}c.write("</li>");};S.prototype.getSuggestionText=function(){return this.getText();};S.prototype.invalidate=function(){return undefined;};return S;});
