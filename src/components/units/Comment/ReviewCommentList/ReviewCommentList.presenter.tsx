import InfiniteScroll from "react-infinite-scroller";
import ReviewCommentListItem from "./ReviewCommentList.presenterItem";

export default function ReviewCommentListUI(props: any) {
  return (
    <>

        {props.data?.fetchReviewComments.map((el: any) => (
          <ReviewCommentListItem
            key={el.id}
            el={el}
            onClickDelete={props.onClickDelete}
          />
        ))}
    </>
  );
}
