import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';

import { MdRadioButtonUnchecked } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const AjouterType = ({supprimer, id}) => {
    const { i18n, t } = useTranslation();
    
        const [nom, setNom] = useState("");
        const [is_debiteur, setIsDebiteur] = useState(false);
    
        const creer = async (e)  => {
            e.preventDefault();
            if (valider()) {
                try {
                    const response = await api.post(
                      "types/",
                      {
                          "nom_type" : nom ,
                          "is_debiteur" : is_debiteur ,
                      }
                      ); 
                      window.location = "/types"
                  }
                  catch (exception){
                    console.log(exception)
                    toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
                  }
    
            }
            else {
                toast.error(<p className="text-redColor">{t('Veuillez remplir les champs')}</p>);
            }
            
        }
    
    
        const valider = () => {
            if (nom == ""){
                return false;
            }
            return true;
        }


  return <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
     <div className='bg-white rounded-full w-20 h-20 shadow-lg flex flex-row justify-center align-center items-center font-black text-4xl' >
          <IoAdd />
      </div>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-blackColor m-0 text-[17px] font-semibold text-center flex flex-row justify-between items-center">
          <div></div>
          {t("Nouveau Type")}
          <AlertDialog.Cancel asChild>
            <button className="text-blackColor  hover:bg-bgGreyColor focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium ">
              <MdCancel />
            </button>
          </AlertDialog.Cancel>
        </AlertDialog.Title>
        <form onSubmit={(e) => creer(e)} className='w-full max-sm:w-full flex flex-col gap-6 mt-6  '>
                <div>
                    {/* <p  className='text-lg  text-blackColor font-semibold'>{t('Code')}</p> */}
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder={t("Nom du type")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-normal text-md" />
                </div>

                <div className='flex flex-row gap-4'>
                  <div className={`w-full px-4 py-4 rounded-md shadow-md flex flex-row items-center gap-4 ${is_debiteur ? 'text-textGreyColor' : 'text-buttonGradientSecondary'}`} onClick={() => setIsDebiteur(false)}>
                    {is_debiteur ?  <MdRadioButtonUnchecked /> : <FaCircleCheck />}
                    Crediteur
                  </div>
                  <div className={`w-full px-4 py-4 rounded-md shadow-md flex flex-row items-center gap-4 ${!is_debiteur ? 'text-textGreyColor' : 'text-buttonGradientSecondary'}`} onClick={() => setIsDebiteur(true)}>
                    {!is_debiteur ?  <MdRadioButtonUnchecked /> : <FaCircleCheck />}
                    Debiteur
                  </div>
                </div>

                <div className='text-center'>
                  <input type="submit" onClick={creer} value={t('Enregistrer')}  className="w-1/2 rounded rounded-lg text-center py-2 mt-2 bg-buttonGradientSecondary  text-whiteColor font-normal cursor-pointer " />
                </div>
            </form>
        {/* <div className="flex justify-end gap-2">
          <AlertDialog.Cancel asChild>
            <button className="text-textGreyColor  hover:bg-bgGreyColor focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium ">
              {t('Annuler')}
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => supprimer(id)}>
            <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              {t("Oui, je suis sûr")}
            </button>
          </AlertDialog.Action>
        </div> */}
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
};

export default AjouterType;