import { CurrencyAmount, ETHER, JSBI } from 'lampros_dex_sdk';
import { MIN_ETH } from '../constants';

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined;

  if (currencyAmount.currency === ETHER) {
    const updatedValue = JSBI.subtract(currencyAmount.raw, MIN_ETH);
    return CurrencyAmount.ether(JSBI.greaterThan(updatedValue, JSBI.BigInt(0)) ? updatedValue : JSBI.BigInt(0));
  }

  return currencyAmount;
}
