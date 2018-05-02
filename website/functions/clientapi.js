let clientapi = Object.create({})

clientapi.makeRequest = function (type, path, args = {}, asyncRequest = true) {
    return new Promise(function (resolve, reject) {
        const xhr = new window.XMLHttpRequest()
        xhr.open(type, path, asyncRequest)

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        // Pack the headers of the asynchronous request
        Object.keys(headers).forEach(header => {
            xhr.setRequestHeader(header, headers[header])
        })

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.responseText)
            } else {
                // error handling
                console.error('Request to API.', JSON.stringify({
                    status: this.status,
                    statusText: xhr.statusText
                }))
                reject(new Error(xhr.statusText))
            }
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log(xhr)
                GLOBAL_BOX = xhr.responseText;
            }
        }
        // error handling
        xhr.onerror = function () {
            console.error('Fail requesting API:', {
                status: this.status,
                statusText: xhr.statusText
            })

            reject(new Error(xhr.statusText))
        }
        console.log(args);
        xhr.send(JSON.stringify(args))
    })
}

export default clientapi

export const API_ROOT = ' https://cyc3m9vgg7.execute-api.eu-central-1.amazonaws.com/live/'
export let GLOBAL_BOX = ''