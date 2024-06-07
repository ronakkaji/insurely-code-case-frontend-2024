import { IconButton, IconMinus, IconPlus, RowTwo } from '@insurely/ui';
import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';

import styles from './expandableInsuranceParameter.module.css';

interface ExpandableTableRowProps<Field extends string> {
  row: RowTwo<Field | 'title' | 'content'>;
}

export function ExpandableInsuranceParameter<Field extends string>({
  row: { values },
}: ExpandableTableRowProps<Field>) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div
        onClick={handleClick}
        className={classNames(styles.mainRow, {
          [styles.open]: open,
        })}
      >
        <div className={styles.title}>
          <IconButton
            className={classNames(styles.plus, {
              [styles.open]: open,
            })}
            icon={open ? <IconMinus width="24px" /> : <IconPlus width="24px" />}
          />
          {values.title}
        </div>
      </div>
      <div className={styles.contentRow}>
        <div
          className={classNames(styles.content, {
            [styles.open]: open,
          })}
        >
          {values.content}
        </div>
      </div>
    </>
  );
}
