/* becodeorg/bookshelf
 *
 * /src/server/Users.js - Users Controller
 *
 * coded by Tanguy@Team Noix
 * started at 08/02/2019
 */

import assert from "assert";

export default class Users {
    /*
     * Users Controller
     * Will handle all Users-related methods
     */

    static index(database, request, response) {
        /*
         * Get all users
         * Return JSON with all users
         */

        // Print method & route in server console
        console.log(`ℹ️  (${request.method.toUpperCase()}) ${request.url}`);

        // Get datas from database
        database
            .collection("users") // Collection (equivalent to MySQL's Table) we want to get informations from
            .find({}) // Datas we want to collect (empty object being shorthand for "no specificity" => "find all")
            .toArray((error, result) => {
                // Check if errors getting datas
                assert.equal(null, error);

                // Send datas in JSON format
                response.send(JSON.stringify(result));
            });
    }
}
