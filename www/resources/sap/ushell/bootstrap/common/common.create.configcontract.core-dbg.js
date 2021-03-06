// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
/*
 * This module provides with a factory to define the configuration for the FLP
 * core component.
 */
sap.ui.define([
    "sap/ui/thirdparty/URI"
],
function (URI) {
    "use strict";

    var oURI;

    /**
     * Retrieves a value from the URI query-string.
     *
     * @param {string} sParameterKey the parameter key
     * @param {boolean} bDefaultValue optional default value
     * @returns {boolean} <code>true</code> if a parameter with specified key
     *  is set to true (case-insensitive) or the defaultValue or <code>false</code>
     */
    function getBooleanUriParameterValue (sParameterKey, bDefaultValue) {
        var vValue;

        oURI = oURI || new URI();       // only initialize once

        vValue = oURI.query(true)[sParameterKey];

        function toBoolean (sValue) {
            return /^true$/i.test(vValue);
        }

        return vValue ? toBoolean(vValue) : bDefaultValue;
    }

    function fnCreateConfigContract (oMergedSapUshellConfig) {
        var oGetConfigValueMemory = {},
            bEnableFiori3;

        /**
         * Retrieves a value from oMergedSapUshellConfig configuration given
         * a path. This method memoizes the parent path accessed in order to
         * provide fast access across multiple calls.
         *
         * @param {object} oMemory
         *   A memory area used to memoize the parent path to avoid iterating
         *   on a deeply nested object.
         *
         * @param {string} sPath
         *   A '/'-separated path to a property in
         *   <code>oMergedSapUshellConfig</code>, not starting with a '/'
         *   character.
         *
         * @returns {variant}
         *   A property of <code>oMergedSapUshellConfig</code> that can be
         *   found under the given <code>sPath</code>.
         *
         * @private
         */
        function getValueFromConfig (oMemory, sPath) {
            var aPathParts = sPath.split("/");
            var sParentPath = aPathParts.slice(0, aPathParts.length - 1).join("/");
            var sLastPart = aPathParts.pop();

            if (oMemory.hasOwnProperty(sParentPath)) {
                return oMemory[sParentPath][sLastPart];
            }

            var oDeepObject = aPathParts.reduce(function (oObject, sPathPart) {
                if (!oObject || !oObject.hasOwnProperty(sPathPart)) {
                    return {};
                }
                return oObject[sPathPart];
            }, oMergedSapUshellConfig);

            // avoid iterating on a deep structure next time.
            oMemory[sParentPath] = oDeepObject;

            return oDeepObject[sLastPart];
        }

        function getConfigValue (sPath, oDefaultValue) {
            var oSegment = getValueFromConfig(oGetConfigValueMemory, sPath);

            return oSegment !== undefined ? oSegment : oDefaultValue;
        }

        /* This replaces the original logic for enableEasyAccess in the flp component
         * Both pairs enableEasyAccessSAPMenu / enableEasyAccessSAPMenuSearch
         *            and
         *            enableEasyAccessUserMenu / enableEasyAccessUserMenuSearch
         * follow the same logic:
         * Unless enableEasyAccess is true, set to false.
         * Then, the *MenuSearch parameter depends on the corresponding *Menu one
         * (*Menu is set independently).
         * If *Menu is defined and false, *MenuSearch will be false.
         * Else, if *MenuSearch exists we keep the value.
         * EnableEasyAccess is kept as a default.
         * */
        function enableSearchTest (sParentConfig, sOwnConfig) {
            var bEnableEasyAccess = getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableEasyAccess",
                undefined);
            var bParentConfig = getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/"+sParentConfig, undefined);
            var bOwnConfig = getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/"+sOwnConfig, undefined);

            bParentConfig = (bEnableEasyAccess === false) ? false : bParentConfig;
            bParentConfig = (bParentConfig !== undefined) ? bParentConfig : bEnableEasyAccess;

            if (bEnableEasyAccess === undefined || bEnableEasyAccess) {
                if (bParentConfig === false) {
                    return false;
                }

                return (bOwnConfig !== undefined) ? bOwnConfig : bParentConfig;
            }

            return false;
        }

        bEnableFiori3 = getBooleanUriParameterValue("sap-ushell-xx-fiori3",
                getConfigValue("ushell/shell/enableFiori3", true));

        /*
         * Contract of configuration defines *FLP* features and points to
         * the owner component of a feature. Each flag it must be expressed
         * with the following path prefix.
         *
         * "/<owner component short name>/<functionality>/<feature>"
         */
        var oConfigDefinition = {
            core: {  // the unified shell core
                extension: {
                    enableHelp: getConfigValue("renderers/fiori2/componentData/config/enableHelp", false),
                    EndUserFeedback: getConfigValue("services/EndUserFeedback/config/enabled", true),
                    SupportTicket: getConfigValue("services/SupportTicket/config/enabled", false)
                },
                navigation: {
                    enableInPlaceForClassicUIs: {
                        GUI: getConfigValue("services/ClientSideTargetResolution/config/enableInPlaceForClassicUIs/GUI", false),
                        WDA: getConfigValue("services/ClientSideTargetResolution/config/enableInPlaceForClassicUIs/WDA", false),
                        WCF: getConfigValue("services/ClientSideTargetResolution/config/enableInPlaceForClassicUIs/WCF", true)
                    },
                    enableWebguiLocalResolution: true,
                    enableWdaLocalResolution: true
                },
                notifications: {
                    enableNotificationsPreview:
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/initialStateNotificationsPreview",
                            getConfigValue("services/Notifications/config/enableNotificationsPreview", false))
                },
                shellHeader: {
                    application: {},
                    centralAreaElement: null,
                    headEndItems: [],
                    headItems: [],
                    headerVisible: true,
                    showLogo: false,
                    ShellAppTitleState: undefined,
                    rootIntent: getConfigValue("renderers/fiori2/componentData/config/rootIntent", ""),
                    title: "" // no default value for title
                },
                shell: {
                    animationMode: getConfigValue("renderers/fiori2/componentData/config/animationMode", "full"),
                    enablePersonalization: getConfigValue("renderers/fiori2/componentData/config/enablePersonalization",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enablePersonalization", true)),
                    enableRecentActivity: getConfigValue("renderers/fiori2/componentData/config/enableRecentActivity", true),
                    enableRecentActivityLogging: getConfigValue("renderers/fiori2/componentData/config/enableRecentActivityLogging", true),
                    enableFiori3: bEnableFiori3,
                    model: {
                        enableSAPCopilotWindowDocking: undefined,
                        enableBackGroundShapes: true,
                        personalization: undefined,
                        contentDensity: undefined,
                        setTheme: undefined,
                        userDefaultParameters: undefined,
                        disableHomeAppCache: undefined,
                        enableHelp: undefined,
                        enableTrackingActivity: undefined,
                        animationMode: "full",
                        searchAvailable: false,
                        searchFiltering: true,
                        showEndUserFeedback: false,
                        searchTerm: "",
                        isPhoneWidth: false,
                        enableNotifications: getConfigValue("services/Notifications/config/enabled", false),
                        enableNotificationsUI: false,
                        notificationsCount: 0,
                        currentViewPortState: "Center",
                        userStatus: undefined,
                        migrationConfig: undefined,
                        allMyAppsMasterLevel: undefined,
                        options: [],
                        userStatusUserEnabled: true,
                        shellAppTitleData: {
                            currentViewInPopover: "navigationMenu",
                            enabled: false,
                            showGroupsApps: false,
                            showCatalogsApps: false,
                            showExternalProvidersApps: false
                        },
                        userPreferences: {
                            dialogTitle: "Settings",
                            isDetailedEntryMode: false,
                            activeEntryPath: null,
                            entries: [],
                            profiling: []
                        },
                        userImage: {
                            personPlaceHolder: "sap-icon://person-placeholder",
                            account: "sap-icon://account"
                        },
                        currentState: {
                            stateName: "blank",
                            showCurtain: false,
                            showCatalog: false,
                            showPane: false,
                            showRightFloatingContainer: false,
                            showRecentActivity: true,
                            search: "",
                            paneContent: [],
                            actions: [
                            ],
                            floatingActions: [],
                            subHeader: [],
                            toolAreaItems: [],
                            RightFloatingContainerItems: [],
                            toolAreaVisible: false,
                            floatingContainerContent: []
                        }
                    }
                },
                home: {
                    animationRendered: false,
                    disableSortedLockedGroups:
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/disableSortedLockedGroups", false),
                    draggedTileLinkPersonalizationSupported: true,
                    editTitle: false,
                    enableActionModeFloatingButton: getConfigValue("renderers/fiori2/componentData/config/enableActionModeFloatingButton",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableActionModeFloatingButton",
                            true)),
                    enableActionModeMenuButton: getConfigValue("renderers/fiori2/componentData/config/enableActionModeMenuButton",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableActionModeMenuButton", true)),
                    enableHomePageSettings:
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableHomePageSettings", true),
                    enableRenameLockedGroup:
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableRenameLockedGroup", false),
                    enableTileActionsIcon: getConfigValue("renderers/fiori2/componentData/config/enableTileActionsIcon",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableTileActionsIcon", false)),
                    enableTilesOpacity: getConfigValue("services/ClientSideTargetResolution/config/enableTilesOpacity",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableTilesOpacity", true)),
                    featuredGroup: {
                        enable: getConfigValue("ushell/home/featuredGroup/enable", false)
                                && bEnableFiori3,
                        frequentCard: getConfigValue("ushell/home/featuredGroup/frequentCard", true)
                                    && getConfigValue("ushell/home/featuredGroup/enable", false)
                                    && bEnableFiori3,
                        recentCard: getConfigValue("ushell/home/featuredGroup/recentCard", true)
                                    && getConfigValue("ushell/home/featuredGroup/enable", false)
                                    && bEnableFiori3
                    },
                    gridContainer: getConfigValue("ushell/home/gridContainer", false)
                                && bEnableFiori3,
                    homePageGroupDisplay:
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/homePageGroupDisplay", "scroll"),
                    isInDrag: false,
                    optimizeTileLoadingThreshold:
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/optimizeTileLoadingThreshold", 100),
                    sizeBehavior: getConfigValue("renderers/fiori2/componentData/config/sizeBehavior", "Responsive"),
                    sizeBehaviorConfigurable: getConfigValue("renderers/fiori2/componentData/config/sizeBehaviorConfigurable", false),
                    wrappingType: getConfigValue("ushell/home/wrappingType", "Normal"),
                    segments: getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/segments", undefined),
                    tileActionModeActive: false
                },
                catalog: {
                    appFinderDisplayMode:
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/appFinderDisplayMode", undefined),
                    easyAccessNumbersOfLevels:
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/easyAccessNumbersOfLevels",
                            undefined),
                    enableCatalogSearch: getConfigValue("renderers/fiori2/componentData/config/enableSearchFiltering",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableSearchFiltering",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableCatalogSearch", true))),
                    enableCatalogSelection: getConfigValue("renderers/fiori2/componentData/config/enableCatalogSelection",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableCatalogSelection", true)),
                    enableCatalogTagFilter: getConfigValue("renderers/fiori2/componentData/config/enableTagFiltering",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableCatalogTagFilter", true)),
                    enableEasyAccess: getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableEasyAccess",
                        undefined),
                    enableEasyAccessSAPMenu:
                        (getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableEasyAccess",
                            undefined) === false)
                            ?
                            false
                            :
                            getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableEasyAccessSAPMenu",
                                getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableEasyAccess",
                                    undefined)),
                    enableEasyAccessSAPMenuSearch: enableSearchTest("enableEasyAccessSAPMenu", "enableEasyAccessSAPMenuSearch"),
                    enableEasyAccessUserMenu:
                        (getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableEasyAccess",
                            undefined) === false)
                            ?
                            false
                            :
                            getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableEasyAccessUserMenu",
                                getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableEasyAccess",
                                    undefined)),
                    enableEasyAccessUserMenuSearch: enableSearchTest("enableEasyAccessUserMenu", "enableEasyAccessUserMenuSearch"),
                    enableHideGroups: getConfigValue("renderers/fiori2/componentData/config/enableHideGroups",
                        getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/enableHideGroups", true)),
                    sapMenuServiceUrl: undefined,
                    userMenuServiceUrl: getConfigValue("renderers/fiori2/componentData/config/applications/Shell-home/userMenuServiceUrl",
                        undefined)
                }
            }
        };

        return oConfigDefinition;
    }

    return fnCreateConfigContract;
}, false);
