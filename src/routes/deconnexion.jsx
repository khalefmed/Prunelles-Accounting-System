import React from 'react'

export const  Deconnexion = () => {
    window.sessionStorage.removeItem("token")
    window.sessionStorage.removeItem("nom")
    window.sessionStorage.removeItem("prenom")
    window.sessionStorage.removeItem("role")
    window.location = "/connexion"
    return (
        <div>
        </div>
    )
}

export default Deconnexion;
