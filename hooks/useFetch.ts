import { useState, useCallback, useEffect } from 'react';

import defaultApi from '../common/base/service/mainApi';

export const useGet = <T>(initialUrl: string | undefined = undefined,
  onLoadRequest: boolean | undefined = undefined,
  initialValue: T | undefined = undefined) => {
  const [state, setState] = useState<T | undefined>(initialValue);

  useEffect(() => {
    if (onLoadRequest) {
      initialRequest();
    }
  }, []);

  const initialRequest = async () => {
    if (initialUrl) {
      const resp = await defaultApi.get<T>(initialUrl);
      setState(resp.data);
    }
  };

  const request = useCallback(async (url: string | undefined = undefined) => {
    if (!url) {
      if (initialUrl) {
        const resp = await defaultApi.get<T>(initialUrl);
        setState(resp.data);
      }
    } else {
      const resp = await defaultApi.get<T>(url);
      setState(resp.data);
    }
  }, []);

  return [state, request] as const;
};

export const usePost = <T, K>(value: K | undefined, initialUrl: string | undefined = undefined,
  onLoadRequest: boolean | undefined = undefined) => {
  const [state, setState] = useState<K | undefined>();

  useEffect(() => {
    if (onLoadRequest) {
      initialRequest();
    }
  }, []);

  const initialRequest = async () => {
    if (initialUrl) {
      const resp = await defaultApi.post<K>(initialUrl, value);
      setState(resp.data);
    }
  };

  const request = useCallback(async (
    newValue: T | undefined,
    url: string | undefined = undefined,
  ) => {
    if (!url) {
      if (initialUrl) {
        const resp = await defaultApi.post<K>(initialUrl, newValue);
        setState(resp.data);
      }
    } else {
      const resp = await defaultApi.post<K>(url, newValue);
      setState(resp.data);
    }
  }, []);

  return [state, request] as const;
};
