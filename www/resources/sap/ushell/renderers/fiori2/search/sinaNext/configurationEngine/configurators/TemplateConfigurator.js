sinaDefine(['../../core/core','./Configurator'],function(c,C){"use strict";return C.derive({initAsync:function(){this.template=this.configuration.template;this.force=this.configuration.force;},isSuitable:function(o){if(c.isString(o.type)&&['string'].indexOf(o.type)>=0&&c.isObject(o.configuration)&&o.configuration.hasOwnProperty('template')){return true;}return false;},configure:function(v,a){if(this.isInitialOrForced(v)){var e=this.getEvaluateTemplateFunction(a);return e(this.configuration.template);}return v;}});});
