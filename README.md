<img src="https://github.com/user-attachments/assets/04d58dd4-1556-4bfa-b158-355bed77e5c8" style="width: 250px; height: 250px;" />

### 갈래말래
> 갈래말래, 여행 모임 일정 관리 및 장소 추천 커뮤니티 웹 서비스

<a href="https://chivalrous-saffron-326.notion.site/1d10ba93975b8086a976d70dd9224326?pvs=4"><img src="https://img.shields.io/badge/Notion 보기 링크-E6E6E6?style=for-the-badge&logo=notion&logoColor=black" /></a>
<a href="https://chivalrous-saffron-326.notion.site/1d10ba93975b8086a976d70dd9224326?pvs=4"><img src="https://img.shields.io/badge/갈래말래(모바일 권장)-490085?style=for-the-badge&&logoColor=black" /></a>
<hr>

# 개요

![image](https://github.com/user-attachments/assets/fd77f06d-4228-48c4-91ed-ef48591f0280)


![image](https://github.com/user-attachments/assets/63569d05-3bd1-412c-99e2-303af34c98ac)


# 주요 기능

## JWT 토큰

![image](https://github.com/user-attachments/assets/b34fff96-ec97-40f1-8428-c0191e069c1f)


> JWT 토큰 기반 인증 방식 도입으로 사용자 인증 및 보안 강화
> 

## 모임 여행 생성 및 관리

![image](https://github.com/user-attachments/assets/653abd88-27f0-4729-8218-cee7888174b3)


> 모임 여행 생성 시, 각 도/시 단계별 데이터를 Redis에 순차적으로 저장 처리
> 

# 기술

## 스택

![image](https://github.com/user-attachments/assets/8a5d083d-f686-4fbc-83a7-f3e19a16f095)


## 아키텍처

### 시스템

![image](https://github.com/user-attachments/assets/0e2bdb27-7e75-483b-9651-e305ae782395)


> AWS EC2 프론트엔드와 백엔드를 Docker 컨테이너로 분리 배포하고, Nginx를 통해 통합 관리
> 

### API 서버

![image](https://github.com/user-attachments/assets/5d274ab2-c768-42a0-a84d-586ca3d0c507)


> JPA 기반 Entity-Mapper-Repository 설계를 활용하여 도메인 중심 데이터 처리 구현
Spring Boot 기반 모듈화 된 설계로 확장성과 유지 보수성을 강화한 웹 서비스 제작
> 

### Spring Security

![image](https://github.com/user-attachments/assets/b55c3b74-6c79-46f3-be23-42ea025d1443)


> Spring Security 기반 역할 권한 설정으로 민감 정보 보호 및 접근 제어 구현
프론트엔드와 백엔드 분리 운영에 따른 CORS 정책 설정 및 도메인 허용 처리
> 

### PWA

![image](https://github.com/user-attachments/assets/d9093451-b031-4f43-9b70-22840b976485)


> 웹 어플리케이션을 PWA(Progressive Web App)로 변환하여 모바일 앱 환경 타겟팅
> 

## DevOps

![image](https://github.com/user-attachments/assets/6e69f267-8654-4ec6-99e9-6bb00cdf8c0a)


> Git Flow 전략(Main, Develop 브랜치 기반)을 따르며 체계적인 버전 관리 및 협업 환경 유지
> 

**FE**

![image](https://github.com/user-attachments/assets/355003ac-2b06-4bbe-8407-505ef952ccda)


**BE**

![image](https://github.com/user-attachments/assets/95230249-0e9f-4749-bbe8-02faffff2ce4)


> GitHub Action 기반 CI/CD 파이프라인 구축으로 코드 Push 시 Docker 이미지 빌드 및 EC2 배포 자동화
> 

| 약어  | 이름                               | 뜻                                                                 |
|-------|------------------------------------|----------------------------------------------------------------------|
| **CI** | **C**ontinuous **I**ntegration     | **지속적 통합**: 개발자들이 변경한 코드를 자주(매일 여러 번) **자동으로 빌드하고 테스트**하는 것 |
| **CD** | **C**ontinuous **D**elivery 또는 **C**ontinuous **D**eployment | **지속적 전달** 또는 **지속적 배포**: CI 이후, **자동으로 배포 가능한 상태**로 만들거나 실제로 **자동 배포**까지 하는 것<br>• Docker를 활용한 백엔드 서비스 컨테이너화로 환경 일관성 및 배포 효율성 확보 |


## 테스트 및 검증 도구

### Postman

![image](https://github.com/user-attachments/assets/6bb7ee63-0567-4054-84ad-34397897f077)


> API 서버 제작 과정 시 Postman을 이용한 API 테스트 및 검증으로 개발 단계에서의 오류 최소화 추구
>
