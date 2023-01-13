import { atom, selector } from "recoil";
import { getAccessToken } from "../library/getAccessToken";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});

export const modalWriteState = atom({
  key: "modalWriteState",
  default: false,
});
export const modalEditState = atom({
  key: "modalEditState",
  default: false,
});
export const modalDetailState = atom({
  key: "modalDetailState",
  default: false,
});
// export const boardImageState = atom({
//   key: "boardImageState",
//   default: "",
// });
export const ReviewImagesState = atom({
  key: "ReviewImagesState",
  default: [],
});
export const attendListIdState = atom({
  key: "attendListIdState",
  default: "",
});

export const reviewWriteModalState = atom({
  key: "reviewWriteModalState",
  default: false,
});
export const BoardId = atom({
  key: "BoardId",
  default: "",
});
export const EditBoardId = atom({
  key: "EditBoardId",
  default: "",
});
export const mapPathState = atom({
  key: "mapPathState",
  default: "",
});
export const mapCenterState = atom({
  key: "mapCenterState",
  default: "",
});
export const mapEditPathState = atom({
  key: "mapPathState",
  default: "",
});
export const mapEditCenterState = atom({
  key: "mapCenterState",
  default: "",
});
export const mapPathViewState = atom({
  key: "mapPathState",
  default: [],
});
export const mapCenterViewState = atom({
  key: "mapCenterState",
  default: [],
});
export const ReviewCommentMore = atom({
  key: "ReviewCommentMore",
  default: false,
});
