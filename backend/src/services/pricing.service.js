export const calculatePrice = (basePrice) => {
    const serviceFee = 100;
    const discount = 0;

    return basePrice + serviceFee - discount;
};