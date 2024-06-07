import { HeadlineEight, ParagraphCaption } from '@insurely/ui';
import styles from './insuranceDetailRow.module.css';

export const InsuranceDetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => {
  return (
    <div className={styles.row}>
      <ParagraphCaption>{label}</ParagraphCaption>
      <HeadlineEight>{value}</HeadlineEight>
    </div>
  );
};
