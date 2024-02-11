import { Form } from '../../script/form'
import {
  saveSession,
  getTokenSession,
} from '../../script/session'

// клас SignupForm наслідує Form. Тобто Form є батьківським класом
class SignupConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
  }

  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Дуже довге значення, приберіть зайве',
    EMAIL: 'Введіть коректне значення e-mail адреси',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }
  }

  // цей метод відправляє запит на сервер
  submit = async () => {
    // якщо користувач не введе жодного поля
    // і захоче відправити форму, йому вискочить помилка
    // біля кожного поля яке не заповнене + кнопка буде не активна
    // після коректного введення кнопка стає активною
    // якщо раптом галочку забирають, кнопка стає неактивною
    // ми створили гнучку валідацію

    if (this.disabled === true) {
      this.validateAll()
    } else {
      console.log(this.value)

      this.setAlert('progress', 'Завантаження...')
      // під кнопкою з'являється синій alert

      try {
        const res = await fetch('/signup-confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        })

        const data = await res.json()

        if (res.ok) {
          this.setAlert('success', data.message)
          saveSession(data.session)
          location.assign('/')
        } else {
          this.setAlert('error', data.message)
        }
      } catch (error) {
        this.setAlert('error', error.message)
      }
    }
  }

  //дані які відправляються на бекенд
  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(
        this.value[this.FIELD_NAME.CODE],
      ),
      token: getTokenSession(),
    })
  }
}

window.signupConfirmForm = new SignupConfirmForm()
