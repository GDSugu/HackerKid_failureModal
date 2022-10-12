import React, {
  memo, useRef, useState, useEffect,
} from 'react';
import { loginCheck, pageInit } from '../framework';
import '../../../stylesheets/common/sass/components/_challenges-grid.scss';
import '../../../stylesheets/common/pages/your-challenges/style.scss';
import { useGetMyChallenges } from '../../../../hooks/pages/challenges';
import ChallengesGrid from '../components/ChallengesGrid/ChallengesGrid';
import Paginator from '../components/Paginator';

const MyChallengesComponent = memo(ChallengesGrid);

const YourChallenges = () => {
  const isPageMounted = useRef(true);
  pageInit('your-challenges-container', 'Your Challenges');

  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 576px)').matches);
  const [localState, setLocalState] = useState({
    paginatedResults: false,
    page: 1,
    countPerPage: 9,
  });
  const { state: getMyChallengesState } = useGetMyChallenges({ isPageMounted });

  const {
    myChallenges,
    publishedChallengesCount,
  } = getMyChallengesState;

  const {
    page,
    countPerPage,
  } = localState;

  const paginate = (pageNumber) => {
    const end = pageNumber * countPerPage;
    const start = end - countPerPage;

    const filteredChallenges = myChallenges.filter((challenge) => challenge.challengeState === 'published');
    const challenges = filteredChallenges.slice(start, end);

    setLocalState((prev) => ({ ...prev, paginatedResults: challenges }));
  };

  useEffect(() => {
    if (myChallenges) {
      paginate(page);
    }
  }, [myChallenges, page]);

  useEffect(() => {
    loginCheck();

    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 576px)').matches);
    });

    return () => {
      isPageMounted.current = false;
    };
  }, []);

  // methods
  const onPageChange = (pageNumber) => {
    setLocalState((prev) => ({ ...prev, page: pageNumber }));
  };

  const onNextBtnClick = () => {
    setLocalState((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const onPrevBtnClick = () => {
    setLocalState((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  return (
    <>
    <main className='col-12 col-md-11 col-xl-10 mx-auto'>
        <MyChallengesComponent
          heading={'My Challenges'}
          contentContainerClassName='my-challenges-section'
          navLinkText='Drafts'
          navLinkTo={'drafts'}
          showEmptyState={true}
          emptyStateText={'No Challenges published yet !'}
          showChallengeAuthorName={false}
          challenges={localState.paginatedResults}
          isDesktop={isDesktop}
        />
    </main>
    {
      Boolean(Number(publishedChallengesCount))
      && Boolean(Number(countPerPage)) && <Paginator
      totalItems={Number(publishedChallengesCount)}
      countPerPage={Number(countPerPage)}
      currentPageNumber={page}
      initialWindow={isDesktop ? 5 : 3}
      onPageChange={onPageChange}
      onNextBtnClick={onNextBtnClick}
      onPrevBtnClick={onPrevBtnClick}
    />
    }
    </>
  );
};

export default YourChallenges;
