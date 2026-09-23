/*
 * Demo data for the MOA POINT (모아포인트) landing page.
 * 모아포인트는 가상의 브랜드입니다. 제휴사, 회원, 잔액, 거래 내역은
 * 모두 데모용으로 지어낸 허구의 정보입니다.
 */

/* Partner wall — grouped so the list reads as categories, not a dump */
export const PARTNER_GROUPS = [
  {
    icon: "bag",
    label: "쇼핑·백화점",
    brands: ["라온백화점", "모아ON", "누리면세점", "테크포레", "모아홈쇼핑"],
  },
  {
    icon: "store",
    label: "마트·편의점",
    brands: ["모아마트", "모아슈퍼", "365스토어"],
  },
  {
    icon: "food",
    label: "외식·카페",
    brands: ["버거하우스", "카페누리", "크림도넛"],
  },
  {
    icon: "plane",
    label: "여행·레저",
    brands: ["라온호텔", "라온리조트", "드림월드", "시네모아"],
  },
  {
    icon: "bank",
    label: "금융·생활",
    brands: ["모아카드", "모아렌탈", "한강손해보험"],
  },
] as const;

/* Phone mock — home screen activity (fictional member) */
export const RECENT_ACTIVITY = [
  { id: "a1", place: "모아마트", detail: "결제 적립", points: "+423P" },
  { id: "a2", place: "365스토어", detail: "포인트 사용", points: "-3,000P" },
  { id: "a3", place: "카페누리", detail: "결제 적립", points: "+87P" },
] as const;

/* Phone mock — full history tab */
export const TRANSACTIONS = [
  { id: "t1", place: "모아마트", kind: "적립", points: "+423P", date: "오늘" },
  { id: "t2", place: "365스토어", kind: "사용", points: "-3,000P", date: "어제" },
  { id: "t3", place: "모아ON", kind: "적립", points: "+1,560P", date: "3일 전" },
  { id: "t4", place: "시네모아", kind: "사용", points: "-12,000P", date: "5일 전" },
  { id: "t5", place: "버거하우스", kind: "적립", points: "+96P", date: "지난주" },
] as const;

/* Earn demo — a day of spending: market → café → online mall.
   Rates are illustrative demo values, not real partner terms. */
export const EARN_ROWS = [
  {
    place: "모아마트",
    moment: "오전 · 장보기",
    spent: "42,300원 결제",
    rate: "1% 적립",
    points: 423,
  },
  {
    place: "카페누리",
    moment: "오후 · 카페",
    spent: "4,500원 결제",
    rate: "2% 적립",
    points: 90,
  },
  {
    place: "모아ON",
    moment: "저녁 · 온라인 쇼핑",
    spent: "32,000원 결제",
    rate: "0.5% 적립",
    points: 160,
  },
] as const;

export const MOA_FAQS = [
  {
    q: "모아포인트 가입은 무료인가요?",
    a: "네. 앱이나 홈페이지에서 휴대폰 본인 인증 한 번이면 바로 가입되고, 발급이나 사용에 수수료는 없습니다.",
  },
  {
    q: "포인트는 언제까지 쓸 수 있나요?",
    a: "적립일로부터 5년간 유효합니다. 유효기간이 지난 포인트는 순차적으로 소멸되니, 앱에서 소멸 예정 알림을 켜두면 좋습니다.",
  },
  {
    q: "1포인트도 사용할 수 있나요?",
    a: "모아 제휴 대부분의 매장에서는 1포인트(1원)부터 사용할 수 있습니다. 일부 매장은 최소 사용 단위가 다를 수 있으니 매장 안내를 확인해 주세요.",
  },
  {
    q: "온라인 쇼핑에서도 적립되나요?",
    a: "모아ON, 라온백화점몰 같은 온라인 몰은 로그인만 하면 자동으로 연동됩니다. 결제 단계에서 포인트 사용도 바로 할 수 있습니다.",
  },
  {
    q: "실물 카드가 없어도 되나요?",
    a: "네. 앱의 멤버십 바코드를 보여주면 적립과 사용이 모두 됩니다. 자주 쓰는 매장은 바코드를 위젯으로 꺼내두면 더 빠릅니다.",
  },
  {
    q: "포인트를 다른 사람에게 줄 수 있나요?",
    a: "앱의 포인트 선물하기 기능으로 다른 모아포인트 회원에게 보낼 수 있습니다. 받는 분이 회원이어야 선물이 완료됩니다.",
  },
] as const;
