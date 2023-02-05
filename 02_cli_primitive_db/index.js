import inquirer from 'inquirer'
import fs from 'fs/promises'
import path from 'path'

// Path to txt file
const contactsPath = path.resolve('./users.txt')
// Read list of contacts
async function listContacts() {
  try {
    const data = (await fs.readFile(contactsPath, 'utf8')) || '[]'

    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}
// Add contact
async function addContact({ name, gender, age }) {
  try {
    const data = await listContacts()
    const newContact = {
      name,
      gender,
      age,
    }

    data.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), 'utf8')

    return newContact
  } catch (error) {
    console.error(error)
  }
}
// Constant to create user
const user = {}
// Ask name
const ask = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    })
    .then((answer) => {
      user.name = answer.name
      user.name === '' ? askFilter() : askOther()
    })
}
// Ask gender and age
const askOther = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'gender',
        message: 'Choose your gender',
        choices: ['male', 'female'],
      },
      {
        type: 'input',
        name: 'age',
        message: 'How old are you?',
      },
    ])
    .then(async (answer) => {
      user.gender = answer.gender
      user.age = answer.age
      await addContact(user)
      ask()
    })
}
// Ask if need to filter
const askFilter = () => {
  inquirer
    .prompt({
      type: 'confirm',
      name: 'choose',
      message: 'Search by name from DB?',
    })
    .then((answer) => {
      answer.choose ? startFiltering() : console.log('Bye')
    })
}
// Ask for filter value
const startFiltering = async () => {
  const users = await listContacts()
  console.log('Users in your contact list:', users)
  inquirer
    .prompt({
      type: 'input',
      name: 'filter',
      message: 'Enter name to search',
    })
    .then(async (answer) => {
      const filteredUsers = users.filter(
        (user) => user.name.toLowerCase() === answer.filter.toLowerCase()
      )
      if (filteredUsers.length > 0) {
        console.log(filteredUsers)
        askFilter()
      } else {
        console.log(`No user in DB with name ${answer.filter}`)
        askFilter()
      }
    })
}

ask()
