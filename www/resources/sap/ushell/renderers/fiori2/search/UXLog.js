sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchHelper'],function(S){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.UXLog');var m=sap.ushell.renderers.fiori2.search.UXLog={};jQuery.extend(m,{logLines:[],log:function(){this._log.apply(this,arguments);},_log:function(t){this.logLines.push(t);this._save();},_save:function(){jQuery.ajax({type:'PUT',url:'/uxlog.txt',data:this.logLines.join('\n')+'\n',contentType:'text/plain'});this.logLines=[];}});m._save=S.delayedExecution(m._save,2000);return m;});
