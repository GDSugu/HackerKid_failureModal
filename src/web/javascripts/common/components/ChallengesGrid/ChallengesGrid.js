import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Img from '../Img';

const ChallengesGrid = ({
  heading,
  challenges,
  navLinkTo,
  contentContainerClassName = '',
  navLinkText = '',
  showChallengeAuthorName = true,
  showEmptyState = true,
  isDesktop,
  emptyStateText = '',
  showCreateChallengeButtonInEmptyState = true,
  numberOfSkeletonCards = 6,
  challengeCardType = 'clickable',
  onChallengeCardClick = () => { },
}) => (
  <section className={`grid-container ${contentContainerClassName}`}>
    {
      (showEmptyState
        && showCreateChallengeButtonInEmptyState
        && challenges
        && challenges.length === 0
        && !isDesktop)
      && <Link to={'#'} className='create-challenge-btn btn-block mt-0 mb-4'>
        <FormattedMessage defaultMessage={'Create a Challenge'} description={'create challenge button'} />
        <i className='fa fa-chevron-right' />
      </Link>
    }
    <header className='grid-header'>
      <h6 className='heading6 page-title'>
        <FormattedMessage
          defaultMessage={'{heading}'}
          description='section heading'
          values={{ heading }}
        />
      </h6>
      {
        navLinkText && <Link to={navLinkTo} className='nav-link caption-bold'>
          <FormattedMessage defaultMessage={'{navLinkText}'} description='nav link' values={{ navLinkText }} />
        </Link>
      }
    </header>
    {
      challenges && challenges.length > 0 && <div className='challenges-grid row'>
        {
          challenges.map((challenge, idx) => (
            <div className='col-12 col-sm-6 col-md-4' key={idx}>
              {
                challengeCardType === 'clickable'
                && <div tabIndex={0} className='challenge-item' onClick={() => onChallengeCardClick(challenge)} style={{ cursor: 'pointer' }}>
                  <div className="challenge-block">
                    <div className="challenge-img">
                      <Img
                        alt={challenge.challengeName}
                        useSource={true}
                        local={false}
                        src={challenge.imgPath}
                        fallback={'../../../../../images/games/code.svg'}
                      />
                      {/* <img src={challenge.imgPath} alt={challenge.challengeName} /> */}
                    </div>
                    <div className="challenge-title">
                      <p>{challenge.challengeName || '--'}</p>
                    </div>
                    {
                      showChallengeAuthorName && <div className="challenge-author">
                        <p>{`by ${challenge.creatorName || '--'}`}</p>
                      </div>
                    }
                  </div>
                </div>
              }
              {
                challengeCardType === 'link'
                && <Link className='challenge-item' to={challenge.actionUrl} >
                  <div className="challenge-block">
                    <div className="challenge-img">
                      <Img
                        alt={challenge.challengeName}
                        useSource={true}
                        local={false}
                        src={challenge.imgPath}
                        fallback={'../../../../../images/games/code.svg'}
                      />
                      {/* <img src={challenge.imgPath} alt={challenge.challengeName} /> */}
                    </div>
                    <div className="challenge-title">
                      <p>{challenge.challengeName || '--'}</p>
                    </div>
                    {
                      showChallengeAuthorName && <div className="challenge-author">
                        <p>{`by ${challenge.creatorName || '--'}`}</p>
                      </div>
                    }
                  </div>
                </Link>
              }
            </div>
          ))
        }
      </div>
    }
    {
      showEmptyState && challenges && challenges.length === 0 && <div className='challenges-empty'>
        <Img
          src='challenges/my-challenges-empty.png'
          alt='no-challenges'
        />
        {/* <img
        src='../../../../images/challenges/my-challenges-empty.png' alt='no-challenges' /> */}
        <h6 className='subtitle1'>
          <FormattedMessage defaultMessage={'{emptyStateText}'} description={'no challenges'} values={{ emptyStateText }} />
        </h6>
        {
          isDesktop && showCreateChallengeButtonInEmptyState && <Link to={'/turtle/challanges/create/new'} className='create-challenge-btn'>
            <FormattedMessage defaultMessage={'Create a Challenge'} description={'create challenge button'} />
            <i className='fa fa-chevron-right' />
          </Link>
        }
      </div>
    }
    {
      !challenges && <div className='challenges-grid row gy-2'>
        {
          new Array(numberOfSkeletonCards).fill(1).map((val, idx) => <div key={idx} className='col-12 col-sm-6 col-md-4 py-2'>
            <div className='skeleton'></div>
          </div>)
        }
      </div>
    }
  </section>
);

export default ChallengesGrid;
