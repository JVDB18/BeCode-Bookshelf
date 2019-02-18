/* eslint-disable react/jsx-no-literals */
import React from "react";
import axios from "axios";

export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: props.uri,
            showReviews: false,
            reviews: [],
            id: props.id,
            rate: "",
            comment: "",
        };
    }
    componentDidMount() {
        const uri = this.state.uri;
        const id = this.state.id;

        axios
            .get(`${uri}/reviews/book_${id}`, {crossdomaine: true})
            .then(response => {
                this.setState({
                    reviews: response.data,
                });
            });
    }
    render() {
        if (this.state.reviews.length === 0) {
            return <>Pending...</>;
        }
        return (
            <>
                <h2>Reviews</h2>
                <ul>
                    {this.state.reviews.map(review => (
                        <li key={review._id}>
                            {review.stars} {review.commentary}
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
