import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TASKS_API_URL } from "../../utils/apiUrl";
import { getRequest } from "../../utils/requestMethods";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFulfilled("getItemsData")) //요청 성공 시
      .addCase(fetchGetItemsData.rejected, handleRejected); //요청 실패시
  },
}); //Slice 객체 저장

export default apiSlice.reducer;
