import React, { } from "react";
import LinkButton from "./LinkButton"


const Header = (props) => {

    return (
        <>
            <div className="header-container">
                <h1 className="header-title">{props?.title}</h1>
                <div className="button-container">
                    <LinkButton buttonLink={props?.buttonLink} buttonText={props?.buttonText} />
                </div>
            </div>
        </>
    );
}

export default Header;