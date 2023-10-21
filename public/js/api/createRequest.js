/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    let {url, data, method, callback} = options;
    const formData = new FormData();

    if(options.method === 'GET'){
        url = url + "?";
        for(let key in data){
            url += key + '=' + data[key] + '&';
        }
        url = url.slice(0, -1);
    } else {
        for(let key in data) {
            formData.append(key, data[key]);
        }
    }

    

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
        xhr.addEventListener("load", function () {
            options.callback(null, xhr.response);
            
        })
    } catch (error){
        options.callback(error);
    }
};
