import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiRequest, apiResponse, apiError } from './user.slice';
import axios, { AxiosResponse } from 'axios';
import { API } from './user.api';

export default function* saga() {
  yield takeEvery(apiRequest.type,
    function* (action: PayloadAction<{ key: string, query?: Object, body?: Object, path?: { [index: string]: string } }>) {
      try {
        const { key, query, body, path } = action.payload;
        let endpoint = API[key].endpoint;
        if (path) {
          for (const pathItem of Object.keys(path)) {
            endpoint = endpoint.replace(pathItem, path[pathItem]);
          }
        }
        let response: AxiosResponse;
        switch (API[key].method) {
          case 'GET':
            response = yield call(() =>
              axios.get(endpoint, {
                params: { ...query }
              })
            );
            yield put({ type: apiResponse.type, response: response.data, key });
            break;
          case 'POST':
            response = yield call(() =>
              axios.post(endpoint, { ...body }, {
                params: { ...query }
              })
            );
            yield put({ type: apiResponse.type, response: response.data, key });
            break;
          case 'PUT':
            response = yield call(() =>
              axios.put(endpoint, { ...body }, {
                params: { ...query }
              })
            );
            yield put({ type: apiResponse.type, response: response.data, key });
            break;
          case 'DELETE':
            response = yield call(() =>
              axios.delete(endpoint, {
                params: { ...query }
              })
            );
            yield put({ type: apiResponse.type, response: response.data, key });
            break;
          default:
            break;
        }
      } catch (e) {
        yield put({ type: apiError.type, message: JSON.stringify(e) });
      }
    });
}
