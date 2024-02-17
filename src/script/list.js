export class List {
  STATE = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  }

  status = null
  data = null //дані які ми завантажили
  element = null //відобрвження наших данних

  updateStatus = (status, data) => {
    this.status = status

    if (data) this.data = data

    this.updateView()
  }

  updateView = () => {}

  loadData = async () => {}

  convertData = () => {}
}
