sap.ui.define(["jquery.sap.global","./common.constants","../common/common.configure.ui5language","../common/common.configure.ui5theme","../common/common.configure.ui5datetimeformat","../common/common.configure.xhrlogon","../common/common.load.ui5theme","../common/common.load.xhrlogon","sap/ushell/services/Container","jquery.sap.script"],function(q,c,C,f,a,o,l,x,b){"use strict";return d;function d(u,e){var g,U=window[c.ushellConfigNamespace];C(U);f(U);a(U);if(q.sap.getUriParameters().get("sap-ushell-cdm-loadFioriTheme")===true){g=q.sap.getObject('services.Container.adapter.config.userProfile.defaults.bootTheme',NaN,U);l(g);}window.sap.ushell.bootstrap(u).then(function(){o.start(sap.ushell.Container,x);}).then(e);}});