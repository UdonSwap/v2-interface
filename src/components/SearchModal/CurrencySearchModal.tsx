import { Currency } from 'lampros_dex_sdk';
import React, { useCallback, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import useLast from '../../hooks/useLast';
import { useSelectedListUrl } from '../../state/lists/hooks';
import Modal from '../Modal';
import { CurrencySearch } from './CurrencySearch';

interface CurrencySearchModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  selectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
  otherSelectedCurrency?: Currency | null;
  showCommonBases?: boolean;
}

export default function CurrencySearchModal({
  isOpen,
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
}: CurrencySearchModalProps) {
  const [listView, setListView] = useState<boolean>(false);
  const lastOpen = useLast(isOpen);

  useEffect(() => {
    if (isOpen && !lastOpen) {
      setListView(false);
    }
  }, [isOpen, lastOpen]);

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency);
      onDismiss();
    },
    [onDismiss, onCurrencySelect]
  );

  const handleClickChangeList = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Change Lists',
    });
    setListView(true);
  }, []);

 

  const selectedListUrl = useSelectedListUrl();
  const noListSelected = !selectedListUrl;

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} minHeight={listView ? 40 : noListSelected ? 0 : 80}>
      {!listView && (
        <CurrencySearch
          isOpen={isOpen}
          onDismiss={onDismiss}
          onCurrencySelect={handleCurrencySelect}
          onChangeList={handleClickChangeList}
          selectedCurrency={selectedCurrency}
          otherSelectedCurrency={otherSelectedCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </Modal>
  );
}
