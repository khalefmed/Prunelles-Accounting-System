import { useState, useEffect } from 'react';
import { api } from "@/lib/api";
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import {ListeEtudiants} from '@/components/ui/listes/listeEtudiants';
import AjouterEtudiant from '@/components/ui/common/ajouterEtudiant';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Etudiants() {
  const { t } = useTranslation();

  const [liste, setListe] = useState([]);
  const [filteredListe, setFilteredListe] = useState([]);
  
  const [classe, setClasse] = useState("");
  const [filter, setFilter] = useState("");

  const [classes, setClasses] = useState([]);

  // ============================
  // 1️⃣ Charger étudiants + classes
  // ============================
  useEffect(() => {
    get();
    getClasses();
  }, []);

  const get = async () => {
    try {
      const response = await api.get("etudiants/custom/");
      setListe(response.data);
    } catch (exception) {
      toast.error(<p className="text-redColor">{t("Une erreur s'est produite")}</p>);
    }
  };

  const getClasses = async () => {
    try {
      const response = await api.get("classes");
      setClasses(response.data);
    } catch (exception) {
      toast.error(<p className="text-redColor">{t("Une erreur s'est produite")}</p>);
    }
  };

  // ============================
  // 2️⃣ Appliquer les filtres
  // ============================
  useEffect(() => {
    applyFilters();
  }, [liste, classe, filter]);

  const applyFilters = () => {
    let results = [...liste];

    if (classe !== "") {
      
      results = results.filter((item) => {
        return item.classe.id === parseInt(classe);
      });
    }

    if (filter === "Debiteur") {
      results = results.filter((item) => item.solde < 0);
    } else if (filter === "Crediteur") {
      results = results.filter((item) => item.solde >= 0);
    }

    setFilteredListe(results);
  };



const exportPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.text("Liste des étudiants", 14, 16);

  const tableColumn = ["Nom", "Prenom", "Classe", "Solde"];
  const tableRows = [];

  filteredListe.forEach((item) => {
    const row = [
      item.nom,
      item.prenom,
      item.classe.nom_classe,  // adapte selon ton API
      item.solde
    ];
    tableRows.push(row);
  });

  // ✅ The correct way to use AutoTable in modern jsPDF
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("etudiants.pdf");
};



const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredListe);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Etudiants");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([excelBuffer], { type: "application/octet-stream" }),
    "etudiants.xlsx"
  );
};


const handleExport = (type) => {
  if (type === "pdf") {
    exportPDF();
  } else if (type === "excel") {
    exportExcel();
  }
};



const appliquerChargeMensuelle = async () => {
  const confirmAction = window.confirm(
    t("Êtes-vous sûr de vouloir appliquer la charge mensuelle à tous les étudiants ?")
  );

  if (!confirmAction) return;

  try {
    await api.post("frais-mensuels/");
    get();
    toast.success(t("Charge mensuelle appliquée avec succès"));
  } catch (error) {
    console.log(error)
    toast.error(t("Erreur lors de l'application de la charge mensuelle"));
  }
};

  return (
    <div className="flex flex-col gap-10 px-10 max-sm:px-4">

      <div>
        <h1 className="font-bold text-2xl text-blackColor">Etudiants</h1>
        <p className="text-textGreyColor font-medium">Page de gestion des étudiants</p>
      </div>


      <div
            onClick={appliquerChargeMensuelle}
            className="px-4 py-2 w-fit cursor-pointer bg-redColor text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            {t("Appliquer la Charge mensuelle")}
          </div> 

      <div className="w-full gap-2  px-6 py-4 bg-white rounded-lg flex flex-row justify-between">
        <div className="flex flex-row gap-2 w-full">
          
          {/* SELECT CLASSE */}
          <select
            value={classe}
            onChange={(e) => {
              setClasse(e.target.value)

            }}
            className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none"
          >
            <option value="">{t("Classe")}</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nom_classe}
              </option>
            ))}
          </select>

          {/* SELECT FILTRE */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none"
          >
            <option value="">{t("Filtre")}</option>
            <option value="Debiteur">Debiteur</option>
            <option value="Crediteur">Crediteur</option>
          </select>

          <select
            value={null}
            onChange={(e) => handleExport(e.target.value)}
            className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none font-normal text-md text-blackColor"
        >
            <option value="">{t("Exporter")}</option>
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
        </select>


          
        </div>

        <AjouterEtudiant classesList={classes} />
      </div>

      <ListeEtudiants donnees={filteredListe} setDonnees={setListe} />
    </div>
  );
}

export default Etudiants;