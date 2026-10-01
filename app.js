let menu = `
================================================
    HỆ THỐNG BÁN VÉ RẠP MOONLIGHT CINEMA
================================================
1. Nhập và kiểm chuẩn mã đặt vé
2. Tính tiền vé xem phim
3. Thẩm định số seri vé may mắn
0. Thoát chương trình
================================================`

let currentBookingCode = ""
let isBookingValid = false
let totalRevenue = 0
let totalBookings = 0

let choice = ""

do {
    let inputChoice = prompt(menu + "\nVui lòng nhập lựa chọn của bạn (0 - 3): ")
    console.log(menu)

    if (inputChoice === null) {
        choice = "0"
    } else {
        choice = inputChoice.trim()
    }

    switch (choice) {
        case "1": {
            currentBookingCode = ""
            isBookingValid = false

            let inputBookingCode = prompt("Nhập mã đặt vé (bắt đầu bằng 'CIN-', tối thiểu 6 ký tự, ví dụ CIN-27): ")
            let bookingCode = ""
            if (inputBookingCode !== null) {
                bookingCode = inputBookingCode.trim().toUpperCase()
            }

            if (bookingCode.length === 0) {
                console.log("Lỗi: Chưa nhập mã đặt vé!")
            } else if (bookingCode.length < 6) {
                console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự!")
            } else if (!bookingCode.startsWith("CIN-")) {
                console.log("Lỗi: Sai tiền tố 'CIN-'!")
            } else if (bookingCode.includes(" ")) {
                console.log("Lỗi: Chứa khoảng trắng ở giữa!")
            } else {
                currentBookingCode = bookingCode
                isBookingValid = true
                console.log("Thành công: Mã đặt vé " + currentBookingCode + " hợp lệ!")
            }
            break
        }

        case "2": {
            if (isBookingValid !== true) {
                console.log("Lỗi: Chưa có mã đặt vé hợp lệ! Vui lòng chọn chức năng 1 trước.")
                break
            }

            let inputTicketCount = prompt("Nhập số lượng vé đã đặt: ")
            if (inputTicketCount === null) {
                console.log("Đã hủy tính tiền vé.")
                break
            }
            let ticketCount = Number(inputTicketCount.trim())
            if (inputTicketCount.trim() === "" || !Number.isInteger(ticketCount) || ticketCount <= 0) {
                console.log("Lỗi: Số lượng vé phải là số nguyên dương!")
                break
            }

            let inputPricePerTicket = prompt("Nhập giá mỗi vé (VND): ")
            if (inputPricePerTicket === null) {
                console.log("Đã hủy tính tiền vé.")
                break
            }
            let pricePerTicket = Number(inputPricePerTicket.trim())
            if (inputPricePerTicket.trim() === "" || !Number.isInteger(pricePerTicket) || pricePerTicket <= 0) {
                console.log("Lỗi: Giá vé phải là số nguyên dương!")
                break
            }

            let baseCost = ticketCount * pricePerTicket
            let discount = 0
            if (ticketCount >= 4) {
                discount = Math.round(baseCost * 0.1)
            }
            let bookingFee = Math.round((baseCost - discount) * 0.08)
            let totalAmount = baseCost - discount + bookingFee

            console.log("================================================")
            console.log("               HÓA ĐƠN ĐẶT VÉ")
            console.log("================================================")
            console.log("Mã đặt vé      : " + currentBookingCode)
            console.log("Số lượng vé    : " + ticketCount)
            console.log("Giá mỗi vé     : " + pricePerTicket + " VND")
            console.log("Chi phí cơ sở  : " + baseCost + " VND")
            console.log("Giảm giá       : " + discount + " VND")
            console.log("Phụ phí dịch vụ: " + bookingFee + " VND")
            console.log("Tổng thanh toán: " + totalAmount + " VND")
            console.log("================================================")

            totalRevenue += totalAmount
            totalBookings += 1
            currentBookingCode = ""
            isBookingValid = false
            break
        }
        
        case "0":
            console.log("")
            console.log("=".repeat(50))
            console.log("BÁO CÁO TỔNG KẾT CA BÁN VÉ")
            console.log("=".repeat(50))
            if (totalBookings === 0) {
                console.log("Chưa phát sinh đơn đặt vé nào trong ca")
            } else {
                let averageRevenue = Math.round(totalRevenue / totalBookings)
                console.log("Tổng số đơn đặt vé đã thanh toán : " + totalBookings)
                console.log("Tổng doanh thu                   : " + totalRevenue + " VND")
                console.log("Doanh thu trung bình             : " + averageRevenue + " VND")
            }
            console.log("=".repeat(50))
            console.log("Cảm ơn đã sử dụng hệ thống! Hẹn gặp lại!")
            break

        default:
            console.log("Lỗi: Lựa chọn không hợp lệ, vui lòng nhập từ 0 đến 3!")
    }
} while (choice !== "0")