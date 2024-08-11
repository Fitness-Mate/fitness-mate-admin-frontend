const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

export function sendRequest(configs) {
    let options = {
        url: API_BASE_URL + configs.url,
        method: configs.method || methods.POST,
        headers: new Headers()
    };

    if (!configs.isForm) {
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
    }

    if (!configs.isForm && configs.data) options.body = JSON.stringify(configs.data);
    else options.body = configs.data;

    const setLoading = configs.setLoading || ((param) => {});
    setLoading(true);

    const success = configs.success || ((param) => {});
    const fail = configs.fail || ((param) => {});

    return fetch(options.url, options)
        .then((res) => {
            if(res.status === 401 || res.status === 403) alert('접근 권한이 없습니다.');

            res.json().then((json)=>{
                if(json.code === 1000) success(json.data);
                else fail(json.data);
            });

            setLoading(false);
        })
        .catch((error) => {
            fail(error);
            setLoading(false);
        });
}