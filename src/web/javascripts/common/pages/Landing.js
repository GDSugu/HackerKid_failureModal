import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../stylesheets/common/pages/landing/style.scss';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import { Autoplay, Pagination } from 'swiper';
import {
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
        <a href='/' className='menu-icon text-white'><i className='fa fa-bars' aria-hidden="true"></i>
        </a>
        <a href='/' className='logo mr-auto'><img src='../../../../images/landing/hackerkid-logo.webp' alt='hackerkid logo' title='Hackerkid Logo' /></a>
        <div className='d-flex unlimite-login-sign'>
          <a href='/' className='btn unlimited-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
          </a>
          <div className='log-sign-btn'>
            <a href='/' className='btn login-btn'>Login</a>
            <a href='/' className='btn signup-btn'>Sign Up</a>
          </div>
        </div>

      </div>
    </div>

    <div id='mobile-sidebar' className='mobile-sidebar-left'>
      <div className='mobile-side-btns bg-white'>
        <div className='mobile-menu-header'>
          <a href='/' className='logo mr-auto'><img src='../../../../images/landing/black-hackerkit-logo.webp' alt='hackerkid logo' title='Hackerkid Logo' /></a>
          <a href='/' className='mobile-close-btn'><i className="fa fa-window-close" aria-hidden="true"></i></a>
        </div>
        <div className='butts'>
          <a href='/' className='btn unlimited-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
          </a>
          <div className='log-sign-btn'>
          <a href='/' className='btn signup-btn mt-3'>Sign Up</a>
            <a href='/' className='btn login-btn mt-3'>Login</a>
          </div>
        </div>
      </div>
    </div>
  </header>
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

          <a href='/' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
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
  <section>
    <div className='container'>
      <div className='hackerkid-video-sec max-size top-space'>
        <a href='/'>
          <picture>
            <img src='../../../../images/landing/hackerkit-img.webp' className='w-100' />
          </picture>
          <div className='play-icon'>
            <i className="fa fa-play text-white" aria-hidden="true"></i>
          </div>
        </a>
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

        <a href='/' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i></a>

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
          <div className='col-lg-8 col-md-8'>
            <a href='/'>
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
            </a>
          </div>
          <div className='col-lg-4 col-md-4'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 mb-3'>
                <a href='/'>
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
                </a>
              </div>
              <div className='col-lg-12 col-md-12'>
                <a href='/'>
                  <picture>
                    <img src='../../../../images/landing/web-development.webp' className='w-100' />
                  </picture>
                  <div className='play-icon'>
                    <i className="fa fa-play text-white" aria-hidden="true"></i>
                  </div>
                  <div className='video-title'>
                    <p className='text-white'>
                      <FormattedMessage
                        defaultMessage={'Introduction to Web Development'}
                        description={'video title'} />
                    </p>
                  </div>

                </a>
              </div>
            </div>
          </div>
        </div>

        <a href='/' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
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

        <a href='/' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
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

        <a href='/' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i>
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
                        <img src='../../../../images/landing/review-kit.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Agash Raj'}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Modern Vidya Ketan'}
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
                      defaultMessage={'“With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems. With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.”'}
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
                        <img src='../../../../images/landing/review-kit.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Agash Raj'}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Modern Vidya Ketan'}
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
                      defaultMessage={'“With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems. With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.”'}
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
                        <img src='../../../../images/landing/review-kit.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Agash Raj'}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Modern Vidya Ketan'}
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
                      defaultMessage={'“With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems. With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.”'}
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
                        <img src='../../../../images/landing/review-kit.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Agash Raj'}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Modern Vidya Ketan'}
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
                      defaultMessage={'“With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems. With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.”'}
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
                        <img src='../../../../images/landing/review-kit.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Agash Raj'}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Modern Vidya Ketan'}
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
                      defaultMessage={'“With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems. With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.”'}
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
                        <img src='../../../../images/landing/review-kit.webp' alt='happy learning' title='Happy Learning' />
                      </picture>
                    </div>
                    <div className='mr-auto'>
                      <h3>
                        <FormattedMessage
                          defaultMessage={'Agash Raj'}
                          description={'Happy Learning Starts Here... title'}
                        />
                      </h3>
                      <p>
                        <FormattedMessage
                          defaultMessage={'Modern Vidya Ketan'}
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
                      defaultMessage={'“With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems. With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.With Turtle learn Blocking coding in Python With Zombieland learn syntax based code to solve game problems.”'}
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

        <a href='/' className='green-btn text-white'>Get Unlimited Access <i className='fa fa-chevron-right' aria-hidden="true"></i></a>
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
                    defaultMessage={'1. How does the HackerKid program Works?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq1' className='collapse show' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'HackerKid helps kids from 5-12 years age to learn coding and help them become the next Mark Zuckerbery or Bill Gates.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead1'>
                <h3 data-toggle='collapse' data-target='#faq2' aria-expanded='true' aria-controls='faq2'>
                  <FormattedMessage
                    defaultMessage={'2. How does the HackerKid program Works?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq2' className='collapse' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'HackerKid helps kids from 5-12 years age to learn coding and help them become the next Mark Zuckerbery or Bill Gates.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead1'>
                <h3 data-toggle='collapse' data-target='#faq2' aria-expanded='true' aria-controls='faq2'>
                  <FormattedMessage
                    defaultMessage={'2. How does the HackerKid program Works?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq2' className='collapse' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'HackerKid helps kids from 5-12 years age to learn coding and help them become the next Mark Zuckerbery or Bill Gates.'}
                      description={'faq description'}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className='card'>
              <div className='card-header' id='faqhead1'>
                <h3 data-toggle='collapse' data-target='#faq2' aria-expanded='true' aria-controls='faq2'>
                  <FormattedMessage
                    defaultMessage={'2. How does the HackerKid program Works?'}
                    description={'faq title'}
                  />
                </h3>
              </div>

              <div id='faq2' className='collapse' aria-labelledby='faqhead1' data-parent='#faq'>
                <div className='card-body'>
                  <p className='mb-0'>
                    <FormattedMessage
                      defaultMessage={'HackerKid helps kids from 5-12 years age to learn coding and help them become the next Mark Zuckerbery or Bill Gates.'}
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

        <h3 className='text-white follow-us'>
          <FormattedMessage
            defaultMessage={'Follow us on'}
            description={'title'}
          />
        </h3>
        <div className='social-media'>
          <a href='/'><img src='../../../../images/landing/twitter.webp' alt='twitter' title='Twitter' /></a>
          <a href='/'><img src='../../../../images/landing/instagram.webp' alt='instagram' title='Instagram' /></a>
          <a href='/'><img src='../../../../images/landing/linkedin.webp' alt='linkedin' title='Linkedin' /></a>
          <a href='/'><img src='../../../../images/landing/facebook.webp' alt='facebook' title='Facebook' /></a>
        </div>

      </div>
    </div>
  </footer>
</>;

const Landing = () => {
  if (window.location.href.includes('landing')) {
    pageInit('landing-container', 'Landing');
  }

  return <>
    <div className='landing-page'>
      <LandingHeader />
      <LandingBanner />
      <LandingVideo />
      <LandingCodingGames />
      <LandingTechVideos />
      <LandingKidMorFun />
      <LandingHackerKid />
      <LandingHappyLearning />
      <LandingFaq />
      <LandingFooter />
    </div>
  </>;
};

export default Landing;
