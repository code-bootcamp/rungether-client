import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { ReviewDetailState } from "../../../../commons/stores";
import { IQuery, IQueryFetchFollowerArgs, IQueryFetchFollowingArgs } from "../../../../commons/types/generated/types";
import { FETCH_USER_LOGGED_IN } from "../../../commons/layout/header/header";
import ReviewUI from "./Review.presenter";
import { FETCH_ALL_REVIEW_BOARDS, FETCH_FOLLOWER, FETCH_FOLLOWING} from "./Review.query";

export default function Review() {
    const [isModalOpen, setIsModalOpen] = useRecoilState(ReviewDetailState);
    const [reviewId, setReviewId] = useState("")
    const [reviewList, setReviewList] = useState(true)
    const [following, setFollowing] = useState(false)
    const [follower, setFollower] = useState(false)

    const { data: fetchUser} = useQuery(FETCH_USER_LOGGED_IN);
    const { data,fetchMore } = useQuery(FETCH_ALL_REVIEW_BOARDS);
    const { data:followingList ,fetchMore: followingMore } = useQuery<
    Pick<IQuery, "fetchFollowing">,
    IQueryFetchFollowingArgs
  >(FETCH_FOLLOWING, {
      variables: { userId: String(fetchUser?.fetchUserLoggedIn.id) },
    });
    const { data:followerList ,fetchMore: followerMore } = useQuery<
    Pick<IQuery, "fetchFollower">,
    IQueryFetchFollowerArgs
  >(FETCH_FOLLOWER, {
      variables: { userId: String(fetchUser?.fetchUserLoggedIn.id) },
    });

    const onClickMore = (reviewBoardId) => () =>{
        setReviewId(reviewBoardId)
        setIsModalOpen(true);
    }
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const onLoadMore = () => {
        if (!data) return;
    
        fetchMore({
          variables: {
            page: Math.ceil(data?.fetchAllReviewBoards.length / 12) + 1,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (fetchMoreResult.fetchAllReviewBoards == undefined) {
              return {
                fetchAllReviewBoards: [...prev.fetchAllReviewBoards],
              };
            }
            return {
              fetchAllReviewBoards: [
                ...prev.fetchAllReviewBoards,
                ...fetchMoreResult?.fetchAllReviewBoards,
              ],
            };
          },
        });
      };
      const onClickHome = () => {
        setReviewList(true)
        setFollowing(false)
        setFollower(false)
      }
      const onClickFollowing = () => {
        setFollowing(true)
        setReviewList(false)
        setFollower(false)
      }
      const onClickFollower = () => {
        setFollower(true)
        setFollowing(false)
        setReviewList(false)
      }
  
    return(
        <ReviewUI
        onClickHome={onClickHome}
        onLoadMore={onLoadMore}
        onClickFollower={onClickFollower}
        onClickFollowing={onClickFollowing}
        reviewList={reviewList}
        following={following}
        data={data}
        follower={follower}
        followingList={followingList}
        followerList={followerList}
        reviewId={reviewId}
        isModalOpen={isModalOpen}
        onClickMore={onClickMore}
        handleCancel={handleCancel}
        />
    )
}