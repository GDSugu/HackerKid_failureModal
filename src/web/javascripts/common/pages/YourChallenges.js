import React, {
  memo, useRef, useState, useEffect,
} from 'react';
import { $, loginCheck, pageInit } from '../framework';
import '../../../stylesheets/common/sass/components/_challenges-grid.scss';
import '../../../stylesheets/common/pages/your-challenges/style.scss';
import { useGetMyChallenges } from '../../../../hooks/pages/challenges';
import ChallengesGrid from '../components/ChallengesGrid/ChallengesGrid';
import ChallengesNavBar from '../components/ChallengesNavBar';
import Paginator from '../components/Paginator';
import YourChallengeActionsModal from '../components/YourChallengeActionModal';

const MyChallengesComponent = memo(ChallengesGrid);

const YourChallenges = () => {
  const isPageMounted = useRef(true);
  pageInit('your-challenges-container', 'Your Challenges');

  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 576px)').matches);
  const [localState, setLocalState] = useState({
    paginatedResults: false,
    page: 1,
    countPerPage: 9,
    actionsModalOpen: false,
    challengeToTakeActionOn: false,
    actionTaken: false,
  });

  const {
    state: getMyChallengesState,
    static: { getMyChallenges },
  } = useGetMyChallenges({ isPageMounted });

  const {
    myChallenges,
    publishedChallengesCount,
  } = getMyChallengesState;

  const {
    page,
    countPerPage,
    actionsModalOpen,
    challengeToTakeActionOn,
    actionTaken,
  } = localState;

  const paginate = (pageNumber) => {
    const end = pageNumber * countPerPage;
    const start = end - countPerPage;

    const filteredChallenges = myChallenges.filter((challenge) => challenge.challengeState === 'published');
    const challenges = filteredChallenges.slice(start, end);

    setLocalState((prev) => ({ ...prev, paginatedResults: challenges }));
  };

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

  const onChallengeCardClick = (challenge) => {
    setLocalState((prev) => ({
      ...prev,
      actionsModalOpen: true,
      challengeToTakeActionOn: challenge,
    }));
  };

  const setActionTaken = () => {
    setLocalState((prev) => ({ ...prev, actionTaken: true }));
  };

  const onActionsModalHide = () => {
    setLocalState((prev) => ({ ...prev, actionsModalOpen: false }));
  };

  useEffect(() => {
    if (actionTaken === true) {
      getMyChallenges({ cached: false });
    }
  }, [actionTaken]);

  useEffect(() => {
    if (myChallenges) {
      paginate(page);
    }
  }, [myChallenges, page]);

  useEffect(() => {
    $('nav:first-child').css('display', 'none');
    loginCheck();

    window.addEventListener('resize', () => {
      setIsDesktop(window.matchMedia('(min-width: 576px)').matches);
    });

    return () => {
      $('nav:first-child').css('display', 'block');
      isPageMounted.current = false;
    };
  }, []);

  return (
    <>
    <ChallengesNavBar isDesktop={isDesktop} />
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
        onChallengeCardClick={onChallengeCardClick}
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
      <YourChallengeActionsModal
        open={actionsModalOpen}
        setOpen={(value) => {
          setLocalState((prev) => ({ ...prev, actionsModalOpen: value }));
        }}
        challenge={challengeToTakeActionOn}
        setActionTaken={setActionTaken}
        onActionsModalHide={onActionsModalHide}
      />
    </>
  );
};

export default YourChallenges;
