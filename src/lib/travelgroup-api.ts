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

// 토큰 만료 시 처리 함수
export const handleTokenExpired = () => {
  // 모든 쿠키 삭제
  alert("인증 토큰이 만료되었어요.");
  document.cookie.split(";").forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; max-age=0; path=/;`;
  });

  // 로컬 스토리지 비우기
  localStorage.clear();

  // 로그인 페이지로 이동
  window.location.href = "/login";
};

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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error leaving group:", error);
    throw error;
  }
};

// 9. 여행 지역(도) 저장
export const saveLocationDo = async (ldIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.post(
      `/travelgroups/${grIdx}/travel/location/do/${ldIdx}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error saving location:", error);
    throw error;
  }
};

// 10. 여행 지역(시) 목록 가져오기
export const getLocationSiList = async (ldIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get(
      `/travelgroups/${grIdx}/travel/location/do/${ldIdx}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error fetching location list:", error);
    throw error;
  }
};

// 11. 여행 지역(시) 저장
export const saveLocationSi = async (lsIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.post(
      `/travelgroups/${grIdx}/travel/location/do/si/${lsIdx}`
    );
    window.location.href = "/travelgroups/travel/period";
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error saving city location:", error);
    throw error;
  }
};

// 랜덤 여행지 저장
export const saveRandomTravel = async (ldIdx: number, lsIdx: number) => {
  try {
    // saveLoactionDo 의 요청, saveLocationSi 의 요청 두번 보내기
    const grIdx = localStorage.getItem("grIdx");
    const response1 = await api.post(
      `/travelgroups/${grIdx}/travel/location/do/${ldIdx}`
    );
    const response2 = await api.post(
      `/travelgroups/${grIdx}/travel/location/do/si/${lsIdx}`
    );

    console.log(response1.data);
    console.log(response2.data);
    return response1.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error saving random travel:", error);
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
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
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error fetching travel:", error);
    throw error;
  }
};

// 랜덤 여행지 추천
export const getRandomTravel = async () => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get(
      `/travelgroups/${grIdx}/travel/location/random`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error fetching random travel:", error);
    throw error;
  }
};

// 여행지 삭제
export const deleteTravel = async (trIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.delete(`/travelgroups/${grIdx}/travel/${trIdx}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error deleting travel:", error);
    throw error;
  }
};

// 여행 장소 목록 가져오기
export const getTourSpotList = async (
  page: number,
  size: number,
  lsIdx: number,
  ldIdx: number,
  tsName: string,
  c1Code: string
) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get(
      `/travelgroups/${grIdx}/travel/location/tour-spots`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          page,
          size,
          lsIdx,
          ldIdx,
          tsName,
          c1Code,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error fetching tour spot list:", error);
    throw error;
  }
};

// 여행 장소 추가
export const saveTourSpot = async (tsIdxList: number[], scDate: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const trIdx = localStorage.getItem("trIdx");

    const scheduleList = tsIdxList.map((tsIdx) => ({
      scDate,
      trIdx,
      tsIdx,
    }));

    console.log("scheduleList:", scheduleList); // 배열 형태로 확인

    // 바로 scheduleList 배열을 전송
    const response = await api.post(
      `/travelgroups/${grIdx}/travel/${trIdx}/schedule`,
      scheduleList, // scheduleDTOList 없이 배열만 전송
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error saving tour spot:", error);
    throw error;
  }
};

// 일정 시간 변경
// /travelgroups/{grIdx}/travel/{trIdx}/schedule
// JSON 형식으로
export const editScheduleTime = async (
  scIdx: number,
  scStartTime: string,
  scEndTime: string
) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const trIdx = localStorage.getItem("trIdx");

    const response = await api.patch(
      `/travelgroups/${grIdx}/travel/${trIdx}/schedule`,
      {
        scIdx,
        scStartTime,
        scEndTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error editing schedule time:", error);
    throw error;
  }
};

// 일정 삭제
// /travelgroups/{grIdx}/travel/{trIdx}/schedule/{scIdx}
export const deleteSchedule = async (scIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const trIdx = localStorage.getItem("trIdx");
    const response = await api.delete(
      `/travelgroups/${grIdx}/travel/${trIdx}/schedule/${scIdx}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error deleting schedule:", error);
    throw error;
  }
};

// 랜덤 여행지 미리보기
export const getRandomTravelPreview = async (ldIdx: number, lsIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const response = await api.get(
      `/travelgroups/${grIdx}/travel/location/random/preview`,
      {
        params: {
          ldIdx,
          lsIdx,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error fetching random travel preview:", error);
    throw error;
  }
};

// 여행록 등록
export const saveTravelogue = async (
  tlTitle: string,
  tlContent: string,
  setTlImage: FileList,
  tlPublicBool: boolean
) => {
  try {
    let tlPublic = "0";
    if (tlPublicBool) {
      tlPublic = "1";
    }

    const grIdx = localStorage.getItem("grIdx");
    const trIdx = localStorage.getItem("trIdx");

    // grIdx와 trIdx가 null인 경우 처리
    if (!grIdx || !trIdx) {
      throw new Error("Group or travel index is missing");
    }

    console.log("setTlImage:", setTlImage);
    console.log("setTlImage[0]:", setTlImage[0]);

    const formData = new FormData();
    formData.append("tlTitle", tlTitle);
    formData.append("tlContent", tlContent);
    formData.append("tlPublic", tlPublic);
    formData.append("trIdx", trIdx);
    formData.append("setTlImage", setTlImage[0]);

    const response = await api.post(
      `/travelgroups/${grIdx}/travel/${trIdx}/travelogue`,
      formData
    );

    window.location.href = "/travelgroups/travel/get";

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving travelogue:", error);
    throw error;
  }
};

// 여행록 삭제
export const deleteTravelogue = async (tlIdx: number) => {
  try {
    const grIdx = localStorage.getItem("grIdx");
    const trIdx = localStorage.getItem("trIdx");
    const response = await api.delete(
      `/travelgroups/${grIdx}/travel/${trIdx}/travelogue/${tlIdx}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error deleting travelogue:", error);
    throw error;
  }
};

// 공개 여행록 목록 가져오기
///travelogues?page&size
export const getPublicTravelogueList = async (page: number, size: number) => {
  try {
    const response = await api.get("/travelogues", {
      params: { page, size },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      handleTokenExpired();
    }
    console.error("Error fetching public travelogue list:", error);
    throw error;
  }
}

