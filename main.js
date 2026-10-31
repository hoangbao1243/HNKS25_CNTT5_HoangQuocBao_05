let employees = [
    { employeeCode: "EMP-001", fullName: "Ngô Thanh Tùng", department: "Phòng Kỹ Thuật", age: 28, experienceYears: 5 },
    { employeeCode: "EMP-002", fullName: "Hồ Thị Thu", department: "Phòng Nhân Sự", age: 35, experienceYears: 10 },
    { employeeCode: "EMP-003", fullName: "Mai Quốc Việt", department: "Phòng Kỹ Thuật", age: 24, experienceYears: 1 }
];

function normalizeText(rawText) {
    return rawText.trim().replace(/\s+/g, " ").toLowerCase().replace(/(^|\s){L}/gu, c => c.toUpperCase());
}
function validateEmployeeCode(code) {
    if (code === "")
        return 
    if (code.length < 6)
        return 
    if (!code.startsWith("EMP-"))
        return 
    if (test(code))
        return 
    if (findEmployeeIndex(code) !== -1)
        return 
    return "";
}

function findEmployeeIndex(code) {
    return employees.findIndex(e => e.employeeCode === code);
}
function inputIntegerInRange(message, min, max) {
    while (true) {
        let value = prompt(message);
        if (value === null) return null;
        value = value.trim();
        if (value === "") {
            console.log("Lỗi: Chưa nhập, nhập lại");
        } else if (!/^-?\d+$/.test(value)) {
            console.log("Lỗi: Không phải số nguyên, nhập lại");
        } else if (Number(value) < min || Number(value) > max) {
            console.log("Lỗi: Ngoài phạm vi " + min + " - " + max);
        } else {
            return Number(value);
        }
    }
}

function displayEmployees(list) {
    if (list.length === 0) {
        console.log("Danh sách nhân viên trống");
        return;
    }
    list.forEach((e, i) => {
        console.log((i + 1) + ". " + e.employeeCode + " - " + e.fullName + " - " + e.department);
        console.log("Tuổi: " + e.age + " | Số năm kinh nghiệm: " + e.experienceYears);
    });
    console.log("Tổng: " + list.length + " nhân viên");
}

function showEmployees() {
    let choice = prompt("1. Theo thứ tự hiện tại\n2. Sắp xếp theo kinh nghiệm tăng dần");

    if (choice === null) return;

    if (choice.trim() === "1") {
        displayEmployees(employees);
    } else if (choice.trim() === "2") {
        let list = [employees].sort((a, b) => a.experienceYears - b.experienceYears);
        displayEmployees(list);
    } else {
        console.log("Lựa chọn ko hợp lệ");
    }
}

function addEmployee() {
    let code = prompt("Nhập mã nhân viên");
    if (code === null) return;
    code = code.trim();

    let error = validateEmployeeCode(code);
    if (error !== "") {
        console.log(error);
        return;
    }

    let name = prompt("Nhập họ tên");
    if (name === null) return;
    name = normalizeText(name);

    while (name === "") {
        name = prompt("Họ tên không được để trống");
        if (name === null) return;
        name = normalizeText(name);
    }

    let department = prompt("Nhập phòng ban");
    if (department === null) return;
    department = normalizeText(department);
    while (department === "") {
        department = prompt("Phòng ban không được để trống");
        if (department === null) return;
        department = normalizeText(department);
    }

    let age = inputIntegerInRange("Nhập tuổi (18 - 60)", 18, 60);
    if (age === null) return;
    let experienceYears = inputIntegerInRange("Nhập số năm kinh nghiệm (0 - 40)", 0, 40);
    if (experienceYears === null) return;
    let employee = { employeeCode: code, fullName: name, department, age, experienceYears };
    employees.push(employee);

    console.log("Thêm nhân viên thành công");
    displayEmployees([employee]);
}

function updateEmployee() {
    let code = prompt("Nhập mã nhân viên cần cập nhật");
    if (code === null) return;
    code = code.trim().toUpperCase();

    let index = findEmployeeIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy nhân viên có mã " + code);
        return;
    }

    let age = inputIntegerInRange("Nhập tuổi mới (18 - 60)", 18, 60);
    if (age === null) {
        console.log("Bấm Cancel - đã hủy cập nhật");
        return;
    }

    let experienceYears = inputIntegerInRange("Nhập số năm kinh nghiệm mới (0 - 40)", 0, 40);
    if (experienceYears === null) {
        console.log("bấm cancel đã hủy cập nhật");
        return;
    }

    let oldAge = employees[index].age;
    let oldExperience = employees[index].experienceYears;
    employees[index].age = age;
    employees[index].experienceYears = experienceYears;
    console.log("Cập nhật thành công");
    console.log("Tuổi: " + oldAge + " -> " + age);
    console.log("Kinh nghiệm: " + oldExperience + " -> " + experienceYears);
}

function deleteEmployee() {
    let code = prompt("Nhập mã nhân viên cần xóa");
    if (code === null) return;
    code = code.trim().toUpperCase();

    let index = findEmployeeIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy nhân viên có mã " + code);
        return;
    }

    let confirm = prompt("Bạn có chắc muốn xóa? (Y/N)");

    if (confirm === "Y" || confirm === "y") {
        employees.splice(index, 1);
        console.log("Xóa thành công, còn " + employees.length + " nhân viên");
    } else {
        console.log("Đã hủy thao tác xóa");
    }
}

function searchEmployee() {
    let keyword = prompt("Nhập phòng ban cần tìm");

    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    keyword = keyword.trim().toLowerCase();

    let result = employees.filter(e => e.department.toLowerCase().includes(keyword));

    if (result.length === 0) {
        console.log("Không tìm thấy nhân viên phù hợp");
    } else {
        displayEmployees(result);
    }
}

function reportEmployees() {
    if (employees.length === 0) {
        console.log("Chưa có nhân viên nào");
        return;
    }

    let total = employees.length;
    let average = employees.reduce((sum, e) => sum + e.experienceYears, 0) / total;
    let max = Math.max(employees.map(e => e.experienceYears));

    console.log("Tổng số nhân viên: " + total);
    console.log("Kinh nghiệm trung bình: " + average.toFixed(1));

    console.log("Nhân viên có kinh nghiệm cao nhất:");
    employees.filter(e => e.experienceYears === max).forEach(e => {
        console.log(e.employeeCode + " - " + e.fullName + " - " + max + " năm");
    });
}

function menu() {
    while (true) {
        let choice = prompt(
            "=========================================\n"+

            "HỆ THỐNG QUẢN LÝ NHÂN VIÊN SKYTECH\n\n" +
            "1. Hiển thị danh sách nhân viên\n" +
            "2. Thêm nhân viên mới\n" +
            "3. Cập nhật thông tin nhân viên\n" +
            "4. Xóa nhân viên\n" +
            "5. Tìm kiếm nhân viên theo phòng ban\n" +
            "0. Thoát chương trình\n\n" +
            "Vui lòng nhập lựa chọn :"
        );

        if (choice === null) {
            console.log("Lựa chọn không hợp lệ");
            continue;
        }

        choice = choice.trim();
        if (!/^[0-5]$/.test(choice)) {
            console.log("Lựa chọn không hợp lệ");
            continue;
        }

        switch (choice) {
            case "1":
                showEmployees();
                break;
            case "2":
                addEmployee();
                break;
            case "3":
                updateEmployee();
                break;
            case "4":
                deleteEmployee();
                break;
            case "5":
                searchEmployee();
                break;
            case "0":
                reportEmployees();
                console.log("Cảm ơn bạn đã sử dụng chương trình!");
                return;
        }
    }
}

menu();