import Constants from "./Constants";

class MarkdownUtils {

    // Static Function that returns String with HTML for JSON Code Block WikiMD Markdown
    static loadMarkdownJsonToHtml(line) {
        // line = line.replaceAll("{", "{<br>").replaceAll("}", "<br>}").replaceAll("(", "(<br>").replaceAll(")","<br>)");
        let jsonSplit = line.match(/"(.*?)"|[{]|[}]|[:]|[,]|(\[\])|[\[]|[\]]|([0-9][0-9]*)|null|true|false|\[.*?\]/g);
        let tmpLine = "";
        let ident = "";
        let counter = 0;
        for(var x=0;x<jsonSplit.length;x++) {
            // tmpLine += ident;
            if(jsonSplit[x] == "{") {
                ident += "&emsp;";
                tmpLine += jsonSplit[x] + Constants.HTML_BREAKLINE + ident;
                counter = 0;
            } else if(jsonSplit[x] == "}") {
                ident = String(ident).replace("&emsp;","");
                tmpLine += Constants.HTML_BREAKLINE + ident + jsonSplit[x] + Constants.HTML_BREAKLINE + ident;
            } else if(jsonSplit[x] == ",") {
                tmpLine += jsonSplit[x] + Constants.HTML_BREAKLINE + ident;
            } else if(jsonSplit[x] == ":") {
                tmpLine += jsonSplit[x] + " ";
            } else if(jsonSplit[x] == "[") {
                ident += "&emsp;";
                tmpLine += jsonSplit[x] + Constants.HTML_BREAKLINE + ident;
                counter = 0;
            } else if(jsonSplit[x] == "]") {
                ident = String(ident).replace("&emsp;","");
                tmpLine += Constants.HTML_BREAKLINE + ident + jsonSplit[x] + Constants.HTML_BREAKLINE + ident;
            }
            else {
                if(counter % 2 == 0) {
                    console.log(counter + " key " + jsonSplit[x]);
                    tmpLine += "<span class=\"markdown-json-key\">" + jsonSplit[x] + "</span>";
                } else {
                    console.log(counter + " value " + jsonSplit[x]);
                    tmpLine += "<span class=\"markdown-json-value\">" + jsonSplit[x] + "</span>";
                }
                counter += 1;
                
            }
        }
        console.log(tmpLine);
        return tmpLine;
    }
}

export default MarkdownUtils;