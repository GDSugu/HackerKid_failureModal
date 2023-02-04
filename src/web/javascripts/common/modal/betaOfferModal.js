import $ from 'jquery';

const betaOfferModal = () => {
  const modalString = `<div class="modal fade" id="betaOfferModal" tabindex="-1" role="dialog" aria-labelledby="Beta Offer" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered mx-auto" role="document">
      <div class="modal-content">
          <div class="modal-body primary-bg p-0">
              <div class="body-container text-center">
              <div class="d-flex d-md-block justify-content-end float-md-right">
                <button type="button" class="close primary-text p-md-4 p-2" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>

                  <div class="col-md-9 mx-auto py-md-4 px-md-5 px-0">
                      <div class="crown-img">
                          <img src="images/beta-offer/crown.svg" alt="Crown">
                      </div>
                      <div class="mt-3 mb-2">
                          <p class="font-weight-bold mb-0">Available only for beta users!</p>
                      </div>
                      <div>
                          <h3 class="font-weight-bold mb-0">Special Offer just for  &nbsp;<span class="text-decoration-line-through">₹15,000</span>&nbsp; ₹5,000</h3>
                      </div>
                      <div class="d-none d-md-block mt-5">
                          <p>Premium features available in this pack</p>
                      </div>
                      <div class="features mt-3 mb-md-3">
                          <div class="row no-gutters">
                              <div class="feature-block col-6 col-lg-3">
                                <div class="text-center d-inline-block">
                                  <div>
                                      <img src="images/beta-offer/turtle.png" alt="Turtle">
                                  </div>
                                  <div class="mt-2">
                                      <p>Turtle</p>
                                  </div>
                                </div>
                              </div>
                              <div class="feature-block col-6 col-lg-3">
                                <div class="text-center d-inline-block">
                                  <div>
                                      <img src="images/beta-offer/zombie.svg" alt="Zombieland">
                                  </div>
                                  <div class="mt-2">
                                      <p>Zombieland</p>
                                  </div>
                                </div>
                              </div>
                              <div class="feature-block col-6 col-lg-3">
                                <div class="text-center d-inline-block">
                                  <div>
                                      <img src="images/beta-offer/webkata_html.svg" alt="Webkata HTML">
                                  </div>
                                  <div class="mt-2">
                                      <p>Webkata HTML</p>
                                  </div>
                                </div>
                              </div>
                              <div class="feature-block col-6 col-lg-3">
                                <div class="text-center d-inline-block">
                                  <div>
                                      <img src="images/beta-offer/webkata_css.svg" alt="Webkata CSS">
                                  </div>
                                  <div class="mt-2">
                                      <p>Webkata CSS</p>
                                  </div>
                                </div>
                              </div>
                              <div class="feature-block col-6 col-lg-3">
                                <div class="text-center d-inline-block">
                                  <div>
                                      <img src="images/beta-offer/webkata_js.svg" alt="Webkata JS">
                                  </div>
                                  <div class="mt-2">
                                      <p>Webkata JS</p>
                                  </div>
                                </div>
                              </div>
                              <div class="feature-block col-6 col-lg-3">
                                <div class="text-center d-inline-block">
                                  <div>
                                      <img src="images/beta-offer/leaderboard.svg" alt="Leaderboard">
                                  </div>
                                  <div class="mt-2">
                                      <p>Leaderboard</p>
                                  </div>
                                </div>
                              </div>
                              <div class="feature-block col-6 col-lg-3">
                                <div class="text-center d-inline-block">
                                  <div>
                                      <img src="images/beta-offer/challenges.svg" alt="Challenges">
                                  </div>
                                  <div class="mt-2">
                                      <p>Challenges</p>
                                  </div>
                                </div>
                              </div>
                              <div class="feature-block col-6 col-lg-3">
                                <div class="text-center d-inline-block">
                                  <div>
                                      <img src="images/beta-offer/mentor-support.svg" alt="Mentor Support">
                                  </div>
                                  <div class="mt-2">
                                      <p>100 Hrs Mentor Support</p>
                                  </div>
                                </div>
                              </div>
                          </div>
                      </div>
                      <div class="pb-3 pb-md-0">
                          <a href="#" class="btn rounded-pill getPremiumBtn px-5 py-2">Get Premium</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $('body').append(modalString);
  $('#betaOfferModal').modal({
    backdrop: 'static',
    keyboard: false,
  });
};

export default betaOfferModal;
