import $ from 'jquery';

const santaModal = () => {
  const modalContent = `
    <div class="modal fade" id="santaModal" tabindex="-1" role="dialog" aria-labelledby="santaModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="col d-flex flex-column align-items-center justify-content-center text-center">
              <img class="my-3" src="/images/common/modal-party.svg" alt="Party"/>
              <h5 class="mb-5">Thank You for participating in Secret Santa Contest!</h5>
              <p>We will get back to you soon with the Lucky Winners List.</p>
              <h3>You could be One of the Lucky Kids!</h3>
            </div>
          </div>
          <div class="modal-footer border-0 mb-4">
            <div class="col d-flex flex-column align-items-center justify-content-center text-center">
              <p>Meanwhile, Practise Coding in HackerKid.</p>
              <button class="btn bg-primary-gradient rounded-pill px-4 text-light" data-dismiss="modal">Practise Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  $('body').append(modalContent);
  $('#santaModal').modal({
    backdrop: 'static',
    keyboard: false,
  });
};

export default santaModal;
