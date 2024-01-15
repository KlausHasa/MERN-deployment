import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const LinkButton = (props) => {

    return (
        <>
            <Link to={props?.buttonLink}>
                <button className="btn custom-button">{props?.buttonText}</button>
            </Link>
        </>
    );
}

export default LinkButton;