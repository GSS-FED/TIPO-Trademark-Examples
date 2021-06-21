export type IdMap = {
  [key: string]: boolean;
};

export const fromIds = (ids: string[], activedIds: string[] = []) => {
  let obj: IdMap = {};
  for (let id of ids) {
    obj[id] = false;
  }
  for (let id of activedIds) {
    obj[id] = true;
  }
  return obj;
};

export const toActivedIds = (ids: string[], idMap: IdMap) => {
  let result: string[] = [];
  for (let id of ids) {
    if (idMap[id]) result.push(id);
  }
  return result;
};
