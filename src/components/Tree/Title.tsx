import { FC } from "react";
import { IconLocation, IconPlus } from "@arco-design/web-react/icon";
import { Dropdown, Menu } from "@arco-design/web-react";

interface TitleProps {
  title: string;
  favicon: string;
}

const iconStyle = {
  marginRight: 8,
  fontSize: 16,
  transform: "translateY(1px)",
};

const dropList = (
  <Menu>
    <Menu.Item key="1">
      <IconLocation style={iconStyle} />
      New Tab
    </Menu.Item>
    <Menu.Item key="2">
      <IconLocation style={iconStyle} />
      Reload
    </Menu.Item>
    <Menu.Item key="3">
      <IconLocation style={iconStyle} />
      Mute
    </Menu.Item>
    <Menu.Item key="4">
      <IconLocation style={iconStyle} />
      Pin
    </Menu.Item>
    <Menu.Item key="5">
      <IconLocation style={iconStyle} />
      Duplicate
    </Menu.Item>
    <Menu.Item key="6">
      <IconLocation style={iconStyle} />
      Hibernate
    </Menu.Item>
    <Menu.Item key="7">
      <IconLocation style={iconStyle} />
      Close
    </Menu.Item>
  </Menu>
);

export const Title: FC<TitleProps> = ({
  title,
  favicon,
}: {
  title: string;
  favicon: string;
}) => {
  return (
    <div className={"tree-node-title flex justify-between items-center"}>
      <Dropdown droplist={dropList} trigger="contextMenu">
        <span className="flex-1 overflow-hidden text-ellipsis">
          <img
            className={"text-white align-middle inline mr-2 w-4 h-4"}
            src={favicon}
            alt={title}
          />
          {title}
        </span>
      </Dropdown>
      <div className={"utilityIcons"}>
        <IconPlus className={""} />
      </div>
    </div>
  );
};
