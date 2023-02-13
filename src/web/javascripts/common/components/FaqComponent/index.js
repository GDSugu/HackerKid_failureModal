import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../../../stylesheets/common/sass/components/_faq-component.scss';

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
  </section>
</>;

export default LandingFaq;
