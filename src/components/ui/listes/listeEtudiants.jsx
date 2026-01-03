import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";
import UpdateEtudiant from '../common/updateEtudiant';


export const ListeEtudiants = ({donnees, setDonnees}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)


    useEffect(() => {
        setListe(liste)
    }, [])


    return (
        <div className='w-full overflow-x-scroll'>
            <table className='w-full border-separate border-spacing-y-2'>
                <thead className="bg-whiteColor">
                    <tr>
                        <th className="py-4 px-4 text-start text-blackColor font-semibold text-sm rounded-tl-lg">
                            {t("Id")}
                        </th>
                        <th className="py-4 text-start text-blackColor font-semibold text-sm">
                            {t("Nom")}
                        </th>
                        <th className="py-4 text-start text-blackColor font-semibold text-sm">
                            {t("Solde")}
                        </th>
                        <th className="py-4 text-start text-blackColor font-semibold text-sm">
                            {t("Contact")}
                        </th>
                        <th className="py-4 text-start w-52 text-blackColor font-semibold text-sm rounded-tr-lg">
                            {t("Classe")}
                        </th>
                        <th className="py-4 text-start w-52 text-blackColor font-semibold text-sm rounded-tr-lg">
                            {t("Action")}
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {donnees.map((e) => 
                    <tr key={e.id} className='bg-whiteColor'>
                        <td className={`py-4 px-4 min-w-[100px] text-start text-textGreyColor font-medium text-sm rounded-lg`}>{e.matricule}</td>
                        <td className='py-4 min-w-[200px] text-start text-textGreyColor font-medium text-sm '>{e.prenom + ' ' + e.nom}</td>
                        <td className={`py-4 min-w-[100px] text-start  font-medium text-sm ${e.solde < 0 ? 'text-red-500' : 'text-green-500'} text-red`}>{ e.solde + ' MRU'}</td>
                        <td className='py-4 min-w-[100px] text-start text-textGreyColor font-medium text-sm '>{e.contact}</td>
                        <td className='py-4 min-w-[100px] text-start text-textGreyColor font-medium text-sm '>{e.classe.nom_classe}</td>
                        <td className='py-4 min-w-[100px] text-start text-textGreyColor font-medium text-sm '><UpdateEtudiant f_name={e.prenom} l_name={e.nom} matr={e.matricule} birthday={e.date_naissance} grade={e.classe} balance={e.solde} id={e.id} phone={e.contact} /></td>
                        
                    </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
