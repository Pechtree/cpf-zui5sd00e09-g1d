sap.ui.define(['sap/ushell/renderers/fiori2/search/controls/twitter/TwitterRenderer'],function(t){"use strict";return sap.ui.core.Control.extend("sap.ushell.renderers.fiori2.search.controls.twitter.SearchTweet",{metadata:{properties:{"text":"string"}},renderer:function(r,c){r.write('<div');r.writeControlData(c);r.writeClasses();r.write('>');t.renderTweet(r,c.getText());r.write('</div>');}});});
