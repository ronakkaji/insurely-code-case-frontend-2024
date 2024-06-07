import classNames from 'classnames';

import { CompanyLogo, ParagraphCaption, IconDownload, Button, HeadlineFour } from '@insurely/ui';

import { InsuranceResponse } from 'types/insurance';
import { wash } from 'utils/insurance';
import { useFormatMessage } from 'hooks/useFormatMessage';
import { InsuranceDetail } from 'components/InsuranceDetail/InsuranceDetail';
import { InsuranceParameters } from 'components/InsuranceParameters/InsuranceParameters';
import { Page } from 'components/Page/Page';

import styles from './insurancePage.module.css';

interface InsurancePageProps {
  title: string;
  insurance: InsuranceResponse;
  className?: string;
}

export const InsurancePage = ({ title, insurance, className }: InsurancePageProps) => {
  const formatMessage = useFormatMessage();
  const { insurance: insuranceDetails, termsUrl } = insurance;

  return (
    <Page title={title} goback>
      <div className={classNames(styles.container, className)}>
        <div className={styles.insuranceHeader}>
          <CompanyLogo company={insuranceDetails.insuranceCompany} width="36px" />
          <div className={styles.insuranceName}>
            <ParagraphCaption>{wash(insurance.displayType)}</ParagraphCaption>
            <HeadlineFour>{insuranceDetails.insuranceName}</HeadlineFour>
          </div>
        </div>
        <Button variant="secondary">
          <div className={styles.downloadButton}>
            <IconDownload width="24px" />
            {formatMessage('Download insurance data')}
          </div>
        </Button>
        <div className={styles.insuranceContent}>
          <InsuranceDetail data={insurance.insurance} />
          <InsuranceParameters parameters={insurance.parameters} termsUrl={termsUrl} />
        </div>
      </div>
    </Page>
  );
};
