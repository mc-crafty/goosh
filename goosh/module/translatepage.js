//                   ::::::::          
//         :+:      :+:    :+:         
//    +++++++++++  +:+         +++++   
//       +:+      +#+         +#  +#   
//      +#+      +#+         +#        
//     #+#      #+#     +#  +#  +#     
//    ###       ########+   ####+      
//
// tCc|MC_Crafty
// mc_crafty@gmx.com
// simple module to translate full page. y u no lang?


goosh.module.translatepage = function() {
    this.name = "translatepage";
    this.aliases = new Array("translatepage","transpage","tp");
    this.parameters = "[lang1] &lt;lang2> &lt;url>";
    this.help = "google page translation*";
    this.helptext = "<span class='info'>Translate full webpages with Google, using google's 2 character language codes</span><br/>";

    // Adds args to google translate's url string and returns
    // "http://translate.google.com/translate?sl=SOURCE LANGUAGE&tl=TRANSLATE LANGUAGE&u=URL TO TRANSLATE"
    this.convertToURL = function(lang1, lang2, webbie, auto) {
        var newpage = "";
        newpage = webbie;
        newpage = "&u=" + newpage;
        newpage = lang2 + newpage;
        newpage = "&tl=" + newpage;
        if (auto) {
            newpage = "sl=auto" + newpage;
        }
        else {
            newpage = lang1 + newpage;
            newpage = "sl=" + newpage;
        }
        newpage = "http://translate.google.com/translate?" + newpage;
        return newpage;
    }

    // Opening function, checks args and opens window
    this.call = function(args) {
        var lang1 = "";
        var lang2 = "";
        var webbie = "";
        var auto = false;
        // 1-sl 2-tl 3-url
        if (args.length == 3) {
            lang1 = args[0];
            lang2 = args[1];
            webbie = args[2];
        }
        // 1-tl 2-url
        else if (args.length == 2) {
            lang2 = args[0];
            webbie = args[1];
            auto = true;
        }
        // If a language to translate to, and a url are not given, don't try
        else {
            goosh.gui.error("Could not translate.");
            return false;
        }
        // Format url and open in place of this page
        var goodurl = this.convertToURL(lang1, lang2, webbie, auto);
        window.open(goodurl, "_top", "", false);
    }
}

goosh.modules.register("translatepage");


