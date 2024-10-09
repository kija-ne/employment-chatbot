/* 터미널 실행방법 
1. pwd
2. cd /Users/k/Downloads/EMPLOYMENT-CHATBOT
3. ls
4. node server.js */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000;

let awaitingResumeResponse = false;
let awaitingInterviewResponse = false;
let awaitingJobResponse = false;
let awaitingMBTIResponse = false;
let awaitingCareerDevelopmentResponse = false;
let currentQuestionIndex = 0;
let jobType = '';

// 이력서 작성 가이드 함수 정의
function getResumeGuide() {
    return '이력서 작성 가이드<br><br>' +
           '1. 이력서 작성 전 브레인스토밍을 한다.<br>' +
           '- 이력서에 포함될 내용을 생각해 보고, 필터링하는 프로파일링 작업을 해봅니다.<br>' +
           '- 백지 또는 아무 노트나 꺼내 자유롭게 자신의 경험에 대해 적어보세요.<br>' +
           '- 이 작업은 이력서에 어떤 내용을 포함할지 알아보는 작업입니다.<br><br>' +
           '2. 최신 정보를 포함하세요 (예: 최근 직장, 학력 등)<br>' +
           '- 정해진 이력서 양식에 작성하여 제출하도록 요구하는 회사도 있지만, 대부분 자유 양식을 사용하도록 허용하는 곳이 많습니다.<br>' +
           '- 이력서에 자신만의 개성을 담아보는 것도 좋은 방법입니다.<br>' +
           '- 서류 합격 경험이 많은 경력 개발자들의 모범 사례를 따르는 것도 좋은 방법입니다.<br><br>' +
           '3. 경력 사항을 상세히 기재하세요 (예: 직무, 역할, 성과 등)<br>' +
           '- 일반적인 사실을 적거나, 길게 작성하는 것은 피하는 것이 좋습니다.<br>' +
           '- 직업과 관련 없는 내용을 적는 것은 추천드리지 않습니다.<br><br>' +
           '4. 맞춤법과 문법을 철저히 검사하세요.<br>' +
           '- 네이버에서 제공하는 "맞춤법 검사기" 기능을 추천드립니다.<br><br>' +
           '5. 이력서에 포함할 적절한 키워드를 사용하세요.<br>' +
           '- 자신을 잘 표현할 수 있는 문장을 한 줄로 어필하는 것이 좋습니다.<br>' +
           '- 진행했던 프로젝트들이 일관성 있다면 이것을 스토리화 시켜 하나의 제목으로 사용할 수 있습니다.<br><br>' +
           '6. PDF 형식으로 저장하고 제출하세요.<br><br>' +
           '아래는 다양한 템플릿과 작성 가이드를 제공하는 몇 가지 추천 사이트입니다.<br>' +
           '1. Job Korea (잡코리아)<br>' +
           'URL: https://www.jobkorea.co.kr/Starter/PassAssay<br><br>' +
           '2. Saramin (사람인)<br>' +
           'URL: https://www.saramin.co.kr/zf_user/tools/resume<br><br>' +
           '3. Indeed (인디드)<br>' +
           'URL: https://www.indeed.com/create-resume<br><br>' +
           '4. Canva (캔바)<br>' +
           'URL: https://www.canva.com/resumes/templates/<br><br>' +
           '5. Freepik<br>' +
           'URL: https://www.freepik.com/resume-templates<br><br>' +
           '6. Resume.com<br>' +
           'URL: https://www.resume.com/<br><br>' +
           '7. Zety<br>' +
           'URL: https://zety.com/resume-templates<br><br>' +
           '8. Microsoft Office Templates<br>' +
           'URL: https://templates.office.com/en-us/resumes-and-cover-letters<br><br>' +
           '이력서를 작성할 때 도움이 필요하면 언제든지 질문해주세요!<br>다른 기능이 필요하신가요? "네" "아니요"로 답변해주세요.<br>';
}

// 사용자가 입력한 메시지를 처리하는 함수
function processMessage(userMessage) {
    // 공백 제거 및 소문자 변환
    const cleanedMessage = userMessage.replace(/\s+/g, '').toLowerCase();

    // '이력서'와 '가이드'라는 단어가 모두 포함되면 이력서 가이드 제공
    if (cleanedMessage.includes('이력서') && cleanedMessage.includes('가이드')) {
        return getResumeGuide();
    } else if (cleanedMessage.includes('직업') || cleanedMessage.includes('선택') || cleanedMessage.includes('job')) {
        awaitingMBTIResponse = true;
        return '당신의 MBTI 유형은 무엇인가요? (예: INTJ, ENFP 등)';
    } else if (cleanedMessage.includes('채용') || cleanedMessage.includes('공고') || cleanedMessage.includes('jobposting')) {
        awaitingJobResponse = true;
        return '원하는 직무를 입력해 주세요. 실시간 채용 공고를 제공해 드리겠습니다.';
    } else if (cleanedMessage.includes('학습') || cleanedMessage.includes('자료') || cleanedMessage.includes('learning')) {
        awaitingCareerDevelopmentResponse = true;
        return '원하는 직무에 대해 입력해 주세요. 관련 학습 자료를 제공해 드립니다.';
    } else {
        return '"이력서 작성 가이드", "직업 선택", "채용 공고 제공", "학습 자료 제공" 중 하나를 입력해주세요.';
    }
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', (req, res) => {
    const userMessage = req.body.message.trim();
    const botResponse = processMessage(userMessage);
    res.json({ response: botResponse });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});