function Modal(
  modalId,
  onInitCallback,
  onShowCallback,
  onSubmitCallback,
  onHideCallback
) {
  this.modal = document.getElementById(modalId);
  if (!this.modal) return;
  this.data = {};
  this.approve = this.modal.querySelector('[data-id="approve"]');
  this.confirm = this.modal.querySelector('[data-id="confirm"]');

  this.stepsStructure = htmlToElement(`
  <div class="steps" data-id="steps">
        <div class="steps-row">
          <div class="steps-styles">Step <span data-id="currentStep" class="current-step"></span> of <span class="all-steps" data-id="allStep"></span></div>
          <div class="steps-dots">
            <div data-step="1" class="step active">
              <span></span>
            </div>
            <div data-step="2" class="step">
              <span></span>
            </div>
          </div>
        </div>
      </div>`);

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
  };

  this.isLoadedAfterApprove = (success = true) => {
    this.isLoading = false;
    this.modal.classList.remove('modal-loading');

    if (success) {
      this.nextStep();

      return;
    }

    this.approve.disabled = false;
    this.approve.classList.remove('btn-load');
  };

  this.nextStep = () => {
    this.currentStep.innerHTML = 2;
    this.steps[0].classList.remove('active');
    this.steps[1].classList.add('active');

    this.approve.disabled = true;
    this.approve.style.display = 'none';
    this.approve.classList.remove('btn-load');
    this.approve.classList.add('btn-done');
    this.confirm.disabled = false;
    this.confirm.style.display = 'flex';
    this.confirm.classList.remove('btn-load', 'btn-done');
  };

  this.prevStep = () => {
    if (this.approve) {
      this.currentStep.innerHTML = 1;
      this.steps[0].classList.add('active');
      this.steps[1].classList.remove('active');

      this.approve.disabled = false;
      this.approve.style.display = 'flex';
      this.approve.classList.remove('btn-load', 'btn-done');
      this.confirm.disabled = true;
      this.confirm.style.display = 'none';
      this.confirm.classList.remove('btn-load', 'btn-done');
    } else {
      this.confirm.disabled = false;
      this.confirm.style.display = 'flex';
      this.confirm.classList.remove('btn-load', 'btn-done');
    }
  };

  this.isLoadingAfterConfirm = () => {
    this.isLoading = true;
    this.modal.classList.add('modal-loading');
    this.confirm.disabled = true;
    this.confirm.classList.add('btn-load');
  };

  this.isLoadedAfterConfirm = (success = true, isApproved = true) => {
    this.isLoading = false;
    this.modal.classList.remove('modal-loading');

    if (success) {
      this.confirm.disabled = true;
      this.confirm.classList.remove('btn-load');
      this.confirm.classList.add('btn-done');
      this.timerToCloseModal = setTimeout(() => {
        this.hide();
      }, this.closeModalTimer);

      this.onSubmitCallback && this.onSubmitCallback();
      return;
    }

    if (!isApproved) {
      this.prevStep();

      return;
    }

    this.hide();
  };

  this.show = () => {
    this.modal.classList.add('open');
    this.onShowCallback && this.onShowCallback();
  };

  this.setData = (data) => {
    this.data = {
      ...data,
    };
  };

  this.updateData = (newData) => {
    this.data = {
      ...data,
      ...newData,
    };
  };

  this.hide = () => {
    this.hideModal();

    if (this.timerToCloseModal) {
      clearTimeout(this.timerToCloseModal);
      this.timerToCloseModal = null;
    }

    if (this.isLoading) return;

    setTimeout(() => {
      this.prevStep();
    }, 300);

    this.onHideCallback && this.onHideCallback();
  };

  this.hideModal = () => {
    this.modal.classList.remove('open');
  };

  this.init = () => {
    const exits = this.modal.querySelectorAll('.modal-exit');
    this.modal.classList.remove('hidden');
    exits.forEach((exit) => {
      exit.addEventListener('click', this.hide);
    });

    if (this.approve) {
      const parentElementForSteps =
        this.modal.querySelector('.top-divider') || this.modal;

      parentElementForSteps.insertBefore(
        this.stepsStructure,
        parentElementForSteps.lastChild
      );

      this.stepsParrent = this.modal.querySelector('[data-id="steps"]');
      this.currentStep = this.modal.querySelector('[data-id="currentStep"]');
      this.allStep = this.modal.querySelector('[data-id="allStep"]');
      this.steps = this.modal.querySelectorAll('[data-step]');
      this.currentStep.innerHTML = 1;
      this.allStep.innerHTML = this.steps.length;
    }
  };
  this.init();
}
