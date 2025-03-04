import axios, { AxiosError } from "axios";
import Cookies from "js-cookie"; // js-cookie 라이브러리 사용


// 환경 변수에서 API 주소 가져오기
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함하려면 true로 설정
});

// 쿠키에서 accessToken, refreshToken 가져오기
const getAuthTokens = () => {
  // const accessToken = Cookies.get("accessToken");
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YW5uYWdvIiwiZXhwIjoxNzQxMDg5MDA4LCJVU05BTUUiOiLquYDsnbjsp4EiLCJVU0VNQUlMIjoiZ2Ftc3RAbmF2ZXIuY29tIiwiVVNJRFgiOjIsIlVTUFJPRklMRSI6InByb2ZpbGUucG5nIiwiVVNTVEFURSI6MX0.uImpKAXVQz83QasTUFRZ5bjM3YrAd-mfWTM9L_WBcT4";
  const refreshToken = Cookies.get("refreshToken");
  return { accessToken, refreshToken };
};

// Axios 요청 시, 토큰을 헤더에 설정
api.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthTokens();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 내 모임 목록 조회
export async function getTravelGroupList() {
  try {
    const response = await api.get("/travelgroups"); // /travelgroups API 호출
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {      
      console.error("Error:", error.response.data.message);
    }
    throw error;
  }
}

export const postGroup = async (formData: FormData) => {
  try {
    console.log("postGroup 호출");
    console.log(formData);
    const response = await api.post('/travelgroups', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data); 
    location.href = '/travelgroups';
  } catch (error) {
    console.error('Error posting group:', error);
    throw error;
  }
};

export async function getGroup(grIdx: number) {
  console.log("getGroup 호출");
  console.log(grIdx);
  try {
    const response = await api.get("/travelgroups/"+grIdx); 
    console.log(response.data);    
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {      
      console.error("Error:", error.response.data.message);
    }
    throw error;
  }
}
