import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. Load initial items from localStorage on startup (fallback to empty array if none exist)
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('grocery_items');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  // 2. Automatically sync state to localStorage whenever the 'items' array changes
  useEffect(() => {
    localStorage.setItem('grocery_items', JSON.stringify(items));
  }, [items]);

  // 3. Add Item Handler
  const addItem = (e) => {
    e.preventDefault(); // Prevents page reload/going back

    if (!itemName.trim()) {
      alert("Please enter an item name");
      return;
    }

    const newItem = {
      _id: Date.now().toString(), // Generate a unique ID locally
      itemName: itemName.trim(),
      quantity: Number(quantity) || 1,
      isPurchased: false
    };

    setItems([...items, newItem]);
    setItemName(''); // Reset input
    setQuantity(1);  // Reset input
  };

  // 4. Toggle Purchased Status
  const togglePurchased = (id) => {
    const updatedItems = items.map(item => 
      item._id === id ? { ...item, isPurchased: !item.isPurchased } : item
    );
    setItems(updatedItems);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>Grocery Shopping List</h1>

      {/* Input Form */}
      <form onSubmit={addItem} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Item name" 
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ padding: '10px', flex: 2, borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <input 
          type="number" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
          min="1"
          required
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '4px', background: '#222', color: '#fff', border: 'none' }}>
          Add Item
        </button>
      </form>

      {/* Grocery Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Item name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Quantity</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Is Purchased?</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr 
              key={item._id} 
              onClick={() => togglePurchased(item._id)}
              style={{ 
                cursor: 'pointer',
                textDecoration: item.isPurchased ? 'line-through' : 'none',
                color: item.isPurchased ? '#999' : '#000',
                backgroundColor: item.isPurchased ? '#fafafa' : '#fff',
                transition: 'background 0.2s'
              }}
            >
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.itemName}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.quantity}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.isPurchased ? "✅ Yes" : "❌ No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {items.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>Your list is empty. Add something above!</p>
      )}
    </div>
  );
}

export default App;