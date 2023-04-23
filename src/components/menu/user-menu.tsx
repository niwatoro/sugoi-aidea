import { useAuth } from "@/context/auth";
import { logout } from "@/lib/auth";
import { classNames } from "@/lib/class-names";
import { User } from "@/types/user";
import { Menu } from "@headlessui/react";
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import Avatar from "../avatar";
import MenuLink from "./menu-link";

type LinkType = {
  label: string;
  icon: ReactNode;
  path: string;
};
const links: (user: User) => LinkType[] = (user) => {
  return [
    {
      label: user.name,
      icon: <UserIcon />,
      path: "/mypage",
    },
    {
      label: "設定",
      icon: <Cog6ToothIcon />,
      path: "/settings",
    },
  ];
};

const ListItem = ({ active, icon, label }: { active: boolean; icon: ReactNode; label: string }) => {
  return (
    <div className={classNames("flex rounded-sm items-center", active && "bg-gray-200")}>
      <div className="w-10 h-10 p-2 text-gray-400">{icon}</div>
      <div className="p-1">{label}</div>
    </div>
  );
};

const UserMenu = () => {
  const user = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <Avatar src={user.photoUrl} />
      </Menu.Button>
      <Menu.Items className="absolute divide-y origin-top-right right-0 w-48 shadow-md rounded-md ring-1 bg-white ring-gray-200 pt-2 px-2 pb-0.5">
        <div className="border-b pb-1">
          {links(user).map((link) => (
            <Menu.Item key={link.path}>
              {({ active }) => (
                <MenuLink href={link.path}>
                  <ListItem icon={link.icon} label={link.label} active={active} />
                </MenuLink>
              )}
            </Menu.Item>
          ))}
        </div>
        <div className="pt-1">
          <Menu.Item>
            {({ active }) => (
              <button className="w-full h-full" onClick={logout}>
                <ListItem icon={<ArrowRightOnRectangleIcon />} label="ログアウト" active={active} />
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default UserMenu;
