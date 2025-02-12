window.onload = function () {
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {
        localStorage.setItem('token', token);
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', token: token }, '*');
        }
      } catch (error) {
        console.error('Error al procesar autenticación:', error);
      }
      window.close();
    }
  }, 1500);
};
