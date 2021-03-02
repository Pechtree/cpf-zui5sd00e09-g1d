/*
 * This module provides a function that actually initiates loading of the
 * launchpad content.
 */
sap.ui.define([
    "./common.set.launch.icons"
], function (fnSetLaunchIcons) {
    "use strict";

    return loadLaunchpadContent;

    function loadLaunchpadContent (sDomId) {
        fnSetLaunchIcons();

        //Lazy loading of iconfonts and AppConfiguration (avoid packing this module into cdm.js bundle)
        sap.ui.require(["sap/ushell/iconfonts", "sap/ushell/services/AppConfiguration"], function (IconFonts, Configuration) {
            // Create the default renderer asynchronously and place its UI5 control into the canvas div replacing the contents
            window.sap.ushell.Container.createRenderer(null, true).then(
                function (oContent) {
                    oContent.placeAt(sDomId || "canvas", "only");
                }
            );
            IconFonts.registerFiori2IconFont();
        });
    }

});
