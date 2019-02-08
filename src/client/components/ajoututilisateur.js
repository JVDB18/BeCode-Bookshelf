import React, {Component} from "react";

class Ajoututilisateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(`A name login submitted: ${this.state.value}`);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>{"Ajouter / Editer un nouvel utilisateur"}</h1>

                <hr />
                <form onSubmit={this.handleSubmit}>
                    {/* <label htmlFor="login">{"Login"}</label> */}
                    <input value={this.state.login} required />

                    {/* <label htmlFor="email">{"Email"}</label> */}
                    <input type="email" value={this.state.email} required />

                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        );
    }
}

export default Ajoututilisateur;

// class NameForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {value: ''};

//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//       this.setState({value: event.target.value});
//     }

//     handleSubmit(event) {
//       console.log('A name was submitted: ' + this.state.value);
//       event.preventDefault();
//     }

//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name:
//             <input type="text" value={this.state.value} onChange={this.handleChange} />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }

//   ReactDOM.render(
//     <NameForm />,
//     document.getElementById('root')
//   );
