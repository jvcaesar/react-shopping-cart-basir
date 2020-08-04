export default function formatCurrency(num) {
    return '€' + Number((num/100)).toFixed(2).toLocaleString() + ' '
}