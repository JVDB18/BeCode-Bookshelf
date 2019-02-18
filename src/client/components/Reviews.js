// /* eslint-disable react/jsx-no-literals */
// import React from "react";
// import Axios from "axios";

// export default class Reviews extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             uri: props.uri,
//             showReviews: false,
//             reviews: [],
//             id: props.id,
//             rate: "",
//             comment: "",
//         };
//     }
//     componentWillMount() {
//         const uri = this.state.uri;
//         const id = this.state.id;

//         Axios.get(`${uri}/reviews`, {crossdomain: true}).then(response => {
//             console.log(response.data);
//             this.setState({reviews: response.data});
//             console.log(this.state.reviews);
//         });
//     }
//     render() {
//         if (this.state.reviews.length === 0) {
//             // eslint-disable-next-line react/no-unescaped-entities
//             return <>Pending...</>;
//         }
//         return (
//             <>
//                 <h2>Reviews</h2>
//                 <ul>
//                     {this.state.reviews.map(review => (
//                         <li key={review._id}>
//                             {review.stars} {review.commentary}
//                         </li>
//                     ))}
//                 </ul>
//             </>
//         );
//     }
// }
