import React from 'react'
import Acceuil from './acceuil';
import AcceuilEtablissement from './acceuil_etablissement';

export const Index = () => {

    const role = window.localStorage.getItem("role");

    
    return (
        <div>
            {(role != "Agent Trésor" && role != "Administrateur") ? <AcceuilEtablissement/> : <Acceuil/>}
            
        </div>
    )
}
