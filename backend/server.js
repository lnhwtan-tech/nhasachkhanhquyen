const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); 
const supabaseUrl = 'https://dngnkhzliwsdmytrvoae.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZ25raHpsaXdzZG15dHJ2b2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MDkyMjcsImV4cCI6MjEwMzk4NTIyN30.fqZuesECwMbvbcnc4XSyGZZrPxTG5YbrPk1MlNHZB58'
const supabase = createClient(supabaseUrl, supabaseKey)
app.get('/api/products', async (req, res) => {
    try {
        const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/api/products', async (req, res) => {
    try {
        const { name, category, price, stock, status, description, image } = req.body;
        const { data, error } = await supabase
            .from('products')
            .insert([{ name, category, price, stock, status, description, image }])
            .select();
        if (error) throw error;
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock, status, description, image } = req.body;
        const { data, error } = await supabase
            .from('products')
            .update({ name, category, price, stock, status, description, image })
            .eq('id', id)
            .select();
        if (error) throw error;
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});