function Modal(modalId, initModalElementCallback, showModalCallback) {
  this.modal = document.getElementById(modalId);
  this.data = {};
  this.approve = this.modal.querySelector('[data-id="approve"]');
  this.confirm = this.modal.querySelector('[data-id="confirm"]');
  this.initModalElementCallback = initModalElementCallback;

  this.closeModalTimer = 5000;

  this.isLoadingAfterApprove = () => {
    this.approve.disabled = true;
    this.approve.classList.add('btn-load');
  }

  this.isLoadedAfterApprove = (success = true) => {
    if (success) {
      this.approve.classList.remove('btn-load');
      this.approve.classList.add('btn-done');

      if(this.confirm) {
        this.confirm.disabled = false;
      } else {
        setTimeout(() => this.hide(), this.closeModalTimer); 
      }

      return;
    }

    if(this.confirm) {
      this.approve.disabled = false;
      this.approve.classList.remove('btn-load');
      return;
    }

    this.hide();
  }

  this.isLoadingAfterConfirm = () => {
    this.confirm.disabled = true;
    this.confirm.classList.add('btn-load');
  }

  this.isLoadedAfterConfirm = (success = true, isApproved = true) => {
    if (success) {
      this.confirm.classList.remove('btn-load');
      this.confirm.classList.add('btn-done');
      setTimeout(() => this.hide(), this.closeModalTimer); 

      return;
    }

    if(!isApproved) {
      this.approve.disabled = false;
      this.approve.classList.remove('btn-done');
      this.confirm.disabled = true;
      this.confirm.classList.remove('btn-load');

      return;
    }

    this.hide();
  }

  this.show = () => {
    this.modal.classList.add("open");
    showModalCallback && showModalCallback();
  }

  this.setData = (data) => {
    this.data = {
      ...data
    };
  }

  this.updateData = (newData) => {
    this.data = {
      ...data,
      ...newData
    };
  }

  this.hide = () => {
    this.modal.classList.remove("open");

    if (this.approve) {
      this.approve.disabled = false;
      this.approve.classList.remove('btn-load', 'btn-done');
    }

    if (this.confirm) {
      this.confirm.disabled = false;
      this.confirm.classList.remove('btn-load', 'btn-done');
    }
  }

  init = () => {
    const exits = this.modal.querySelectorAll(".modal-exit");
    exits.forEach(exit => {
      exit.addEventListener("click", this.hide);
    });
  }

  init();
}
