export const calcLineItemCost = (unitPrice, quantity) => {
    return (unitPrice * quantity).toFixed(2);
}
export const calcSubtotal = cart => {
    return cart.reduce((acc, curVal) => acc += (curVal.unitPrice * curVal.quantity), 0).toFixed(2);
}

export const calcTaxes = (subtotal, shippingCost, taxRate) => {
    return ((Number(subtotal) + shippingCost) * taxRate).toFixed(2);
}

export const calcTotal = (subtotal, shippingCost, taxes) => {
    return (Number(subtotal) + shippingCost + Number(taxes)).toFixed(2);
}