import { Tree } from "@components/Tree";
import { useTree } from "@utilities/hooks";
import "./index.css";

export const App = ({ title }: { title: string }) => {
  const { treeInfo } = useTree("activeWindow_1353486023");
  return <Tree />;
};
