// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ui/thirdparty/URI'],function(U){"use strict";function c(o){if(o===undefined){return undefined;}return jQuery.extend(true,{},o);}function g(u){var o;if(u.host&&typeof u.host==="function"&&u.host()){o=u.host();if(typeof u.protocol==="function"&&u.protocol()){o=u.protocol()+"://"+o;}return o;}return"";}function i(t){return t.indexOf("sap_")===0;}var a=function(C){var b=[],B,s,o,n,e=new sap.ui.base.EventProvider();this.getEmail=function(){return C.email;};this.getFirstName=function(){return C.firstName;};this.getFullName=function(){return C.fullName;};this.getId=function(){return C.id;};this.getLanguage=function(){return C.language;};this.getLanguageBcp47=function(){return C.languageBcp47;};this.getLastName=function(){return C.lastName;};this.getImage=function(){return C.image;};this.setImage=function(u){C.image=u;e.fireEvent('onSetImage',u);};this.attachOnSetImage=function(f,d){e.attachEvent('onSetImage',f,d);};this.isJamActive=function(){return C.isJamActive===true;};this.isLanguagePersonalized=function(){return C.isLanguagePersonalized===true;};this.getTheme=function(t){if(t===a.prototype.constants.themeFormat.ORIGINAL_THEME){return o.originalTheme.theme;}if(t===a.prototype.constants.themeFormat.THEME_NAME_PLUS_URL){return o.theme+(o.locationPath?"@"+o.locationOrigin+o.locationPath:"");}if(t===a.prototype.constants.themeFormat.NWBC){if(i(o.theme)){return o.theme;}else{return this.getTheme(a.prototype.constants.themeFormat.THEME_NAME_PLUS_URL);}}return o.theme;};this.getThemeRoot=function(t){if(C.ranges&&C.ranges.theme&&C.ranges.theme[t]&&C.ranges.theme[t].themeRoot){return C.ranges.theme[t].themeRoot;}else{return"";}};this.setTheme=function(N){if(this.isSetThemePermitted()===false){var E="setTheme not permitted";jQuery.sap.log.error(E);throw new Error(E);}o=this._amendTheme({theme:N,root:this.getThemeRoot(N)},s);if(N!==n.originalTheme.theme){this.setChangedProperties({propertyName:"theme",name:"THEME"},n.originalTheme.theme,N);n=o;}if(o.suppliedRoot){sap.ui.getCore().applyTheme(o.theme,o.suppliedRoot+"/UI5/");}else if(o.path){sap.ui.getCore().applyTheme(o.theme,o.path+"/UI5/");}else{sap.ui.getCore().applyTheme(o.theme);}};this.setLanguage=function(N){if(N){this.setChangedProperties({propertyName:"language",name:"LANGUAGE"},C.language,N);C.language=N;}};this.getAccessibilityMode=function(){return C.accessibility;};this.setAccessibilityMode=function(A){if(this.isSetAccessibilityPermitted()===false){var E="setAccessibilityMode not permitted";jQuery.sap.log.error(E);throw new Error(E);}C.accessibility=A;};this.isSetAccessibilityPermitted=function(){return C.setAccessibilityPermitted;};this.isSetThemePermitted=function(){return C.setThemePermitted;};this.getContentDensity=function(){return C.contentDensity;};this.setContentDensity=function(d){if(this.isSetContentDensityPermitted()===false){var E="setContentDensity not permitted";jQuery.sap.log.error(E);throw new Error(E);}this.setChangedProperties({propertyName:"contentDensity",name:"CONTENT_DENSITY"},C.contentDensity,d);C.contentDensity=d;};this.isSetContentDensityPermitted=function(){return C.setContentDensityPermitted;};this.getChangedProperties=function(){return jQuery.extend(true,[],b);};this.setChangedProperties=function(p,d,f){b.push({propertyName:p.propertyName,name:p.name,oldValue:d,newValue:f});};this.resetChangedProperties=function(){b=[];};this.getTrackUsageAnalytics=function(){return C.trackUsageAnalytics;};this.setTrackUsageAnalytics=function(t){this.setChangedProperties({propertyName:"trackUsageAnalytics",name:"TRACKING_USAGE_ANALYTICS"},C.trackUsageAnalytics,t);C.trackUsageAnalytics=t;};this.setImageConsent=function(d){this.setChangedProperties({propertyName:"isImageConsent",name:"ISIMAGECONSENT"},C.isImageConsent,d);C.isImageConsent=d;};this.getImageConsent=function(){return C.isImageConsent;};s={locationPathUi5:(new U(jQuery.sap.getModulePath(""))).absoluteTo(document.location).pathname(),locationPathCustom:C.themeRoot||"",locationOrigin:g(new U(document.location))};if(!s.locationPathUi5){jQuery.sap.log.warning("User: Could not set UI5 location path");}if(!s.locationPathCustom){jQuery.sap.log.warning("User: Could not set location path for custom themes");}if(!s.locationOrigin){jQuery.sap.log.warning("User: Could not set front-end server location origin");}B=C.bootTheme||{theme:"",root:""};o=this._amendTheme(B,s);n=o;};a.prototype._amendTheme=function(t,s){var T={},b,r;function d(R,s){var u,o,p={};u=new U(R);o=g(u);if(o){p.locationOrigin=o;p.locationPath=u.path();}else{p.locationOrigin=s.locationOrigin;p.locationPath=R;}return p;}if(!t||!t.theme||!s){return{originalTheme:{theme:"",root:""},theme:"",suppliedRoot:"",path:"",locationPath:"",locationOrigin:""};}T.originalTheme=c(t);if(T.originalTheme.theme.indexOf("@")>0){b=T.originalTheme.theme.split('@',2);T.theme=b[0];T.suppliedRoot=b[1];r=d(b[1],s);T.locationPath=r.locationPath;T.path=T.locationPath;T.locationOrigin=r.locationOrigin;return T;}T.theme=T.originalTheme.theme;if(T.originalTheme.root){T.suppliedRoot=T.originalTheme.root;r=d(T.originalTheme.root,s);T.locationPath=r.locationPath;T.path=T.locationPath;T.locationOrigin=r.locationOrigin;return T;}T.suppliedRoot="";if(i(T.theme)){T.locationOrigin=s.locationOrigin;T.locationPath=s.locationPathUi5;T.path="";return T;}T.locationOrigin=s.locationOrigin;T.locationPath=s.locationPathCustom;T.path=T.locationPath;return T;};a.prototype.constants={themeFormat:{ORIGINAL_THEME:"O",THEME_NAME_PLUS_URL:"N+U",NWBC:"NWBC"}};return a;},true);