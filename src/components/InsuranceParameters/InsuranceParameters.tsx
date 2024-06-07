import {
  Button,
  Card,
  HeadlineEight,
  HeadlineFive,
  HeadlineSeven,
  IconCheckMark,
  IconClose,
  ParagraphCaption,
} from '@insurely/ui';
import classNames from 'classnames';
import { InsuranceResponse } from 'types/insurance';

import styles from './insuranceParameters.module.css';
import ExternalLink from 'components/ExternalLink';
import { ExpandableInsuranceParameter } from 'components/ExpandableInsuranceParameter/ExpandableInsuranceParameter';
import { useMemo } from 'react';
import { useFormatMessage } from 'hooks/useFormatMessage';

type Props = {
  parameters: InsuranceResponse['parameters'];
  termsUrl: InsuranceResponse['termsUrl'];
};

export const InsuranceParameters = ({ parameters, termsUrl }: Props) => {
  const formatMessage = useFormatMessage();
  const parametersByGroupOrder = useMemo(
    () =>
      parameters
        .sort((a, b) => a.parameterGroupOrder - b.parameterGroupOrder)
        .reduce((acc, parameter) => {
          if (!acc[parameter.parameterGroupOrder]) {
            acc[parameter.parameterGroupOrder] = [];
          }
          acc[parameter.parameterGroupOrder].push(parameter);
          return acc;
        }, {} as Record<number, InsuranceResponse['parameters']>),
    [parameters],
  );
  return (
    <Card className={classNames(styles.card)}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <HeadlineFive>{formatMessage('Extent')}</HeadlineFive>
          {termsUrl ? (
            <ExternalLink url={termsUrl} text={formatMessage('Complete insurance terms')} />
          ) : null}
        </div>
        <div className={styles.button}>
          <Button variant="secondary" size="small">
            {formatMessage('Compare')}
          </Button>
        </div>
      </div>
      {Object.entries(parametersByGroupOrder).map(([_, value]) => {
        return (
          <div key={value[0].parameterGroup} className={styles.parameterGroup}>
            <HeadlineEight className={styles.parameterGroupName}>
              {value[0].parameterGroup}
            </HeadlineEight>
            {value.map((row) => {
              return (
                <ExpandableInsuranceParameter
                  key={row.parameterName}
                  row={{
                    id: row.parameterName,
                    values: {
                      title: (
                        <div className={styles.insuranceParameterTitle}>
                          <ParagraphCaption>{row.parameterDisplayName}</ParagraphCaption>
                          {row.value === 'true' ? (
                            <IconCheckMark width="24px" color="green" />
                          ) : (
                            <IconClose width="24px" color="red" />
                          )}
                        </div>
                      ),
                      content: (
                        <ParagraphCaption className={styles.content}>
                          {row.parameterDescription}
                        </ParagraphCaption>
                      ),
                    },
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </Card>
  );
};
