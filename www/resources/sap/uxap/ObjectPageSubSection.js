/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/layout/Grid","sap/ui/layout/GridData","./ObjectPageSectionBase","./ObjectPageLazyLoader","./BlockBase","sap/m/Button","sap/ui/Device","sap/ui/core/StashedControlSupport","sap/ui/base/ManagedObjectObserver","sap/m/TitlePropagationSupport","./library","sap/m/library","./ObjectPageSubSectionRenderer","sap/base/Log","sap/ui/base/DataType","sap/ui/events/KeyCodes","sap/ui/dom/jquery/Focusable"],function(q,G,a,O,b,B,c,D,S,d,T,l,m,e,f,g,K){"use strict";var h=m.ButtonType;var i=l.ObjectPageSubSectionMode;var j=l.ObjectPageSubSectionLayout;var k=O.extend("sap.uxap.ObjectPageSubSection",{metadata:{library:"sap.uxap",properties:{mode:{type:"sap.uxap.ObjectPageSubSectionMode",group:"Appearance",defaultValue:i.Collapsed},titleUppercase:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"blocks",aggregations:{_grid:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},blocks:{type:"sap.ui.core.Control",multiple:true,singularName:"block"},moreBlocks:{type:"sap.ui.core.Control",multiple:true,singularName:"moreBlock"},actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"}},designtime:"sap/uxap/designtime/ObjectPageSubSection.designtime"}});T.call(k.prototype,"blocks",function(){return this._getTitleDomId();});k.FIT_CONTAINER_CLASS="sapUxAPObjectPageSubSectionFitContainer";k._getLibraryResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap");};k.prototype.init=function(){O.prototype.init.call(this);this._bRenderedFirstTime=false;this._aAggregationProxy={blocks:[],moreBlocks:[]};this._$spacer=[];this._sContainerSelector=".sapUxAPBlockContainer";this._sMoreContainerSelector=".sapUxAPSubSectionSeeMoreContainer";this._oObserver=new d(k.prototype._observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["actions"]});this._switchSubSectionMode(this.getMode());this._initTitlePropagationSupport();this._sBorrowedTitleDomId=false;this._height="";};k.prototype._getHeight=function(){return this._height;};k.prototype._setHeight=function(v){var t,o;if(this._height===v){return;}t=g.getType("sap.ui.core.CSSSize");if(!t.isValid(v)){throw new Error("\""+v+"\" is of type "+typeof v+", expected "+t.getName()+" for property \"_height\" of "+this);}this._height=v;o=this.getDomRef();if(o){o.style.height=v;}};k.prototype._getTitleDomId=function(){if(this._sBorrowedTitleDomId){return this._sBorrowedTitleDomId;}if(!this.getTitle().trim()){return false;}if(this._getInternalTitleVisible()){return this.getId()+"-headerTitle";}return false;};k.prototype._setBorrowedTitleDomId=function(I){this._sBorrowedTitleDomId=I;};k.prototype._expandSection=function(){O.prototype._expandSection.call(this);var p=this.getParent();p&&typeof p._expandSection==="function"&&p._expandSection();return this;};k.prototype._getGrid=function(){if(!this.getAggregation("_grid")){this.setAggregation("_grid",new G({id:this.getId()+"-innerGrid",defaultSpan:"XL12 L12 M12 S12",hSpacing:1,vSpacing:1,width:"100%",containerQuery:true}),true);}return this.getAggregation("_grid");};k.prototype._hasVisibleActions=function(){var A=this.getActions()||[];if(A.length===0){return false;}return A.filter(function(o){return o.getVisible();}).length>0;};k.prototype._observeChanges=function(C){var o=C.object,s=C.name,M=C.mutation,n=C.child,H;if(o===this){if(s==="actions"){if(M==="insert"){this._observeAction(n);}else if(M==="remove"){this._unobserveAction(n);}}}else if(s==="visible"){H=this._getInternalTitleVisible()&&this.getTitle().trim()!=="";if(!H){this.$("header").toggleClass("sapUiHidden",!this._hasVisibleActions());}}};k.prototype._observeAction=function(C){this._oObserver.observe(C,{properties:["visible"]});};k.prototype._unobserveAction=function(C){this._oObserver.unobserve(C,{properties:["visible"]});};["addStyleClass","toggleStyleClass","removeStyleClass"].forEach(function(M){k.prototype[M]=function(s,n){if(s===k.FIT_CONTAINER_CLASS){this._notifyObjectPageLayout();}return O.prototype[M].apply(this,arguments);};});k.prototype._unStashControls=function(){S.getStashedControls(this.getId()).forEach(function(C){C.setStashed(false);});};k.prototype.connectToModels=function(){var n=this.getBlocks()||[],M=this.getMoreBlocks()||[],C=this.getMode();this._unStashControls();n.forEach(function(o){if(o instanceof B){if(!o.getMode()){o.setMode(C);}o.connectToModels();}});if(M.length>0&&C===i.Expanded){M.forEach(function(o){if(o instanceof B){if(!o.getMode()){o.setMode(C);}o.connectToModels();}});}};k.prototype._allowPropagationToLoadedViews=function(A){var n=this.getBlocks()||[],M=this.getMoreBlocks()||[];n.forEach(function(o){if(o instanceof B){o._allowPropagationToLoadedViews(A);}});M.forEach(function(o){if(o instanceof B){o._allowPropagationToLoadedViews(A);}});};k.prototype.clone=function(){Object.keys(this._aAggregationProxy).forEach(function(A){var o=this.mAggregations[A];if(!o||o.length===0){this.mAggregations[A]=this._aAggregationProxy[A];}},this);return O.prototype.clone.apply(this,arguments);};k.prototype._cleanProxiedAggregations=function(){var p=this._aAggregationProxy;Object.keys(p).forEach(function(s){p[s].forEach(function(o){o.destroy();});});};k.prototype.exit=function(){if(this._oSeeMoreButton){this._oSeeMoreButton.destroy();this._oSeeMoreButton=null;}this._cleanProxiedAggregations();if(O.prototype.exit){O.prototype.exit.call(this);}};k.prototype.onAfterRendering=function(){var o=this._getObjectPageLayout();if(O.prototype.onAfterRendering){O.prototype.onAfterRendering.call(this);}if(!o){return;}this._$spacer=q(document.getElementById(o.getId()+"-spacer"));};k.prototype.onBeforeRendering=function(){var o=this._getObjectPageLayout();if(!o){return;}if(O.prototype.onBeforeRendering){O.prototype.onBeforeRendering.call(this);}this._setAggregationProxy();this._getGrid().removeAllContent();this._applyLayout(o);this.refreshSeeMoreVisibility();};k.prototype._applyLayout=function(L){var v,o=this._getGrid(),C=this.getMode(),s=L.getSubSectionLayout(),n=this._calculateLayoutConfiguration(s,L),p=this.getBlocks(),A=p.concat(this.getMoreBlocks());this._oLayoutConfig=n;this._resetLayoutData(A);if(C===i.Expanded){v=A;}else{v=p;}this._calcBlockColumnLayout(v,this._oLayoutConfig);try{v.forEach(function(r){this._setBlockMode(r,C);o.addAggregation("content",r,true);},this);}catch(E){f.error("ObjectPageSubSection :: error while building layout "+s+": "+E);}return this;};k.prototype._calculateLayoutConfiguration=function(L,o){var n={M:2,L:3,XL:4},p=n.L,E=n.XL,t=(L===j.TitleOnLeft),u=o.getUseTwoColumnsForLargeScreen();if(t){p-=1;E-=1;}if(u){p-=1;}n.L=p;n.XL=E;return n;};k.prototype.refreshSeeMoreVisibility=function(){var s=this._getSeeMoreButton(),$=s.$(),n=this.$();this._bBlockHasMore=!!this.getMoreBlocks().length;if(!this._bBlockHasMore){this._bBlockHasMore=this.getBlocks().some(function(o){if(o instanceof B&&o.getVisible()&&o.getShowSubSectionMore()){return true;}});}if(n.length){n.toggleClass("sapUxAPObjectPageSubSectionWithSeeMore",this._bBlockHasMore);}this.toggleStyleClass("sapUxAPObjectPageSubSectionWithSeeMore",this._bBlockHasMore);if($.length){$.toggleClass("sapUxAPSubSectionSeeMoreButtonVisible",this._bBlockHasMore);}s.toggleStyleClass("sapUxAPSubSectionSeeMoreButtonVisible",this._bBlockHasMore);return this._bBlockHasMore;};k.prototype.setMode=function(M){if(this.getMode()!==M){this._switchSubSectionMode(M);if(this._bRenderedFirstTime){this.rerender();}}return this;};k.prototype.onkeydown=function(E){if(E.keyCode===K.SPACE&&E.srcControl.isA("sap.uxap.ObjectPageSubSection")){E.preventDefault();}if(E.keyCode===K.F7){E.stopPropagation();var t=sap.ui.getCore().byId(E.target.id);if(t instanceof k){this._handleSubSectionF7();}else{this._handleInteractiveElF7();this._oLastFocusedControlF7=t;}}};k.prototype._handleInteractiveElF7=function(){if(this.getParent().getSubSections().length>1){this.$().focus();}else{this.getParent().$().focus();}};k.prototype._handleSubSectionF7=function(E){if(this._oLastFocusedControlF7){this._oLastFocusedControlF7.$().focus();}else{this.$().firstFocusableDomRef().focus();}};k.prototype._calcBlockColumnLayout=function(n,C){var o=12,v,M,L,X,p;M={iRemaining:C.M,iColumnConfig:C.M};L={iRemaining:C.L,iColumnConfig:C.L};X={iRemaining:C.XL,iColumnConfig:C.XL};p=[X,L,M];v=n.filter(function(r){return r.getVisible&&r.getVisible();});v.forEach(function(r,I){p.forEach(function(s){s.iCalculatedSize=this._calculateBlockSize(r,s.iRemaining,v,I,s.iColumnConfig);},this);r.setLayoutData(new a(r.getId()+"-layoutData",{spanS:o,spanM:M.iCalculatedSize*(o/M.iColumnConfig),spanL:L.iCalculatedSize*(o/L.iColumnConfig),spanXL:X.iCalculatedSize*(o/X.iColumnConfig),linebreakM:(I>0&&M.iRemaining===M.iColumnConfig),linebreakL:(I>0&&L.iRemaining===L.iColumnConfig),linebreakXL:(I>0&&X.iRemaining===X.iColumnConfig)}));p.forEach(function(s){s.iRemaining-=s.iCalculatedSize;if(s.iRemaining<1){s.iRemaining=s.iColumnConfig;}});},this);return v;};k.prototype._calculateBlockSize=function(o,r,v,C,M){var n,F=M,p;if(!this._hasAutoLayout(o)){return Math.min(M,parseInt(o.getColumnLayout()));}for(p=1;p<=F;p++){n=this._calcLayout(v[C+p]);if(n<r){r-=n;}else{break;}}return r;};k.prototype._calcLayout=function(o){var L=1;if(!o){L=0;}else if(o instanceof B&&o.getColumnLayout()!="auto"){L=parseInt(o.getColumnLayout());}return L;};k.prototype._hasAutoLayout=function(o){return!(o instanceof B)||o.getColumnLayout()=="auto";};k.prototype._setAggregationProxy=function(){if(this._bRenderedFirstTime){return;}q.each(this._aAggregationProxy,q.proxy(function(A,v){this._setAggregation(A,this.removeAllAggregation(A,true),true);},this));this._bRenderedFirstTime=true;};k.prototype.hasProxy=function(A){return this._bRenderedFirstTime&&this._aAggregationProxy.hasOwnProperty(A);};k.prototype._getAggregation=function(A){return this._aAggregationProxy[A];};k.prototype._setAggregation=function(A,v,s){this._aAggregationProxy[A]=v;if(s!==true){this._notifyObjectPageLayout();this.invalidate();}return this._aAggregationProxy[A];};k.prototype.addAggregation=function(A,o,s){var n;if(o instanceof b){o.getContent().forEach(function(C){this.addAggregation(A,C,true);},this);o.removeAllContent();o.destroy();this.invalidate();return this;}if(this.hasProxy(A)){n=this._getAggregation(A);n.push(o);this._setAggregation(A,n,s);if(o instanceof B||o instanceof b){o.setParent(this);}return this;}return O.prototype.addAggregation.apply(this,arguments);};k.prototype.insertBlock=function(o,I){f.warning("ObjectPageSubSection :: usage of insertBlock is not supported - addBlock is performed instead.");return this.addAggregation("blocks",o);};k.prototype.insertMoreBlock=function(o,I){f.warning("ObjectPageSubSection :: usage of insertMoreBlock is not supported - addMoreBlock is performed instead.");return this.addAggregation("moreBlocks",o);};k.prototype.removeAllAggregation=function(A,s){var I;if(this.hasProxy(A)){I=this._getAggregation(A);this._setAggregation(A,[],s);return I.slice();}return O.prototype.removeAllAggregation.apply(this,arguments);};k.prototype.removeAggregation=function(A,o){var r=false,I;if(this.hasProxy(A)){I=this._getAggregation(A);I.forEach(function(n,p){if(n.getId()===o.getId()){I.splice(p,1);this._setAggregation(A,I);r=true;}return!r;},this);return(r?o:null);}return O.prototype.removeAggregation.apply(this,arguments);};k.prototype.indexOfAggregation=function(A,o){var I=-1;if(this.hasProxy(A)){this._getAggregation(A).some(function(n,p){if(n.getId()===o.getId()){I=p;return true;}},this);return I;}return O.prototype.indexOfAggregation.apply(this,arguments);};k.prototype.getAggregation=function(A){if(this.hasProxy(A)){return this._getAggregation(A);}return O.prototype.getAggregation.apply(this,arguments);};k.prototype.destroyAggregation=function(A){if(this.hasProxy(A)){this._getAggregation(A).forEach(function(o){o.destroy();});this._setAggregation(A,[]);return this;}return O.prototype.destroyAggregation.apply(this,arguments);};k.prototype._getSeeMoreButton=function(){if(!this._oSeeMoreButton){this._oSeeMoreButton=new c(this.getId()+"--seeMore",{type:h.Transparent,iconFirst:false,ariaLabelledBy:this.getId()}).addStyleClass("sapUxAPSubSectionSeeMoreButton").attachPress(this._seeMoreLessControlPressHandler,this);}return this._oSeeMoreButton;};k.prototype._seeMoreLessControlPressHandler=function(E){var C=this.getMode(),t,M=this.getMoreBlocks()||[];if(C===i.Expanded){t=i.Collapsed;}else{t=i.Expanded;M.forEach(function(o){if(o instanceof B){o.setMode(C);o.connectToModels();}},this);}this._switchSubSectionMode(t);if(this._$spacer.length>0){this._$spacer.height(this._$spacer.height()+this.$().height());}this.rerender();};k.prototype._switchSubSectionMode=function(s){s=this.validateProperty("mode",s);if(s===i.Collapsed){this.setProperty("mode",i.Collapsed,true);this._getSeeMoreButton().setText(k._getLibraryResourceBundle().getText("SEE_MORE"));}else{this.setProperty("mode",i.Expanded,true);this._getSeeMoreButton().setText(k._getLibraryResourceBundle().getText("SEE_LESS"));}};k.prototype._setBlockMode=function(o,M){if(o instanceof B){o.setMode(M);}else{f.debug("ObjectPageSubSection :: cannot propagate mode "+M+" to "+o.getMetadata().getName());}};k.prototype._setToFocusable=function(F){var s='0',n='-1',t="tabindex";if(F){this.$().attr(t,s);}else{this.$().attr(t,n);}return this;};k.prototype._getUseTitleOnTheLeft=function(){var o=this._getObjectPageLayout();return o&&(o.getSubSectionLayout()===j.TitleOnLeft);};k.prototype._resetLayoutData=function(n){n.forEach(function(o){if(o.getLayoutData()){o.destroyLayoutData();}},this);};k.prototype._updateShowHideState=function(H){this.$().children(this._sMoreContainerSelector).toggle(!H);return O.prototype._updateShowHideState.call(this,H);};k.prototype.getVisibleBlocksCount=function(){var v=S.getStashedControls(this.getId()).length;(this.getBlocks()||[]).forEach(function(o){if(o.getVisible&&!o.getVisible()){return true;}v++;});(this.getMoreBlocks()||[]).forEach(function(M){if(M.getVisible&&!M.getVisible()){return true;}v++;});return v;};return k;});
