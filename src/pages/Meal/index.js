import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ShoppingCart,
  ChefHat,
  Calendar,
  ClipboardList,
  CheckCircle2,
  Circle,
  Sparkles,
  Loader2,
  ArrowUpDown,
  CalendarDays,
  Dices,
  Pencil,
  Save,
  X,
  CheckCircle,
  Eraser,
} from "lucide-react"; // 匯入 Lucide 圖示庫中的各種圖示

import Product from "./components/Product";
import CustomForm from "./components/CustomForm";

export default function index() {
  const [editingId, setEditingId] = useState(null);
  const [newMeal, setNewMeal] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    ingredients: [],
  });
  const [editForm, setEditForm] = useState(null);

  const [meals, setMeals] = useState([
    // 管理主要的菜單資料陣列
    {
      id: 1, // 唯一識別碼
      name: "紅燒牛肉麵", // 料理名稱
      date: new Date().toISOString().split("T")[0], // 預設日期為今天
      ingredients: [
        // 此料理所需的食材列表
        { id: 101, name: "牛腱", amount: "600g", checked: false }, // checked 用於追蹤是否已採購
        { id: 102, name: "白蘿蔔", amount: "1條", checked: false },
        { id: 103, name: "手工麵條", amount: "2份", checked: false },
      ],
    },
    {
      id: 2, // 唯一識別碼
      name: "相機", // 料理名稱
      date: new Date().toISOString().split("T")[0], // 預設日期為今天
      ingredients: [
        // 此料理所需的食材列表
        { id: 101, name: "牛腱", amount: "600g", checked: false }, // checked 用於追蹤是否已採購
        { id: 102, name: "白蘿蔔", amount: "1條", checked: false },
        { id: 103, name: "手工麵條", amount: "2份", checked: false },
      ],
    },
    {
      id: 3, // 唯一識別碼
      name: "烤鴨", // 料理名稱
      date: new Date().toISOString().split("T")[0], // 預設日期為今天
      ingredients: [
        // 此料理所需的食材列表
        { id: 101, name: "牛腱", amount: "600g", checked: false }, // checked 用於追蹤是否已採購
        { id: 102, name: "白蘿蔔", amount: "1條", checked: false },
        { id: 103, name: "手工麵條", amount: "2份", checked: false },
      ],
    },
  ]);

  // 儲存編輯後的結果
  const handleSaveEdit = () => {
    setMeals((prev) => prev.map((m) => (m.id === editingId ? editForm : m))); // 替換掉原本對應的料理
    setEditingId(null); // 離開編輯模式
    setEditForm(null); // 清空暫存
  };

  // 完成並儲存新料理
  const handleAddMeal = () => {
    setMeals((prev) => [...prev, { ...newMeal, id: Date.now() }]); // 將新資料加入總清單
    setNewMeal({
      name: "",
      date: new Date().toISOString().split("T")[0],
      ingredients: [],
    }); // 重置表單
  };
  return (
    <div>
      {/* 渲染所有料理卡片 */}
      <ul className="product-grid">
        {meals.map((meal) => (
          <Product key={meal.id} meal={meal} />
          // <div key={meal.id}>
          //   {meal.name}
          //   {meal.date}
          // </div>
        ))}
      </ul>
      <CustomForm />

      {/* 表單提交按鈕 */}
      <div className="flex gap-3">
        <button
          onClick={editingId ? handleSaveEdit : handleAddMeal}
          disabled={!newMeal.name}
          //   用 editingId判斷編輯或新增

          //   disabled={
          //     editingId
          //       ? !editForm.name || editForm.ingredients.length === 0
          //       : !newMeal.name || newMeal.ingredients.length === 0
          //   }
          className={`flex-[2] text-white font-bold py-3.5 rounded-xl transition-all disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-2 ${editingId ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-900 hover:bg-black"}`}
        >
          {editingId ? <Save size={18} /> : <ClipboardList size={18} />}
          {editingId ? "儲存修改" : "建立計畫"}
        </button>
      </div>

      {/* 名稱與日期輸入欄位 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            料理名稱
          </label>
          <input
            type="text"
            placeholder="例如：台式滷肉飯"
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${editingId ? "border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
            value={editingId ? editForm.name : newMeal.name}
            onChange={(e) =>
              editingId
                ? setEditForm({ ...editForm, name: e.target.value })
                : setNewMeal({ ...newMeal, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            日期
          </label>
          <input
            type="date"
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${editingId ? "border-indigo-100 focus:border-indigo-500" : "border-slate-200 focus:border-orange-500"}`}
            value={editingId ? editForm.date : newMeal.date}
            onChange={(e) =>
              editingId
                ? setEditForm({ ...editForm, date: e.target.value })
                : setNewMeal({ ...newMeal, date: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
