export const getRandomProducts = (products, qty) => {
  const shuffledPorducts = products.sort(() => 0.5 - Math.random());
  return shuffledPorducts.slice(0, qty);
};

export const truncateText = (text, length) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  } else {
    return text;
  }
};

export const formatProductPrice = (amount) => {
  if (amount == null || amount === undefined) return "";
  const [integerPart, decimalPart] = amount.toString().split(".");
  const lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);

  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (otherNumbers ? "," : "") +
    lastThree;

  return decimalPart ? `${formatted}.${decimalPart}` : formatted;
};

export function generateOrderId(phoneNumber) {
  const prefix = "ORD_";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const lastThree = phoneNumber.slice(-3) + "_";

  const random = [...Array(5)]
    .map(() => Math.random().toString(36)[2].toUpperCase())
    .join("");

  return `${prefix}${date}_${lastThree}${random}`;
}
