import { ListItemProps } from "@/components/select";

export type Idea = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  inventor: string;
  members: string[];
  status: "brainstorm" | "pretotype" | "launch";
};

export const statusItems: ListItemProps[] = [
  {
    id: "brainstorm",
    name: "絵に描いた餅🖼️",
  },
  {
    id: "pretotype",
    name: "実験中🧪",
  },
  {
    id: "launch",
    name: "リリース済🚀",
  },
];
