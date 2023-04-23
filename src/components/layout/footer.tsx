import Link from "next/link";
import { SiGithub, SiTwitter } from "react-icons/si";
import IconLink from "../icon-link";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-y-1 text-gray-500 py-5 px-10 bg-white border-t border-gray-200">
      <div className="w-full flex justify-start">&copy; 2023 にわとろ All rights reservered.</div>
      <div className="w-full flex justify-between h-6">
        <Link href={"https://www.niwatoro.com"}>niwatoro.com</Link>
        <div className="flex gap-x-3">
          <div className="border-r border-gray-300 pr-3">
            <IconLink href={"https://github.com/niwatoro"} icon={<SiGithub size={20} />} />
          </div>
          <IconLink href={"https://twitter.com/niwatoro277"} icon={<SiTwitter size={20} />} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
