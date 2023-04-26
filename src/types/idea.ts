import { ListItemProps } from "@/components/select";

export type Idea = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  inventor: string;
  members: string[];
  status: "brainstorm" | "pretotype" | "released";
  thumbnails: string[];
};

export const statusItems: ListItemProps[] = [
  {
    id: "brainstorm",
    name: "絵に描いた餅🖼️",
  },
  {
    id: "pretotype",
    name: "実証実験中🧪",
  },
  {
    id: "released",
    name: "リリース済🚀",
  },
];
