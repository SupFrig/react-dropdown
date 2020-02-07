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

const App = (props) => {
    return <div className="Container">
        <h1>Dropdown Component</h1>
        <h3>Default</h3>
        <Dropdown options={options}/>
        <h3>with title</h3>
        <Dropdown title="Mes groupes préférés" options={optionsMultiple} multiple={true}/>
        <h3>with search</h3>
        <Dropdown options={optionsMultiple} multiple={true} search={true}/>
    </div>
}

ReactDOM.render(<App/>, document.getElementById('root'));