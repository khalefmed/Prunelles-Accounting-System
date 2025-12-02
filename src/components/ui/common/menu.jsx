import Logo from "../../../assets/logo.jpg";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { MyNavLink } from "../shared/navLink";
import {TruckIcon} from "../../icons/truck.jsx";
import { IoHome } from "react-icons/io5";
import { IoMdBusiness } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa6";

import { RiDashboardFill } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaWallet } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { Logout } from "@mui/icons-material";
import { Settings } from "lucide-react";
import { Header } from "./header";
import MenuCompte from "./popover";


function SideBar({changeVisibility}) {
  const { i18n, t } = useTranslation();

  const role = localStorage.getItem("role");

  if(role == null){
    window.location = "/connexion";
  }

  const frenshAnimation =
    "flex flex-col py-[10px] gap-10 w-[250px] bg-whiteColor  h-full text-[12px] overflow-y-scroll z-50 max-lg:absolute max-md:absolute max-sm:absolute transform max-lg:animate-sideBarLeftAnimation max-md:animate-sideLeftBarAnimation max-sm:animate-sideLeftBarAnimation";
  const arabicAnimation =
    "flex flex-col py-[100px] gap-10 w-[250px] font-arabic bg-whiteColor  h-full text-[12px] overflow-y-scroll z-50 max-lg:absolute max-md:absolute max-sm:absolute transform max-lg:animate-sideBarRightAnimation max-md:animate-sideBarRightAnimation max-sm:animate-sideBarRightAnimation";

  return (
    <>
      <div
        id="sideBar"
        className="w-[250px]  max-sm:absolute top-0 left sideBar justify-start h-[100vh] text-textGreyColor font-semibold max-lg:hidden max-sm:hidden max-md:hidden">
        <div
          className={i18n.language == "ar" ? arabicAnimation : frenshAnimation}>
            <div className={`lg-hidden px-10 h-fit flex justify-end text-blackColor`} onClick={changeVisibility}>
              <ImCancelCircle size={25} className="lg:hidden"/>
            </div>

          <div className="flex items-center justify-center">
            <img
              className="w-[160px] h-[100px] aspect-square"
              src={Logo}
              alt="logo images"
            />
          </div>
          <nav className="text-[12px]  pr-10 pl-10">
            <ul className="flex flex-col items-start gap-[15px] mx-auto list-none">
              <MyNavLink route="" label={t("Acceuil")} icon={RiDashboardFill}/>

              <MyNavLink route="classes" label={t("Classes")} icon={SiGoogleclassroom}/>
              <MyNavLink route="etudiants" label={t("Etudiants")} icon={PiStudentFill}/>
              <MyNavLink route="transactions" label={t("Transactions")} icon={FaExchangeAlt}/>
              <MyNavLink route="comptes" label={t("Comptes")} icon={FaWallet}/>
              <MyNavLink route="types" label={t("Types de transactions")} icon={BiSolidCategory}/>




            </ul>
          </nav>


          <div className="px-8">
            <hr />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-center items-center">
              <MenuCompte/>
            </div>


            <nav className="text-[12px]  pr-10 pl-10">
              <ul className="flex flex-col items-start gap-[15px] mx-auto list-none">
                <MyNavLink route="mot_de_passe" label={t("Parametres")} icon={Settings}/>
                <MyNavLink route="deconnexion" label={t("Deconnexion")} icon={Logout}/>





              </ul>
            </nav>
          </div>

         
        </div>
      </div>
    </>
  );
}
export default SideBar;
