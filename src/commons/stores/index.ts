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
export const userEditState = atom({
  key: "userEditState",
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
  key: "mapEditPathState",
  default: "",
});
export const mapEditCenterState = atom({
  key: "mapEditCenterState",
  default: "",
});
export const mapPathViewState = atom({
  key: "mapPathViewState",
  default: [],
});
export const mapCenterViewState = atom({
  key: "mapCenterViewState",
  default: [],
});
export const ReviewCommentMore = atom({
  key: "ReviewCommentMore",
  default: false,
});

export const LoggedInUserId = atom({
  key: "LoggedInUserId",
  default: "",
});
export const ReviewDetailState = atom({
  key: "ReviewDetailState",
  default: false,
});
export const confirmModalState = atom({
  key: "confirmModalState",
  default: false,
});
export const attendListModalState = atom({
  key: "attendListModalState",
  default: false,
});
export const ToggleState = atom({
  key: "ToggleState",
  default: false,
});
export const PickState = atom({
  key: "PickState",
  default: false,
});
export const AttendState = atom({
  key: "AttendState",
  default: false,
});
export const okModalState = atom({
  key: "okModalState",
  default: false,
});
