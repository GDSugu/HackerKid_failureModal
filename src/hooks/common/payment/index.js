import post from '../framework';

const initSubscriptionPayment = ({ subscriptionType }) => post({ type: 'initSubscriptionPayment', subscriptionType }, 'payment/');

export default initSubscriptionPayment;
