import { LeafType } from "../enum";

export interface TreeInfo {
  treeData: LeafInfo[];
  expandedKeys: string[];
  selectedKeys: string[];
  pinned: string[];
}

export interface LeafInfo {
  key: string;
  title: string;
  active: boolean;
  status: string;
  favicon: string;
  children: LeafInfo[];
  tabId: number | undefined;
  url: string;
  pinned: boolean;
  muted: boolean;
  audible: boolean;
  type: LeafType;
}
