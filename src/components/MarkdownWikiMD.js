import React from "react";
import "../styles/components/markdownwikimd.css";

function MarkdownWikiMD(props) {

    let markdown = props.children;
    let markdownDisplay = "";

    markdown = String(markdown).split("\n\n");
    // console.log(markdown);
    markdown.map((line) => {
        // console.log(line);
        // Header logic
        if(String(line).includes("#")) {
            line = String(line).replace("##### ", "<h5>") + "</h1>";
            line = String(line).replace("#### ", "<h4>") + "</h1>";
            line = String(line).replace("### ", "<h3>") + "</h1>";
            line = String(line).replace("## ", "<h2>") + "</h1>";
            line = String(line).replace("# ", "<h1>") + "</h1>";
        }
        // Checkbox logic
        if(String(line).includes("[ ]") || String(line).includes("[X]")) {
            line = String(line).replace("[ ]", "<input type=\"checkbox\">");
            line = String(line).replace("[x]", "<input type=\"checkbox\" checked>");
        }
        // bold logic
        if(String(line).includes("**")) {
            let lines = String(line).split("**");
            line = "";
            for(var i=0;i<lines.length;i++) {
                if(i % 2 == 1) {
                    console.log((i) + " " + lines[i]);
                    line += "<markdown-text class='bold'>" + lines[i] + "</markdown-text>";
                } else {
                    line += lines[i];
                }
            }
        }
        // italic logic
        if(String(line).includes("*")) {
            let lines = String(line).split("*");
            line = "";
            for(var i=0;i<lines.length;i++) {
                if(i % 2 == 1) {
                    console.log((i) + " " + lines[i]);
                    line += "<markdown-text class='italic'>" + lines[i] + "</markdown-text>";
                } else {
                    line += lines[i];
                }
            }
        }
        // Table logic
        if(String(line).includes("|")) {
            let rows = String(line).split("\n");
            line = "<table class=\"markdown-table\">";
            let htmlTableElement = "th";
            for(var i=0; i<rows.length; i++) {
                if(i === 1) {
                    htmlTableElement = "td";
                } else {
                    let lines = String(rows[i]).split("|");
                    var columns = lines.slice(1,lines.length-1);
                    line += "<tr>";
                    columns.map((column) => {
                        line += `<${htmlTableElement}>${column}</${htmlTableElement}>`
                    })
                    line += "</tr>";
                }
            }
            line += "</table>";
        }
        // Code block logic
        if(String(line).includes("```")) {
            let lines = String(line).split("```");
            line = ""
            for(var i=0; i<lines.length; i++) {
                if(i % 2 == 1) {
                    if(String(lines[i]).startsWith("json")) {

                        line = ("<div class=\"markdown-code\">" + lines[i].replace("json\n", "") + "</div>").replaceAll("\n", "<br>");
                    } else {
                        line = ("<div class=\"markdown-code\">" + lines[i] + "</div>").replaceAll("\n", "<br>");
                    }
                    
                }
            }
        }
        markdownDisplay += `<p>${line}</p>`;
    })

    return (
        <div class="markdown-container" dangerouslySetInnerHTML={{__html: markdownDisplay}}></div>
    )
}

export default MarkdownWikiMD;