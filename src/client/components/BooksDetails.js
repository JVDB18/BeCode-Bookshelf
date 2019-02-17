/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-literals */
import React from "react";

export default class BooksDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
        this.style = {
            modal: {
                backgroundColor: "blue",
            },
        };
    }

    render() {
        return (
            <div
                style={{
                    ...this.modal,
                    display: this.props.show ? "block" : "none",
                }}>
                <div>
                    {this.props.children}
                    Numéro ISBN: {this.props.isbn},
                    <br />
                    Langue:{this.props.language},
                    <br />
                    Format: {this.props.format},
                    <br />
                </div>
            </div>
        );
    }
}
