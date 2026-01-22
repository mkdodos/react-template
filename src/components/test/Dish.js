import React, { useState, useMemo, useEffect } from "react"; // 匯入 React 核心功能與常用的 Hooks
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

// --- API 配置 ---
const apiKey = ""; // 定義 Gemini API 金鑰（環境中會自動注入）

export default function App() {
  // --- 狀態管理 (State Management) ---
  const [activeTab, setActiveTab] = useState("meals"); // 管理目前的頁籤 (meals: 每日菜單, shopping: 採購清單)
  const [sortOrder, setSortOrder] = useState("asc"); // 管理菜單的排序方式 (asc: 遞增, desc: 遞減)
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
  ]);

  // 管理新計畫表單的暫存資料
  const [newMeal, setNewMeal] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    ingredients: [],
  });
  const [editingId, setEditingId] = useState(null); // 目前正在編輯的料理 ID (null 代表新增模式)
  const [editForm, setEditForm] = useState(null); // 編輯模式下的暫存表單資料
  const [tempIngredient, setTempIngredient] = useState({
    name: "",
    amount: "",
  }); // 手動輸入單項食材的暫存
  const [isGeneratingIngredients, setIsGeneratingIngredients] = useState(false); // 控制 AI 生成時的載入狀態

  // --- 計算屬性 (Derived State / Memoization) ---
  // 使用 useMemo 快取排序後的菜單，避免不必要的重新排序
  const sortedMeals = useMemo(() => {
    return [...meals].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA; // 根據日期進行排序
    });
  }, [meals, sortOrder]); // 依賴項：當原始資料或排序順序改變時才重算

  // --- AI 服務函式 (Gemini API) ---
  const fetchGemini = async (prompt, systemInstruction = "") => {
    let delay = 1000; // 初始指數退避延遲時間
    for (let i = 0; i < 5; i++) {
      // 嘗試最多 5 次
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              systemInstruction: systemInstruction
                ? { parts: [{ text: systemInstruction }] }
                : undefined,
              generationConfig: { responseMimeType: "application/json" }, // 要求輸出 JSON 格式
            }),
          },
        );
        const data = await response.json(); // 解析回應
        return JSON.parse(data.candidates[0].content.parts[0].text); // 回傳解析後的資料物件
      } catch (error) {
        if (i === 4) throw error; // 最後一次失敗則報錯
        await new Promise((resolve) => setTimeout(resolve, delay)); // 等待後重試
        delay *= 2; // 延遲時間翻倍
      }
    }
  };

  // 觸發 AI 生成食材清單
  const generateIngredientsWithAI = async (isEdit = false) => {
    const target = isEdit ? editForm : newMeal; // 決定對象是編輯表單還是新增表單
    if (!target.name) return; // 若沒輸入菜名則不動作
    setIsGeneratingIngredients(true); // 進入載入狀態
    try {
      const result = await fetchGemini(
        `製作「${target.name}」的食材`,
        `{"ingredients": [{"name": "食材名稱", "amount": "份量"}]}`,
      ); // 發送請求
      const ings = result.ingredients.map((ing) => ({
        ...ing,
        id: Math.random(),
        checked: false,
      })); // 為生成的食材加上隨機 ID
      if (isEdit) {
        setEditForm((p) => ({
          ...p,
          ingredients: [...p.ingredients, ...ings],
        })); // 更新編輯表單
      } else {
        setNewMeal((p) => ({ ...p, ingredients: [...p.ingredients, ...ings] })); // 更新新增表單
      }
    } catch (e) {
      console.error(e); // 記錄錯誤
    } finally {
      setIsGeneratingIngredients(false); // 結束載入狀態
    }
  };

  // --- 操作處理 (Action Handlers) ---
  // 將單項食材加入暫存清單
  const addIngredient = (isEdit = false) => {
    if (!tempIngredient.name.trim()) return; // 沒填名稱不動作
    const newIng = {
      id: Date.now() + Math.random(),
      name: tempIngredient.name,
      amount: tempIngredient.amount || "適量",
      checked: false,
    };
    if (isEdit) {
      setEditForm((p) => ({ ...p, ingredients: [...p.ingredients, newIng] })); // 加入編輯區
    } else {
      setNewMeal((p) => ({ ...p, ingredients: [...p.ingredients, newIng] })); // 加入新增區
    }
    setTempIngredient({ name: "", amount: "" }); // 清空輸入框
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

  // 開始編輯某項料理
  const startEdit = (meal) => {
    setEditingId(meal.id); // 設定正在編輯的 ID
    setEditForm({ ...meal }); // 複製資料到編輯表單
    window.scrollTo({ top: 0, behavior: "smooth" }); // 平滑滾動到頂部表單區
  };

  // 儲存編輯後的結果
  const handleSaveEdit = () => {
    setMeals((prev) => prev.map((m) => (m.id === editingId ? editForm : m))); // 替換掉原本對應的料理
    setEditingId(null); // 離開編輯模式
    setEditForm(null); // 清空暫存
  };

  // 切換食材的勾選狀態（已買/未買）
  const toggleIngredientCheck = (mealId, ingredientId) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mealId
          ? {
              ...m,
              ingredients: m.ingredients.map((i) =>
                i.id === ingredientId ? { ...i, checked: !i.checked } : i,
              ),
            }
          : m,
      ),
    );
  };

  // 產生採購大名單：將所有計畫中的食材展開成一個大陣列
  const shoppingList = useMemo(() => {
    const list = [];
    sortedMeals.forEach((meal) =>
      meal.ingredients.forEach((ing) =>
        list.push({
          ...ing,
          mealId: meal.id,
          mealName: meal.name,
          uniqueId: `${meal.id}-${ing.id}`,
        }),
      ),
    );
    return list;
  }, [sortedMeals]); // 依賴項：菜單排序或內容改變時同步更新

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* 內部樣式表：定義動畫與選取器優化 */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
      `}</style>

      {/* 導覽列區塊 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-xl">
              <ChefHat className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              智能備菜
            </h1>
          </div>
          {/* 頁籤切換器 */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab("meals")}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === "meals" ? "bg-white border border-slate-200 text-orange-600" : "text-slate-500 border border-transparent"}`}
            >
              每日菜單
            </button>
            <button
              onClick={() => setActiveTab("shopping")}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === "shopping" ? "bg-white border border-slate-200 text-orange-600" : "text-slate-500 border border-transparent"}`}
            >
              採購清單
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {activeTab === "meals" ? (
          <div className="space-y-8 fade-in">
            {/* 動態表單：新增或編輯料理 */}
            <section
              className={`bg-white rounded-[2rem] border p-6 md:p-8 transition-all ${editingId ? "border-indigo-200 ring-4 ring-indigo-500/5" : "border-slate-200"}`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black flex items-center gap-2">
                    {editingId ? (
                      <Pencil className="text-indigo-500" />
                    ) : (
                      <Plus className="text-orange-500" />
                    )}
                    {editingId ? "編輯計畫" : "新增計畫"}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {editingId
                      ? `正在修改「${editForm?.name}」`
                      : "開始規劃你的美味餐點"}
                  </p>
                </div>
                {/* 只有在有輸入菜名時才顯示 AI 生成按鈕 */}
                {(editingId ? editForm?.name : newMeal.name) && (
                  <button
                    onClick={() => generateIngredientsWithAI(!!editingId)}
                    disabled={isGeneratingIngredients}
                    className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full transition-all disabled:opacity-50 ${editingId ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" : "bg-orange-50 text-orange-600 hover:bg-orange-100"}`}
                  >
                    {isGeneratingIngredients ? (
                      <Loader2 className="w-3 h-3 spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}{" "}
                    AI 生成食材
                  </button>
                )}
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

              {/* 食材編輯預覽區 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(editingId ? editForm.ingredients : newMeal.ingredients).map(
                    (ing) => (
                      <span
                        key={ing.id}
                        className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2"
                      >
                        {ing.name} ({ing.amount})
                        <button
                          onClick={() => {
                            const filterFn = (i) => i.id !== ing.id;
                            editingId
                              ? setEditForm({
                                  ...editForm,
                                  ingredients:
                                    editForm.ingredients.filter(filterFn),
                                })
                              : setNewMeal({
                                  ...newMeal,
                                  ingredients:
                                    newMeal.ingredients.filter(filterFn),
                                });
                          }}
                          className="text-slate-300 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ),
                  )}
                </div>
                {/* 手動新增食材欄位 */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="食材名稱"
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm"
                    value={tempIngredient.name}
                    onChange={(e) =>
                      setTempIngredient({
                        ...tempIngredient,
                        name: e.target.value,
                      })
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && addIngredient(!!editingId)
                    }
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="份量"
                      className="w-24 px-4 py-2 rounded-lg border border-slate-200 text-sm"
                      value={tempIngredient.amount}
                      onChange={(e) =>
                        setTempIngredient({
                          ...tempIngredient,
                          amount: e.target.value,
                        })
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && addIngredient(!!editingId)
                      }
                    />
                    <button
                      onClick={() => addIngredient(!!editingId)}
                      className={`${editingId ? "bg-indigo-500" : "bg-orange-500"} text-white p-2 rounded-lg transition-all active:scale-95`}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 表單提交按鈕 */}
              <div className="flex gap-3">
                {editingId && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditForm(null);
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    取消
                  </button>
                )}
                <button
                  onClick={editingId ? handleSaveEdit : handleAddMeal}
                  disabled={
                    editingId
                      ? !editForm.name || editForm.ingredients.length === 0
                      : !newMeal.name || newMeal.ingredients.length === 0
                  }
                  className={`flex-[2] text-white font-bold py-3.5 rounded-xl transition-all disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-2 ${editingId ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-900 hover:bg-black"}`}
                >
                  {editingId ? <Save size={18} /> : <ClipboardList size={18} />}
                  {editingId ? "儲存修改" : "建立計畫"}
                </button>
              </div>
            </section>

            {/* 計畫清單顯示區 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-slate-800 flex items-center gap-2">
                  <CalendarDays size={20} className="text-blue-500" />{" "}
                  已安排計畫
                </h3>
                <button
                  onClick={() =>
                    setSortOrder((s) => (s === "asc" ? "desc" : "asc"))
                  }
                  className="text-xs font-bold text-slate-500 flex items-center gap-1 hover:text-slate-800 transition-colors"
                >
                  <ArrowUpDown size={14} />{" "}
                  {sortOrder === "asc" ? "由遠到近" : "由近到遠"}
                </button>
              </div>

              {/* 渲染所有料理卡片 */}
              <div className="grid gap-6">
                {sortedMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className={`bg-white rounded-[2rem] border overflow-hidden transition-all group ${editingId === meal.id ? "border-indigo-400 ring-2 ring-indigo-100" : "border-slate-200"}`}
                  >
                    <div className="p-6 border-b border-slate-50 flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border border-blue-100">
                          <Calendar size={12} /> {meal.date}
                        </span>
                        <h4 className="text-lg font-black text-slate-800">
                          {meal.name}
                        </h4>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(meal)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setMeals((ms) => ms.filter((m) => m.id !== meal.id))
                          }
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {/* 食材清單勾選預覽區 */}
                    <div className="p-6 flex flex-wrap gap-2.5 bg-slate-50/30">
                      {meal.ingredients.map((ing) => (
                        <div
                          key={ing.id}
                          onClick={() => toggleIngredientCheck(meal.id, ing.id)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border cursor-pointer select-none transition-all ${ing.checked ? "bg-slate-100 border-transparent opacity-50" : "bg-white border-slate-200 hover:border-orange-300"}`}
                        >
                          {ing.checked ? (
                            <CheckCircle className="text-green-500 w-4 h-4" />
                          ) : (
                            <Circle className="text-slate-300 w-4 h-4" />
                          )}
                          <span
                            className={`text-sm font-bold ${ing.checked ? "text-slate-400 line-through" : "text-slate-700"}`}
                          >
                            {ing.name}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 font-black`}
                          >
                            {ing.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 採購清單標籤頁佈局 */
          <div className="space-y-6 fade-in">
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2 text-slate-800">
                  <ShoppingCart size={24} className="text-green-500" />{" "}
                  採購大名單
                </h3>
                <p className="text-slate-400 text-xs">統整所有計畫的食材</p>
              </div>
              {/* 批次清除已勾選項目 */}
              <button
                onClick={() =>
                  setMeals((ms) =>
                    ms.map((m) => ({
                      ...m,
                      ingredients: m.ingredients.filter((i) => !i.checked),
                    })),
                  )
                }
                className="flex items-center gap-1.5 text-xs font-black text-red-500 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition-all border border-red-100"
              >
                <Eraser size={14} /> 清除已買項目
              </button>
            </div>

            {/* 列出彙整後的食材項 */}
            <div className="bg-white rounded-[2rem] border border-slate-200 divide-y divide-slate-50 overflow-hidden">
              {shoppingList.length === 0 ? (
                <div className="p-16 text-center text-slate-300 font-bold italic">
                  清單目前是空的...
                </div>
              ) : (
                shoppingList.map((item) => (
                  <div
                    key={item.uniqueId}
                    onClick={() => toggleIngredientCheck(item.mealId, item.id)}
                    className={`flex items-center justify-between p-6 cursor-pointer transition-all hover:bg-slate-50 group ${item.checked ? "bg-slate-50/80" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`transition-all ${item.checked ? "text-green-500 scale-110" : "text-slate-200 group-hover:text-orange-400"}`}
                      >
                        {item.checked ? (
                          <CheckCircle2 size={24} />
                        ) : (
                          <Circle size={24} strokeWidth={1.5} />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-black text-lg transition-all ${item.checked ? "text-slate-300 line-through" : "text-slate-800"}`}
                        >
                          {item.name}
                        </p>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {item.mealName}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-4 py-1.5 rounded-lg text-sm font-black border transition-all ${item.checked ? "bg-slate-100 text-slate-300 border-slate-200" : "bg-orange-50 text-orange-600 border-orange-100"}`}
                    >
                      {item.amount}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 底部測試輔助按鈕 */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => {
              const demo = [
                {
                  id: Date.now(),
                  name: "麻婆豆腐",
                  date: new Date().toISOString().split("T")[0],
                  ingredients: [
                    { id: 1, name: "嫩豆腐", amount: "2盒", checked: false },
                    { id: 2, name: "豬絞肉", amount: "150g", checked: false },
                  ],
                },
                {
                  id: Date.now() + 1,
                  name: "青椒肉絲",
                  date: new Date().toISOString().split("T")[0],
                  ingredients: [
                    { id: 3, name: "青椒", amount: "3顆", checked: false },
                    { id: 4, name: "豬里肌", amount: "200g", checked: false },
                  ],
                },
              ];
              setMeals((p) => [...p, ...demo]);
            }}
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-orange-500 transition-colors px-6 py-3 border border-slate-200 rounded-2xl bg-white"
          >
            <Dices size={14} /> 快速生成示範資料
          </button>
        </div>
      </main>
    </div>
  );
}
