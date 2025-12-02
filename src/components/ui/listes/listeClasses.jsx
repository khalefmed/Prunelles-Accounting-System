import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";


import AjouterClasse from '../common/ajouterClasse';

export const ListeClasses = ({donnees, setDonnees}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)


    useEffect(() => {
        setListe(liste)
    }, [])


    return (
        <div className='w-full flex flex-wrap flex-row gap-4 items-center'>
            {donnees.map((e) => 
                    <div key={e.id} className='bg-whiteColor rounded-xl shadow-md shadow px-4 py-6 min-w-[250px] flex flex-col gap-2'>
                        <div className='flex flex-col align-start items-start'>
                            <h2 className='font-semibold text-lg text-blackColor'>{e.nom_classe}</h2>
                        </div>
                    </div>
                    )}
            
            <AjouterClasse/>
            
        </div>
    )
}
