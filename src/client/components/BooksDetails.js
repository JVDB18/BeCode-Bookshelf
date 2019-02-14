/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";

const BooksDetails = props => {
    console.log(props);
    //     console.log(match, match.params.id);
    return (
        <div>
            <h3>Books ID: {props.match.params.id}</h3>
            <h3>
                {props.id} - {props.title}
            </h3>
        </div>
    );
};

export default BooksDetails;
