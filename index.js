const core = require("@actions/core");
const axios = require('axios');

const PAT = core.getInput('PAT');
const disc_labels = core.getInput('disc_labels');
const repoOwner = 'rainfall-kiran';
const repoName = 'labelsetting';


const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${PAT}`
};

const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/labels`;

axios.get(apiUrl, { headers })
  .then(response => {
    const labels = response.data.map(label => ({
      name: label.name,
      id: label.id // Retrieve the label ID
    }));
    console.log('Labels:', labels);

    const labelIds = disc_labels.map(labelName => {
        const label = labels.find(labelObj => labelObj.name === labelName);
        return label ? label.id : null;
      });
  
      console.log('Label IDs:', labelIds);
  })
  .catch(error => {
    console.error('Error fetching labels:', error.message);
  });
