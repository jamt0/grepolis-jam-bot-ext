import React from "react";
import ReactDOM from 'react-dom/client';
import { BotonRecolectar } from "../components";
import { ChromeMessage, Sender } from "../types";

type MessageResponse = (response?: any) => void

const validateSender = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender
) => {
    return sender.id === chrome.runtime.id && message.from === Sender.React;
}

function insertarBotonDeRecolectarRecursos() {
    console.log("Insertando Boton de recolectar")

    const tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);
    const root = ReactDOM.createRoot(tempDiv);
    root.render(<BotonRecolectar onclick={recolectarRecursos}/>);
    
    console.log("Boton de recolectar insertado")

}

async function recolectarRecursos() {
    console.log("Iniciando la recoleccion automatizada")
    const game = JSON.parse(window.localStorage.getItem("game")!);
    console.log(game)
}

const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: MessageResponse
) => {

    const isValidated = validateSender(message, sender);

    if (isValidated && message.message === 'Hello from React') {
        response('Hello from content.js');
        console.dir(window.Game)
    }

    if (isValidated && message.message === "delete logo") {
        const logo = document.getElementsByClassName('lnXdpd');
        logo[0]?.parentElement?.removeChild(logo[0])
    }
}

const main = () => {
    console.log('Welcome JamBot v3')
    injectScript(chrome.runtime.getURL("/js/saveToken.js"), "body");
    insertarBotonDeRecolectarRecursos();
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
}

//Cool functions
function injectScript(file: any, node: any) {
    console.log("Injectando Script")
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", file);
    th.appendChild(s);
    console.log("Script Injectado")
}

main();