import {useState, useEffect} from 'react'
import { Header } from "@/components/ui/common/header";
import { StatsCard } from "@/components/ui/shared/statsCard";
import Company  from "../assets/icons/company.svg";
import Salaries  from "../assets/icons/salaries.svg";
import Argent  from "../assets/icons/money_card.svg";
import { api } from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Recherche } from '@/components/ui/shared/recherche';
import { NouveauBoutton } from '@/components/ui/shared/nouveau_boutton';
import { ListeBanques } from '@/components/ui/listes/listeBanques';
import { BsBank2 } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { ListeUtilisateurs } from '@/components/ui/listes/listeUtilisateurs';


function Utilisateurs() {
  const { i18n, t } = useTranslation();

  const [liste, setListe] = useState([]) 
  const [statistiques, setStatistiques] = useState([]) 
  const [recherche, setRecherche] = useState("") 
  
  useEffect(() => {
    get();
  }, [])

  const get = async ()  => {
    try {
      const response = await api.get("utilisateurs/"); 
      setListe(response.data.liste)
      setStatistiques(response.data.statistiques)
    }
    catch (exception){
      console.log(exception)
      toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
    }
  }


  const rechercher = async (e)  => {
    e.preventDefault();

    try {
      const response = await api.get(`recherche/utilisateurs?valeur=${recherche}`)  ; 
      setListe(response.data );
    }
    catch (exception){
      console.log(exception)
      toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
    }
  }


  return (
    <div className="flex flex-col gap-10 px-10 max-sm:px-4 ">
      <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
        <StatsCard titre={t("Nombre total des agents")} label={t("Utilisateurs")} valeur={statistiques.total} icon={BsBank2}  />
        <StatsCard titre={t("Nombre d'agent trésor")} label={t("Agents")} valeur={statistiques.agents_tresor} icon={FaMoneyBillWave}  />
        <StatsCard titre={t("Nombre d'agent etablissement")} label={t("Agents")} valeur={statistiques.agents_etablissement} icon={FaMoneyBillWave}  />
      </div>

      <div className='flex flex-row max-md:flex-col gap-3 justify-between items-center'>
        <Recherche rechercher={rechercher} recherche={recherche} setRecherche={setRecherche}/>
        <NouveauBoutton lien="utilisateurs"/>
      </div>
      {liste && <ListeUtilisateurs donnees={liste} setDonnees={setListe}/>}

    </div>
  );
}

export default Utilisateurs;



