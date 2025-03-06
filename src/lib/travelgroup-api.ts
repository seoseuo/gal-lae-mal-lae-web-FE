import axios, { AxiosError } from "axios";
import Cookies from "js-cookie"; // js-cookie 라이브러리 사용

// 환경 변수에서 API 주소 가져오기
const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함하려면 true로 설정
});

// 쿠키에서 accessToken, refreshToken 가져오기
const getAuthTokens = () => {
  // const accessToken = Cookies.get("accessToken");
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YW5uYWdvIiwiZXhwIjoxNzQxMjQ5MDIzLCJVU05BTUUiOiLquYDsnbjsp4EiLCJVU0VNQUlMIjoiZ2Ftc3RAbmF2ZXIuY29tIiwiVVNJRFgiOjIsIlVTUFJPRklMRSI6InByb2ZpbGUucG5nIiwiVVNTVEFURSI6MX0.cYeZmI2qIu6W1I5HQfymoUdf8OYIHlUqXbya3R7Iuzk";
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
    const response = await api.post("/travelgroups", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    location.href = "/travelgroups";
  } catch (error) {
    console.error("Error posting group:", error);
    throw error;
  }
};

export async function getGroup(grIdx: number) {
  console.log("getGroup 호출");
  console.log(grIdx);
  try {
    const response = await api.get("/travelgroups/" + grIdx);
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      console.error("Error:", error.response.data.message);
    }
    throw error;
  }
}

export const searchUser = async (usEmail: string) => {
  try {
    console.log("searchUser 호출 , usEmail : ", usEmail);
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get("/travelgroups/search", {
      params: {
        usEmail: usEmail,
        grIdx: grIdx,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting group:", error);
    throw error;
  }
};

export const inviteUser = async (usIdx: number) => {
  try {
    console.log("inviteUser 호출");
    console.log(usIdx);
    const selectedUser = document.getElementById(usIdx.toString());
    selectedUser?.remove();
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.patch(
      "/travelgroups/" + grIdx + "/invite/" + usIdx
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting group:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/users/me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting me:", error);
    throw error;
  }
};

export const updateAdmin = async (usIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.patch(
      "/travelgroups/" + grIdx + "/admin/" + usIdx
    );
    console.log(response.data);
    getGroup(parseInt(grIdx || "0"));
    return response.data;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

export const leaveGroup = async () => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.patch("/travelgroups/" + grIdx + "/leave");
    console.log(response.data);
    window.location.href = "/travelgroups";
  } catch (error) {
    console.error("Error leaving group:", error);
    throw error;
  }
};

export const saveLocationDo = async (ldIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.post(
      "/travelgroups/" + grIdx + "/travel/location/do/" + ldIdx
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error leaving group:", error);
    throw error;
  }
};

export const getLocationSiList = async (ldIdx: number) => {
  try {
    console.log("getLocationSiList 호출");
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get(
      "/travelgroups/" + grIdx + "/travel/location/do/" + ldIdx
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error leaving group:", error);
    throw error;
  }
};

export const saveLocationSi = async (lsIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.post(
      "/travelgroups/" + grIdx + "/travel/location/do/si/" + lsIdx
    );
    console.log(response.data);
    window.location.href = "/travelgroups";
    return response.data;
  } catch (error) {
    console.error("Error leaving group:", error);
    throw error;
  }
};

export const savePeriod = async (trStartTime: string, trEndTime: string) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.post(
      "/travelgroups/" + grIdx + "/travel/period",
      {
        grIdx: grIdx, // 그룹 인덱스 추가
        trStartTime: trStartTime, // 여행 시작 시간
        trEndTime: trEndTime, // 여행 종료 시간
      }
    );
    console.log(response.data);
    window.location.href = "/travelgroups";
    return response.data;
  } catch (error) {
    console.error("Error leaving group:", error);
    throw error;
  }
};
