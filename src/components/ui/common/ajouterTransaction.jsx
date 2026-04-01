import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useTranslation } from "react-i18next";
import { IoAdd } from "react-icons/io5";
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { MdCancel } from "react-icons/md";
// 1. Importation de react-select
import Select from 'react-select';

const AjouterTransaction = ({ supprimer, id }) => {
    const { t } = useTranslation();

    const [montant, setMontant] = useState("");
    const [note, setNote] = useState("");
    const [type, setType] = useState("");
    const [etudiant, setEtudiant] = useState("");
    const [compte, setCompte] = useState("");
    const [types, setTypes] = useState([]);
    const [comptes, setComptes] = useState([]);
    const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        get();
    }, [])

    const get = async () => {
        try {
            const response = await api.get("types");
            const response2 = await api.get("comptes");
            const response3 = await api.get("etudiants");
            setTypes(response.data);
            setComptes(response2.data);
            setEtudiants(response3.data);
        } catch (exception) {
            toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
        }
    }

    // 2. Préparation des options pour le Select
    const optionsEtudiants = etudiants.map(e => ({
        value: e.id,
        label: `${e.matricule} ${e.prenom} ${e.nom}`
    }));

    const creer = async (e) => {
        e.preventDefault();
        if (valider()) {
            try {
                await api.post("transactions/", {
                    "montant": montant,
                    "type": type,
                    "compte": compte,
                    "etudiant": etudiant,
                    "note": note,
                });
                window.location = "/transactions";
            } catch (exception) {
                toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
            }
        } else {
            toast.error(<p className="text-redColor">{t('Veuillez remplir les champs')}</p>);
        }
    }

    const valider = () => {
        return montant !== "" && compte !== "" && type !== "";
    }

    // 3. Style personnalisé pour correspondre à votre UI existante
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#F1F7FF', // Correspond à votre bg-inputFieldColor
            borderRadius: '0.5rem',
            border: 'none',
            padding: '2px',
            boxShadow: 'none'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#9CA3AF', // Correspond à placeholder-inputTextColor
        })
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <div className='bg-buttonGradientSecondary rounded-md shadow-lg flex flex-row justify-center align-center items-center font-medium text-md px-4 py-2 text-white gap-2 cursor-pointer'>
                    <IoAdd />
                    {t("Nouvelle")}
                </div>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 fixed inset-0" />
                <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-lg focus:outline-none">
                    <AlertDialog.Title className="text-blackColor m-0 text-[17px] font-semibold text-center flex flex-row items-center justify-between">
                        <div />
                        {t("Nouvelle transaction")}
                        <AlertDialog.Cancel asChild>
                            <button className="text-blackColor hover:bg-bgGreyColor h-[35px] w-[35px] flex items-center justify-center rounded-full">
                                <MdCancel size={20} />
                            </button>
                        </AlertDialog.Cancel>
                    </AlertDialog.Title>

                    <form onSubmit={creer} className='w-full flex flex-col gap-6 mt-6'>
                        <input 
                            type="number" 
                            value={montant} 
                            onChange={(e) => setMontant(e.target.value)} 
                            placeholder={t("Montant")} 
                            className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none" 
                        />

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none"
                        >
                            <option value="">{t("Type")}</option>
                            {types.map((t) => <option key={t.id} value={t.id}>{t.nom_type}</option>)}
                        </select>

                        <select
                            value={compte}
                            onChange={(e) => setCompte(e.target.value)}
                            className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none"
                        >
                            <option value="">{t("Compte")}</option>
                            {comptes.map((c) => <option key={c.id} value={c.id}>{c.nom_compte}</option>)}
                        </select>

                        {/* --- NOUVEAU DROPDOWN AVEC RECHERCHE --- */}
                        <div>
                            <Select
                                options={optionsEtudiants}
                                placeholder={t("Etudiant")}
                                isClearable
                                isSearchabl
                                styles={customStyles}
                                onChange={(option) => setEtudiant(option ? option.value : "")}
                                noOptionsMessage={() => t("Aucun étudiant trouvé")}
                            />
                        </div>

                        <input 
                            type="text" 
                            value={note} 
                            onChange={(e) => setNote(e.target.value)} 
                            placeholder={t("Note")} 
                            className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none" 
                        />

                        <div className='text-center'>
                            <button type="submit" className="w-1/2 rounded-lg text-center py-2 mt-2 bg-buttonGradientSecondary text-white font-normal cursor-pointer">
                                {t('Enregistrer')}
                            </button>
                        </div>
                    </form>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

export default AjouterTransaction;