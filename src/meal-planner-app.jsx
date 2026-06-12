import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CUISINES = [
  { id: "nigerian",      label: "Nigerian",       icon: "🍲", sub: "Jollof · Egusi · Suya" },
  { id: "asian",         label: "Asian",           icon: "🍜", sub: "Ramen · Stir-fry · Sushi" },
  { id: "italian",       label: "Italian",         icon: "🍝", sub: "Pasta · Pizza · Risotto" },
  { id: "american",      label: "American",        icon: "🍔", sub: "BBQ · Grilled · Burgers" },
  { id: "ghanaian",      label: "Ghanaian",        icon: "🫕", sub: "Waakye · Fufu · Soups" },
  { id: "mediterranean", label: "Mediterranean",   icon: "🥙", sub: "Shawarma · Falafel" },
  { id: "indian",        label: "Indian",          icon: "🍛", sub: "Curry · Biryani · Dal" },
  { id: "chinese",       label: "Chinese",         icon: "🥢", sub: "Dim Sum · Fried Rice" },
];

const MEAL_DB = {
  nigerian: {
    breakfast: ["Akara & Pap","Ogi with Bean Cake","Yam & Egg Sauce","Moi Moi & Tea","Bread & Akara"],
    lunch:     ["Jollof Rice & Chicken","Egusi Soup & Eba","Banga Soup & Starch","Pepper Soup & Yam","Ofada Rice & Stew"],
    dinner:    ["Pepper Soup","Edikaikong & Eba","Suya & Peppered Snail","Oha Soup & Fufu","Afang Soup & Eba"],
  },
  asian: {
    breakfast: ["Ramen Noodle Soup","Congee & Fried Egg","Japanese Toast Set","Miso Soup & Rice","Matcha Oats"],
    lunch:     ["Teriyaki Bowl","Pad Thai","Chicken Fried Rice","Tonkatsu Ramen","Thai Green Curry"],
    dinner:    ["Sushi Platter","Korean BBQ","Tom Yum Soup","Bibimbap","Beef Pho"],
  },
  italian: {
    breakfast: ["Cornetto & Espresso","Frittata & Toast","Bruschetta","Yogurt & Granola","Ricotta Pancakes"],
    lunch:     ["Spaghetti Carbonara","Margherita Pizza","Penne Arrabbiata","Lasagna","Caprese Salad"],
    dinner:    ["Mushroom Risotto","Chicken Piccata","Gnocchi al Pesto","Osso Buco","Saltimbocca"],
  },
  american: {
    breakfast: ["Pancakes & Syrup","Eggs Benedict","French Toast","Avocado Toast","Breakfast Burrito"],
    lunch:     ["BBQ Burger","Caesar Salad","Club Sandwich","Mac & Cheese","Philly Cheesesteak"],
    dinner:    ["Grilled Steak","BBQ Ribs","Pulled Pork Bowl","Chicken Wings","Smoked Brisket"],
  },
  ghanaian: {
    breakfast: ["Hausa Koko & Koose","Waakye & Stew","Bread & Beans Stew","Rice & Stew","Tom Brown Porridge"],
    lunch:     ["Fufu & Light Soup","Banku & Tilapia","Kenkey & Fried Fish","Jollof Rice & Beef","Kontomire Stew & Rice"],
    dinner:    ["Groundnut Soup","Omo Tuo & Soup","Abunabunu","Akyeke & Fish","Nkontomire & Yam"],
  },
  mediterranean: {
    breakfast: ["Shakshuka","Feta & Olive Toast","Greek Yogurt Bowl","Hummus & Pita","Menemen"],
    lunch:     ["Chicken Shawarma","Falafel Wrap","Greek Salad","Lamb Kofta Plate","Tabbouleh Bowl"],
    dinner:    ["Moussaka","Lamb Tagine","Grilled Halloumi","Couscous Stew","Seafood Paella"],
  },
  indian: {
    breakfast: ["Idli & Sambar","Poha","Paratha & Pickle","Masala Chai & Toast","Upma"],
    lunch:     ["Chicken Biryani","Dal Makhani & Rice","Paneer Curry","Butter Chicken","Chole Bhature"],
    dinner:    ["Lamb Rogan Josh","Palak Paneer","Prawn Masala","Vegetable Korma","Mutton Curry"],
  },
  chinese: {
    breakfast: ["Congee & You Tiao","Dim Sum Basket","Steamed Buns","Wonton Soup","Scallion Pancakes"],
    lunch:     ["Chicken Fried Rice","Mapo Tofu","Char Siu Pork","Beef Chow Mein","Dan Dan Noodles"],
    dinner:    ["Peking Duck","Hot Pot","Sweet & Sour Fish","Kung Pao Chicken","Twice-cooked Pork"],
  },
};

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEAL_TYPES = ["breakfast","lunch","dinner"];
const MEAL_TIMES = { breakfast: "7:00 AM", lunch: "1:00 PM", dinner: "7:00 PM" };
const MEAL_ICONS = { breakfast: "☀️", lunch: "🌤️", dinner: "🌙" };

const SHOPPING = [
  { cat: "Proteins & Meat",       icon: "🥩", items: [
    { name: "Chicken (pieces)", qty: "2 kg" },
    { name: "Beef / stewing beef", qty: "1 kg" },
    { name: "Smoked fish / tilapia", qty: "500 g" },
    { name: "Eggs", qty: "12 pcs" },
    { name: "Prawns / shrimp", qty: "300 g" },
    { name: "Lamb chops", qty: "600 g" },
  ]},
  { cat: "Grains & Carbs",         icon: "🌾", items: [
    { name: "Long grain rice", qty: "3 kg" },
    { name: "Pasta (spaghetti)", qty: "500 g" },
    { name: "Garri / eba", qty: "1 kg" },
    { name: "Yam (tubers)", qty: "2 pcs" },
    { name: "Bread (loaf)", qty: "1 loaf" },
    { name: "Noodles", qty: "4 packs" },
  ]},
  { cat: "Vegetables",             icon: "🥦", items: [
    { name: "Tomatoes", qty: "6 pcs" },
    { name: "Fresh pepper (tatashe)", qty: "4 pcs" },
    { name: "Scotch bonnet", qty: "6 pcs" },
    { name: "Onions", qty: "4 pcs" },
    { name: "Spinach / ugwu", qty: "2 bunches" },
    { name: "Carrots", qty: "4 pcs" },
    { name: "Cucumber", qty: "2 pcs" },
    { name: "Cabbage", qty: "1 head" },
  ]},
  { cat: "Oils, Spices & Sauces",  icon: "🧂", items: [
    { name: "Vegetable / palm oil", qty: "1 litre" },
    { name: "Seasoning cubes", qty: "1 pack" },
    { name: "Curry powder", qty: "1 tin" },
    { name: "Thyme", qty: "1 tin" },
    { name: "Salt", qty: "500 g" },
    { name: "Garlic bulbs", qty: "2 bulbs" },
    { name: "Fresh ginger", qty: "100 g" },
    { name: "Soy sauce", qty: "1 bottle" },
    { name: "Tomato paste", qty: "2 tins" },
  ]},
  { cat: "Dairy & Extras",         icon: "🧈", items: [
    { name: "Evaporated milk", qty: "2 tins" },
    { name: "Butter", qty: "200 g" },
    { name: "Canned beans", qty: "2 tins" },
    { name: "Groundnut oil", qty: "500 ml" },
    { name: "Cheese (block)", qty: "200 g" },
  ]},
  { cat: "Drinks & Staples",       icon: "☕", items: [
    { name: "Sachet / bottled water", qty: "2 packs" },
    { name: "Milo / Ovaltine", qty: "1 tin" },
    { name: "Tea bags", qty: "1 box" },
    { name: "Sugar", qty: "500 g" },
    { name: "Fruit juice", qty: "2 bottles" },
  ]},
];

const INGREDIENTS = {
  "Akara & Pap": ["Canned beans", "Groundnut oil", "Onions", "Sugar"],
  "Ogi with Bean Cake": ["Canned beans", "Groundnut oil", "Onions", "Evaporated milk", "Sugar"],
  "Yam & Egg Sauce": ["Yam (tubers)", "Eggs", "Tomatoes", "Onions", "Vegetable / palm oil"],
  "Moi Moi & Tea": ["Canned beans", "Eggs", "Onions", "Tea bags", "Evaporated milk"],
  "Bread & Akara": ["Bread (loaf)", "Canned beans", "Groundnut oil", "Onions"],
  "Jollof Rice & Chicken": ["Long grain rice", "Chicken (pieces)", "Tomatoes", "Tomato paste", "Seasoning cubes"],
  "Egusi Soup & Eba": ["Garri / eba", "Beef / stewing beef", "Spinach / ugwu", "Vegetable / palm oil", "Seasoning cubes"],
  "Banga Soup & Starch": ["Smoked fish / tilapia", "Vegetable / palm oil", "Seasoning cubes", "Scotch bonnet"],
  "Pepper Soup & Yam": ["Yam (tubers)", "Chicken (pieces)", "Beef / stewing beef", "Scotch bonnet", "Seasoning cubes"],
  "Ofada Rice & Stew": ["Long grain rice", "Beef / stewing beef", "Onions", "Scotch bonnet", "Vegetable / palm oil"],
  "Pepper Soup": ["Chicken (pieces)", "Beef / stewing beef", "Scotch bonnet", "Seasoning cubes"],
  "Edikaikong & Eba": ["Garri / eba", "Beef / stewing beef", "Spinach / ugwu", "Vegetable / palm oil", "Seasoning cubes"],
  "Suya & Peppered Snail": ["Beef / stewing beef", "Onions", "Scotch bonnet", "Vegetable / palm oil"],
  "Oha Soup & Fufu": ["Garri / eba", "Beef / stewing beef", "Spinach / ugwu", "Vegetable / palm oil", "Seasoning cubes"],
  "Afang Soup & Eba": ["Garri / eba", "Beef / stewing beef", "Spinach / ugwu", "Vegetable / palm oil", "Seasoning cubes"]
};

// ─── FAVOURITES STORAGE ───────────────────────────────────────────────────────

const FAV_KEY = "mealplanner_favourites";

function loadFavourites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveFavourites(favs) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch {}
}

function isFavourited(favs, meal) {
  return favs.some(f => f.meal === meal);
}

function toggleFavourite(favs, meal, type) {
  const cuisine = getCuisineLabel(meal);
  if (isFavourited(favs, meal)) {
    return favs.filter(f => f.meal !== meal);
  }
  return [...favs, { meal, type, cuisine }];
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function pickWithBias(arr, type, favs) {
  // 60% chance to use a favourite if one exists for this meal type
  const typeFavs = favs.filter(f => f.type === type && arr.includes(f.meal));
  if (typeFavs.length > 0 && Math.random() < 0.6) {
    return pick(typeFavs).meal;
  }
  return pick(arr);
}

function generatePlan(selected, favs = []) {
  const plan = {};
  DAYS.forEach(day => {
    plan[day] = {};
    MEAL_TYPES.forEach(type => {
      const pool = [...selected].flatMap(id => MEAL_DB[id]?.[type] || []);
      plan[day][type] = pool.length ? pickWithBias(pool, type, favs) : "—";
    });
  });
  return plan;
}

function isValidPlan(plan) {
  if (!plan || typeof plan !== "object") return false;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  for (const day of days) {
    if (!plan[day] || typeof plan[day] !== "object") return false;
    const meals = ["breakfast", "lunch", "dinner"];
    for (const meal of meals) {
      if (!plan[day][meal] || plan[day][meal] === "—" || plan[day][meal].trim() === "") {
        return false;
      }
    }
  }
  return true;
}

function getCuisineLabel(meal) {
  for (const [id, meals] of Object.entries(MEAL_DB)) {
    for (const type of MEAL_TYPES) {
      if (meals[type]?.includes(meal)) return CUISINES.find(c => c.id === id)?.label || "";
    }
  }
  return "";
}

function getCuisineIcon(cuisineLabel) {
  return CUISINES.find(c => c.label === cuisineLabel)?.icon || "🍽️";
}

// ─── TOAST ───────────────────────────────────────────────────────────────────

function Toast({ message, visible }) {
  return (
    <div style={{
      position: "fixed", bottom: 90, left: "50%", transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      background: "#1A2E0A", border: "1px solid #E8DDD0", borderRadius: 100,
      padding: "10px 20px", fontSize: 13, color: "#F5EFE6", fontWeight: 500,
      opacity: visible ? 1 : 0, transition: "all 0.25s ease", pointerEvents: "none",
      zIndex: 1000, whiteSpace: "nowrap", boxShadow: "0 4px 24px rgba(0,0,0,0.15)"
    }}>
      {message}
    </div>
  );
}

// ─── MEAL CARD WITH LONG-PRESS ────────────────────────────────────────────────

function MealCard({ type, meal, favs, onToggleFav, onSwapMeal }) {
  const [pressing, setPressing] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [rotation, setRotation] = useState(0); // 0 or 90
  const timerRef = useRef(null);
  const pressStartTimeRef = useRef(0);
  const hasFiredLongPressRef = useRef(false);
  const isTouchRef = useRef(false);
  const saved = isFavourited(favs, meal);

  const startPress = useCallback(() => {
    pressStartTimeRef.current = Date.now();
    hasFiredLongPressRef.current = false;
    setPressing(true);

    timerRef.current = setTimeout(() => {
      hasFiredLongPressRef.current = true;
      setPulsing(true);
      onToggleFav(meal, type);
      setTimeout(() => setPulsing(false), 300);
      setPressing(false);
    }, 500);
  }, [meal, type, onToggleFav]);

  const triggerSwap = useCallback(() => {
    if (!onSwapMeal) return;
    setFlipping(true);
    setRotation(90);
    setTimeout(() => {
      onSwapMeal(type);
      setRotation(0);
      setTimeout(() => {
        setFlipping(false);
      }, 75);
    }, 75);
  }, [type, onSwapMeal]);

  const endPress = useCallback(() => {
    const duration = Date.now() - pressStartTimeRef.current;
    clearTimeout(timerRef.current);
    setPressing(false);

    if (!hasFiredLongPressRef.current && duration < 500 && duration >= 0) {
      triggerSwap();
    }
  }, [triggerSwap]);

  const cancelPress = useCallback(() => {
    clearTimeout(timerRef.current);
    setPressing(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    isTouchRef.current = true;
    startPress();
  }, [startPress]);

  const handleTouchEnd = useCallback((e) => {
    endPress();
  }, [endPress]);

  const handleMouseDown = useCallback((e) => {
    if (isTouchRef.current) return;
    startPress();
  }, [startPress]);

  const handleMouseUp = useCallback((e) => {
    if (isTouchRef.current) {
      isTouchRef.current = false; // Reset for next tap
      return;
    }
    endPress();
  }, [endPress]);

  const handleMouseLeave = useCallback((e) => {
    if (Date.now() - pressStartTimeRef.current < 150) return;
    cancelPress();
  }, [cancelPress]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${saved ? "#C8432A33" : "#E8DDD0"}`,
        borderRadius: 16,
        padding: "14px",
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        transform: `scale(${pulsing ? 1.04 : pressing ? 0.98 : 1}) rotateY(${rotation}deg)`,
        transition: flipping 
          ? "transform 75ms ease-in, border-color 0.2s ease" 
          : "transform 150ms ease-out, border-color 0.2s ease",
        position: "relative",
      }}
    >
      {/* Heart badge */}
      {saved && (
        <div style={{
          position: "absolute", top: 10, right: 12,
          fontSize: 13, lineHeight: 1,
          animation: pulsing ? "heartPop 0.3s ease" : "none",
        }}>❤️</div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 16 }}>{MEAL_ICONS[type]}</span>
        <span style={{ color: "#8A7968", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{type}</span>
        <span style={{ marginLeft: "auto", color: "#8A7968", fontSize: 11 }}>{MEAL_TIMES[type]}</span>
      </div>
      <div style={{ color: "#1A2E0A", fontSize: 15, fontWeight: 600, fontFamily: "'Figtree', sans-serif" }}>{meal}</div>
      <div style={{ color: "#8A7968", fontSize: 12, marginTop: 3 }}>{getCuisineLabel(meal)}</div>

      {/* Long-press progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: "#E8DDD0", borderRadius: "0 0 16px 16px", overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          background: saved ? "#C8432A" : "#C4622D",
          width: pressing ? "100%" : "0%",
          transition: pressing ? "width 0.5s linear" : "width 0s",
          borderRadius: "0 0 16px 16px",
        }} />
      </div>
    </div>
  );
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function Splash({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", background: "#F5EFE6" }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🍽️</div>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: "#1A2E0A", fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
        Your Personal<br />Meal Planner
      </h1>
      <p style={{ color: "#3D4A30", fontSize: 15, lineHeight: 1.7, maxWidth: 280, marginBottom: 40 }}>
        Tell us what you love to eat and we'll plan every meal for the whole week — breakfast, lunch & dinner.
      </p>
      <button onClick={onStart} style={{ background: "#C4622D", color: "#FFF8F0", border: "none", borderRadius: 100, padding: "14px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em", fontFamily: "'Figtree', sans-serif" }}>
        Get Started →
      </button>
      <p style={{ color: "#8A7968", fontSize: 12, marginTop: 20 }}>No account needed · Free to use</p>
    </div>
  );
}

function CuisinePicker({ onGenerate }) {
  const [selected, setSelected] = useState(new Set());
  const [servings, setServings] = useState(2);

  function toggle(id) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", padding: "1.5rem 1rem 6rem" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "#8A7968", fontSize: 12, marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Step 1 of 1</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 26, fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>What cuisines do you love?</h2>
        <p style={{ color: "#3D4A30", fontSize: 14 }}>Pick one or more. Mix and match freely.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {CUISINES.map(c => {
          const isOn = selected.has(c.id);
          return (
            <div key={c.id} onClick={() => toggle(c.id)} style={{
              background: isOn ? "#EAF3DE" : "#FFFFFF",
              border: isOn ? "1.5px solid #2D5016" : "1px solid #E8DDD0",
              borderRadius: 16, padding: "14px 12px", cursor: "pointer", transition: "all 0.15s"
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: "#1A2E0A", fontWeight: 600, fontSize: 14 }}>{c.label}</div>
              <div style={{ color: "#8A7968", fontSize: 11, marginTop: 3 }}>{c.sub}</div>
              {isOn && <div style={{ marginTop: 8, fontSize: 11, color: "#2D5016", fontWeight: 600 }}>✓ Selected</div>}
            </div>
          );
        })}
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 16, padding: "16px 14px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ color: "#1A2E0A", fontSize: 14, fontWeight: 500 }}>Servings per meal</span>
          <span style={{ color: "#C4622D", fontWeight: 700, fontSize: 16 }}>{servings} {servings === 1 ? "person" : "people"}</span>
        </div>
        <input type="range" min={1} max={8} value={servings} onChange={e => setServings(+e.target.value)} style={{ width: "100%", accentColor: "#C4622D" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ color: "#8A7968", fontSize: 11 }}>1</span>
          <span style={{ color: "#8A7968", fontSize: 11 }}>8</span>
        </div>
      </div>

      <button
        onClick={() => selected.size > 0 && onGenerate([...selected], servings)}
        style={{
          width: "100%", padding: "15px", borderRadius: 100,
          background: selected.size > 0 ? "#C4622D" : "#F5EFE6",
          color: selected.size > 0 ? "#FFF8F0" : "#8A7968",
          border: selected.size > 0 ? "none" : "1px solid #E8DDD0",
          fontSize: 15, fontWeight: 600, cursor: selected.size > 0 ? "pointer" : "default",
          transition: "all 0.2s",
          fontFamily: "'Figtree', sans-serif"
        }}>
        {selected.size === 0 ? "Pick at least one cuisine" : `Generate my ${DAYS.length}-day plan →`}
      </button>
    </div>
  );
}

function DailyView({ plan, selected, servings, favs, onToggleFav, activeDay, setActiveDay, showToast }) {
  const [localPlan, setLocalPlan] = useState(plan);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (localPlan) {
      try {
        localStorage.setItem("mealplanner_plan", JSON.stringify(localPlan));
      } catch (e) {}
    }
  }, [localPlan]);

  function regenDay() {
    const day = DAYS[activeDay];
    const newPlan = { ...localPlan };
    newPlan[day] = {};
    MEAL_TYPES.forEach(type => {
      const pool = [...selected].flatMap(id => MEAL_DB[id]?.[type] || []);
      newPlan[day][type] = pool.length ? pickWithBias(pool, type, favs) : "—";
    });
    setLocalPlan(newPlan);
  }

  function handleSwapMeal(type) {
    const currentMeal = meals[type];
    const pool = [...selected].flatMap(id => MEAL_DB[id]?.[type] || []);
    const filteredPool = pool.filter(m => m !== currentMeal);
    if (filteredPool.length > 0) {
      const newMeal = pickWithBias(filteredPool, type, favs);
      const newPlan = { ...localPlan };
      newPlan[day] = { ...newPlan[day], [type]: newMeal };
      setLocalPlan(newPlan);
    }
  }

  const day = DAYS[activeDay];
  const meals = localPlan[day];
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const handleShare = async () => {
    const title = "Today's meal plan 🍽️";
    const shareText = `☀️ Breakfast: ${meals.breakfast}
🌤️ Lunch: ${meals.lunch}
🌙 Dinner: ${meals.dinner}

Planned with Chop Chop 🇳🇬`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText
        });
      } catch (err) {
        // Ignored
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        if (showToast) {
          showToast("📋 Copied to clipboard");
        }
      } catch (err) {
        // Ignored
      }
    }
  };

  return (
    <div>
      <div ref={scrollRef} style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none", marginBottom: 20 }}>
        {DAYS.map((d, i) => {
          const isToday = d === todayName;
          const isActive = i === activeDay;
          return (
            <div key={d} onClick={() => setActiveDay(i)} style={{
              flexShrink: 0, padding: "7px 14px", borderRadius: 100,
              background: isActive ? (isToday ? "#E8A838" : "#2D5016") : "#FFFFFF",
              color: isActive ? (isToday ? "#1A2E0A" : "#EAF3DE") : (isToday ? "#E8A838" : "#8A7968"),
              border: isActive ? "none" : (isToday ? "1.5px solid #E8A838" : "1px solid #E8DDD0"),
              fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap"
            }}>{d.slice(0, 3)}</div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 20, fontWeight: 700 }}>{day}</h3>
        <span style={{ color: "#8A7968", fontSize: 12 }}>{servings} {servings === 1 ? "serving" : "servings"}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {MEAL_TYPES.map(type => (
          <MealCard
            key={type}
            type={type}
            meal={meals[type]}
            favs={favs}
            onToggleFav={onToggleFav}
            onSwapMeal={handleSwapMeal}
          />
        ))}
      </div>

      <p style={{ color: "#8A7968", fontSize: 12, textAlign: "center", marginBottom: 12 }}>
        Hold any meal to save it as a favourite ❤️
      </p>

      <button onClick={regenDay} style={{ width: "100%", padding: "13px", borderRadius: 100, background: "transparent", border: "1px solid #E8DDD0", color: "#8A7968", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>
        🔀 Shuffle {day}'s meals
      </button>

      <button onClick={handleShare} style={{ width: "100%", padding: "13px", borderRadius: 100, background: "transparent", border: "1px solid #E8DDD0", color: "#8A7968", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Figtree', sans-serif", fontWeight: 500, marginTop: 12 }}>
        💬 Share today's menu
      </button>
    </div>
  );
}

function WeeklyView({ plan, selected, favs, onSelectDay }) {
  const [localPlan, setLocalPlan] = useState(plan);

  useEffect(() => {
    if (localPlan) {
      try {
        localStorage.setItem("mealplanner_plan", JSON.stringify(localPlan));
      } catch (e) {}
    }
  }, [localPlan]);

  function regenAll() { setLocalPlan(generatePlan(selected, favs)); }

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayIdx = DAYS.indexOf(todayName);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 20, fontWeight: 700 }}>Full week</h3>
        <button onClick={regenAll} style={{ background: "transparent", border: "1px solid #E8DDD0", borderRadius: 100, padding: "7px 14px", color: "#888", fontSize: 12, cursor: "pointer", fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>🔀 Regenerate</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DAYS.map((day, idx) => {
          const isToday = day === todayName;
          const isPast = todayIdx !== -1 && idx < todayIdx;

          return (
            <div
              key={day}
              onClick={() => onSelectDay && onSelectDay(idx)}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8DDD0",
                borderLeft: isToday ? "3px solid #E8A838" : "1px solid #E8DDD0",
                borderRadius: 16,
                overflow: "hidden",
                opacity: isPast ? 0.45 : 1,
                cursor: "pointer",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ padding: "10px 14px", borderBottom: "1px solid #E8DDD0", background: "#FBF7F2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#2D5016", fontSize: 13, fontWeight: 700 }}>{day}</span>
                {isToday && (
                  <span style={{
                    background: "#E8A838",
                    color: "#4A2C00",
                    fontSize: 10,
                    fontWeight: 600,
                    borderRadius: 100,
                    padding: "2px 8px"
                  }}>
                    Today
                  </span>
                )}
              </div>
              {MEAL_TYPES.map((type, i) => {
                const meal = localPlan[day][type];
                const saved = isFavourited(favs, meal);
                return (
                  <div key={type} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < 2 ? "1px solid #FBF7F2" : "none" }}>
                    <span style={{ fontSize: 14 }}>{MEAL_ICONS[type]}</span>
                    <span style={{ color: "#8A7968", fontSize: 11, minWidth: 52 }}>{MEAL_TIMES[type]}</span>
                    <span style={{ color: "#1A2E0A", fontSize: 13, flex: 1, fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>{meal}</span>
                    {saved && <span style={{ fontSize: 12 }}>❤️</span>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShoppingView({ servings }) {
  const [checked, setChecked] = useState(new Set());
  const [collapsed, setCollapsed] = useState(new Set());
  const [showAll, setShowAll] = useState(false);
  const [plan] = useState(() => {
    try {
      const raw = localStorage.getItem("mealplanner_plan");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const scale = (qty) => {
    const match = qty.match(/^([\d.]+)\s*(.*)$/);
    if (!match) return qty;
    const num = parseFloat(match[1]) * (servings / 2);
    const unit = match[2];
    const rounded = Number.isInteger(num) ? num : parseFloat(num.toFixed(1));
    return `${rounded} ${unit}`;
  };

  const totalItems = SHOPPING.reduce((s, c) => s + c.items.length, 0);
  const doneCount = checked.size;
  const pct = Math.round((doneCount / totalItems) * 100);

  function toggleItem(id) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleCat(ci) {
    setCollapsed(prev => {
      const next = new Set(prev);
      next.has(ci) ? next.delete(ci) : next.add(ci);
      return next;
    });
  }

  // Get active meals from current 7-day plan
  const mealNames = Object.values(plan || {}).flatMap(dayMeals => Object.values(dayMeals || {}));
  
  // Check if there are any non-Nigerian meals
  const hasNonNigerian = mealNames.some(meal => !INGREDIENTS[meal]);

  // Compute matched ingredients
  const requiredIngredients = new Set();
  if (hasNonNigerian) {
    // Other cuisines fall back to the full generic list for now
    SHOPPING.forEach(cat => {
      cat.items.forEach(item => requiredIngredients.add(item.name));
    });
  } else {
    mealNames.forEach(meal => {
      const ingredients = INGREDIENTS[meal] || [];
      ingredients.forEach(ing => requiredIngredients.add(ing));
    });
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 14, padding: "12px 14px" }}>
          <div style={{ color: "#8A7968", fontSize: 12, marginBottom: 4 }}>Total items</div>
          <div style={{ color: "#1A2E0A", fontSize: 22, fontWeight: 700 }}>{totalItems}</div>
        </div>
        <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 14, padding: "12px 14px" }}>
          <div style={{ color: "#8A7968", fontSize: 12, marginBottom: 4 }}>Collected</div>
          <div style={{ color: doneCount === totalItems && totalItems > 0 ? "#2D5016" : "#1A2E0A", fontSize: 22, fontWeight: 700 }}>{doneCount}/{totalItems}</div>
        </div>
        <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 14, padding: "12px 14px" }}>
          <div style={{ color: "#8A7968", fontSize: 12, marginBottom: 4 }}>Servings</div>
          <div style={{ color: "#C4622D", fontSize: 22, fontWeight: 700 }}>{servings}</div>
        </div>
      </div>

      <div style={{ background: "#E8DDD0", borderRadius: 100, height: 6, marginBottom: 20, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "#2D5016", borderRadius: 100, transition: "width 0.3s" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {SHOPPING.map((cat, ci) => {
          const isOpen = !collapsed.has(ci);
          
          // Determine if this category contains any matched items
          const hasMatchedItems = cat.items.some(item => requiredIngredients.has(item.name));
          if (!hasMatchedItems && !showAll) return null;

          return (
            <div key={ci} style={{ background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 16, overflow: "hidden" }}>
              <div onClick={() => toggleCat(ci)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer" }}>
                <span style={{ fontSize: 18 }}>{cat.icon}</span>
                <span style={{ color: "#1A2E0A", fontSize: 14, fontWeight: 600, flex: 1 }}>{cat.cat}</span>
                <span style={{ background: "#F5EFE6", borderRadius: 100, padding: "2px 8px", color: "#8A7968", fontSize: 11, fontWeight: 600 }}>
                  {cat.items.filter((_, ii) => checked.has(`${ci}-${ii}`)).length}/{cat.items.length}
                </span>
                <span style={{ color: "#8A7968", fontSize: 18, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>⌄</span>
              </div>
              {isOpen && (
                <div style={{ borderTop: "1px solid #E8DDD0" }}>
                  {cat.items.map((item, ii) => {
                    const id = `${ci}-${ii}`;
                    const isDone = checked.has(id);
                    const isMatched = requiredIngredients.has(item.name);

                    if (!isMatched && !showAll) return null;

                    return (
                      <div key={ii} onClick={() => toggleItem(id)} style={{
                        display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                        borderBottom: ii < cat.items.length - 1 ? "1px solid #F5EFE6" : "none",
                        cursor: "pointer",
                        opacity: !isMatched ? 0.4 : (isDone ? 0.4 : 1),
                        transition: "opacity 0.2s"
                      }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%",
                          border: isDone ? "none" : "1.5px solid #D9C9B4",
                          background: isDone ? "#2D5016" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                        }}>
                          {isDone && <span style={{ fontSize: 12, color: "#F5EFE6" }}>✓</span>}
                        </div>
                        <span style={{ flex: 1, color: "#1A2E0A", fontSize: 13, textDecoration: isDone ? "line-through" : "none" }}>{item.name}</span>
                        {!isMatched && (
                          <span style={{ color: "#8A7968", fontSize: 11, fontStyle: "italic", marginRight: 8 }}>
                            Not in this week's plan
                          </span>
                        )}
                        <span style={{ color: "#8A7968", fontSize: 12 }}>{scale(item.qty)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#FFFFFF",
        border: "1px solid #E8DDD0",
        borderRadius: 16,
        padding: "12px 14px",
        marginTop: 12,
        marginBottom: 12,
        cursor: "pointer",
        userSelect: "none"
      }} onClick={() => setShowAll(!showAll)}>
        <span style={{ color: "#1A2E0A", fontSize: 13, fontWeight: 500, fontFamily: "'Figtree', sans-serif" }}>
          👁️ Show all items
        </span>
        <div style={{
          width: 40,
          height: 22,
          borderRadius: 100,
          background: showAll ? "#2D5016" : "#E8DDD0",
          position: "relative",
          transition: "background 0.2s"
        }}>
          <div style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#FFFFFF",
            position: "absolute",
            top: 2,
            left: showAll ? 20 : 2,
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }} />
        </div>
      </div>

      <button onClick={() => setChecked(new Set())} style={{ width: "100%", padding: "13px", borderRadius: 100, background: "transparent", border: "1px solid #E8DDD0", color: "#8A7968", fontSize: 14, cursor: "pointer", fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>
        ↺ Reset list
      </button>
    </div>
  );
}

// ─── FAVOURITES VIEW ──────────────────────────────────────────────────────────

function FavouritesView({ favs, onRemove }) {
  const grouped = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = favs.filter(f => f.type === type);
    return acc;
  }, {});

  const total = favs.length;

  if (total === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 340, textAlign: "center", padding: "0 2rem" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🤍</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>No favourites yet</h3>
        <p style={{ color: "#3D4A30", fontSize: 14, lineHeight: 1.7 }}>
          Go to Today's meals and hold any meal card for half a second to save it here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 20, fontWeight: 700 }}>Your favourites</h3>
        <span style={{ color: "#8A7968", fontSize: 12 }}>{total} saved</span>
      </div>

      <p style={{ color: "#8A7968", fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
        These meals have a 60% chance of appearing in your generated plans.
      </p>

      {MEAL_TYPES.map(type => {
        const items = grouped[type];
        if (items.length === 0) return null;
        return (
          <div key={type} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>{MEAL_ICONS[type]}</span>
              <span style={{ color: "#8A7968", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{type}</span>
              <span style={{ background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 100, padding: "1px 8px", color: "#8A7968", fontSize: 11, fontWeight: 600 }}>{items.length}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {items.map((fav, i) => (
                <div key={i} style={{
                  background: "#FFFFFF", border: "1px solid #E8DDD0",
                  borderRadius: 14, padding: "12px 14px",
                  display: "flex", alignItems: "center", gap: 12
                }}>
                  <span style={{ fontSize: 18 }}>{getCuisineIcon(fav.cuisine)}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#1A2E0A", fontSize: 14, fontWeight: 500, fontFamily: "'Figtree', sans-serif" }}>{fav.meal}</div>
                    <div style={{ color: "#8A7968", fontSize: 12, marginTop: 2 }}>{fav.cuisine}</div>
                  </div>
                  <button
                    onClick={() => onRemove(fav.meal)}
                    style={{
                      background: "transparent", border: "1px solid #E8DDD0",
                      borderRadius: "50%", width: 28, height: 28,
                      color: "#8A7968", fontSize: 14, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#C8432A"; e.currentTarget.style.color = "#C8432A"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8DDD0"; e.currentTarget.style.color = "#8A7968"; }}
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── PLANNER ─────────────────────────────────────────────────────────────────

function Planner({ selected, plan, servings, onReset }) {
  const [tab, setTab] = useState("daily");
  const [activeDay, setActiveDay] = useState(() => {
    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const idx = DAYS.indexOf(todayName);
    return idx !== -1 ? idx : 0;
  });
  const [favs, setFavs] = useState(loadFavourites);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const toastTimer = useRef(null);

  function showToast(msg) {
    clearTimeout(toastTimer.current);
    setToast({ visible: true, message: msg });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2000);
  }

  function handleToggleFav(meal, type) {
    setFavs(prev => {
      const next = toggleFavourite(prev, meal, type);
      saveFavourites(next);
      const wasAdded = next.length > prev.length;
      showToast(wasAdded ? "❤️ Added to favourites" : "Removed from favourites");
      return next;
    });
  }

  function handleRemoveFav(meal) {
    setFavs(prev => {
      const next = prev.filter(f => f.meal !== meal);
      saveFavourites(next);
      showToast("Removed from favourites");
      return next;
    });
  }

  const favCount = favs.length;

  const TABS = [
    { id: "daily",      label: "Today",    icon: "☀️" },
    { id: "weekly",     label: "Week",     icon: "📅" },
    { id: "shopping",   label: "Shopping", icon: "🛒" },
    { id: "favourites", label: "Saved",    icon: "❤️", badge: favCount > 0 ? favCount : null },
  ];

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Keyframes */}
      <style>{`
        @keyframes heartPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "#2D5016",
        padding: "1.25rem 1rem 1.25rem",
        color: "#F5EFE6"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {tab === "daily" ? "Today's Plan" : tab === "weekly" ? "Weekly Plan" : tab === "shopping" ? "Shopping List" : "Saved Meals"}
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
              {tab === "daily" ? DAYS[activeDay] : tab === "weekly" ? "Full Week" : tab === "shopping" ? "Ingredients" : "Favourites"}
            </h2>
            <div style={{ color: "#9FE1CB", fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              {selected.map(id => CUISINES.find(c => c.id === id)?.icon).join(" ")}
              {" · "}{servings} {servings === 1 ? "serving" : "servings"}
            </div>
          </div>
          <button onClick={onReset} style={{
            background: "transparent",
            border: "1px solid #E8DDD0",
            borderRadius: 100,
            color: "#F5EFE6",
            padding: "8px 16px",
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            cursor: "pointer"
          }}>
            ✏️ Edit
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 6, padding: "8px 1rem 10px", background: "#F5EFE6", borderBottom: "1px solid #E8DDD0" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px 4px", borderRadius: 12,
            background: tab === t.id ? "#2D5016" : "#FFFFFF",
            border: tab === t.id ? "none" : "1px solid #E8DDD0",
            color: tab === t.id ? "#EAF3DE" : "#8A7968",
            fontSize: 11, fontWeight: 700, cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            position: "relative",
            fontFamily: "'Figtree', sans-serif"
          }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            {t.label}
            {t.badge && (
              <span style={{
                position: "absolute", top: 4, right: 6,
                background: "#C8432A", color: "#fff",
                fontSize: 9, fontWeight: 700,
                borderRadius: 100, minWidth: 16, height: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 4px"
              }}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1rem 5rem" }}>
        {tab === "daily"      && <DailyView plan={plan} selected={selected} servings={servings} favs={favs} onToggleFav={handleToggleFav} activeDay={activeDay} setActiveDay={setActiveDay} showToast={showToast} />}
        {tab === "weekly"     && <WeeklyView plan={plan} selected={selected} favs={favs} onSelectDay={(dayIdx) => { setActiveDay(dayIdx); setTab("daily"); }} />}
        {tab === "shopping"   && <ShoppingView servings={servings} />}
        {tab === "favourites" && <FavouritesView favs={favs} onRemove={handleRemoveFav} />}
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState(() => {
    try {
      const selRaw = localStorage.getItem("mealplanner_selected");
      const planRaw = localStorage.getItem("mealplanner_plan");
      if (selRaw && planRaw) {
        const sel = JSON.parse(selRaw);
        const plan = JSON.parse(planRaw);
        if (Array.isArray(sel) && sel.length > 0 && isValidPlan(plan)) {
          return "planner";
        }
      }
    } catch (e) {}
    return "splash";
  });

  const [selected, setSelected] = useState(() => {
    try {
      const selRaw = localStorage.getItem("mealplanner_selected");
      return selRaw ? JSON.parse(selRaw) : [];
    } catch {
      return [];
    }
  });

  const [plan, setPlan] = useState(() => {
    try {
      const planRaw = localStorage.getItem("mealplanner_plan");
      return planRaw ? JSON.parse(planRaw) : null;
    } catch {
      return null;
    }
  });

  const [servings, setServings] = useState(() => {
    try {
      const srvRaw = localStorage.getItem("mealplanner_servings");
      return srvRaw ? parseInt(srvRaw, 10) : 2;
    } catch {
      return 2;
    }
  });

  function handleGenerate(sel, srv) {
    const favs = loadFavourites();
    const newPlan = generatePlan(sel, favs);
    setSelected(sel);
    setServings(srv);
    setPlan(newPlan);
    try {
      localStorage.setItem("mealplanner_selected", JSON.stringify(sel));
      localStorage.setItem("mealplanner_servings", srv.toString());
      localStorage.setItem("mealplanner_plan", JSON.stringify(newPlan));
    } catch (e) {}
    setScreen("planner");
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", fontFamily: "'Figtree', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet" />
      {screen === "splash"  && <Splash onStart={() => setScreen("picker")} />}
      {screen === "picker"  && <CuisinePicker onGenerate={handleGenerate} />}
      {screen === "planner" && <Planner selected={selected} plan={plan} servings={servings} onReset={() => setScreen("picker")} />}
    </div>
  );
}
