// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/datajs","sap/ui/core/ws/SapPcpWebSocket","sap/ushell/Config"],function(O,S,C){"use strict";function N(c,p,s){var m=new sap.ui.model.json.JSONModel(),t=new Date(),o=s&&s.config,r={getNotifications:{},getNotificationsByType:{},getNotificationsInGroup:{},getBadgeNumber:{},resetBadgeNumber:{},getNotificationTypesSettings:{},getNotificationsGroupHeaders:{},getMobileSupportSettings:{},getEmailSupportSettings:{},getWebSocketValidity:{},getNotificationCount:{}},w,W=o.webSocketUrl||"/sap/bc/apc/iwngw/notification_push_apc",P=o.pollingIntervalInSeconds||60,i=undefined,a=undefined,b=undefined,u=[],U=[],d=[],I=false,f=[],g=false,h=false,E=true,H,D,j=5000,k=6000,l=false,n={NOTIFICATIONS:0,NOTIFICATIONS_BY_TYPE:1,GET_BADGE_NUMBER:2,RESET_BADGE_NUMBER:3,GET_SETTINGS:4,GET_MOBILE_SUPPORT_SETTINGS:5,NOTIFICATIONS_GROUP_HEADERS:6,NOTIFICATIONS_IN_GROUP:7,GET_NOTIFICATIONS_COUNT:8,VALIDATE_WEBSOCKET_CHANNEL:9,GET_EMAIL_SUPPORT_SETTINGS:10,NOTIFICATIONS_BY_DATE_DESCENDING:"notificationsByDateDescending",NOTIFICATIONS_BY_DATE_ASCENDING:"notificationsByDateAscending",NOTIFICATIONS_BY_PRIORITY_DESCENDING:"notificationsByPriorityDescending",NOTIFICATIONS_BY_TYPE_DESCENDING:"notificationsByTypeDescending"},M={PACKAGED_APP:0,FIORI_CLIENT:1,WEB_SOCKET:2,POLLING:3},q,F=false,v,z=false,A=true,B=false,G=new jQuery.Deferred(),J=new jQuery.Deferred(),K,L,Q=G.promise(),R=false,T={},V=10,X=false,Y=false,Z=[];this.isEnabled=function(){if(!o.enabled||!o.serviceUrl){E=false;if(o.enabled&&!o.serviceUrl){jQuery.sap.log.warning("No serviceUrl was found in the service configuration");}}else{E=true;}return E;};this.init=function(){if((!g)&&(this.isEnabled())){sap.ui.getCore().getEventBus().subscribe("launchpad","sessionTimeout",this.destroy,this);this.lastNotificationDate=new Date();z=o.enableNotificationsPreview;this._setWorkingMode();g=true;this.bUpdateDependencyInitiatorExists=false;this._userSettingInitialization();}};this.getUnseenNotificationsCount=function(){var e=new jQuery.Deferred();e.resolve(m.getProperty("/UnseenCount"));return e.promise();};this.getNotificationsCount=function(){return m.getProperty("/NotificationsCount")?m.getProperty("/NotificationsCount"):"0";};this.getNotificationsByTypeWithGroupHeaders=function(){var e,x,y=new jQuery.Deferred(),$=this._getRequestURI(n.NOTIFICATIONS_BY_TYPE);x={requestUri:$};if(!this._getHeaderXcsrfToken()){e={};e["X-CSRF-Token"]="fetch";x.headers=e;}O.request(x,function(_){y.resolve(_);},function(_){if(_.response&&_.response.statusCode===200&&_.response.body){y.resolve(_.response.body);}else{y.reject(_);jQuery.sap.log.error("Notification service - oData executeAction failed: ",_,"sap.ushell.services.Notifications");}});return y.promise();};this.getNotificationsGroupHeaders=function(){var e,x,y=new jQuery.Deferred(),$=this._getRequestURI(n.NOTIFICATIONS_GROUP_HEADERS);x={requestUri:$};if(!this._getHeaderXcsrfToken()){e={};e["X-CSRF-Token"]="fetch";x.headers=e;}O.request(x,function(_){y.resolve(_);},function(_){if(_.response&&_.response.statusCode===200&&_.response.body){y.resolve(_.response.body);}else{y.reject();jQuery.sap.log.error("Notification service - oData executeAction failed: ",_,"sap.ushell.services.Notifications");}});return y.promise();};this.getNotificationsBufferInGroup=function(e,x,y){var $=this,_,a1,b1=new jQuery.Deferred(),c1={group:e,skip:x,top:y},d1,e1,f1=this._getRequestURI(n.NOTIFICATIONS_IN_GROUP,c1);if(R===true){d1=T[n.NOTIFICATIONS_IN_GROUP].slice(x,x+y);e1=JSON.stringify({"@odata.context":"$metadata#Notifications","value":d1});setTimeout(function(){b1.resolve(e1);},1000);}else{a1={requestUri:f1};if(!this._getHeaderXcsrfToken()){_={};_["X-CSRF-Token"]="fetch";a1.headers=_;}O.request(a1,function(g1){$._updateCSRF(g1.response);b1.resolve(g1.value);},function(g1){if(g1.response&&g1.response.statusCode===200&&g1.response.body){$._updateCSRF(g1.response);b1.resolve(JSON.parse(g1.response.body).value);}else{b1.reject();jQuery.sap.log.error("Notification service - oData executeAction failed: ",g1,"sap.ushell.services.Notifications");}});}return b1.promise();};this.getNotificationsBufferBySortingType=function(e,x,y){var $=this,_,a1,b1=new jQuery.Deferred(),c1={skip:x,top:y},d1,e1,f1=this._getRequestURI(e,c1);if(R===true){d1=T[e].slice(x,x+y);e1=JSON.stringify({"@odata.context":"$metadata#Notifications","value":d1});setTimeout(function(){b1.resolve(e1);},1000);}else{a1={requestUri:f1};if(!this._getHeaderXcsrfToken()){_={};_["X-CSRF-Token"]="fetch";a1.headers=_;}O.request(a1,function(g1){$._updateCSRF(g1.response);b1.resolve(g1.value);},function(g1){if(g1.response&&g1.response.statusCode===200&&g1.response.body){$._updateCSRF(g1.response);b1.resolve(JSON.parse(g1.response.body).value);}else{b1.reject();jQuery.sap.log.error("Notification service - oData executeAction failed: ",g1,"sap.ushell.services.Notifications");}});}return b1.promise();};this.getNotifications=function(){var e,x=new jQuery.Deferred();if((q===M.FIORI_CLIENT)||(q===M.PACKAGED_APP)){e=this._readNotificationsData(false);e.done(function(){x.resolve(m.getProperty("/Notifications"));}).fail(function(y){x.reject();});}else{x.resolve(m.getProperty("/Notifications"));}return x.promise();};this.executeBulkAction=function(e,x){var y=new jQuery.Deferred(),$=[],_=[],a1={succededNotifications:$,failedNotifications:_},b1=this;b1.sendBulkAction(e,x).done(function(c1){c1.forEach(function(d1,e1){var f1=d1.NotificationId,g1=d1.Success;if(g1){$.push(f1);}else{_.push(f1);}});if(_.length){y.reject(a1);}else{y.resolve(a1);}}).fail(function(){y.reject(a1);});return y.promise();};this.dismissBulkNotifications=function(e){var x=new jQuery.Deferred(),y=this;y.sendBulkDismiss(e).done(function(){x.resolve();}).fail(function(){x.reject();});return x.promise();};this.executeAction=function(e,x){var y=this,$=o.serviceUrl+"/ExecuteAction",_={NotificationId:e,ActionId:x},a1={requestUri:$,method:"POST",data:_,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},b1=new jQuery.Deferred();O.request(a1,function(c1){var d1,e1={isSucessfull:true,message:""};if(c1&&c1.response&&c1.response.statusCode===200&&c1.response.body){d1=JSON.parse(c1.response.body);e1.isSucessfull=d1.Success;e1.message=d1.MessageText;}b1.resolve(e1);},function(c1){var d1,e1={isSucessfull:false,message:""};if(c1.response&&c1.response.statusCode===200&&c1.response.body){d1=JSON.parse(c1.response.body);e1.isSucessfull=d1.Success;e1.message=d1.MessageText;b1.resolve(e1);}else if(y._csrfTokenInvalid(c1)&&(X===false)){y._invalidCsrfTokenRecovery(b1,y.executeAction,[e,x]);}else{b1.reject(c1);jQuery.sap.log.error("Notification service - oData executeAction failed: ",c1,"sap.ushell.services.Notifications");}});return b1.promise();};this.sendBulkAction=function(e,x){var y=this,$=o.serviceUrl+"/BulkActionByHeader",_={ParentId:e,ActionId:x},a1={requestUri:$,method:"POST",data:_,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},b1=new jQuery.Deferred();O.request(a1,function(c1){var d1,e1;if(c1&&c1.response&&c1.response.statusCode===200&&c1.response.body){d1=JSON.parse(c1.response.body);e1=d1.value;}b1.resolve(e1);},function(c1){var d1,e1;if(c1.response&&c1.response.statusCode===200&&c1.response.body){d1=JSON.parse(c1.response.body);e1=d1.value;b1.resolve(e1);}else if(y._csrfTokenInvalid(c1)&&(X===false)){y._invalidCsrfTokenRecovery(b1,y.sendBulkAction,[e,x]);}else{b1.reject();jQuery.sap.log.error("Notification service - oData executeBulkAction failed: ",c1.message,"sap.ushell.services.Notifications");}});return b1.promise();};this.sendBulkDismiss=function(e){var x=this,y=o.serviceUrl+"/DismissAll",$={ParentId:e},_={requestUri:y,method:"POST",data:$,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},a1=new jQuery.Deferred();O.request(_,function(b1){a1.resolve();},function(b1){if(b1.response&&b1.response.statusCode===200){a1.resolve();}else if(x._csrfTokenInvalid(b1)&&(X===false)){x._invalidCsrfTokenRecovery(a1,x.sendBulkDismiss,[e]);}else{a1.reject();var c1=b1?b1.message:"";jQuery.sap.log.error("Notification service - oData executeBulkAction failed: ",c1,"sap.ushell.services.Notifications");}});return a1.promise();};this.markRead=function(e){var x=this,y=o.serviceUrl+"/MarkRead",$={NotificationId:e},_={requestUri:y,method:"POST",data:$,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},a1=new jQuery.Deferred();O.request(_,function(b1){a1.resolve();},function(b1){if(x._csrfTokenInvalid(b1)&&(X===false)){x._invalidCsrfTokenRecovery(a1,x.markRead,[e]);}else{jQuery.sap.log.error("Notification service - oData reset badge number failed: ",b1,"sap.ushell.services.Notifications");a1.reject(b1);}});return a1.promise();};this.dismissNotification=function(e){var x=o.serviceUrl+"/Dismiss",y=this,$={NotificationId:e},_={requestUri:x,method:"POST",data:$,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},a1=new jQuery.Deferred();O.request(_,function(b1){y._addDismissNotifications(e);a1.resolve();},function(b1){if(y._csrfTokenInvalid(b1)&&(X===false)){y._invalidCsrfTokenRecovery(a1,y.dismissNotification,[e]);}else{a1.reject(b1);jQuery.sap.log.error("Notification service - oData dismiss notification failed: ",b1,"sap.ushell.services.Notifications");}});return a1.promise();};this.registerNotificationsUpdateCallback=function(e){u.push(e);};this.registerDependencyNotificationsUpdateCallback=function(e,x){if(x===false){this.bUpdateDependencyInitiatorExists=true;}U.push({callback:e,dependent:x});};this.registerNotificationCountUpdateCallback=function(e){d.push(e);};this.notificationsSeen=function(){this._setNotificationsAsSeen();};this.isFirstDataLoaded=function(){return F;};this.readSettings=function(){var e;e=this._readSettingsFromServer();return e;};this.saveSettingsEntry=function(e){var x;x=this._writeSettingsEntryToServer(e);return x;};this.getUserSettingsFlags=function(){var e=new jQuery.Deferred();if(B===true){e.resolve({previewNotificationEnabled:z,highPriorityBannerEnabled:A});}else{Q.done(function(){e.resolve({previewNotificationEnabled:z,highPriorityBannerEnabled:A});});}return e.promise();};this.setUserSettingsFlags=function(e){z=e.previewNotificationEnabled;A=e.highPriorityBannerEnabled;this._writeUserSettingsFlagsToPersonalization(e);};this._getNotificationSettingsMobileSupport=function(){return K;};this._getDismissNotifications=function(){return Z;};this.filterDismisssedItems=function(e,Z){return e.filter(function(x){return!Z.some(function(y){return y===x.originalItemId;});});};this._addDismissNotifications=function(e){if(Z.indexOf(e)===-1){Z.push(e);}};this._initializeDismissNotifications=function(){Z=[];};this._getNotificationSettingsEmailSupport=function(){return L;};this._getNotificationSettingsPreviewVisible=function(){return C.last("/core/shell/enableFiori3")!==true;};this.destroy=function(){h=true;if(i){clearTimeout(i);}else if(a){clearTimeout(a);}else if(b){clearTimeout(b);}if((q===M.WEB_SOCKET)&&w){w.close();}sap.ui.getCore().getEventBus().unsubscribe("launchpad","sessionTimeout",this.destroy,this);};this._readUnseenNotificationsCount=function(e){var x=this,y=new jQuery.Deferred(),$=this._getRequestURI(n.GET_BADGE_NUMBER),_={requestUri:$};O.read(_,function(a1,b1){m.setProperty("/UnseenCount",b1.data.GetBadgeNumber.Number);x._setNativeIconBadge(b1.data.GetBadgeNumber.Number);y.resolve(b1.data.GetBadgeNumber.Number);},function(a1){if(a1.response&&a1.response.statusCode===200&&a1.response.body){var b1=JSON.parse(a1.response.body);m.setProperty("/UnseenCount",b1.value);x._setNativeIconBadge(b1.value);y.resolve(b1.value);}else{jQuery.sap.log.error("Notification service - oData read unseen notifications count failed: ",a1.message,"sap.ushell.services.Notifications");y.reject(a1);}});return y.promise();};this.readNotificationsCount=function(){var e=new jQuery.Deferred(),x=this._getRequestURI(n.GET_NOTIFICATIONS_COUNT),y={requestUri:x};O.read(y,function($,_){e.resolve(_.data);},function($){if($.response&&$.response.statusCode===200&&$.response.body){var _=JSON.parse($.response.body);e.resolve(_.value);}else{jQuery.sap.log.error("Notification service - oData read notifications count failed: ",$.message,"sap.ushell.services.Notifications");e.reject($);}});return e.promise();};this._getNotificationSettingsAvalability=function(){return J.promise();};this._setNotificationsAsSeen=function(){var e=this,x=new jQuery.Deferred(),y=this._getRequestURI(n.RESET_BADGE_NUMBER),$={requestUri:y,method:"POST",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}};if(this._isFioriClientMode()===true||this._isPackagedMode()===true){this._setNativeIconBadge(0);}O.request($,function(_,a1){x.resolve();},function(_){if(e._csrfTokenInvalid(_)&&(X===false)){e._invalidCsrfTokenRecovery(x,e._setNotificationsAsSeen);}else{jQuery.sap.log.error("Notification service - oData reset badge number failed: ",_,"sap.ushell.services.Notifications");x.reject(_);}});return x.promise();};this._readNotificationsData=function(e){var x=this,y,$,_,a1=new jQuery.Deferred(),b1=[];y=this._readUnseenNotificationsCount(e);b1.push(y);_=this.readNotificationsCount();_.done(function(c1){m.setProperty("/NotificationsCount",c1);});$=this.getNotificationsBufferBySortingType(n.NOTIFICATIONS_BY_DATE_DESCENDING,0,V);b1.push($);jQuery.when.apply(jQuery,b1).then(function(c1){b1[0].done(function(d1){if(e===true){x._updateNotificationsCountConsumers();}});b1[1].done(function(d1){jQuery.sap.flpmeasure.start(0,"Notifications (services + rendering)",7);m.setProperty("/Notifications",d1);x._notificationAlert(d1);if(e===true){x._updateNotificationsConsumers();x._updateDependentNotificationsConsumers();}a1.resolve();});});return a1.promise();};this._getHeaderXcsrfToken=function(){return H;};this._getDataServiceVersion=function(){return D;};this._getRequestURI=function(e,x){var y,$=encodeURI(this._getConsumedIntents(e));switch(e){case n.NOTIFICATIONS:if(r.getNotifications.basic===undefined){r.getNotifications.basic=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$filter=IsGroupHeader%20eq%20false";}if(this._isIntentBasedConsumption()){if(r.getNotifications.byIntents===undefined){r.getNotifications.byIntents=r.getNotifications.basic.concat("&intents%20eq%20"+$);}return r.getNotifications.byIntents;}return r.getNotifications.basic;case n.NOTIFICATIONS_BY_TYPE:if(r.getNotificationsByType.basic===undefined){r.getNotificationsByType.basic=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams";}if(this._isIntentBasedConsumption()){if(r.getNotificationsByType.byIntents===undefined){r.getNotificationsByType.byIntents=r.getNotificationsByType.basic.concat("&$filter=intents%20eq%20"+$);}return r.getNotificationsByType.byIntents;}return r.getNotificationsByType.basic;case n.NOTIFICATIONS_GROUP_HEADERS:if(r.getNotificationsGroupHeaders.basic===undefined){r.getNotificationsGroupHeaders.basic=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$filter=IsGroupHeader%20eq%20true";}if(this._isIntentBasedConsumption()){if(r.getNotificationsGroupHeaders.byIntents===undefined){r.getNotificationsGroupHeaders.byIntents=r.getNotificationsGroupHeaders.basic.concat("&intents%20eq%20"+$);}return r.getNotificationsGroupHeaders.byIntents;}return r.getNotificationsGroupHeaders.basic;case n.NOTIFICATIONS_IN_GROUP:y=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$orderby=CreatedAt desc&$filter=IsGroupHeader eq false and ParentId eq "+x.group+"&$skip="+x.skip+"&$top="+x.top;if(this._isIntentBasedConsumption()===true){y=y.concat("&intents%20eq%20"+$);}break;case n.GET_BADGE_NUMBER:if(r.getBadgeNumber.basic===undefined){r.getBadgeNumber.basic=o.serviceUrl+"/GetBadgeNumber()";}if(this._isIntentBasedConsumption()){if(r.getBadgeNumber.byIntents===undefined){r.getBadgeNumber.byIntents=o.serviceUrl+"/GetBadgeCountByIntent("+$+")";}return r.getBadgeNumber.byIntents;}return r.getBadgeNumber.basic;case n.GET_NOTIFICATIONS_COUNT:if(r.getNotificationCount.basic===undefined){r.getNotificationCount.basic=o.serviceUrl+"/Notifications/$count";}return r.getNotificationCount.basic;case n.RESET_BADGE_NUMBER:if(r.resetBadgeNumber.basic===undefined){r.resetBadgeNumber.basic=o.serviceUrl+"/ResetBadgeNumber";}return r.resetBadgeNumber.basic;case n.GET_SETTINGS:if(r.getNotificationTypesSettings.basic===undefined){r.getNotificationTypesSettings.basic=o.serviceUrl+"/NotificationTypePersonalizationSet";}return r.getNotificationTypesSettings.basic;case n.GET_MOBILE_SUPPORT_SETTINGS:if(r.getMobileSupportSettings.basic===undefined){r.getMobileSupportSettings.basic=o.serviceUrl+"/Channels(ChannelId='SAP_SMP')";}return r.getMobileSupportSettings.basic;case n.GET_EMAIL_SUPPORT_SETTINGS:if(r.getEmailSupportSettings.basic===undefined){r.getEmailSupportSettings.basic=o.serviceUrl+"/Channels(ChannelId='SAP_EMAIL')";}return r.getEmailSupportSettings.basic;case n.VALIDATE_WEBSOCKET_CHANNEL:if(r.getWebSocketValidity.basic===undefined){r.getWebSocketValidity.basic=o.serviceUrl+"/Channels('SAP_WEBSOCKET')";}return r.getWebSocketValidity.basic;case n.NOTIFICATIONS_BY_DATE_DESCENDING:y=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$orderby=CreatedAt%20desc&$filter=IsGroupHeader%20eq%20false&$skip="+x.skip+"&$top="+x.top;if(this._isIntentBasedConsumption()===true){y=y.concat("&intents%20eq%20"+$);}break;case n.NOTIFICATIONS_BY_DATE_ASCENDING:y=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$orderby=CreatedAt%20asc&$filter=IsGroupHeader%20eq%20false&$skip="+x.skip+"&$top="+x.top;if(this._isIntentBasedConsumption()===true){y=y.concat("&intents%20eq%20"+$);}break;case n.NOTIFICATIONS_BY_PRIORITY_DESCENDING:y=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$orderby=Priority%20desc&$filter=IsGroupHeader%20eq%20false&$skip="+x.skip+"&$top="+x.top;if(this._isIntentBasedConsumption()===true){y=y.concat("&intents%20eq%20"+$);}break;default:y="";}return y;};this._readSettingsFromServer_noConnection=function(){var e=new jQuery.Deferred(),x=[{NotificationTypeId:"type1",NotificationTypeDesc:"aaaaabbbbb-cccccddddd",PriorityDefault:"40-HIGH",DoNotDeliver:false,DoNotDeliverMob:true},{NotificationTypeId:"type2",NotificationTypeDesc:"cccccdddddccc-aaaaabbbbb",PriorityDefault:"10-LOW",DoNotDeliver:true,DoNotDeliverMob:true}];e.resolve(JSON.stringify({"@odata.context":"$metadata#NotificationTypePersonalizationSet","value":x}));return e.promise();};this._readSettingsFromServer_noData=function(){var e=new jQuery.Deferred();e.resolve(JSON.stringify({"@odata.context":"$metadata#NotificationTypePersonalizationSet","value":{}}));return e.promise();};this._readSettingsFromServer=function(){var e=this._getRequestURI(n.GET_SETTINGS),x={requestUri:e},y=new jQuery.Deferred();O.request(x,function($){y.resolve($.results);},function($){if($.response&&$.response.statusCode===200&&$.response.body){y.resolve($.response.body);}else{y.reject($);jQuery.sap.log.error("Notification service - oData get settings failed: ",$,"sap.ushell.services.Notifications");}});return y.promise();};this._readMobileSettingsFromServer=function(){return this._readChannelSettingsFromServer(n.GET_MOBILE_SUPPORT_SETTINGS);};this._readEmailSettingsFromServer=function(){return this._readChannelSettingsFromServer(n.GET_EMAIL_SUPPORT_SETTINGS);};this._readChannelSettingsFromServer=function(e){var x=this._getRequestURI(e),y={requestUri:x},$=new jQuery.Deferred(),_,a1;O.request(y,function(b1){if(typeof(b1.results)==="string"){_=JSON.parse(b1.results);_.successStatus=true;a1=JSON.stringify(_);$.resolve(a1);}else{b1.results.successStatus=true;$.resolve(b1.results);}},function(b1){if(b1.response&&b1.response.statusCode===200&&b1.response.body){_=JSON.parse(b1.response.body);_.successStatus=true;a1=JSON.stringify(_);$.resolve(a1);}else{$.resolve(JSON.stringify({successStatus:false}));jQuery.sap.log.error("Notification service - oData get settings failed: ",b1,"sap.ushell.services.Notifications");}});return $.promise();};this._checkWebSocketActivity=function(){var e=this._getRequestURI(n.VALIDATE_WEBSOCKET_CHANNEL),x={requestUri:e},y=new jQuery.Deferred(),$;O.request(x,function(_){if(typeof(_.results)==="string"){$=JSON.parse(_.results);y.resolve($.IsActive);}else{y.resolve(false);}},function(_){if(_.response&&_.response.statusCode===200&&_.response.body){$=JSON.parse(_.response.body);y.resolve($.IsActive);}else{y.resolve(false);jQuery.sap.log.error("Notification service - oData get settings failed: ",_,"sap.ushell.services.Notifications");}});return y.promise();};this._writeSettingsEntryToServer=function(e){var x=this,y,$=this._getRequestURI(n.GET_SETTINGS)+"(NotificationTypeId="+e.NotificationTypeId+")",_={requestUri:$,method:"PUT",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}};_.data=JSON.parse(JSON.stringify(e));_.data["@odata.context"]="$metadata#NotificationTypePersonalizationSet/$entity";y=new jQuery.Deferred();O.request(_,function(a1){y.resolve(a1);},function(a1){if(a1.response&&a1.response.statusCode===200&&a1.response.body){y.resolve(a1.response.body);}else if(x._csrfTokenInvalid(a1)&&(X===false)){x._invalidCsrfTokenRecovery(y,x._writeSettingsEntryToServer,[e]);}else{y.reject(a1);jQuery.sap.log.error("Notification service - oData set settings entry failed: ",a1,"sap.ushell.services.Notifications");}});return y.promise();};this._updateNotificationsConsumers=function(){u.forEach(function(e){e();});};this._updateDependentNotificationsConsumers=function(){var e=this,x=new jQuery.Deferred();U.forEach(function(y){if(e.bUpdateDependencyInitiatorExists===false){y.callback();}else if(y.dependent===true){y.callback(x.promise());}else{y.callback(x);}});};this._updateNotificationsCountConsumers=function(){d.forEach(function(e){e();});};this._updateAllConsumers=function(){this._updateNotificationsConsumers();this._updateNotificationsCountConsumers();this._updateDependentNotificationsConsumers();};this._getModel=function(){return m;};this._getMode=function(){return q;};this._setWorkingMode=function(){var e;if(o.intentBasedConsumption===true){f=this._getIntentsFromConfiguration(o.consumedIntents);if(f.length>0){I=true;}}if(this._isPackagedMode()){q=M.PACKAGED_APP;e=this._getIntentsFromConfiguration(window.fiori_client_appConfig.applications);if(e.length>0){f=e;}if(f.length>0){I=true;}this._registerForPush();this._readNotificationsData(true);this._setNativeIconBadgeWithDelay();return;}this._performFirstRead();};this._performFirstRead=function(){var e=this,x,y=this._readNotificationsData(true);y.done(function(){x=e._getFioriClientRemainingDelay();if(x<=0){e._fioriClientStep();}else{i=setTimeout(function(){e._fioriClientStep();},x);}F=true;}).fail(function($){jQuery.sap.log.error("Notifications oData read failed. Error: "+$);return;});};this._fioriClientStep=function(){var e=this,x;if(this._isFioriClientMode()){q=M.FIORI_CLIENT;this._addPushNotificationHandler();x=this.getUnseenNotificationsCount();x.done(function(y){e._setNativeIconBadge(y,function(){});}).fail(function(){});}else{this._webSocketStep();}};this._webSocketStep=function(){q=M.WEB_SOCKET;this._establishWebSocketConnection();};this._webSocketRecoveryStep=function(){if(l===false){l=true;a=setTimeout(function(){this._webSocketStep();}.bind(this),j);}else{this._activatePollingAfterInterval();}};this._activatePollingAfterInterval=function(){var e=this;b=setTimeout(function(){e._activatePolling();},P*1000);};this._activatePolling=function(){var e=this;q=M.POLLING;this._readNotificationsData(true);b=setTimeout(e._activatePolling.bind(e,P,false),(P*1000));};this._formatAsDate=function(e){return new Date(e);};this._notificationAlert=function(e){if(A===false){return;}var x,y=[],$=0;for(x in e){if(this.lastNotificationDate&&this._formatAsDate(e[x].CreatedAt)>this.lastNotificationDate){if(e[x].Priority==="HIGH"){y.push(e[x]);}}if($<this._formatAsDate(e[x].CreatedAt)){$=this._formatAsDate(e[x].CreatedAt);}}if(this.lastNotificationDate&&y&&y.length>0){sap.ui.getCore().getEventBus().publish("sap.ushell.services.Notifications","onNewNotifications",y);}this.lastNotificationDate=$;};this._getFioriClientRemainingDelay=function(){return k-(new Date()-t);};this._establishWebSocketConnection=function(){var x=this,y=false,$;try{w=this._getWebSocketObjectObject(W,[S.SUPPORTED_PROTOCOLS.v10]);w.attachMessage(this,function(_,a1){$=_.getParameter("pcpFields");if(($)&&($.Command)&&($.Command==="Notification")){x._readNotificationsData(true);}});w.attachOpen(this,function(_){x._checkWebSocketActivity().done(function(a1){if(!a1){y=true;w.close();x._activatePollingAfterInterval();}});jQuery.sap.log.info("Notifications UShell service WebSocket: webSocket connection opened");});w.attachClose(this,function(_,a1){jQuery.sap.log.warning("Notifications UShell service WebSocket: attachClose called with code: "+_.mParameters.code+" and reason: "+_.mParameters.reason);if((!h)&&(!y)){x._webSocketRecoveryStep();}});w.attachError(this,function(_,a1){jQuery.sap.log.warning("Notifications UShell service WebSocket: attachError called!");});}catch(e){jQuery.sap.log.error("Exception occurred while creating new sap.ui.core.ws.SapPcpWebSocket. Message: "+e.message);}};this._isFioriClientMode=function(){return!(sap.FioriClient===undefined);};this._isPackagedMode=function(){return(window.fiori_client_appConfig&&window.fiori_client_appConfig.prepackaged===true);};this._setNativeIconBadge=function(e){if((sap.Push!==undefined)&&(sap.Push.setBadgeNumber!==undefined)){sap.Push.setBadgeNumber(e,function(){});}};this._setNativeIconBadgeWithDelay=function(){var e=this,x;setTimeout(function(){x=e.getUnseenNotificationsCount();x.done(function(y){e._setNativeIconBadge(y);}).fail(function(){});},4000);};this._getIntentsFromConfiguration=function(e){var x=[],y,$;if(e&&e.length>0){for($=0;$<e.length;$++){y=e[$].intent;x.push(y);}}return x;};this._handlePushedNotification=function(e){var x,y,$,_,a1=[],b1;if(e!==undefined){if((e.additionalData===undefined)||(e.additionalData.foreground===true)){this._readNotificationsData(true);}else{if(e.additionalData&&e.additionalData.NavigationTargetObject){y=e.additionalData.NavigationTargetObject;}else{y=e.NavigationTargetObject;}if(e.additionalData&&e.additionalData.NavigationTargetAction){$=e.additionalData.NavigationTargetAction;}else{$=e.NavigationTargetAction;}if(e.additionalData&&e.additionalData.NavigationTargetParam){_=e.additionalData.NavigationTargetParam;}else{_=e.NavigationTargetParam;}if(_){if(typeof _==='string'||_ instanceof String){a1[0]=_;}else if(Array.isArray(_)===true){a1=_;}}x=e.NotificationId;if((typeof hasher!=="undefined")&&(hasher.getHash()===y+"-"+$)){b1=sap.ui.getCore().byId('viewPortContainer');if(b1){b1.switchState("Center");}}sap.ushell.utils.toExternalWithParameters(y,$,a1);this.markRead(x);this._readNotificationsData(true);}}};this._registerForPush=function(){sap.Push.initPush(this._handlePushedNotification.bind(this));};this._addPushNotificationHandler=function(){document.addEventListener("deviceready",this._registerForPush.bind(this),false);};this._isIntentBasedConsumption=function(){return I;};this._getConsumedIntents=function(e){var x="",y;if(!this._isIntentBasedConsumption()){return x;}if(f.length>0){if(e!==n.GET_BADGE_NUMBER){x="&";}for(y=0;y<f.length;y++){if(e===n.GET_BADGE_NUMBER){if(y===0){x=f[y];}else{x=x+","+f[y];}}else{x=x+"NavigationIntent%20eq%20%27"+f[y]+"%27";}}}return x;};this._revalidateCsrfToken=function(){var e;H=undefined;Y=false;e=this.getNotificationsBufferBySortingType(n.NOTIFICATIONS_BY_DATE_DESCENDING,0,1);return e.promise();};this._csrfTokenInvalid=function(e){return(e.response&&(e.response.statusCode===403)&&(e.response.headers["x-csrf-token"]==="Required"));};this._invalidCsrfTokenRecovery=function(x,y,$){var _=this,a1=this._revalidateCsrfToken(),b1;X=true;a1.done(function(){b1=y.apply(_,$);b1.done(function(e){X=false;x.resolve(e);});b1.fail(function(e){X=false;if(e.response&&e.response.statusCode===200&&e.response.body){x.resolve(e.response.body);}else{x.reject(e);}});});a1.fail(function(e){X=false;x.reject(e);jQuery.sap.log.error("Notification service - oData markRead failed: ",e.message,"sap.ushell.services.Notifications");});};this._notificationsAscendingSortBy=function(e,$){e.sort(function(x,y){var _=x[$],a1=y[$];if(_===a1){_=x.id;a1=y.id;}return a1>_?-1:1;});return e;};this._getWebSocketObjectObject=function(W,e){return new S(W,e);};this._notificationsDescendingSortBy=function(e,$){e.sort(function(x,y){var _=x[$],a1=y[$];if(_===a1){_=x.id;a1=y.id;return _>a1?-1:1;}if($==="Priority"){if(_==="HIGH"){return-1;}if(a1==="HIGH"){return 1;}if(_==="MEDIUM"){return-1;}return 1;}return _>a1?-1:1;});return e;};this.getOperationEnum=function(){return n;};this._readUserSettingsFlagsFromPersonalization=function(){var e=this,x,y;try{y=this._getUserSettingsPersonalizer().getPersData();}catch($){jQuery.sap.log.error("Personalization service does not work:");jQuery.sap.log.error($.name+": "+$.message);x=new jQuery.Deferred();x.reject($);y=x.promise();}y.done(function(_){if(_===undefined){e._writeUserSettingsFlagsToPersonalization({previewNotificationEnabled:z,highPriorityBannerEnabled:A});}else{z=_.previewNotificationEnabled;A=_.highPriorityBannerEnabled;}B=true;G.resolve();});y.fail(function(){jQuery.sap.log.error("Reading User Settings flags from Personalization service failed");});};this._writeUserSettingsFlagsToPersonalization=function(e){var x,y;try{y=this._getUserSettingsPersonalizer().setPersData(e);}catch($){jQuery.sap.log.error("Personalization service does not work:");jQuery.sap.log.error($.name+": "+$.message);x=new jQuery.Deferred();x.reject($);y=x.promise();}return y;};this._getUserSettingsPersonalizer=function(){if(v===undefined){v=this._createUserSettingsPersonalizer();}return v;};this._createUserSettingsPersonalizer=function(){var e=sap.ushell.Container.getService("Personalization"),x,y={keyCategory:e.constants.keyCategory.FIXED_KEY,writeFrequency:e.constants.writeFrequency.LOW,clientStorageAllowed:true},$={container:"sap.ushell.services.Notifications",item:"userSettingsData"},_=e.getPersonalizer($,y,x);return _;};this._updateCSRF=function(e){if((Y===true)||(e.headers===undefined)){return;}if(!this._getHeaderXcsrfToken()){H=e.headers["x-csrf-token"]||e.headers["X-CSRF-Token"]||e.headers["X-Csrf-Token"];}if(!this._getDataServiceVersion()){D=e.headers.DataServiceVersion||e.headers["odata-version"];}Y=true;};this._userSettingInitialization=function(){var e,x,y,$={settingsAvailable:false,mobileAvailable:false,emailAvailable:false},_,a1,b1,c1;this._readUserSettingsFlagsFromPersonalization();e=this._readSettingsFromServer();x=this._readMobileSettingsFromServer();y=this._readEmailSettingsFromServer();_=[e,x,y];e.done(function(){$.settingsAvailable=true;});x.done(function(d1){a1=JSON.parse(d1);b1=a1.successStatus;if(b1){K=d1?a1.IsActive:false;$.mobileAvailable=K;}else{K=false;$.mobileAvailable=false;}});y.done(function(d1){a1=JSON.parse(d1);c1=a1.successStatus;if(c1){L=d1?a1.IsActive:false;$.emailAvailable=L;}else{L=false;$.emailAvailable=false;}});jQuery.when.apply(jQuery,_).then(function(d1){J.resolve($);});};}N.hasNoAdapter=true;return N;},true);
