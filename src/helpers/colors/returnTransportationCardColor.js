export const getCardColors = (value) => {
    switch (value) {
        case 2:
            return 'orange'; // або будь-який інший колір
        case 3:
            return 'red';
        case 4:
            return 'green';
        // Додайте більше випадків, якщо потрібно
        default:
            return 'grey'; // Колір за замовчуванням
    }
};