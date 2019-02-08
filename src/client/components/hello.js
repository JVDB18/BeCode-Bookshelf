/* becodeorg/bookshelf
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/01/2019
 */

import * as React from "react";
import Ajoututilisateur from "./ajoututilisateur.js";

export default class HelloWorld extends React.Component {
    //     render() {
    //         return (
    //             <div>
    //                 <h1>{"Hello, world, it's so good to see you!"}</h1>
    //                 <hr />
    //                 <small>{"becode/bookshelf"}</small>
    //             </div>

    //         );
    //     }
    // }

    render() {
        return (
            <div>
                <Ajoututilisateur />
            </div>
        );
    }
}

// export default HelloWorld;
