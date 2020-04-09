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
    inquirer
      .prompt({
        message: '\n Enter your GitHub username:',
        name: 'username'
      })
      .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`

        axios.get(queryUrl).then(function (res) {
          const profileImg = res.data.avatar_url

          // const repoNamesStr = repoNames.join('\n')

          appendFileP('newReadme.md', `![Profile img](${profileImg})\n\nE-mail: Hidden
          ` , function (err) {
            if (err) {
              throw err
            }

            console.log(`Saved succed`)
            // console.log('Saved ' + repoNames.length + ' repos')
          })
        })
  })
    console.log('Saved')
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
      message: 'What the name of your project?',
      default: 'Project Title'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe your project?',
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
      message: 'How do you use this app?',
      default: 'Usage of the app'
    },
    {
      type: 'input',
      name: 'test',
      message: 'Add all the tests you did on this app',
      default: 'None'
    }
  ])
  
}

function generateReadme (answers) {
  return `
  # Project Title
   ${answers.name}

  # Description
   ${answers.description} 

  # Table of Content

  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)
  * [Badges](#badges)
  * [Questions](#questions)
  
   
  # Installation
   ${answers.installation}

  # Usage
   ${answers.usage}

  # License
  ![License](https://img.shields.io/github/license/diegolehyt/homework9)

  # Badges
  ![Diego](https://img.shields.io/badge/clean-code-purple)
  ![nvm version](https://img.shields.io/badge/version-v0.35.3-yellow.svg)
  ![Travis CI](https://travis-ci.com/diegolehyt/homework9.svg?branch=master)

  # Contributing
  [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

  # Test
   ${answers.test}
  # Questions  
`
}

