/**
 * Convert phone number to actual number type
 *
 * E.g.: +33(44)2323 ==> 33442323;
 */
const convertPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.replace('+', '').replace(/\s/g, '').replace('(', '').replace(')', '');

export default convertPhoneNumber;
