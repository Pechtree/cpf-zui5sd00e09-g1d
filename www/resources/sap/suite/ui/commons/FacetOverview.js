/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/Device','sap/m/Label','sap/ui/core/ResizeHandler',"sap/ui/events/KeyCodes","./FacetOverviewRenderer"],function(q,l,C,I,D,L,R,K,F){"use strict";var a=C.extend("sap.suite.ui.commons.FacetOverview",{metadata:{deprecated:true,library:"sap.suite.ui.commons",properties:{title:{type:"string",group:"Misc",defaultValue:null},quantity:{type:"int",group:"Misc",defaultValue:-1},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'auto'},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'10rem',deprecated:true},rowSpan:{type:"int",group:"Misc",defaultValue:1,deprecated:true},heightType:{type:"sap.suite.ui.commons.FacetOverviewHeight",group:"Misc",defaultValue:"None"}},aggregations:{content:{type:"sap.ui.core.Control",multiple:false}},events:{press:{parameters:{id:{type:"string"}}},heightChange:{}}}});a.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");if(D.system.desktop){this._oHoverIcon=I.createControlByURI({id:this.getId()+"-hover-icon-img",src:"sap-icon://slim-arrow-right"});}else{D.orientation.attachHandler(function(e){this._updateTitleMaxWidth(e);},this);}this._oNoDataLabel=new L(this.getId()+"-no-content",{text:this._rb.getText("FACETOVERVIEW_NO_ITEMS_TEXT")});};a.prototype.exit=function(){if(this._oHoverIcon){this._oHoverIcon.destroy();}R.deregister(this._sTitleResizeHandlerId);D.orientation.detachHandler(function(){this._updateTitleMaxWidth();},this);this._oNoDataLabel.destroy();};a.prototype._updateTitleMaxWidth=function(e){this._handleTitleResize();};a.prototype._handleTitleResize=function(){var t=q(document.getElementById(this.getId()+"-title")).width();if(this._iTitleWidth!=t){var T=t-q(document.getElementById(this.getId()+"-qty")).outerWidth()-15;q(document.getElementById(this.getId()+"-title-text")).css("max-width",T);this._iTitleWidth=t;}};a.prototype.onAfterRendering=function(){if(D.system.desktop){if(this._sTitleResizeHandlerId){R.deregister(this._sTitleResizeHandlerId);}var t=this.getId()+"-title"?window.document.getElementById(this.getId()+"-title"):null;this._sTitleResizeHandlerId=R.register(t,q.proxy(this._handleTitleResize,this));}this._handleTitleResize();if(D.system.desktop){this.$()[0].addEventListener("focusin",function(e){this.$().find("[data-tabindex]").attr("tabindex",function(){return this.getAttribute("data-tabindex");});}.bind(this),true);this.onsapfocusleave();}};a.prototype.onclick=function(e){if(e.srcControl.getMetadata().getName()!="sap.m.Link"){this.firePress({id:this.getId()});}};a.prototype.onkeydown=function(e){if(e.which==K.ENTER){this.onclick(e);}};a.prototype.onsapfocusleave=function(e){if(D.system.desktop){this.$().find("[data-tabindex]").removeAttr("data-tabindex");this.$().find("[tabindex]").attr("data-tabindex",function(){return this.getAttribute("tabindex");}).attr("tabindex","-1");}};a.prototype.onsaptouchstart=function(e){if(this.hasListeners("press")){if(e.srcControl.getMetadata().getName()!="sap.m.Link"){this.addStyleClass("sapSuiteFovSelected");}}};a.prototype.onsaptouchend=function(e){if(this.hasListeners("press")){this.removeStyleClass("sapSuiteFovSelected");}};a.prototype.ontouchmove=function(e){if(this.hasListeners("press")){this.removeStyleClass("sapSuiteFovSelected");}};a.prototype.ontouchstart=function(e){if(this.hasListeners("press")){if(e.srcControl.getMetadata().getName()!="sap.m.Link"){this.addStyleClass("sapSuiteFovSelected");}}};a.prototype.ontouchend=function(e){if(this.hasListeners("press")){this.removeStyleClass("sapSuiteFovSelected");}};a.prototype.ontouchmove=function(e){if(this.hasStyleClass("sapSuiteFovSelected")){this.removeStyleClass("sapSuiteFovSelected");}};a.prototype.getHeight=function(){switch(this.getHeightType()){case l.FacetOverviewHeight.XS:return"4rem";case l.FacetOverviewHeight.S:return"6rem";case l.FacetOverviewHeight.M:return"10rem";case l.FacetOverviewHeight.L:return"14rem";case l.FacetOverviewHeight.XL:return"21rem";case l.FacetOverviewHeight.XXL:return"32rem";case l.FacetOverviewHeight.Auto:return"auto";case l.FacetOverviewHeight.None:default:return this.getProperty("height");}};a.prototype.setHeight=function(h){this.setProperty("height",h);this.fireHeightChange();return this;};a.prototype.setHeightType=function(e){this.setProperty("heightType",e);this.fireHeightChange();return this;};return a;});
