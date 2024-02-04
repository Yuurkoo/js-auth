class Confirm {
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    this.data = data
  }

  static generateCode = () =>
    Math.floor(Math.random() * 9000) + 1000

  static create = (data) => {
    this.#list.push(new Confirm(data))

    setTimeout(() => {
      this.delete(code)
    }, 24 * 60 * 60 * 1000) // 24 hours in miliseconds

    console.log(this.#list)
  }

  static delete = (code) => {
    const length = this.#list

    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )

    return length > this.#list.length
  }

  static getData = (code) => {
    const obj = this.#list.find(
      (item) => item.code === code,
    ) // через find знаходимо код, такий самий як я вказав

    return obj ? obj.data : null // якщо є об'єкт - повертаємо його, якщо ні то null
  }
}

module.exports = {
  Confirm,
}
