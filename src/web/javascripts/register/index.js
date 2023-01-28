import $ from 'jquery';
import 'bootstrap';

import {
  authorize,
  pathNavigator,
} from '../common/framework';
import initialize from './registerFunctions';

$(() => {
  authorize.loginCheck().then((loggedIn) => {
    if (loggedIn) {
      pathNavigator('dashboard.html');
    }
  });
  initialize();
});
