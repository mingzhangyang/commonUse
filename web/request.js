/**
 * Created by yangm11 on 8/27/2018.
 */
'use strict';

function request(method, url, option) {
  if (typeof method !== 'string') {
    throw 'The first argument is expected to be a string.';
  }
  method = method.toUpperCase();
  const METHODS = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE, OPTIONS, PATCH'];
  if (METHODS.indexOf(method) === -1) {
    throw 'Method not recognized!';
  }
  if (typeof url !== 'string' || url.slice(4) !== 'http') {
    throw 'The second argument is not a valid http url string.';
  }
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      switch (xhr.readyState) {
        case 0:
          // State: UNSENT
          console.log('Client has been created. open() not called yet.');
          return;
        case 1:
          // State: OPENED
          console.log('open() has been called.');
          return;
        case 2:
          // State: HEADERS_RECEIVED
          console.log('send() has been called, and headers and status are' +
              ' available.');
          return;
        case 3:
          // State: LOADING
          // 	Downloading; responseText holds partial data.
          return;
        case 4:
          // State: DONE
          console.log('The operation is complete. But no successful response' +
              ' guaranteed.');

          if (xhr.status >= 500) {
            console.log('Server error!');
            console.log('Status code:', xhr.status);
            console.log('Error message:', xhr.statusText);
            reject({
              ok: false,
              status: xhr.status,
              statusText: xhr.statusText
            });
            return;
          }

          if (xhr.status >= 400) {
            console.log('Client error!');
            console.log('Status code:', xhr.status);
            console.log('Error message:', xhr.statusText);
            reject({
              ok: false,
              status: xhr.status,
              statusText: xhr.statusText
            });
            return;
          }

          if (xhr.status >= 300) {
            console.log('Redirection message received.');
            console.log('Status code', xhr.status);
            console.log('Message:', xhr.statusText);
            return;
          }

          if (xhr.status >= 200) {
            resolve({
              type: xhr.responseType,
              data: xhr.response,
              ok: true,
              status: xhr.status,
              statusText: xhr.statusText
            });
            return;
          }

          if (xhr.status >= 100) {
            console.log('Information responses:', xhr.status);
            return;
          }

          if (xhr.status === 0) {
            reject({
              ok: false,
              status: xhr.status, // browser report a status of 0 in case of
              // XMLHttpRequest errors
              statusText: xhr.statusText
            });
          }
      }
    };
    xhr.open(method, url, true);
    if (option && typeof option === 'object') {
      if (option === null) {
        xhr.send(null);
        return;
      }
      if (option['headers']) {
        let headers = object.keys(options.headers);
        for (let header of headers) {
          xhr.setRequestHeader(header, option.headers[header]);
        }
        delete option.headers;
      }

      if (option['mimeType']) {
        xhr.overrideMimeType(option.mimeType);
        delete option.mimeType;
      }

      xhr.send(option);
    } else {
      xhr.send();
    }
  });
}

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
} else if (typeof window === 'object') {
  // Browser environment
  // document.getElementById('url').addEventListener('change', function () {
  //   let d = request('GET', this.value, null);
  //   d.then(console.log).catch(err => {
  //     console.log(err);
  //   });
  // });

} else {
  // Node environment, run directly
  // test code go here
}