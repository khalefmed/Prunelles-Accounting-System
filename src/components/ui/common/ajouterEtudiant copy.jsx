import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useTranslation } from "react-i18next";
import { IoAdd } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';

const AjouterEtudiant = ({ supprimer, id }) => {
  const { t } = useTranslation();

  const [tab, setTab] = useState("individuel"); // Tab active : 'individuel' ou 'liste'

  // Champs individuels
  const [matricule, setMatricule] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [classe, setClasse] = useState("");
  const [contact, setContact] = useState("");
  const [naissance, setNaissance] = useState("");
  const [classes, setClasses] = useState([]);

  // Champs liste
  const [csvFile, setCsvFile] = useState(null);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    try {
      const response = await api.get("classes");
      setClasses(response.data);
    } catch (err) {
      toast.error(<p className="text-redColor">{t("Une erreur s'est produite")}</p>);
    }
  };

  // Création individuelle
  const creerIndividuel = async (e) => {
    e.preventDefault();
    if (!nom || !prenom || !classe) {
      toast.error(<p className="text-redColor">{t('Veuillez remplir les champs obligatoires')}</p>);
      return;
    }

    try {
      await api.post("etudiants/", {
        matricule,
        prenom,
        nom,
        contact,
        date_naissance: naissance,
        classe,
        solde: 0
      });
      toast.success(t("Etudiant créé avec succès"));
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(<p className="text-redColor">{t("Une erreur s'est produite")}</p>);
    }
  };

  // Import CSV
  const creerParListe = async () => {
    if (!csvFile) {
      toast.error(<p className="text-redColor">{t("Veuillez sélectionner un fichier CSV")}</p>);
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await api.post("upload-etudiants-csv/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success(t(`Import terminé : ${response.data.created} étudiants créés`));
      if (response.data.errors.length) {
        toast.error(response.data.errors.join("\n"));
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(<p className="text-redColor">{t("Une erreur s'est produite")}</p>);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <div className='bg-buttonGradientSecondary rounded-md shadow-lg flex items-center justify-center gap-2 px-4 py-2 text-white cursor-pointer'>
          <IoAdd /> {t("Ajouter")}
        </div>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 fixed inset-0" />
        <AlertDialog.Content className="fixed top-[50%] left-[50%] max-w-[500px] w-[90vw] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-md shadow-lg overflow-auto">
          <AlertDialog.Title className="text-center text-lg font-semibold mb-4 flex justify-between items-center">
            {t("Nouveau étudiant")}
            <AlertDialog.Cancel asChild>
              <button className="text-black hover:bg-gray-200 p-2 rounded">
                <MdCancel />
              </button>
            </AlertDialog.Cancel>
          </AlertDialog.Title>

          {/* TABS */}
          <div className="flex mb-4 border-b border-gray-300">
            <button
              className={`flex-1 py-2 ${tab === 'individuel' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
              onClick={() => setTab("individuel")}
            >
              {t("Ajout individuel")}
            </button>
            <button
              className={`flex-1 py-2 ${tab === 'liste' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
              onClick={() => setTab("liste")}
            >
              {t("Par liste")}
            </button>
          </div>

          {/* CONTENU DES TABS */}
          {tab === "individuel" && (
            <form onSubmit={creerIndividuel} className="flex flex-col gap-3">
              <input type="text" placeholder={t("Matricule")} value={matricule} onChange={e => setMatricule(e.target.value)} className="inputField" />
              <input type="text" placeholder={t("Prenom")} value={prenom} onChange={e => setPrenom(e.target.value)} className="inputField" />
              <input type="text" placeholder={t("Nom")} value={nom} onChange={e => setNom(e.target.value)} className="inputField" />
              <select value={classe} onChange={e => setClasse(e.target.value)} className="inputField">
                <option value="">{t("Classe")}</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.nom_classe}</option>
                ))}
              </select>
              <input type="text" placeholder={t("Contact")} value={contact} onChange={e => setContact(e.target.value)} className="inputField" />
              <input type="date" placeholder={t("Date de naissance")} value={naissance} onChange={e => setNaissance(e.target.value)} className="inputField" />
              <button type="submit" className="mt-3 py-2 bg-buttonGradientSecondary text-white rounded">{t("Enregistrer")}</button>
            </form>
          )}

          {tab === "liste" && (
            <div className="flex flex-col gap-3">
              <input
                type="file"
                accept=".csv"
                onChange={e => setCsvFile(e.target.files[0])}
                className="inputField"
              />
              <button onClick={creerParListe} className="mt-3 py-2 bg-buttonGradientSecondary text-white rounded">{t("Importer CSV")}</button>
            </div>
          )}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AjouterEtudiant;