import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";


import AjouterClasse from '../common/ajouterClasse';
import UpdateClasse from '../common/updateClasse';

export const ListeClasses = ({donnees, setDonnees}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)


    useEffect(() => {
        setListe(liste)
    }, [])


    return (
        <div className='w-full flex flex-wrap flex-row gap-4 items-center'>
            {donnees.map((e) => 
                    <div key={e.id} className='bg-whiteColor rounded-xl shadow-md  px-4 py-6 min-w-[250px] flex flex-col gap-2'>
                        <div className='flex flex-row align-start items-center gap-2'>
                            
                        </div>
                        <div className='flex flex-col gap-1 align-start items-start'>
                            <div className='flex flex-row align-start items-center gap-2'>
                                <h2 className='font-semibold text-lg text-blackColor'>{e.nom_classe}</h2>
                                <UpdateClasse name={e.nom_classe} id={e.id} monthly={e.monthly_charge}/>
                            </div>
                            <p className='text-textGreyColor text-sm'>{e.monthly_charge}</p>
                        </div>
                    </div>
                    )}
            
            <AjouterClasse/>
            
        </div>
    )
}
