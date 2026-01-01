# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chrome Manifest V3 확장 프로그램. YouTube 영상 페이지에서 Gemini AI로 영상 내용을 테이블로 추출.

## Architecture

- **popup.js/html/css**: 확장 프로그램 팝업 UI. YouTube 페이지에서 영상 URL 추출 후 프롬프트와 함께 Gemini 팝업 윈도우 실행
- **gemini-inject.js**: gemini.google.com에 주입되는 content script. URL 해시에서 프롬프트를 읽어 입력 필드에 자동 삽입

## Data Flow

1. popup.js가 현재 탭에서 YouTube URL 추출
2. 사용자 프롬프트와 URL을 조합해 `gemini.google.com/app#prompt=...` 형태로 팝업 윈도우 실행
3. gemini-inject.js가 해시에서 프롬프트 파싱 후 Gemini 입력 필드에 주입

## Development

```bash
# 테스트: chrome://extensions → 개발자 모드 → 압축해제된 확장 프로그램 로드
# 변경 후 확장 프로그램 새로고침 버튼 클릭
```

## Key Constraints

- Gemini API 미사용 (API 키 불필요)
- YouTube 페이지(`youtube.com/watch`)에서만 동작
- `chrome.windows.create()`로 팝업 윈도우 생성
