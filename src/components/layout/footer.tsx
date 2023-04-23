import { SiGithub, SiTwitter } from "react-icons/si";
import IconLink from "../icon-link";

const Footer = () => {
  return (
    <footer className="text-gray-500 py-5 px-10 bg-white border-t border-gray-200 shadow-md">
      <div className="w-full flex justify-start">&copy; にわとろ</div>
      <div className="w-full flex justify-end h-6 gap-x-3">
        <div className="border-r border-gray-300 pr-3">
          <IconLink href={"https://github.com/niwatoro"} icon={<SiGithub size={20} />} />
        </div>
        <IconLink href={"https://twitter.com/niwatoro277"} icon={<SiTwitter size={20} />} />
      </div>
    </footer>
  );
};

export default Footer;
