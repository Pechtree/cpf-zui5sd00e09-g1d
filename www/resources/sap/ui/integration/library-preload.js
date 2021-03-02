//@ui5-bundle sap/ui/integration/library-preload.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/integration/host/HostConfiguration',['sap/ui/core/Control',"sap/ui/integration/host/HostConfigurationCompiler"],function(C,H){"use strict";
var a=C.extend("sap.ui.integration.host.HostConfiguration",{
metadata:{properties:{config:{type:"any"},css:{type:"string"}},events:{cssChanged:{}}},
renderer:function(r,c){r.write("<style ");r.writeElementData(c);r.write(">");r.write(c._getCssText()||"");r.write("</style>");}
});
a.prototype.setConfig=function(v,s){this._sCssText=null;return this.setProperty("config",v,s);};
a.prototype.setCss=function(v,s){this._sCssText=null;return this.setProperty("css",v,s);};
a.prototype.onBeforeRendering=function(){if(!this._sCssText){if(this.getCss()){this._applyCss();}else{this._applyConfig();}}};
a.prototype._applyCss=function(){var c=this.getCss();H.loadResource(c,"text").then(function(s){this._sCssText=s;this.invalidate();}.bind(this)).catch(function(){});};
a.prototype._applyConfig=function(){var v=this.getConfig();if(typeof v==="string"){H.loadResource(v,"json").then(function(v){this._oConfig=v;this.invalidate();}.bind(this)).catch(function(){});}else if(typeof v==="object"&&!Array.isArray(v)){this._oConfig=v;this.invalidate();}};
a.prototype._getCssText=function(){var c=this._oConfig;if(!c&&!this.getCss()){return"";}if(this._sCssText){return this._sCssText;}var s=this.getId().replace(/-/g,"_").replace(/\./g,"_").replace(/\,/g,"_");this._sCssText=H.generateCssText(this._oConfig,s);this.fireCssChanged({cssText:this._sCssText});return this._sCssText;};
a.prototype.generateJSONSettings=function(t){return H.generateJSONSettings(this._oConfig,t);};
return a;});
sap.ui.predefine('sap/ui/integration/host/HostConfigurationCompiler',["sap/ui/thirdparty/less","sap/base/Log"],function(L,a){"use strict";var p=jQuery.sap.loadResource("sap/ui/integration/host/HostConfigurationMap.json",{dataType:"json"}),l=jQuery.sap.loadResource("sap/ui/integration/host/HostConfiguration.less",{dataType:"text"});
function b(u,t){return new Promise(function(r,e){jQuery.ajax({url:u,async:true,dataType:t,success:function(j){r(j);},error:function(){e();}});});}
function _(n,P){if(!P){return n;}var e=P.split("/"),i=0;if(!e[0]){n=n;i++;}while(n&&e[i]){n=n[e[i]];i++;}return n;}
function g(C,s){var m=p.less,P=[];for(var n in m){var M=m[n],v=_(C,M.path),u=M.unit;if(v){P.push(n+":"+v+(u?u:""));}else{P.push(n+": /*null*/");}}var r=l.replace(/\#hostConfigName/g,"."+s);r=r.replace(/\/\* HOSTCONFIG PARAMETERS \*\//,P.join(";\n")+";");var o=new L.Parser(),S="";o.parse(r,function(e,R){try{S=R.toCSS();}catch(f){S=" ";}});return S;}
function c(C,N){function e(C,v){var r=null;if(v.path){r=_(C,v.path);if(v.unit){v.unit=r+v.unit;}}else if(v.value){r=v.value;}else if(Array.isArray(v)){r=[];for(var i=0;i<v.length;i++){r.push(e(C,v[i]));}}return r;}var m=p[N],s={};for(var n in m){var M=m[n],o=n.split("/"),f=s;if(M){for(var i=0;i<o.length-1;i++){if(f[o[i]]===undefined){f[o[i]]={};}f=f[o[i]];}f[o[o.length-1]]=e(C,M);}}return s;}
function d(C,o){return b(C,"json").then(function(o){return g(o,o);});}
return{loadResource:b,generateCssText:g,generateCssTextAsync:d,generateJSONSettings:c};});
sap.ui.predefine('sap/ui/integration/library',["sap/ui/base/DataType","sap/ui/Global","sap/ui/core/library","sap/f/library"],function(D){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.integration",version:"1.67.0",dependencies:["sap.ui.core","sap.f"],types:["sap.ui.integration.CardActionType","sap.ui.integration.CardDataMode"],controls:["sap.ui.integration.widgets.Card","sap.ui.integration.host.HostConfiguration"],elements:[],noLibraryCSS:true,customTags:{"card":"sap/ui/integration/widgets/Card","host-configuration":"sap/ui/integration/host/HostConfiguration"},defaultTagPrefix:"ui"});var t=sap.ui.integration;t.CardActionType={Navigation:"Navigation"};t.CardDataMode={Active:"Active",Inactive:"Inactive"};return t;});
sap.ui.predefine('sap/ui/integration/services/Data',['./Service'],function(S){"use strict";var D=S.extend();
D.prototype.attachDataChanged=function(d,p){};
D.prototype.detachDataChanged=function(d){};
D.prototype.getData=function(i){return Promise.resolve(false);};
return D;});
sap.ui.predefine('sap/ui/integration/services/Navigation',['./Service'],function(S){"use strict";var N=S.extend();
N.prototype.navigate=function(c){};
S.prototype.enabled=function(c){return Promise.resolve(false);};
return N;});
sap.ui.predefine('sap/ui/integration/services/Service',[],function(){"use strict";var S=function(){};
S.extend=function(C){if(!C){var t=this;C=function(){t.apply(this,arguments);};}C.prototype=Object.create(this.prototype);C.prototype.constructor=C;C.extend=this.extend.bind(C);return C;};
S.prototype.getInterface=function(){return this;};
return S;});
sap.ui.predefine('sap/ui/integration/util/CardManifest',["sap/ui/base/Object","sap/ui/core/Manifest","sap/base/Log"],function(B,M,L){"use strict";var a="/sap.card/configuration/parameters";
var C=B.extend("sap.ui.integration.util.CardManifest",{constructor:function(m){B.call(this);if(m){this._oManifest=new M(m,{process:false});this.oJson=this._oManifest.getRawJson();}}});
C.prototype.getJson=function(){return this._unfreeze(this.oJson);};
C.prototype.get=function(P){return this._unfreeze(g(this.oJson,P));};
C.prototype.getResourceBundle=function(){return this.oResourceBundle;};
C.prototype._unfreeze=function(v){if(typeof v==="object"){return JSON.parse(JSON.stringify(v));}return v;};
C.prototype.destroy=function(){this.oJson=null;this.oResourceBundle=null;if(this._oManifest){this._oManifest.destroy();}};
C.prototype.load=function(s){if(!s||!s.manifestUrl){throw new Error("manifestUrl is mandatory!");}return M.load({manifestUrl:s.manifestUrl,async:true}).then(function(m){this._oManifest=m;this.oJson=this._oManifest.getRawJson();return this.loadI18n().then(function(){this.processManifest();}.bind(this));}.bind(this));};
C.prototype.loadI18n=function(){return this._oManifest._loadI18n(true).then(function(o){this.oResourceBundle=o;}.bind(this));};
C.prototype.processManifest=function(P){var i=0,m=15,u=jQuery.extend(true,{},this._oManifest.getRawJson());e(u,this.oResourceBundle,i,m,P);d(u);this.oJson=u;};
function d(o){if(o&&typeof o==='object'&&!Object.isFrozen(o)){Object.freeze(o);for(var k in o){if(o.hasOwnProperty(k)){d(o[k]);}}}}
function b(v){return(typeof v==="string")&&v.indexOf("{{")===0&&v.indexOf("}}")===v.length-2;}
function c(v){return(typeof v==="string")&&(v.indexOf("{{parameters.")>-1);}
function p(P,o){var i=new Date().toISOString();var s=P.replace("{{parameters.NOW_ISO}}",i);s=s.replace("{{parameters.TODAY_ISO}}",i.slice(0,10));if(o){for(var f in o){s=s.replace("{{parameters."+f+"}}",o[f].value);}}return s;}
function e(o,r,i,m,P){if(i===m){return;}if(Array.isArray(o)){o.forEach(function(I,f,A){if(typeof I==="object"){e(I,r,i+1,m,P);}else if(c(I,o,P)){A[f]=p(I,P);}else if(b(I)&&r){A[f]=r.getText(I.substring(2,I.length-2));}},this);}else{for(var s in o){if(typeof o[s]==="object"){e(o[s],r,i+1,m,P);}else if(c(o[s],o,P)){o[s]=p(o[s],P);}else if(b(o[s])&&r){o[s]=r.getText(o[s].substring(2,o[s].length-2));}}}}
function g(o,P){if(o&&P&&typeof P==="string"&&P[0]==="/"){var f=P.substring(1).split("/"),s;for(var i=0,l=f.length;i<l;i++){s=f[i];o=o.hasOwnProperty(s)?o[s]:undefined;if(o===null||typeof o!=="object"){if(i+1<l&&o!==undefined){o=undefined;}break;}}return o;}return o&&o[P];}
C.prototype.processParameters=function(P){var m=this.get(a);if(P&&!m){L.error("If parameters property is set, parameters should be described in the manifest");}if(m){var o=this._syncParameters(P,m);this.processManifest(o);}};
C.prototype._syncParameters=function(P,m){if(!P){return m;}var o=jQuery.extend(true,{},m),f=Object.getOwnPropertyNames(P),h=Object.getOwnPropertyNames(o);for(var i=0;i<h.length;i++){for(var j=0;j<f.length;j++){if(h[i]===f[j]){o[h[i]].value=P[f[j]];}}}return o;};
return C;},true);
sap.ui.predefine('sap/ui/integration/util/CustomElements',["sap/base/Log"],function(L){"use strict";var E=window.Element;if(E.prototype.getAttributeNames==undefined){E.prototype.getAttributeNames=function(){var d=this.attributes;var l=d.length;var r=new Array(l);for(var i=0;i<l;i++){r[i]=d[i].name;}return r;};}var e=document.createElement("span"),o,I={registerTag:function registerTag(t,p,d){p=p+"-";var g=p+t;b.apply(this,[g,d]);},coreInstance:null};
function a(){if(typeof window.CustomEvent==="function"){return false;}function C(d,p){p=p||{bubbles:false,cancelable:false,detail:undefined};var g=document.createEvent('CustomEvent');g.initCustomEvent(d,p.bubbles,p.cancelable,p.detail);return g;}C.prototype=window.Event.prototype;window.CustomEvent=C;}
function f(n,d,g){var h=new window.CustomEvent(d),i=n.getAttribute("on"+d);h.data=g;if(i){e.setAttribute("onclick",i);e.onclick(h);}n.dispatchEvent(h);}
function c(){var d={childList:true,subtree:true};function g(m,o){m.forEach(function(h){if(h.type=='childList'){var j=h.addedNodes,r=h.removedNodes,n,x,k,t,i;for(k=0;k<j.length;k++){n=j[k];if(!document.createCustomElement._querySelector){return;}if(n.tagName&&document.createCustomElement.hasOwnProperty(n.tagName.toLowerCase())){if(!n._control){document.createCustomElement[n.tagName.toLowerCase()].connectToNode(n);}n._control._connectedCallback();}if(n.tagName){t=n.querySelectorAll(document.createCustomElement._querySelector);for(i=0;i<t.length;i++){x=t[i];if(x.tagName&&document.createCustomElement.hasOwnProperty(x.tagName.toLowerCase())){if(!x._control){document.createCustomElement[x.tagName.toLowerCase()].connectToNode(x);}x._control._connectedCallback();}}}}for(k=0;k<r.length;k++){n=r[k];if(!document.createCustomElement._querySelector){return;}if(n._control){n._control._disconnectedCallback();}if(n.tagName){t=n.querySelectorAll(document.createCustomElement._querySelector);for(i=0;i<t.length;i++){x=t[i];if(x._control){x._control._disconnectedCallback();}}}}}else if(h.type==="attributes"&&h.target&&h.target._control){h.target._control._changeProperty.call(h.target._control,h.attributeName,h.target.getAttribute(h.attributeName));}});}var o=new window.MutationObserver(g);if(!document.body){L.error("CustomElements.js was loaded before a body element was present in the DOM. Ensure to load CustomElements.js after the document was parsed, i.e. after the windows onload event.");return null;}o.observe(document.body,d);return o;}
function b(p,T){if(document.createCustomElement[p]){return document.createCustomElement[p];}var t=T.getMetadata(),d=t.getAllProperties(),g=t.getAllAssociations(),h=t.getAllEvents(),j={};Object.keys(d).map(function(n){j[n.toLowerCase()]=d[n];});Object.keys(g).map(function(n){j[n.toLowerCase()]=g[n];});Object.keys(h).map(function(n){j["on"+n.toLowerCase()]=h[n];});var k=function(q){this._node=q;q._control=this;k.initCloneNode(q);k.defineProperties(q);this._controlImpl=this._controlImpl||new T(q.getAttribute("id"));this._changeProperties(q);q.setAttribute("id",this._controlImpl.getId()+"-area");this._uiArea=I.coreInstance.createUIArea(q);this._uiArea.addContent(this._controlImpl);if(k.isInActiveDocument(q)){this._connectedCallback();}return q;};k.cloneNode=function(){var n=this._cloneNode.call(this);n.removeAttribute("data-sap-ui-area");n.removeAttribute("id");n._controlImpl=this._control._controlImpl.clone();k.connectToNode(n);return n;};k.initCloneNode=function(q){if(!q._cloneNode){q._cloneNode=q.cloneNode;q.cloneNode=k.cloneNode;}};k.isInActiveDocument=function(q){return!!(q.parentNode&&q.ownerDocument===document);};k.defineProperty=function(q,n,r){Object.defineProperty(q,n,{get:function(){return t.getProperty(n).get(q._control._controlImpl);},set:function(v){q._control._changeProperty(n,v);return t.getProperty(n).get(q._control._controlImpl);}});};k.defineProperties=function(q){for(var n in j){if(n.charAt(0)!=="_"){k.defineProperty(q,n,j[n].defaultValue);}}};k.observer=o;k.connectToNode=function(q){new k(q);return k.observer&&k.observer.observe(q,{attributes:true});};k.prototype._connectedCallback=function(){this._connected||((this._connected=true)&&this._controlImpl.invalidate());};k.prototype._disconnectedCallback=function(){this._connected=false;};k.prototype._changeProperties=function(q){var n=q.getAttributeNames();for(var i=0;i<n.length;i++){this._changeProperty(n[i],q.getAttribute(n[i]));}};k.prototype._changeProperty=function(n,r){var u=this._controlImpl,v=j[n];if(n==="id"){return;}if(v&&(v._iKind===0||v._iKind===3)){var w=v.getType();var V=w.parseValue(r);var O=v.get(u);if(w.isValid(V)){v.set(u,V);}else{v.set(u,O);}}else if(v&&v._iKind===5){var x=this;if(this["_"+v.name]){u[v._sDetachMutator](this["_"+v.name]);}this["_"+v.name]=function(s){x.fireCustomEvent(v.name.toLowerCase(),s.mParameters);};u[v._sMutator](this["_"+v.name]);}else if(n==="class"){var C=r.split(" ");this._addedClasses=this._addedClasses||[];this._addedClasses.forEach(function(s){s&&u.removeStyleClass(s);});C.forEach(function(s){s=u.addStyleClass(s);});this._addedClasses=C;}};k.prototype.fireCustomEvent=function(n,r){f(this._node,n,r);};var l=document.createCustomElement;l[p]=k;if(l._querySelector){l._querySelector+=",";}else{Object.defineProperty(l,"_querySelector",{enumerable:false,writable:true});l._querySelector="";}var S=p.replace("-","\\-");l._querySelector+=S;var m=document.querySelectorAll(S);for(var i=0;i<m.length;i++){var q=m[i];l[p].connectToNode(q);}return k;}
if(!document.createCustomElement){document.createCustomElement=function(t){var n=document.createElement(t);document.createCustomElement[t].connectToNode(n);return n;};}a();o=c();return I;});
sap.ui.predefine('sap/ui/integration/util/ServiceManager',["sap/ui/base/EventProvider","sap/base/Log"],function(E,L){"use strict";
var S=E.extend("sap.ui.integration.util.ServiceManager",{
metadata:{library:"sap.ui.integration"},
constructor:function(s,o){if(!s){throw new Error("Missing manifest services reference!");}if(!o){throw new Error("Missing context object");}this._mServiceFactoryReferences=s;this._mServices={};this._oServiceContext=o;this._initAllServices();}
});
S.prototype._initAllServices=function(){for(var s in this._mServiceFactoryReferences){this._initService(s);}};
S.prototype._initService=function(n){var s=this._mServices[n]||{};s.promise=S._getService(this._oServiceContext,n,this._mServiceFactoryReferences).then(function(o){s.instance=o;}).catch(function(e){L.error(e.message);});this._mServices[n]=s;};
S.prototype.getService=function(s){var e="Invalid service";return new Promise(function(r,R){if(!s||!this._mServices[s]||!Object.keys(this._mServices[s])){R(e);return;}this._mServices[s].promise.then(function(){if(this._mServices[s].instance){r(this._mServices[s].instance);}else{R(e);}}.bind(this)).catch(R);}.bind(this));};
S.prototype.destroy=function(){this._mServices=null;};
S._getService=function(i,n,s){return new Promise(function(r,R){var o,f;if(i.bIsDestroyed){R(new Error("Service "+n+" could not be loaded as the requestor "+i.getMetadata().getName()+" was destroyed."));return;}if(!s){R(new Error("No Services declared"));return;}else{o=s[n];}if(!o||!o.factoryName){R(new Error("No Service '"+n+"' declared or factoryName missing"));return;}else{f=o.factoryName;}sap.ui.require(["sap/ui/core/service/ServiceFactoryRegistry"],function(a){var b=a.get(f);if(b){b.createInstance({scopeObject:i,scopeType:"component",settings:o.settings||{}}).then(function(c){if(c.getInterface){r(c.getInterface());}else{r(c);}}).catch(R);}else{var e=new Error("ServiceFactory '"+f+"' for Service '"+n+"' not found in ServiceFactoryRegistry");e._optional=o.optional;R(e);}});});};
return S;});
sap.ui.predefine('sap/ui/integration/widgets/Card',["sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/core/Control","sap/ui/integration/util/CardManifest","sap/ui/integration/util/ServiceManager","sap/base/Log","sap/f/cards/DataProviderFactory","sap/f/cards/NumericHeader","sap/f/cards/Header","sap/f/cards/BaseContent","sap/m/HBox","sap/m/VBox","sap/ui/core/Icon","sap/m/Text",'sap/ui/model/json/JSONModel',"sap/ui/model/resource/ResourceModel","sap/f/CardRenderer","sap/f/library","sap/ui/integration/library"],function(q,C,a,b,S,L,D,N,H,B,c,V,I,T,J,R,d,l,e){"use strict";var M={TYPE:"/sap.card/type",DATA:"/sap.card/data",HEADER:"/sap.card/header",HEADER_POSITION:"/sap.card/headerPosition",CONTENT:"/sap.card/content",SERVICES:"/sap.ui5/services",APP_TYPE:"/sap.app/type",PARAMS:"/sap.card/configuration/parameters"};var f=l.cards.HeaderPosition;var g=e.CardDataMode;
var h=a.extend("sap.ui.integration.widgets.Card",{
metadata:{library:"sap.ui.integration",interfaces:["sap.f.ICard"],properties:{manifest:{type:"any",defaultValue:""},parameters:{type:"object",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},dataMode:{type:"sap.ui.integration.CardDataMode",group:"Behavior",defaultValue:g.Active}},aggregations:{_header:{type:"sap.f.cards.IHeader",multiple:false,visibility:"hidden"},_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{action:{parameters:{actionSource:{type:"sap.ui.core.Control"},manifestParameters:{type:"object"},type:{type:"sap.ui.integration.CardActionType"}}}},associations:{hostConfigurationId:{}}},
renderer:d
});
h.prototype.init=function(){this.setModel(new J(),"parameters");this._initReadyState();this.setBusyIndicatorDelay(0);};
h.prototype._initReadyState=function(){this._aReadyPromises=[];this._awaitEvent("_headerReady");this._awaitEvent("_contentReady");this._awaitEvent("_cardReady");this._oReadyPromise=Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready");}.bind(this));};
h.prototype._clearReadyState=function(){this._bReady=false;this._aReadyPromises=[];this._oReadyPromise=null;};
h.prototype.onBeforeRendering=function(){var s=this.getHostConfigurationId(),p=this.getParameters();if(this.getDataMode()!==g.Active){return;}if(s){this.addStyleClass(s.replace(/-/g,"_"));}if(this._oCardManifest&&this._bApplyManifest){this._oCardManifest.processParameters(p);this._applyManifestSettings();this._bApplyManifest=false;}};
h.prototype._awaitEvent=function(E){this._aReadyPromises.push(new Promise(function(r){this.attachEventOnce(E,function(){r();});}.bind(this)));};
h.prototype.isReady=function(){return this._bReady;};
h.prototype.refresh=function(){if(this._oCardManifest&&this.getDataMode()===g.Active){this._clearReadyState();this._initReadyState();this._bApplyManifest=true;this.invalidate();}};
h.prototype.exit=function(){if(this._oCardManifest){this._oCardManifest.destroy();this._oCardManifest=null;}if(this._oServiceManager){this._oServiceManager.destroy();this._oServiceManager=null;}if(this._oDataProviderFactory){this._oDataProviderFactory.destroy();this._oDataProviderFactory=null;this._oDataProvider=null;}if(this._oTemporaryContent){this._oTemporaryContent.destroy();this._oTemporaryContent=null;}this._aReadyPromises=null;};
h.prototype.setManifest=function(v){this.setBusy(true);this.setProperty("manifest",v);if(typeof v==="string"&&v!==""){this._oCardManifest=new b();this._oCardManifest.load({manifestUrl:v}).then(function(){if(this._oCardManifest&&this._oCardManifest.getResourceBundle()){var r=new R({bundle:this._oCardManifest.getResourceBundle()});r.enhance(C.getLibraryResourceBundle("sap.ui.integration"));this.setModel(r,"i18n");}this._bApplyManifest=true;this.invalidate();}.bind(this));}else if(typeof v==="object"&&!q.isEmptyObject(v)){this._bApplyManifest=true;this._oCardManifest=new b(v);}return this;};
h.prototype.getManifest=function(){var v=this.getProperty("manifest");if(v&&typeof v==="object"){return q.extend(true,{},v);}return v;};
h.prototype.setParameters=function(v){this._bApplyManifest=true;this.setBusy(true);this.setProperty("parameters",v);return this;};
h.prototype.getParameters=function(){var v=this.getProperty("parameters");if(v&&typeof v==="object"){return q.extend(true,{},v);}return v;};
h.prototype._applyManifestSettings=function(){var A=this._oCardManifest.get(M.APP_TYPE);if(A&&A!=="card"){L.error("sap.app/type entry in manifest is not 'card'");}if(this._oDataProviderFactory){this._oDataProviderFactory.destroy();}this._oDataProviderFactory=new D();this._applyServiceManifestSettings();this._applyDataManifestSettings();this._applyHeaderManifestSettings();this._applyContentManifestSettings();};
h.prototype._applyDataManifestSettings=function(){var o=this._oCardManifest.get(M.DATA);if(!o){this.fireEvent("_cardReady");return;}if(this._oDataProvider){this._oDataProvider.destroy();}this._oDataProvider=this._oDataProviderFactory.create(o,this._oServiceManager);if(this._oDataProvider){this.setModel(new J());this._oDataProvider.attachDataChanged(function(E){this.getModel().setData(E.getParameter("data"));}.bind(this));this._oDataProvider.attachError(function(E){this._handleError("Data service unavailable. "+E.getParameter("message"));}.bind(this));this._oDataProvider.triggerDataUpdate().then(function(){this.fireEvent("_cardReady");}.bind(this));}};
h.prototype._applyServiceManifestSettings=function(){var s=this._oCardManifest.get(M.SERVICES);if(!s){return;}if(!this._oServiceManager){this._oServiceManager=new S(s,this);}};
h.prototype.getCardHeader=function(){return this.getAggregation("_header");};
h.prototype.getCardHeaderPosition=function(){if(!this._oCardManifest){return"Top";}return this._oCardManifest.get(M.HEADER_POSITION)||f.Top;};
h.prototype.getCardContent=function(){return this.getAggregation("_content");};
h.prototype._applyHeaderManifestSettings=function(){var m=this._oCardManifest.get(M.HEADER);if(!m){this.fireEvent("_headerReady");return;}var o=H;if(m.type==="Numeric"){o=N;}this._setCardHeader(o);};
h.prototype._applyContentManifestSettings=function(){var s=this._oCardManifest.get(M.TYPE),i=s&&s.toLowerCase()==="component",m=this._oCardManifest.get(M.CONTENT),j=!!m;if(j&&!s){L.error("Card type property is mandatory!");this.fireEvent("_contentReady");return;}if(!j&&!i){this.setBusy(false);this.fireEvent("_contentReady");return;}if(!m&&i){m=this._oCardManifest.getJson();}this._setTemporaryContent();B.create(s,m,this._oServiceManager,this._oDataProviderFactory).then(function(o){this._setCardContent(o);}.bind(this)).catch(function(E){this._handleError(E);}.bind(this)).finally(function(){this.setBusy(false);}.bind(this));};
h.prototype._setCardHeader=function(i){var s=this._oCardManifest.get(M.HEADER),o=i.create(s,this._oServiceManager,this._oDataProviderFactory);o.attachEvent("action",function(E){this.fireEvent("action",{manifestParameters:E.getParameter("manifestParameters"),actionSource:E.getParameter("actionSource"),type:E.getParameter("type")});}.bind(this));var p=this.getAggregation("_header");if(p){p.destroy();}this.setAggregation("_header",o);if(o.isReady()){this.fireEvent("_headerReady");}else{o.attachEvent("_ready",function(){this.fireEvent("_headerReady");}.bind(this));}};
h.prototype._fireReady=function(o,r){if(o.isReady()){this.fireEvent(r);}else{o.attachEvent("_ready",function(){this.fireEvent(r);this.setBusy(false);}.bind(this));}};
h.prototype.onAfterRendering=function(){var s;if(this._oCardManifest&&this._oCardManifest.get(M.TYPE)){s=this._oCardManifest.get(M.TYPE).toLowerCase();}if(s==="analytical"){this.$().addClass("sapFCardAnalytical");}};
h.prototype._setCardContent=function(o){o.attachEvent("action",function(E){this.fireEvent("action",{actionSource:E.getParameter("actionSource"),manifestParameters:E.getParameter("manifestParameters"),type:E.getParameter("type")});}.bind(this));o.attachEvent("_error",function(E){this._handleError(E.getParameter("logMessage"),E.getParameter("displayMessage"));}.bind(this));o.setBusyIndicatorDelay(0);var p=this.getAggregation("_content");if(p&&p!==this._oTemporaryContent){p.destroy();}this.setAggregation("_content",o);if(o.isReady()){this.fireEvent("_contentReady");}else{o.attachEvent("_ready",function(){this.fireEvent("_contentReady");}.bind(this));}};
h.prototype._setTemporaryContent=function(){var t=this._getTemporaryContent(),p=this.getAggregation("_content");if(p&&p!==t){p.destroy();}this.setAggregation("_content",t);};
h.prototype._handleError=function(s,i){L.error(s);this.setBusy(false);this.fireEvent("_error",{message:s});var j="Unable to load the data.",E=i||j,t=this._getTemporaryContent(),p=this.getAggregation("_content");var o=new V({justifyContent:"Center",alignItems:"Center",items:[new I({src:"sap-icon://message-error",size:"1rem"}).addStyleClass("sapUiTinyMargin"),new T({text:E})]});if(p&&p!==t){p.destroy();this.fireEvent("_contentReady");}t.setBusy(false);t.addItem(o);this.setAggregation("_content",t);};
h.prototype._getTemporaryContent=function(){if(!this._oTemporaryContent){this._oTemporaryContent=new c({height:"100%",justifyContent:"Center",busyIndicatorDelay:0,busy:true});this._oTemporaryContent.addStyleClass("sapFCardContentBusy");this._oTemporaryContent.addEventDelegate({onAfterRendering:function(){if(!this._oCardManifest){return;}var t=this._oCardManifest.get(M.TYPE)+"Content",o=this._oCardManifest.get(M.CONTENT),s=B.getMinHeight(t,o);if(this.getHeight()==="auto"){this._oTemporaryContent.$().css({"min-height":s});}}},this);}this._oTemporaryContent.destroyItems();return this._oTemporaryContent;};
h.prototype.setDataMode=function(m){if(this._oDataProviderFactory&&m===g.Inactive){this._oDataProviderFactory.destroy();this._oDataProviderFactory=null;}this.setProperty("dataMode",m,true);if(this.getProperty("dataMode")===g.Active){this.refresh();}return this;};
return h;});
sap.ui.require.preload({
	"sap/ui/integration/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ui.integration","type":"library","embeds":[],"applicationVersion":{"version":"1.67.0"},"title":"SAPUI5 library with integration-related controls.","description":"SAPUI5 library with integration-related controls.","ach":"CA-UI5-CTR","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.67","libs":{"sap.ui.core":{"minVersion":"1.67.0"},"sap.f":{"minVersion":"1.67.0"}}},"library":{"i18n":"messagebundle.properties","css":false,"content":{"controls":["sap.ui.integration.widgets.Card","sap.ui.integration.host.HostConfiguration"],"elements":[],"types":["sap.ui.integration.CardActionType","sap.ui.integration.CardDataMode"]}}}}',
	"sap-ui-integration.js":function(){(function(w){"use strict";w["sap-ui-config"]={"bindingSyntax":"complex","compatVersion":"edge","async":true};var s,m,b;var c,C;s=document.getElementById("sap-ui-bootstrap");if(s){m=/^(?:.*\/)?resources\//.exec(s.getAttribute("src"));if(m){b=m[0];}}if(b==null){throw new Error("sap-ui-boot.js: could not identify script tag!");}
function l(u,f){var g=u.length,h=0;if(g===0){f();return;}function j(e){g--;if(e.type==='error'){h++;}e.target.removeEventListener("load",j);e.target.removeEventListener("error",j);if(g===0&&h===0&&f){f();}}for(var i=0;i<u.length;i++){var k=document.createElement("script");k.addEventListener("load",j);k.addEventListener("error",j);k.src=b+u[i];document.head.appendChild(k);}}
var p=[];if(/(trident)\/[\w.]+;.*rv:([\w.]+)/i.test(w.navigator.userAgent)){p.push("sap/ui/thirdparty/baseuri.js");p.push("sap/ui/thirdparty/es6-promise.js");p.push("sap/ui/thirdparty/es6-shim-nopromise.js");}else if(/(edge)[ \/]([\w.]+)/i.test(w.navigator.userAgent)||/(Version\/(11\.0)|PhantomJS).*Safari/.test(w.navigator.userAgent)){p.push("sap/ui/thirdparty/es6-promise.js");}l(p,function(){l(["ui5loader.js"],function(){sap.ui.loader.config({async:true});l(["ui5loader-autoconfig.js"],function(){a();});});});
function a(){if(w.sap&&w.sap.ui&&w.sap.ui.getCore){c=w.sap.ui.getCore();return d();}w.sap.ui.require(['/ui5loader-autoconfig','sap/ui/core/Core','sap/ui/integration/util/CustomElements'],function(e,f,g){C=g;f.boot();c=f;f.attachInit(function(){d();});C.coreInstance=c;});}
function r(L){var e=c.getLoadedLibraries()[L];var P=e.defaultTagPrefix,t=Object.keys(e.customTags);w.sap.ui.require(t.map(function(o,i){return e.customTags[t[i]];}),function(){var f=arguments;t.forEach(function(o,i){C.registerTag(t[i],P,f[i]);});});}
function d(){w.addEventListener("load",function(){c.loadLibraries(["sap/ui/integration"],{async:true}).then(function(){r("sap.ui.integration");});});}
})(window);
},
	"sap/ui/integration/library-bootstrap.js":function(){(function(w){"use strict";var c,C;var s=document.currentScript||document.querySelector("script[src*='/sap-ui-integration.js']");
function b(){if(w.sap&&w.sap.ui&&w.sap.ui.getCore){c=w.sap.ui.getCore();return a();}w.sap.ui.require(['sap/ui/core/Core','sap/ui/integration/util/CustomElements'],function(d,e){C=e;d.boot();c=d;d.attachInit(function(){a();});C.coreInstance=c;});}
function r(l){var L=c.getLoadedLibraries()[l];var p=s.getAttribute("prefix")||L.defaultTagPrefix,t=Object.keys(L.customTags),T=s.getAttribute("tags");if(T){t=T.split(",");}w.sap.ui.require(t.map(function(o,i){return L.customTags[t[i]];}),function(){var d=arguments;t.forEach(function(o,i){C.registerTag(t[i],p,d[i]);});});}
function a(){c.loadLibraries(["sap/ui/integration"],{async:true}).then(function(){r("sap.ui.integration");});}
b();})(window);
},
	"sap/ui/integration/sap-ui-integration-config.js":function(){window["sap-ui-config"]={"bindingSyntax":"complex","compatVersion":"edge","async":true};
}
},"sap/ui/integration/library-preload"
);
//# sourceMappingURL=library-preload.js.map