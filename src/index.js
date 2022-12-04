import React from "react";
import ReactDOM from "react-dom";
import App from "./App"

// const Greetings = ({props}) => {
//     return (
//         <span>
//             Bonjour <strong>
//                 {props.map(fruit => <li key={fruit}>{fruit}</li>)}
//                 </strong> !
//         </span>
//     )
// }

// const App = () => <Greetings props={["papa", "pipi", "caca"]} />

ReactDOM.render(<App/>, document.getElementById("app"))