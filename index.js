// const for project
const axios = require('axios')
const inquirer = require('inquirer')
const util = require('util')
const fs = require('fs')

const writeFileP = util.promisify(fs.writeFile)
const appendFileP = util.promisify(fs.appendFile)


promptUser()
  .then(function (answers) {
    
    const html = generateReadme(answers)
    return writeFileP('newReadme.md', html)
  })
  .then(function () {
    // Axios
    inquirer
      .prompt([{
        message: '\nEnter your GitHub username:',
        name: 'username'
      },
      {
        message: 'Enter your GitHub repository name:',
        name: 'repo'
      }
    ])
      .then(function ({ username, repo }) {
        const queryUrl = `https://api.github.com/users/${username}`

        axios.get(queryUrl).then(function (res) {
          const profileImg = res.data.avatar_url


          appendFileP('newReadme.md', `![code size](https://img.shields.io/github/languages/code-size/${username}/${repo}) ![last comit](https://img.shields.io/github/languages/top/${username}/${repo}) ![last comit](https://img.shields.io/github/last-commit/${username}/${repo})\n# License\nThis project is under the MIT License.![License](https://img.shields.io/github/license/${username}/${repo})\n# Questions \n\n![Profile img](${profileImg})\n\nE-mail: Hidden` , function (err) {
            if (err) {
              throw err
            }

          })
          console.log(`Succed creating the file newReadme.md`)
        })
  })
    console.log('')
  })
  
  .catch(function (err) {
    console.error(err)
  })

// Functions
function promptUser () {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What's the name of your project?",
      default: 'Project Title'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe your project: ',
      default: 'Description of your project'
    },
    {
      type: 'input',
      name: 'installation',
      message: 'How do you install your application?',
      default: 'Installation steps'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'How do you use it?',
      default: 'Usage of the app'
    },
    {
      type: 'input',
      name: 'test',
      message: 'Add all the tests you did on this app',
      default: 'None'
    },
    {
      type: 'input',
      name: 'version',
      message: 'App version?',
      default: 'v1.0.0'
    }
  ])
  
}

function generateReadme (answers) {
  return `
  # Project Title
   ${answers.name}

  # Table of Content

  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Test](#test)
  * [Contributing](#contributing)
  * [Badges](#badges)
  * [License](#license)
  * [Questions](#questions)

  # Description
   ${answers.description} 

  # Installation
   ${answers.installation}

  # Usage
   ${answers.usage}

  # Test
  ${answers.test}
  
  # Contributing
  This project is under the Contributor Covenant. [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

  # Badges
  ![Diego](https://img.shields.io/badge/version-${answers.version}-purple) `
}

