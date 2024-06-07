import { HeadlineFive } from '@insurely/ui';
import { InsuranceDetailRow } from 'components/InsuranceDetailRow/InsuranceDetailRow';
import UserContext from 'contexts/user/UserContext';
import { useFormatMessage } from 'hooks/useFormatMessage';
import { useContext } from 'react';
import { formatCurrency } from 'translations/utils';
import { InsuranceResponse } from 'types/insurance';
import { formatInsurnaceCompany, formatPostcode } from 'utils/insurance';
import styles from './insuranceDetail.module.css';

type Props = {
  data: InsuranceResponse['insurance'];
};
export const InsuranceDetail = ({ data }: Props) => {
  const formatMessage = useFormatMessage();
  const { config } = useContext(UserContext);

  const {
    premiumAmountYearRounded,
    insuranceCompany,
    insuranceName,
    renewalDate,
    insuranceNumber,
    insuranceObjectStreetAddress,
    insuranceObjectPostalCode,
    insuredMovablesAmount,
    livingArea,
    numberOfResidents,
    insuranceHolderName,
  } = data;

  return (
    <div className={styles.container}>
      <InsuranceDetailRow
        label={formatMessage('Monthly premium')}
        value={
          premiumAmountYearRounded
            ? formatCurrency(config, premiumAmountYearRounded / 12)
            : formatMessage('Unknown')
        }
      />
      <InsuranceDetailRow
        label={formatMessage('Annual premium')}
        value={
          premiumAmountYearRounded
            ? formatCurrency(config, premiumAmountYearRounded)
            : formatMessage('Unknown')
        }
      />
      <InsuranceDetailRow
        label={formatMessage('Renewal date')}
        value={renewalDate ? renewalDate : formatMessage('Unknown')}
      />

      <HeadlineFive margin="top">{formatMessage('Insurance')}</HeadlineFive>
      <InsuranceDetailRow
        label={formatMessage('Insurance number')}
        value={insuranceNumber ? insuranceNumber : formatMessage('Unknown')}
      />
      <InsuranceDetailRow
        label={formatMessage('Insurance company')}
        value={
          insuranceCompany ? formatInsurnaceCompany(insuranceCompany) : formatMessage('Unknown')
        }
      />
      <InsuranceDetailRow label={formatMessage('Insurance name')} value={insuranceName} />
      <InsuranceDetailRow
        label={formatMessage('Insurance object address')}
        value={
          insuranceObjectStreetAddress ? insuranceObjectStreetAddress : formatMessage('Unknown')
        }
      />
      <InsuranceDetailRow
        label={formatMessage('Insurance object postal code')}
        value={
          insuranceObjectPostalCode
            ? formatPostcode(insuranceObjectPostalCode)
            : formatMessage('Unknown')
        }
      />
      <InsuranceDetailRow
        label={formatMessage('Insurance amount personal property')}
        value={
          insuredMovablesAmount
            ? formatCurrency(config, insuredMovablesAmount)
            : formatMessage('Unknown')
        }
      />
      <InsuranceDetailRow
        label={formatMessage('Living area')}
        value={
          livingArea ? (
            <>
              {livingArea}m<sup>2</sup>
            </>
          ) : (
            formatMessage('Unknown')
          )
        }
      />
      <InsuranceDetailRow
        label={formatMessage('Number of residents')}
        value={numberOfResidents ? numberOfResidents.toString() : formatMessage('Unknown')}
      />

      <HeadlineFive margin="top">{formatMessage('Insurance holder')}</HeadlineFive>
      <InsuranceDetailRow
        label={formatMessage('Name')}
        value={insuranceHolderName ? insuranceHolderName : formatMessage('Unknown')}
      />
    </div>
  );
};
