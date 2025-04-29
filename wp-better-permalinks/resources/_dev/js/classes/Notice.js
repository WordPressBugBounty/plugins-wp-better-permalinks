export default class Notice
{
  constructor()
  {
    if (!this.setVars()) return;

    this.setEvents();
  }

  setVars()
  {
    this.notice = document.querySelector('.notice[data-notice="wp-better-permalinks"]');
    if (!this.notice) return;

    this.settings = {
      buttonClose: '.notice-dismiss',
      buttonPermanently: '[data-permanently]',
      ajaxUrl: this.notice.getAttribute('data-url'),
    };
    this.events = {
      clickOnClose: this.clickOnClose.bind(this),
    };

    return true;
  }

  setEvents()
  {
    this.notice.addEventListener('click', this.events.clickOnClose);
  }

  clickOnClose(e)
  {
    const { buttonClose, buttonPermanently } = this.settings;
    const { clickOnClose } = this.events;

    this.notice.removeEventListener('click', clickOnClose);

    if (e.target.matches(buttonClose)) {
      this.hideNotice(false);
    } else if (e.target.matches(buttonPermanently)) {
      this.hideNotice(true);
    }
  }

  hideNotice(isPermanently)
  {
    jQuery.ajax(this.settings.ajaxUrl, {
      type: 'POST',
      data: {
        is_permanently: isPermanently ? 1 : 0,
      },
    });

    if (isPermanently) {
      this.notice.querySelector(this.settings.buttonClose).click();
    }
  }
}
