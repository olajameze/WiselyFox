import { CertificateRecord } from "@/features/learning/services/certificate.service";
import printStyles from "@/features/parent/ui/print.module.css";

type Props = {
  certificate: CertificateRecord;
};

export function CertificateView({ certificate }: Props) {
  const isQuiz = certificate.type === "quiz";

  return (
    <article className={printStyles.certificate}>
      <div className={printStyles.certificateRibbon} aria-hidden="true" />
      <p className={printStyles.printMeta}>WiselyFox Certificate of Achievement</p>
      <h1 className={printStyles.certificateTitle}>Certificate of Achievement</h1>
      <p>This certifies that</p>
      <p className={printStyles.certificateName}>{certificate.childName}</p>
      {isQuiz ? (
        <p>
          has successfully passed the <strong>{certificate.title}</strong> examination with a score of{" "}
          <strong>{certificate.score}%</strong>
          {certificate.correct != null && certificate.total != null && (
            <> ({certificate.correct} of {certificate.total} correct)</>
          )}
          .
        </p>
      ) : (
        <p>
          has successfully completed all lessons in <strong>{certificate.title}</strong>.
        </p>
      )}
      <p className={printStyles.printMeta}>
        Awarded on{" "}
        {certificate.completedAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
      </p>
      <span className={printStyles.certificateSeal}>{certificate.certificateCode}</span>
      <p className={printStyles.certificateVerify}>
        Verify at wiselyfox.app{`/api/certificates/verify?code=${certificate.certificateCode}`}
      </p>
    </article>
  );
}
