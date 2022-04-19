import React from "react";
import "../styles/components/panel.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router-dom";

function Panel(props) {
    const tags = props.tags.split(/[,]/).filter(Boolean);
    const tags_cleaned = [];
    tags.map((tag, tagIndex) => {
        if (tagIndex < 3) {
            if (tag.length > 8) {
                tags_cleaned[tagIndex] = `${tag.slice(0, 8)}...`;
            } else {
                tags_cleaned[tagIndex] = tag;
            }
        }
    });

    return (
        <div className="panel">
            <Link to={"/note/" + props.id}>
                <div className="title">
                    {props.title.length > 22 ? (
                        <h4>{`${props.title.slice(0, 22)}...`}</h4>
                    ) : (
                        <h4>{props.title}</h4>
                    )}
                </div>

                <div className="tags">
                    {tags_cleaned.length > 0 &&
                        tags_cleaned.map((tag) => {
                            return <p className="tag">{`#${tag}`}</p>;
                        })}
                </div>

                <div className="creator">
                    <Link to={"/profile/" + props.creatorId}>
                        <img src={props.creatorImage} className="avatar" />
                    </Link>
                    <p>{props.creator}</p>
                </div>

                <div className="arrow">
                    <ArrowForwardRoundedIcon />
                </div>
            </Link>
        </div>
    );
}

export default Panel;
