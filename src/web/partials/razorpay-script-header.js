import { loadScriptByURL } from '../javascripts/common/framework';

const Razorpay = () => loadScriptByURL('razorpay-script', 'https://checkout.razorpay.com/v1/checkout.js');

export default Razorpay;
