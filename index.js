const core = require("@actions/core");
const axios = require('axios');

const repoOwner = 'rainfall-kiran';
const repoName = 'labelsetting';
const token = core.getInput('PAT');

const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${token}`
};

const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/labels`;

axios.get(apiUrl, { headers })
  .then(response => {
    const labels = response.data.map(label => ({
      name: label.name,
      id: label.id // Retrieve the label ID
    }));
    console.log('Labels:', labels);
  })
  .catch(error => {
    console.error('Error fetching labels:', error.message);
  });