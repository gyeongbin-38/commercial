import type { Metadata } from "next";
import { MoaLegalPage } from "@/components/moapoint/legal-page";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 모아포인트",
};

export default function MoaPointPrivacyPage() {
  return (
    <MoaLegalPage title="개인정보처리방침" updated="2025년 1월 1일">
      <p>
        모아멤버스 주식회사(이하 &quot;회사&quot;)는 모아포인트 서비스를
        제공하면서 이용자의 개인정보를 다음과 같이 처리합니다.
      </p>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold text-[var(--moa-ink)]">
          1. 수집하는 개인정보 항목
        </h2>
        <p>
          회사는 회원 가입 시 이름, 휴대폰 번호, 생년월일을 수집합니다.
          서비스 이용 과정에서 적립·사용 내역, 단말기 정보, 접속 로그가
          자동으로 생성되어 수집될 수 있습니다.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold text-[var(--moa-ink)]">
          2. 개인정보의 이용 목적
        </h2>
        <p>
          수집한 개인정보는 회원 식별, 포인트 적립·사용·소멸 처리, 부정 이용
          방지, 고객 문의 응대, 서비스 개선 목적으로만 이용됩니다.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold text-[var(--moa-ink)]">
          3. 보유 및 이용 기간
        </h2>
        <p>
          개인정보는 회원 탈퇴 시까지 보유하며, 관련 법령에 따라 보존이
          필요한 경우 해당 기간 동안 별도 분리 보관합니다. 포인트 거래
          기록은 전자상거래법에 따라 5년간 보관됩니다.
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-[1.0625rem] font-bold text-[var(--moa-ink)]">
          4. 이용자의 권리
        </h2>
        <p>
          이용자는 언제든 자신의 개인정보를 조회·정정할 수 있으며, 회원
          탈퇴를 통해 처리의 정지를 요청할 수 있습니다.
        </p>
      </div>
      <p className="rounded-[var(--moa-r-md)] bg-[var(--moa-bg)] px-4 py-3 text-[0.8125rem]">
        본 페이지는 가상의 브랜드를 위한 디자인 데모 문서로, 실제 법적
        효력이 없습니다.
      </p>
    </MoaLegalPage>
  );
}
