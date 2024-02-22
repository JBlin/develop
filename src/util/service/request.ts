import axios from 'axios';
import { useUserStore } from '@/stores/user.store';
const userStore = useUserStore();

// const tokenKey = 'metam-token';

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

// Add a response interceptor
instanceAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    const response = error?.response;
    if (response?.status == 401) {
      alert(response?.data?.msg);
      userStore.resetUser();
      window.location.href = '/';
    } else {
      return Promise.reject(error);
    }
  }
);

const post = (url: string, params?: any, token?: string) => {
  return token
    ? instanceAxios.post(url, params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + token
        }
      })
    : instanceAxios.post(url, params);
};

const get = (url: string, params?: any, token?: string) => {
  const queryString =
    params &&
    Object.keys(params)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');
  let urlForm = url;
  if (queryString?.length > 0) {
    urlForm = urlForm + '?' + queryString;
  }
  return token
    ? instanceAxios.get(urlForm, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    : instanceAxios.get(urlForm);
};

const get_download = (url: string, params?: any, token?: string) => {
  const queryString =
    params &&
    Object.keys(params)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');
  let urlForm = url;
  if (queryString?.length > 0) {
    urlForm = urlForm + '?' + queryString;
  }
  return token
    ? instanceAxios.get(urlForm, {
        headers: {
          Authorization: 'Bearer ' + token
        },
        responseType: 'blob'
      })
    : instanceAxios.get(urlForm);
};

const post_upload = (url: string, form?: FormData, token?: string) => {
  return token
    ? instanceAxios.post(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token
        }
      })
    : instanceAxios.post(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
};

const post_params = (url: string, params?: URLSearchParams, token?: string) => {
  return token
    ? instanceAxios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + token
        }
      })
    : instanceAxios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
};

const put = (url: string, params?: any, token?: string) => {
  return token
    ? instanceAxios.put(url, params, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    : instanceAxios.put(url, params);
};

const del = (url: string, params?: any, token?: string) => {
  return token
    ? instanceAxios.delete(url, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    : instanceAxios.delete(url, params);
};

export { post, get, get_download, put, del, post_upload, post_params };
