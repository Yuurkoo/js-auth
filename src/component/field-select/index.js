class FieldCSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling

    options.toggleAttribute('active')

    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          if (!options.parentElement.contains(e.target))
            options.removeAttribute('active')
        },
        { once: true },
      )
    })
  }

  static change = (target) => {
    const active =
      target.parentElement.querySelector('*[active]')

    if (active) active.toggleAttribute('active')

    target.toggleAttribute('active')

    const parent = target.parentElement.parentElement // field__container
    const value = parent.querySelector('.field__value')

    if (value) {
      value.innerText = target.innerText
      value.classList.remove('field__value--placeholder')
    }
    // if дає змогу нам вибрати роль, яка зразу відображається замість placeholder

    const list = target.parentElement
    list.toggleAttribute('active')
    // вибирається потрібне поле і відповідно закривається панель
  }
}

window.fieldCSelect = FieldCSelect