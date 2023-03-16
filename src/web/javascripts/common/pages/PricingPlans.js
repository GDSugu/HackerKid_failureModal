import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import RazorpayScript from '../../../partials/razorpay-script-header';
import '../../../stylesheets/common/pages/pricing-plans/style.scss';
import {
  $,
  pageInit, pathNavigator,
} from '../framework';
import initSubscriptionPayment from '../../../../hooks/common/payment';
import { SubscriptionContext, AuthContext } from '../../../../hooks/pages/root';
import usePricing from '../../../../hooks/pages/pricing';

const initPayment = () => {
  $('#loader').show();
  initSubscriptionPayment({ subscriptionType: 'premium' }).then((res) => {
    $('#loader').hide();
    const orderRes = JSON.parse(res);
    if (orderRes.status === 'success') {
      const order = orderRes.orderDetails;
      // console.log(order);
      const options = {
        key: order.razorKeyId,
        amount: order.amount,
        currency: order.currency,
        name: order.name,
        notes: order.notes,
        order_id: order.id,
        prefill: {
          name: order.name,
          email: order.email,
          contact: order.phone,
        },
        handler(paymentResponse) {
          if (paymentResponse.razorpay_payment_id) {
            pathNavigator(
              'dashboard?payment=success',
            );
          }
        },
      };
      // console.log(options);
      const razorPayObj = new window.Razorpay(options);
      razorPayObj.open();
    } else if (orderRes.status === 'error' && orderRes.message === 'Access Denied') {
      window.sessionStorage.setItem('navigateTo', window.location.href);
      pathNavigator('register');
    }
  });
};

const PriceCards = ({ planType = 'free', data, isLoggedIn = false }) => <>
  <div className="price-card-container">
    <div className='row row-revise'>
      <div className='col-lg-6 col-md-6 col-xs-12 mb-3 mb-md-0'>
        <div className='card yellow-card'>
          <div className='card-body'>

            <h3 className="premium">
              <FormattedMessage
                defaultMessage={'HackerKID Premium'}
                description={'Pricing Plans card title'}
              />
            </h3>
            <p>
              <FormattedMessage
                defaultMessage={'HackerKID Premium gives you full access to the platform features for a 1 year subscription. With exciting coding games, problems, gamified environments you have a lot to explore, play and learn.'}
                description={'Pricing Plans card discription'}
              />
            </p>
            <h2>
              {data.premium && <FormattedMessage
                defaultMessage={'₹{price}'}
                description={'HackerKID Trial Premium Free'}
                values={{ price: data.premium.priceDetails.INR.price }}
              />}

              <s>
                <FormattedMessage
                  defaultMessage={'₹5000'}
                  description={'₹5000 Free'}
                />
              </s>
            </h2>
            <p className='light-icon excluding-gst'>
              <FormattedMessage
                defaultMessage={'(*Excluding GST)'}
                description={'Excluding GST'}
              />
            </p>

            {planType === 'free' ? <button className='btn btn-primary text-white w-100'
            onClick={initPayment}>
              <FormattedMessage
                defaultMessage={'Buy Now'}
                description={'Buy Now btn'}
              />
            </button> : <button className='btn btn-light w-100 free-plan-pointer'>
              <FormattedMessage
                defaultMessage='Your Current Plan'
                description='Your Current Plan btn'
              />
            </button>}
            <hr></hr>
            <div className='plan-list yellow-light-bg'>
              <h4>
                <FormattedMessage
                  defaultMessage={'Premium Edition Features'}
                  description={'Premium Edition Features'}
                />
              </h4>
              <ul className='pl-0'>
                <li><i className='fa fa-check-circle premium' aria-hidden="true"></i> Full Game Features Access</li>
                <li><i className='fa fa-check-circle premium' aria-hidden="true"></i> Full Video Library</li>
                <li><i className='fa fa-check-circle premium' aria-hidden="true"></i> Full Access to Challenges</li>
                <li><i className='fa fa-check-circle premium' aria-hidden="true"></i> Gateway to Leaderboard</li>
                <li><i className='fa fa-check-circle premium' aria-hidden="true"></i> Additional Awards and Badges</li>
                <li><i className='fa fa-check-circle premium' aria-hidden="true"></i> Micro Degree Certificates</li>
                <li><i className='fa fa-check-circle premium' aria-hidden="true"></i> Access to Clubs</li>
              </ul>
            </div>
          </div>

          <h6 className='most-popular text-white'>
            <FormattedMessage
              defaultMessage={'Most Popular'}
              description={'Most Popular'}
            />
          </h6>
        </div>
      </div>
      <div className='col-lg-6 col-md-6 col-xs-12'>
        <div className='card'>
          <div className='card-body'>

            <h3 className="edition">
              <FormattedMessage
                defaultMessage={'HackerKID Trial Edition'}
                description={'Pricing Plans card title'}
              />
            </h3>
            <p>
              <FormattedMessage
                defaultMessage={'HackerKID provided the chance for you to explore the world of coding with HackerKID in a gamified environment for a 7 day trial period. Your current trial edition allows you explore the limited version of HackerKID.'}
                description={'Pricing Plans card discription'}
              />
            </p>
            <h2>
              <FormattedMessage
                defaultMessage={'FREE'}
                description={'HackerKID Trial Edition Free'}
              />
            </h2>

            <span></span>

            {(isLoggedIn && planType === 'free') ? <button className='btn btn-light w-100 free-plan-pointer'>
              <FormattedMessage
                defaultMessage='Your Current Plan'
                description='Your Current Plan btn'
              />
            </button> : <span></span>}
            <hr></hr>
            <div className='plan-list blue-light-bg'>
              <h4>
                <FormattedMessage
                  defaultMessage={'Trial Edition Features'}
                  description={'Trial Edition Features'}
                />
              </h4>
              <ul className='pl-0'>
                <li><i className='fa fa-check-circle edition' aria-hidden="true"></i> Limited Games</li>
                <li><i className='fa fa-check-circle edition' aria-hidden="true"></i> Limited Video Library</li>
                <li><i className='fa fa-check-circle edition' aria-hidden="true"></i> Restricted Premium Features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</>;

const PlansFeatures = ({ planType = 'free', data, isLoggedIn = false }) => <>
  <div className="price-plans-features">
    <h2>
      <FormattedMessage
        defaultMessage={'Plans & Features'}
        description={'Plans & Features title'}
      />
    </h2>
    <div className='price-plan-table bg-white'>
      <table className='w-100'>
        <thead className='bg-white'>
          <tr>
            <td>
              <h4>
                <FormattedMessage
                  defaultMessage={'Features'}
                  description={'Features title'}
                />
              </h4>
            </td>
            <td>
              <h4 className='edition'>
                <FormattedMessage
                  defaultMessage={'HackerKID Trial Edition'}
                  description={'HackerKID Trial Edition title'}
                />
              </h4>
              <h2>
                <FormattedMessage
                  defaultMessage={'FREE'}
                  description={'FREE price'}
                />
              </h2>
              {(isLoggedIn && planType === 'free') ? <button className='btn btn-light w-100 free-plan-pointer'>
              <FormattedMessage
                defaultMessage='Your Current Plan'
                description='Your Current Plan btn'
              />
            </button> : <div className='free-plan-space'></div>}
            </td>

            <td>
              <h4 className='premium'>
                <FormattedMessage
                  defaultMessage={'HackerKID Premium'}
                  description={'HackerKID Trial Edition title'}
                />
              </h4>
              <h2>
               { data.premium && <FormattedMessage
                  defaultMessage={'₹{price}'}
                  description={'price for premium plan'}
                  values={{ price: data.premium.priceDetails.INR.price }}
                />}

                <s>
                  <FormattedMessage
                    defaultMessage={'₹5000'}
                    description={'₹5000 Free'}
                  />
                </s>
              </h2>
              {planType === 'free' ? <button className='btn btn-primary text-white w-100'
            onClick={initPayment}>
              <FormattedMessage
                defaultMessage={'Buy Now'}
                description={'Buy Now btn'}
              />
            </button> : <button className='btn btn-light free-plan-pointer w-100 free-plan-pointer'>
              <FormattedMessage
                defaultMessage='Your Current Plan'
                description='Your Current Plan btn'
              />
            </button>}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><h6>
              <FormattedMessage
                defaultMessage={'Games'}
                description={'Games title'}
              /></h6></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Turtle'}
              description={'Turtle list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (10 Problems)'}
              description={'Limited (10 Problems) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Zombieland'}
              description={'Zombieland list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (3 Problems)'}
              description={'Limited (3 Problems) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Webkata HTML'}
              description={'Webkata HTML list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (5 Problems)'}
              description={'Limited (5 Problems) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Webkata CSS'}
              description={'Webkata CSS list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (5 Problems)'}
              description={'Limited (10 Problems) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Webkata JS'}
              description={'Turtle list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (5 Problems)'}
              description={'Limited (5 Problems) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Coding Pirate'}
              description={'Coding Pirate list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (5 Problems)'}
              description={'Limited (10 Problems) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Game Progress'}
              description={'Game Progress list'}
            /></p></td>
            <td><i className='fa fa-check-circle edition' aria-hidden="true"></i></td>
            <td><i className='fa fa-check-circle premium' aria-hidden="true"></i></td>
          </tr>

          <tr>
            <td><h6>
              <FormattedMessage
                defaultMessage={'Videos'}
                description={'Games title'}
              /></h6></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Python Video Library'}
              description={'Python Video Library'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (3 Videos)'}
              description={'Limited (3 Videos) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'JavaScript Video Library'}
              description={'JavaScript Video Library list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (3 Videos)'}
              description={'Limited (3 Problems) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Web Development Video Library'}
              description={'Web Development Video Library list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (5 Videos)'}
              description={'Limited (5 Problems) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><h6>
              <FormattedMessage
                defaultMessage={'Challenges'}
                description={'Games title'}
              /></h6></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Challenges Creation'}
              description={'Challenges Creation'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (3 Publish)'}
              description={'Limited (3 Published) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><p><FormattedMessage
              defaultMessage={'Challenges Attempting'}
              description={'Challenges Attempting'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited (3 Problems)'}
              description={'Limited (3 Solved) list'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>

          <tr>
            <td><h6>
              <FormattedMessage
                defaultMessage={'Clubs'}
                description={'Clubs title'}
              /></h6></td>
            <td><i className='fa fa-minus-circle light-icon' aria-hidden="true"></i></td>
            <td><i className='fa fa-check-circle premium' aria-hidden="true"></i></td>
          </tr>

          <tr>
            <td><h6><FormattedMessage
              defaultMessage={'Awards & Badges'}
              description={'Awards & Badges'}
            /></h6></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited '}
              description={'Limited'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>
          <tr>
            <td><h6><FormattedMessage
              defaultMessage={'IDE'}
              description={'IDE'}
            /></h6></td>
            <td><p><FormattedMessage
              defaultMessage={'Limited(Python & JS)'}
              description={'Limited(Python & JS)'}
            /></p></td>
            <td><p><FormattedMessage
              defaultMessage={'Unlimited'}
              description={'Unlimited list'}
            /></p></td>
          </tr>
          <tr>
            <td><h6>
              <FormattedMessage
                defaultMessage={'Profile Edit'}
                description={'Profile Edit'}
              /></h6></td>
            <td><i className='fa fa-check-circle edition' aria-hidden="true"></i></td>
            <td><i className='fa fa-check-circle premium' aria-hidden="true"></i></td>
          </tr>
          <tr>
            <td><h6>
              <FormattedMessage
                defaultMessage={'Help'}
                description={'Help'}
              /></h6></td>
            <td><i className='fa fa-check-circle edition' aria-hidden="true"></i></td>
            <td><i className='fa fa-check-circle premium' aria-hidden="true"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div className='plans-features-mobile'>
    <h2>
      <FormattedMessage
        defaultMessage={'Plans & Features'}
        description={'Plans & Features title'}
      />
    </h2>
    <div className='d-flex plan-feature-heading bg-white'>
      <div>
        <h4 className='edition'>
          <FormattedMessage
            defaultMessage={'Starter Plan'}
            description={'Starter Plan title'}
          />
        </h4>
        <h2>
          <FormattedMessage
            defaultMessage={'FREE'}
            description={'FREE price'}
          />
        </h2>
        {(isLoggedIn && planType === 'free') ? <p className='edition'>
          <FormattedMessage
            defaultMessage='Your Current Plan'
            description='Your Current Plan btn'
          />
        </p> : <div></div>}
      </div>
      <div>
        <h4 className='premium'>
          <FormattedMessage
            defaultMessage={'Premium Plan'}
            description={'Premium Plan title'}
          />
        </h4>
        <h2>
        {data.premium && <FormattedMessage
                  defaultMessage={'₹{price}'}
                  description={'price for premium plan'}
                  values={{ price: data.premium.priceDetails.INR.price }}
                />}
        </h2>
        {planType === 'free' ? <button className='btn btn-primary text-white w-100'
        onClick={initPayment}>
          <FormattedMessage
            defaultMessage='Buy Now'
            description='Buy Now btn'
          />
        </button> : <p className='premium'>
          <FormattedMessage
            defaultMessage='Your Current Plan'
            description='Your Current Plan btn'
          /></p>}
      </div>
    </div>
    <div className='plan-mobile-view'>
      <h3 className='ml-3 mr-3'>
        <FormattedMessage
          defaultMessage={'Features'}
          description={'Features title'}
        />
      </h3>

      <div>
        <h4 className='ml-3 mr-3'>
          <FormattedMessage
            defaultMessage={'Games'}
            description={'Games title'}
          />
        </h4>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Turtle'}
              description={'Turtle title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (10 Problems)'}
                description={'Limited (10 Problems) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Zombieland'}
              description={'Zombieland title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (3 Problems)'}
                description={'Limited (10 Problems) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Webkata HTML'}
              description={'Webkata HTML title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (5 Problems)'}
                description={'Limited (5 Problems) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Webkata CSS'}
              description={'Webkata CSS title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (5 Problems)'}
                description={'Limited (5 Problems) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Webkata JS'}
              description={'Webkata JS title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (5 Problems)'}
                description={'Limited (5 Problems) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Coding Pirate'}
              description={'Coding Pirate title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (5 Problems)'}
                description={'Limited (5 Problems) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Game Progress'}
              description={'Game Progress title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <i className='fa fa-check-circle edition' aria-hidden="true"></i>
            </li>

            <li>
              <i className='fa fa-check-circle premium' aria-hidden="true"></i>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className='ml-3 mr-3'>
          <FormattedMessage
            defaultMessage={'Videos'}
            description={'Videos title'}
          />
        </h4>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Python Video Library'}
              description={'Turtle title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (3 Videos)'}
                description={'Limited (3 Videos) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'JavaScript Video Library'}
              description={'JavaScript Video Library title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (5 Videos)'}
                description={'Limited (10 Problems) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Web Development Video Library'}
              description={'Web Development Video Library title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (5 Problems)'}
                description={'Limited (5 Problems) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className='ml-3 mr-3'>
          <FormattedMessage
            defaultMessage={'Challenges'}
            description={'Challenges title'}
          />
        </h4>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Challenges Creation'}
              description={'Challenges Creation title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (3 Published)'}
                description={'Limited (3 Videos) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>

        <div className='problm-list'>
          <p className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Challenges Attempting'}
              description={'Challenges Attempting title'}
            />
          </p>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (5 Solved)'}
                description={'Limited (5 Solved) title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>
      </div>

      <div>

        <div className='problm-list'>
          <h4 className='ml-3 mr-3'>
            <FormattedMessage
              defaultMessage={'Clubs'}
              description={'Clubs title'}
            />
          </h4>
          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <i className='fa fa-minus-circle light-icon' aria-hidden="true"></i>
            </li>

            <li>
              <i className='fa fa-check-circle premium' aria-hidden="true"></i>
            </li>
          </ul>
        </div>

      </div>

      <div>
        <h4 className='ml-3 mr-3'>
          <FormattedMessage
            defaultMessage={'Awards & Badges'}
            description={'Awards & Badges title'}
          />
        </h4>

        <div className='problm-list'>

          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited'}
                description={'Limited title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className='ml-3 mr-3'>
          <FormattedMessage
            defaultMessage={'IDE'}
            description={'IDE title'}
          />
        </h4>

        <div className='problm-list'>

          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <FormattedMessage
                defaultMessage={'Limited (Python)'}
                description={'Limited title'}
              />
            </li>

            <li>
              <FormattedMessage
                defaultMessage={'Unlimited'}
                description={'Unlimited title'}
              />
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className='ml-3 mr-3'>
          <FormattedMessage
            defaultMessage={'Profile Edit'}
            description={'Profile Edit title'}
          />
        </h4>

        <div className='problm-list'>

          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <i className='fa fa-check-circle edition' aria-hidden="true"></i>
            </li>

            <li>
              <i className='fa fa-check-circle premium' aria-hidden="true"></i>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h4 className='ml-3 mr-3'>
          <FormattedMessage
            defaultMessage={'Help'}
            description={'Help title'}
          />
        </h4>

        <div className='problm-list'>

          <ul className='pl-3 pr-3 bg-white'>
            <li>
              <i className='fa fa-check-circle edition' aria-hidden="true"></i>
            </li>

            <li>
              <i className='fa fa-check-circle premium' aria-hidden="true"></i>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</>;

const ExclusiveCourses = () => <>
  <div className="price-course-container">
    <h3>
      <FormattedMessage
        defaultMessage={'HackerKID Exclusive Courses'}
        description={'HackerKID Exclusive Courses title'}
      />
    </h3>
    <div className='row row-revise'>
      <div className='col-lg-2 col-md-2 col-xs-12'>
        <picture>
          <img src='../../../../../images/pricing/hackerkid-exclusive-courses.webp' className='share-icon' alt='list-icon' />
        </picture>
      </div>

      <div className='col-lg-10 col-md-10 col-xs-12'>
        <p>
          <FormattedMessage
            defaultMessage={'HackerKID also offer exclusive courses on various pedagogies like Web Development, App Development, Game Development & Data Science. We have an elite team of teachers to guide with your learning process. We have team that can answer all your queries before you decide to enroll with us. Go on tell your parent right now, What are you waiting for?'}
            description={'HackerKID Exclusive Courses description'}
          />
        </p>
        <a href='https://static.hackerkid.org/hackerkid/hackerkid_brochure.pdf' download className='explore-now-btn'>
          <FormattedMessage defaultMessage={'Explore Now'} description='Explore Now text' />
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
      </div>

    </div>
  </div>
</>;

const PricingPlans = () => {
  if (window.location.href.includes('pricing')) {
    pageInit('price-container', 'Pricing');
  }
  const { subscriptionData } = React.useContext(SubscriptionContext);
  const authContext = React.useContext(AuthContext);
  const isPageMounted = React.useRef(true);
  const { pricingDetails } = usePricing({ isPageMounted });
  const { subscriptionDetails } = pricingDetails;
  const planDetails = {};
  if (subscriptionDetails) {
    planDetails.premium = subscriptionDetails.find((item) => item.planType === 'premium');
  }
  useEffect(() => {
    RazorpayScript();

    const urlParams = new URLSearchParams(window.location.search);
    const src = urlParams.get('src');
    if (src && src === 'backtrack') {
      initPayment();
      window.history.replaceState({}, '', '/pricing');
    }
  }, []);
  return <>
    <div className='price-plan-section'>
      <div className='container'>
        <div className='pricing-plan-title-dcrp'>
          <h1>
            <FormattedMessage
              defaultMessage={'Pricing Plans'}
              description={'Pricing Plans title'}
            />
          </h1>
          <p>
            <FormattedMessage
              defaultMessage={'Check out our pricing plans and choose the one that suits you the best.'}
              description={'Pricing Plans description'}
            />
          </p>
        </div>
        <PriceCards
        planType = {subscriptionData.planType}
        data = {planDetails}
        isLoggedIn={authContext.authState.isLoggedIn}/>
        <PlansFeatures
        planType = {subscriptionData.planType}
        data = {planDetails}
        isLoggedIn={authContext.authState.isLoggedIn}/>
        <ExclusiveCourses />
      </div>
    </div>
    <div id="loader"></div>
    {/* <RazorpayScript/> */}
  </>;
};

export default PricingPlans;
