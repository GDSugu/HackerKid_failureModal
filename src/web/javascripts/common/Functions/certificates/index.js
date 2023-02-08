import html2canvas from 'html2canvas';

const getEachWordCapitalized = (str) => {
  if (!str || str.length === 0) return '';

  const splitArr = str.split(' ');

  splitArr.forEach((_, index) => {
    splitArr[index] = splitArr[index].charAt(0).toUpperCase() + splitArr[index].slice(1);
  });

  return splitArr.join(' ');
};

const getParsedHtmlStringForCertificate = (certificateId, certificateName, studentName) => `
  <div class="container-fluid">
  <div class="row d-flex justify-content-center" id="certificateBlock">
    <img class="imageTemplate" src="/images/common/certificate1.png" alt="certificate Image">
    <span class="certificateId">ID: ${certificateId.toUpperCase()}</span>
    <span class="certificateName">is here by awarded the certification of achievement for the successfull completion of <b>${certificateName}</b></span>
    <span class="userName">${getEachWordCapitalized(studentName)}</span>
    <img class="certificateSign" src="/images/common/authority1.png" alt="authority sign">
  </div>
</div>
`;

const getCanvasFromElement = (element) => {
  window.scrollTo(0, 0);
  return html2canvas(element);
};

export default null;

export {
  getParsedHtmlStringForCertificate,
  getCanvasFromElement,
};
