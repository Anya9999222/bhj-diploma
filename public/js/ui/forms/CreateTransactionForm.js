/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, response) => {
      if(response && response.success){
        const form = this.element.querySelector('.accounts-select');
       form.innerHTML = response.data.reduce( (html, list) => {
          return html += `<option value="${list.id}">` + list.name + `</option>`
        }, '')
        
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response && response.success){
        this.element.reset();
        const modal = this.element.closest(`[data-modal-id]`).dataset.modalId;
        App.getModal(modal).close();
        App.update();
      }
    })
  }
}