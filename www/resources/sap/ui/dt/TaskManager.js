/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/util/isPlainObject"],function(M,i){"use strict";var T=M.extend("sap.ui.dt.TaskManager",{metadata:{library:"sap.ui.dt",properties:{suppressEvents:{type:"boolean",defaultValue:false}},events:{add:{parameters:{taskId:"int"}},complete:{parameters:{taskId:"array"}}}},constructor:function(){M.apply(this,arguments);this._aList=[];},_iNextId:0});T.prototype._validateTask=function(t){if(!i(t)||!t.type){throw new Error('Invalid task specified');}};T.prototype.add=function(t){this._validateTask(t);var a=this._iNextId++;this._aList.push(Object.assign({},t,{id:a}));if(!this.getSuppressEvents()){this.fireAdd({taskId:a});}return a;};T.prototype.complete=function(t){this._aList=this._aList.filter(function(m){return m.id!==t;});if(!this.getSuppressEvents()){this.fireComplete({taskId:[t]});}};T.prototype.completeBy=function(t){this._validateTask(t);var c=[];this._aList=this._aList.filter(function(l){var C=Object.keys(t).every(function(k){return l[k]&&l[k]===t[k];});if(C){c.push(l.id);return false;}return true;});if(!this.getSuppressEvents()){this.fireComplete({taskId:c});}};T.prototype.cancel=function(t){this.complete(t);};T.prototype.isEmpty=function(){return this.count()===0;};T.prototype.count=function(){return this._aList.length;};T.prototype.getList=function(){return this._aList.slice(0);};T.prototype.destroy=function(){this.setSuppressEvents(true);this.getList().forEach(function(t){this.cancel(t.id);},this);};return T;});
