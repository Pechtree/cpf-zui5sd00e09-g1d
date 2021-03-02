/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/Icon","sap/ui/core/IconPool","sap/m/Image"],function(M,I,a,b){"use strict";var O=function(){};O.createObjectImage=function(h){var o,s=h.getObjectImageURI();if(s.indexOf("sap-icon://")===0){o=new I();o.addStyleClass("sapUxAPObjectPageHeaderObjectImageIcon");}else{o=new b({densityAware:h.getObjectImageDensityAware(),alt:M.escapeSettingsValue(h.getObjectImageAlt()),decorative:false,mode:"Background",backgroundSize:"contain",backgroundPosition:"center"});o.addStyleClass("sapUxAPObjectPageHeaderObjectImage");}o.setSrc(s);if(h.getObjectImageAlt()){o.setTooltip(h.getObjectImageAlt());}return o;};O.createPlaceholder=function(){return a.createControlByURI({src:a.getIconURI("picture"),visible:true});};O._renderImageAndPlaceholder=function(r,o){var h=o.oHeader,c=o.oObjectImage,p=o.oPlaceholder,i=o.bIsObjectIconAlwaysVisible,A=o.bAddSubContainer,B=o.sBaseClass,s=!(h.getObjectImageShape()||h.getShowPlaceholder()),d=(c instanceof I);if(h.getObjectImageURI()||h.getShowPlaceholder()){r.write("<span ");r.addClass(B);r.addClass('sapUxAPObjectPageHeaderObjectImage-'+h.getObjectImageShape());if(i){r.addClass('sapUxAPObjectPageHeaderObjectImageForce');}r.writeClasses();r.write(">");if(A){r.write("<span class='sapUxAPObjectPageHeaderObjectImageContainerSub'>");}if(d){r.write("<div");r.addClass("sapUxAPObjectPageHeaderObjectImage");r.addClass("sapUxAPObjectPageHeaderPlaceholder");r.writeClasses();r.write(">");}r.renderControl(c);O._renderPlaceholder(r,p,s);if(d){r.write("</div>");}if(A){r.write("</span>");}r.write("</span>");}};O._renderPlaceholder=function(r,p,v){r.write("<div");r.addClass('sapUxAPObjectPageHeaderPlaceholder');r.addClass('sapUxAPObjectPageHeaderObjectImage');if(!v){r.addClass('sapUxAPHidePlaceholder');}r.writeClasses();r.write(">");r.renderControl(p);r.write("</div>");};return O;},false);
