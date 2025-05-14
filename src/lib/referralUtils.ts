// Utility functions for handling referral codes

/**
 * Get referral code from URL
 * @returns The referral code from the URL query parameter 'ref', or null if not present
 */
export const getReferralCodeFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');
  return refCode;
};

/**
 * Store referral code in session storage
 * @param code The referral code to store
 */
export const storeReferralCode = (code: string): void => {
  if (code) {
    sessionStorage.setItem('referralCode', code);
  }
};

/**
 * Get stored referral code from session storage
 * @returns The stored referral code, or null if not present
 */
export const getStoredReferralCode = (): string | null => {
  return sessionStorage.getItem('referralCode');
};

/**
 * Check if a referral code exists in the URL or session storage
 * If in URL, store it in session storage
 * @returns The referral code if it exists, or null if not
 */
export const checkAndStoreReferralCode = (): string | null => {
  const urlRefCode = getReferralCodeFromUrl();
  
  if (urlRefCode) {
    storeReferralCode(urlRefCode);
    return urlRefCode;
  }
  
  return getStoredReferralCode();
}; 