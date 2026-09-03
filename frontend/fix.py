import os
import re

def replace_alerts_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Sửa lại biểu thức chính quy cho an toàn, tránh lỗi ký tự thoát
    pattern = r"alert\s*\(\s*(['\"`])(.*?)\1\s*\)\s*;?"
    
    def replacer(match):
        quote = match.group(1)
        message = match.group(2)
        return f'showCustomAlert("Thông báo", {quote}{message}{quote}, "info");'

    new_content, count = re.subn(pattern, replacer, content)

    if count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"[ĐÃ CẬP NHẬT] Đã thay thế {count} lệnh alert trong file: {file_path}")
    else:
        print(f"[BỎ QUA] Không tìm thấy alert nào trong file: {file_path}")

def scan_and_replace(directory="."):
    print("Bắt đầu quét các file HTML để thay thế alert...")
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                try:
                    replace_alerts_in_file(file_path)
                except Exception as e:
                    print(f"[LỖI] Không thể đọc/ghi file {file_path}: {e}")

if __name__ == "__main__":
    scan_and_replace(".")
    print("Hoàn tất quá trình thay thế!")