import React from "react";
import ReactDOM from "react-dom";

import '../scss/App.scss';
import Dropdown from "./components/Dropdown.js";

const options = [
    {
        text: "NoMeansNo",
        value: "nomeansno"
    },
    {
        text: "Boredoms",
        value: "boredoms",
        selected: true
    },
    {
        text: "Boris",
        value: "boris"
    },
    {
        text: "Death Grips",
        value: "death-grips"
    },
    {
        text: "Pissed Jeans",
        value: "pissed-jeans"
    }
];

const App = (props) => {
    return <div className="Container">
        <h1>Dropdown Component</h1>
        <h3>Default</h3>
        <Dropdown options={options}/>
        <h3>with title</h3>
        <Dropdown title="Quel est mon groupe préféré" options={options}/>
    </div>
}

ReactDOM.render(<App/>, document.getElementById('root'));