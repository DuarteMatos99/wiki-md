import React from "react";
import {useEffect} from 'react';
import "../styles/components/markdownwikimd.css";
import MarkdownUtils from "../utils/MarkdownUtils.js";

function MarkdownWikiMD(props) {
    
    const [images, setImages] = React.useState([]);

    let markdown = props.children;
    let markdownDisplay = "";
    let imageIds = String(markdown).match(/!\[]\(.*?\)/g);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: imageIds,
        }),
    };

    function removeRepeatedImages(fimages) {
        var count;
        for(var i=0;i < fimages?.length; i++) {
            count = 0;
            for(var x=0; x < fimages?.length; x++) {
                if(fimages[i] == fimages[x]) {
                    count++;
                }
                if(count > 1) {
                    fimages.splice(x , 1);
                }
            }
        }
        return fimages;
    }


    useEffect(() => {
        imageIds = removeRepeatedImages(imageIds);
        if(imageIds != null && images?.length != imageIds?.length) {
            fetch(`${process.env.REACT_APP_ENDPOINT}/image/getImagesByIds`, requestOptions)
            .then((result) => result.json())
            .then((output) => {
            setImages(output);
            }).catch((err) => console.error(err));
        }
    }, [props]);

    images?.map(i => {
        markdown = String(markdown).replaceAll("![](" + i.id + ")", `<img src='${i.image}'></img>`);
    })

    markdown = String(markdown).split("\n\n");
    // TODO rename line w block
    markdown.map((line) => {
        // Blockquote syntax
        if(String(line).startsWith(">")) {
            let lines = line.split("\n")
            let isLastBlockQuote = false;
            let blockQuoteCounter = 1;
            line = "<div class=\"markdown-blockquote\">";
            for(var i=0;i<lines.length;i++) {
                if(lines[i] != "") {
                    let bruh = String(lines[i]).replaceAll(/[a-zA-z0-9*?].*/g, "").match(/[>]/g);
                    if( bruh?.length > blockQuoteCounter) {
                        line += "<div class=\"markdown-blockquote\">";
                        blockQuoteCounter += 1;
                    }
                    line += lines[i].match(/[a-zA-z0-9*?].*/g) + "<br>";
                    console.log(lines[i]);
                }
            }
            line += "</div>".repeat(blockQuoteCounter);
            // line += String("</div>").repeat(4);
        }

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
            line = String(line).replaceAll("[ ]", "<input type=\"checkbox\">");
            line = String(line).replaceAll("[x]", "<input type=\"checkbox\" checked>");
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
            let codeBlock = String(line).split("```");
            for(var i=0; i<codeBlock.length; i++) {
                if(i % 2 == 1) {
                    if(String(codeBlock[i]).startsWith("json")) {
                        line = "<div class=\"markdown-code\">" + MarkdownUtils.loadMarkdownJsonToHtml(codeBlock[i]) + "</div>";
                    } else {
                        line = "<div class=\"markdown-code\">" + codeBlock[i] + "</div>";
                    }
                }
            }
        }

        // Unordered List Logic
        if(String(line).includes("- ")) {
            let rows = String(line).split("\n");
            line = "<ul class=\"markdown-unordered-list\">";
            for(var i=0; i<rows.length; i++) {
                if(rows[i].startsWith("- ")) {
                    line += "<li>" + rows[i].replace("-", "") + "</li>";
                } else {
                    line += "</ul>" + rows[i] + "<ul class=\"markdown-unordered-list\">";
                }
            }
            line += "</ul>"
        }

        if(String(line).includes("1. ")) {
            let rows = String(line).split("\n");
            let counter = 1;
            line = "";
            for(var i=0; i<rows.length; i++) {
                if(rows[i].startsWith(counter.toString() + ". ")) {
                    if(counter == 1) {
                        line += "<ol class=\"markdown-ordered-list\">";
                    }
                    line += "<li>" + rows[i].replace(counter.toString() + ". ", "") + "</li>";
                } else {
                    line += "</ol>" + rows[i];
                    counter = 0;
                }
                counter++;
            }
            line += "</ol>"
        }

        // Markdown URL Logic
        let urls = String(line).match(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g);
        if(urls?.length > 0) {
            urls.map(url => {
                console.log(url);
                line = line.replaceAll(url, `<a class="markdown-href" target="_blank" href=\"${url}\">${url}</a>`);
            })
        }

        // Add spacing on empty blocks
        if(String(line) == "") {
            console.log("empty")
            line += "<br><br>";
        }

        markdownDisplay += `<p class="markdown-paragraph">${line}</p>`;
        markdownDisplay = markdownDisplay.replaceAll("\n", "<br/>");

    })

    return (
        <div className="markdown-container" dangerouslySetInnerHTML={{__html: markdownDisplay}}></div>
    )
}

export default MarkdownWikiMD;