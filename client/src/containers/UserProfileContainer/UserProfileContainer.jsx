import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { Title } from '../../components/head/Title';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';

const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));

/** @type {React.VFC} */
const UserProfileContainer = () => {
  const { username } = useParams();

  const { data: user, isLoading: isLoadingUser } = useFetch(`/api/v1/users/${username}`, fetchJSON);
  const { data: posts, fetchMore } = useInfiniteFetch(`/api/v1/users/${username}/posts`, fetchJSON);

  if (isLoadingUser) {
    return <Title title="読込中 - CAwitter" />;
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  return (
    <>
      <Title title={`${user.name} さんのタイムライン - CAwitter`} />
      <InfiniteScroll fetchMore={fetchMore} items={posts}>
        <UserProfilePage timeline={posts} user={user} />
      </InfiniteScroll>
    </>
  );
};

export { UserProfileContainer };
