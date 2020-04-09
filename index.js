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

          appendFileP('newReadme.md', `![Profile img](${profileImg})` , function (err) {
            if (err) {
              throw err
            }

            console.log(`Saved succed`)
            // console.log('Saved ' + repoNames.length + ' repos')
          })
        })
  })
    console.log('')
  })
  
  .catch(function (err) {
    console.error(err)
  })

// axios
// const queryUrl = `https://api.github.com/users/${answers.github}` 

// axios.get(queryUrl).then(function (res) {
//   const gitImage = res.data.avatar_url

  

  
// })

// Functions
function promptUser () {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe your project?'
    },
    {
      type: 'input',
      name: 'installation',
      message: 'How do you install your application?'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'How do you use this app?'
    },
    {
      type: 'input',
      name: 'test',
      message: 'Add all the tests you did on this app'
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
  * [Credits](#credits)
  * [License](#license)
  
   
  # Installation
   ${answers.installation}

  # Usage
   ${answers.usage}

  # License
  ![Diego](https://img.shields.io/badge/clean-code-purple)
  ![nvm version](https://img.shields.io/badge/version-v0.35.3-yellow.svg)
  ![Travis CI](https://travis-ci.com/diegolehyt/homework9.svg?branch=master)
  ![License](https://img.shields.io/github/license/diegolehyt/homework9)
  # Contributing
  [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

  # Test
   ${answers.test}
  # Questions

  E-mail: Hidden

`
}

