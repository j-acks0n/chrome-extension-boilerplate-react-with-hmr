import { Tree as ArcoTree, Radio, TreeProps } from "@arco-design/web-react";
import { useState } from "react";
import styled from "styled-components";
import { Title } from "./Title";

const StyledTree = styled((props: TreeProps) => <ArcoTree {...props} />)`
  .arco-tree-node-title {
    /* padding: 5px 8px 5px 4px; */
    flex: 1 1 0%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .arco-tree-node-title .utilityIcons {
    display: none;
  }

  .arco-tree-node-title:hover .utilityIcons {
    display: block;
  }
`;

const TreeData = [
  {
    title: "Trunk 0-0 Trunk 0-0 Trunk 0-0 Trunk 0-0 Trunk 0-0 Trunk 0-0",
    key: "0-0",
    favicon:
      "https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico",
    children: [
      {
        title: "Branch 0-0-2",
        key: "0-0-2",
        children: [
          {
            title: "Leaf",
            key: "0-0-2-1",
            children: [
              {
                title: "Leafsss 0-0-2",
                key: "0-0-2-1-0",
                children: [
                  {
                    title: "Leaf",
                    key: "0-0-2-1-0-0",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Trunk 0-1",
    key: "0-1",
    children: [
      {
        title: "Branch 0-1-1",
        key: "0-1-1",
        children: [
          {
            title: "Leaf",
            key: "0-1-1-0",
          },
        ],
      },
    ],
  },
  {
    title: "Leaf",
    key: "0-0-2-1-0-0-0",
  },
];

export const Tree = () => {
  const [treeData, setTreeData] = useState(TreeData);
  const [size, setSize] = useState<TreeProps["size"]>("default");

  const onDrop = ({ dragNode, dropNode, dropPosition }) => {
    const loop = (data, key, callback) => {
      data.some((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return true;
        }

        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = [...treeData];
    let dragItem;
    loop(data, dragNode.props._key, (item, index, arr) => {
      arr.splice(index, 1);
      dragItem = item;
      dragItem.className = "tree-node-dropover";
    });

    if (dropPosition === 0) {
      loop(data, dropNode.props._key, (item, index, arr) => {
        item.children = item.children || [];
        item.children.push(dragItem);
      });
    } else {
      loop(data, dropNode.props._key, (item, index, arr) => {
        arr.splice(dropPosition < 0 ? index : index + 1, 0, dragItem);
      });
    }

    setTreeData([...data]);
    setTimeout(() => {
      dragItem.className = "";
      setTreeData([...data]);
    }, 1000);
  };

  return (
    <>
      <Radio.Group
        options={["mini", "small", "default", "large"]}
        type="button"
        value={size}
        onChange={setSize}
        style={{ marginBottom: 20 }}
      ></Radio.Group>
      <StyledTree
        blockNode
        draggable
        onDrop={onDrop}
        treeData={treeData}
        size={size}
        icons={{
          dragIcon: null,
        }}
        // renderExtra={(node) => {
        //   return (
        //     <Dropdown droplist={dropList} trigger="click" position="bl">
        //       <IconPlus
        //         style={{
        //           position: "absolute",
        //           right: 8,
        //           fontSize: 12,
        //           top: 10,
        //           color: "#3370ff",
        //         }}
        //         // onClick={() => {
        //         //   const dataChildren = node.dataRef.children || [];
        //         //   dataChildren.push({
        //         //     title: "new tree node",
        //         //     key: node._key + "-" + (dataChildren.length + 1),
        //         //   });
        //         //   node.dataRef.children = dataChildren;
        //         //   setTreeData([...treeData]);
        //         // }}
        //       />
        //     </Dropdown>
        //   );
        // }}
        renderTitle={({ favicon, title }) => (
          <Title favicon={favicon} title={title} />
        )}
      ></StyledTree>
    </>
  );
};
