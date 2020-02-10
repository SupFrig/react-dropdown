import React from "react";
import ReactDOM from "react-dom";

import '../scss/App.scss';
import Dropdown from "./components/Dropdown.js";

const options = [
    {text: "NoMeansNo", value: "nomeansno"},
    {text: "Boredoms", value: "boredoms"},
    {text: "Mr. Bungle", value: "mr-bungle"},
    {text: "Boris", value: "boris"},
    {text: "Cardiacs", value: "cardiacs", selected: true},
    {text: "Death Grips", value: "death-grips"},
    {text: "Pissed Jeans", value: "pissed-jeans"}
];

const optionsMultiple = [
    {text: "NoMeansNo", value: "nomeansno"},
    {text: "Boredoms", value: "boredoms", selected: true},
    {text: "Mr. Bungle", value: "mr-bungle"},
    {text: "Boris", value: "boris"},
    {text: "Cardiacs", value: "cardiacs"},
    {text: "Death Grips", value: "death-grips", selected: true},
    {text: "Pissed Jeans", value: "pissed-jeans"}
];

const optionsVeryLong = [
    {text: "NoMeansNo", value: "nomeansno"},
    {text: "Boredoms", value: "boredoms", selected: true},
    {text: "Mr. Bungle", value: "mr-bungle"},
    {text: "Boris", value: "boris"},
    {text: "Cardiacs", value: "cardiacs"},
    {text: "Death Grips", value: "death-grips", selected: true},
    {text: "Pissed Jeans", value: "pissed-jeans"},
    {text: "Melt Banana", value: "melt-banana"},
    {text: "Oceansize", value: "oceansize"},
    {text: "Igorrr", value: "igorrr"},
    {text: "Aphex Twin", value: "aphex-twin"},
    {text: "Lightning Bolt", value: "lightning-bolt"},
    {text: "Chai", value: "chai"},
    {text: "Descendents", value: "descendents"},
    {text: "The Frights", value: "the-frights"},
    {text: "Misfits", value: "misfits"},
    {text: "Wire", value: "wire"},
];

const App = (props) => {
    return <div className="Container">
        <h1>Dropdown Component</h1>
        <h3>Simple</h3>
        <Dropdown options={options}/>
        <h3>Multiple with title</h3>
        <Dropdown title="Mes groupes préférés" options={optionsMultiple} multiple={true}/>
        <h3>Multiple with search</h3>
        <Dropdown options={optionsMultiple} multiple={true} search={true}/>
        <h3>Multiple with search, select & clear buttons, display offset</h3>
        <Dropdown options={optionsVeryLong} multiple={true} search={true} clearButton={true} selectAllButton={true} offset={8}/>
    </div>
}

ReactDOM.render(<App/>, document.getElementById('root'));