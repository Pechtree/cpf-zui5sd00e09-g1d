/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var S={};S.render=function(r,s){r.write("<div");r.writeControlData(s);r.addClass("sapFSemanticPage");r.writeClasses();r.write(">");r.renderControl(s._getPage());r.write("</div>");};return S;},true);
