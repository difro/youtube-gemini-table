# YouTube Gemini Table Extractor

YouTube 영상 페이지에서 Gemini AI를 활용해 영상 내용을 테이블 형식으로 추출하는 Chrome 확장 프로그램입니다.

## 기능

- YouTube 영상 페이지에서만 동작
- 현재 영상 URL과 사용자 프롬프트를 Gemini에 전달
- 팝업 윈도우로 Gemini 페이지를 열어 자동으로 프롬프트 입력

## 설치 방법

1. 이 저장소를 클론하거나 다운로드
   ```bash
   git clone https://github.com/difro/youtube-gemini-table.git
   ```

2. Chrome에서 `chrome://extensions` 열기

3. 우측 상단 **"개발자 모드"** 활성화

4. **"압축해제된 확장 프로그램을 로드합니다"** 클릭

5. 다운로드한 폴더 선택

## 사용 방법

1. YouTube 영상 페이지로 이동
2. 확장 프로그램 아이콘 클릭
3. 프롬프트 입력 (예: "이 영상에서 언급된 제품들을 테이블로 정리해줘")
4. **"Gemini에서 열기"** 버튼 클릭
5. Gemini 팝업 윈도우가 열리면서 자동으로 프롬프트가 입력됨

## 파일 구조

```
├── manifest.json       # Chrome 확장 프로그램 설정 (Manifest V3)
├── popup.html/js/css   # 확장 프로그램 팝업 UI
├── gemini-inject.js    # Gemini 페이지 프롬프트 자동 입력
└── icons/              # 아이콘
```

## 요구사항

- Google Chrome 브라우저
- Google 계정 (Gemini 사용을 위해)

## License

MIT
