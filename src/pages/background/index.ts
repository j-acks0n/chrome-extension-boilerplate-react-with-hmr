import { ACTIVE_TREE_PREFIX } from "@utilities/constants";
import { LeafType, RunTasks } from "@utilities/enum";
import { TabStatus } from "@utilities/enum/Tab";
import { randomIntFromInterval } from "@utilities/helper";
import { LeafInfo, TreeInfo } from "@utilities/types";
import { v4 as uuid } from "uuid";

if (process.env.NODE_ENV === "development") {
  const eventSource = new EventSource(
    `http://${process.env.REACT_APP__HOST__}:${process.env.REACT_APP__PORT__}/reload/`
  );
  console.log("--- initiate listener ---");
  eventSource.addEventListener("content_changed_reload", async ({ data }) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const tabId = tab.id || 0;
    console.log(`tabId is ${tabId}`);
    await chrome.tabs.sendMessage(tabId, {
      type: "window.location.reload",
    });
    console.log("chrome extension will reload", data);
    chrome.runtime.reload();
  });
}
console.log("This is the background page.");

chrome.system.display.getInfo((displays) => {
  const display = displays[0];
  const height = display.bounds.height;
  chrome.windows.create({
    url: "external.html",
    type: "popup",
    left: randomIntFromInterval(0, 600),
    width: 340,
    height: height,
  });
});

/**
 * Utility
 */

const getTreeInfo = (windowKey: string): Promise<TreeInfo> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(windowKey, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else resolve(result[windowKey]);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const storeTreeInfo = async (
  key: string,
  treeInfo: TreeInfo
): Promise<boolean> => {
  return storeData(key, treeInfo);
};

export const storeData = async (key: string, obj: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ [key]: obj }, () => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(true);
      });
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

const convertToLeaf = (tab: chrome.tabs.Tab): LeafInfo => {
  return {
    key: uuid(),
    title: tab.title || "",
    active: tab.active,
    status: tab.status || TabStatus.NONE,
    favicon: tab.favIconUrl || "",
    children: [],
    tabId: tab.id,
    url: tab.url || "",
    pinned: tab.pinned,
    muted: tab.mutedInfo?.muted || false,
    audible: tab.audible || false,
    type: LeafType.NORMAL,
  };
};

const createTree = async ({
  leafInfo,
  treeKey,
}: {
  leafInfo: LeafInfo;
  treeKey: string;
}) => {
  const treeInfo: TreeInfo = {
    treeData: [leafInfo],
    expandedKeys: [],
    selectedKeys: [leafInfo.key],
    pinned: [],
  };
  await storeTreeInfo(treeKey, treeInfo);
};

const addToTree = async ({
  leafInfo,
  treeKey,
  treeInfo,
}: {
  leafInfo: LeafInfo;
  treeKey: string;
  treeInfo: TreeInfo;
}) => {
  treeInfo.treeData.push(leafInfo);
  treeInfo.selectedKeys = [leafInfo.key];
  await storeTreeInfo(treeKey, treeInfo);
};

/**
 * Method runner
 */

const run = async ({ task, payload }: { task: RunTasks; payload: any }) => {
  switch (task) {
    case RunTasks.ON_TAB_CREATED: {
      const tabInfo: chrome.tabs.Tab = payload;
      await runTaskOnTabCreated(tabInfo);
      break;
    }
    default:
      break;
  }
};

const runTaskOnTabCreated = async (callback: chrome.tabs.Tab) => {
  const treeKey = ACTIVE_TREE_PREFIX + callback.windowId;
  const treeInfo: TreeInfo = await getTreeInfo(treeKey);
  const leafInfo = convertToLeaf(callback);
  if (treeInfo) {
    await addToTree({
      treeInfo: treeInfo,
      treeKey: treeKey,
      leafInfo: leafInfo,
    });
  } else {
    await createTree({
      leafInfo: leafInfo,
      treeKey: treeKey,
    });
  }
};

/**
 *
 * Tab Listeners 1
 * Tab created
 */

chrome.tabs.onCreated.addListener((callback) => {
  run({
    task: RunTasks.ON_TAB_CREATED,
    payload: callback,
  }); //tab
});

console.log("background loaded");
