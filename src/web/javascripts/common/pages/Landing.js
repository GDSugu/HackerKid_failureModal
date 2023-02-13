import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Plyr from 'plyr';
import Hls from 'hls.js';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import '../../../../../node_modules/plyr-react/plyr.css';
import '../../../stylesheets/common/pages/landing/style.scss';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import { Autoplay, Pagination } from 'swiper';
import {
  $,
  pageInit,
} from '../framework';

// import Img from '../components/Img';

const isDesktop = window.matchMedia('(min-width: 640px)').matches;

let codingGamesProps = {};

if (isDesktop) {
  codingGamesProps = {
    spaceBetween: 16,
    slidesPerView: 4,
    className: 'course-swiper',
    grabCursor: true,
    lazy: true,
    navigation: false,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, Pagination],
  };
} else {
  codingGamesProps = {
    spaceBetween: 16,
    slidesPerView: 'auto',
    className: 'course-swiper',
    grabCursor: true,
    lazy: true,
    navigation: false,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, Pagination],
  };
}

const LandingHeader = () => <>
  <header>
    <div className='container'>
      <div className='d-flex'>
        <button className='menu-icon text-white' data-toggle='modal' data-target='#myModal2'><i className='fa fa-bars' aria-hidden="true"></i>
        </button>
        <a href='/' className='logo mr-auto'><img src='../../../../images/landing/hackerkid-logo.webp' alt='hackerkid logo' title='Hackerkid Logo' /></a>
        <div className='d-flex unlimite-login-sign'>
          <a href='/pricing' className='btn unlimited-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
          </a>
          <div className='log-sign-btn'>
            <a href='/login' className='btn login-btn'>Login</a>
            <a href='/register' className='btn signup-btn'>Sign Up</a>
          </div>
        </div>

      </div>
    </div>
  </header>
</>;

const LandingSidebarModal = () => <>
  <div className='modal left fade sidebar-modal' id='myModal2' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'>
    <div className='modal-dialog' role='document'>
      <div className='modal-content'>
        <div className='modal-header'>
          <a href='/' className='logo mr-auto'><img src='../../../../images/landing/black-hackerkit-logo.webp' alt='hackerkid logo' title='Hackerkid Logo' /></a>
          <button type='button' className="close mobile-close-btn" data-dismiss="modal" aria-label="Close"><i className='fa fa-window-close' aria-hidden='true'></i></button>
        </div>
        <div className='modal-body'>
          <div className='butts'>
          <a href='/pricing' className='btn unlimited-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden='true'></i>
            </a>
            <div className='log-sign-btn d-block'>
              <a href='/login' className='btn signup-btn mt-3'>Sign Up</a>
              <a href='/register' className='btn login-btn mt-3'>Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>;

const LandingBanner = () => <>
  <figure>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-7 col-md-7'>
          <h1>
            <FormattedMessage
              defaultMessage={'Master Coding Skills through Active Gaming'}
              description={'coding skill title'}
            />
          </h1>
          <p>
            <FormattedMessage
              defaultMessage={'Unlock game-based learning experience for kids'}
              description={'learning experience content'}
            />
          </p>

          <picture className='d-lg-none d-md-none'>
            <img src='../../../../images/landing/master-coding-skill-banner.webp' className='w-100' />
          </picture>

          <a href='/pricing' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
          </a>
        </div>

        <div className='col-lg-5 col-md-5'>
          <picture className='d-none d-sm-none d-lg-block d-md-block'>
            <img src='../../../../images/landing/master-coding-skill-banner.webp' className='w-100' />
          </picture>
        </div>
      </div>
      <div className='boat-route-line-1'></div>
    </div>
    <div className='cloud-left-1'></div>
    <div className='cloud-right-1'></div>
  </figure>
</>;

const LandingVideo = () => <>
    <section className='top-space'>
      <div className='container'>
        <div className='hackerkid-video-sec max-size' id='hackerkid-video'>
           <picture>
              <img src='../../../../images/landing/hackerkit-img.webp' className='w-100' />
            </picture>
            <div className='play-icon'>
              <i className="fa fa-play text-white" aria-hidden="true"></i>
            </div>
        </div>
        <div className='boat-route-line-2'></div>
      </div>
      <div className='cloud-left-2'></div>
      <div className='cloud-right-2'></div>
    </section>
  </>;

const LandingCodingGames = () => <>
  <section>
    <div className='top-space interactive-coding-games'>
      <div className='container'>
        <h2>
          <FormattedMessage
            defaultMessage={'Interactive Coding Games'}
            description={'Interactive Coding Games title'}
          />
        </h2>
        <Swiper {...codingGamesProps} >

          <SwiperSlide>
            <h3 className='two-slide-title coding-common-head'>
              <FormattedMessage
                defaultMessage={'For Classes 5 & 6'}
                description={'For Classes 5 & 6 title'}
              />
            </h3>
            <div className='card coding-space line-conding'>
              <div className='card-body'>
                <div>
                  <picture>
                    <img src='../../../../images/landing/turtle.webp' alt='turtle' title='Turtle' />
                  </picture>
                  <div className='coding-game-list coding-game-sec-1'>
                    <i className='fa fa-angle-up text-white' aria-hidden="true"></i>
                    <h3 className='text-white'>
                      <FormattedMessage
                        defaultMessage={'The Turtle'}
                        description={'The Turtle title'}
                      />
                    </h3>
                    <p className='text-white'>
                      <FormattedMessage
                        defaultMessage={'Learn Python Programming through Turtle’s Block Coding.'}
                        description={'description'}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='card coding-space'>
              <div className='card-body'>
                <div>
                  <picture>
                    <img src='../../../../images/landing/zombieland.webp' alt='zombieland' title='zombieland' />
                  </picture>
                  <div className='coding-game-list coding-game-sec-2'>
                    <i className='fa fa-angle-up text-white' aria-hidden="true"></i>
                    <h3 className='text-white'>
                      <FormattedMessage
                        defaultMessage={'The Zombieland'}
                        description={'The Zombieland title'}
                      />
                    </h3>
                    <p className='text-white'>
                      <FormattedMessage
                        defaultMessage={'Learn syntax-based coding through Zombieland Game Levels'}
                        description={'description'}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <h3>
              <FormattedMessage
                defaultMessage={'For Classes 7, 8 & 9'}
                description={'For Classes 7, 8 & 9 title'}
              />
            </h3>
            <div className='card'>
              <div className='card-body'>
                <div>
                  <picture>
                    <img src='../../../../images/landing/webkata-trilogy.webp' alt='webKata trilogy' title='WebKata Trilogy' />
                  </picture>
                  <div className='coding-game-list coding-game-sec-3'>
                    <i className='fa fa-angle-up text-white' aria-hidden="true"></i>
                    <h3 className='text-white'>
                      <FormattedMessage
                        defaultMessage={'WebKata Trilogy'}
                        description={'title'}
                      />
                    </h3>
                    <p className='text-white'>
                      <FormattedMessage
                        defaultMessage={'Learn basic essentials of Web Development through HTML, CSS & JavaScript Game Levels & create super cool websites.'}
                        description={'description'}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <h3>
              <FormattedMessage
                defaultMessage={'For Classes 9 & above'}
                description={'For Classes 9 & above title'}
              />
            </h3>
            <div className='card'>
              <div className='card-body'>
                <div>
                  <picture>
                    <img src='../../../../images/landing/coding-pirate.webp' alt='coding pirate' title='Coding Pirate' />
                  </picture>
                  <div className='coding-game-list coding-game-sec-4'>
                    <i className='fa fa-angle-up text-white' aria-hidden="true"></i>
                    <h3 className='text-white'>
                      <FormattedMessage
                        defaultMessage={'Coding Pirate'}
                        description={'title'}
                      />
                    </h3>
                    <p className='text-white'>
                      <FormattedMessage
                        defaultMessage={'Advance in Programming by solving problems in any programming language with an Algorithmic approach.'}
                        description={'description'}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <a href='/pricing' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i></a>

        <div className='boat-route-line-3'></div>
      </div>
    </div>

    <div className='cloud-left-3'></div>
    <div className='cloud-right-3'></div>
  </section>
</>;

const LandingTechVideos = () => <>
  <section>
    <div className='container'>
      <div className='tech-video-sec hackerkid-video-sec max-size top-space'>
        <h2>
          <FormattedMessage
            defaultMessage={'Enriching Tech Videos for You'}
            description={'Tech Videos title'}
          />
        </h2>
        <div className='row'>
          <div className='col-lg-6 col-md-6' id='video-container-python'>
            <div id='python-container' className='position-relative h-100'>
              <picture>
                <img src='../../../../images/landing/python-video.webp' className='w-100' />
              </picture>
              <div className='play-icon'>
                <i className="fa fa-play text-white" aria-hidden="true"></i>
              </div>
              <div className='video-title'>
                <p className='text-white'>
                  <FormattedMessage
                    defaultMessage={'Basics of Python'}
                    description={'video title'} />
                </p></div>
                </div>
          </div>
          <div className='col-lg-6 col-md-6'>
              <div id='video-container-javascript'>
              <div id='javascript-container' className='position-relative'>
                  <picture>
                    <img src='../../../../images/landing/javascript-video.webp' className='w-100' />
                  </picture>
                  <div className='play-icon'>
                    <i className="fa fa-play text-white" aria-hidden="true"></i>
                  </div>
                  <div className='video-title'>
                    <p className='text-white'>
                      <FormattedMessage
                        defaultMessage={'Basics of JavaScript'}
                        description={'video title'} />
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <a href='/pricing' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
        </a>
      </div>

      <div className='boat-route-line-4'></div>
    </div>

    <div className='cloud-left-4'></div>
    <div className='cloud-right-4'></div>
  </section>
</>;

const LandingKidMorFun = () => <>
  <section>
    <div className='container'>
      <div className='more-fun-kid max-size top-space'>
        <h2>
          <FormattedMessage
            defaultMessage={'What makes it more Fun for your kids?'}
            description={'fun kid title'}
          />
        </h2>
        <div className='d-flex more-kids-list'>
          <div className='left-sec'>
            <picture>
              <img src='../../../../images/landing/coins-xps.webp' />
            </picture>
            <p className='right-text-mobile'>
              <FormattedMessage
                defaultMessage={'Coins & XPs'}
                description={'Coins title'}
              />
            </p>
          </div>

          <div className='right-sec'>
            <picture>
              <img src='../../../../images/landing/awards-badges.webp' />
            </picture>
            <p className='left-text-mobile'>
              <FormattedMessage
                defaultMessage={'Awards & Badges'}
                description={'Awards and Badges title'}
              />
            </p>
          </div>

          <div className='left-sec'>
            <picture>
              <img src='../../../../images/landing/leaderboard.webp' />
            </picture>
            <p className='right-text-mobile'>
              <FormattedMessage
                defaultMessage={'Leaderboard'}
                description={'Leaderboard title'}
              />
            </p>
          </div>
        </div>

        <div className='d-flex more-kids-list kids-list'>
          <div className='right-sec'>
            <picture>
              <img src='../../../../images/landing/challenge.webp' />
            </picture>
            <p className='left-text-mobile'>
              <FormattedMessage
                defaultMessage={'Challenges'}
                description={'Challenges title'}
              />
            </p>
          </div>

          <div className='left-sec'>
            <picture>
              <img src='../../../../images/landing/clubs.webp' />
            </picture>
            <p className='right-text-mobile'>
              <FormattedMessage
                defaultMessage={'Clubs'}
                description={'Clubs title'}
              />
            </p>
          </div>
        </div>

        <a href='/pricing' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <div className='cloud-left-5'></div>
    <div className='cloud-left-6'></div>
    <div className='cloud-left-7'></div>
    <div className='cloud-left-8'></div>
    <div className='cloud-right-5'></div>
    <div className='cloud-right-6'></div>
    <div className='cloud-right-7'></div>
  </section>
</>;

const LandingHackerKid = () => <>
  <section>
    <div className='container'>
      <div className='top-space hackerkit2-sec'>
        <h2>
          <FormattedMessage
            defaultMessage={'Why Choose HackerKid 2.0?'}
            description={'HackerKid title'}
          />
        </h2>

        <div className='row hackerkit-desk-sec hack-desk-sec'>
          <div className='col-md-4 col-lg-4'>
            <div className='card'>
              <div className='card-header'>
                <FormattedMessage
                  defaultMessage={'Aligned with'}
                  description={'Aligned with title'}
                />
              </div>
              <div className='card-body'>
                <picture>
                  <img src='../../../../images/landing/uc-computer.webp' alt='uc computer' title='uc computer' />
                </picture>
              </div>
            </div>

            <div className='card'>
              <div className='card-header'>
                <FormattedMessage
                  defaultMessage={'Learners Community'}
                  description={'Learners Community title'}
                />
              </div>
              <div className='card-body'>
                <picture>
                  <img src='../../../../images/landing/lak-users.webp' alt='Learners Community' title='Learners Community' />
                </picture>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-lg-4 mt-4'>
            <div className='card'>
              <div className='card-header'>
                <FormattedMessage
                  defaultMessage={'Recognised by'}
                  description={'Recognised by title'}
                />
              </div>
              <div className='card-body'>
                <picture>
                  <img src='../../../../images/landing/ministry-education.webp' alt='Recognised by' title='Recognised by' />
                </picture>
              </div>
            </div>

            <div className='card'>
              <div className='card-header'>
                <FormattedMessage
                  defaultMessage={'India’s'}
                  description={'India’s title'}
                />
              </div>
              <div className='card-body'>
                <picture>
                  <img src='../../../../images/landing/gamified.webp' alt='india' title='India' />
                </picture>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-lg-4 mt-4 pt-4'>
            <div className='card'>
              <div className='card-header'>
                <FormattedMessage
                  defaultMessage={'Officially Authorised Partner'}
                  description={'Officially Authorised Partner title'}
                />
              </div>
              <div className='card-body'>
                <picture>
                  <img src='../../../../images/landing/google-partner.webp' alt='officially authorised partner' title='Officially Authorised Partner' />
                </picture>
              </div>
            </div>

            <div className='card'>
              <div className='card-header'>
                <FormattedMessage
                  defaultMessage={'Powered by Team'}
                  description={'Powered by Team title'}
                />
              </div>
              <div className='card-body'>
                <picture>
                  <img src='../../../../images/landing/guvi-logo.webp' alt='Powered by Team' title='Powered by Team' />
                </picture>
              </div>
            </div>
          </div>
        </div>

        <div className='hackerkit-desk-sec hack-mobile-sec'>
          <Swiper {...codingGamesProps} >

            <SwiperSlide>
              <div className='card'>
                <div className='card-header'>
                  <FormattedMessage
                    defaultMessage={'Aligned with'}
                    description={'Aligned with title'}
                  />
                </div>
                <div className='card-body'>
                  <picture>
                    <img src='../../../../images/landing/uc-computer.webp' alt='uc computer' title='uc computer' />
                  </picture>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='card'>
                <div className='card-header'>
                  <FormattedMessage
                    defaultMessage={'Recognised by'}
                    description={'Recognised by title'}
                  />
                </div>
                <div className='card-body'>
                  <picture>
                    <img src='../../../../images/landing/ministry-education.webp' alt='Recognised by' title='Recognised by' />
                  </picture>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='card'>
                <div className='card-header'>
                  <FormattedMessage
                    defaultMessage={'Officially Authorised Partner'}
                    description={'Officially Authorised Partner title'}
                  />
                </div>
                <div className='card-body'>
                  <picture>
                    <img src='../../../../images/landing/google-partner.webp' alt='officially authorised partner' title='Officially Authorised Partner' />
                  </picture>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='card'>
                <div className='card-header'>
                  <FormattedMessage
                    defaultMessage={'Learners Community'}
                    description={'Learners Community title'}
                  />
                </div>
                <div className='card-body'>
                  <picture>
                    <img src='../../../../images/landing/lak-users.webp' alt='Learners Community' title='Learners Community' />
                  </picture>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='card'>
                <div className='card-header'>
                  <FormattedMessage
                    defaultMessage={'India’s'}
                    description={'India’s title'}
                  />
                </div>
                <div className='card-body'>
                  <picture>
                    <img src='../../../../images/landing/gamified.webp' alt='india' title='India' />
                  </picture>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='card'>
                <div className='card-header'>
                  <FormattedMessage
                    defaultMessage={'Powered by Team'}
                    description={'Powered by Team title'}
                  />
                </div>
                <div className='card-body'>
                  <picture>
                    <img src='../../../../images/landing/guvi-logo.webp' alt='Powered by Team' title='Powered by Team' />
                  </picture>
                </div>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>

        <a href='/pricing' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <div className='cloud-left-9'></div>
    <div className='cloud-left-10'></div>
    <div className='cloud-right-8'></div>
  </section>
</>;

const LandingHappyLearning = () => <>
  <section>
    <div className='top-space happy-learning'>
      <div className='container-fluid'>
        <h2>
          <FormattedMessage
            defaultMessage={'Happy Learning Starts Here...'}
            description={'Happy Learning Starts Here... title'}
          />
        </h2>
        <Swiper {...codingGamesProps} >

          <SwiperSlide>
            <div className='card'>
              <div className='card-body'>
                <div className='learn-heding'>
                  <div className='d-flex user-detail'>
                    <div className='uesr-img'>
                      <picture>
                        <img src='../../../../images/landing/adaikkammai.svg' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Adaikkammai'}
                          description={'Adaikkammai title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'T.I Matric. Hr. Sec School'}
                          description={'title'}
                        />
                      </p>
                    </div>

                    <picture>
                      <img src='../../../../images/landing/review-icon.webp' alt='review-icon' title='review-icon' />
                    </picture>
                  </div>
                  <p>
                    <FormattedMessage
                      defaultMessage={'“I loved hacker kid very much because it was very easy to learn coding and it was like a game to play and learn coding.”'}
                      description={'happy learning description'}
                    />
                  </p>

                  <picture className='rating-icon'>
                    <img src='../../../../images/landing/start-rating.webp' alt='start rating' title='Start Rating' />
                  </picture>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='card mt-4'>
              <div className='card-body'>
                <div className='learn-heding'>
                  <div className='d-flex user-detail'>
                    <div className='uesr-img'>
                      <picture>
                        <img src='../../../../images/landing/aarish-babbar.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={"Aarish babbar's Mom"}
                          description={'title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Modern Vidya Niketan'}
                          description={'title'}
                        />
                      </p>
                    </div>

                    <picture>
                      <img src='../../../../images/landing/review-icon.webp' alt='review-icon' title='review-icon' />
                    </picture>
                  </div>
                  <p>
                    <FormattedMessage
                      defaultMessage={'“Hi...Hackerkid is one of the best platform to learn python.. My kid learnt python very easily on your platform... He enjoyed each and every question... He always curious about python but I was not able to taught him properly..but now he is doing better in python 🙂”'}
                      description={' description'}
                    />
                  </p>

                  <picture className='rating-icon'>
                    <img src='../../../../images/landing/start-rating.webp' alt='start rating' title='Start Rating' />
                  </picture>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='card'>
              <div className='card-body'>
                <div className='learn-heding'>
                  <div className='d-flex user-detail'>
                    <div className='uesr-img'>
                      <picture>
                        <img src='../../../../images/landing/sriram-aditya.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Sriram Adithya M'}
                          description={'title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={"St. Michael's Academy"}
                          description={'title'}
                        />
                      </p>
                    </div>

                    <picture>
                      <img src='../../../../images/landing/review-icon.webp' alt='review-icon' title='review-icon' />
                    </picture>
                  </div>
                  <p>
                    <FormattedMessage
                      defaultMessage={"“Hackerkid is a fun way for kids to learn to code as well as play. With this pandemic situation and kids unable to go out to play, this is a great opportunity to keep them occupied in a better way. It let's them understand the basic concepts of coding like looping structures, conditions and flow of the program. My son is glued to it!!! And we are happy to tell our family and friends about.”"}
                      description={'happy learning description'}
                    />
                  </p>

                  <picture className='rating-icon'>
                    <img src='../../../../images/landing/start-rating.webp' alt='start rating' title='Start Rating' />
                  </picture>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='card mt-4'>
              <div className='card-body'>
                <div className='learn-heding'>
                  <div className='d-flex user-detail'>
                    <div className='uesr-img'>
                      <picture>
                        <img src='../../../../images/landing/shrey-daga.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={"shrey Daga's Father"}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Seventh day Adventist HSS'}
                          description={'Modern Vidya Ketan title'}
                        />
                      </p>
                    </div>

                    <picture>
                      <img src='../../../../images/landing/review-icon.webp' alt='review-icon' title='review-icon' />
                    </picture>
                  </div>
                  <p>
                    <FormattedMessage
                      defaultMessage={'“My son, Shrey is 12 year old and very enthusiastic kid. He came to know about the Hacker kid portal by his elder brother. He is so happy with the portal that he is always eager to do it. He made some games, programs on the portal and always keen to make improvements in it. One to one session with the mentor is also a good initiative taken by Hacker kid. Interactive demonstration of the code helps him visualise the concept behind the code which makes his concept more robust.”'}
                      description={'happy learning description'}
                    />
                  </p>

                  <picture className='rating-icon'>
                    <img src='../../../../images/landing/start-rating.webp' alt='start rating' title='Start Rating' />
                  </picture>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='card'>
              <div className='card-body'>
                <div className='learn-heding'>
                  <div className='d-flex user-detail'>
                    <div className='uesr-img'>
                      <picture>
                        <img src='../../../../images/landing/harshini.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Harshini'}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Sri Chaitanya Techno School'}
                          description={'Modern Vidya Ketan title'}
                        />
                      </p>
                    </div>

                    <picture>
                      <img src='../../../../images/landing/review-icon.webp' alt='review-icon' title='review-icon' />
                    </picture>
                  </div>
                  <p>
                    <FormattedMessage
                      defaultMessage={"“Hi, I'm Harshini PB. I'm a Hacker KID user. I love Hacker KID very much because it is a best, online, coding website. I recommend Hacker KID to kids who want to learn coding. The mentor session was great and the mentors are very good at me. In Hacker KID, I like zombie land very much.”"}
                      description={'happy learning description'}
                    />
                  </p>

                  <picture className='rating-icon'>
                    <img src='../../../../images/landing/start-rating.webp' alt='start rating' title='Start Rating' />
                  </picture>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='card mt-4'>
              <div className='card-body'>
                <div className='learn-heding'>
                  <div className='d-flex user-detail'>
                    <div className='uesr-img'>
                      <picture>
                        <img src='../../../../images/landing/aithih.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Aithih'}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Indra gandhi public school'}
                          description={'Modern Vidya Ketan title'}
                        />
                      </p>
                    </div>

                    <picture>
                      <img src='../../../../images/landing/review-icon.webp' alt='review-icon' title='review-icon' />
                    </picture>
                  </div>
                  <p>
                    <FormattedMessage
                      defaultMessage={"“Hackerkid was a fun and informative opportunity to learn python. As a beginner I felt it easy to adapt with block coding and mentor session's were helpful.”"}
                      description={'happy learning description'}
                    />
                  </p>

                  <picture className='rating-icon'>
                    <img src='../../../../images/landing/start-rating.webp' alt='start rating' title='Start Rating' />
                  </picture>
                </div>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>

        <a href='/pricing' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i></a>
      </div>
    </div>
  </section>
</>;

const LandingFaq = () => <>
  <section>
    <div className='top-space faq'>
      <div className='container'>
        <div className='max-size'>
          <h2>
            <FormattedMessage
              defaultMessage={'Frequently Asked Questions'}
              description={'faq title'}
            />
          </h2>

          <div className='accordion' id='faq'>
            <div className='card'>
              <div className='card-header' id='faqhead1'>
                <h3 data-toggle='collapse' data-target='#faq1' aria-expanded='true' aria-controls='faq1'>
                  <FormattedMessage
                    defaultMessage={'What is HackerKid and how does it work?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq1' className='collapse show' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'HackerKid is a next-generation platform that helps kids learn coding in a gamified environment through games like Turtle and Zombieland. Kids can compete with each other through challenges and create clubs to scale their learning. They would also get awards and certificates for completing challenges, thus keeping learning competitive and encouraging.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead2'>
                <h3 data-toggle='collapse' data-target='#faq2' aria-expanded='true' aria-controls='faq2'>
                  <FormattedMessage
                    defaultMessage={'Is HackerKid free?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq2' className='collapse' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p>
                    <FormattedMessage
                      defaultMessage={'You can use HackerKid to play, learn and solve a certain amount of problems for free. You can get unlimited access and learning by purchasing a premium subscription valid for 1 year.'}
                      description={'faq description'}
                    />
                  </p>
                  <p className="mb-0">
                    <FormattedMessage
                      defaultMessage={'For this premium subscription, you\'ll get access to Full Game Features Access, Full Video Library, Full Access to Challenges, Gateway to Leaderboard, Additional Awards and Badges, Micro Degree Certificates, and Access to Clubs.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead3'>
                <h3 data-toggle='collapse' data-target='#faq3' aria-expanded='true' aria-controls='faq3'>
                  <FormattedMessage
                    defaultMessage={'Who is HackerKid for?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq3' className='collapse' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p>
                    <span>
                      <FormattedMessage
                        defaultMessage={'HackerKid allows'}
                        description={'faq description'}
                      />
                    </span> <span>
                      <b>
                        <FormattedMessage
                          defaultMessage={'kids from ages 7-17'}
                          description={'faq description'}
                        />
                      </b>
                    </span> <span>
                      <FormattedMessage
                        defaultMessage={' to learn basic to advance coding skills through fun coding games. The games use defined code blocks to teach syntax and programming logic to develop problem-solving skills in them.'}
                        description={'faq description'}
                      />
                    </span>
                  </p>
                  <p className="mb-0">
                    <FormattedMessage
                      defaultMessage={'The games are segregated to suit the age and understanding of the kids. As they advance in age, they can level up to other advanced games like HTML, CSS, Javascript, and Coding Pirate.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead4'>
                <h3 data-toggle='collapse' data-target='#faq4' aria-expanded='true' aria-controls='faq4'>
                  <FormattedMessage
                    defaultMessage={'Can my kid learn coding with HackerKID?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq4' className='collapse' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p>
                    <span>
                      <FormattedMessage
                        defaultMessage={'Currently, we have '}
                        description={'faq description'}
                      />
                    </span> <span>
                      <b>
                        <FormattedMessage
                          defaultMessage={'a vast library of Python and JavaScript coding videos'}
                          description={'faq description'}
                        />
                      </b>
                    </span> <span>
                      <FormattedMessage
                        defaultMessage={'for kids to learn coding in an easy, fun, and comprehensible fashion.'}
                        description={'faq description'}
                      />
                    </span>
                  </p>
                  <p>
                    <FormattedMessage
                      defaultMessage={'After learning from these videos they can practice coding from the IDE inside the platform which helps them to master what they are learning.'}
                      description={'faq description'}
                    />
                  </p>
                  <p className='mb-0'>
                    <span>
                      <FormattedMessage
                        defaultMessage={'The kids will be'}
                        description={'faq description'}
                      />
                    </span> <span>
                      <b>
                        <FormattedMessage
                          defaultMessage={'playing our interactive games'}
                          description={'faq description'}
                        />
                      </b>
                    </span> <span>
                      <FormattedMessage
                        defaultMessage={'to further sharpen their understanding of programming, thus learning to code better with the right guidance.'}
                        description={'faq description'}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead5'>
                <h3 data-toggle='collapse' data-target='#faq5' aria-expanded='true' aria-controls='faq5'>
                  <FormattedMessage
                    defaultMessage={'What’s the use of learning to code for young kids?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq5' className='collapse' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p>
                    <span>
                      <FormattedMessage
                        defaultMessage={'HackerKid’s gamified self-paced coding courses allow kids to develop their'}
                        description={'faq description'}
                      />
                    </span> <span>
                      <b>
                        <FormattedMessage
                          defaultMessage={'thinking, mathematical and analytical skills'}
                          description={'faq description'}
                        />
                      </b>
                    </span> <span>
                      <FormattedMessage
                        defaultMessage={'along with'}
                        description={'faq description'}
                      />
                    </span> <span>
                      <b>
                        <FormattedMessage
                          defaultMessage={'good problem-solving'}
                          description={'faq description'}
                        />
                      </b>
                    </span> <span>
                      <FormattedMessage
                        defaultMessage={'abilities.'}
                        description={'faq description'}
                      />
                    </span>
                  </p>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'The advantages for kids include learning to create websites and build things as they wish. It overall enhances their integration with the tech-oriented world at a young age.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead6'>
                <h3 data-toggle='collapse' data-target='#faq6' aria-expanded='true' aria-controls='faq6'>
                  <FormattedMessage
                    defaultMessage={'How can I track my kid\'s progress in the course?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq6' className='collapse' aria-labelledby='faqhead6' data-parent='#faq'>
                <div className='card-body'>
                  <p>
                    <span>
                      <FormattedMessage
                        defaultMessage={'HackerKid provides a'}
                        description={'faq description'}
                      />
                    </span> <span>
                      <b>
                      <FormattedMessage
                        defaultMessage={'specially dedicated scoreboard'}
                        description={'faq description'}
                      />
                      </b>
                    </span> <span>
                      <FormattedMessage
                        defaultMessage={'that shows the points awarded during the game and the total time spent on the platform. An overall'}
                        description={'faq description'}
                      />
                    </span> <span>
                      <b>
                        <FormattedMessage
                          defaultMessage={'leaderboard'}
                          description={'faq description'}
                        />
                      </b>
                    </span> <span>
                      <FormattedMessage
                        defaultMessage={'evaluates your kid’s performance and progress among other HackerKids.'}
                        description={'faq description'}
                      />
                    </span>
                  </p>
                  <p className='mb-0'>
                    <span>
                      <FormattedMessage
                        defaultMessage={'Parents can keep an eye on the scorecards and leaderboards to ensure their child remains encouraged and consistent through their learning journey. Moreover, we will send you weekly'}
                        description={'faq description'}
                      />
                    </span> <span><b>
                        <FormattedMessage
                          defaultMessage={'personalized newsletters'}
                          description={'faq description'}
                        />
                      </b>
                    </span> <span>
                      <FormattedMessage
                        defaultMessage={'wherein you can track your kid\'s assessment recorded during various activities and skill-based performance.'}
                        description={'faq description'}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead7'>
                <h3 data-toggle='collapse' data-target='#faq7' aria-expanded='true' aria-controls='faq7'>
                  <FormattedMessage
                    defaultMessage={'Will my kid get any certificates or awards for their performance?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq7' className='collapse' aria-labelledby='faqhead7' data-parent='#faq'>
                <div className='card-body'>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'Yes, definitely. At HackerKID, we provide kids with various awards, badges, and certifications when they complete a designated task, challenge, or level exceptionally well. It helps encourage the kids to keep pushing for excellence and maintain consistency in learning.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead8'>
                <h3 data-toggle='collapse' data-target='#faq8' aria-expanded='true' aria-controls='faq8'>
                  <FormattedMessage
                    defaultMessage={'What is a club and how does it work?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq8' className='collapse' aria-labelledby='faqhead8' data-parent='#faq'>
                <div className='card-body'>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'Club is a feature where kids can form a group and interact with one another. This club helps them to assess their learning and builds healthy competition among their friends to have an amazing learning experience.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div className='cloud-left-11'></div>
    <div className='cloud-right-9'></div>
    <div className='cloud-right-10'></div>
  </section>
</>;

const LandingFooter = () => <>
  <footer>
    <div className='container'>
      <div className='max-size'>
        <h3 className='text-white'>
          <FormattedMessage
            defaultMessage={'Have Further Questions?'}
            description={'title'}
          />
        </h3>
        <h2>
          <FormattedMessage
            defaultMessage={'We are here to help!'}
            description={'title'}
          />
        </h2>
        <div className='row'>
          <div className='col-md-6 col-lg-6'>
            <a href='tel:+91 877 8517060' className='bg-white call-mail-btn'><img src='../../../../images/landing/phone-outline.webp' alt='phone' title='phone' /> +91 877 8517060</a>
          </div>
          <div className='col-md-6 col-lg-6'>
            <a href='mailto:reach@hackerkid.org' className='bg-white call-mail-btn'><img src='../../../../images/landing/mail-outline.webp' alt='mail' title='mail' /> reach@hackerkid.org</a>
          </div>
        </div>

        {/* <h3 className='text-white follow-us'>
          <FormattedMessage
            defaultMessage={'Follow us on'}
            description={'title'}
          />
        </h3>
        <div className='social-media'>
          <a href='/'><img src='../../../../images/landing/twitter.webp'
          alt='twitter' title='Twitter'/></a>
          <a href='/'><img src='../../../../images/landing/instagram.webp'
          alt='instagram' title='Instagram' /></a>
          <a href='/'><img src='../../../../images/landing/linkedin.webp'
          alt='linkedin' title='Linkedin' /></a>
          <a href='/'><img src='../../../../images/landing/facebook.webp'
          alt='facebook' title='Facebook' /></a>
        </div> */}

      </div>
    </div>
  </footer>
</>;

const goDefaultImage = (course) => {
  if (course === 'python') {
    $('#video-container-javascript').html(`<div class="after-image" id='javascript-container'>
    <picture>
      <img src='../../../../images/landing/javascript-video.webp' class='w-100' />
    </picture>
    <div class='play-icon'>
      <i class="fa fa-play text-white" aria-hidden="true"></i>
    </div>
    <div class='video-title'>
      <p class='text-white'>
      Basics of JavaScript
      </p>
    </div>
  </div>`);
    $('#hackerkid-video').html(`
    <div class="after-image">
            <picture>
              <img src='../../../../images/landing/hackerkit-img.webp' class='w-100' />
            </picture>
            <div class='play-icon'>
              <i class="fa fa-play text-white" aria-hidden="true"></i>
            </div> </div>`);
  } else if (course === 'javascript') {
    $('#video-container-python').html(`<div class="after-image h-100" id='python-container'>
    <picture>
      <img src='../../../../images/landing/python-video.webp' class='w-100' />
    </picture>
    <div class='play-icon'>
      <i class="fa fa-play text-white" aria-hidden="true"></i>
    </div>
    <div class='video-title'>
      <p class='text-white'>
      Basics of Python
      </p></div>
      </div>`);
    $('#hackerkid-video').html(`
    <div class="after-image">
            <picture>
              <img src='../../../../images/landing/hackerkit-img.webp' class='w-100' />
            </picture>
            <div class='play-icon'>
              <i class="fa fa-play text-white" aria-hidden="true"></i>
            </div></div>`);
  } else if (course === 'hackerkid') {
    $('#video-container-javascript').html(`<div class="after-image" id='javascript-container'>
    <picture>
      <img src='../../../../images/landing/javascript-video.webp' class='w-100' />
    </picture>
    <div class='play-icon'>
      <i class="fa fa-play text-white" aria-hidden="true"></i>
    </div>
    <div class='video-title'>
      <p class='text-white'>
      Basics of JavaScript
      </p>
    </div>
  </div>`);
    $('#video-container-python').html(`<div class="after-image h-100" id='python-container'>
    <picture>
      <img src='../../../../images/landing/python-video.webp' class='w-100' />
    </picture>
    <div class='play-icon'>
      <i class="fa fa-play text-white" aria-hidden="true"></i>
    </div>
    <div class='video-title'>
      <p class='text-white'>
      Basics of Python
      </p></div>
      </div>`);
  }
};

const playTectVideo = (url, course) => {
  $(`#video-container-${course}`).html(
    `<video id="course-video-${course}" controls muted autostart="false"></video>`,
  );
  const video = document.querySelector(`#course-video-${course}`);
  const player = new Plyr(`#course-video-${course}`);
  player.on('ready', () => {
    player.play();
  });
  if (video && video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
  } else {
    const hls = new Hls();
    hls.attachMedia(video);
    hls.loadSource(url);
  }

  goDefaultImage(course);
};

const playYoutubeVideo = () => {
  $('#hackerkid-video').html(`<div class="plyr__video-embed" id="youtube-video">
  <iframe
    src="https://www.youtube.com/embed/RsorCl8BBaM"
    allowfullscreen
    allowtransparency
    allow="autoplay"
  ></iframe>
</div>`);
  goDefaultImage('hackerkid');
};

const render = () => {
  useEffect(() => {
    $('#video-container-python').on('click', '#python-container', () => {
      playTectVideo('https://d11kzy43d5zaui.cloudfront.net/python-hackerkid/1_Getting_started_with_python/index.m3u8', 'python');
    });
    $('#video-container-javascript').on('click', '#javascript-container', () => {
      playTectVideo('https://d11kzy43d5zaui.cloudfront.net/javascript-hackerkid/1_Javascript_Introduction/index.m3u8', 'javascript');
    });
    $('#hackerkid-video').on('click', () => {
      playYoutubeVideo();
    });
  });
};

const Landing = () => {
  pageInit('landing-container', 'Landing');

  render();
  return <>
    <div className='landing-page'>
      <LandingHeader />
      <LandingSidebarModal />
      <LandingBanner />
      <LandingVideo/>
      <LandingCodingGames />
      <LandingTechVideos/>
      <LandingKidMorFun />
      <LandingHackerKid />
      <LandingHappyLearning />
      <LandingFaq />
      <LandingFooter />
    </div>
  </>;
};

export default Landing;
