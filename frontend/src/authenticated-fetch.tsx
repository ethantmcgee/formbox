import { toast } from 'react-toastify'

function sendData<T>(method: string, url: string, body: any, token: string | null): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    fetch(url,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && {'Authorization': `Bearer ${token}`})
      },
      method: method,
      ...(body && {body: JSON.stringify(body)})
    })
    .then((res) => res.json())
    .then((data) => resolve(data))
    .catch((e) => {
      toast.error("Connection Error")
      window.location.assign("/logout");
      reject(e)
    });
  });
}

export function get<T>(url: string, token: string | null) : Promise<T> {
  return sendData("GET", url, null, token);
}

export function post<T>(url: string, body: any, token: string | null) : Promise<T> {
  return sendData("POST", url, body, token);
}

export function put<T>(url: string, body: any, token: string | null) : Promise<T> {
  return sendData("PUT", url, body, token);
}

export function del<T>(url: string, body: any, token: string | null) : Promise<T> {
  return sendData("DELETE", url, body, token);
}