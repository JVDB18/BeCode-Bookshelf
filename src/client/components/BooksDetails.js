/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";

const BooksDetails = props => {
    // const showHideClassName = show ? "display-block" : "display-none";
    return (
        <div>
            <h3>Books ID: {props.id}</h3>
            <h3>
                {props.id} - {props.title}
            </h3>
        </div>
    );
};

export default BooksDetails;
