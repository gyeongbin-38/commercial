import type { Metadata } from "next";
import { MoaLegalPage } from "@/components/moapoint/legal-page";

export const metadata: Metadata = {
  title: "이용약관 | 모아포인트",
};

export default function MoaPointTermsPage() {
  return (
    <MoaLegalPage title="이용약관" updated="2025년 1월 1일">
      <p>
        이 약관은 모아멤버스 주식회사(이하 &quot;회사&quot;)가 제공하는
        모아포인트 서비스의 이용 조건을 정합니다.
      </p>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold text-[var(--moa-ink)]">
          1. 서비스 내용
        </h2>
        <p>
          회사는 제휴 매장에서 사용할 수 있는 멤버십 포인트의 적립, 사용,
          조회 서비스를 제공합니다. 포인트 1점은 1원의 가치를 가지며,
          현금으로 교환되지 않습니다.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold text-[var(--moa-ink)]">
          2. 포인트의 적립과 사용
        </h2>
        <p>
          포인트는 제휴 매장에서의 결제 금액에 따라 매장별 적립률로
          적립됩니다. 사용 가능 단위와 적립률은 제휴사별로 다를 수 있으며,
          앱 내 공지를 통해 안내합니다.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold text-[var(--moa-ink)]">
          3. 포인트의 유효기간과 소멸
        </h2>
        <p>
          포인트는 적립일로부터 5년간 유효합니다. 유효기간이 경과한
          포인트는 적립 순서에 따라 자동 소멸되며, 소멸 30일 전 앱 알림으로
          안내합니다.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold text-[var(--moa-ink)]">
          4. 회원 탈퇴
        </h2>
        <p>
          회원은 언제든 앱에서 탈퇴할 수 있으며, 탈퇴 시 잔여 포인트는
          소멸됩니다.
        </p>
      </div>
      <p className="rounded-[var(--moa-r-md)] bg-[var(--moa-bg)] px-4 py-3 text-[0.8125rem]">
        본 페이지는 가상의 브랜드를 위한 디자인 데모 문서로, 실제 법적
        효력이 없습니다.
      </p>
    </MoaLegalPage>
  );
}
