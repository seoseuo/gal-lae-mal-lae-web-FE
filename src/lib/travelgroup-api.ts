import axios, { AxiosError } from "axios";

// 환경 변수에서 API 주소 가져오기
const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함하려면 true로 설정 (HttpOnly 쿠키 활용)
});

// 요청 인터셉터 (JWT 토큰을 직접 헤더에 추가하지 않음)
api.interceptors.request.use(
  (config) => {
    console.log("API 요청:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (401 처리 가능)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error instanceof AxiosError && error.response) {
      console.error("API 에러:", error.response.data.message);

      // 401 Unauthorized 시, 리프레시 토큰 요청 가능 (선택적)
      if (error.response.status === 401) {
        console.warn("토큰 만료됨, 리프레시 시도...");
        try {
          await api.post("/auth/refresh"); // 서버에서 자동으로 새로운 JWT 발급
          return api(error.config); // 원래 요청 다시 시도
        } catch (refreshError) {
          console.error("리프레시 토큰 요청 실패:", refreshError);
          window.location.href = "/login"; // 로그인 페이지로 이동
        }
      }
    }
    return Promise.reject(error);
  }
);

// ==================== API 요청 함수 ====================

// 1. 내 모임 목록 조회
export async function getTravelGroupList() {
  try {
    const response = await api.get("/travelgroups");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching travel groups:", error);
    throw error;
  }
}

// 2. 모임 생성
export const postGroup = async (formData: FormData) => {
  try {
    console.log("postGroup 호출");
    const response = await api.post("/travelgroups", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    location.href = "/travelgroups";
  } catch (error) {
    console.error("Error posting group:", error);
    throw error;
  }
};

// 3. 특정 모임 조회
export async function getGroup(grIdx: number) {
  try {
    const response = await api.get(`/travelgroups/${grIdx}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching group:", error);
    throw error;
  }
}

// 4. 사용자 검색
export const searchUser = async (usEmail: string) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get("/travelgroups/search", {
      params: { usEmail, grIdx },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching user:", error);
    throw error;
  }
};

// 5. 사용자 초대
export const inviteUser = async (usIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.patch(`/travelgroups/${grIdx}/invite/${usIdx}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error inviting user:", error);
    throw error;
  }
};

// 6. 내 정보 가져오기
export const getMe = async () => {
  try {
    const response = await api.get("/users/me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// 7. 그룹 관리자 변경
export const updateAdmin = async (usIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.patch(`/travelgroups/${grIdx}/admin/${usIdx}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

// 8. 그룹 나가기
export const leaveGroup = async () => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    await api.patch(`/travelgroups/${grIdx}/leave`);
    window.location.href = "/travelgroups";
  } catch (error) {
    console.error("Error leaving group:", error);
    throw error;
  }
};

// 9. 여행 지역(도) 저장
export const saveLocationDo = async (ldIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.post(`/travelgroups/${grIdx}/travel/location/do/${ldIdx}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving location:", error);
    throw error;
  }
};

// 10. 여행 지역(시) 목록 가져오기
export const getLocationSiList = async (ldIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get(`/travelgroups/${grIdx}/travel/location/do/${ldIdx}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching location list:", error);
    throw error;
  }
};

// 11. 여행 지역(시) 저장
export const saveLocationSi = async (lsIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.post(`/travelgroups/${grIdx}/travel/location/do/si/${lsIdx}`);
    window.location.href = "/travelgroups/travel/period";
    return response.data;
  } catch (error) {
    console.error("Error saving city location:", error);
    throw error;
  }
};

// 12. 여행 기간 저장
export const savePeriod = async (trStartTime: string, trEndTime: string) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.post(`/travelgroups/${grIdx}/travel/period`, {
      grIdx,
      trStartTime,
      trEndTime,
    });
    if (grIdx) {
      window.location.href = "/travelgroups/get";
    }
    return response.data;
  } catch (error) {
    console.error("Error saving travel period:", error);
    throw error;
  }
};

// 여행지 일정 가져오기
export const getTravel = async (trIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");    
    const response = await api.get(`/travelgroups/${grIdx}/travel/${trIdx}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching travel:", error);
    throw error;
  }
};

// 랜덤 여행지 추천
export const getRandomTravel = async () => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get(`/travelgroups/${grIdx}/travel/location/random`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching random travel:", error);
    throw error;
  }
};
