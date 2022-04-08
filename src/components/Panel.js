import React from "react";
import "../styles/components/panel.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router-dom";

function Panel(props) {
    const tags = props.tags.split(/[,]/).filter(Boolean);

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
                    {tags.length > 0 &&
                        tags.map((tag, tagIndex) => {
                            if (tagIndex < 3) {
                                return <p className="tag">{`#${tag}`}</p>;
                            }
                        })}
                </div>

                <div className="creator">
                    <img
                        src="https://i.imgur.com/bQvuv1v.jpg"
                        className="avatar"
                    />
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
