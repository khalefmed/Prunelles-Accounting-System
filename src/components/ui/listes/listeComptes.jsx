import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";

import { FaWallet } from "react-icons/fa";
import AjouterCompte from '../common/ajouterCompte';
import UpdateCompte from '../common/updateCompte';

export const ListeComptes = ({donnees, setDonnees}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)


    useEffect(() => {
        setListe(liste)
    }, [])


    return (
        <div className='w-full flex flex-wrap flex-row gap-4 items-center'>
            {donnees.map((e) => 
                    <div key={e.id} className='bg-whiteColor rounded-xl shadow-md px-4 py-6 min-w-[250px] flex flex-col gap-2'>
                        <FaWallet className='text-buttonGradientSecondary text-4xl'/>
                        <div className='flex flex-col align-start items-start'>
                            
                            <div className='flex flex-row align-start items-center gap-2'>
                                <h2 className='font-semibold text-lg text-blackColor'>{e.nom_compte}</h2>
                                <UpdateCompte name={e.nom_compte} id={e.id} balance={e.solde}/>
                            </div>
                            <p className='text-textGreyColor text-sm'>Solde : {e.solde} MRU</p>
                        </div>
                    </div>
                    )}
            <AjouterCompte/>
        </div>
    )
}
