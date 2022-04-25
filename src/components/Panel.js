import React from "react";
import "../styles/components/panel.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

function Panel(props) {
    const tags = props.tags.split(/[,]/).filter(Boolean);
    let tags_cleaned = [];
    tags.map((tag, tagIndex) => {
        if (tagIndex < 3) {
            if (tag.length > 7) {
                tags_cleaned[tagIndex] = `#${tag.slice(0, 7)}...`;
            } else {
                tags_cleaned[tagIndex] = `#${tag}`;
            }
        }
    });

    if (tags_cleaned.length > 2) {
        tags_cleaned.push("...");
    } else if (tags_cleaned.length === 0) {
        tags_cleaned.push("empty");
    }

    return (
        <div className="panel">
            <Link to={"/note/" + props.id}>
                <div className="background-panel"></div>
                <div className="info-panel">
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
                                return <p className="tag">{`${tag}`}</p>;
                            })}
                    </div>

                    <div className="bottom-area">
                        <div className="bottom-detail">
                            <Link to={"/profile/" + props.creatorId}>
                                <img
                                    src={props.creatorImage}
                                    className="avatar"
                                />
                            </Link>
                            <p>{props.creator}</p>
                        </div>
                        <div className="bottom-detail">
                            <AccessTimeIcon />
                            <p>4 days ago</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Panel;
