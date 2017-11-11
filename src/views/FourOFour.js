import React, {Component} from 'react';

import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router";

export default class FourOFour extends Component {

	render() {
        return (
            <div className="create-job">
                <Navbar />
                <div className="container center">
                    <h2>This route does not exist...</h2>
                    <Link to="/">Go back home.</Link>
                </div>
            </div>
        );
    }
    
}

