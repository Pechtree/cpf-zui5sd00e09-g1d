/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery","../library","sap/suite/ui/commons/statusindicator/ShapeGroup","sap/suite/ui/commons/statusindicator/Shape","sap/suite/ui/commons/statusindicator/Path","sap/suite/ui/commons/statusindicator/Circle","sap/suite/ui/commons/statusindicator/Rectangle","sap/suite/ui/commons/util/HtmlElement","sap/base/Log","./CustomShapeRenderer"],function(q,l,S,a,P,C,R,H,L,b){"use strict";var F=l.statusindicator.FillingType;var c=a.extend("sap.suite.ui.commons.statusindicator.CustomShape",{metadata:{library:"sap.suite.ui.commons",properties:{x:{type:"int",defaultValue:0},y:{type:"int",defaultValue:0},width:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},strokeColor:{type:"sap.m.ValueCSSColor",defaultValue:"Neutral"},strokeWidth:{type:"float",defaultValue:0.25},definition:{type:"string",defaultValue:null}},defaultAggregation:"shapes",aggregations:{shapes:{type:"sap.suite.ui.commons.statusindicator.SimpleShape",multiple:true,defaultValue:null},fillingOptions:{type:"sap.suite.ui.commons.statusindicator.FillingOption",multiple:true,defaultValue:null}}}});c.prototype.init=function(){if(a.prototype.init){a.prototype.init.apply(this,arguments);}this._iDisplayedValue=0;this._initShapeState();};c.prototype.onBeforeRendering=function(){this._refreshInternalStructure();};c.prototype.onAfterRendering=function(){this._updateDom(this.getDisplayedValue());};c.prototype.addFillingOption=function(n){var f=typeof n.getOrder()==="undefined";if(f){L.fatal("The passed FillingOption has to have set its order property.");return this;}var h=this.getFillingOptions().length>0&&this.getFillingOptions().filter(function(o){return o.getOrder()===n.getOrder();}).length>0;if(h){L.fatal("The property 'order' has to be unique within the FillingOptions aggregation, but option"+" with order: "+n.getOrder()+" is already inserted. No FillingOption added.");return this;}return this.addAggregation("fillingOptions",n,true);};c.prototype._initShapeState=function(){this._aFillableSubShapes=[];this.oDefinition=[];this._sViewBox=null;this.destroyShapes();};c.prototype._refreshInternalStructure=function(){this._initShapeState();this._aFillableSubShapes.forEach(function(i){if(i.fillingOption){i.fillingOption.destroy();}i.shape.destroy();});if(!this.getDefinition()){if(!this.isA("sap.suite.ui.commons.statusindicator.LibraryShape")){L.fatal("Definition has to be specified.");}return;}var $=q(this.getDefinition());this._sViewBox=$[0].getAttribute("viewBox");q.map($.children(),this._preprocessNode.bind(this));};c.prototype._preprocessNode=function(n){var $=q(n),t=$.prop("tagName"),d=this;switch(t){case"g":q.map($.children(),function(o){return d._preprocessLeafNode.call(d,q(o));});break;default:this._preprocessLeafNode($);}};c.prototype._preprocessLeafNode=function($){var t=$.prop("tagName");switch(t){case"path":this._preprocessPathNode($);break;case"circle":this._preprocessCircleNode($);break;case"rect":this._preprocessRectangleNode($);break;case"defs":this._preprocessDefinitionsNode($[0]);break;default:L.fatal("Unsupported node tag name ('"+t+"')");}};c.prototype._preprocessPathNode=function($){var p=new P({d:$.attr("d")});this._prepareShape(p,$);};c.prototype._preprocessCircleNode=function($){var o=new C({cx:Number($.attr("cx")),cy:Number($.attr("cy")),r:Number($.attr("r"))});this._prepareShape(o,$);};c.prototype._preprocessRectangleNode=function($){var r=new R({x:Number($.attr("x")),y:Number($.attr("y")),width:Number($.attr("width")),height:Number($.attr("height"))});this._prepareShape(r,$);};c.prototype._preprocessDefinitionsNode=function(d){var D=new H("defs");D.addChild(d.innerHTML);return D;};c.prototype._setInitialValue=function(i){this._iDisplayedValue=i;};c.prototype.getDisplayedValue=function(){return this._iDisplayedValue;};c.prototype._prepareShape=function(s,$){s.setFillingAngle(this.getFillingAngle());s.setStrokeWidth(this.getStrokeWidth());s.setStrokeColor(this.getStrokeColor());this.addShape(s);s._injectAnimationPropertiesResolver(this._oAnimationPropertiesResolver);var d=$.attr("style");if(!d){s.setFillingDirection(this.getFillingDirection());s.setFillColor(this.getFillColor());s.setFillingType(this.getFillingType());var e=$.data("shape-id");var f={shape:s,fillingOption:e?this._getFillingOptionById(e):null};this._aFillableSubShapes.push(f);if(f.fillingOption){this._aFillableSubShapes.sort(function(A,B){var o=A.fillingOption;var g=B.fillingOption;if(!o){return-1;}if(!g){return 1;}return o.getOrder()-g.getOrder();});}}else{s.setFillingType(F.None);s._setStyle(d);}};c.prototype._updateDom=function(d,D){function g(s){var f=s.fillingOption;return f&&f.getWeight()!==0?f.getWeight():1;}L.debug("Updating to "+d,null,this);if(this._aFillableSubShapes.length===0){L.info("Update of DOM skipped. No shape for update found");return;}var t=this._aFillableSubShapes.reduce(function(f,s){return f+g(s);},0);try{var e=this;var v=(D)?d:this._oAnimationPropertiesResolver.getValue(this,d);this._aFillableSubShapes.forEach(function(f){var s=g(f);var G=s/t;var i;if(v===0){i=0;}else if(v>=100*G){i=100;}else{i=v/G;}v-=i*G;if(!D){var r=f.shape.getRenderer();var h=e.getDisplayedFillColor(d);L.debug("Updating color to '"+h+"'",null,f.shape);r._updateDomColor(f.shape,h);}f.shape._updateDom(i,true);});}catch(E){L.fatal("Update of DOM failed. Reason: "+E.message);return;}if(!D){this._oAnimationPropertiesResolver.propagateValueChange(this,d);this._oAnimationPropertiesResolver.propagateColorChange(this,d);}this._iDisplayedValue=d;};c.prototype._getFillingOptionById=function(i){var r=null;this.getFillingOptions().some(function(f){if(f.getShapeId()===i){r=f;return true;}return false;});return r;};c.prototype._getInternalViewBox=function(){return this._sViewBox;};return c;});
