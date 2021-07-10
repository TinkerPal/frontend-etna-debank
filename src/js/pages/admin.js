export function loginAdmin() {
  const msgParams = [
    {
      type: 'string',
      name: 'Authorization',
      value: 'Sign to confirm your access to admin wallet',
    },
    {
      type: 'string',
      name: 'Timestamp',
      value: Math.floor(Date.now() / 100000).toString(),
    },
    {
      type: 'uint32',
      name: 'Randon number for extra security',
      value: Math.floor(Math.random() * 100000000),
    },
  ];

  window.ethereum
    .request({
      method: 'eth_signTypedData',
      params: [msgParams, userObject.account],
    })
    .then((result) => {
      encr_message = result;

      checkAdminAuthentification(msgParams, encr_message, 'admin.php');
    })
    .catch((error) => {
      if (error.code === 4001) {
        errorMsg('We need you to sign message to get admin access');
      } else {
        // console.error(error);
      }
    });
}

export function checkAdminButton(token) {
  // admin functions work only with MM
  if (!isMetaMaskInstalled()) return;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    wallet_id: userObject.account,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${WALLETS_API_URL}/get_wallet_type`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      const wallet_type = respJson.type;
      if (wallet_type === 'admin') {
        if (document.getElementById('adminButton')) {
          document.getElementById('adminButton').style.display = 'block';
          document
            .getElementById('adminButton')
            .addEventListener('click', loginAdmin);
          document
            .getElementById('net_txt')
            .addEventListener('click', loginAdminTst);
        }
      }
    })
    .catch((error) => {
      new Error(error);
    });
}

export function checkAdminAuthentification(
  msg_params,
  encr_message,
  php_script,
  extra_data = null
) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    wallet_id: userObject.account,
    msg_params,
    encrypted_message: encr_message,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${WALLETS_API_URL}/check_signed_message`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      // if we are here, it success (see backend implementation)
      // we store signed message & signed data as token
      window.msg_params = msg_params;
      window.encr_message = encr_message;
      // in admin functions we will call checkAdminAuthentification (window.window.msg_params,window.encr_message)
      // to verify admin access, after page is reload, metamask need to sign message again

      // redirect to admin page, where at backend we also check
      // credentials

      const postData = [];

      postData.body_raw = raw;
      if (extra_data) {
        postData.extra_data = JSON.stringify(extra_data);
      }

      postAndRedirect(window.location.href + php_script, postData);
    })
    .catch((error) => {
      errorMsg('This wallet does not have admin access');
    });
}

function postAndRedirect(url, postData) {
  const myForm = document.createElement('form');
  myForm.setAttribute('action', url);
  myForm.setAttribute('method', 'post');
  myForm.setAttribute('hidden', 'true');
  const myInput = document.createElement('input');
  myInput.setAttribute('type', 'text');
  myInput.setAttribute('name', 'body_raw');
  myInput.setAttribute('value', postData.body_raw);
  myForm.appendChild(myInput);
  document.body.appendChild(myForm);
  myForm.submit();
}
