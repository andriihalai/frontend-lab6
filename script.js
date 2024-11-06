const downloadButton = document.getElementById('download-button');
const resultLabel = document.getElementById('result-label');

downloadButton.addEventListener('click', e => {
  resultLabel.innerText = 'Loading...';
  Promise.all([
    fetchProfile('1-profile'),
    fetchProfile('2-profile'),
    fetchProfile('3-profile'),
    fetchProfile('4-profile'),
    fetchProfile('5-profile'),
  ]).then(() => {
    resultLabel.innerText = 'Success';
  });
});

function fetchProfile(profileId) {
  return fetch('https://randomuser.me/api')
    .then(res => {
      return res.json();
    })
    .then(data => {
      const info = data.results[0];
      const { title, last, first } = info.name;
      const { city, country } = info.location;
      const firstProfile = document.getElementById(profileId);

      firstProfile.innerHTML = `
        <img id="profile-image" src="${info.picture.large}" />
        <p id="name">Name: ${title} ${last} ${first}</p>
        <p id="cell">Cell: ${info.cell}</p>
        <p id="city">City: ${city}</p>
        <p id="country">Country: ${country}</p>
      `;
    });
}
