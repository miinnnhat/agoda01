function getAgodaDates() {
    const today = new Date();

    // Tính ngày Check-in (Current date + 2)
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + 2);

    // Tính ngày Check-out (Current date + 3)
    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + 3);

    // Hàm phụ trợ để format ngày thành chuỗi 'YYYY-MM-DD'
    const formatDate = (date) => {
        const year = date.getFullYear();
        // JS đếm tháng từ 0, nên cần +1. padStart(2, '0') để đảm bảo luôn có 2 chữ số (VD: '04' thay vì '4')
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    };

    return {
        checkInDate: formatDate(checkIn),
        checkOutDate: formatDate(checkOut)
    };
}

export default { getAgodaDates };