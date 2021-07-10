export function setWalletPref(pref) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    wallet_id: userObject.account,
    page_id: pref.page_id,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    keepalive: true,
    // redirect: 'follow'
  };

  fetch(`${WALLETS_API_URL}/set_wallet_pref`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      const { type } = respJson;

      if (type === 'success') {
        //
      } else {
        errorMsg('Setting wallet preferences error');
      }
    })
    .catch((error) => {
      errorMsg('Set wallet preferences error');
    });
}

export async function getWalletPref() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    wallet_id: userObject.account,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    // redirect: 'follow'
  };

  await fetch(`${WALLETS_API_URL}/get_wallet_pref`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      const { type } = respJson;

      if (type === 'success') {
        if (!respJson.value.page_id) {
          userObject.state.current_page_id = 'dashboard-tab';
        } else {
          userObject.state.current_page_id = respJson.value.page_id;
        }
      } else {
        userObject.state.current_page_id = 'dashboard-tab';
      }
    })
    .catch((error) => {
      userObject.state.current_page_id = 'dashboard-tab';
    });
}

function openTab(event, tabid, callback, pageName) {
  if (callback) {
    const callbackState = callback();

    if (!callbackState) return;
  }

  safeRemoveClassBySelector('.nav-link', 'active');
  safeAddClassBySelector('.page', 'hide');

  if (!userObject.state.routeHistory.cur) {
    userObject.state.routeHistory.cur = {
      click: () => openTab(event, tabid, callback, pageName),
      pageName,
    };
  } else {
    userObject.state.routeHistory.prev = {
      ...userObject.state.routeHistory.cur,
    };
    userObject.state.routeHistory.cur = {
      click: () => openTab(event, tabid, callback, pageName),
      pageName,
    };
  }

  if (event.srcElement) {
    event.srcElement.classList.add('active');
    const activeButton = document.getElementById(`${tabid}-menu`);
    activeButton?.classList.add('active');

    document.getElementById(tabid).classList.remove('hide');
    userObject.state.current_page_id = tabid;
  } else {
    openTab(
      {
        srcElement: document.getElementById('total-dashboard-tab-menu'),
      },
      'total-dashboard-tab'
    );
  }

  if (isMobile) {
    const tabs = document.querySelector('#control-tabs');
    const tabsElements = document.querySelectorAll(`[data-tab]`);
    const breadcrumbs = document.querySelector('.header-breadcrumbs');
    const logo = document.querySelector('#header-logo');

    if (
      tabid !== 'dashboard-tab' &&
      tabid !== 'borrow-tab' &&
      tabid !== 'liq-earn-tab'
    ) {
      tabs.classList.add('hidden');
      breadcrumbs.classList.remove('hidden');
      logo.classList.add('hidden');
    } else {
      tabs.classList.remove('hidden');
      breadcrumbs.classList.add('hidden');
      logo.classList.remove('hidden');
    }

    tabsElements.forEach((item) => {
      if (item.dataset.tab === tabid) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    // Todo: переписать все табы на единый формат истории
    if (userObject.state.routeHistory?.prev?.pageName) {
      const tab = document.querySelector('[data-tab="with-page-name"]');
      tab.classList.remove('hidden');
      tab.innerHTML = userObject.state.routeHistory.prev.pageName;
      tab.onclick = userObject.state.routeHistory.prev.click;
    }
  }
}
