const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// 1. API ĐĂNG KÝ
router.post('/register', async (req, res) => {
    try {
        const { username, password, fullName } = req.body;
        const supabase = req.app.locals.supabase;

        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .maybeSingle();

        if (checkError) throw checkError;

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Tên đăng nhập này đã có người sử dụng!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Đổi fullName thành fullname cho khớp với cột trong cơ sở dữ liệu Supabase
        const { error: insertError } = await supabase
            .from('users')
            .insert([{ 
                username, 
                password: hashedPassword, 
                fullname: fullName, 
                role: 'customer' 
            }]);

        if (insertError) throw insertError;

        res.json({ success: true, message: 'Đăng ký tài khoản thành công!' });
} catch (err) {
        console.error("LỖI ĐĂNG KÝ CHI TIẾT:", err); // In lỗi đỏ lè ra terminal để đọc
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. API ĐĂNG NHẬP
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const supabase = req.app.locals.supabase;

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .maybeSingle();

        if (error || !user) {
            return res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
        }

        res.json({
            success: true,
            message: 'Đăng nhập thành công!',
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullname, // Lấy từ cột fullname xuống
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;