import React from "react";
import {useEffect} from 'react';
import "../styles/components/markdownwikimd.css";
import MarkdownUtils from "../utils/MarkdownUtils.js";
import { useContext } from "react";
import useLoader from "../hooks/useLoader";
import Loader from "../components/Loader";
import { ImageSearch } from "@mui/icons-material";

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

    useEffect(() => {
        if(imageIds != null && images.length != imageIds.length) {
            fetch(`${process.env.REACT_APP_ENDPOINT}/noteImage/getImagesByIds`, requestOptions)
            .then((result) => result.json())
            .then((output) => {
            console.log("aaa" + JSON.stringify(output));
            setImages(output);
            })  
            .catch((err) => console.error(err));
        }
    }, [props]);

    images.map(i => {
        console.log("![](" + i.id + ")");
        markdown = String(markdown).replace("![](" + i.id + ")", `<img src='${i.image}'></img>`);
    })
    console.log(markdown);
    markdown = String(markdown).split("\n\n");
    // console.log(markdown);
    markdown.map((line) => {
        // console.log(line);
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

        markdownDisplay += `<p class="markdown-paragraph">${line}</p>`;
        markdownDisplay = markdownDisplay.replaceAll("\n", "<br/>");

    })
    

    return (
        <div class="markdown-container" dangerouslySetInnerHTML={{__html: markdownDisplay}}></div>
    )
}

export default MarkdownWikiMD;