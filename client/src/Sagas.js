import {takeEvery, call, put } from 'redux-saga/effects'
import Client from './Client';
import * as Actions from './Actions'


function* fetchSearchData(action) {
  const searchData = yield call(Client.search, action.payload.text);
  let jsonObject = JSON.parse(searchData);
  console.log('====================================');
  console.log(jsonObject);
  console.log('====================================');
  const result = yield put(Actions.changeSearchData(jsonObject));
  
  return result;
}

function* watchFetchSearchData(){
  yield takeEvery("FETCH_SEARCH_DATA", fetchSearchData);
}
export default watchFetchSearchData;
