function Modal(modalId, onInitCallback, onShowCallback, onSubmitCallback, onHideCallback) {
  this.modal = document.getElementById(modalId);
  this.data = {};
  this.approve = this.modal.querySelector('[data-id="approve"]');
  this.confirm = this.modal.querySelector('[data-id="confirm"]');

  this.onInitCallback = onInitCallback;
  this.onShowCallback = onShowCallback;
  this.onSubmitCallback = onSubmitCallback;
  this.onHideCallback = onHideCallback;

  this.isLoading = false;

  this.closeModalTimer = 3000;

  this.timerToCloseModal = null;

  this.isLoadingAfterApprove = () => {
    this.isLoading = true;
    this.modal.classList.add('modal-loading');

    this.approve.disabled = true;
    this.approve.classList.add('btn-load');
  }

  this.isLoadedAfterApprove = (success = true) => {
    this.isLoading = false;
    this.modal.classList.remove('modal-loading');

    if (success) {
      this.approve.disabled = true;
      this.approve.classList.remove('btn-load');
      this.approve.classList.add('btn-done');

      if (this.confirm) {
        this.confirm.disabled = false;
      } else {
        this.timerToCloseModal = setTimeout(() => this.hide(), this.closeModalTimer);
      }

      return;
    }

    if (this.confirm) {
      this.approve.disabled = false;
      this.approve.classList.remove('btn-load');
      return;
    }

    this.hide();
  }

  this.isLoadingAfterConfirm = () => {
    this.isLoading = true;
    this.modal.classList.add('modal-loading');
    this.confirm.disabled = true;
    this.confirm.classList.add('btn-load');
  }

  this.isLoadedAfterConfirm = (success = true, isApproved = true) => {
    this.isLoading = false;
    this.modal.classList.remove('modal-loading');

    if (success) {
      this.confirm.disabled = true;
      this.confirm.classList.remove('btn-load');
      this.confirm.classList.add('btn-done');
      this.timerToCloseModal = setTimeout(() => {
        this.hide()
      }, this.closeModalTimer);

      this.onSubmitCallback && this.onSubmitCallback();
      return;
    }

    if (!isApproved) {
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
    this.onShowCallback && this.onShowCallback();
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

  this.hide = (withCallback = true) => {
    this.modal.classList.remove("open");

    if (this.timerToCloseModal) {
      clearTimeout(this.timerToCloseModal);
      this.timerToCloseModal = null;
    }

    if (this.isLoading) return;

    setTimeout(() => {
      if (this.approve) {
        this.approve.disabled = false;
        this.approve.classList.remove('btn-load', 'btn-done');
      }

      if (this.confirm) {
        if(this.approve && !this.onShowCallback) {
          this.confirm.disabled = true;
        } else {
          this.confirm.disabled = false;
        }
        this.confirm.classList.remove('btn-load', 'btn-done');
      }
    }, 300);

    if(!withCallback) return;
    
    this.onHideCallback && this.onHideCallback();
  }

  this.init = () => {
    const exits = this.modal.querySelectorAll(".modal-exit");
    this.modal.classList.remove('hidden');
    exits.forEach(exit => {
      exit.addEventListener("click", this.hide);
    });
  }

  this.init();
}
