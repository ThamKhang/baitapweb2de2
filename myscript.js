//dữ liệu chuyến bay
var from = document.getElementById("from");
var to = document.getElementById("to");
to.innerHTML = "";
from.onchange = function () {
    switch (from.value) {
        case "SGN":
            to.innerHTML = "<option value='-1'>Chọn nơi đến</option><option value='HN'>Hà Nội</option><option value='DN'>Đà Nẵng</option><option value='CD'>Côn Đảo</option>";
            break;
        case "HN":
            to.innerHTML = "<option value='-1'>Chọn nơi đến</option><option value='SGN'>Sài Gòn</option><option value='DN'>Đà Nẵng</option>";
            break;
        case "DN":
            to.innerHTML = "<option value='-1'>Chọn nơi đến</option><option value='SGN'>Sài Gòn</option><option value='HN'>Hà Nội</option>";
            break;
        case "CD":
            to.innerHTML = "<option value='-1'>Chọn nơi đến</option><option value='SGN'>Sài Gòn</option>";
            break;
        default:
            to.innerHTML = "<option value='-1'>Chọn nơi đến</option>";
    }
}

// vé
document.getElementById("direction_1").checked = true;
var dateReturn = document.getElementById("groupDateReturn");
dateReturn.style.display = "none";
document.getElementById("direction_1").onclick = function () {
    dateReturn.style.display = "none";
}
document.getElementById("direction_2").onclick = function () {
    dateReturn.style.display = "block";
}



function validateform() {
    var from = document.form1.from.value;
    var to = document.form1.to.value;
    var lastName = document.form1.passengerLastName.value;
    var firstName = document.form1.passengerFirstName.value;
    var idCard = document.form1.idCard.value;
    var address = document.form1.address.value;
    var mobile = document.form1.mobile.value;
    var email = document.form1.email.value;
    var creditName = document.form1.creditName.value;
    var creditType = document.form1.creditType.value;
    var creditNo = document.form1.creditNo.value;
    var creditExpire = document.form1.creditExpire.value;

    if (from == -1) {
        alert("Chưa chọn nơi đi")
        return false
    }

    if (to == -1) {
        alert("Chưa chọn nơi đến !")
        return false
    }

    if (from === to) {
        alert("Nơi đi và nơi đến không thể giống nhau");
        return false;
    }

    if (lastName == "") {
        alert("Vui lòng nhập họ của bạn");
        return false;
    }

    if (firstName == "") {
        alert("Vui lòng nhập tên của bạn");
        return false;
    }
    if (!idCard) {
        alert("Vui lòng nhập số CMND/Hộ chiếu");
        return false;
    }

    if (!address) {
        alert("Vui lòng nhập địa chỉ");
        return false;
    }

    if (!mobile) {
        alert("Vui lòng nhập số điện thoại");
        return false;
    }

    if (!email) {
        alert("Vui lòng nhập địa chỉ email");
        return false;
    }

    if (!creditName) {
        alert("Vui lòng nhập tên trên thẻ");
        return false;
    }

    if (!creditType) {
        alert("Vui lòng chọn loại thẻ");
        return false;
    }

    if (!creditNo) {
        alert("Vui lòng nhập số thẻ");
        return false;
    }

    if (!creditExpire) {
        alert("Vui lòng nhập ngày hết hạn của thẻ");
        return false;
    }

    // Kiểm tra số điện thoại
    var phoneRegex = /^[0-9]{10,12}$/;
    if (!mobile.match(phoneRegex)) {
        alert("Vui lòng nhập số điện thoại hợp lệ");
        return false;
    }

    // Kiểm tra số CMND/hộ chiếu
    var idCardRegex = /^[0-9]{9,10}$/;
    if (!idCard.match(idCardRegex)) {
        alert("Vui lòng nhập số CMND/hộ chiếu hợp lệ");
        return false;
    }

    // Kiểm tra thẻ
    var type = document.getElementById("creditType").value;
    var creditNo = document.getElementById("creditNo").value;
    var visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    var masterRegex = /^(5[1-5][0-9]{14})$/;
    var amexRegex = /^3[47][0-9]{13}$/;

    if (type == "VISA") {
        if (!creditNo.match(visaRegex)) {
            alert("Vui lòng nhập số thẻ hợp lệ")
            return false;
        }
    }
    else if (type == "MASTER") {
        if (!creditNo.match(masterRegex)) {
            alert("Vui lòng nhập số thẻ hợp lệ")
            return false;
        }
    }
    else if (type == "AMEX") {
        if (!creditNo.match(amexRegex)) {
            alert("Vui Vui lòng nhập số thẻ hợp lệ")
            return false;
        }
    }
    return true;
}
// Tính tiền 
document.getElementById("tinhTien").onclick = function () {
    var from = document.form1.from.value;
    var to = document.form1.to.value;
    var direction = document.form1.direction.value;
    if (from == -1) {
        alert("Chưa chọn nơi đi")
        return false
    }

    if (to == -1) {
        alert("Chưa chọn nơi đến !")
        return false
    }

    if (from === to) {
        alert("Nơi đi và nơi đến không thể giống nhau");
        return false;
    }

    if (direction == "oneway") {
        var price;
        if ((from == "SGN" && to == "HN") || (from == "HN" && to == "SGN")) {
            price = 1000000;
        } else if ((from == "SGN" && to == "DN") || (from == "HN" && to == "DN")) {
            price = 900000;
        } else if ((from == "DN" && to == "SGN") || (from == "DN" && to == "HN")) {
            price = 800000;
        } else if ((from == "SGN" && to == "CD") || (from == "CD" && to == "SGN")) {
            price = 600000;
        }
        document.getElementById("totalPrice").value = price.toLocaleString('vi') + " đồng";
    } else if (direction == "return") {
        var price;
        if ((from == "SGN" && to == "HN") || (from == "HN" && to == "SGN")) {
            price = 1000000 * 1.7;
        } else if ((from == "SGN" && to == "DN") || (from == "HN" && to == "DN")) {
            price = 900000 * 1.7;
        } else if ((from == "DN" && to == "SGN") || (from == "DN" && to == "HN")) {
            price = 800000 * 1.7;
        } else if ((from == "SGN" && to == "CD") || (from == "CD" && to == "SGN")) {
            price = 600000 * 1.7;
        }
        document.getElementById("totalPrice").value = price.toLocaleString('vi') + " đồng";
    }
}

// Kiểm tra thẻ 
function validateCredit() {

}
// Vẽ tam giác cân
document.getElementById("ve").onclick = function () {
    var n = Number(document.getElementById("diamondSize").value);
    if (n > 0 && n < 6) {
        var s = ""
        var m = 1
        s += "<table border='0'><tbody style='font-size: 25px;font-family: sans-serif;'>"
        for (i = 0; i < n; i++) {
            s += "<tr>"
            for (j = 0; j < 2 * n - 1; j++) {
                s = s + "<td style='padding: 5px 15px'>"
                if (j >= n - 1 - i && j <= n - 1 + i) {
                    s += m;
                    m++;
                }
                s += "</td>"
            }
            s += "</tr>"
        }
        s += "</table>";
        document.getElementById("xuat").innerHTML = s;
    } else {
        alert("Chỉ được nhập đúng kích thước cho phép")
    }

}