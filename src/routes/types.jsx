import {useState, useEffect} from 'react'
import { StatsCard } from "@/components/ui/shared/statsCard";
import Company  from "../assets/icons/company.svg";
import {  ListeTransactions } from "@/components/ui/listes/listeTransactions";
import { api } from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Recherche } from '@/components/ui/shared/recherche';
import { NouveauBoutton } from '@/components/ui/shared/nouveau_boutton';
import { IoBusiness } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { ListeComptes } from '@/components/ui/listes/listeComptes';
import { ListeClasses } from '@/components/ui/listes/listeClasses';
import { ListeTypes } from '@/components/ui/listes/listeTypes';


function Types() {
  const { i18n, t } = useTranslation();

  const [liste, setListe] = useState([]) 
  const [recherche, setRecherche] = useState("") 
  
  useEffect(() => {
    get();
  }, [])

  const get = async ()  => {
    try {
      const response = await api.get("types"); 
      console.log(response)
      setListe(response.data)
    }
    catch (exception){
      console.log(exception)
      toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
    }
  }




  return (
    <div className="flex flex-col gap-10 px-10 max-sm:px-4 ">
     
      <div>
        <h1 className='font-bold text-2xl text-blackColor '>Types</h1>
        <p className='text-textGreyColor font-medium'>Page de gestion des types</p>
      </div>

   
      {liste && <ListeTypes donnees={liste} setDonnees={setListe}/>}

    </div>
  );
}

export default Types;



