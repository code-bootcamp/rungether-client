import { useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchFollowingArgs,
  IQueryFetchUserArgs,
} from "../../../commons/types/generated/types";
import { FETCH_USER_LOGGED_IN } from "../MyPageA/MyPageA";
import { FETCH_FOLLOWING } from "../PhotoReview/ReviewList/Review.query";
import { FETCH_USERS } from "./MebersPage.query";
import MembersUi from "./MembersPage.presenter";

export default function Members() {
  const [isNo, setIsNo] = useState(false);
  const [Lo, setLo] = useState("");
  const [age, setAge] = useState("");
  const [level, setLevel] = useState("");
  const [fav, setFav] = useState("");
  const [Lo_R, setLo_R] = useState("");
  const [age_R, setAge_R] = useState("");
  const [level_R, setLevel_R] = useState("");
  const [fav_R, setFav_R] = useState("");
  const result = [];
  const following = [];

  const { data, loading, fetchMore } = useQuery<
    Pick<IQuery, "fetchUsers">,
    IQueryFetchUserArgs
  >(FETCH_USERS);

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUsers.length / 8) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUsers == undefined) {
          return {
            fetchUsers: [...prev.fetchUsers],
          };
        }
        return {
          fetchUsers: [...prev.fetchUsers, ...fetchMoreResult?.fetchUsers],
        };
      },
    });
  };

  const { data: LoggedIn } = useQuery(FETCH_USER_LOGGED_IN);

  const { data: followingList, fetchMore: followingMore } = useQuery<
    Pick<IQuery, "fetchFollowing">,
    IQueryFetchFollowingArgs
  >(FETCH_FOLLOWING, {
    variables: { userId: String(LoggedIn?.fetchUserLoggedIn.id) },
  });

  const onChangeLevel = (e: MouseEvent) => {
    setLevel(String(e));
  };
  const onChangeLo = (e: MouseEvent) => {
    setLo(String(e));
  };
  const onChangeAge = (e: MouseEvent) => {
    setAge(String(e));
  };
  const onChangeFav = (e: MouseEvent) => {
    setFav(String(e));
  };
  const onClickBtn = () => {
    setLo_R(Lo);
    setAge_R(age);
    setLevel_R(level);
    setFav_R(fav);
    if (result.length === 0 && setIsNo) {
      setIsNo((prev) => !prev);
    }
  };

  data?.fetchUsers.forEach((el) => {
    if (
      el.region?.includes(Lo) === true &&
      el.age?.includes(age) === true &&
      el.grade?.includes(level) === true &&
      el.prefer?.includes(fav) === true
    ) {
      result.push(el);
    }
  });

  return (
    <MembersUi
      onLoadMore={onLoadMore}
      loading={loading}
      following={following}
      isNo={isNo}
      data={data}
      result={result}
      onChangeLevel={onChangeLevel}
      onChangeLo={onChangeLo}
      onChangeAge={onChangeAge}
      onChangeFav={onChangeFav}
      onClickBtn={onClickBtn}
    />
  );
}
