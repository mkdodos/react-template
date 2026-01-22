import React, { useState } from 'react';
import './CustomForm.css';

const CustomForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    service: 'design',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交資料:', formData);
    alert('感謝您的聯絡！');
  };

  return (
    <div className="form-container">
      <form className="styled-form" onSubmit={handleSubmit}>
        <h2 className="form-title">新增計畫</h2>
        
        <div className="input-group">
          <label htmlFor="username">料理名稱</label>
          <input 
            type="text" 
            id="username" 
            placeholder="例如：台式滷肉飯"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required 
          />
        </div>

        {/* <div className="input-group">
          <label htmlFor="email">電子郵件</label>
          <input 
            type="email" 
            id="email" 
            placeholder="example@mail.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
        </div> */}

        {/* <div className="input-group">
          <label htmlFor="service">需求類型</label>
          <select 
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
          >
            <option value="design">UI/UX 設計</option>
            <option value="develop">網頁開發</option>
            <option value="marketing">數位行銷</option>
          </select>
        </div> */}

        <div className="input-group">
          <label htmlFor="message">詳細說明</label>
          <textarea 
            id="message" 
            rows="4" 
            placeholder="請告訴我們更多細節..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">傳送訊息</button>
      </form>
    </div>
  );
};

export default CustomForm;