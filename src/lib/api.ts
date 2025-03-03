import axios from "axios";

// 환경 변수에서 API 주소 가져오기
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Axios 기본 설정
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET 요청 예제
export async function fetchData() {
  const response = await api.get("/data");
  return response.data;
}

// POST 요청 예제
export async function postData(data: any) {
  const response = await api.post("/data", data);
  return response.data;
}
