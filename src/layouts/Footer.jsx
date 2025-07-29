import { useTranslation } from "react-i18next";
import logo from "../../public/assets/images/footer_logo.webp";
import payme from "../../public/assets/images/payme.svg";
import click from "../../public/assets/images/click.svg";
import uzcard from "../../public/assets/images/uzcard.svg";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#262a2c] text-white pt-8 pb-4 px-4 md:px-8 md:h-[305px] h-auto">
      <div className="max-w-[1280px] mx-auto  flex flex-col gap-6">
        {/* Upper section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 flex-wrap">
          {/* Left: logo + text */}
          <div className="text-center md:text-left">
            <img
              src={logo}
              alt="Bellissimo Logo"
              className="h-10 mx-auto md:mx-0 mb-3"
            />
            <p className="text-[13px]">{t("call_us")}</p>
          </div>

          {/* Links column 1 */}
          <div className="space-y-1 text-[16px] text-center md:text-left text-[#FFFFFF80]">
            <p>{t("about_us")}</p>
            <p>{t("public_offer")}</p>
            <p>{t("privacy_policy")}</p>
            <p>{t("halal_certificate")}</p>
            <p>{t("restaurants")}</p>
          </div>

          {/* Links column 2 */}
          <div className="space-y-1 text-[14px] text-center md:text-left">
            <p>{t("careers")}</p>
            <p>{t("franchise")}</p>
          </div>

          {/* Payment logos */}
          <div className="flex justify-center md:justify-start gap-3">
            <img src={payme} alt="Payme" className="h-6" />
            <img src={uzcard} alt="Uzcard" className="h-6" />
            <img src={click} alt="Click" className="h-6" />
          </div>

          {/* Social media */}
          <div className="text-center md:text-left">
            <p className="mb-2">{t("follow_us")}</p>
            <div className="flex justify-center md:justify-start gap-4 text-gray-300">
              <FaFacebookF className="text-xl hover:text-white cursor-pointer" />
              <FaInstagram className="text-xl hover:text-white cursor-pointer" />
              <FaTelegramPlane className="text-xl hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-600 my-2" />

        {/* Bottom copyright */}
        <div className="text-center text-sm text-gray-400">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
