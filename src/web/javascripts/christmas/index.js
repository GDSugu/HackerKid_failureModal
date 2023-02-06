import $ from 'jquery';
import 'bootstrap';
import '../../stylesheets/common/sass/importers/_bootstrap.scss';
import '../../stylesheets/common/sass/importers/_fontawesome.scss';
import post, {
  validate,
  authorize,
  showSnow,
} from '../common/framework';
import initialize from '../register/registerFunctions';

const attachSubmitListener = () => {
  $(document).on('click', '#submitQuestion', () => {
    try {
      const validated = true;
      const userName = validate('#userName', 'name');
      const userSchool = validate('#userSchool', 'school_name');
      const userQuestion = validate('#userQuestion', 'question');
      const userAge = validate('#userAge', 'select');
      const userMedia = $('#userMedia').val();
      const request = {
        type: 'logData2',
        userName,
        userSchool,
        userQuestion,
        userAge: Number(userAge),
        parentLink: userMedia,
        url: window.location.href,
      };
      if (userName && userSchool) {
        $('#loader').show();
        post(request, 'campaign/', true, false).then(() => {
        }).then(() => {
          if (userName
            && userSchool
            && userQuestion
            && userAge
            && validated) {
            return true;
          }
          return false;
        }).then((showRegister) => {
          $('#loader').hide();
          if (showRegister) {
            authorize.setSession('dashboard:santaModal', 'true');
            $('#registerModal').modal({
              backdrop: 'static',
              keyboard: false,
            });
          }
        })
          .catch((error) => {
            $('#loader').hide();
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

$(() => {
  initialize();
  attachSubmitListener();
  showSnow();
});
