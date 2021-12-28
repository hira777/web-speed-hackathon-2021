import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { PostPage } from '../../components/post/PostPage';
import { Title } from '../../components/head/Title';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';

const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));

/** @type {React.VFC} */
const PostContainer = () => {
  const { postId } = useParams();

  const { data: post, isLoading: isLoadingPost } = useFetch(`/api/v1/posts/${postId}`, fetchJSON);

  const { data: comments, fetchMore } = useInfiniteFetch(`/api/v1/posts/${postId}/comments`, fetchJSON);

  if (isLoadingPost) {
    return <Title title="読込中 - CAwitter" />;
  }

  if (post === null) {
    return <NotFoundContainer />;
  }

  return (
    <>
      <Title title={`${post.user.name} さんのつぶやき - CAwitter`} />
      <InfiniteScroll fetchMore={fetchMore} items={comments}>
        <PostPage comments={comments} post={post} />
      </InfiniteScroll>
    </>
  );
};

export { PostContainer };
