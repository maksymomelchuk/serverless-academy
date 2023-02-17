import fs from 'fs/promises'

const vacations = await fs.readFile('./vacations.json', 'utf-8')

const result = JSON.parse(vacations).reduce((acc, el) => {
  const {
    user: { _id, name },
    startDate,
    endDate,
  } = el
  const index = acc.findIndex((item) => item.userId === el.user._id)
  if (index === -1) {
    const user = {
      userId: _id,
      userName: name,
      vacations: [
        {
          startDate,
          endDate,
        },
      ],
    }
    acc.push(user)
    return acc
  } else {
    const vacations = {
      startDate,
      endDate,
    }
    acc[index].vacations.push(vacations)
    return acc
  }
}, [])

console.log(result)
