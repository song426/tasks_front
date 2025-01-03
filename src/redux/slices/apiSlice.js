import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_TASKS_API_URL,
  DELETE_TASK_API_URL,
  POST_TASK_API_URL,
  UPDATE_TASK_API_URL,
  UPDATE_COMPLETED_TASK_API_URL,
} from "../../utils/apiUrl";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
} from "../../utils/requestMethods";

const updateItemFecthThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    // console.log(apiURL, userId);
    const options = {
      body: JSON.stringify(updateData),
    };
    return await putRequest(apiURL, options);
  });
};

//Update Item data
export const fetchUpdateItemData = updateItemFecthThunk(
  "fetchUpdateItem", //action type
  UPDATE_TASK_API_URL //요청 URL
); //thunk 함수 호출

const getItemsFecthThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

// get Items data
export const fetchGetItemsData = getItemsFecthThunk(
  "fetchGetItems", //action type
  GET_TASKS_API_URL //요청 URL
); //thunk 함수 호출

const deleteItemsFecthThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    // console.log(apiURL, userId);
    const options = {
      method: "DELETE",
    };
    const fullPath = `${apiURL}/${id}`;
    return await deleteRequest(fullPath, options);
  });
};

// delete item
export const fetchDeleteItemData = deleteItemsFecthThunk(
  "fetchDeleteItem",
  DELETE_TASK_API_URL
);

// post thunk function 정의
const postItemsFecthThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    // console.log(postData);
    const options = {
      body: JSON.stringify(postData), //표준 json 문자열로 변환
    };
    return await postRequest(apiURL, options);
  });
};

// post item
export const fetchPostItemData = postItemsFecthThunk(
  "fetchPostItem",
  POST_TASK_API_URL
);

// update completed thunk function 정의
const updateCompletedFecthThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (completedData) => {
    console.log(completedData);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completedData), //표준 json 문자열로 변환
    };
    return await patchRequest(apiURL, options);
  });
};

// update completed item
export const fetchUpdateCompletedData = updateCompletedFecthThunk(
  "fetchUpdateCompletedItem",
  UPDATE_COMPLETED_TASK_API_URL
);

// handleFulfilled 함수 정의 : 요청 성공 시 상태 업데이트 로직을 별도의 함수로 분리
const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

// handleRejected 함수 정의 : 요청 실패 시 상태 업데이트 로직을 별도의 함수로 분리
const handleRejected = (state, action) => {
  console.log("Error", action.payload);
  state.isError = true;
};

// create Slice
const apiSlice = createSlice({
  name: "apis", //slince 기능 이름
  initialState: {
    // 초기 상태 지정
    getItemsData: null,
    deleteItemData: null,
    fetchPostItem: null,
    updateItemData: null,
    updateCompletedItemData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFulfilled("getItemsData"))
      .addCase(fetchGetItemsData.rejected, handleRejected)
      .addCase(fetchDeleteItemData.fulfilled, handleFulfilled("deleteItemData"))
      .addCase(fetchDeleteItemData.rejected, handleRejected)
      .addCase(fetchPostItemData.fulfilled, handleFulfilled("postItemData"))
      .addCase(fetchPostItemData.rejected, handleRejected)
      .addCase(fetchUpdateItemData.fulfilled, handleFulfilled("updateItemData"))
      .addCase(fetchUpdateItemData.rejected, handleRejected)
      .addCase(
        fetchUpdateCompletedData.fulfilled,
        handleFulfilled("updateCompletedItemData")
      )
      .addCase(fetchUpdateCompletedData.rejected, handleRejected);
  },
}); //Slice 객체 저장

export default apiSlice.reducer;
