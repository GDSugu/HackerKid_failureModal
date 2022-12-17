import $ from 'jquery';

const navbar = {};

navbar.addSignInButton = () => {
  $('.nav-trail').html('<div><a href="/login.html" class="btn bg-primary-gradient primary-text rounded-pill float-none">Sign in</a></div>');
};

navbar.addDropdown = () => {
  const points = (localStorage.getItem('pointsEarned') == null) ? '0' : localStorage.getItem('pointsEarned');
  const data = `<div class="d-flex no-wrap points-wrap align-self-center pr-4">
  <span>${points}</span>
</div>
<div class="d-flex no-wrap profile-wrap dropdown">
  <a class="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">
      ${localStorage.getItem('name')}
  </a>
  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a class="dropdown-item" href="/profile.html">Profile</a>
      <a class="dropdown-item" href="/change-password.html">Change Password</a>
      <a id="logout" class="dropdown-item" href="#">Logout</a>
  </div>
</div>`;
  $('.nav-trail').html(data);
};

export default navbar;
