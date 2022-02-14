import $ from 'jquery';
import 'bootstrap';
import '../../stylesheets/common/sass/importers/_bootstrap.scss';
import '../../stylesheets/common/sass/importers/_fontawesome.scss';
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
